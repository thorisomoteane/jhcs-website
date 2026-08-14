import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "upcoming"
    | "past"
    | "new"
    | "contacted"
    | "archived"
    | "draft"
    | "published";
  className?: string;
}

const variantStyles = {
  default: "bg-gray-100 text-gray-700",
  upcoming: "bg-tan-100 text-tan-700",
  past: "bg-forest-100 text-forest-700",
  new: "bg-tan-100 text-tan-700",
  contacted: "bg-blue-100 text-blue-800",
  archived: "bg-gray-100 text-gray-500",
  draft: "bg-tan-100 text-tan-700",
  published: "bg-forest-100 text-forest-700",
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
