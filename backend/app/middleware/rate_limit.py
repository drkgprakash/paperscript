"""Rate limiting middleware using Redis."""

import time

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

from app.config import settings
from app.core.queue import get_redis


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Sliding window rate limiter using Redis."""

    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for health checks
        if request.url.path in ("/health", "/"):
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        key = f"rate_limit:{client_ip}"

        try:
            r = await get_redis()
            current = await r.get(key)

            if current and int(current) >= settings.rate_limit_per_minute:
                return Response(
                    content='{"detail": "Rate limit exceeded"}',
                    status_code=429,
                    media_type="application/json",
                    headers={
                        "X-RateLimit-Limit": str(settings.rate_limit_per_minute),
                        "X-RateLimit-Remaining": "0",
                        "Retry-After": "60",
                    },
                )

            pipe = r.pipeline()
            pipe.incr(key)
            pipe.expire(key, 60)
            await pipe.execute()

            remaining = settings.rate_limit_per_minute - (int(current or 0) + 1)
        except Exception:
            # If Redis is unavailable, allow the request
            remaining = settings.rate_limit_per_minute

        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(settings.rate_limit_per_minute)
        response.headers["X-RateLimit-Remaining"] = str(max(0, remaining))
        return response
