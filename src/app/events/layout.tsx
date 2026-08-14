import type { Metadata } from "next";

// The events page itself is a Client Component (it uses useEvents), and Next 16
// only supports `metadata` exports from Server Components — so it lives here.
export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events from Jan Hofmeyer Community Services — food drives, shelter programmes and community gatherings.",
};

export default function EventsLayout({ children }: LayoutProps<"/events">) {
  return children;
}
