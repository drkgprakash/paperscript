"""Authentication request/response schemas."""

from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    """User registration request."""

    email: EmailStr
    password: str
    full_name: str


class LoginRequest(BaseModel):
    """User login request."""

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """JWT token pair response."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    """Refresh token request."""

    refresh_token: str


class ForgotPasswordRequest(BaseModel):
    """Password reset request."""

    email: EmailStr


class ResetPasswordRequest(BaseModel):
    """Password reset with token."""

    token: str
    new_password: str


class VerifyEmailRequest(BaseModel):
    """Email verification request."""

    token: str
