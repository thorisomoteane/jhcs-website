import type { Metadata } from "next";
import { Clock, HeartHandshake, Users } from "lucide-react";
import { COMMUNITIES } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join the Jan Hofmeyer Community Services volunteer team and help serve families across Jan Hofmeyer, Vredepark and Vrededorp.",
};

const ways = [
  {
    icon: HeartHandshake,
    title: "Serve Meals",
    description:
      "Help prepare and distribute meals at our weekly food programme.",
  },
  {
    icon: Users,
    title: "Support Shelter",
    description:
      "Assist with intake, care packages and companionship for residents.",
  },
  {
    icon: Clock,
    title: "Give Your Skills",
    description:
      "Offer logistics, admin, counselling or trade skills a few hours a month.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Give Your Time, Change a Life"
        subtitle={`Volunteers are the backbone of our work in ${COMMUNITIES.join(", ")}. However much time you have, there is a place for you here.`}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ways To Help"
            title="Where You Can Make a Difference"
            className="mb-12"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {ways.map((way) => (
              <Card key={way.title} className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-forest-700/10">
                  <way.icon className="h-6 w-6 text-forest-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-forest-900">
                  {way.title}
                </h3>
                <p className="text-sm text-gray-600">{way.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Apply"
            title="Volunteer Application"
            subtitle="Tell us a little about yourself and we will be in touch."
            className="mb-10"
          />
          <Card hover={false}>
            <VolunteerForm />
          </Card>
        </div>
      </section>
    </>
  );
}
