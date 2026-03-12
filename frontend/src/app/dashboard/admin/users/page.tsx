"use client";

import { useProfiles } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Search, Loader2, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import type { UserRole } from "@/types";

const roles: UserRole[] = ["admin", "editor", "author", "reviewer"];

const roleBadge: Record<string, string> = {
  admin: "bg-red-50 text-red-700",
  editor: "bg-blue-50 text-blue-700",
  author: "bg-gray-100 text-gray-700",
  reviewer: "bg-purple-50 text-purple-700",
};

export default function AdminUsersPage() {
  const { profiles, count, loading, fetch, updateRole, toggleActive } = useProfiles();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(search || undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">{count} total users</p>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
      </form>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
          </div>
        ) : profiles.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No users found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500">User</th>
                <th className="px-5 py-3 font-medium text-gray-500">Role</th>
                <th className="px-5 py-3 font-medium text-gray-500">Status</th>
                <th className="px-5 py-3 font-medium text-gray-500">Joined</th>
                <th className="px-5 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium text-gray-900">
                        {profile.full_name || "Unnamed"}
                      </p>
                      <p className="text-xs text-gray-400">{profile.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={profile.role}
                      onChange={(e) => updateRole(profile.id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium focus:ring-2 focus:ring-primary-200 ${roleBadge[profile.role]}`}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        profile.is_active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {profile.is_active ? (
                        <>
                          <UserCheck className="h-3 w-3" /> Active
                        </>
                      ) : (
                        <>
                          <UserX className="h-3 w-3" /> Disabled
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(profile.id, !profile.is_active)}
                    >
                      {profile.is_active ? "Disable" : "Enable"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
