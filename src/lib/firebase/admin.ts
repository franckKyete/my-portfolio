import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

let app: App | null = null;
let firestoreDb: Firestore | null = null;
let adminAuth: Auth | null = null;

export function getAdminApp(): App | null {
  if (app) return app;

  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    // Handle escaped newlines in environment variables
    if (privateKey.includes("\\n")) {
      privateKey = privateKey.replace(/\\n/g, "\n");
    }

    try {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      return app;
    } catch (error) {
      console.warn("Failed to initialize Firebase Admin with credentials:", error);
    }
  }

  // Fallback to Application Default Credentials if running on GCP / Cloud
  try {
    app = initializeApp();
    return app;
  } catch {
    // Firebase credentials are not provided (will use default static content fallback)
    return null;
  }
}

export function getFirestoreDb(): Firestore | null {
  if (firestoreDb) return firestoreDb;

  const adminApp = getAdminApp();
  if (!adminApp) return null;

  try {
    firestoreDb = getFirestore(adminApp);
    return firestoreDb;
  } catch (error) {
    console.warn("Failed to initialize Firestore DB:", error);
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  if (adminAuth) return adminAuth;

  const adminApp = getAdminApp();
  if (!adminApp) return null;

  try {
    adminAuth = getAuth(adminApp);
    return adminAuth;
  } catch (error) {
    console.warn("Failed to initialize Firebase Admin Auth:", error);
    return null;
  }
}

