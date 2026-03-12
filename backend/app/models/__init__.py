"""SQLAlchemy models package."""

from sqlalchemy.orm import declarative_base

# Base class for all models
Base = declarative_base()

# Import all models to register them with Base
from app.models.user import User, OAuthAccount
from app.models.organization import Organization, OrgMember
from app.models.project import Project, ProjectFile, ProjectCollaborator, ProjectVersion
from app.models.template import Template, TemplateFile
from app.models.conversion import Conversion
from app.models.compilation import Compilation
from app.models.collaboration import Comment, TrackChange
from app.models.billing import SubscriptionPlan, Subscription, ApiKey
from app.models.audit import AuditLog

__all__ = [
    "Base",
    "User",
    "OAuthAccount",
    "Organization",
    "OrgMember",
    "Project",
    "ProjectFile",
    "ProjectCollaborator",
    "ProjectVersion",
    "Template",
    "TemplateFile",
    "Conversion",
    "Compilation",
    "Comment",
    "TrackChange",
    "SubscriptionPlan",
    "Subscription",
    "ApiKey",
    "AuditLog",
]
