"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_SLIDES } from "@/lib/constants/site";
import { Button } from "@/components/ui/Button";

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <AnimatePresence mode="wait">
        {HERO_SLIDES.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="object-cover"
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Jan Hofmeyer Community Services
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Hope, Dignity &amp; Care for Our Communities
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-xl">
            Feeding families, providing shelter, and delivering clean water to
            marginalized communities across Jan Hofmeyer, Vredepark, and Vrededorp.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/donate" size="lg">
              Donate
            </Button>
            <Button href="/volunteer" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900">
              Volunteer
            </Button>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-8 bg-amber-500" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
