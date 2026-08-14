import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { SocialLinks } from "@/components/contact/SocialLinks";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jan Hofmeyer Community Services — phone, email, office address and social channels.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="Questions, partnerships, or donations in kind — we would love to hear from you."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Reach Us"
                title="Contact Details"
                align="left"
              />
              <ContactInfo />
              <Card hover={false}>
                <h3 className="mb-4 text-lg font-semibold text-forest-900">
                  Follow Our Work
                </h3>
                <SocialLinks />
              </Card>
            </div>

            <div className="space-y-6">
              <SectionHeading eyebrow="Find Us" title="Our Office" align="left" />
              <MapEmbed />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
