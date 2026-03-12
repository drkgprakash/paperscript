"""Project management business logic."""

from uuid import UUID
from fastapi import UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ForbiddenError, NotFoundError
from app.models.project import Project, ProjectCollaborator, ProjectFile, ProjectVersion
from app.models.user import User
from app.schemas.project import CollaboratorRequest, ProjectCreateRequest, ProjectUpdateRequest


class ProjectService:
    """Project management service."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_project(self, request: ProjectCreateRequest, user: User) -> Project:
        """Create a new project."""
        project = Project(
            owner_id=user.id,
            title=request.title,
            description=request.description,
            template_id=request.template_id,
            org_id=request.org_id,
            storage_path=f"projects/{user.id}",
        )
        self.db.add(project)
        await self.db.commit()
        await self.db.refresh(project)
        return project

    async def get_project(self, project_id: UUID, user: User) -> Project:
        """Get a project, verifying access."""
        result = await self.db.execute(select(Project).where(Project.id == project_id))
        project = result.scalar_one_or_none()
        if not project:
            raise NotFoundError("Project")
        # TODO: Check collaborator access
        return project

    async def list_projects(self, user: User, page: int = 1, per_page: int = 20) -> list[Project]:
        """List projects owned by or shared with user."""
        offset = (page - 1) * per_page
        result = await self.db.execute(
            select(Project)
            .where(Project.owner_id == user.id, Project.status != "deleted")
            .order_by(Project.updated_at.desc())
            .offset(offset)
            .limit(per_page)
        )
        return list(result.scalars().all())

    async def update_project(self, project_id: UUID, request: ProjectUpdateRequest, user: User) -> Project:
        """Update a project."""
        project = await self.get_project(project_id, user)
        if project.owner_id != user.id:
            raise ForbiddenError()
        for field, value in request.model_dump(exclude_unset=True).items():
            setattr(project, field, value)
        await self.db.commit()
        await self.db.refresh(project)
        return project

    async def delete_project(self, project_id: UUID, user: User) -> None:
        """Soft-delete a project."""
        project = await self.get_project(project_id, user)
        if project.owner_id != user.id:
            raise ForbiddenError()
        project.status = "deleted"
        await self.db.commit()

    async def list_files(self, project_id: UUID, user: User) -> list[ProjectFile]:
        """List files in a project."""
        await self.get_project(project_id, user)  # Access check
        result = await self.db.execute(
            select(ProjectFile).where(ProjectFile.project_id == project_id)
        )
        return list(result.scalars().all())

    async def upload_file(self, project_id: UUID, file: UploadFile, user: User) -> ProjectFile:
        """Upload a file to a project."""
        # TODO: Implement file upload to MinIO
        raise NotImplementedError("File upload not yet implemented")

    async def add_collaborator(self, project_id: UUID, request: CollaboratorRequest, user: User) -> ProjectCollaborator:
        """Add a collaborator."""
        project = await self.get_project(project_id, user)
        if project.owner_id != user.id:
            raise ForbiddenError()
        collab = ProjectCollaborator(
            project_id=project_id,
            user_id=request.user_id,
            permission=request.permission,
            invited_by=user.id,
        )
        self.db.add(collab)
        await self.db.commit()
        await self.db.refresh(collab)
        return collab

    async def list_collaborators(self, project_id: UUID, user: User) -> list[ProjectCollaborator]:
        """List collaborators."""
        await self.get_project(project_id, user)
        result = await self.db.execute(
            select(ProjectCollaborator).where(ProjectCollaborator.project_id == project_id)
        )
        return list(result.scalars().all())

    async def list_versions(self, project_id: UUID, user: User) -> list[ProjectVersion]:
        """List versions."""
        await self.get_project(project_id, user)
        result = await self.db.execute(
            select(ProjectVersion).where(ProjectVersion.project_id == project_id).order_by(ProjectVersion.version_number.desc())
        )
        return list(result.scalars().all())

    async def create_version(self, project_id: UUID, label: str | None, user: User) -> ProjectVersion:
        """Create a version snapshot."""
        # TODO: Implement version snapshotting
        raise NotImplementedError("Version creation not yet implemented")
