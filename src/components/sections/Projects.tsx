import { portfolioContent, Project } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import TechChip from "@/components/ui/TechChip";
import { FolderGit2, Radio, Sparkles, ChevronDown } from "lucide-react";

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const getIcon = (id: string) => {
    switch (id) {
      case "tools":
        return <FolderGit2 className="text-[#B87333]" size={28} />;
      case "screenshare":
        return <Radio className="text-[#B87333]" size={28} />;
      case "future-farm":
        return <Sparkles className="text-[#B87333]" size={28} />;
      default:
        return <FolderGit2 className="text-[#B87333]" size={28} />;
    }
  };

  return (
    <GlassCard className="relative overflow-hidden">
      {/* Header / Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2D323C] pb-5 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-[0.15em] border border-[#2D323C] px-2.5 py-1 text-[#B87333] bg-[#B87333]/5">
            {project.ref}
          </span>
          <span className="text-xs font-mono text-[#A08D80] uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        {project.status && (
          <span className="text-xs font-mono text-[#D3C5AD] border-b border-[#B87333]/60 pb-0.5">
            {project.status}
          </span>
        )}
      </div>

      {/* Title & Tagline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-4 flex items-start gap-4">
          <div className="p-3 bg-[#111317] border border-[#2D323C] text-[#B87333]">
            {getIcon(project.id)}
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-serif text-[#E2E2E8]">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-[#A08D80] mt-1">
              PROJECT_{String(idx + 1).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <h4 className="text-lg md:text-xl font-serif text-[#E2E2E8] mb-4 leading-snug">
            {project.tagline}
          </h4>

          {/* Lead Paragraph (Always Visible) */}
          <div className="text-sm md:text-base text-[#D8C3B4] font-light leading-relaxed mb-4">
            <p>{project.description[0]}</p>
          </div>

          {/* Native HTML details & summary: 100% pure CSS/HTML toggle */}
          {project.description.length > 1 && (
            <details className="custom-disclosure">
              <summary className="list-none inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#FBBC00] border border-[#B87333]/60 bg-[#1A1D24] hover:bg-[#B87333]/20 active:bg-[#B87333]/30 transition-all rounded-sm cursor-pointer select-none shadow-sm [&::-webkit-details-marker]:hidden">
                <span className="toggle-read-more">Read more</span>
                <span className="toggle-show-less">Show less</span>
                <ChevronDown size={15} className="toggle-chevron text-[#FBBC00]" />
              </summary>

              <div className="details-content space-y-4 text-sm md:text-base text-[#D8C3B4] font-light leading-relaxed pt-3">
                {project.description.slice(1).map((desc, dIdx) => (
                  <p key={dIdx}>{desc}</p>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Tech Stack Chips */}
      <div className="border-t border-[#2D323C] pt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase text-[#A08D80] mr-2">
          Tech:
        </span>
        {project.tech.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>
    </GlassCard>
  );
}

export default function Projects() {
  const { projects } = portfolioContent;

  return (
    <section id="projects" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      <SectionLabel label="02 / Featured Projects" title="Featured Projects" />

      <div className="flex flex-col gap-12">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}
