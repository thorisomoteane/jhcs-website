"use client";

import { motion } from "framer-motion";
import { MISSION } from "@/lib/constants/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CTASection() {
  return (
    <section className="bg-forest-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionHeading
            eyebrow="Join Us"
            title="Be Part of the Change"
            subtitle={MISSION}
            className="mb-8 [&_h2]:text-white [&_p]:text-gray-300"
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/donate" size="lg">
              Donate Today
            </Button>
            <Button
              href="/volunteer"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-forest-900"
            >
              Become a Volunteer
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Mission"
          title="Serving With Compassion"
          subtitle={MISSION}
          className="mb-8"
        />
      </div>
    </section>
  );
}
