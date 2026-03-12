"""User management business logic."""

from uuid import UUID
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.user import User
from app.schemas.user import UserAdminUpdateRequest


class UserService:
    """User management service."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user(self, user_id: UUID) -> User:
        """Get a user by ID."""
        result = await self.db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            raise NotFoundError("User")
        return user

    async def list_users(self, page: int = 1, per_page: int = 20) -> list[User]:
        """List users with pagination."""
        offset = (page - 1) * per_page
        result = await self.db.execute(
            select(User).order_by(User.created_at.desc()).offset(offset).limit(per_page)
        )
        return list(result.scalars().all())

    async def update_user(self, user_id: UUID, request: UserAdminUpdateRequest) -> User:
        """Update user fields (admin)."""
        user = await self.get_user(user_id)
        for field, value in request.model_dump(exclude_unset=True).items():
            setattr(user, field, value)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def deactivate_user(self, user_id: UUID) -> None:
        """Deactivate a user account."""
        user = await self.get_user(user_id)
        user.is_active = False
        await self.db.commit()
