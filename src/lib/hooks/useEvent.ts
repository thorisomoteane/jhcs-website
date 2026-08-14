"use client";

import type { Event } from "@/types/event";
import { getEventById } from "@/lib/firebase/firestore";
import { useFirestoreDoc } from "./useFirestoreDoc";

export function useEvent(id: string) {
  const { item, loading, error } = useFirestoreDoc<Event>(
    id,
    getEventById,
    "Failed to load event",
  );

  return { event: item, loading, error };
}
