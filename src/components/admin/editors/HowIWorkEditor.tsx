"use client";

import React, { useState } from "react";
import { WorkPrinciple } from "@/lib/content/types";

interface HowIWorkEditorProps {
  initialPrinciples: WorkPrinciple[];
  onChange: (updatedPrinciples: WorkPrinciple[]) => void;
}

export default function HowIWorkEditor({ initialPrinciples, onChange }: HowIWorkEditorProps) {
  const [principles, setPrinciples] = useState<WorkPrinciple[]>([...initialPrinciples]);

  const updatePrinciple = (idx: number, field: keyof WorkPrinciple, value: string) => {
    const updated = [...principles];
    updated[idx] = { ...updated[idx], [field]: value };
    setPrinciples(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-6 text-xs font-mono">
      {principles.map((principle, idx) => (
        <div key={idx} className="p-4 rounded-xl bg-[#14171E] border border-[#2D323C] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[#FFAE64] font-semibold uppercase tracking-wider">
              Phase {principle.number || `0${idx + 1}`}
            </span>
            <input
              type="text"
              value={principle.number}
              onChange={(e) => updatePrinciple(idx, "number", e.target.value)}
              className="w-16 px-2 py-1 bg-[#0F1116] border border-[#2D323C] rounded text-center text-[#E2E2E8]"
            />
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Title</label>
            <input
              type="text"
              value={principle.title}
              onChange={(e) => updatePrinciple(idx, "title", e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] font-serif text-sm focus:border-[#B87333] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              value={principle.description}
              onChange={(e) => updatePrinciple(idx, "description", e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-xs focus:border-[#B87333] focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
