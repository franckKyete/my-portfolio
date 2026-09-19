import { getEdgePortfolioContent } from "@/lib/firebase/edgeFirestore";
import { defaultPortfolioContent, PortfolioContent } from "./defaultContent";

export * from "./defaultContent";

/**
 * Fetches portfolio content dynamically from Cloud Firestore (portfolio collection).
 * Fully edge-compatible (works seamlessly in Cloudflare Workers, Node.js, Bun, Vercel).
 * Seamlessly falls back to default static content on any error without throwing.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    return await getEdgePortfolioContent();
  } catch (error) {
    console.warn("⚠️ [Content Layer] Failed to fetch remote content, using fallback:", error);
    return defaultPortfolioContent;
  }
}
