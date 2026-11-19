from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    service: str
    cloud: str
    scale_to_zero: bool


class StackMetric(BaseModel):
    category: str
    technologies: list[str]
    years_experience: int


class ArchitectureCostItem(BaseModel):
    provider: str
    service: str
    free_tier_quota: str
    estimated_monthly_usd: float
