/**
 * Shared TypeScript types for PaperScript frontend.
 */

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  orcid_id: string | null;
  role: "admin" | "editor" | "author" | "reviewer";
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  owner_id: string;
  org_id: string | null;
  title: string;
  description: string | null;
  template_id: string | null;
  status: "draft" | "active" | "archived" | "deleted";
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_path: string;
  file_type: string;
  size_bytes: number;
  is_main: boolean;
  created_at: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  journal_name: string | null;
  publisher: string | null;
  category: string;
  thumbnail_url: string | null;
  is_featured: boolean;
  version: number;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number;
  max_projects: number;
  max_collaborators_per_project: number;
  features: Record<string, unknown> | null;
}
