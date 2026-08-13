import { getSiteConfig } from "@/lib/constants/site";
import { Card } from "@/components/ui/Card";

export function BankingDetails() {
  const { bank } = getSiteConfig();

  const details = [
    { label: "Bank", value: bank.name },
    { label: "Account Name", value: bank.accountName },
    { label: "Account Number", value: bank.accountNumber },
    { label: "Branch Code", value: bank.branchCode },
    { label: "Reference", value: bank.reference },
  ];

  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold text-navy-900">EFT Banking Details</h3>
      <dl className="space-y-3">
        {details.map((item) => (
          <div key={item.label} className="flex justify-between border-b border-gray-100 pb-3 last:border-0">
            <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
            <dd className="text-sm font-semibold text-navy-900">{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-gray-500">
        Please use the reference above so we can acknowledge your donation.
      </p>
    </Card>
  );
}
