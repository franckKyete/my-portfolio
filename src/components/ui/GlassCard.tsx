import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass-panel gallery-border rounded-none p-6 md:p-8 transition-all duration-300 relative z-10 pointer-events-auto ${
        hoverEffect ? "gallery-border-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
