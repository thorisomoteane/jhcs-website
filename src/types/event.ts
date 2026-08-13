import type { Timestamp } from "firebase/firestore";

export type EventStatus = "upcoming" | "past";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  imageUrl?: string;
  imagePath?: string;
  status: EventStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventDocument {
  title: string;
  description: string;
  date: Timestamp;
  imageUrl?: string;
  imagePath?: string;
  status: EventStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  imageFile?: File | null;
}
