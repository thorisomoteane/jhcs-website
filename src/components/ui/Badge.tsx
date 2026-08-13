import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "upcoming" | "past" | "new" | "contacted" | "archived";
  className?: string;
}

const variantStyles = {
  default: "bg-gray-100 text-gray-700",
  upcoming: "bg-emerald-100 text-emerald-800",
  past: "bg-gray-100 text-gray-600",
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  archived: "bg-gray-100 text-gray-500",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
