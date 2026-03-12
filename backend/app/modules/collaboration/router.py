"""Collaboration API endpoints (comments, track changes, WebSocket)."""

from uuid import UUID
from fastapi import APIRouter, WebSocket

from app.dependencies import CurrentUser, DbSession
from app.schemas.collaboration import (
    CommentCreateRequest,
    CommentResponse,
    CommentUpdateRequest,
    TrackChangeResponse,
)
from app.schemas.common import MessageResponse

router = APIRouter()


# WebSocket for real-time collaboration
@router.websocket("/ws/projects/{project_id}")
async def collaboration_websocket(websocket: WebSocket, project_id: UUID):
    """WebSocket endpoint for real-time document collaboration (CRDT sync)."""
    await websocket.accept()
    # TODO: Implement Y.js CRDT sync, presence, cursor sharing
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"echo: {data}")
    except Exception:
        pass


# Comments
@router.get("/projects/{project_id}/comments", response_model=list[CommentResponse])
async def list_comments(project_id: UUID, user: CurrentUser, db: DbSession):
    """List comments on a project."""
    # TODO: Implement
    return []


@router.post("/projects/{project_id}/comments", response_model=CommentResponse, status_code=201)
async def create_comment(project_id: UUID, request: CommentCreateRequest, user: CurrentUser, db: DbSession):
    """Create a comment."""
    # TODO: Implement
    raise NotImplementedError("Not yet implemented")


@router.put("/projects/{project_id}/comments/{comment_id}", response_model=CommentResponse)
async def update_comment(project_id: UUID, comment_id: UUID, request: CommentUpdateRequest, user: CurrentUser, db: DbSession):
    """Update a comment."""
    raise NotImplementedError("Not yet implemented")


@router.delete("/projects/{project_id}/comments/{comment_id}")
async def delete_comment(project_id: UUID, comment_id: UUID, user: CurrentUser, db: DbSession):
    """Delete a comment."""
    raise NotImplementedError("Not yet implemented")


@router.patch("/projects/{project_id}/comments/{comment_id}/resolve", response_model=MessageResponse)
async def resolve_comment(project_id: UUID, comment_id: UUID, user: CurrentUser, db: DbSession):
    """Resolve a comment."""
    raise NotImplementedError("Not yet implemented")


# Track Changes
@router.get("/projects/{project_id}/changes", response_model=list[TrackChangeResponse])
async def list_changes(project_id: UUID, user: CurrentUser, db: DbSession):
    """List track changes."""
    return []


@router.patch("/projects/{project_id}/changes/{change_id}")
async def review_change(project_id: UUID, change_id: UUID, action: str, user: CurrentUser, db: DbSession):
    """Accept or reject a tracked change."""
    raise NotImplementedError("Not yet implemented")
