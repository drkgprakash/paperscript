"""Audit logging middleware for tracking state-changing operations."""

import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("paperscript.audit")

# HTTP methods that indicate state changes
AUDITABLE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}


class AuditMiddleware(BaseHTTPMiddleware):
    """Log state-changing API requests for audit purposes."""

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)

        if request.method in AUDITABLE_METHODS and request.url.path.startswith("/api/"):
            client_ip = request.client.host if request.client else "unknown"
            logger.info(
                "audit_event",
                extra={
                    "method": request.method,
                    "path": request.url.path,
                    "status_code": response.status_code,
                    "client_ip": client_ip,
                    "user_agent": request.headers.get("user-agent", ""),
                },
            )

        return response
