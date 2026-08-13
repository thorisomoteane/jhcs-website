import { Facebook, Instagram, Youtube } from "lucide-react";
import { getSiteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialLinksProps {
  variant?: "default" | "footer";
}

export function SocialLinks({ variant = "default" }: SocialLinksProps) {
  const { social } = getSiteConfig();

  const links = [
    { href: social.facebook, label: "Facebook", icon: Facebook },
    { href: social.instagram, label: "Instagram", icon: Instagram },
    { href: social.x, label: "X (Twitter)", icon: XIcon },
    { href: social.youtube, label: "YouTube", icon: Youtube },
  ];

  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
            variant === "footer"
              ? "bg-navy-700 text-gray-300 hover:bg-amber-500 hover:text-navy-900"
              : "bg-gray-100 text-navy-900 hover:bg-amber-500 hover:text-navy-900",
          )}
        >
          <link.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
