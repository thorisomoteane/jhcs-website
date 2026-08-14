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
// They default to color="currentColor", which keeps the hover styles below working.
export function SocialLinks({ variant = "default" }: SocialLinksProps) {
  const { social } = getSiteConfig();

  const links = [
    { href: social.facebook, label: "Facebook", icon: SiFacebook },
    { href: social.instagram, label: "Instagram", icon: SiInstagram },
    { href: social.x, label: "X (Twitter)", icon: SiX },
    { href: social.youtube, label: "YouTube", icon: SiYoutube },
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
          <link.icon className="h-5 w-5" title={link.label} />
        </a>
      ))}
    </div>
  );
}
