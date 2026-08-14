"use client";

import type { Post } from "@/types/post";
import { getPostById } from "@/lib/firebase/firestore";
import { useFirestoreDoc } from "./useFirestoreDoc";

export function usePost(id: string) {
  const { item, loading, error } = useFirestoreDoc<Post>(
    id,
    getPostById,
    "Failed to load post",
  );

  return { post: item, loading, error };
}
