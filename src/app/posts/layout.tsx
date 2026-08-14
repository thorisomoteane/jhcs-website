import type { Metadata } from "next";

// The posts listing is a Client Component (it uses usePosts), and Next 16 only
// supports `metadata` exports from Server Components — so it lives here.
export const metadata: Metadata = {
  title: "News",
  description:
    "Updates, stories and announcements from Jan Hofmeyer Community Services.",
};

export default function PostsLayout({ children }: LayoutProps<"/posts">) {
  return children;
}
