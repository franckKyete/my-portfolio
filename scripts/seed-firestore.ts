import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { defaultPortfolioContent } from "../src/lib/content/defaultContent";
import * as fs from "fs";
import * as path from "path";

async function seed() {
  console.log("🚀 Starting Cloud Firestore Portfolio Seeding...");

  // Load .env.local if present
  const envLocalPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    });
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error(`
❌ Error: Missing Firebase credentials.
Please ensure .env.local contains:
  FIREBASE_PROJECT_ID=...
  FIREBASE_CLIENT_EMAIL=...
  FIREBASE_PRIVATE_KEY=...

Or pass GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
`);
    process.exit(1);
  }

  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });

  const db = getFirestore(app);
  const portfolioRef = db.collection("portfolio");

  const sections = [
    { doc: "profile", data: defaultPortfolioContent.profile, label: "Profile" },
    { doc: "hero", data: defaultPortfolioContent.hero, label: "Hero" },
    { doc: "about", data: defaultPortfolioContent.about, label: "About" },
    { doc: "projects", data: { items: defaultPortfolioContent.projects }, label: "Projects" },
    { doc: "experience", data: { items: defaultPortfolioContent.experience }, label: "Experience" },
    { doc: "howIWork", data: { items: defaultPortfolioContent.howIWork }, label: "How I Work" },
    { doc: "skills", data: { categories: defaultPortfolioContent.skills }, label: "Skills" },
    { doc: "passions", data: { items: defaultPortfolioContent.passions }, label: "Passions & Interests" },
    { doc: "contact", data: defaultPortfolioContent.contact, label: "Contact" },
  ];

  for (const section of sections) {
    process.stdout.write(`  ⏳ Writing document 'portfolio/${section.doc}' (${section.label})... `);
    await portfolioRef.doc(section.doc).set(section.data, { merge: true });
    console.log("✅ Done");
  }

  console.log("\n🎉 All 9 portfolio documents successfully seeded to Firestore!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
