"""Template management business logic."""

from uuid import UUID
from fastapi import UploadFile
from slugify import slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.template import Template, TemplateFile
from app.models.user import User
from app.schemas.template import TemplateCreateRequest, TemplateUpdateRequest


class TemplateService:
    """Template management service."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_templates(self, category: str | None, page: int, per_page: int) -> list[Template]:
        """List active templates."""
        query = select(Template).where(Template.is_active == True)
        if category:
            query = query.where(Template.category == category)
        query = query.order_by(Template.is_featured.desc(), Template.name).offset((page - 1) * per_page).limit(per_page)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_template(self, template_id: UUID) -> Template:
        """Get a template by ID."""
        result = await self.db.execute(select(Template).where(Template.id == template_id))
        template = result.scalar_one_or_none()
        if not template:
            raise NotFoundError("Template")
        return template

    async def create_template(self, request: TemplateCreateRequest, admin: User) -> Template:
        """Create a new template."""
        template = Template(
            name=request.name,
            slug=slugify(request.name),
            description=request.description,
            journal_name=request.journal_name,
            publisher=request.publisher,
            category=request.category,
            bibliography_style=request.bibliography_style,
            created_by=admin.id,
        )
        self.db.add(template)
        await self.db.commit()
        await self.db.refresh(template)
        return template

    async def update_template(self, template_id: UUID, request: TemplateUpdateRequest) -> Template:
        """Update a template."""
        template = await self.get_template(template_id)
        for field, value in request.model_dump(exclude_unset=True).items():
            setattr(template, field, value)
        await self.db.commit()
        await self.db.refresh(template)
        return template

    async def delete_template(self, template_id: UUID) -> None:
        """Soft-delete a template."""
        template = await self.get_template(template_id)
        template.is_active = False
        await self.db.commit()

    async def upload_template_file(self, template_id: UUID, file: UploadFile) -> TemplateFile:
        """Upload a file to a template."""
        # TODO: Implement file upload to MinIO
        raise NotImplementedError("Template file upload not yet implemented")
