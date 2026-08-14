"use client";

import { useState } from "react";
import type { Post } from "@/types/post";
import { usePosts } from "@/lib/hooks/usePosts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { PostForm } from "@/components/admin/PostForm";
import { PostTable } from "@/components/admin/PostTable";

export default function AdminPostsPage() {
  const { posts, loading, error, refetch } = usePosts();
  const [editing, setEditing] = useState<Post | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(post: Post) {
    setEditing(post);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function handleSuccess() {
    closeForm();
    await refetch();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">News</h1>
          <p className="mt-1 text-sm text-gray-500">
            Write and publish updates shown on the public news page.
          </p>
        </div>
        {!formOpen && <Button onClick={openCreate}>New Post</Button>}
      </div>

      {formOpen && (
        <Card hover={false}>
          <h2 className="mb-5 text-lg font-semibold text-navy-900">
            {editing ? "Edit Post" : "New Post"}
          </h2>
          {/* key remounts the form when switching records, so it re-seeds
              its initial state from the new post. */}
          <PostForm
            key={editing?.id ?? "new"}
            post={editing}
            onSuccess={handleSuccess}
            onCancel={closeForm}
          />
        </Card>
      )}

      <Card hover={false} className="p-0">
        {loading ? (
          <LoadingState label="Loading posts…" />
        ) : error ? (
          <div className="p-6">
            <ErrorState message={error} />
          </div>
        ) : (
          <PostTable posts={posts} onEdit={openEdit} onRefresh={refetch} />
        )}
      </Card>
    </div>
  );
}
