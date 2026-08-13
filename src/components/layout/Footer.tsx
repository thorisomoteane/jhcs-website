"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LEGAL_TEXT, NAV_LINKS, SITE_NAME } from "@/lib/constants/site";
import { SocialLinks } from "@/components/contact/SocialLinks";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-auto bg-navy-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{SITE_NAME}</h3>
            <p className="text-sm leading-relaxed">{LEGAL_TEXT}</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Connect With Us</h3>
            <SocialLinks variant="footer" />
          </div>
        </div>

        <div className="mt-8 border-t border-navy-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
