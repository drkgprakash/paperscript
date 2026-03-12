"""Template request/response schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class TemplateCreateRequest(BaseModel):
    """Create template request (admin only)."""

    name: str
    description: str | None = None
    journal_name: str | None = None
    publisher: str | None = None
    category: str = "journal_article"
    bibliography_style: str | None = None


class TemplateUpdateRequest(BaseModel):
    """Update template request."""

    name: str | None = None
    description: str | None = None
    journal_name: str | None = None
    publisher: str | None = None
    category: str | None = None
    is_active: bool | None = None
    is_featured: bool | None = None


class TemplateResponse(BaseModel):
    """Template response."""

    id: UUID
    name: str
    slug: str
    description: str | None = None
    journal_name: str | None = None
    publisher: str | None = None
    category: str
    thumbnail_url: str | None = None
    is_active: bool
    is_featured: bool
    version: int
    created_at: datetime

    model_config = {"from_attributes": True}


class TemplateFileResponse(BaseModel):
    """Template file response."""

    id: UUID
    template_id: UUID
    file_path: str
    file_type: str
    created_at: datetime

    model_config = {"from_attributes": True}
