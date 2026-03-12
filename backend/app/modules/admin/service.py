"""Admin dashboard business logic."""

from uuid import UUID
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.audit import AuditLog
from app.models.project import Project
from app.models.user import User


class AdminService:
    """Admin service."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_dashboard_stats(self) -> dict:
        """Get platform overview stats."""
        user_count = await self.db.scalar(select(func.count()).select_from(User))
        project_count = await self.db.scalar(
            select(func.count()).select_from(Project).where(Project.status != "deleted")
        )
        return {
            "total_users": user_count or 0,
            "total_projects": project_count or 0,
        }

    async def get_user_activity(self, user_id: UUID) -> list:
        """Get audit logs for a specific user."""
        result = await self.db.execute(
            select(AuditLog)
            .where(AuditLog.user_id == user_id)
            .order_by(AuditLog.created_at.desc())
            .limit(100)
        )
        return list(result.scalars().all())

    async def list_all_projects(self, page: int, per_page: int) -> list:
        """List all projects for admin oversight."""
        offset = (page - 1) * per_page
        result = await self.db.execute(
            select(Project)
            .order_by(Project.created_at.desc())
            .offset(offset)
            .limit(per_page)
        )
        return list(result.scalars().all())

    async def get_analytics(self) -> dict:
        """Get platform analytics."""
        # TODO: Implement detailed analytics
        return await self.get_dashboard_stats()

    async def get_audit_logs(self, page: int, per_page: int) -> list:
        """Get paginated audit logs."""
        offset = (page - 1) * per_page
        result = await self.db.execute(
            select(AuditLog)
            .order_by(AuditLog.created_at.desc())
            .offset(offset)
            .limit(per_page)
        )
        return list(result.scalars().all())
