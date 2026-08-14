"use client";

import type { Post } from "@/types/post";
import { formatEventDateTime } from "@/lib/utils/dates";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { handleDeletePost } from "./PostForm";

interface PostTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onRefresh: () => void;
}

export function PostTable({ posts, onEdit, onRefresh }: PostTableProps) {
  if (posts.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No posts yet. Create your first news post.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Published</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-navy-900">{post.title}</td>
              <td className="px-4 py-3 text-gray-600">
                {formatEventDateTime(post.publishedAt)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={post.status}>{post.status}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(post)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeletePost(post, onRefresh)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
