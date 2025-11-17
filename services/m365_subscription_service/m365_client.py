import os
import requests
import logging
import io
import base64
from .storage import upload_bytes
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from .models import Integration, Subscription, Document, Base
from .token_store import encrypt_token, decrypt_token

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
gine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

GRAPH_BASE = "https://graph.microsoft.com/v1.0"
TOKEN_REFRESH_ENDPOINT = "https://login.microsoftonline.com/common/oauth2/v2.0/token"

def refresh_microsoft_token(integration: Integration):
    try:
        if not integration.refresh_token:
            return integration
        # decrypt refresh token before use
        refresh_token_plain = decrypt_token(integration.refresh_token) or integration.refresh_token
        data = {
            "client_id": os.getenv("MICROSOFT_CLIENT_ID"),
            "client_secret": os.getenv("MICROSOFT_CLIENT_SECRET"),
            "refresh_token": refresh_token_plain,
            "grant_type": "refresh_token",
            "scope": "offline_access Mail.Read"
        }
        r = requests.post(TOKEN_REFRESH_ENDPOINT, data=data, timeout=15)
        r.raise_for_status()
        tok = r.json()
        # encrypt tokens before storing
        if tok.get("access_token"):
            integration.access_token = encrypt_token(tok.get("access_token"))
        if tok.get("refresh_token"):
            integration.refresh_token = encrypt_token(tok.get("refresh_token"))
        if tok.get("expires_in"):
            from datetime import datetime, timedelta
            integration.expires_at = int((datetime.utcnow() + timedelta(seconds=int(tok.get("expires_in")))).timestamp())
        return integration
    except Exception:
        logger.exception("Error refreshing token")
        raise

def create_graph_subscription(integration_id: int, notification_url: str, resource: str = "me/mailFolders('Inbox')/messages"):
    db = SessionLocal()
    try:
        integ = db.query(Integration).get(integration_id)
        if not integ:
            raise Exception("integration not found")
        # decrypt access token if stored
        try:
            if integ.expires_at and integ.expires_at - 60 < datetime.utcnow().timestamp():
                integ = refresh_microsoft_token(integ)
                db.add(integ); db.commit()
        except Exception:
            logger.exception("token refresh during create_graph_subscription failed (continuing)")

        access_token_plain = decrypt_token(integ.access_token) or integ.access_token
        headers = {"Authorization": f"Bearer {access_token_plain}", "Content-Type": "application/json"}
        payload = {
            "changeType": "created,updated",
            "notificationUrl": notification_url,
            "resource": resource,
            # NOTE: Graph enforces an expiration; you must renew before expiration. Using a far date here is illustrative.
            "expirationDateTime": (datetime.utcnow().replace(year=datetime.utcnow().year + 1)).isoformat() + "Z",
            "clientState": "docflow-clientstate"
        }
        r = requests.post(f"{GRAPH_BASE}/subscriptions", headers=headers, json=payload, timeout=30)
        r.raise_for_status()
        sub = r.json()
        # persist subscription mapping
        subscription = Subscription(
            subscription_id=sub.get("id"),
            integration_id=integration_id,
            resource=sub.get("resource"),
            expiration=sub.get("expirationDateTime"),
            client_state=sub.get("clientState")
        )
        db.add(subscription)
        db.commit()
        return sub
    finally:
        db.close()

def delete_graph_subscription(subscription_id: str, integration_id: int = None):
    db = SessionLocal()
    try:
        integ = None
        if integration_id:
            integ = db.query(Integration).get(integration_id)
            try:
                if integ:
                    integ = refresh_microsoft_token(integ)
            except Exception:
                pass
        if integ and integ.access_token:
            access_token_plain = decrypt_token(integ.access_token) or integ.access_token
            headers = {"Authorization": f"Bearer {access_token_plain}"}
            try:
                _ = requests.delete(f"{GRAPH_BASE}/subscriptions/{{subscription_id}}", headers=headers, timeout=15)
            except Exception:
                logger.exception("Graph delete subscription error (ignored)")
        db.query(Subscription).filter(Subscription.subscription_id == subscription_id).delete()
        db.commit()
        return True
    finally:
        db.close()

def _get_delta_pages(url, headers):
    """
    Generator to iterate paged delta results.
    """
    while url:
        r = requests.get(url, headers=headers, timeout=30)
        r.raise_for_status()
        data = r.json()
        yield data
        # '@odata.nextLink' or '@odata.deltaLink'
        url = data.get("@odata.nextLink")

def run_delta_for_subscription(subscription_id: str):
    db = SessionLocal()
    try:
        sub = db.query(Subscription).filter(Subscription.subscription_id == subscription_id).first()
        if not sub:
            raise Exception("subscription not found")
        integ = db.query(Integration).get(sub.integration_id)
        if not integ:
            raise Exception("integration not found")
        # refresh token if near expiry
        try:
            integ = refresh_microsoft_token(integ)
            db.add(integ); db.commit()
        except Exception:
            pass

        access_token_plain = decrypt_token(integ.access_token) or integ.access_token
        headers = {"Authorization": f"Bearer {access_token_plain}"}
        delta_url = f"{GRAPH_BASE}/me/mailFolders('Inbox')/messages/delta?$select=id,subject,from,hasAttachments,receivedDateTime,toRecipients"
        logger.info("Calling delta for integration %s subscription %s", integ.id, subscription_id)
        processed_count = 0
        for page in _get_delta_pages(delta_url, headers):
            values = page.get("value", [])
            for item in values:
                if item.get("hasAttachments"):
                    msg_id = item.get("id")
                    try:
                        mr = requests.get(f"{GRAPH_BASE}/me/messages/{{msg_id}}?$expand=attachments", headers=headers, timeout=30)
                        mr.raise_for_status()
                        msg = mr.json()
                        sender = (msg.get("from") or {}).get("emailAddress", {}).get("address")
                        recipients = ",".join([r.get("emailAddress", {}).get("address") for r in (msg.get("toRecipients") or [])])
                        atts = msg.get("attachments", [])
                        for att in atts:
                            if att.get("@odata.type") == "#microsoft.graph.fileAttachment":
                                name = att.get("name")
                                content_bytes = att.get("contentBytes")
                                if content_bytes:
                                    file_bytes = base64.b64decode(content_bytes)
                                    stream = io.BytesIO(file_bytes)
                                    s3_key = upload_bytes(stream, name)
                                    doc = Document(
                                        tenant_id=str(integ.id),
                                        original_filename=name,
                                        s3_key=s3_key,
                                        content_type=att.get("contentType"),
                                        size=len(file_bytes),
                                        sender=sender,
                                        recipients=recipients,
                                        processing_status="pending"
                                    )
                                    db.add(doc)
                                    db.commit()
                                    processed_count += 1
                    except Exception:
                        logger.exception("error processing message %s", msg_id)
        return {"processed": processed_count}
    finally:
        db.close()
