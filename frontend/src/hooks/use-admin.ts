"use client";

import { insforge } from "@/lib/insforge";
import { useCallback, useEffect, useState } from "react";
import type {
  Profile,
  Template,
  SubscriptionPlan,
  AuditLog,
} from "@/types";

// ── Profiles (admin user list) ──
export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async (search?: string) => {
    setLoading(true);
    let query = insforge.database
      .from("profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("email", `%${search}%`);
    }

    const { data, error, count: total } = await query;
    if (!error) {
      setProfiles((data ?? []) as Profile[]);
      setCount(total ?? 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const updateRole = async (userId: string, role: string) => {
    const { error } = await insforge.database
      .from("profiles")
      .update({ role, updated_at: new Date().toISOString() })
      .eq("id", userId);
    if (!error) fetch();
    return { error };
  };

  const toggleActive = async (userId: string, isActive: boolean) => {
    const { error } = await insforge.database
      .from("profiles")
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq("id", userId);
    if (!error) fetch();
    return { error };
  };

  return { profiles, count, loading, fetch, updateRole, toggleActive };
}

// ── Templates (admin CRUD) ──
export function useAdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await insforge.database
      .from("templates")
      .select()
      .order("created_at", { ascending: false });
    if (!error) setTemplates((data ?? []) as Template[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (template: Partial<Template>) => {
    const { data, error } = await insforge.database
      .from("templates")
      .insert(template)
      .select();
    if (!error) fetch();
    return { data, error };
  };

  const update = async (id: string, updates: Partial<Template>) => {
    const { error } = await insforge.database
      .from("templates")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) fetch();
    return { error };
  };

  const remove = async (id: string) => {
    const { error } = await insforge.database
      .from("templates")
      .delete()
      .eq("id", id);
    if (!error) fetch();
    return { error };
  };

  return { templates, loading, fetch, create, update, remove };
}

// ── Subscription Plans ──
export function useAdminPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await insforge.database
      .from("subscription_plans")
      .select()
      .order("price_monthly", { ascending: true });
    if (!error) setPlans((data ?? []) as SubscriptionPlan[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const update = async (id: string, updates: Partial<SubscriptionPlan>) => {
    const { error } = await insforge.database
      .from("subscription_plans")
      .update(updates)
      .eq("id", id);
    if (!error) fetch();
    return { error };
  };

  return { plans, loading, fetch, update };
}

// ── Audit Logs ──
export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async (filters?: { action?: string; limit?: number }) => {
    setLoading(true);
    let query = insforge.database
      .from("audit_logs")
      .select()
      .order("created_at", { ascending: false })
      .limit(filters?.limit ?? 50);

    if (filters?.action) {
      query = query.eq("action", filters.action);
    }

    const { data, error } = await query;
    if (!error) setLogs((data ?? []) as AuditLog[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { logs, loading, fetch };
}

// ── Dashboard Stats ──
export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalTemplates: number;
  activeUsers: number;
}

export function useStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalTemplates: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [users, projects, templates, active] = await Promise.all([
        insforge.database.from("profiles").select("*", { count: "exact", head: true }),
        insforge.database.from("projects").select("*", { count: "exact", head: true }),
        insforge.database.from("templates").select("*", { count: "exact", head: true }),
        insforge.database
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true),
      ]);

      setStats({
        totalUsers: users.count ?? 0,
        totalProjects: projects.count ?? 0,
        totalTemplates: templates.count ?? 0,
        activeUsers: active.count ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  return { stats, loading };
}
