import type { Metadata } from "next";
import { AuthProvider } from "@/lib/hooks/useAuth";

export const metadata: Metadata = {
  title: "Admin",
  // Keep the dashboard out of search results.
  robots: { index: false, follow: false },
};

// AuthProvider is mounted here rather than in the root layout so the Firebase
// auth listener (and its bundle) never loads on the public marketing pages.
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AuthProvider>{children}</AuthProvider>;
}
