import { defaultPortfolioContent, Experience as ExperienceType } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import TechChip from "@/components/ui/TechChip";
import EditTrigger from "@/components/admin/EditTrigger";
import { Briefcase, ExternalLink, ChevronDown } from "lucide-react";

function ExperienceCard({ exp }: { exp: ExperienceType }) {
  return (
    <GlassCard className="relative">
      {/* Top row: Role, Company, Type, and Live Project Link */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D323C] pb-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-[#111317] border border-[#2D323C] text-[#B87333]">
            <Briefcase size={20} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl md:text-2xl font-serif text-[#E2E2E8]">
                {exp.role}
              </h3>
              {exp.url && (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#FBBC00] border border-[#FBBC00]/30 bg-[#FBBC00]/5 hover:bg-[#FBBC00]/15 hover:border-[#FBBC00] transition-colors rounded-sm"
                >
                  <span>Visit Live</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <p className="text-sm font-mono text-[#D3C5AD] mt-0.5">
              {exp.company} <span className="text-[#A08D80]">·</span> <span className="italic font-serif">{exp.projectOrDomain}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 border border-[#2D323C] text-[#B87333] bg-[#B87333]/5">
            {exp.type}
          </span>
        </div>
      </div>

      {/* Lead Narrative Paragraph (Always Visible) */}
      <div className="text-sm md:text-base text-[#D8C3B4] font-light leading-relaxed mb-4">
        <p>{exp.description[0]}</p>
      </div>

      {/* Native HTML details & summary: 100% pure CSS/HTML toggle */}
      {exp.description.length > 1 && (
        <details className="custom-disclosure mb-6">
          <summary className="list-none inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#FBBC00] border border-[#B87333]/60 bg-[#1A1D24] hover:bg-[#B87333]/20 active:bg-[#B87333]/30 transition-all rounded-sm cursor-pointer select-none shadow-sm [&::-webkit-details-marker]:hidden">
            <span className="toggle-read-more">Read more</span>
            <span className="toggle-show-less">Show less</span>
            <ChevronDown size={15} className="toggle-chevron text-[#FBBC00]" />
          </summary>

          <div className="details-content space-y-3 text-sm md:text-base text-[#D8C3B4] font-light leading-relaxed pt-3">
            {exp.description.slice(1).map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </details>
      )}

      {/* Tech Stack */}
      <div className="border-t border-[#2D323C] pt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase text-[#A08D80] mr-2">
          Tech:
        </span>
        {exp.tech.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>
    </GlassCard>
  );
}

interface ExperienceProps {
  items?: ExperienceType[];
}

export default function Experience({ items = defaultPortfolioContent.experience }: ExperienceProps) {
  const experience = items;

  return (
    <section id="experience" className="relative py-24 px-6 md:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      <EditTrigger
        section="experience"
        title="Experience Trajectory"
        data={experience}
        className="absolute top-20 right-6 md:right-16"
      />
      <SectionLabel label="03 / Experience" title="Experience" />

      <div className="space-y-8">
        {experience.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} />
        ))}
      </div>
    </section>
  );
}
