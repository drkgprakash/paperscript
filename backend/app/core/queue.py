"""Redis-based task queue for async job processing."""

import json
from typing import Any

import redis.asyncio as redis

from app.config import settings

# Redis connection pool
redis_pool = redis.ConnectionPool.from_url(settings.redis_url, decode_responses=True)


async def get_redis() -> redis.Redis:
    """Get a Redis connection from the pool."""
    return redis.Redis(connection_pool=redis_pool)


async def enqueue_job(queue_name: str, job_data: dict[str, Any]) -> str:
    """Add a job to the queue. Returns the job ID."""
    r = await get_redis()
    job_id = job_data.get("id", "")
    await r.lpush(queue_name, json.dumps(job_data))
    return str(job_id)


async def dequeue_job(queue_name: str, timeout: int = 0) -> dict[str, Any] | None:
    """Pop a job from the queue. Blocks for `timeout` seconds."""
    r = await get_redis()
    result = await r.brpop(queue_name, timeout=timeout)
    if result:
        _, data = result
        return json.loads(data)
    return None


async def publish_event(channel: str, data: dict[str, Any]) -> None:
    """Publish an event to a Redis pub/sub channel."""
    r = await get_redis()
    await r.publish(channel, json.dumps(data))


async def cache_set(key: str, value: Any, ttl: int = 300) -> None:
    """Set a cached value with TTL in seconds."""
    r = await get_redis()
    await r.set(key, json.dumps(value), ex=ttl)


async def cache_get(key: str) -> Any | None:
    """Get a cached value."""
    r = await get_redis()
    data = await r.get(key)
    if data:
        return json.loads(data)
    return None
