"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Save, Loader2 } from "lucide-react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  title: string;
  saving?: boolean;
  children: React.ReactNode;
}

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  title,
  saving = false,
  children,
}: EditModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, saving]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#060709]/85 backdrop-blur-md transition-opacity"
        onClick={saving ? undefined : onClose}
      />

      {/* Dialog Window */}
      <div className="relative w-full max-w-2xl bg-[#0F1116] border border-[#2D323C] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D323C] bg-[#14171E]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#B87333]" />
            <h2 id="modal-title" className="text-base font-serif text-[#E2E2E8]">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg text-[#A08D80] hover:text-[#E2E2E8] hover:bg-[#1F222B] transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-6 flex-1 text-[#E2E2E8]">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2D323C] bg-[#14171E]">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#A08D80] hover:text-[#E2E2E8] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B87333] hover:bg-[#c9803d] text-[#0B0D11] text-xs font-mono font-semibold uppercase tracking-wider transition-all disabled:opacity-50 shadow-md shadow-[#B87333]/20"
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
