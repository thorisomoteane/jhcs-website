import { getSiteConfig } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";

export function MapEmbed() {
  const { address } = getSiteConfig();
  const encodedAddress = encodeURIComponent(address);

  return (
    <Card className="overflow-hidden p-0" hover={false}>
      <iframe
        title="JHCS Office Location"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=27.95%2C-26.22%2C28.05%2C-26.18&layer=mapnik&marker=-26.2%2C28.0`}
        className="h-80 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-gray-100 px-4 py-3">
        <p className="text-sm text-gray-600">{address}</p>
        <a
          href={`https://www.openstreetmap.org/search?query=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-forest-700 hover:text-forest-600"
        >
          View larger map
        </a>
      </div>
    </Card>
  );
}
