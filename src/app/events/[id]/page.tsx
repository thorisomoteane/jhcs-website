"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useEvent } from "@/lib/hooks/useEvent";
import { formatEventDate } from "@/lib/utils/dates";
import { Badge } from "@/components/ui/Badge";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function EventDetailPage(props: PageProps<"/events/[id]">) {
  // Client Component (useEvent needs the browser Firestore SDK), so params —
  // a Promise in Next 16 — is unwrapped with React's use() rather than await.
  const { id } = use(props.params);
  const { event, loading, error } = useEvent(id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-forest-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      {loading ? (
        <LoadingState label="Loading event…" />
      ) : error ? (
        <ErrorState message={error} />
      ) : !event ? (
        <ErrorState message="We couldn't find that event. It may have been removed." />
      ) : (
        <article>
          {event.imageUrl && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                // Cover image is an admin-pasted URL from any host — see
                // ImageUrlField for why this can't go through the optimizer.
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3">
            <Badge variant={event.status}>{event.status}</Badge>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="h-4 w-4" />
              {formatEventDate(event.date)}
            </p>
          </div>

          <h1 className="mb-6 font-serif text-3xl font-bold tracking-tight text-forest-900 md:text-4xl">
            {event.title}
          </h1>

          <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
            {event.description}
          </div>
        </article>
      )}
    </div>
  );
}
