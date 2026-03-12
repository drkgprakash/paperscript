"use client";

import { useStats, useAuditLogs } from "@/hooks/use-admin";
import {
  Users,
  FolderOpen,
  BookOpen,
  UserCheck,
  Loader2,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { stats, loading: statsLoading } = useStats();
  const { logs, loading: logsLoading } = useAuditLogs();

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Active Users", value: stats.activeUsers, icon: UserCheck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Projects", value: stats.totalProjects, icon: FolderOpen, color: "text-purple-600 bg-purple-50" },
    { label: "Templates", value: stats.totalTemplates, icon: BookOpen, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
      <p className="mt-1 text-sm text-gray-500">Platform statistics and recent activity</p>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                {statsLoading ? (
                  <Loader2 className="mt-1 h-5 w-5 animate-spin text-gray-300" />
                ) : (
                  <p className="mt-1 text-2xl font-bold text-gray-900">{s.value}</p>
                )}
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white">
          {logsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
            </div>
          ) : logs.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No activity recorded yet
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {logs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{log.action}</span>
                    {log.resource_type && (
                      <span className="ml-2 text-xs text-gray-400">
                        on {log.resource_type}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
