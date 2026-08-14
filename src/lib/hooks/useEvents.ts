"use client";

import type { Event } from "@/types/event";
import { getEvents } from "@/lib/firebase/firestore";
import { useFirestoreCollection } from "./useFirestoreCollection";

export function useEvents() {
  const { items, loading, error, refetch } = useFirestoreCollection<Event>(
    getEvents,
    "Failed to load events",
  );

  return { events: items, loading, error, refetch };
}
