"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ImageUrlFieldProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  label?: string;
}

/**
 * Cover image as a pasted link rather than a file upload.
 *
 * File uploads need somewhere to live — Firebase Storage — which requires
 * the Blaze (pay-as-you-go) plan. This project is deliberately staying on
 * the free Spark plan for now, so admins paste a link to an image already
 * hosted elsewhere (Unsplash, imgur, your own site) instead.
 *
 * `unoptimized` is required here: Next's image optimizer only fetches from
 * hosts allow-listed in next.config.ts, which can't know in advance which
 * external host an admin will paste a link from. Unoptimized images render
 * as a plain <img> and skip that check entirely, at the cost of Next's
 * automatic resizing/compression for these ones.
 */
export function ImageUrlField({
  value,
  onChange,
  className,
  label = "Image URL",
}: ImageUrlFieldProps) {
  const [broken, setBroken] = useState(false);

  return (
    <div className={cn("space-y-3", className)}>
      <label htmlFor="image-url" className="block text-sm font-medium text-navy-900">
        {label}
      </label>
      <input
        id="image-url"
        type="url"
        value={value}
        onChange={(e) => {
          setBroken(false);
          onChange(e.target.value);
        }}
        placeholder="https://images.unsplash.com/..."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-navy-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
      />
      <p className="text-xs text-gray-500">
        Paste a link to an image already hosted online — file upload needs
        Firebase Storage, which requires the Blaze plan.
      </p>

      {value &&
        (broken ? (
          <div className="flex aspect-video w-full max-w-sm flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-red-300 bg-red-50 text-red-500">
            <ImageOff className="h-6 w-6" />
            <p className="text-xs">Couldn&apos;t load that image — check the link.</p>
          </div>
        ) : (
          <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <Image
              src={value}
              alt="Preview"
              fill
              sizes="384px"
              unoptimized
              className="object-cover"
              onError={() => setBroken(true)}
            />
          </div>
        ))}
    </div>
  );
}
