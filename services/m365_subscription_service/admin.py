from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from .models import Base, Integration, Subscription
from .m365_client import create_graph_subscription, delete_graph_subscription, run_delta_for_subscription, refresh_microsoft_token

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
gine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

router = APIRouter(prefix="/admin", tags=["admin"])

class RenewRequest(BaseModel):
    subscription_id: str

@router.get("/integrations")
def list_integrations():
    db = SessionLocal()
    try:
        items = db.query(Integration).all()
        return [{"id": i.id, "provider": i.provider, "account_email": i.account_email, "expires_at": i.expires_at} for i in items]
    finally:
        db.close()

@router.get("/subscriptions")
def list_subscriptions():
    db = SessionLocal()
    try:
        items = db.query(Subscription).all()
        return [{"id": s.id, "subscription_id": s.subscription_id, "integration_id": s.integration_id, "resource": s.resource, "expiration": s.expiration} for s in items]
    finally:
        db.close()

@router.post("/subscriptions/{subscription_id}/renew")
def renew_subscription(subscription_id: str):
    """
    Renew a single subscription by issuing a new Graph subscription with the same resource and replacing DB row.
    This is a manual renewal endpoint; in production schedule automatic renewals before expiration.
    """
    db = SessionLocal()
    try:
        sub = db.query(Subscription).filter(Subscription.subscription_id == subscription_id).first()
        if not sub:
            raise HTTPException(status_code=404, detail="subscription not found")
        # create new subscription for integration with identical resource & client_state (client_state re-generated)
        new_sub = create_graph_subscription(sub.integration_id, os.getenv("M365_NOTIFICATION_URL"), resource=sub.resource)
        # remove old subscription DB entry and persist new one
        db.query(Subscription).filter(Subscription.subscription_id == subscription_id).delete()
        from .models import Subscription as SubModel
        srow = SubModel(
            subscription_id=new_sub.get("id"),
            integration_id=sub.integration_id,
            resource=new_sub.get("resource"),
            expiration=new_sub.get("expirationDateTime"),
            client_state=new_sub.get("clientState")
        )
        db.add(srow)
        db.commit()
        return {"status": "renewed", "new_subscription_id": new_sub.get("id")}
    finally:
        db.close()

@router.post("/subscriptions/{subscription_id}/run-delta")
def admin_run_delta(subscription_id: str):
    """
    Force-run delta for a subscription (synchronous).
    In production this should enqueue a job; this endpoint is for admin/manual triggering.
    """
    try:
        res = run_delta_for_subscription(subscription_id)
        return {"status": "ok", "result": res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/integrations/{integration_id}/refresh-token")
def admin_refresh_token(integration_id: int):
    """
    Force-refresh the integration's Microsoft token.
    """
    db = SessionLocal()
    try:
        integ = db.query(Integration).get(integration_id)
        if not integ:
            raise HTTPException(status_code=404, detail="integration not found")
        try:
            refreshed = refresh_microsoft_token(integ)
            # persist tokens (already done by refresh function, but reflect back)
            db.add(refreshed); db.commit()
            return {"status": "ok", "integration_id": integration_id}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
