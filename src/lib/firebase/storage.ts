"use client";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getFirebaseStorage } from "./config";

export async function uploadEventImage(
  eventId: string,
  file: File,
): Promise<{ imageUrl: string; imagePath: string }> {
  const imagePath = `events/${eventId}/${Date.now()}-${file.name}`;
  const storageRef = ref(getFirebaseStorage(), imagePath);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);
  return { imageUrl, imagePath };
}

export async function deleteEventImage(imagePath: string): Promise<void> {
  const storageRef = ref(getFirebaseStorage(), imagePath);
  await deleteObject(storageRef);
}

export async function uploadPostImage(
  postId: string,
  file: File,
): Promise<{ imageUrl: string; imagePath: string }> {
  const imagePath = `posts/${postId}/${Date.now()}-${file.name}`;
  const storageRef = ref(getFirebaseStorage(), imagePath);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);
  return { imageUrl, imagePath };
}

export async function deletePostImage(imagePath: string): Promise<void> {
  const storageRef = ref(getFirebaseStorage(), imagePath);
  await deleteObject(storageRef);
}
