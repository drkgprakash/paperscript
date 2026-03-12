"""LaTeX compilation job model."""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID

from app.models import Base


class Compilation(Base):
    """LaTeX compilation job."""

    __tablename__ = "compilations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    triggered_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status = Column(
        Enum("queued", "compiling", "success", "failed", name="compilation_status"),
        nullable=False,
        default="queued",
    )
    compiler = Column(String(50), default="pdflatex", nullable=False)
    log_output = Column(Text, nullable=True)
    pdf_storage_key = Column(String(500), nullable=True)
    duration_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self) -> str:
        return f"<Compilation {self.id} status={self.status}>"
