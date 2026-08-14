"use client";

import Link from "next/link";
import { CalendarDays, Newspaper, Users } from "lucide-react";
import { useEvents } from "@/lib/hooks/useEvents";
import { usePosts } from "@/lib/hooks/usePosts";
import { useVolunteers } from "@/lib/hooks/useVolunteers";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/States";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { posts, loading: postsLoading } = usePosts();
  const { volunteers, loading: volunteersLoading } = useVolunteers();

  const stats = [
    {
      label: "Upcoming Events",
      value: events.filter((e) => e.status === "upcoming").length,
      total: `${events.length} total`,
      loading: eventsLoading,
      icon: CalendarDays,
      href: "/admin/dashboard/events",
    },
    {
      label: "Published News",
      value: posts.filter((p) => p.status === "published").length,
      total: `${posts.filter((p) => p.status === "draft").length} draft(s)`,
      loading: postsLoading,
      icon: Newspaper,
      href: "/admin/dashboard/posts",
    },
    {
      label: "New Applications",
      value: volunteers.filter((v) => v.status === "new").length,
      total: `${volunteers.length} total`,
      loading: volunteersLoading,
      icon: Users,
      href: "/admin/dashboard/volunteers",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user?.email ? `Signed in as ${user.email}` : "Dashboard"}
        </p>
      </div>

      {eventsError && <ErrorState message={eventsError} />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="block">
            <Card className="h-full">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10">
                <stat.icon className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-navy-900">
                {stat.loading ? "—" : stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-navy-900">{stat.label}</p>
              <p className="mt-1 text-xs text-gray-500">
                {stat.loading ? "Loading…" : stat.total}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
