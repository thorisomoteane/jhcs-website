"use client";

import type { Post } from "@/types/post";
import { PostCard } from "./PostCard";

interface PostGridProps {
  posts: Post[];
  showStatus?: boolean;
}

export function PostGrid({ posts, showStatus = false }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
        <p className="text-lg font-medium text-gray-500">No news yet</p>
        <p className="mt-2 text-sm text-gray-400">
          Check back soon for updates from our programmes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showStatus={showStatus} />
      ))}
    </div>
  );
}
