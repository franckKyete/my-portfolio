import { HeroContent, ProfileContent, defaultPortfolioContent } from "@/lib/content";
import { ArrowDownRight, Terminal } from "lucide-react";
import EditTrigger from "@/components/admin/EditTrigger";

interface HeroProps {
  data?: HeroContent;
  profile?: ProfileContent;
}

function renderFormattedHeadline(text: string) {
  if (!text) return null;

  // 1. If explicit markdown italics *text* or _text_ are present:
  if (/(\*[^*]+\*|_[^_]+_)/.test(text)) {
    const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
    return parts.map((part, i) => {
      if (
        (part.startsWith("*") && part.endsWith("*")) ||
        (part.startsWith("_") && part.endsWith("_"))
      ) {
        const inner = part.slice(1, -1);
        return (
          <span key={i} className="italic text-[#D8C3B4] font-normal">
            {inner}
          </span>
        );
      }
      return part.split("\n").map((sub, j, arr) => (
        <span key={`${i}-${j}`}>
          {sub}
          {j < arr.length - 1 && <br className="hidden sm:inline" />}
        </span>
      ));
    });
  }

  // 2. If line breaks \n are explicitly present:
  if (text.includes("\n")) {
    const lines = text.split("\n");
    return lines.map((line, idx) => (
      <span key={idx}>
        {line}
        {idx < lines.length - 1 && <br className="hidden sm:inline" />}
      </span>
    ));
  }

  // 3. Natural phrase splitting (e.g. "I like solving problems that require going deeper.")
  const requireMatch = text.match(/^(.*?\bthat require\s+)(.*)$/i);
  if (requireMatch) {
    return (
      <>
        {requireMatch[1]}
        <br className="hidden sm:inline" />
        <span className="italic text-[#D8C3B4] font-normal">{requireMatch[2]}</span>
      </>
    );
  }

  const problemMatch = text.match(/^(.*?\bproblems\s+)(.*)$/i);
  if (problemMatch) {
    return (
      <>
        {problemMatch[1]}
        <br className="hidden sm:inline" />
        <span className="italic text-[#D8C3B4] font-normal">{problemMatch[2]}</span>
      </>
    );
  }

  return text;
}

export default function Hero({
  data = defaultPortfolioContent.hero,
  profile = defaultPortfolioContent.profile,
}: HeroProps) {
  const hero = data;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center py-20 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-[#2D323C]/50">
      {/* 
        Borderless semi-transparent container with an elliptical/oval radial gradient.
        Darker and higher-contrast in the center, feathering out to transparent at the edges.
      */}
      <div className="relative max-w-5xl rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden hero-vignette-container">
        {/* Darkening Oval/Elliptical Gradient Backdrop */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 hero-radial-vignette"
          aria-hidden="true"
        />

        <EditTrigger section="hero" title="Hero & Profile" data={hero} profile={profile} />

        <div className="max-w-3xl relative z-10">
          {/* Eyebrow badge with Full Name */}
          <div className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 border border-[#2D323C] bg-[#1A1C20]/80 backdrop-blur-md">
            <Terminal size={14} className="text-[#B87333]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B87333]">
              {profile.name} · {hero.eyebrow}
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-serif text-[#E2E2E8] leading-[1.08] tracking-tight mb-8 drop-shadow-md">
            {renderFormattedHeadline(hero.headline)}
          </h1>

          {/* Body Paragraph */}
          <p className="text-lg md:text-xl text-[#D8C3B4] font-light leading-relaxed max-w-2xl mb-12 drop-shadow-sm">
            {hero.body}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#B87333] text-[#0F1115] text-xs font-mono font-semibold uppercase tracking-[0.15em] hover:bg-[#c9803d] transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-200 shadow-lg shadow-[#B87333]/15"
            >
              {hero.primaryCta.text}
              <ArrowDownRight size={16} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-3 px-8 py-4 gallery-border text-[#D3C5AD] text-xs font-mono uppercase tracking-[0.15em] hover:border-[#B87333] hover:text-[#E2E2E8] bg-[#111317]/60 backdrop-blur-sm transition-all duration-200"
            >
              {hero.secondaryCta.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
