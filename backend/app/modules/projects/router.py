"""Project management API endpoints."""

from uuid import UUID
from fastapi import APIRouter, UploadFile, File

from app.dependencies import CurrentUser, DbSession
from app.schemas.project import (
    CollaboratorRequest,
    CollaboratorResponse,
    ProjectCreateRequest,
    ProjectFileResponse,
    ProjectResponse,
    ProjectUpdateRequest,
    VersionResponse,
)

router = APIRouter()


@router.post("", response_model=ProjectResponse, status_code=201)
async def create_project(request: ProjectCreateRequest, user: CurrentUser, db: DbSession):
    """Create a new project."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).create_project(request, user)


@router.get("", response_model=list[ProjectResponse])
async def list_projects(user: CurrentUser, db: DbSession, page: int = 1, per_page: int = 20):
    """List user's projects."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).list_projects(user, page, per_page)


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: UUID, user: CurrentUser, db: DbSession):
    """Get project details."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).get_project(project_id, user)


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: UUID, request: ProjectUpdateRequest, user: CurrentUser, db: DbSession):
    """Update a project."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).update_project(project_id, request, user)


@router.delete("/{project_id}")
async def delete_project(project_id: UUID, user: CurrentUser, db: DbSession):
    """Delete (archive) a project."""
    from app.modules.projects.service import ProjectService
    await ProjectService(db).delete_project(project_id, user)
    return {"detail": "Project deleted"}


# File management
@router.get("/{project_id}/files", response_model=list[ProjectFileResponse])
async def list_files(project_id: UUID, user: CurrentUser, db: DbSession):
    """List files in a project."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).list_files(project_id, user)


@router.post("/{project_id}/files", response_model=ProjectFileResponse, status_code=201)
async def upload_file(project_id: UUID, file: UploadFile = File(...), user: CurrentUser = None, db: DbSession = None):
    """Upload a file to a project."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).upload_file(project_id, file, user)


# Collaborators
@router.post("/{project_id}/collaborators", response_model=CollaboratorResponse, status_code=201)
async def add_collaborator(project_id: UUID, request: CollaboratorRequest, user: CurrentUser, db: DbSession):
    """Add a collaborator to a project."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).add_collaborator(project_id, request, user)


@router.get("/{project_id}/collaborators", response_model=list[CollaboratorResponse])
async def list_collaborators(project_id: UUID, user: CurrentUser, db: DbSession):
    """List project collaborators."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).list_collaborators(project_id, user)


# Versions
@router.get("/{project_id}/versions", response_model=list[VersionResponse])
async def list_versions(project_id: UUID, user: CurrentUser, db: DbSession):
    """List project versions."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).list_versions(project_id, user)


@router.post("/{project_id}/versions", response_model=VersionResponse, status_code=201)
async def create_version(project_id: UUID, label: str | None = None, user: CurrentUser = None, db: DbSession = None):
    """Create a version snapshot."""
    from app.modules.projects.service import ProjectService
    return await ProjectService(db).create_version(project_id, label, user)
