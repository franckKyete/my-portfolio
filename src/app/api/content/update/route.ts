import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminAuth, getFirestoreDb } from "@/lib/firebase/admin";

const VALID_SECTIONS = [
  "profile",
  "hero",
  "about",
  "projects",
  "experience",
  "howIWork",
  "skills",
  "passions",
  "contact",
];

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid Authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    const adminAuth = getAdminAuth();

    if (!adminAuth) {
      return NextResponse.json(
        { error: "Server error: Firebase Admin Auth is not configured" },
        { status: 500 }
      );
    }

    // Verify token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (authError: any) {
      console.warn("Token verification failed:", authError?.message || authError);
      return NextResponse.json(
        {
          error: "Unauthorized: Invalid or expired ID token",
          code: authError?.code || "auth/invalid-token",
          details: authError?.message || "Token verification failed",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { section, data } = body;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return NextResponse.json(
        { error: `Invalid section. Must be one of: ${VALID_SECTIONS.join(", ")}` },
        { status: 400 }
      );
    }

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid data payload" },
        { status: 400 }
      );
    }

    const db = getFirestoreDb();
    if (!db) {
      return NextResponse.json(
        { error: "Server error: Firestore is not configured" },
        { status: 500 }
      );
    }

    // A Firestore document must be a plain JavaScript object.
    // If the section payload is an array (e.g. projects, experience, howIWork, skills, passions),
    // wrap it into the matching document structure.
    let docData: Record<string, any>;
    if (Array.isArray(data)) {
      if (section === "skills") {
        docData = { categories: data };
      } else {
        docData = { items: data };
      }
    } else {
      docData = { ...data };
    }

    // Strip undefined values which cause Firestore serialization errors
    docData = JSON.parse(JSON.stringify(docData));

    // Write to Firestore
    await db.collection("portfolio").doc(section).set(docData, { merge: true });

    // Trigger on-demand revalidation of the homepage
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      section,
      updatedBy: decodedToken.email || decodedToken.uid,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Failed to update content:", error);
    return NextResponse.json(
      { error: "Internal server error updating content", details: String(error) },
      { status: 500 }
    );
  }
}
