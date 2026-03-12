"""Project, file, collaborator, and version models."""

import uuid
from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models import Base


class Project(Base):
    """Document project (collection of LaTeX files)."""

    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="SET NULL"), nullable=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    template_id = Column(UUID(as_uuid=True), ForeignKey("templates.id", ondelete="SET NULL"), nullable=True, index=True)
    status = Column(
        Enum("draft", "active", "archived", "deleted", name="project_status"),
        nullable=False,
        default="active",
    )
    is_public = Column(Boolean, default=False, nullable=False)
    storage_path = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    owner = relationship("User", back_populates="projects", foreign_keys=[owner_id])
    organization = relationship("Organization", back_populates="projects")
    template = relationship("Template")
    files = relationship("ProjectFile", back_populates="project", cascade="all, delete-orphan")
    collaborators = relationship("ProjectCollaborator", back_populates="project", cascade="all, delete-orphan")
    versions = relationship("ProjectVersion", back_populates="project", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Project {self.title}>"


class ProjectFile(Base):
    """File within a project (tex, bib, images, etc.)."""

    __tablename__ = "project_files"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    file_path = Column(String(500), nullable=False)
    file_type = Column(
        Enum("tex", "bib", "cls", "sty", "image", "pdf", "docx", "other", name="file_type"),
        nullable=False,
    )
    content_hash = Column(String(64), nullable=True)
    size_bytes = Column(BigInteger, default=0)
    storage_key = Column(String(500), nullable=False)
    is_main = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    project = relationship("Project", back_populates="files")

    def __repr__(self) -> str:
        return f"<ProjectFile {self.file_path}>"


class ProjectCollaborator(Base):
    """Project collaborator with permission level."""

    __tablename__ = "project_collaborators"
    __table_args__ = (
        UniqueConstraint("project_id", "user_id", name="uq_project_collaborator"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    permission = Column(
        Enum("owner", "editor", "viewer", name="collaborator_permission"),
        nullable=False,
        default="viewer",
    )
    invited_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    accepted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    project = relationship("Project", back_populates="collaborators")
    user = relationship("User", foreign_keys=[user_id])

    def __repr__(self) -> str:
        return f"<ProjectCollaborator project={self.project_id} user={self.user_id}>"


class ProjectVersion(Base):
    """Snapshot version of a project for history tracking."""

    __tablename__ = "project_versions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    version_number = Column(Integer, nullable=False)
    label = Column(String(255), nullable=True)
    snapshot_key = Column(String(500), nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    project = relationship("Project", back_populates="versions")
    creator = relationship("User", foreign_keys=[created_by])

    def __repr__(self) -> str:
        return f"<ProjectVersion {self.project_id}:v{self.version_number}>"
