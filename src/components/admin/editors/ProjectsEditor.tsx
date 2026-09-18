"use client";

import React, { useState } from "react";
import { Project } from "@/lib/content/types";
import { Plus, Trash2, FolderGit2 } from "lucide-react";

interface ProjectsEditorProps {
  initialProjects: Project[];
  onChange: (updatedProjects: Project[]) => void;
}

export default function ProjectsEditor({ initialProjects, onChange }: ProjectsEditorProps) {
  const [projects, setProjects] = useState<Project[]>([...initialProjects]);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateActiveProject = (field: keyof Project, value: any) => {
    const updated = [...projects];
    updated[activeIdx] = { ...updated[activeIdx], [field]: value };
    setProjects(updated);
    onChange(updated);
  };

  const addProject = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      ref: `NEW.0${projects.length + 1}`,
      title: "New Project",
      tagline: "Brief project overview...",
      category: "Systems & Architecture",
      status: "Active Development",
      description: ["Detailed description paragraph..."],
      tech: ["TypeScript", "React"],
    };
    const updated = [...projects, newProj];
    setProjects(updated);
    setActiveIdx(updated.length - 1);
    onChange(updated);
  };

  const removeProject = (idx: number) => {
    if (projects.length <= 1) return;
    const updated = projects.filter((_, i) => i !== idx);
    setProjects(updated);
    setActiveIdx(Math.max(0, idx - 1));
    onChange(updated);
  };

  const activeProject = projects[activeIdx] || projects[0];

  return (
    <div className="space-y-6 text-xs font-mono">
      {/* Project Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2D323C]">
        {projects.map((p, idx) => (
          <button
            key={p.id || idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap ${
              idx === activeIdx
                ? "bg-[#B87333] text-[#0B0D11] font-semibold shadow-sm"
                : "bg-[#14171E] text-[#A08D80] hover:text-[#E2E2E8]"
            }`}
          >
            <FolderGit2 size={13} />
            <span>{p.title || `Project ${idx + 1}`}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="p-1.5 rounded-lg bg-[#1B1E28] hover:bg-[#B87333]/20 border border-[#2D323C] text-[#FFAE64] transition-colors"
          title="Add New Project"
        >
          <Plus size={14} />
        </button>
      </div>

      {activeProject && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#FFAE64] font-semibold">
              Editing: {activeProject.title}
            </span>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(activeIdx)}
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 p-1 rounded transition-colors"
              >
                <Trash2 size={13} />
                <span>Delete Project</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Ref Tag (SYS.01)</label>
              <input
                type="text"
                value={activeProject.ref}
                onChange={(e) => updateActiveProject("ref", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Category</label>
              <input
                type="text"
                value={activeProject.category}
                onChange={(e) => updateActiveProject("category", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Status</label>
              <input
                type="text"
                value={activeProject.status || ""}
                onChange={(e) => updateActiveProject("status", e.target.value)}
                className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              value={activeProject.title}
              onChange={(e) => updateActiveProject("title", e.target.value)}
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] font-serif text-base focus:border-[#B87333] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A08D80] mb-1 uppercase tracking-wider">Tagline</label>
            <textarea
              rows={2}
              value={activeProject.tagline}
              onChange={(e) => updateActiveProject("tagline", e.target.value)}
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] focus:border-[#B87333] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#A08D80] uppercase tracking-wider">Detailed Description Paragraphs</label>
              <span className="text-[10px] text-[#FFAE64]">Separate paragraphs with double Enter</span>
            </div>
            <textarea
              rows={5}
              value={(activeProject.description || []).join("\n\n")}
              onChange={(e) =>
                updateActiveProject(
                  "description",
                  e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean)
                )
              }
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#D8C3B4] font-sans text-xs focus:border-[#B87333] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[#A08D80] uppercase tracking-wider">Tech Stack Chips</label>
              <span className="text-[10px] text-[#A08D80]">Comma-separated</span>
            </div>
            <input
              type="text"
              value={(activeProject.tech || []).join(", ")}
              onChange={(e) =>
                updateActiveProject(
                  "tech",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              placeholder="TypeScript, React, Rust, WebSockets..."
              className="w-full px-3 py-2 bg-[#14171E] border border-[#2D323C] rounded-lg text-[#E2E2E8] focus:border-[#B87333] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
