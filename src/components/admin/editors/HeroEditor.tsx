"use client";

import React, { useState } from "react";
import { HeroContent, ProfileContent } from "@/lib/content/types";

interface HeroEditorProps {
  initialHero: HeroContent;
  initialProfile?: ProfileContent;
  onChange: (updatedHero: HeroContent, updatedProfile?: ProfileContent) => void;
}

export default function HeroEditor({ initialHero, initialProfile, onChange }: HeroEditorProps) {
  const [hero, setHero] = useState<HeroContent>({ ...initialHero });
  const [profile, setProfile] = useState<ProfileContent | undefined>(
    initialProfile ? { ...initialProfile } : undefined
  );

  const updateHeroField = (field: keyof HeroContent, value: any) => {
    const updated = { ...hero, [field]: value };
    setHero(updated);
    onChange(updated, profile);
  };

  const updateCta = (type: "primaryCta" | "secondaryCta", field: "text" | "href", value: string) => {
    const updated = {
      ...hero,
      [type]: { ...hero[type], [field]: value },
    };
    setHero(updated);
    onChange(updated, profile);
  };

  const updateProfileField = (field: keyof ProfileContent, value: string) => {
    if (!profile) return;
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    onChange(hero, updated);
  };

  return (
    <div className="space-y-5 text-xs font-mono">
      {profile && (
        <div className="p-4 rounded-xl bg-[#14171E] border border-[#2D323C] space-y-4">
          <span className="text-[11px] uppercase tracking-wider text-[#FFAE64] block font-semibold">
            Global Profile Info
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A08D80] mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfileField("name", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#A08D80] mb-1.5 uppercase tracking-wider">Title / Role</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => updateProfileField("title", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-[#A08D80] mb-1.5 uppercase tracking-wider">Eyebrow Tag</label>
        <input
          type="text"
          value={hero.eyebrow}
          onChange={(e) => updateHeroField("eyebrow", e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[#A08D80] uppercase tracking-wider">Main Headline</label>
          <span className="text-[10px] text-[#FFAE64]">Wrap in *asterisks* for italic emphasis</span>
        </div>
        <textarea
          rows={3}
          value={hero.headline}
          onChange={(e) => updateHeroField("headline", e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] font-serif text-base focus:border-[#B87333] focus:outline-none leading-relaxed"
        />
      </div>

      <div>
        <label className="block text-[#A08D80] mb-1.5 uppercase tracking-wider">Body Narrative</label>
        <textarea
          rows={4}
          value={hero.body}
          onChange={(e) => updateHeroField("body", e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-sm focus:border-[#B87333] focus:outline-none leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-3.5 rounded-xl bg-[#14171E] border border-[#2D323C] space-y-3">
          <span className="text-[#FFAE64] uppercase tracking-wider block font-semibold">Primary CTA</span>
          <div>
            <label className="block text-[#A08D80] mb-1">Button Text</label>
            <input
              type="text"
              value={hero.primaryCta.text}
              onChange={(e) => updateCta("primaryCta", "text", e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#A08D80] mb-1">Target Link (#projects)</label>
            <input
              type="text"
              value={hero.primaryCta.href}
              onChange={(e) => updateCta("primaryCta", "href", e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#14171E] border border-[#2D323C] space-y-3">
          <span className="text-[#FFAE64] uppercase tracking-wider block font-semibold">Secondary CTA</span>
          <div>
            <label className="block text-[#A08D80] mb-1">Button Text</label>
            <input
              type="text"
              value={hero.secondaryCta.text}
              onChange={(e) => updateCta("secondaryCta", "text", e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#A08D80] mb-1">Target Link (#contact)</label>
            <input
              type="text"
              value={hero.secondaryCta.href}
              onChange={(e) => updateCta("secondaryCta", "href", e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1116] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
