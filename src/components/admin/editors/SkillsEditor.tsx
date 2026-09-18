"use client";

import React, { useState } from "react";
import { SkillCategory } from "@/lib/content/types";
import { Plus, Trash2, Layers } from "lucide-react";

interface SkillsEditorProps {
  initialCategories: SkillCategory[];
  onChange: (updatedCategories: SkillCategory[]) => void;
}

export default function SkillsEditor({ initialCategories, onChange }: SkillsEditorProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([...initialCategories]);
  const [activeCatIdx, setActiveCatIdx] = useState(0);

  const updateCategoryName = (idx: number, name: string) => {
    const updated = [...categories];
    updated[idx] = { ...updated[idx], category: name };
    setCategories(updated);
    onChange(updated);
  };

  const updateItem = (itemIdx: number, field: "name" | "description", val: string) => {
    const updated = [...categories];
    const items = [...updated[activeCatIdx].items];
    items[itemIdx] = { ...items[itemIdx], [field]: val };
    updated[activeCatIdx] = { ...updated[activeCatIdx], items };
    setCategories(updated);
    onChange(updated);
  };

  const addItem = () => {
    const updated = [...categories];
    const items = [...updated[activeCatIdx].items, { name: "New Skill", description: "Proficiency & usage..." }];
    updated[activeCatIdx] = { ...updated[activeCatIdx], items };
    setCategories(updated);
    onChange(updated);
  };

  const removeItem = (itemIdx: number) => {
    const updated = [...categories];
    const items = updated[activeCatIdx].items.filter((_, i) => i !== itemIdx);
    updated[activeCatIdx] = { ...updated[activeCatIdx], items };
    setCategories(updated);
    onChange(updated);
  };

  const activeCategory = categories[activeCatIdx] || categories[0];

  return (
    <div className="space-y-6 text-xs font-mono">
      {/* Category selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2D323C]">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveCatIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap ${
              idx === activeCatIdx
                ? "bg-[#B87333] text-[#0B0D11] font-semibold shadow-sm"
                : "bg-[#14171E] text-[#A08D80] hover:text-[#E2E2E8]"
            }`}
          >
            <Layers size={13} />
            <span>{cat.category}</span>
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Category Name</label>
              <input
                type="text"
                value={activeCategory.category}
                onChange={(e) => updateCategoryName(activeCatIdx, e.target.value)}
                className="w-64 px-3 py-1.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] font-semibold focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B1E28] hover:bg-[#B87333]/20 border border-[#2D323C] text-[#FFAE64] transition-colors"
            >
              <Plus size={13} />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="space-y-3">
            {activeCategory.items.map((item, iIdx) => (
              <div key={iIdx} className="p-3 rounded-xl bg-[#14171E] border border-[#2D323C] flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(iIdx, "name", e.target.value)}
                    placeholder="Skill Name (e.g. TypeScript)"
                    className="w-full px-3 py-1.5 bg-[#0F1116] border border-[#2D323C] rounded text-xs text-[#FFAE64] font-semibold focus:border-[#B87333] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.description || ""}
                    onChange={(e) => updateItem(iIdx, "description", e.target.value)}
                    placeholder="Description of role and usage..."
                    className="w-full px-3 py-1.5 bg-[#0F1116] border border-[#2D323C] rounded text-xs text-[#D8C3B4] font-sans focus:border-[#B87333] focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(iIdx)}
                  className="p-1.5 text-[#A08D80] hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"
                  title="Remove Skill"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
