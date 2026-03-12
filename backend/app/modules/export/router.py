"""Multi-format export API endpoints."""

from uuid import UUID
from fastapi import APIRouter

from app.dependencies import CurrentUser, DbSession

router = APIRouter()


@router.post("/{project_id}/export/pdf")
async def export_pdf(project_id: UUID, user: CurrentUser, db: DbSession):
    """Export project as PDF."""
    # TODO: Trigger compilation and return PDF
    raise NotImplementedError("PDF export not yet implemented")


@router.post("/{project_id}/export/html")
async def export_html(project_id: UUID, user: CurrentUser, db: DbSession):
    """Export project as HTML."""
    # TODO: LaTeX → HTML via make4ht/pandoc
    raise NotImplementedError("HTML export not yet implemented")


@router.post("/{project_id}/export/xml")
async def export_xml(project_id: UUID, user: CurrentUser, db: DbSession):
    """Export project as XML."""
    raise NotImplementedError("XML export not yet implemented")


@router.post("/{project_id}/export/jats")
async def export_jats(project_id: UUID, user: CurrentUser, db: DbSession):
    """Export project as JATS XML."""
    # TODO: LaTeX → JATS via pandoc + custom filters
    raise NotImplementedError("JATS export not yet implemented")


@router.post("/{project_id}/export/epub")
async def export_epub(project_id: UUID, user: CurrentUser, db: DbSession):
    """Export project as ePUB."""
    # TODO: LaTeX → ePUB via pandoc
    raise NotImplementedError("ePUB export not yet implemented")


@router.get("/{project_id}/export/{export_id}")
async def get_export_status(project_id: UUID, export_id: UUID, user: CurrentUser, db: DbSession):
    """Get export job status and download link."""
    raise NotImplementedError("Not yet implemented")
