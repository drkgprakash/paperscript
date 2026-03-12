"""Billing request/response schemas."""

from datetime import datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel


class PlanResponse(BaseModel):
    """Subscription plan response."""

    id: UUID
    name: str
    slug: str
    price_monthly: Decimal
    price_yearly: Decimal
    max_projects: int
    max_collaborators_per_project: int
    max_compilations_per_day: int
    max_storage_mb: int
    features: dict[str, Any] | None = None

    model_config = {"from_attributes": True}


class SubscribeRequest(BaseModel):
    """Subscribe to a plan."""

    plan_id: UUID
    payment_method_id: str | None = None


class SubscriptionResponse(BaseModel):
    """Subscription response."""

    id: UUID
    plan_id: UUID
    status: str
    current_period_start: datetime | None = None
    current_period_end: datetime | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ApiKeyCreateRequest(BaseModel):
    """Create an API key."""

    name: str
    expires_in_days: int | None = None


class ApiKeyResponse(BaseModel):
    """API key response (key shown only on creation)."""

    id: UUID
    name: str
    key: str | None = None  # Only populated on creation
    last_used_at: datetime | None = None
    expires_at: datetime | None = None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
