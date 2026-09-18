import { ProfileContent, defaultPortfolioContent } from "@/lib/content";

interface FooterProps {
  profile?: ProfileContent;
}

export default function Footer({ profile = defaultPortfolioContent.profile }: FooterProps) {
  return (
    <footer className="w-full border-t border-[#2D323C] bg-[#0A0C0F] py-12 px-6 md:px-16 mt-16">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-mono text-xs text-[#A08D80]">
          <span className="text-[#E2E2E8] font-serif tracking-widest text-sm">
            {profile.name}
          </span>
          <span className="hidden sm:inline">·</span>
          <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>

        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#A08D80]">
          <a href="#projects" className="hover:text-[#B87333] transition-colors">
            Projects
          </a>
          <a href="#about" className="hover:text-[#B87333] transition-colors">
            About
          </a>
          <a href="#experience" className="hover:text-[#B87333] transition-colors">
            Experience
          </a>
          <a href="#skills" className="hover:text-[#B87333] transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-[#B87333] transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
