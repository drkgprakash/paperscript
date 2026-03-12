"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@insforge/nextjs";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/use-profile";
import {
  FileText,
  FolderOpen,
  BookOpen,
  Settings,
  Users,
  BarChart3,
  Plus,
  Search,
  Bell,
  ShieldCheck,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/templates", label: "Templates", icon: BookOpen },
  { href: "/dashboard/collaborators", label: "Collaborators", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAdmin } = useProfile();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-gray-100 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">PaperScript</span>
        </div>

        {/* New Project */}
        <div className="px-4 pt-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700">
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <link.icon className={cn("h-4.5 w-4.5", isActive ? "text-primary-600" : "text-gray-400")} />
                {link.label}
              </Link>
            );
          })}
          {/* Admin link */}
          {isAdmin && (
            <>
              <div className="my-3 border-t border-gray-100" />
              <Link
                href="/dashboard/admin"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname.startsWith("/dashboard/admin")
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <ShieldCheck className={cn("h-4.5 w-4.5", pathname.startsWith("/dashboard/admin") ? "text-amber-600" : "text-gray-400")} />
                Admin
              </Link>
            </>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-700">My Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500" />
            </button>
            <div className="lg:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
