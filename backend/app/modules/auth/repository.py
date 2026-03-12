"""Authentication data access layer."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import OAuthAccount, User


class AuthRepository:
    """Repository for auth-related database operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_email(self, email: str) -> User | None:
        """Find user by email."""
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_user_by_id(self, user_id: UUID) -> User | None:
        """Find user by ID."""
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_oauth_account(self, provider: str, provider_user_id: str) -> OAuthAccount | None:
        """Find OAuth account by provider and provider user ID."""
        result = await self.db.execute(
            select(OAuthAccount).where(
                OAuthAccount.provider == provider,
                OAuthAccount.provider_user_id == provider_user_id,
            )
        )
        return result.scalar_one_or_none()

    async def create_user(self, user: User) -> User:
        """Create a new user."""
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def create_oauth_account(self, account: OAuthAccount) -> OAuthAccount:
        """Create a new OAuth account link."""
        self.db.add(account)
        await self.db.commit()
        await self.db.refresh(account)
        return account
