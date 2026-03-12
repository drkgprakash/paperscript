/**
 * InsForge SDK client configuration.
 * Provides database, auth, storage, AI, and real-time services.
 */
import { createClient } from "@insforge/sdk";

export const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "https://insforge.wyze.pro",
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzY2NDZ9.MfQHfauiFJev6x3s7WlsCnhmfEmGKbN9v8QhVVYuoX0",
});

export default insforge;
