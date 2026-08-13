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
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import type { Event, EventDocument, EventStatus } from "@/types/event";
import type { VolunteerApplication, VolunteerDocument, VolunteerStatus } from "@/types/volunteer";
import { getEventStatus } from "@/lib/utils/dates";
import { db } from "./config";

const EVENTS_COLLECTION = "events";
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

export async function getEvents(): Promise<Event[]> {
  const snapshot = await getDocs(
    query(collection(db, EVENTS_COLLECTION), orderBy("date", "desc")),
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
  const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
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

  await updateDoc(doc(db, EVENTS_COLLECTION, id), payload);
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, EVENTS_COLLECTION, id));
}

export async function getEventById(id: string): Promise<Event | null> {
  const snapshot = await getDoc(doc(db, EVENTS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return mapEvent(snapshot.id, snapshot.data() as EventDocument);
}

export async function createVolunteerApplication(
  data: Omit<VolunteerApplication, "id" | "status" | "createdAt">,
): Promise<string> {
  const docRef = await addDoc(collection(db, VOLUNTEERS_COLLECTION), {
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
    query(collection(db, VOLUNTEERS_COLLECTION), orderBy("createdAt", "desc")),
  );
  return snapshot.docs.map((docSnap) =>
    mapVolunteer(docSnap.id, docSnap.data() as VolunteerDocument),
  );
}

export async function updateVolunteerStatus(
  id: string,
  status: VolunteerStatus,
): Promise<void> {
  await updateDoc(doc(db, VOLUNTEERS_COLLECTION, id), { status });
}

export async function ensureEventDoc(id: string): Promise<void> {
  const snapshot = await getDoc(doc(db, EVENTS_COLLECTION, id));
  if (!snapshot.exists()) {
    await setDoc(doc(db, EVENTS_COLLECTION, id), {
      title: "",
      description: "",
      date: Timestamp.fromDate(new Date()),
      status: "upcoming",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}
