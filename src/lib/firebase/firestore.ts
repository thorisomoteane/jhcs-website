"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import type { Event, EventDocument, EventStatus } from "@/types/event";
import type { Post, PostDocument } from "@/types/post";
import type {
  VolunteerApplication,
  VolunteerDocument,
  VolunteerStatus,
} from "@/types/volunteer";
import { getEventStatus } from "@/lib/utils/dates";
import { getDb } from "./config";

const EVENTS_COLLECTION = "events";
const POSTS_COLLECTION = "posts";
const VOLUNTEERS_COLLECTION = "volunteer_applications";

function mapEvent(id: string, data: EventDocument): Event {
  return {
    id,
    title: data.title,
    description: data.description,
    date: data.date.toDate(),
    imageUrl: data.imageUrl,
    imagePath: data.imagePath,
    status: data.status,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  };
}

function mapPost(id: string, data: PostDocument): Post {
  return {
    id,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    imageUrl: data.imageUrl,
    imagePath: data.imagePath,
    status: data.status,
    publishedAt: data.publishedAt.toDate(),
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  };
}

function mapVolunteer(id: string, data: VolunteerDocument): VolunteerApplication {
  return {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    skills: data.skills,
    message: data.message,
    status: data.status,
    createdAt: data.createdAt?.toDate(),
  };
}

/* -------------------------------------------------------------- events -- */

export async function getEvents(): Promise<Event[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), EVENTS_COLLECTION), orderBy("date", "desc")),
  );
  return snapshot.docs.map((docSnap) =>
    mapEvent(docSnap.id, docSnap.data() as EventDocument),
  );
}

export async function createEvent(
  data: Omit<Event, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const eventDate = data.date;
  const status: EventStatus = getEventStatus(eventDate);
  const docRef = await addDoc(collection(getDb(), EVENTS_COLLECTION), {
    title: data.title,
    description: data.description,
    date: Timestamp.fromDate(eventDate),
    imageUrl: data.imageUrl ?? null,
    imagePath: data.imagePath ?? null,
    status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<Event, "id" | "createdAt" | "updatedAt">>,
): Promise<void> {
  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (data.title !== undefined) payload.title = data.title;
  if (data.description !== undefined) payload.description = data.description;
  if (data.date !== undefined) {
    payload.date = Timestamp.fromDate(data.date);
    payload.status = getEventStatus(data.date);
  }
  if (data.imageUrl !== undefined) payload.imageUrl = data.imageUrl ?? null;
  if (data.imagePath !== undefined) payload.imagePath = data.imagePath ?? null;
  if (data.status !== undefined) payload.status = data.status;

  await updateDoc(doc(getDb(), EVENTS_COLLECTION, id), payload);
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), EVENTS_COLLECTION, id));
}

export async function getEventById(id: string): Promise<Event | null> {
  const snapshot = await getDoc(doc(getDb(), EVENTS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return mapEvent(snapshot.id, snapshot.data() as EventDocument);
}

/* --------------------------------------------------------------- posts -- */

export async function getPosts(): Promise<Post[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), POSTS_COLLECTION), orderBy("publishedAt", "desc")),
  );
  return snapshot.docs.map((docSnap) =>
    mapPost(docSnap.id, docSnap.data() as PostDocument),
  );
}

export async function createPost(
  data: Omit<Post, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), POSTS_COLLECTION), {
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    publishedAt: Timestamp.fromDate(data.publishedAt),
    imageUrl: data.imageUrl ?? null,
    imagePath: data.imagePath ?? null,
    status: data.status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePost(
  id: string,
  data: Partial<Omit<Post, "id" | "createdAt" | "updatedAt">>,
): Promise<void> {
  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (data.title !== undefined) payload.title = data.title;
  if (data.excerpt !== undefined) payload.excerpt = data.excerpt;
  if (data.body !== undefined) payload.body = data.body;
  if (data.publishedAt !== undefined) {
    payload.publishedAt = Timestamp.fromDate(data.publishedAt);
  }
  if (data.imageUrl !== undefined) payload.imageUrl = data.imageUrl ?? null;
  if (data.imagePath !== undefined) payload.imagePath = data.imagePath ?? null;
  if (data.status !== undefined) payload.status = data.status;

  await updateDoc(doc(getDb(), POSTS_COLLECTION, id), payload);
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), POSTS_COLLECTION, id));
}

/* ---------------------------------------------------------- volunteers -- */

export async function createVolunteerApplication(
  data: Omit<VolunteerApplication, "id" | "status" | "createdAt">,
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), VOLUNTEERS_COLLECTION), {
    name: data.name,
    email: data.email,
    phone: data.phone,
    skills: data.skills ?? "",
    message: data.message ?? "",
    status: "new" as VolunteerStatus,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getVolunteerApplications(): Promise<VolunteerApplication[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), VOLUNTEERS_COLLECTION), orderBy("createdAt", "desc")),
  );
  return snapshot.docs.map((docSnap) =>
    mapVolunteer(docSnap.id, docSnap.data() as VolunteerDocument),
  );
}

export async function updateVolunteerStatus(
  id: string,
  status: VolunteerStatus,
): Promise<void> {
  await updateDoc(doc(getDb(), VOLUNTEERS_COLLECTION, id), { status });
}
