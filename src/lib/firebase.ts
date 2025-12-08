import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp0UvfKsLX_u8GtL-g4PTnPOtA6d3Rpgo",
  authDomain: "portfolio-de830.firebaseapp.com",
  projectId: "portfolio-de830",
  storageBucket: "portfolio-de830.firebasestorage.app",
  messagingSenderId: "794305174738",
  appId: "1:794305174738:web:b5579c95bc8a1c8f68610b",
  measurementId: "G-07XPKQ7XHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
