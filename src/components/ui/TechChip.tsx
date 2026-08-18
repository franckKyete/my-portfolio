import TechIcon from "@/components/ui/TechIcon";

interface TechChipProps {
  label: string;
  highlight?: boolean;
}

export default function TechChip({ label, highlight = false }: TechChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider uppercase transition-colors duration-200 border ${
        highlight
          ? "border-[#B87333] text-[#B87333] bg-[#B87333]/10"
          : "border-[#2D323C] text-[#D8C3B4] bg-[#1A1C20]/60 hover:border-[#B87333]/70 hover:text-[#E2E2E8]"
      }`}
    >
      <TechIcon name={label} size={13} className="text-[#B87333] shrink-0" />
      <span>{label}</span>
    </span>
  );
}
