import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MISSION, SITE_NAME, SITE_URL } from "@/lib/constants/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToasterProvider } from "@/components/providers/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Hope, Dignity & Care`,
    template: `%s | ${SITE_NAME}`,
  },
  description: MISSION,
  openGraph: {
    title: SITE_NAME,
    description: MISSION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy-900">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
