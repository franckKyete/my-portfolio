import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const staticFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let initPromise: Promise<Auth | null> | null = null;

export function getClientApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;

  if (app) return app;

  if (getApps().length > 0) {
    app = getApp();
    return app;
  }

  if (staticFirebaseConfig.apiKey && staticFirebaseConfig.projectId) {
    try {
      app = initializeApp(staticFirebaseConfig);
      return app;
    } catch (error) {
      console.warn("Failed to initialize Client Firebase App:", error);
      return null;
    }
  }

  return null;
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

/**
 * Initializes Client Firebase Auth asynchronously.
 * If build-time environment variables were not present, fetches runtime config from /api/firebase-config.
 */
export async function initClientAuth(): Promise<Auth | null> {
  if (typeof window === "undefined") return null;

  if (auth) return auth;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    // 1. Try synchronous setup if build-time config or existing app is present
    const existingAuth = getClientAuth();
    if (existingAuth) {
      auth = existingAuth;
      return auth;
    }

    // 2. Fetch runtime config from edge API route (/api/firebase-config)
    try {
      const res = await fetch("/api/firebase-config", { cache: "no-store" });
      if (res.ok) {
        const fetchedConfig = await res.json();
        if (fetchedConfig.apiKey && fetchedConfig.projectId) {
          if (getApps().length > 0) {
            app = getApp();
          } else {
            app = initializeApp(fetchedConfig);
          }
          auth = getAuth(app);
          return auth;
        }
      } else {
        console.warn("Could not retrieve runtime Firebase config, status:", res.status);
      }
    } catch (err) {
      console.warn("Network error fetching runtime Firebase config:", err);
    }

    return null;
  })();

  return initPromise;
}
