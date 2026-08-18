"use client";

import { useState } from "react";
import { portfolioContent } from "@/lib/content";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "How I Work", href: "#how-i-work" },
    { name: "Skills", href: "#skills" },
    { name: "Passions", href: "#passions" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[#2D323C]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
        {/* Logo / Monogram */}
        <a
          href="#"
          className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-[#E2E2E8] hover:text-[#B87333] transition-colors"
        >
          {portfolioContent.profile.name}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase font-medium tracking-[0.12em] text-[#A08D80] hover:text-[#E2E2E8] nav-link transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="text-xs font-mono uppercase tracking-[0.15em] px-6 py-3 gallery-border hover:border-[#B87333] text-[#D3C5AD] hover:text-[#E2E2E8] hover:bg-[#B87333]/10 transition-all duration-300"
          >
            Connect
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#E2E2E8] hover:text-[#B87333] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden glass-panel border-b border-[#2D323C] px-6 py-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-[0.15em] text-[#D8C3B4] hover:text-[#B87333] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-center text-xs font-mono uppercase tracking-[0.15em] px-6 py-3 gallery-border text-[#B87333] border-[#B87333]"
          >
            Connect
          </a>
        </div>
      )}
    </header>
  );
}
