export const SITE_NAME = "Jan Hofmeyer Community Services";
export const SITE_SHORT_NAME = "JHCS";

export const LEGAL_TEXT =
  "Registered NPO [009/757/NPO] since 1 August 2000. Registered Section 21 Company since 20 June 2008. SARS Section 18A registered (donations are tax-deductible). Level 4 B-BBEE compliant.";

export const MISSION =
  "We feed people in need, provide shelter, and supply water to marginalized communities in Jan Hofmeyer, Vredepark, and Vrededorp.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
] as const;

export const COMMUNITIES = ["Jan Hofmeyer", "Vredepark", "Vrededorp"] as const;

export const IMPACT_AREAS = [
  {
    title: "Food",
    stat: "500+",
    description: "Meals served monthly to families facing food insecurity.",
    icon: "utensils" as const,
  },
  {
    title: "Shelter",
    stat: "120+",
    description: "Individuals supported with safe, dignified shelter each year.",
    icon: "home" as const,
  },
  {
    title: "Water",
    stat: "10,000L",
    description: "Clean water delivered monthly to underserved communities.",
    icon: "droplets" as const,
  },
] as const;

export const DONATION_BREAKDOWN = [
  { label: "Food Programmes", percentage: 40, color: "bg-amber-500" },
  { label: "Shelter Support", percentage: 35, color: "bg-navy-700" },
  { label: "Water Logistics", percentage: 25, color: "bg-sky-500" },
] as const;

export const ABOUT_HISTORY = [
  "Since 2000, Jan Hofmeyer Community Services has been a steadfast presence in Johannesburg's western communities. What began as a small outreach initiative has grown into a registered NPO and Section 21 company dedicated to meeting the most urgent needs of our neighbours.",
  "Our work spans three interconnected pillars: nourishing families through food programmes, providing shelter to those without a safe place to sleep, and ensuring access to clean water where infrastructure falls short.",
  "Every day, our volunteers and staff walk alongside residents of Jan Hofmeyer, Vredepark, and Vrededorp — not as outsiders, but as members of the same community committed to dignity, hope, and lasting change.",
] as const;

export const SECTION_18A_INFO =
  "As a SARS Section 18A registered organisation, your donations to JHCS are tax-deductible. You will receive a Section 18A certificate for qualifying donations, which can be submitted with your annual tax return.";

export function getSiteConfig() {
  return {
    email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "info@jhcs.org.za",
    phone: process.env.NEXT_PUBLIC_SITE_PHONE ?? "+27 00 000 0000",
    address:
      process.env.NEXT_PUBLIC_SITE_ADDRESS ??
      "Jan Hofmeyer, Johannesburg, South Africa",
    bank: {
      name: process.env.NEXT_PUBLIC_BANK_NAME ?? "Example Bank",
      accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME ?? "JHCS NPO",
      accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER ?? "0000000000",
      branchCode: process.env.NEXT_PUBLIC_BANK_BRANCH_CODE ?? "000000",
      reference: process.env.NEXT_PUBLIC_BANK_REFERENCE ?? "JHCS-DONATION",
    },
    social: {
      facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "https://facebook.com/",
      instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "https://instagram.com/",
      x: process.env.NEXT_PUBLIC_SOCIAL_X ?? "https://x.com/",
      youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "https://youtube.com/",
    },
  };
}

export const HERO_SLIDES = [
  {
    src: "/images/hero/slide-1.svg",
    alt: "Community members receiving food support",
  },
  {
    src: "/images/hero/slide-2.svg",
    alt: "Volunteers providing shelter assistance",
  },
  {
    src: "/images/hero/slide-3.svg",
    alt: "Water delivery to local communities",
  },
] as const;
