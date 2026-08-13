"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_SHORT_NAME } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-navy-900 shadow-lg">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 font-bold text-navy-900">
            J
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-white">{SITE_SHORT_NAME}</p>
            <p className="text-xs text-gray-300">Community Services</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-navy-700 text-amber-400"
                  : "text-gray-200 hover:bg-navy-700 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href="/donate" size="sm">
              Donate
            </Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
