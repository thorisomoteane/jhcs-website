"use client";

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "./config";

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signOut() {
  return firebaseSignOut(getFirebaseAuth());
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  // Without config there is no session to observe. Report "signed out" once so
  // consumers can leave their loading state, and hand back a no-op unsubscribe.
  if (!isFirebaseConfigured()) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
