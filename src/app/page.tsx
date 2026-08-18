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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-12 relative z-10 pointer-events-auto">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <HowIWork />
        <Skills />
        <Passions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
