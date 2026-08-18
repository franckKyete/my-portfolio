import { portfolioContent } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";

export default function Contact() {
  const { contact } = portfolioContent;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return <Mail size={20} className="text-[#B87333]" />;
      case "Github":
        return (
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="currentColor"
            className="text-[#B87333]"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="GitHub"
          >
            <path d={siGithub.path} />
          </svg>
        );
      case "Linkedin":
        return (
          <svg
            role="img"
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="currentColor"
            className="text-[#B87333]"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="LinkedIn"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
          </svg>
        );
      case "FileText":
      default:
        return <FileText size={20} className="text-[#B87333]" />;
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
      <SectionLabel label={contact.eyebrow} title="Get In Touch" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Heading & Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl md:text-5xl font-serif text-[#E2E2E8] mb-4">
              {contact.headline}
            </h3>
            <p className="text-2xl md:text-3xl font-serif italic text-[#B87333] mb-6">
              {contact.subheadline}
            </p>
            <p className="text-base md:text-lg text-[#D8C3B4] font-light leading-relaxed max-w-lg mb-8">
              {contact.body}
            </p>
          </div>

          <div className="font-mono text-xs text-[#A08D80] tracking-widest border-t border-[#2D323C] pt-4">
            STATUS: OPEN FOR TECHNICAL COLLABORATION & INQUIRIES
          </div>
        </div>

        {/* Right Column: Interactive Link Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contact.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block group"
            >
              <GlassCard className="h-full flex flex-col justify-between group-hover:border-[#B87333] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#111317] border border-[#2D323C] group-hover:border-[#B87333] transition-colors">
                    {renderIcon(link.icon)}
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[#A08D80] group-hover:text-[#B87333] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <h4 className="text-base font-serif text-[#E2E2E8] group-hover:text-[#B87333] transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-xs font-mono text-[#A08D80] mt-1 truncate">
                    {link.label}
                  </p>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
