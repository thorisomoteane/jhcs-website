"use client";

import type { Post } from "@/types/post";
import { getPosts } from "@/lib/firebase/firestore";
import { useFirestoreCollection } from "./useFirestoreCollection";

export function usePosts() {
  const { items, loading, error, refetch } = useFirestoreCollection<Post>(
    getPosts,
    "Failed to load posts",
  );

  return { posts: items, loading, error, refetch };
}
