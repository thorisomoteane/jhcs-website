"use client";

import Link from "next/link";
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
    <Link href={`/events/${event.id}`} className="block">
      <Card className="overflow-hidden p-0 sm:flex sm:items-stretch">
        <div className="relative aspect-[16/10] bg-gray-100 sm:aspect-auto sm:w-72 sm:shrink-0">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="(min-width: 640px) 288px, 100vw"
              // Admin pastes an arbitrary external URL (see ImageUrlField) —
              // the optimizer only allow-lists Firebase Storage, so this
              // must skip it rather than fail to load on any other host.
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-forest-900 to-forest-700">
              <CalendarDays className="h-12 w-12 text-forest-100/50" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={event.status}>{event.status}</Badge>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="h-4 w-4" />
              {formatEventDate(event.date)}
            </p>
          </div>
          <h3 className="font-serif text-xl font-bold text-forest-900">
            {event.title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600">{event.description}</p>
        </div>
      </Card>
    </Link>
  );
}
