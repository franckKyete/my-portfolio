import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateEdgePortfolioDocument } from "@/lib/firebase/edgeFirestore";

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

    // Update document using edge-compatible Firestore REST API with the user's ID token
    const result = await updateEdgePortfolioDocument(section, data, idToken);

    if (!result.success) {
      const isPermissionDenied =
        result.status === 403 ||
        result.error?.toLowerCase().includes("permission");

      const isUnauthenticated =
        result.status === 401 ||
        result.error?.toLowerCase().includes("unauthenticated") ||
        result.error?.toLowerCase().includes("invalid authentication credentials");

      if (isPermissionDenied) {
        return NextResponse.json(
          {
            error: "Firestore write permission denied",
            details:
              "Cloud Firestore rejected the update. Please ensure your Firebase Console has Firestore rules allowing authenticated writes (allow write: if request.auth != null;).",
          },
          { status: 403 }
        );
      }

      if (isUnauthenticated) {
        return NextResponse.json(
          {
            error: "Authentication expired or invalid",
            details: "Your login session has expired. Please sign out and sign in again.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          error: "Failed to update Firestore document",
          details: result.error || "Unknown server error updating content",
        },
        { status: result.status || 500 }
      );
    }

    // Trigger on-demand cache revalidation
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      section,
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
