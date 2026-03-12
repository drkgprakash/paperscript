"""LaTeX compilation API endpoints."""

from uuid import UUID
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.dependencies import CurrentUser, DbSession
from app.schemas.conversion import CompilationRequest, CompilationResponse

router = APIRouter()


@router.post("/{project_id}/compile", response_model=CompilationResponse, status_code=201)
async def compile_project(project_id: UUID, request: CompilationRequest = None, user: CurrentUser = None, db: DbSession = None):
    """Trigger LaTeX compilation for a project."""
    # TODO: Implement compilation queue
    raise NotImplementedError("Compilation not yet implemented")


@router.get("/{project_id}/compile/{compilation_id}", response_model=CompilationResponse)
async def get_compilation(project_id: UUID, compilation_id: UUID, user: CurrentUser = None, db: DbSession = None):
    """Get compilation job details."""
    raise NotImplementedError("Not yet implemented")


@router.get("/{project_id}/compile/{compilation_id}/log")
async def get_compilation_log(project_id: UUID, compilation_id: UUID, user: CurrentUser = None, db: DbSession = None):
    """Get compilation log output."""
    raise NotImplementedError("Not yet implemented")


@router.get("/{project_id}/compile/{compilation_id}/pdf")
async def get_compilation_pdf(project_id: UUID, compilation_id: UUID, user: CurrentUser = None, db: DbSession = None):
    """Download the compiled PDF."""
    # TODO: Return PDF from MinIO
    raise NotImplementedError("Not yet implemented")
