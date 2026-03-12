"""PaperScript FastAPI Application."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.database import engine
from app.models import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup/shutdown events."""
    # Startup: Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: Clean up
    await engine.dispose()


# Create FastAPI app with lifespan
app = FastAPI(
    title=settings.app_name,
    description="Enterprise SaaS platform for scientific journal publishing",
    version="0.1.0",
    debug=settings.app_debug,
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health():
    """Application health check."""
    return {
        "status": "ok",
        "app": settings.app_name,
        "environment": settings.app_env,
    }


# Root endpoint
@app.get("/", tags=["Info"])
async def root():
    """Root endpoint with API information."""
    return {
        "app": settings.app_name,
        "version": "0.1.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }


# Exception handlers
@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Global exception handler."""
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# Include routers (placeholder - will be added in Phase 2)
# from app.modules.auth.router import router as auth_router
# app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
# ... more routers ...


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.app_debug,
    )
