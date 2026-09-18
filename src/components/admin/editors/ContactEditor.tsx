"use client";

import React, { useState } from "react";
import { ContactContent } from "@/lib/content/types";

interface ContactEditorProps {
  initialContact: ContactContent;
  onChange: (updatedContact: ContactContent) => void;
}

export default function ContactEditor({ initialContact, onChange }: ContactEditorProps) {
  const [contact, setContact] = useState<ContactContent>({ ...initialContact });

  const updateField = (field: keyof ContactContent, value: any) => {
    const updated = { ...contact, [field]: value };
    setContact(updated);
    onChange(updated);
  };

  const updateLink = (idx: number, field: "href" | "label", val: string) => {
    const links = [...contact.links];
    links[idx] = { ...links[idx], [field]: val };
    updateField("links", links);
  };

  return (
    <div className="space-y-5 text-xs font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Eyebrow</label>
          <input
            type="text"
            value={contact.eyebrow}
            onChange={(e) => updateField("eyebrow", e.target.value)}
            className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Subheadline</label>
          <input
            type="text"
            value={contact.subheadline}
            onChange={(e) => updateField("subheadline", e.target.value)}
            className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Main Headline</label>
        <input
          type="text"
          value={contact.headline}
          onChange={(e) => updateField("headline", e.target.value)}
          className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] font-serif text-base focus:border-[#B87333] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Body Copy</label>
        <textarea
          rows={3}
          value={contact.body}
          onChange={(e) => updateField("body", e.target.value)}
          className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-xs focus:border-[#B87333] focus:outline-none leading-relaxed"
        />
      </div>

      <div className="space-y-3 pt-2">
        <span className="text-xs uppercase tracking-wider text-[#FFAE64] font-semibold block">
          Contact Channels & Links
        </span>

        <div className="space-y-3">
          {contact.links.map((link, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#14171E] border border-[#2D323C] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">
                  {link.name} Display Label
                </label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink(idx, "label", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#0F1116] border border-[#2D323C] rounded text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">
                  Target URL / mailto
                </label>
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateLink(idx, "href", e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#0F1116] border border-[#2D323C] rounded text-[#FFAE64] focus:border-[#B87333] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
