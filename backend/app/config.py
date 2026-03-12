"""Application configuration using Pydantic Settings."""

from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "PaperScript"
    app_env: str = "development"
    app_debug: bool = True
    app_url: str = "http://localhost:8000"
    frontend_url: str = "http://localhost:3000"
    secret_key: str = "change-me-to-a-real-secret-key"
    allowed_hosts: list[str] = ["localhost", "127.0.0.1"]

    # Database
    postgres_host: str = "postgres"
    postgres_port: int = 5432
    postgres_db: str = "paperscript"
    postgres_user: str = "paperscript"
    postgres_password: str = "paperscript"

    @property
    def database_url(self) -> str:
        """Construct async PostgreSQL URL."""
        return (
            f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    # Redis
    redis_host: str = "redis"
    redis_port: int = 6379
    redis_password: str = "redis"

    @property
    def redis_url(self) -> str:
        """Construct Redis URL."""
        return f"redis://:{self.redis_password}@{self.redis_host}:{self.redis_port}/0"

    # MinIO
    minio_root_user: str = "paperscript"
    minio_root_password: str = "paperscript123"
    minio_endpoint: str = "minio:9000"
    minio_bucket: str = "paperscript"
    minio_use_ssl: bool = False

    # JWT
    jwt_secret_key: str = "change-me-to-a-jwt-secret-key"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7

    # OAuth2
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None
    google_redirect_uri: str = f"{app_url}/api/v1/auth/oauth/google/callback"

    orcid_client_id: Optional[str] = None
    orcid_client_secret: Optional[str] = None
    orcid_redirect_uri: str = f"{app_url}/api/v1/auth/oauth/orcid/callback"

    # OpenAI
    openai_api_key: Optional[str] = None
    openai_model: str = "gpt-4"

    # Email (SMTP)
    smtp_host: Optional[str] = None
    smtp_port: int = 587
    smtp_user: Optional[str] = None
    smtp_password: Optional[str] = None
    smtp_from_email: str = "noreply@paperscript.app"
    smtp_from_name: str = "PaperScript"

    # Stripe
    stripe_secret_key: Optional[str] = None
    stripe_publishable_key: Optional[str] = None
    stripe_webhook_secret: Optional[str] = None

    # LaTeX
    latex_compiler: str = "pdflatex"
    latex_timeout_seconds: int = 60
    latex_max_concurrent: int = 4

    # Rate limiting
    rate_limit_per_minute: int = 60
    rate_limit_burst: int = 10

    # Logging
    log_level: str = "INFO"
    log_format: str = "json"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
