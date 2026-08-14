"use client";

import { useCallback, useEffect, useState } from "react";
import { isFirebaseConfigured, FIREBASE_NOT_CONFIGURED } from "@/lib/firebase/config";

function toMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

/**
 * Shared loading/error plumbing for the Firestore-backed listings.
 *
 * `fetcher` must be a stable reference (a module-level function), since it is
 * part of the effect's dependency list.
 *
 * The initial state is derived from isFirebaseConfigured() during render
 * rather than corrected inside the effect, and the initial fetch is written
 * inline so no setState runs synchronously in the effect body — both of which
 * would otherwise cause cascading renders.
 */
export function useFirestoreCollection<T>(
  fetcher: () => Promise<T[]>,
  fallbackError: string,
) {
  const configured = isFirebaseConfigured();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState<string | null>(
    configured ? null : FIREBASE_NOT_CONFIGURED,
  );

  useEffect(() => {
    if (!configured) return;
    const cancellation = { cancelled: false };

    void (async () => {
      try {
        const data = await fetcher();
        if (cancellation.cancelled) return;
        setItems(data);
        setError(null);
      } catch (err) {
        if (cancellation.cancelled) return;
        setError(toMessage(err, fallbackError));
      } finally {
        if (!cancellation.cancelled) setLoading(false);
      }
    })();

    return () => {
      cancellation.cancelled = true;
    };
  }, [configured, fetcher, fallbackError]);

  // Called from event handlers (after a create/update/delete), never from an
  // effect — so setting loading up front is safe here.
  const refetch = useCallback(async () => {
    if (!configured) return;
    setLoading(true);
    setError(null);
    try {
      setItems(await fetcher());
    } catch (err) {
      setError(toMessage(err, fallbackError));
    } finally {
      setLoading(false);
    }
  }, [configured, fetcher, fallbackError]);

  return { items, loading, error, refetch };
}
