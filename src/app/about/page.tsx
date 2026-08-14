import type { Metadata } from "next";
import {
  ABOUT_HISTORY,
  COMMUNITIES,
  LEGAL_TEXT,
  MISSION,
  SITE_NAME,
} from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description: MISSION,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Who We Are" subtitle={MISSION} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="Two Decades of Service"
            align="left"
            className="mb-8"
          />
          <div className="max-w-3xl space-y-6">
            {ABOUT_HISTORY.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Where We Work"
            title="The Communities We Serve"
            subtitle="Our programmes are rooted in three neighbouring communities in Johannesburg's west."
            className="mb-12"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {COMMUNITIES.map((community) => (
              <Card key={community} className="text-center">
                <p className="text-xl font-bold text-navy-900">{community}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Food, shelter and water programmes delivered in partnership with
                  local residents.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Governance"
            title="Registration & Compliance"
            className="mb-8"
          />
          <Card hover={false}>
            <p className="leading-relaxed text-gray-600">{LEGAL_TEXT}</p>
            <p className="mt-4 text-sm text-gray-500">
              {SITE_NAME} is governed by a volunteer board and reports annually to
              its members and regulators.
            </p>
          </Card>
        </div>
      </section>

      <CTASection />
    </>
  );
}
