from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["cloud"] == "gcp-cloud-run"
    assert data["scale_to_zero"] is True


def test_stack_metrics() -> None:
    response = client.get("/api/v1/stack-metrics")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 3
    assert any("FastAPI" in item["technologies"] for item in data)


def test_architecture_cost_is_zero() -> None:
    response = client.get("/api/v1/architecture-cost")
    assert response.status_code == 200
    items = response.json()
    assert all(item["estimated_monthly_usd"] == 0.0 for item in items)
