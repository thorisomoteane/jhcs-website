"use client";

import type { VolunteerApplication } from "@/types/volunteer";
import { getVolunteerApplications } from "@/lib/firebase/firestore";
import { useFirestoreCollection } from "./useFirestoreCollection";

export function useVolunteers() {
  const { items, loading, error, refetch } =
    useFirestoreCollection<VolunteerApplication>(
      getVolunteerApplications,
      "Failed to load volunteer applications",
    );

  return { volunteers: items, loading, error, refetch };
}
