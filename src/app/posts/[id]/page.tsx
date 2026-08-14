"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Newspaper } from "lucide-react";
import { usePost } from "@/lib/hooks/usePost";
import { formatEventDate } from "@/lib/utils/dates";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function PostDetailPage(props: PageProps<"/posts/[id]">) {
  // Client Component (usePost needs the browser Firestore SDK), so params —
  // a Promise in Next 16 — is unwrapped with React's use() rather than await.
  const { id } = use(props.params);
  const { post, loading, error } = usePost(id);

  // Firestore rules allow reading any post by id (drafts included — see
  // firestore.rules), so a draft is only kept off the *public* listing by
  // PostGrid's client-side filter. Someone guessing/finding a draft's URL
  // must be blocked here too, or that filter does nothing.
  const isVisible = post && post.status === "published";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to news
      </Link>

      {loading ? (
        <LoadingState label="Loading post…" />
      ) : error ? (
        <ErrorState message={error} />
      ) : !isVisible ? (
        <ErrorState message="We couldn't find that post. It may have been removed." />
      ) : (
        <article>
          {post.imageUrl && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                // Cover image is an admin-pasted URL from any host — see
                // ImageUrlField for why this can't go through the optimizer.
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <p className="mb-4 flex items-center gap-2 text-sm text-amber-600">
            <Newspaper className="h-4 w-4" />
            {formatEventDate(post.publishedAt)}
          </p>

          <h1 className="mb-6 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-6 text-lg font-medium text-gray-500">{post.excerpt}</p>

          <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
            {post.body}
          </div>
        </article>
      )}
    </div>
  );
}
