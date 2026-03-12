"""Admin dashboard API endpoints."""

from uuid import UUID
from fastapi import APIRouter

from app.dependencies import AdminUser, DbSession

router = APIRouter()


@router.get("/dashboard")
async def admin_dashboard(admin: AdminUser, db: DbSession):
    """Get admin dashboard overview stats."""
    from app.modules.admin.service import AdminService
    return await AdminService(db).get_dashboard_stats()


@router.get("/users")
async def admin_list_users(admin: AdminUser, db: DbSession, page: int = 1, per_page: int = 20):
    """List all users with admin details."""
    from app.modules.users.service import UserService
    return await UserService(db).list_users(page, per_page)


@router.get("/users/{user_id}/activity")
async def admin_user_activity(user_id: UUID, admin: AdminUser, db: DbSession):
    """Get user activity log."""
    from app.modules.admin.service import AdminService
    return await AdminService(db).get_user_activity(user_id)


@router.get("/documents")
async def admin_list_documents(admin: AdminUser, db: DbSession, page: int = 1, per_page: int = 20):
    """List all documents (admin oversight)."""
    from app.modules.admin.service import AdminService
    return await AdminService(db).list_all_projects(page, per_page)


@router.get("/analytics")
async def admin_analytics(admin: AdminUser, db: DbSession):
    """Get platform analytics."""
    from app.modules.admin.service import AdminService
    return await AdminService(db).get_analytics()


@router.get("/audit-logs")
async def admin_audit_logs(admin: AdminUser, db: DbSession, page: int = 1, per_page: int = 50):
    """Get audit logs."""
    from app.modules.admin.service import AdminService
    return await AdminService(db).get_audit_logs(page, per_page)
