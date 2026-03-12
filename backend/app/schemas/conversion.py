"""Conversion and compilation request/response schemas."""

from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel


class ConversionCreateRequest(BaseModel):
    """Start a DOCX-to-LaTeX conversion."""

    template_id: UUID


class ConversionResponse(BaseModel):
    """Conversion job response."""

    id: UUID
    project_id: UUID
    status: str
    parsed_structure: dict[str, Any] | None = None
    error_message: str | None = None
    started_at: datetime | None = None
    completed_at: datetime | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class CompilationRequest(BaseModel):
    """Trigger LaTeX compilation."""

    compiler: str = "pdflatex"


class CompilationResponse(BaseModel):
    """Compilation job response."""

    id: UUID
    project_id: UUID
    status: str
    compiler: str
    duration_ms: int | None = None
    created_at: datetime

    model_config = {"from_attributes": True}
