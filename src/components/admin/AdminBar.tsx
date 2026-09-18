"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Eye, Edit3, LogOut, User } from "lucide-react";

export default function AdminBar() {
  const { user, isEditorMode, toggleEditorMode, signOut } = useAuth();

  if (!user) return null;

  return (
    <aside
      aria-label="Editor controls"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="glass-panel gallery-border rounded-full px-5 py-2.5 flex items-center gap-4 shadow-2xl border border-[#B87333]/40 bg-[#0E1015]/95 backdrop-blur-xl">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B87333] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFAE64]"></span>
          </span>
          <span className="text-xs font-mono text-[#E2E2E8] font-medium tracking-wider hidden sm:inline">
            Editor Active
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#2D323C]" />

        {/* User Email Info */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#A08D80]">
          <User size={13} className="text-[#B87333]" />
          <span className="max-w-[140px] truncate hidden md:inline">
            {user.email}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#2D323C]" />

        {/* Toggle Pencils Visibility */}
        <button
          onClick={toggleEditorMode}
          title={isEditorMode ? "Switch to Preview Mode (hide pencils)" : "Switch to Edit Mode (show pencils)"}
          className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full transition-all ${
            isEditorMode
              ? "bg-[#B87333]/20 text-[#FFAE64] border border-[#B87333]/40"
              : "bg-[#1B1E28] text-[#A08D80] hover:text-[#E2E2E8]"
          }`}
        >
          {isEditorMode ? (
            <>
              <Edit3 size={12} />
              <span>Editing</span>
            </>
          ) : (
            <>
              <Eye size={12} />
              <span>Preview</span>
            </>
          )}
        </button>

        {/* Sign Out Button */}
        <button
          onClick={() => signOut()}
          title="Sign Out of Editor"
          className="p-1.5 rounded-full text-[#A08D80] hover:text-red-400 hover:bg-red-950/30 transition-colors"
          aria-label="Sign out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
