import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        hover && "transition-shadow hover:border-forest-700/20 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
