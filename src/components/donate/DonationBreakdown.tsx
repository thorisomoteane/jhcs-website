import { DONATION_BREAKDOWN } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";

export function DonationBreakdown() {
  return (
    <Card>
      <h3 className="mb-2 text-xl font-bold text-navy-900">Where Your Donation Goes</h3>
      <p className="mb-6 text-sm text-gray-500">
        Illustrative breakdown of how donations are allocated across our programmes.
      </p>

      <div className="mb-6 flex h-4 overflow-hidden rounded-full">
        {DONATION_BREAKDOWN.map((item) => (
          <div
            key={item.label}
            className={item.color}
            style={{ width: `${item.percentage}%` }}
            title={`${item.label}: ${item.percentage}%`}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {DONATION_BREAKDOWN.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`mx-auto mb-2 h-3 w-3 rounded-full ${item.color}`} />
            <p className="text-2xl font-bold text-navy-900">{item.percentage}%</p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
