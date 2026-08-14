"use client";

import { useState } from "react";
import type { Event } from "@/types/event";
import { useEvents } from "@/lib/hooks/useEvents";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { EventForm } from "@/components/admin/EventForm";
import { EventTable } from "@/components/admin/EventTable";

export default function AdminEventsPage() {
  const { events, loading, error, refetch } = useEvents();
  const [editing, setEditing] = useState<Event | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(event: Event) {
    setEditing(event);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleSuccess() {
    closeForm();
    await refetch();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-900">Events</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage events shown on the public site.
          </p>
        </div>
        {!formOpen && <Button onClick={openCreate}>New Event</Button>}
      </div>

      {formOpen && (
        <Card hover={false}>
          <h2 className="mb-5 text-lg font-semibold text-forest-900">
            {editing ? "Edit Event" : "New Event"}
          </h2>
          {/* key remounts the form when switching records, so it re-seeds
              its initial state from the new event. */}
          <EventForm
            key={editing?.id ?? "new"}
            event={editing}
            onSuccess={handleSuccess}
            onCancel={closeForm}
          />
        </Card>
      )}

      <Card hover={false} className="p-0">
        {loading ? (
          <LoadingState label="Loading events…" />
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} />
          </div>
        ) : (
          <EventTable events={events} onEdit={openEdit} onRefresh={refetch} />
        )}
      </Card>
    </div>
  );
}
