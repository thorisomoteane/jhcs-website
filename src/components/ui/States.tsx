import { AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Shared loading / error placeholders used by the data-backed listings. */

export function LoadingState({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-gray-500",
        className,
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-forest-700" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function ErrorState({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-6 py-12 text-center",
        className,
      )}
    >
      <AlertTriangle className="h-8 w-8 text-amber-500" />
      <p className="max-w-md text-sm leading-relaxed text-amber-900">{message}</p>
    </div>
  );
}
