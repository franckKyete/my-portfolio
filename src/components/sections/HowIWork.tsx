import { WorkPrinciple, defaultPortfolioContent } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import EditTrigger from "@/components/admin/EditTrigger";

interface HowIWorkProps {
  items?: WorkPrinciple[];
}

export default function HowIWork({ items = defaultPortfolioContent.howIWork }: HowIWorkProps) {
  const howIWork = items;

  return (
    <section id="how-i-work" className="relative py-24 px-6 md:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      <EditTrigger
        section="howIWork"
        title="Methodology / How I Work"
        data={howIWork}
        className="absolute top-20 right-6 md:right-16"
      />
      <SectionLabel label="04 / Methodology" title="How I Work" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {howIWork.map((principle, idx) => (
          <GlassCard
            key={principle.number}
            className={`flex flex-col justify-between ${
              idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#2D323C] pb-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B87333]">
                  PHASE.{principle.number}
                </span>
                <span className="text-xs font-mono text-[#A08D80]">
                  // {principle.number}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif text-[#E2E2E8] mb-4">
                {principle.title}
              </h3>

              <p className="text-sm md:text-base text-[#D8C3B4] font-light leading-relaxed">
                {principle.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2D323C]/40 flex justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]/40" />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
