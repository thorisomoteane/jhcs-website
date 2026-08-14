"use client";

import Image from "next/image";
import { Newspaper } from "lucide-react";
import type { Post } from "@/types/post";
import { formatEventDate } from "@/lib/utils/dates";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PostCardProps {
  post: Post;
  /** Admin previews show the draft/published badge; the public listing doesn't. */
  showStatus?: boolean;
}

export function PostCard({ post, showStatus = false }: PostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] bg-gray-100">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            // Admin pastes an arbitrary external URL (see ImageUrlField) —
            // the optimizer only allow-lists Firebase Storage, so this must
            // skip it rather than fail to load on any other host.
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
            <Newspaper className="h-12 w-12 text-amber-400/50" />
          </div>
        )}
        {showStatus && (
          <div className="absolute left-4 top-4">
            <Badge variant={post.status}>{post.status}</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 flex items-center gap-2 text-sm text-amber-600">
          <Newspaper className="h-4 w-4" />
          {formatEventDate(post.publishedAt)}
        </p>
        <h3 className="mb-2 text-lg font-bold text-navy-900">{post.title}</h3>
        <p className="line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
      </div>
    </Card>
  );
}
