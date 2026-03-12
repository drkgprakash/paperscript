"""Authentication API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.auth import (
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    ResetPasswordRequest,
    TokenResponse,
    VerifyEmailRequest,
)
from app.schemas.common import MessageResponse
from app.modules.auth.service import AuthService

router = APIRouter()


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user account."""
    service = AuthService(db)
    return await service.register(request)


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with email and password."""
    service = AuthService(db)
    return await service.login(request)


@router.post("/logout", response_model=MessageResponse)
async def logout():
    """Logout (client-side token invalidation)."""
    return MessageResponse(detail="Successfully logged out")


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: RefreshTokenRequest, db: AsyncSession = Depends(get_db)):
    """Refresh access token using refresh token."""
    service = AuthService(db)
    return await service.refresh_token(request)


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(request: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    """Request password reset email."""
    service = AuthService(db)
    await service.forgot_password(request)
    return MessageResponse(detail="Password reset email sent if account exists")


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(request: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    """Reset password with token."""
    service = AuthService(db)
    await service.reset_password(request)
    return MessageResponse(detail="Password reset successfully")


@router.post("/verify-email", response_model=MessageResponse)
async def verify_email(request: VerifyEmailRequest, db: AsyncSession = Depends(get_db)):
    """Verify email address."""
    service = AuthService(db)
    await service.verify_email(request)
    return MessageResponse(detail="Email verified successfully")


@router.get("/oauth/{provider}/authorize")
async def oauth_authorize(provider: str):
    """Redirect to OAuth provider for authorization."""
    # TODO: Implement OAuth redirect URL generation
    raise HTTPException(status_code=501, detail=f"OAuth with {provider} not yet implemented")


@router.get("/oauth/{provider}/callback", response_model=TokenResponse)
async def oauth_callback(provider: str, code: str, db: AsyncSession = Depends(get_db)):
    """Handle OAuth callback and create/login user."""
    # TODO: Implement OAuth callback handling
    raise HTTPException(status_code=501, detail=f"OAuth with {provider} not yet implemented")
