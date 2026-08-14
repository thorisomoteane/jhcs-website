"use client";

import { useVolunteers } from "@/lib/hooks/useVolunteers";
import { Card } from "@/components/ui/Card";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { VolunteerTable } from "@/components/admin/VolunteerTable";

export default function AdminVolunteersPage() {
  const { volunteers, loading, error, refetch } = useVolunteers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Volunteers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Applications submitted through the public volunteer form.
        </p>
      </div>

      <Card hover={false} className="p-0">
        {loading ? (
          <LoadingState label="Loading applications…" />
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} />
          </div>
        ) : (
          <VolunteerTable volunteers={volunteers} onRefresh={refetch} />
        )}
      </Card>
    </div>
  );
}
