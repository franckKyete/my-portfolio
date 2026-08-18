import React from "react";
import {
  siRust,
  siRedis,
  siExpo,
  siTanstack,
  siExpress,
  siPostgresql,
  siRemix,
  siNestjs,
  siSlint,
  siTypescript,
  siJavascript,
  siPython,
  siCplusplus,
  siC,
  siKotlin,
  siPhp,
  siLaravel,
  siDjango,
  siFastapi,
  siFlask,
  siReact,
  siNextdotjs,
  siVuedotjs,
  siHtml5,
  siCss,
  siTailwindcss,
  siInertia,
  siBluetooth,
  siWebrtc,
  siDocker,
  siLinux,
  siGit,
  siMysql,
  siSqlite,
  siTauri,
  siTensorflow,
  siKeras,
  siPandas,
  siScikitlearn,
} from "simple-icons";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = "", size = 14 }: TechIconProps) {
  const norm = name.toLowerCase().trim();

  // Helper to render official SimpleIcon SVG
  const renderOfficial = (icon: { path: string; title: string }) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );

  // 1. Languages
  if (norm.includes("typescript") || norm === "ts") return renderOfficial(siTypescript);
  if (norm.includes("vanilla") || norm === "javascript" || norm === "js") return renderOfficial(siJavascript);
  if (norm.includes("rust")) return renderOfficial(siRust);
  if (norm === "python" || (norm.includes("python") && !norm.includes("django") && !norm.includes("flask") && !norm.includes("fastapi"))) {
    return renderOfficial(siPython);
  }
  if (norm.includes("c++") || norm.includes("cpp")) return renderOfficial(siCplusplus);
  if (norm === "c" || norm.startsWith("c ")) return renderOfficial(siC);
  if (norm.includes("kotlin")) return renderOfficial(siKotlin);
  if (norm.includes("php")) return renderOfficial(siPhp);

  // 2. Frontend & Web
  if (norm.includes("html")) return renderOfficial(siHtml5);
  if (norm.includes("tailwind")) return renderOfficial(siTailwindcss);
  if (norm.includes("css")) return renderOfficial(siCss);
  if (norm.includes("next")) return renderOfficial(siNextdotjs);
  if (norm.includes("vue")) return renderOfficial(siVuedotjs);
  if (norm.includes("react native")) return renderOfficial(siReact);
  if (norm.includes("react")) return renderOfficial(siReact);
  if (norm.includes("expo")) return renderOfficial(siExpo);
  if (norm.includes("tanstack")) return renderOfficial(siTanstack);
  if (norm.includes("inertia")) return renderOfficial(siInertia);
  if (norm.includes("remix")) return renderOfficial(siRemix);

  // 3. Backend & APIs
  if (norm.includes("django")) return renderOfficial(siDjango);
  if (norm.includes("fastapi")) return renderOfficial(siFastapi);
  if (norm.includes("flask")) return renderOfficial(siFlask);
  if (norm.includes("laravel")) return renderOfficial(siLaravel);
  if (norm.includes("nest")) return renderOfficial(siNestjs);
  if (norm.includes("express")) return renderOfficial(siExpress);

  // 4. AI & Data Science
  if (norm.includes("tensorflow") || norm.includes("tf")) return renderOfficial(siTensorflow);
  if (norm.includes("keras")) return renderOfficial(siKeras);
  if (norm.includes("pandas")) return renderOfficial(siPandas);
  if (norm.includes("scikit") || norm.includes("sklearn")) return renderOfficial(siScikitlearn);
  if (norm.includes("matplotlib")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M4 14l6-6 6 4 4-7" />
      </svg>
    );
  }

  // 5. Systems & Desktop
  if (norm.includes("tauri")) return renderOfficial(siTauri);
  if (norm.includes("slint")) return renderOfficial(siSlint);
  if (norm.includes("bluetooth")) return renderOfficial(siBluetooth);
  if (norm.includes("webrtc")) return renderOfficial(siWebrtc);

  // 6. Databases & Infrastructure
  if (norm.includes("postgres") || norm.includes("psql")) return renderOfficial(siPostgresql);
  if (norm.includes("mysql")) return renderOfficial(siMysql);
  if (norm.includes("sqlite")) return renderOfficial(siSqlite);
  if (norm.includes("redis")) return renderOfficial(siRedis);
  if (norm.includes("docker")) return renderOfficial(siDocker);
  if (norm.includes("linux")) return renderOfficial(siLinux);
  if (norm.includes("git")) return renderOfficial(siGit);

  // 7. Networking & Fallback Icons
  if (norm.includes("websocket") || norm.includes("socket") || norm.includes("network") || norm.includes("protocol")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
        <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />
        <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    );
  }

  if (norm.includes("ai") || norm.includes("machine learning")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
      </svg>
    );
  }

  // Generic fallback code icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
