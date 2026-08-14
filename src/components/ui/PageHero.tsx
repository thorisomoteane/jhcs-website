import { cn } from "@/lib/utils/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Navy banner used as the masthead on every non-home public page. */
export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn("bg-navy-900", className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg leading-relaxed text-gray-300">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
