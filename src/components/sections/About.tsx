import { AboutContent, defaultPortfolioContent } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import EditTrigger from "@/components/admin/EditTrigger";
import { Cpu, Network, Layers, ShieldCheck } from "lucide-react";

interface AboutProps {
  data?: AboutContent;
}

export default function About({ data = defaultPortfolioContent.about }: AboutProps) {
  const about = data;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      {/* 
        Borderless semi-transparent container with an elliptical/oval radial gradient.
        Darker and higher-contrast in the center, feathering out to transparent at the edges.
      */}
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden hero-vignette-container">
        {/* Darkening Oval/Elliptical Gradient Backdrop */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 hero-radial-vignette"
          aria-hidden="true"
        />

        <EditTrigger section="about" title="About Section" data={about} />

        <div className="relative z-10">
          <SectionLabel label={about.label} title={about.title} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main narrative */}
            <div className="lg:col-span-7 space-y-6 text-[#D8C3B4] text-base md:text-lg font-light leading-relaxed drop-shadow-sm">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Highlights / Technical Workbench Specs Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <GlassCard className="border-l-2 border-l-[#B87333]">
                <div className="flex items-center justify-between border-b border-[#2D323C] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#B87333]" />
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#B87333]">
                      ENGINEERING.SPEC
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#B87333] animate-pulse" />
                </div>

                <div className="space-y-4 font-mono text-xs md:text-sm">
                  {about.profileSpec.map((spec, sIdx) => (
                    <div key={sIdx} className={sIdx > 0 ? "border-t border-[#2D323C]/60 pt-3" : ""}>
                      <span className="text-[10px] md:text-xs uppercase text-[#A08D80] block mb-1 tracking-wider font-semibold">
                        {spec.label}
                      </span>
                      <span className="text-[#E2E2E8] leading-relaxed block font-sans md:font-mono">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Core Vectors */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-panel gallery-border p-3.5 text-center hover:border-[#B87333]/50 transition-colors">
                  <Layers size={20} className="text-[#B87333] mx-auto mb-1.5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A08D80] block">Fullstack</span>
                </div>
                <div className="glass-panel gallery-border p-3.5 text-center hover:border-[#B87333]/50 transition-colors">
                  <Cpu size={20} className="text-[#B87333] mx-auto mb-1.5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A08D80] block">Systems Core</span>
                </div>
                <div className="glass-panel gallery-border p-3.5 text-center hover:border-[#B87333]/50 transition-colors">
                  <Network size={20} className="text-[#B87333] mx-auto mb-1.5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A08D80] block">Realtime & Relays</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
