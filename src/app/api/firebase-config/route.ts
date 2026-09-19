import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = process.env;

  const projectId =
    env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    env.FIREBASE_PROJECT_ID ||
    env.GCP_PROJECT ||
    env.GCLOUD_PROJECT;

  const apiKey =
    env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    env.FIREBASE_API_KEY;

  const authDomain =
    env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    env.FIREBASE_AUTH_DOMAIN ||
    (projectId ? `${projectId}.firebaseapp.com` : undefined);

  const storageBucket =
    env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    env.FIREBASE_STORAGE_BUCKET ||
    (projectId ? `${projectId}.firebasestorage.app` : undefined);

  const messagingSenderId =
    env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    env.FIREBASE_MESSAGING_SENDER_ID;

  const appId =
    env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    env.FIREBASE_APP_ID;

  if (!apiKey || !projectId) {
    return NextResponse.json(
      {
        error: "Firebase client config not set in server environment",
        missing: [
          !apiKey && "NEXT_PUBLIC_FIREBASE_API_KEY / FIREBASE_API_KEY",
          !projectId && "NEXT_PUBLIC_FIREBASE_PROJECT_ID / FIREBASE_PROJECT_ID",
        ].filter(Boolean),
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  });
}
