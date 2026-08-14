import type { Metadata } from "next";
import { HandCoins, ReceiptText, ShieldCheck } from "lucide-react";
import { SECTION_18A_INFO } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BankingDetails } from "@/components/donate/BankingDetails";
import { DonationBreakdown } from "@/components/donate/DonationBreakdown";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support food, shelter and water programmes in Jan Hofmeyer, Vredepark and Vrededorp. Donations are tax-deductible under SARS Section 18A.",
};

const assurances = [
  {
    icon: ShieldCheck,
    title: "Registered NPO",
    description: "Registered NPO 009/757/NPO and a Section 21 company.",
  },
  {
    icon: ReceiptText,
    title: "Section 18A Certificate",
    description: "Qualifying donations receive a tax-deductible certificate.",
  },
  {
    icon: HandCoins,
    title: "Direct to Programmes",
    description: "Funds go to our food, shelter and water work.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your Support Changes Lives"
        subtitle="Every contribution helps us feed families, shelter the vulnerable, and deliver clean water where it is needed most."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {assurances.map((item) => (
              <Card key={item.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-forest-700/10">
                  <item.icon className="h-6 w-6 text-forest-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-forest-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How To Give"
            title="Make a Donation"
            subtitle="Donate by EFT using the details below. Please use the reference so we can acknowledge your gift and issue your certificate."
            className="mb-12"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <BankingDetails />
            <DonationBreakdown />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card hover={false}>
            <h3 className="mb-3 text-xl font-bold text-forest-900">
              Tax Deductibility
            </h3>
            <p className="leading-relaxed text-gray-600">{SECTION_18A_INFO}</p>
          </Card>
        </div>
      </section>
    </>
  );
}
