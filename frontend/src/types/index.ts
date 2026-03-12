/**
 * Shared TypeScript types for PaperScript frontend.
 * Matches InsForge PostgreSQL schema.
 */

// ── Profiles ──
export type UserRole = "admin" | "editor" | "author" | "reviewer";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  orcid_id: string | null;
  organization: string | null;
  is_active: boolean;
  plan_id: string | null;
  created_at: string;
  updated_at: string;
}

// ── Projects ──
export type ProjectStatus = "draft" | "active" | "archived" | "deleted";

export interface Project {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  template_id: string | null;
  status: ProjectStatus;
  is_public: boolean;
  storage_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectCollaborator {
  id: string;
  project_id: string;
  user_id: string;
  permission: "owner" | "editor" | "viewer";
  invited_by: string | null;
  accepted: boolean;
  created_at: string;
}

// ── Templates ──
export type TemplateCategory =
  | "journal_article"
  | "conference_paper"
  | "thesis"
  | "report"
  | "book"
  | "cv"
  | "other";

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  journal_name: string | null;
  publisher: string | null;
  category: TemplateCategory;
  thumbnail_url: string | null;
  storage_path: string | null;
  main_class_file: string | null;
  bibliography_style: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_by: string | null;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface TemplateFile {
  id: string;
  template_id: string;
  file_path: string;
  file_type: "cls" | "sty" | "bst" | "tex" | "cfg" | "other";
  storage_key: string | null;
  size_bytes: number | null;
  created_at: string;
}

// ── Billing ──
export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number;
  max_projects: number;
  max_collaborators: number;
  max_compilations_per_day: number;
  max_storage_mb: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}

// ── Audit ──
export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}
