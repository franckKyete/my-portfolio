import { PassionItem, defaultPortfolioContent } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import EditTrigger from "@/components/admin/EditTrigger";
import { UtensilsCrossed, BookOpen, Film, Atom, Sparkles } from "lucide-react";

const iconMap = {
  UtensilsCrossed: UtensilsCrossed,
  BookOpen: BookOpen,
  Film: Film,
  Atom: Atom,
};

interface PassionsProps {
  items?: PassionItem[];
}

export default function Passions({ items = defaultPortfolioContent.passions }: PassionsProps) {
  const passions = items;

  return (
    <section id="passions" className="relative py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      <EditTrigger
        section="passions"
        title="Passions & Interests"
        data={passions}
        className="absolute top-20 right-6 md:right-16"
      />
      <SectionLabel label="06 / Passions & Interests" title="Beyond the Terminal" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {passions.map((item: PassionItem) => {
          const IconComponent = iconMap[item.icon] || Sparkles;

          return (
            <GlassCard key={item.id} className="flex flex-col justify-between hover:border-[#B87333]/50 transition-all duration-300">
              <div>
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between border-b border-[#2D323C] pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#B87333]/10 border border-[#B87333]/30 flex items-center justify-center text-[#FFAE64]">
                      <IconComponent size={16} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#B87333]">
                      {item.ref}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#A08D80]">
                    // {item.id.toUpperCase()}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl md:text-2xl font-serif text-[#E2E2E8] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm font-mono text-[#FFAE64] mb-6 tracking-wide">
                  {item.tagline}
                </p>

                {/* Narrative Paragraphs */}
                <div className="space-y-4 text-[#D8C3B4] text-sm md:text-base font-light leading-relaxed mb-6">
                  {item.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Featured Note / Callout if present */}
                {item.featuredNote && (
                  <div className="mb-6 p-3.5 rounded-xl bg-[#14161E] border border-[#B87333]/30 flex items-start gap-2.5 text-xs text-[#E2E2E8]">
                    <Sparkles size={14} className="text-[#FFAE64] shrink-0 mt-0.5" />
                    <span className="font-light italic">{item.featuredNote}</span>
                  </div>
                )}
              </div>

              {/* Bottom Tags / Highlights */}
              <div className="pt-4 border-t border-[#2D323C]/50 flex flex-wrap gap-2 items-center">
                {item.highlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-[#1B1E28] border border-[#2D323C] text-[#D3C5AD]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
