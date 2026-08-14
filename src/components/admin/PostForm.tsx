"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { Post, PostFormData, PostStatus } from "@/types/post";
import { createPost, deletePost, updatePost } from "@/lib/firebase/firestore";
import { describeError } from "@/lib/utils/errors";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUrlField } from "./ImageUrlField";

interface PostFormProps {
  post?: Post | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyForm: PostFormData = {
  title: "",
  excerpt: "",
  body: "",
  publishedAt: "",
  status: "draft",
  imageUrl: "",
};

function toFormData(post?: Post | null): PostFormData {
  if (!post) return emptyForm;
  return {
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    publishedAt: post.publishedAt.toISOString().slice(0, 16),
    status: post.status,
    imageUrl: post.imageUrl ?? "",
  };
}

/**
 * Callers must pass a `key` that changes with the post being edited (see the
 * admin posts page) — the initial state below is seeded once per mount rather
 * than re-synced from props by an effect.
 */
export function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const [form, setForm] = useState<PostFormData>(() => toFormData(post));
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim() || !form.body.trim() || !form.publishedAt) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const publishedAt = new Date(form.publishedAt);
      const imageUrl = form.imageUrl.trim() || undefined;

      if (post) {
        await updatePost(post.id, {
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          body: form.body.trim(),
          publishedAt,
          status: form.status,
          imageUrl,
        });
        toast.success("Post updated successfully.");
      } else {
        await createPost({
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          body: form.body.trim(),
          publishedAt,
          status: form.status,
          imageUrl,
        });
        toast.success("Post created successfully.");
      }

      onSuccess();
    } catch (err) {
      console.error("Failed to save post:", err);
      toast.error(`Failed to save post: ${describeError(err)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title *"
        value={form.title}
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        placeholder="Post title"
      />
      <Textarea
        label="Excerpt *"
        value={form.excerpt}
        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
        placeholder="Short summary shown on the news listing"
        className="min-h-[80px]"
      />
      <Textarea
        label="Body *"
        value={form.body}
        onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
        placeholder="Full post content"
        className="min-h-[200px]"
      />
      <Input
        label="Publish Date *"
        type="datetime-local"
        value={form.publishedAt}
        onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
      />

      <div className="space-y-2">
        <label htmlFor="post-status" className="block text-sm font-medium text-navy-900">
          Status
        </label>
        <select
          id="post-status"
          value={form.status}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, status: e.target.value as PostStatus }))
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-navy-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        >
          <option value="draft">Draft — not visible on the site</option>
          <option value="published">Published — live on /posts</option>
        </select>
      </div>

      <ImageUrlField
        label="Cover Image URL"
        value={form.imageUrl}
        onChange={(imageUrl) => setForm((prev) => ({ ...prev, imageUrl }))}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export async function handleDeletePost(post: Post, onSuccess: () => void) {
  if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;

  try {
    await deletePost(post.id);
    toast.success("Post deleted.");
    onSuccess();
  } catch (err) {
    console.error("Failed to delete post:", err);
    toast.error(`Failed to delete post: ${describeError(err)}`);
  }
}
