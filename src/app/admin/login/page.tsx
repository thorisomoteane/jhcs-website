"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import { isFirebaseConfigured, FIREBASE_NOT_CONFIGURED } from "@/lib/firebase/config";
import { SITE_SHORT_NAME } from "@/lib/constants/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ErrorState } from "@/components/ui/States";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const configured = isFirebaseConfigured();

  // Already signed in? Skip the form.
  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin/dashboard");
    }
  }, [loading, user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Signed in.");
      router.replace("/admin/dashboard");
    } catch (err) {
      // Toast stays deliberately generic (don't reveal whether the address
      // exists), but log the real reason for our own debugging.
      console.error("Sign in failed:", err);
      toast.error("Sign in failed. Check your email and password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-forest-700 text-xl font-bold text-white">
            {SITE_SHORT_NAME.charAt(0)}
          </div>
          <h1 className="font-serif text-2xl font-bold text-forest-900">
            {SITE_SHORT_NAME} Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage events, news and volunteers.
          </p>
        </div>

        {configured ? (
          <Card hover={false}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          </Card>
        ) : (
          <ErrorState message={FIREBASE_NOT_CONFIGURED} />
        )}

        <p className="text-center text-sm text-gray-500">
          <Link href="/" className="font-medium text-forest-700 hover:underline">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
