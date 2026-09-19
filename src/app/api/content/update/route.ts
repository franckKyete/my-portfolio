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
      const isAuthError =
        result.error?.toLowerCase().includes("unauthenticated") ||
        result.error?.toLowerCase().includes("permission");

      return NextResponse.json(
        { error: result.error || "Failed to update content" },
        { status: isAuthError ? 401 : 500 }
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
