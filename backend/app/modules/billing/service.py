"""Billing business logic."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.billing import Subscription, SubscriptionPlan
from app.models.user import User


class BillingService:
    """Billing service."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_plans(self) -> list[SubscriptionPlan]:
        """List active subscription plans."""
        result = await self.db.execute(
            select(SubscriptionPlan).where(SubscriptionPlan.is_active == True)
        )
        return list(result.scalars().all())

    async def get_subscription(self, user: User) -> Subscription | None:
        """Get user's active subscription."""
        result = await self.db.execute(
            select(Subscription)
            .where(Subscription.user_id == user.id, Subscription.status == "active")
            .order_by(Subscription.created_at.desc())
        )
        return result.scalar_one_or_none()
