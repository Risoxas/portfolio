import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import ArchitectureCostItem, HealthResponse, StackMetric

app = FastAPI(
    title="Portfolio GCP Analytics API",
    version="1.0.0",
    description="Lightweight FastAPI microservice designed for GCP Cloud Run Always Free Tier.",
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="gcp-analytics-api",
        cloud="gcp-cloud-run",
        scale_to_zero=True,
    )


@app.get("/api/v1/stack-metrics", response_model=list[StackMetric])
def get_stack_metrics() -> list[StackMetric]:
    return [
        StackMetric(
            category="Backend",
            technologies=["Python", "FastAPI", "Node.js", "TypeScript", "GraphQL", "Pytest"],
            years_experience=6,
        ),
        StackMetric(
            category="Frontend",
            technologies=["React", "Next.js", "TypeScript", "Vue.js", "TanStack Query"],
            years_experience=6,
        ),
        StackMetric(
            category="Cloud & Data",
            technologies=["GCP Cloud Run", "BigQuery", "PostgreSQL", "AWS Lambda", "Terraform", "Docker"],
            years_experience=5,
        ),
    ]


@app.get("/api/v1/architecture-cost", response_model=list[ArchitectureCostItem])
def get_architecture_cost() -> list[ArchitectureCostItem]:
    return [
        ArchitectureCostItem(
            provider="Vercel",
            service="Hobby Free Tier (Next.js 15)",
            free_tier_quota="100 GB bandwidth / mo",
            estimated_monthly_usd=0.0,
        ),
        ArchitectureCostItem(
            provider="GCP",
            service="Cloud Run (FastAPI)",
            free_tier_quota="2M requests / mo, 360k vCPU-sec",
            estimated_monthly_usd=0.0,
        ),
        ArchitectureCostItem(
            provider="AWS",
            service="Lambda + HTTP API Gateway",
            free_tier_quota="1M requests / mo, 400k GB-sec",
            estimated_monthly_usd=0.0,
        ),
    ]
