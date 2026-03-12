"""Template and template file models."""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models import Base


class Template(Base):
    """Journal LaTeX template."""

    __tablename__ = "templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    journal_name = Column(String(255), nullable=True)
    publisher = Column(String(255), nullable=True)
    category = Column(
        Enum("journal_article", "thesis", "report", "book", "cv", "other", name="template_category"),
        nullable=False,
        default="journal_article",
    )
    thumbnail_url = Column(String(512), nullable=True)
    storage_path = Column(String(500), nullable=True)
    main_class_file = Column(String(255), nullable=True)
    bibliography_style = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    is_featured = Column(Boolean, default=False, nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    version = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    creator = relationship("User", foreign_keys=[created_by])
    files = relationship("TemplateFile", back_populates="template", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Template {self.slug}>"


class TemplateFile(Base):
    """File within a template (cls, sty, bst, etc.)."""

    __tablename__ = "template_files"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    template_id = Column(UUID(as_uuid=True), ForeignKey("templates.id", ondelete="CASCADE"), nullable=False, index=True)
    file_path = Column(String(500), nullable=False)
    file_type = Column(
        Enum("cls", "sty", "bst", "tex", "cfg", "other", name="template_file_type"),
        nullable=False,
    )
    storage_key = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    template = relationship("Template", back_populates="files")

    def __repr__(self) -> str:
        return f"<TemplateFile {self.file_path}>"
