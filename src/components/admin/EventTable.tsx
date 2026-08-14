"use client";

import type { Event } from "@/types/event";
import { formatEventDateTime } from "@/lib/utils/dates";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { handleDeleteEvent } from "./EventForm";

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onRefresh: () => void;
}

export function EventTable({ events, onEdit, onRefresh }: EventTableProps) {
  if (events.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">No events yet. Create your first event.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-forest-900">{event.title}</td>
              <td className="px-4 py-3 text-gray-600">
                {formatEventDateTime(event.date)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={event.status}>{event.status}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(event)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteEvent(event, onRefresh)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
