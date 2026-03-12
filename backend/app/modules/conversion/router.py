"""DOCX-to-LaTeX conversion API endpoints."""

from uuid import UUID
from fastapi import APIRouter, UploadFile, File

from app.dependencies import CurrentUser, DbSession
from app.schemas.conversion import ConversionCreateRequest, ConversionResponse

router = APIRouter()


@router.post("", response_model=ConversionResponse, status_code=201)
async def create_conversion(
    template_id: UUID, file: UploadFile = File(...), user: CurrentUser = None, db: DbSession = None
):
    """Upload a DOCX file and start conversion to LaTeX."""
    # TODO: Implement DOCX upload + conversion pipeline
    raise NotImplementedError("Conversion not yet implemented")


@router.get("/{conversion_id}", response_model=ConversionResponse)
async def get_conversion(conversion_id: UUID, user: CurrentUser, db: DbSession):
    """Get conversion job details."""
    # TODO: Implement
    raise NotImplementedError("Not yet implemented")


@router.get("/{conversion_id}/status")
async def get_conversion_status(conversion_id: UUID, user: CurrentUser, db: DbSession):
    """Get conversion job status."""
    # TODO: Implement
    raise NotImplementedError("Not yet implemented")


@router.get("/{conversion_id}/result")
async def get_conversion_result(conversion_id: UUID, user: CurrentUser, db: DbSession):
    """Get conversion result (generated LaTeX)."""
    # TODO: Implement
    raise NotImplementedError("Not yet implemented")
