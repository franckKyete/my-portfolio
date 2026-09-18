import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function getClientApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;

  if (getApps().length > 0) {
    app = getApp();
    return app;
  }

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    return null;
  }

  try {
    app = initializeApp(firebaseConfig);
    return app;
  } catch (error) {
    console.warn("Failed to initialize Client Firebase App:", error);
    return null;
  }
}

export function getClientAuth(): Auth | null {
  if (typeof window === "undefined") return null;
  if (auth) return auth;

  const clientApp = getClientApp();
  if (!clientApp) return null;

  try {
    auth = getAuth(clientApp);
    return auth;
  } catch (error) {
    console.warn("Failed to initialize Client Firebase Auth:", error);
    return null;
  }
}
