"""Project request/response schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ProjectCreateRequest(BaseModel):
    """Create project request."""

    title: str
    description: str | None = None
    template_id: UUID | None = None
    org_id: UUID | None = None


class ProjectUpdateRequest(BaseModel):
    """Update project request."""

    title: str | None = None
    description: str | None = None
    status: str | None = None
    is_public: bool | None = None


class ProjectResponse(BaseModel):
    """Project response."""

    id: UUID
    owner_id: UUID
    org_id: UUID | None = None
    title: str
    description: str | None = None
    template_id: UUID | None = None
    status: str
    is_public: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectFileResponse(BaseModel):
    """Project file response."""

    id: UUID
    project_id: UUID
    file_path: str
    file_type: str
    size_bytes: int
    is_main: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class CollaboratorRequest(BaseModel):
    """Add collaborator request."""

    user_id: UUID
    permission: str = "viewer"


class CollaboratorResponse(BaseModel):
    """Collaborator response."""

    id: UUID
    user_id: UUID
    permission: str
    accepted: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class VersionResponse(BaseModel):
    """Project version response."""

    id: UUID
    version_number: int
    label: str | None = None
    created_by: UUID
    created_at: datetime

    model_config = {"from_attributes": True}
