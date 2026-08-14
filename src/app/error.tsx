"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  // Next 16.3 stabilised `retry`; `reset` is the older, demoted API.
  retry: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          Something went wrong
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-navy-900">
          We hit an unexpected error
        </h1>
        <p className="leading-relaxed text-gray-600">
          Please try again. If the problem continues, get in touch and let us know
          what you were doing.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400">Reference: {error.digest}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button type="button" onClick={() => retry()}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
