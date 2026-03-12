"""Template management API endpoints."""

from uuid import UUID
from fastapi import APIRouter, UploadFile, File

from app.dependencies import AdminUser, CurrentUser, DbSession
from app.schemas.template import (
    TemplateCreateRequest,
    TemplateFileResponse,
    TemplateResponse,
    TemplateUpdateRequest,
)

router = APIRouter()


@router.get("", response_model=list[TemplateResponse])
async def list_templates(db: DbSession, category: str | None = None, page: int = 1, per_page: int = 20):
    """List active templates (public gallery)."""
    from app.modules.templates.service import TemplateService
    return await TemplateService(db).list_templates(category, page, per_page)


@router.get("/{template_id}", response_model=TemplateResponse)
async def get_template(template_id: UUID, db: DbSession):
    """Get template details."""
    from app.modules.templates.service import TemplateService
    return await TemplateService(db).get_template(template_id)


@router.post("", response_model=TemplateResponse, status_code=201)
async def create_template(request: TemplateCreateRequest, admin: AdminUser, db: DbSession):
    """Create a new template (admin only)."""
    from app.modules.templates.service import TemplateService
    return await TemplateService(db).create_template(request, admin)


@router.put("/{template_id}", response_model=TemplateResponse)
async def update_template(template_id: UUID, request: TemplateUpdateRequest, admin: AdminUser, db: DbSession):
    """Update a template (admin only)."""
    from app.modules.templates.service import TemplateService
    return await TemplateService(db).update_template(template_id, request)


@router.delete("/{template_id}")
async def delete_template(template_id: UUID, admin: AdminUser, db: DbSession):
    """Delete a template (admin only)."""
    from app.modules.templates.service import TemplateService
    await TemplateService(db).delete_template(template_id)
    return {"detail": "Template deleted"}


@router.post("/{template_id}/files", response_model=TemplateFileResponse, status_code=201)
async def upload_template_file(template_id: UUID, file: UploadFile = File(...), admin: AdminUser = None, db: DbSession = None):
    """Upload a file to a template (admin only)."""
    from app.modules.templates.service import TemplateService
    return await TemplateService(db).upload_template_file(template_id, file)
