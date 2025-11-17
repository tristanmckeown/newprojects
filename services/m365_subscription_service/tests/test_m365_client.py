import pytest
from services.m365_subscription_service import m365_client as client
from unittest.mock import patch

# Basic smoke test to ensure run_delta_for_subscription handles missing subscription gracefully

def test_run_delta_for_missing_subscription(monkeypatch):
    # patch DB access to return None
    class DummySession:
        def __init__(self): pass
        def query(self, *a, **k): return self
        def filter(self, *a, **k): return self
        def first(self): return None
    monkeypatch.setattr(client, "SessionLocal", lambda: DummySession())
    with pytest.raises(Exception):
        client.run_delta_for_subscription("non-existent-id")
