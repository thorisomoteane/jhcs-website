"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { Event } from "@/types/event";
import { formatEventDate } from "@/lib/utils/dates";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-[16/10] bg-gray-100">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
            <CalendarDays className="h-12 w-12 text-amber-400/50" />
          </div>
        )}
        <div className="absolute left-4 top-4">
          <Badge variant={event.status}>{event.status}</Badge>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-2 flex items-center gap-2 text-sm text-amber-600">
          <CalendarDays className="h-4 w-4" />
          {formatEventDate(event.date)}
        </p>
        <h3 className="mb-2 text-lg font-bold text-navy-900">{event.title}</h3>
        <p className="line-clamp-3 text-sm text-gray-600">{event.description}</p>
      </div>
    </Card>
  );
}
