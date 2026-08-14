"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils/cn";

// Mirrors the cap enforced in storage.rules — reject here so the user gets a
// clear message instead of an opaque permission error from Firebase.
const MAX_BYTES = 5 * 1024 * 1024;

interface ImageUploadProps {
  currentUrl?: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
  label?: string;
}

export function ImageUpload({
  currentUrl,
  onFileSelect,
  className,
  label = "Event Image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = currentUrl;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file && !file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    if (file && file.size > MAX_BYTES) {
      toast.error("That image is larger than 5MB. Please choose a smaller file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    onFileSelect(file);
  }

  function handleClear() {
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-navy-900">{label}</label>

      {previewUrl ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-gray-200">
          {/* previewUrl is a blob: URL for a freshly picked file, which the
              optimizer cannot fetch — skip it. */}
          <Image
            src={previewUrl}
            alt="Event preview"
            fill
            sizes="384px"
            unoptimized={previewUrl.startsWith("blob:")}
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full max-w-sm flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-gray-500 transition-colors hover:border-amber-500 hover:bg-amber-50/50"
        >
          <Upload className="h-8 w-8" />
          <span className="text-sm font-medium">Click to upload image</span>
          <span className="text-xs">PNG, JPG up to 5MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
