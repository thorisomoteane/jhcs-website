"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-gray-700 hover:bg-forest-100"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-forest-100 text-forest-700"
                    : "text-gray-700 hover:bg-forest-100",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button href="/donate" size="sm" className="w-full">
                Donate Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
