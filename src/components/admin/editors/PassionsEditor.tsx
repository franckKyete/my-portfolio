"use client";

import React, { useState } from "react";
import { PassionItem } from "@/lib/content/types";
import { Sparkles } from "lucide-react";

interface PassionsEditorProps {
  initialPassions: PassionItem[];
  onChange: (updatedPassions: PassionItem[]) => void;
}

export default function PassionsEditor({ initialPassions, onChange }: PassionsEditorProps) {
  const [passions, setPassions] = useState<PassionItem[]>([...initialPassions]);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateActivePassion = (field: keyof PassionItem, value: any) => {
    const updated = [...passions];
    updated[activeIdx] = { ...updated[activeIdx], [field]: value };
    setPassions(updated);
    onChange(updated);
  };

  const activePassion = passions[activeIdx] || passions[0];

  return (
    <div className="space-y-6 text-xs font-mono">
      {/* Passion selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2D323C]">
        {passions.map((item, idx) => (
          <button
            key={item.id || idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap ${
              idx === activeIdx
                ? "bg-[#B87333] text-[#0B0D11] font-semibold shadow-sm"
                : "bg-[#14171E] text-[#A08D80] hover:text-[#E2E2E8]"
            }`}
          >
            <Sparkles size={13} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {activePassion && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Ref (CRAFT.01)</label>
              <input
                type="text"
                value={activePassion.ref}
                onChange={(e) => updateActivePassion("ref", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={activePassion.title}
                onChange={(e) => updateActivePassion("title", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] font-serif text-sm focus:border-[#B87333] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Tagline</label>
            <textarea
              rows={2}
              value={activePassion.tagline}
              onChange={(e) => updateActivePassion("tagline", e.target.value)}
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] focus:border-[#B87333] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#A08D80] uppercase tracking-wider">Narrative Paragraphs</label>
              <span className="text-[10px] text-[#FFAE64]">Separate with double Enter</span>
            </div>
            <textarea
              rows={5}
              value={(activePassion.paragraphs || []).join("\n\n")}
              onChange={(e) =>
                updateActivePassion(
                  "paragraphs",
                  e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean)
                )
              }
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-xs focus:border-[#B87333] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#A08D80] uppercase tracking-wider">Key Highlights / Pillars</label>
              <span className="text-[10px] text-[#A08D80]">Comma-separated</span>
            </div>
            <input
              type="text"
              value={(activePassion.highlights || []).join(", ")}
              onChange={(e) =>
                updateActivePassion(
                  "highlights",
                  e.target.value.split(",").map((h) => h.trim()).filter(Boolean)
                )
              }
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Featured Callout Note (Optional)</label>
            <input
              type="text"
              value={activePassion.featuredNote || ""}
              onChange={(e) => updateActivePassion("featuredNote", e.target.value)}
              placeholder="e.g. Favorite Book: 'The Prince' — Niccolò Machiavelli"
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#FFAE64] focus:border-[#B87333] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
