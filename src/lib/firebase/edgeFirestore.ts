import {
  defaultPortfolioContent,
  PortfolioContent,
  Project,
  Experience,
  WorkPrinciple,
  SkillCategory,
  PassionItem,
  ProfileContent,
  HeroContent,
  AboutContent,
  ContactContent,
} from "@/lib/content/defaultContent";

/**
 * Converts a Firestore REST API typed value into a plain JavaScript value.
 */
export function parseFirestoreValue(value: any): any {
  if (!value || typeof value !== "object") return value;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) {
    const num = Number(value.integerValue);
    return isNaN(num) ? value.integerValue : num;
  }
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("timestampValue" in value) return value.timestampValue;
  if ("arrayValue" in value) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ("mapValue" in value) {
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      result[k] = parseFirestoreValue(v);
    }
    return result;
  }
  return value;
}

/**
 * Converts a Firestore REST API document into a plain JavaScript dictionary.
 */
export function parseFirestoreDocument(doc: any): Record<string, any> {
  if (!doc || !doc.fields) return {};
  const result: Record<string, any> = {};
  for (const [k, v] of Object.entries(doc.fields)) {
    result[k] = parseFirestoreValue(v);
  }
  return result;
}

/**
 * Converts a plain JavaScript value into a Firestore REST typed value.
 */
export function encodeFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "string") return { stringValue: val };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
  }
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(encodeFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        fields[k] = encodeFirestoreValue(v);
      }
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

/**
 * Converts a plain JavaScript object into a Firestore REST document body.
 */
export function encodeFirestoreDocument(data: Record<string, any>): { fields: Record<string, any> } {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) {
      fields[k] = encodeFirestoreValue(v);
    }
  }
  return { fields };
}

function getProjectId(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID
  );
}

/**
 * Edge-compatible fetcher for all portfolio content from Cloud Firestore.
 * Uses standard Web fetch() with zero Node.js dependencies.
 * If Cloud Firestore is unreachable, unconfigured, or rules deny access,
 * safely returns default static content without throwing.
 */
export async function getEdgePortfolioContent(): Promise<PortfolioContent> {
  const projectId = getProjectId();

  if (!projectId) {
    return defaultPortfolioContent;
  }

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio`;
    const res = await fetch(url, {
      // Revalidate every 60s or immediately on demand
      next: { revalidate: 60, tags: ["portfolio"] },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      // 403/404/500: Fall back silently to default content
      return defaultPortfolioContent;
    }

    const data = await res.json();
    if (!data.documents || !Array.isArray(data.documents)) {
      return defaultPortfolioContent;
    }

    const docMap: Record<string, any> = {};
    for (const doc of data.documents) {
      // doc.name is e.g. "projects/my-portfolio/databases/(default)/documents/portfolio/hero"
      const nameParts = doc.name.split("/");
      const docId = nameParts[nameParts.length - 1];
      docMap[docId] = parseFirestoreDocument(doc);
    }

    return {
      profile: docMap.profile
        ? ({ ...defaultPortfolioContent.profile, ...docMap.profile } as ProfileContent)
        : defaultPortfolioContent.profile,

      hero: docMap.hero
        ? ({ ...defaultPortfolioContent.hero, ...docMap.hero } as HeroContent)
        : defaultPortfolioContent.hero,

      about: docMap.about
        ? ({ ...defaultPortfolioContent.about, ...docMap.about } as AboutContent)
        : defaultPortfolioContent.about,

      projects: docMap.projects
        ? ((docMap.projects.items || docMap.projects) as Project[])
        : defaultPortfolioContent.projects,

      experience: docMap.experience
        ? ((docMap.experience.items || docMap.experience) as Experience[])
        : defaultPortfolioContent.experience,

      howIWork: docMap.howIWork
        ? ((docMap.howIWork.items || docMap.howIWork) as WorkPrinciple[])
        : defaultPortfolioContent.howIWork,

      skills: docMap.skills
        ? ((docMap.skills.categories || docMap.skills) as SkillCategory[])
        : defaultPortfolioContent.skills,

      passions: docMap.passions
        ? ((docMap.passions.items || docMap.passions) as PassionItem[])
        : defaultPortfolioContent.passions,

      contact: docMap.contact
        ? ({ ...defaultPortfolioContent.contact, ...docMap.contact } as ContactContent)
        : defaultPortfolioContent.contact,
    };
  } catch (error) {
    console.warn("Edge Firestore fetch error, falling back to default content:", error);
    return defaultPortfolioContent;
  }
}

/**
 * Edge-compatible document updater using Firestore REST API with Firebase ID token.
 */
export async function updateEdgePortfolioDocument(
  section: string,
  data: any,
  idToken: string
): Promise<{ success: boolean; error?: string }> {
  const projectId = getProjectId();
  if (!projectId) {
    return { success: false, error: "Missing Firebase Project ID configuration" };
  }

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

  const encoded = encodeFirestoreDocument(docData);
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio/${section}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(encoded),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const message = errData?.error?.message || `Firestore update failed with status ${res.status}`;
    return { success: false, error: message };
  }

  return { success: true };
}
