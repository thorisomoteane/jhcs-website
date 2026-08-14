"use client";

import Link from "next/link";
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
    <Link href={`/posts/${post.id}`} className="block">
      <Card className="overflow-hidden p-0 sm:flex sm:items-stretch">
        <div className="relative aspect-[16/10] bg-gray-100 sm:aspect-auto sm:w-72 sm:shrink-0">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(min-width: 640px) 288px, 100vw"
              // Admin pastes an arbitrary external URL (see ImageUrlField) —
              // the optimizer only allow-lists Firebase Storage, so this
              // must skip it rather than fail to load on any other host.
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-forest-900 to-forest-700">
              <Newspaper className="h-12 w-12 text-forest-100/50" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            {showStatus && <Badge variant={post.status}>{post.status}</Badge>}
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <Newspaper className="h-4 w-4" />
              {formatEventDate(post.publishedAt)}
            </p>
          </div>
          <h3 className="font-serif text-xl font-bold text-forest-900">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}
