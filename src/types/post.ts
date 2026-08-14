import type { Timestamp } from "firebase/firestore";

export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  imageUrl?: string;
  imagePath?: string;
  status: PostStatus;
  publishedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostDocument {
  title: string;
  excerpt: string;
  body: string;
  imageUrl?: string;
  imagePath?: string;
  status: PostStatus;
  publishedAt: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface PostFormData {
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  status: PostStatus;
  imageFile?: File | null;
}
