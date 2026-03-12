"use client";

import { useAdminPlans } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import type { SubscriptionPlan } from "@/types";

export default function AdminPlansPage() {
  const { plans, loading, update } = useAdminPlans();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<SubscriptionPlan>>({});

  const startEdit = (plan: SubscriptionPlan) => {
    setEditingId(plan.id);
    setForm({
      name: plan.name,
      price_monthly: plan.price_monthly,
      price_yearly: plan.price_yearly,
      max_projects: plan.max_projects,
      max_collaborators: plan.max_collaborators,
      max_compilations_per_day: plan.max_compilations_per_day,
      max_storage_mb: plan.max_storage_mb,
    });
  };

  const save = async () => {
    if (editingId) {
      await update(editingId, form);
      setEditingId(null);
    }
  };

  const fields: { key: keyof SubscriptionPlan; label: string; prefix?: string; suffix?: string }[] = [
    { key: "price_monthly", label: "Monthly", prefix: "$" },
    { key: "price_yearly", label: "Yearly", prefix: "$" },
    { key: "max_projects", label: "Projects" },
    { key: "max_collaborators", label: "Collaborators" },
    { key: "max_compilations_per_day", label: "Compilations/day" },
    { key: "max_storage_mb", label: "Storage", suffix: "MB" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Plans & Billing</h1>
      <p className="mt-1 text-sm text-gray-500">Manage subscription plan limits and pricing</p>

      {loading ? (
        <div className="mt-12 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const isEditing = editingId === plan.id;
            return (
              <div
                key={plan.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  {isEditing ? (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={save}>
                        <Check className="h-4 w-4 text-emerald-600" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => startEdit(plan)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  {fields.map((f) => (
                    <div key={f.key} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{f.label}</span>
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          {f.prefix && <span className="text-xs text-gray-400">{f.prefix}</span>}
                          <input
                            type="number"
                            value={form[f.key] as number}
                            onChange={(e) =>
                              setForm({ ...form, [f.key]: parseFloat(e.target.value) || 0 })
                            }
                            className="w-20 rounded border border-gray-200 px-2 py-1 text-right text-sm focus:border-primary-300 focus:outline-none"
                          />
                          {f.suffix && <span className="text-xs text-gray-400">{f.suffix}</span>}
                        </div>
                      ) : (
                        <span className="font-medium text-gray-900">
                          {f.prefix}
                          {(plan[f.key] as number) === -1
                            ? "Unlimited"
                            : plan[f.key]?.toString()}
                          {f.suffix && (plan[f.key] as number) !== -1 ? ` ${f.suffix}` : ""}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Features list */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium text-gray-500">Features</p>
                  <ul className="mt-2 space-y-1">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary-600" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      plan.is_active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {plan.is_active ? "Active" : "Disabled"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => update(plan.id, { is_active: !plan.is_active })}
                  >
                    {plan.is_active ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
