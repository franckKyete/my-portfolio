"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Terminal, Lock, Mail, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, isConfigured, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/");
    } catch (err: any) {
      console.error("Sign in failed:", err);
      let msg = "Failed to sign in. Please check your credentials.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again later.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#0B0D11] text-[#E2E2E8] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#B87333]/5 blur-[120px] pointer-events-none -top-20 -left-20"
        aria-hidden="true"
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#FBBC00]/5 blur-[100px] pointer-events-none -bottom-20 -right-20"
        aria-hidden="true"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Return to Portfolio Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#A08D80] hover:text-[#B87333] transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </Link>

        {/* Login Card */}
        <div className="glass-panel gallery-border rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-[#2D323C]">
          {/* Top Decorative Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B87333] to-transparent" />

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B1E28] border border-[#2D323C] mb-4">
              <Terminal size={13} className="text-[#B87333]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B87333]">
                ADMIN.AUTH
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#E2E2E8]">
              Portfolio Console
            </h1>
            <p className="text-xs sm:text-sm text-[#A08D80] font-light mt-1.5">
              Authenticate to enable in-place content editing.
            </p>
          </div>

          {!isConfigured && !authLoading && (
            <div className="mb-6 p-4 rounded-xl bg-[#1C1514] border border-amber-900/40 text-amber-300 text-xs flex items-start gap-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium mb-1">Configuration Needed</strong>
                Client Firebase is missing <code className="bg-black/40 px-1 py-0.5 rounded">FIREBASE_API_KEY</code> / <code className="bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_FIREBASE_API_KEY</code>. Please add it to your Cloudflare Workers environment variables or <code className="bg-black/40 px-1 py-0.5 rounded">.env.local</code>.
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-900/50 text-red-300 text-xs flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A08D80] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08D80]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@franck-kibwe.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#111317] border border-[#2D323C] rounded-xl text-sm font-mono text-[#E2E2E8] placeholder-[#555] focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A08D80] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08D80]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#111317] border border-[#2D323C] rounded-xl text-sm font-mono text-[#E2E2E8] placeholder-[#555] focus:outline-none focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isConfigured || authLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#B87333] hover:bg-[#c9803d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0D11] text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B87333]/20 hover:shadow-[#B87333]/30"
            >
              {loading || authLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{authLoading ? "Initializing..." : "Authenticating..."}</span>
                </>
              ) : (
                <span>Sign In to Editor</span>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-[#2D323C]/50 text-center">
            <span className="text-[11px] font-mono text-[#6E6E78]">
              Protected console · Firebase Auth verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
