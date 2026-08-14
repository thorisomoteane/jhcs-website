"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { isFirebaseConfigured, FIREBASE_NOT_CONFIGURED } from "@/lib/firebase/config";
import { ErrorState, LoadingState } from "@/components/ui/States";

/**
 * Client-side gate for the dashboard. Note this is a UX guard, not a security
 * boundary — the real enforcement lives in Firestore Security Rules, since
 * every read/write here goes straight from the browser to Firebase.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (configured && !loading && !user) {
      router.replace("/admin/login");
    }
  }, [configured, loading, user, router]);

  if (!configured) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <ErrorState message={FIREBASE_NOT_CONFIGURED} />
      </div>
    );
  }

  if (loading) {
    return <LoadingState label="Checking your session…" className="py-24" />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-gray-500">Redirecting to sign in…</p>
        <Link href="/admin/login" className="text-sm font-medium text-forest-700 hover:underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
