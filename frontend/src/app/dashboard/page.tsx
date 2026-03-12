"use client";

import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Clock,
  Users,
  MoreHorizontal,
  Upload,
  BookOpen,
} from "lucide-react";

const recentProjects = [
  {
    id: "1",
    title: "Deep Learning for Climate Pattern Recognition",
    template: "Nature — Research Article",
    updatedAt: "2 hours ago",
    collaborators: 3,
    status: "In Progress",
  },
  {
    id: "2",
    title: "Quantum Error Correction in Topological Systems",
    template: "IEEE — Conference Paper",
    updatedAt: "1 day ago",
    collaborators: 2,
    status: "Review",
  },
  {
    id: "3",
    title: "CRISPR-Cas9 Delivery Mechanisms: A Survey",
    template: "Springer — Review Paper",
    updatedAt: "3 days ago",
    collaborators: 5,
    status: "Draft",
  },
];

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600",
  "In Progress": "bg-blue-50 text-blue-700",
  Review: "bg-amber-50 text-amber-700",
  Published: "bg-emerald-50 text-emerald-700",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your manuscripts and publications
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: FileText,
            title: "Blank Document",
            desc: "Start from scratch with LaTeX",
            color: "text-primary-600 bg-primary-50",
          },
          {
            icon: Upload,
            title: "Import DOCX",
            desc: "Convert Word to LaTeX with AI",
            color: "text-amber-600 bg-amber-50",
          },
          {
            icon: BookOpen,
            title: "Use Template",
            desc: "Start with a journal template",
            color: "text-purple-600 bg-purple-50",
          },
        ].map((action) => (
          <button
            key={action.title}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.color}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{action.title}</p>
              <p className="text-xs text-gray-500">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Recent projects */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        <div className="mt-4 space-y-3">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <FileText className="h-5 w-5 text-gray-500" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-500">{project.template}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <div className="hidden items-center gap-1.5 text-xs text-gray-400 sm:flex">
                  <Users className="h-3.5 w-3.5" />
                  {project.collaborators}
                </div>
                <div className="hidden items-center gap-1.5 text-xs text-gray-400 md:flex">
                  <Clock className="h-3.5 w-3.5" />
                  {project.updatedAt}
                </div>
                <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state (shown when no projects) */}
      {recentProjects.length === 0 && (
        <div className="mt-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No projects yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Create your first project to get started
          </p>
          <Button className="mt-6 gap-2">
            <Plus className="h-4 w-4" /> Create Project
          </Button>
        </div>
      )}
    </div>
  );
}
