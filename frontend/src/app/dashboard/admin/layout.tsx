"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  ScrollText,
  ShieldAlert,
  Loader2,
} from "lucide-react";

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/templates", label: "Templates", icon: BookOpen },
  { href: "/dashboard/admin/plans", label: "Plans & Billing", icon: CreditCard },
  { href: "/dashboard/admin/logs", label: "Audit Logs", icon: ScrollText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useProfile();
  const pathname = usePathname();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!isAdmin) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div>
      {/* Admin header */}
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 px-5 py-3">
        <ShieldAlert className="h-5 w-5 text-amber-600" />
        <span className="text-sm font-medium text-amber-800">
          Admin Panel — Changes here affect all users
        </span>
      </div>

      {/* Admin sub-navigation */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
