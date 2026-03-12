"""User management API endpoints."""

from uuid import UUID
from fastapi import APIRouter

from app.dependencies import AdminUser, CurrentUser, DbSession
from app.schemas.user import UserAdminUpdateRequest, UserResponse, UserUpdateRequest

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: CurrentUser):
    """Get the authenticated user's profile."""
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_current_user(request: UserUpdateRequest, current_user: CurrentUser, db: DbSession):
    """Update the authenticated user's profile."""
    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)
    await db.commit()
    await db.refresh(current_user)
    return current_user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: UUID, admin: AdminUser, db: DbSession):
    """Get a user by ID (admin only)."""
    from app.modules.users.service import UserService
    return await UserService(db).get_user(user_id)


@router.get("", response_model=list[UserResponse])
async def list_users(admin: AdminUser, db: DbSession, page: int = 1, per_page: int = 20):
    """List all users (admin only)."""
    from app.modules.users.service import UserService
    return await UserService(db).list_users(page, per_page)


@router.patch("/{user_id}/role", response_model=UserResponse)
async def update_user_role(user_id: UUID, request: UserAdminUpdateRequest, admin: AdminUser, db: DbSession):
    """Update a user's role (admin only)."""
    from app.modules.users.service import UserService
    return await UserService(db).update_user(user_id, request)


@router.delete("/{user_id}")
async def delete_user(user_id: UUID, admin: AdminUser, db: DbSession):
    """Deactivate a user (admin only)."""
    from app.modules.users.service import UserService
    await UserService(db).deactivate_user(user_id)
    return {"detail": "User deactivated"}
