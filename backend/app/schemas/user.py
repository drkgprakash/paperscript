"""User request/response schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    """Public user response."""

    id: UUID
    email: EmailStr
    full_name: str
    avatar_url: str | None = None
    orcid_id: str | None = None
    role: str
    is_active: bool
    email_verified: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdateRequest(BaseModel):
    """User profile update request."""

    full_name: str | None = None
    avatar_url: str | None = None
    orcid_id: str | None = None


class UserAdminUpdateRequest(BaseModel):
    """Admin user update request."""

    role: str | None = None
    is_active: bool | None = None
