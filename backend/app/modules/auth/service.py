"""Authentication business logic."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import BadRequestError, ConflictError
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import (
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
)


class AuthService:
    """Authentication service."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def register(self, request: RegisterRequest) -> dict:
        """Register a new user."""
        # Check if email already exists
        result = await self.db.execute(select(User).where(User.email == request.email))
        if result.scalar_one_or_none():
            raise ConflictError("Email already registered")

        # Create user
        user = User(
            email=request.email,
            password_hash=hash_password(request.password),
            full_name=request.full_name,
            role="author",
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)

        # Generate tokens
        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }

    async def login(self, request: LoginRequest) -> dict:
        """Authenticate user with email/password."""
        result = await self.db.execute(select(User).where(User.email == request.email))
        user = result.scalar_one_or_none()

        if not user or not user.password_hash:
            raise BadRequestError("Invalid email or password")

        if not verify_password(request.password, user.password_hash):
            raise BadRequestError("Invalid email or password")

        if not user.is_active:
            raise BadRequestError("Account is deactivated")

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }

    async def refresh_token(self, request: RefreshTokenRequest) -> dict:
        """Issue new tokens from a valid refresh token."""
        try:
            payload = decode_token(request.refresh_token)
            if payload.get("type") != "refresh":
                raise BadRequestError("Invalid refresh token")

            user_id = payload.get("sub")
            access_token = create_access_token(user_id)
            refresh_token = create_refresh_token(user_id)

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer",
            }
        except Exception:
            raise BadRequestError("Invalid or expired refresh token")

    async def forgot_password(self, request: ForgotPasswordRequest) -> None:
        """Send password reset email."""
        # TODO: Implement email sending
        pass

    async def reset_password(self, request: ResetPasswordRequest) -> None:
        """Reset password using token."""
        # TODO: Implement password reset
        pass

    async def verify_email(self, request: VerifyEmailRequest) -> None:
        """Verify user email address."""
        # TODO: Implement email verification
        pass
