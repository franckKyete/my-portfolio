"use client";

import React, { useState } from "react";
import { Experience } from "@/lib/content/types";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface ExperienceEditorProps {
  initialExperience: Experience[];
  onChange: (updatedExperience: Experience[]) => void;
}

export default function ExperienceEditor({ initialExperience, onChange }: ExperienceEditorProps) {
  const [experience, setExperience] = useState<Experience[]>([...initialExperience]);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateActiveExp = (field: keyof Experience, value: any) => {
    const updated = [...experience];
    updated[activeIdx] = { ...updated[activeIdx], [field]: value };
    setExperience(updated);
    onChange(updated);
  };

  const addExp = () => {
    const newExp: Experience = {
      role: "Software Developer",
      company: "Company Name",
      type: "Contract / Full-time",
      projectOrDomain: "Project Domain",
      description: ["Description of contributions and systems built..."],
      tech: ["TypeScript", "Next.js", "PostgreSQL"],
    };
    const updated = [...experience, newExp];
    setExperience(updated);
    setActiveIdx(updated.length - 1);
    onChange(updated);
  };

  const removeExp = (idx: number) => {
    if (experience.length <= 1) return;
    const updated = experience.filter((_, i) => i !== idx);
    setExperience(updated);
    setActiveIdx(Math.max(0, idx - 1));
    onChange(updated);
  };

  const activeExp = experience[activeIdx] || experience[0];

  return (
    <div className="space-y-6 text-xs font-mono">
      {/* Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2D323C]">
        {experience.map((exp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap ${
              idx === activeIdx
                ? "bg-[#B87333] text-[#0B0D11] font-semibold shadow-sm"
                : "bg-[#14171E] text-[#A08D80] hover:text-[#E2E2E8]"
            }`}
          >
            <Briefcase size={13} />
            <span>{exp.company || `Role ${idx + 1}`}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={addExp}
          className="p-1.5 rounded-lg bg-[#1B1E28] hover:bg-[#B87333]/20 border border-[#2D323C] text-[#FFAE64] transition-colors"
          title="Add New Experience"
        >
          <Plus size={14} />
        </button>
      </div>

      {activeExp && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FFAE64] font-semibold">
              Editing: {activeExp.role} at {activeExp.company}
            </span>
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExp(activeIdx)}
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 p-1 rounded transition-colors"
              >
                <Trash2 size={13} />
                <span>Delete Entry</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Role Title</label>
              <input
                type="text"
                value={activeExp.role}
                onChange={(e) => updateActiveExp("role", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Company Name</label>
              <input
                type="text"
                value={activeExp.company}
                onChange={(e) => updateActiveExp("company", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Type (Internship, Contract, Full-time)</label>
              <input
                type="text"
                value={activeExp.type}
                onChange={(e) => updateActiveExp("type", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Project / Domain (Renttik, ERP, etc.)</label>
              <input
                type="text"
                value={activeExp.projectOrDomain}
                onChange={(e) => updateActiveExp("projectOrDomain", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Live URL (Optional)</label>
            <input
              type="text"
              value={activeExp.url || ""}
              onChange={(e) => updateActiveExp("url", e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#A08D80] uppercase tracking-wider">Description Paragraphs</label>
              <span className="text-[10px] text-[#FFAE64]">Separate with double Enter</span>
            </div>
            <textarea
              rows={5}
              value={(activeExp.description || []).join("\n\n")}
              onChange={(e) =>
                updateActiveExp(
                  "description",
                  e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean)
                )
              }
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-xs focus:border-[#B87333] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#A08D80] uppercase tracking-wider">Tech Stack</label>
              <span className="text-[10px] text-[#A08D80]">Comma-separated</span>
            </div>
            <input
              type="text"
              value={(activeExp.tech || []).join(", ")}
              onChange={(e) =>
                updateActiveExp(
                  "tech",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              placeholder="TypeScript, React, Laravel, PHP..."
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
