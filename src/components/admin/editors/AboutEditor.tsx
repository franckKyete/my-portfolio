"use client";

import React, { useState } from "react";
import { AboutContent } from "@/lib/content/types";
import { Plus, Trash2 } from "lucide-react";

interface AboutEditorProps {
  initialAbout: AboutContent;
  onChange: (updatedAbout: AboutContent) => void;
}

export default function AboutEditor({ initialAbout, onChange }: AboutEditorProps) {
  const [about, setAbout] = useState<AboutContent>({ ...initialAbout });
  const [paragraphsText, setParagraphsText] = useState(
    (initialAbout.paragraphs || []).join("\n\n")
  );

  const handleParagraphsChange = (val: string) => {
    setParagraphsText(val);
    const split = val
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);
    const updated = { ...about, paragraphs: split };
    setAbout(updated);
    onChange(updated);
  };

  const updateField = (field: keyof AboutContent, value: any) => {
    const updated = { ...about, [field]: value };
    setAbout(updated);
    onChange(updated);
  };

  const updateSpec = (idx: number, field: "label" | "value", val: string) => {
    const specs = [...(about.profileSpec || [])];
    specs[idx] = { ...specs[idx], [field]: val };
    updateField("profileSpec", specs);
  };

  const addSpec = () => {
    const specs = [...(about.profileSpec || []), { label: "NEW SPEC", value: "Details..." }];
    updateField("profileSpec", specs);
  };

  const removeSpec = (idx: number) => {
    const specs = (about.profileSpec || []).filter((_, i) => i !== idx);
    updateField("profileSpec", specs);
  };

  return (
    <div className="space-y-5 text-xs font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#A08D80] mb-1.5 uppercase tracking-wider">Section Label</label>
          <input
            type="text"
            value={about.label}
            onChange={(e) => updateField("label", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[#A08D80] mb-1.5 uppercase tracking-wider">Title</label>
          <input
            type="text"
            value={about.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[#A08D80] uppercase tracking-wider">Narrative Paragraphs</label>
          <span className="text-[10px] text-[#FFAE64]">Separate paragraphs with double Enter</span>
        </div>
        <textarea
          rows={6}
          value={paragraphsText}
          onChange={(e) => handleParagraphsChange(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-sm focus:border-[#B87333] focus:outline-none leading-relaxed"
        />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-[#FFAE64] font-semibold">
            Engineering Specs (Right Card)
          </span>
          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1B1E28] hover:bg-[#B87333]/20 border border-[#2D323C] text-[#E2E2E8] hover:text-[#FFAE64] transition-colors"
          >
            <Plus size={12} />
            <span>Add Spec</span>
          </button>
        </div>

        <div className="space-y-3">
          {(about.profileSpec || []).map((spec, idx) => (
            <div key={idx} className="p-3 bg-[#14171E] border border-[#2D323C] rounded-xl flex items-start gap-3">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="SPEC LABEL"
                  value={spec.label}
                  onChange={(e) => updateSpec(idx, "label", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#0F1116] border border-[#2D323C] rounded text-[11px] text-[#FFAE64] font-mono uppercase focus:border-[#B87333] focus:outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Spec value..."
                  value={spec.value}
                  onChange={(e) => updateSpec(idx, "value", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#0F1116] border border-[#2D323C] rounded text-xs text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSpec(idx)}
                className="p-1.5 text-[#A08D80] hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
