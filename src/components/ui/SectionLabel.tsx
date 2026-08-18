interface SectionLabelProps {
  label: string;
  title: string;
  className?: string;
}

export default function SectionLabel({ label, title, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center justify-between border-b border-[#2D323C] pb-4 mb-10 md:mb-14 ${className}`}>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#E2E2E8] font-normal tracking-tight">
        {title}
      </h2>
      <span className="text-xs uppercase tracking-[0.15em] text-[#A08D80] font-mono">
        {label}
      </span>
    </div>
  );
}
