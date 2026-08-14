import { Mail, MapPin, Phone } from "lucide-react";
import { getSiteConfig } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";

export function ContactInfo() {
  const { email, phone, address } = getSiteConfig();

  const items = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Office Address", value: address },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.label} hover={false}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-700/10">
              <item.icon className="h-5 w-5 text-forest-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-semibold text-forest-900 hover:text-forest-700"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-semibold text-forest-900">{item.value}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
