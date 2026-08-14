"use client";

import type { Event } from "@/types/event";
import { EventCard } from "./EventCard";

interface EventGridProps {
  events: Event[];
}

export function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-cream-50 py-16 text-center">
        <p className="text-lg font-medium text-gray-500">No events found</p>
        <p className="mt-2 text-sm text-gray-400">Check back soon for upcoming events.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
