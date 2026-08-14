"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured, FIREBASE_NOT_CONFIGURED } from "@/lib/firebase/config";

function toMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

/**
 * Fetch a single Firestore document by id — the detail-page counterpart to
 * useFirestoreCollection (see that file for why loading/error start from
 * isFirebaseConfigured() rather than being reset inside the effect, and why
 * the fetch happens behind an `await` rather than synchronously: both avoid
 * a setState call running synchronously in the effect body, which
 * eslint-plugin-react-hooks flags as a cascading-render risk).
 *
 * `item` stays `null` both while loading and when the id genuinely doesn't
 * exist — check `loading`/`error` first, then treat a null item as "not
 * found".
 */
export function useFirestoreDoc<T>(
  id: string,
  fetcher: (id: string) => Promise<T | null>,
  fallbackError: string,
) {
  const configured = isFirebaseConfigured();
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState<string | null>(
    configured ? null : FIREBASE_NOT_CONFIGURED,
  );

  useEffect(() => {
    if (!configured) return;
    const cancellation = { cancelled: false };

    void (async () => {
      try {
        const data = await fetcher(id);
        if (cancellation.cancelled) return;
        setItem(data);
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
  }, [configured, id, fetcher, fallbackError]);

  return { item, loading, error };
}
