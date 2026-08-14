"use client";

// Not currently called from anywhere: EventForm/PostForm use ImageUrlField
// (a pasted link) instead, because Firebase Storage requires the Blaze
// (pay-as-you-go) plan and this project is deliberately staying on the free
// Spark plan for now. Left in place — correct and ready to wire back into
// those forms in place of ImageUrlField once Storage is enabled.
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
