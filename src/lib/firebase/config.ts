import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  );
}

export const FIREBASE_NOT_CONFIGURED =
  "Firebase is not configured. Add your NEXT_PUBLIC_FIREBASE_* keys to .env.local (see .env.example).";

/**
 * Everything below is lazy on purpose. Initializing at module scope means an
 * empty .env.local throws `auth/invalid-api-key` the moment any component
 * imports this file, taking down the whole page. Deferring the calls lets the
 * UI check isFirebaseConfigured() and render an empty state instead.
 */
let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(FIREBASE_NOT_CONFIGURED);
  }
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
}

export function getDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storageInstance) {
    storageInstance = getStorage(getFirebaseApp());
  }
  return storageInstance;
}
