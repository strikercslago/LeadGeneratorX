import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://ai-strategy-pro-4.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "Lucas Azaro Consulting API"


# Status regression
def test_status_post_get(client):
    r = client.post(f"{API}/status", json={"client_name": "TEST_status"})
    assert r.status_code == 200
    body = r.json()
    assert body["client_name"] == "TEST_status"
    assert "id" in body and "timestamp" in body
    r2 = client.get(f"{API}/status")
    assert r2.status_code == 200
    assert isinstance(r2.json(), list)
    for row in r2.json():
        assert "_id" not in row


# Contact - valid
def test_contact_create_valid(client):
    payload = {
        "name": "TEST_Lucas",
        "email": "test_lucas@example.com",
        "service": "innovation",
        "message": "Hello, this is a test message",
        "company": "TEST_Co",
        "locale": "en",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert "id" in body and "created_at" in body
    assert body["name"] == "TEST_Lucas"
    assert body["email"] == "test_lucas@example.com"
    assert body["service"] == "innovation"
    assert "_id" not in body


# Contact - invalid email
def test_contact_invalid_email(client):
    payload = {
        "name": "TEST",
        "email": "not-an-email",
        "service": "ai",
        "message": "Hello hi"
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


# Contact - missing required
def test_contact_missing_required(client):
    r = client.post(f"{API}/contact", json={"email": "a@b.com"})
    assert r.status_code == 422


# Contact - list
def test_contact_list_no_id_leak(client):
    r = client.get(f"{API}/contact")
    assert r.status_code == 200
    rows = r.json()
    assert isinstance(rows, list)
    for row in rows:
        assert "_id" not in row
    # at least the one we created exists
    assert any(r2.get("name") == "TEST_Lucas" for r2 in rows)


# Service enum-like values
@pytest.mark.parametrize("svc", ["innovation", "ai", "digital", "other"])
def test_contact_service_values(client, svc):
    payload = {
        "name": f"TEST_{svc}",
        "email": f"test_{svc}@example.com",
        "service": svc,
        "message": "Service test message"
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200
    assert r.json()["service"] == svc
