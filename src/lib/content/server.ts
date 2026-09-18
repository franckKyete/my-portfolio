import { getFirestoreDb } from "@/lib/firebase/admin";
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
} from "./defaultContent";

export * from "./defaultContent";

/**
 * Fetches portfolio content dynamically from Cloud Firestore (portfolio collection).
 * Merges with default static content so missing fields or unconfigured Firestore
 * seamlessly fallback to defaults without runtime errors.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const db = getFirestoreDb();

  if (!db) {
    if (process.env.NODE_ENV === "development") {
      console.info("📦 [Content Layer] Firebase unconfigured — serving local static fallback content");
    }
    return defaultPortfolioContent;
  }

  try {
    const portfolioRef = db.collection("portfolio");

    // Fetch all section documents in parallel
    const [
      profileSnap,
      heroSnap,
      aboutSnap,
      projectsSnap,
      experienceSnap,
      howIWorkSnap,
      skillsSnap,
      passionsSnap,
      contactSnap,
    ] = await Promise.allSettled([
      portfolioRef.doc("profile").get(),
      portfolioRef.doc("hero").get(),
      portfolioRef.doc("about").get(),
      portfolioRef.doc("projects").get(),
      portfolioRef.doc("experience").get(),
      portfolioRef.doc("howIWork").get(),
      portfolioRef.doc("skills").get(),
      portfolioRef.doc("passions").get(),
      portfolioRef.doc("contact").get(),
    ]);

    const snapshots = [
      profileSnap,
      heroSnap,
      aboutSnap,
      projectsSnap,
      experienceSnap,
      howIWorkSnap,
      skillsSnap,
      passionsSnap,
      contactSnap,
    ];
    const liveDocCount = snapshots.filter(
      (s) => s.status === "fulfilled" && s.value.exists
    ).length;

    if (process.env.NODE_ENV === "development" || liveDocCount > 0) {
      console.info(
        `🔥 [Content Layer] Loaded portfolio content from Cloud Firestore (${liveDocCount}/9 documents remote)`
      );
    }

    const result: PortfolioContent = {
      profile:
        profileSnap.status === "fulfilled" && profileSnap.value.exists
          ? ({ ...defaultPortfolioContent.profile, ...profileSnap.value.data() } as ProfileContent)
          : defaultPortfolioContent.profile,

      hero:
        heroSnap.status === "fulfilled" && heroSnap.value.exists
          ? ({ ...defaultPortfolioContent.hero, ...heroSnap.value.data() } as HeroContent)
          : defaultPortfolioContent.hero,

      about:
        aboutSnap.status === "fulfilled" && aboutSnap.value.exists
          ? ({ ...defaultPortfolioContent.about, ...aboutSnap.value.data() } as AboutContent)
          : defaultPortfolioContent.about,

      projects:
        projectsSnap.status === "fulfilled" && projectsSnap.value.exists
          ? ((projectsSnap.value.data()?.items || projectsSnap.value.data()) as Project[])
          : defaultPortfolioContent.projects,

      experience:
        experienceSnap.status === "fulfilled" && experienceSnap.value.exists
          ? ((experienceSnap.value.data()?.items || experienceSnap.value.data()) as Experience[])
          : defaultPortfolioContent.experience,

      howIWork:
        howIWorkSnap.status === "fulfilled" && howIWorkSnap.value.exists
          ? ((howIWorkSnap.value.data()?.items || howIWorkSnap.value.data()) as WorkPrinciple[])
          : defaultPortfolioContent.howIWork,

      skills:
        skillsSnap.status === "fulfilled" && skillsSnap.value.exists
          ? ((skillsSnap.value.data()?.categories || skillsSnap.value.data()) as SkillCategory[])
          : defaultPortfolioContent.skills,

      passions:
        passionsSnap.status === "fulfilled" && passionsSnap.value.exists
          ? ((passionsSnap.value.data()?.items || passionsSnap.value.data()) as PassionItem[])
          : defaultPortfolioContent.passions,

      contact:
        contactSnap.status === "fulfilled" && contactSnap.value.exists
          ? ({ ...defaultPortfolioContent.contact, ...contactSnap.value.data() } as ContactContent)
          : defaultPortfolioContent.contact,
    };

    return result;
  } catch (error) {
    console.warn("⚠️ [Content Layer] Firestore fetch failed — falling back to local content:", error);
    return defaultPortfolioContent;
  }
}
