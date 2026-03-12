"""Common Pydantic schemas used across modules."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class PaginationParams(BaseModel):
    """Pagination query parameters."""

    page: int = 1
    per_page: int = 20


class PaginatedResponse(BaseModel):
    """Standard paginated response wrapper."""

    items: list
    total: int
    page: int
    per_page: int
    total_pages: int


class MessageResponse(BaseModel):
    """Simple message response."""

    detail: str


class TimestampMixin(BaseModel):
    """Mixin for created_at/updated_at fields."""

    created_at: datetime
    updated_at: datetime | None = None


class IDResponse(BaseModel):
    """Response containing just an ID."""

    id: UUID
