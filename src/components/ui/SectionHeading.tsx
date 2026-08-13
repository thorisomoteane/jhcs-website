"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg leading-relaxed text-gray-600">{subtitle}</p>
      )}
    </motion.div>
  );
}
