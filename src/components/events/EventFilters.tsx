"use client";

import { cn } from "@/lib/utils/cn";

interface EventFiltersProps {
  active: "upcoming" | "past";
  onChange: (filter: "upcoming" | "past") => void;
  upcomingCount: number;
  pastCount: number;
}

export function EventFilters({
  active,
  onChange,
  upcomingCount,
  pastCount,
}: EventFiltersProps) {
  return (
    <div className="flex justify-center gap-2">
      {(["upcoming", "past"] as const).map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-lg px-6 py-2.5 text-sm font-semibold capitalize transition-colors",
            active === filter
              ? "bg-navy-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          )}
        >
          {filter} ({filter === "upcoming" ? upcomingCount : pastCount})
        </button>
      ))}
    </div>
  );
}
