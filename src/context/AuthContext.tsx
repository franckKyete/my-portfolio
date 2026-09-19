"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getClientAuth, initClientAuth } from "@/lib/firebase/client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isEditorMode: boolean;
  toggleEditorMode: () => void;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isEditorMode: true,
  toggleEditorMode: () => {},
  signIn: async () => {},
  signOut: async () => {},
  getIdToken: async () => null,
  isConfigured: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    async function initialize() {
      // 1. Check synchronous auth
      let authInstance = getClientAuth();

      // 2. If not ready, await runtime fetch (/api/firebase-config)
      if (!authInstance) {
        authInstance = await initClientAuth();
      }

      if (!isMounted) return;

      if (!authInstance) {
        setIsConfigured(false);
        setLoading(false);
        return;
      }

      setIsConfigured(true);
      unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
        if (!isMounted) return;
        setUser(currentUser);
        setLoading(false);
      });
    }

    initialize();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    let authInstance = getClientAuth();
    if (!authInstance) {
      authInstance = await initClientAuth();
    }
    if (!authInstance) {
      throw new Error(
        "Client Firebase Auth is not configured. Please ensure Firebase environment variables are set in Cloudflare or .env.local."
      );
    }
    await signInWithEmailAndPassword(authInstance, email, pass);
  };

  const signOut = async () => {
    let authInstance = getClientAuth();
    if (!authInstance) {
      authInstance = await initClientAuth();
    }
    if (authInstance) {
      await firebaseSignOut(authInstance);
      setUser(null);
    }
  };

  const getIdToken = async (forceRefresh: boolean = false): Promise<string | null> => {
    if (!user) return null;
    try {
      return await user.getIdToken(forceRefresh);
    } catch (err) {
      console.warn("Error getting ID token, attempting force refresh:", err);
      try {
        return await user.getIdToken(true);
      } catch (refreshErr) {
        console.error("Force token refresh failed:", refreshErr);
        return null;
      }
    }
  };

  const toggleEditorMode = () => {
    setIsEditorMode((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isEditorMode,
        toggleEditorMode,
        signIn,
        signOut,
        getIdToken,
        isConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
