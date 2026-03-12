"""Collaboration request/response schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class CommentCreateRequest(BaseModel):
    """Create a comment."""

    file_id: UUID | None = None
    parent_id: UUID | None = None
    content: str
    line_start: int | None = None
    line_end: int | None = None


class CommentUpdateRequest(BaseModel):
    """Update a comment."""

    content: str


class CommentResponse(BaseModel):
    """Comment response."""

    id: UUID
    project_id: UUID
    file_id: UUID | None = None
    user_id: UUID
    parent_id: UUID | None = None
    content: str
    line_start: int | None = None
    line_end: int | None = None
    resolved: bool
    resolved_by: UUID | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class TrackChangeResponse(BaseModel):
    """Track change response."""

    id: UUID
    project_id: UUID
    file_id: UUID
    user_id: UUID
    change_type: str
    old_content: str | None = None
    new_content: str | None = None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
