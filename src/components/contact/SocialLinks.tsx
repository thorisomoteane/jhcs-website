import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { getSiteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

interface SocialLinksProps {
  variant?: "default" | "footer";
}

// lucide-react v1 dropped all brand icons, so these come from simple-icons.
// They default to color="currentColor", which keeps the styles below working.
export function SocialLinks({ variant = "default" }: SocialLinksProps) {
  const { social } = getSiteConfig();

  const links = [
    { href: social.facebook, label: "Facebook", icon: SiFacebook },
    { href: social.instagram, label: "Instagram", icon: SiInstagram },
    { href: social.x, label: "X (Twitter)", icon: SiX },
    { href: social.youtube, label: "YouTube", icon: SiYoutube },
  ];

  // Footer: compact row of icon-only squares (space is tight in a footer column).
  if (variant === "footer") {
    return (
      <div className="flex gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-700 text-cream transition-colors hover:bg-forest-600"
          >
            <link.icon className="h-5 w-5" title={link.label} />
          </a>
        ))}
      </div>
    );
  }

  // Contact page: labeled vertical list.
  return (
    <div className="space-y-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-forest-100/60",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
            <link.icon className="h-4 w-4" title={link.label} />
          </span>
          <span className="text-sm font-medium text-gray-700">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
