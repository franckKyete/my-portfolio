"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import EditModal from "./EditModal";

import HeroEditor from "./editors/HeroEditor";
import AboutEditor from "./editors/AboutEditor";
import ProjectsEditor from "./editors/ProjectsEditor";
import ExperienceEditor from "./editors/ExperienceEditor";
import HowIWorkEditor from "./editors/HowIWorkEditor";
import SkillsEditor from "./editors/SkillsEditor";
import PassionsEditor from "./editors/PassionsEditor";
import ContactEditor from "./editors/ContactEditor";

interface EditTriggerProps {
  section: "hero" | "about" | "projects" | "experience" | "howIWork" | "skills" | "passions" | "contact";
  title: string;
  data: any;
  profile?: any;
  className?: string;
}

export default function EditTrigger({
  section,
  title,
  data,
  profile,
  className = "absolute top-4 right-4",
}: EditTriggerProps) {
  const router = useRouter();
  const { user, isEditorMode, getIdToken } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftData, setDraftData] = useState<any>(data);
  const [draftProfile, setDraftProfile] = useState<any>(profile);

  if (!user || !isEditorMode) return null;

  const handleOpen = () => {
    setDraftData(data);
    setDraftProfile(profile);
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = await getIdToken(true);
      if (!token) {
        throw new Error("Your login session has expired. Please sign out and sign in again.");
      }

      // 1. Update section data
      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          data: draftData,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const message = errJson.details
          ? `${errJson.error} — ${errJson.details}`
          : errJson.error || `Update failed with status ${res.status}`;
        throw new Error(message);
      }

      // 2. If hero editor modified profile, update profile document as well
      if (section === "hero" && draftProfile) {
        const profileRes = await fetch("/api/content/update", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            section: "profile",
            data: draftProfile,
          }),
        });

        if (!profileRes.ok) {
          const profileErr = await profileRes.json().catch(() => ({}));
          const message = profileErr.details
            ? `${profileErr.error} — ${profileErr.details}`
            : profileErr.error || `Profile update failed with status ${profileRes.status}`;
          throw new Error(message);
        }
      }

      // Refresh server-rendered components
      router.refresh();
      setIsOpen(false);
    } catch (err: any) {
      console.error("Content update error:", err);
      setError(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const renderEditor = () => {
    switch (section) {
      case "hero":
        return (
          <HeroEditor
            initialHero={draftData}
            initialProfile={draftProfile}
            onChange={(h, p) => {
              setDraftData(h);
              if (p) setDraftProfile(p);
            }}
          />
        );
      case "about":
        return (
          <AboutEditor
            initialAbout={draftData}
            onChange={(a) => setDraftData(a)}
          />
        );
      case "projects":
        return (
          <ProjectsEditor
            initialProjects={draftData}
            onChange={(p) => setDraftData(p)}
          />
        );
      case "experience":
        return (
          <ExperienceEditor
            initialExperience={draftData}
            onChange={(e) => setDraftData(e)}
          />
        );
      case "howIWork":
        return (
          <HowIWorkEditor
            initialPrinciples={draftData}
            onChange={(hw) => setDraftData(hw)}
          />
        );
      case "skills":
        return (
          <SkillsEditor
            initialCategories={draftData}
            onChange={(s) => setDraftData(s)}
          />
        );
      case "passions":
        return (
          <PassionsEditor
            initialPassions={draftData}
            onChange={(ps) => setDraftData(ps)}
          />
        );
      case "contact":
        return (
          <ContactEditor
            initialContact={draftData}
            onChange={(c) => setDraftData(c)}
          />
        );
      default:
        return <div>Editor not configured for this section.</div>;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        title={`Edit ${title}`}
        aria-label={`Edit ${title}`}
        className={`p-2.5 rounded-full bg-[#14171E]/90 hover:bg-[#B87333] border border-[#B87333]/50 text-[#FFAE64] hover:text-[#0B0D11] shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 group z-40 ${className}`}
      >
        <Pencil size={14} className="group-hover:rotate-12 transition-transform" />
      </button>

      <EditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        title={title}
        saving={saving}
        error={error}
      >
        {renderEditor()}
      </EditModal>
    </>
  );
}
