import type { NextConfig } from "next";

const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        // Scoped to this project's bucket when configured, otherwise any bucket.
        pathname: storageBucket ? `/v0/b/${storageBucket}/o/**` : "/v0/b/**",
        // `search` is deliberately omitted: Firebase download URLs carry
        // ?alt=media&token=..., and a fixed search value would reject them.
      },
    ],
  },
};

export default nextConfig;
