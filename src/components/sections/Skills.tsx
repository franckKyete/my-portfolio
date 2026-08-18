import { portfolioContent } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GlassCard from "@/components/ui/GlassCard";
import TechIcon from "@/components/ui/TechIcon";

export default function Skills() {
  const { skills } = portfolioContent;

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      {/* Borderless vignette container for ambient readability */}
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden hero-vignette-container">
        <div
          className="absolute inset-0 pointer-events-none -z-10 hero-radial-vignette"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <SectionLabel label="05 / Capabilities" title="Skills & Technologies" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((categoryGroup, idx) => (
              <GlassCard
                key={categoryGroup.category}
                className={`flex flex-col justify-between ${
                  idx === 0 ? "border-t-2 border-t-[#B87333]" : ""
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-[#2D323C] pb-4 mb-6">
                    <h3 className="text-xl font-serif text-[#E2E2E8]">
                      {categoryGroup.category}
                    </h3>
                    <span className="text-xs font-mono uppercase text-[#A08D80] tracking-widest">
                      CAT.0{idx + 1}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {categoryGroup.items.map((item) => (
                      <div key={item.name} className="group/item">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1 rounded bg-[#111317] border border-[#2D323C] group-hover/item:border-[#B87333] transition-colors">
                            <TechIcon name={item.name} size={14} className="text-[#B87333]" />
                          </div>
                          <h4 className="text-sm font-mono text-[#E2E2E8] font-medium group-hover/item:text-[#B87333] transition-colors">
                            {item.name}
                          </h4>
                        </div>
                        {item.description && (
                          <p className="text-xs text-[#A08D80] font-light mt-1.5 pl-8 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#2D323C]/40 flex justify-between items-center text-xs font-mono text-[#A08D80]">
                  <span>TOTAL ITEMS</span>
                  <span className="text-[#D3C5AD] font-mono">{categoryGroup.items.length}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
