"use client";

import { useMemo, useState } from "react";
import { useEvents } from "@/lib/hooks/useEvents";
import { PageHero } from "@/components/ui/PageHero";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { EventFilters } from "@/components/events/EventFilters";
import { EventGrid } from "@/components/events/EventGrid";

export default function EventsPage() {
  const { events, loading, error } = useEvents();
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const { upcoming, past } = useMemo(
    () => ({
      upcoming: events.filter((event) => event.status === "upcoming"),
      past: events.filter((event) => event.status === "past"),
    }),
    [events],
  );

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="What's Happening"
        subtitle="Food drives, shelter programmes and community gatherings across Jan Hofmeyer, Vredepark and Vrededorp."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
          <EventFilters
            active={filter}
            onChange={setFilter}
            upcomingCount={upcoming.length}
            pastCount={past.length}
          />

          {loading ? (
            <LoadingState label="Loading events…" />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <EventGrid events={filter === "upcoming" ? upcoming : past} />
          )}
        </div>
      </section>
    </>
  );
}
