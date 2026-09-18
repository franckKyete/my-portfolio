"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

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
  isConfigured: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setIsConfigured(false);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    const auth = getClientAuth();
    if (!auth) {
      throw new Error(
        "Client Firebase Auth is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID to your .env.local file."
      );
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signOut = async () => {
    const auth = getClientAuth();
    if (auth) {
      await firebaseSignOut(auth);
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
