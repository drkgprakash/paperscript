/**
 * InsForge SDK client configuration.
 * Provides database, auth, storage, AI, and real-time services.
 */
import { createClient } from "@insforge/sdk";

export const insforge = createClient({
  baseUrl: "https://insforge.wyze.pro",
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "",
});

export default insforge;
