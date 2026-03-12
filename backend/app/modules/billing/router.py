"""Billing and subscription API endpoints."""

from uuid import UUID
from fastapi import APIRouter, Request

from app.dependencies import CurrentUser, DbSession
from app.schemas.billing import (
    ApiKeyCreateRequest,
    ApiKeyResponse,
    PlanResponse,
    SubscribeRequest,
    SubscriptionResponse,
)
from app.schemas.common import MessageResponse

router = APIRouter()


@router.get("/plans", response_model=list[PlanResponse])
async def list_plans(db: DbSession):
    """List available subscription plans."""
    from app.modules.billing.service import BillingService
    return await BillingService(db).list_plans()


@router.get("/subscription", response_model=SubscriptionResponse | None)
async def get_subscription(user: CurrentUser, db: DbSession):
    """Get current user's subscription."""
    from app.modules.billing.service import BillingService
    return await BillingService(db).get_subscription(user)


@router.post("/subscribe", response_model=SubscriptionResponse)
async def subscribe(request: SubscribeRequest, user: CurrentUser, db: DbSession):
    """Subscribe to a plan."""
    # TODO: Integrate with Stripe
    raise NotImplementedError("Billing not yet implemented")


@router.post("/cancel", response_model=MessageResponse)
async def cancel_subscription(user: CurrentUser, db: DbSession):
    """Cancel current subscription."""
    raise NotImplementedError("Billing not yet implemented")


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events."""
    # TODO: Implement Stripe webhook handler
    raise NotImplementedError("Stripe webhooks not yet implemented")


@router.get("/invoices")
async def list_invoices(user: CurrentUser, db: DbSession):
    """List user's invoices."""
    raise NotImplementedError("Not yet implemented")


# API Keys
@router.post("/api-keys", response_model=ApiKeyResponse, status_code=201)
async def create_api_key(request: ApiKeyCreateRequest, user: CurrentUser, db: DbSession):
    """Create a new API key."""
    raise NotImplementedError("Not yet implemented")


@router.get("/api-keys", response_model=list[ApiKeyResponse])
async def list_api_keys(user: CurrentUser, db: DbSession):
    """List user's API keys."""
    raise NotImplementedError("Not yet implemented")


@router.delete("/api-keys/{key_id}")
async def delete_api_key(key_id: UUID, user: CurrentUser, db: DbSession):
    """Delete an API key."""
    raise NotImplementedError("Not yet implemented")
