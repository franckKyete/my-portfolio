import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import HowIWork from "@/components/sections/HowIWork";
import Skills from "@/components/sections/Skills";
import Passions from "@/components/sections/Passions";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import AdminBar from "@/components/admin/AdminBar";
import { getPortfolioContent } from "@/lib/content/server";

// Force dynamic server rendering for instant live Firestore updates
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <>
      <Navbar profile={content.profile} />
      <main className="flex-1 w-full pt-12 relative z-10 pointer-events-auto">
        <Hero data={content.hero} profile={content.profile} />
        <Projects items={content.projects} />
        <About data={content.about} />
        <Experience items={content.experience} />
        <HowIWork items={content.howIWork} />
        <Skills categories={content.skills} />
        <Passions items={content.passions} />
        <Contact data={content.contact} />
      </main>
      <Footer profile={content.profile} />
      <AdminBar />
    </>
  );
}
