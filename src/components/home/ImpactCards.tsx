"use client";

import { Droplets, Home, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { IMPACT_AREAS } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  utensils: UtensilsCrossed,
  home: Home,
  droplets: Droplets,
};

export function ImpactCards() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Impact"
          title="Making a Difference Every Day"
          subtitle="Through food, shelter, and water programmes, we serve the most vulnerable members of our community."
          className="mb-12"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {IMPACT_AREAS.map((area, index) => {
            const Icon = iconMap[area.icon];
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                    <Icon className="h-7 w-7 text-amber-500" />
                  </div>
                  <p className="mb-1 text-3xl font-bold text-navy-900">{area.stat}</p>
                  <h3 className="mb-2 text-xl font-semibold text-navy-900">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
