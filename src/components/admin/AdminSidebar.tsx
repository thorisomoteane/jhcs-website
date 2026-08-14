"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, LayoutDashboard, LogOut, Newspaper, Users } from "lucide-react";
import { signOut } from "@/lib/firebase/auth";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/events", label: "Events", icon: CalendarDays },
  { href: "/admin/dashboard/posts", label: "News", icon: Newspaper },
  { href: "/admin/dashboard/volunteers", label: "Volunteers", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.replace("/admin/login");
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-5">
        <p className="font-serif text-lg font-bold text-forest-900">JHCS Admin</p>
        <p className="text-xs text-gray-500">Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-forest-900 text-white"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
