import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-navy-900">
          We couldn&apos;t find that page
        </h1>
        <p className="leading-relaxed text-gray-600">
          The page you were looking for may have moved or no longer exists.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button href="/">Go home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );
}
