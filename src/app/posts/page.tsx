"use client";

import { useMemo } from "react";
import { usePosts } from "@/lib/hooks/usePosts";
import { PageHero } from "@/components/ui/PageHero";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { PostGrid } from "@/components/posts/PostGrid";

export default function PostsPage() {
  const { posts, loading, error } = usePosts();

  // Drafts are admin-only; the public listing shows published posts only.
  const published = useMemo(
    () => posts.filter((post) => post.status === "published"),
    [posts],
  );

  return (
    <>
      <PageHero
        eyebrow="News"
        title="Stories From Our Work"
        subtitle="Updates and announcements from the food, shelter and water programmes."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading news…" />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <PostGrid posts={published} />
          )}
        </div>
      </section>
    </>
  );
}
