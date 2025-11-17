import os
import logging
from redis import Redis
from rq import Worker, Queue, Connection
from .m365_client import create_graph_subscription
from .models import Subscription
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("m365_renew_worker")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def renew_expiring_subscriptions():
    db = SessionLocal()
    try:
        subs = db.query(Subscription).all()
        # naive loop: in production check expiration threshold
        for s in subs:
            logger.info("Attempting renewal for subscription %s", s.subscription_id)
            try:
                # placeholder: pass notification URL env var or read from DB
                new_sub = create_graph_subscription(s.integration_id, os.getenv("M365_NOTIFICATION_URL"), resource=s.resource)
                # update DB: delete old / insert new (omitted here for brevity)
                logger.info("Renewed subscription %s -> %s", s.subscription_id, new_sub.get("id"))
            except Exception:
                logger.exception("Error renewing subscription %s", s.subscription_id)
    finally:
        db.close()

if __name__ == "__main__":
    # This worker module can be scheduled by cron or executed manually; we also provide an RQ-based trigger in main app.
    renew_expiring_subscriptions()
