"""S3-compatible object storage client (MinIO)."""

import io
from typing import BinaryIO

import boto3
from botocore.config import Config

from app.config import settings


class StorageClient:
    """S3-compatible storage client for MinIO."""

    def __init__(self):
        self.client = boto3.client(
            "s3",
            endpoint_url=f"{'https' if settings.minio_use_ssl else 'http'}://{settings.minio_endpoint}",
            aws_access_key_id=settings.minio_root_user,
            aws_secret_access_key=settings.minio_root_password,
            config=Config(signature_version="s3v4"),
            region_name="us-east-1",
        )
        self.bucket = settings.minio_bucket

    def ensure_bucket(self) -> None:
        """Create the default bucket if it doesn't exist."""
        try:
            self.client.head_bucket(Bucket=self.bucket)
        except Exception:
            self.client.create_bucket(Bucket=self.bucket)

    def upload_file(self, key: str, data: BinaryIO, content_type: str = "application/octet-stream") -> str:
        """Upload a file to storage. Returns the storage key."""
        self.client.upload_fileobj(data, self.bucket, key, ExtraArgs={"ContentType": content_type})
        return key

    def upload_bytes(self, key: str, data: bytes, content_type: str = "application/octet-stream") -> str:
        """Upload bytes to storage. Returns the storage key."""
        self.client.upload_fileobj(io.BytesIO(data), self.bucket, key, ExtraArgs={"ContentType": content_type})
        return key

    def download_file(self, key: str) -> bytes:
        """Download a file from storage."""
        response = self.client.get_object(Bucket=self.bucket, Key=key)
        return response["Body"].read()

    def delete_file(self, key: str) -> None:
        """Delete a file from storage."""
        self.client.delete_object(Bucket=self.bucket, Key=key)

    def get_presigned_url(self, key: str, expires_in: int = 3600) -> str:
        """Generate a presigned URL for file download."""
        return self.client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.bucket, "Key": key},
            ExpiresIn=expires_in,
        )

    def list_files(self, prefix: str) -> list[str]:
        """List files under a prefix."""
        response = self.client.list_objects_v2(Bucket=self.bucket, Prefix=prefix)
        return [obj["Key"] for obj in response.get("Contents", [])]


# Singleton instance
storage = StorageClient()
