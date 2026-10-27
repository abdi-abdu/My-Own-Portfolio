import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration is loaded from environment variables (see .env /
// .env.example). These values are client-safe — they identify the Firebase
// project but are NOT secret. Real access control is enforced by the
// Firestore and Storage security rules in this repo (firestore.rules,
// storage.rules), not by keeping these values hidden.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    "Missing Firebase configuration. Copy .env.example to .env and fill in your Firebase project values."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environments that support it)
export const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
