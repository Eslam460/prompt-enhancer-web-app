"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { UserSettings } from "@/types/models";

type SettingsContextType = {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  hasApiKey: boolean;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

const STORAGE_KEY = "prompt_enhancer_settings";

const DEFAULT_SETTINGS: UserSettings = {
  apiKey: "",
  selectedModel: "nvidia/nemotron-nano-9b-v2:free",
  modelName: "Nvidia Nemotron Nano 9B (Free)",
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      } catch (error) {
        console.error("Failed to parse settings:", error);
      }
    } else {
      const envApiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      if (envApiKey) {
        setSettings(prev => ({ ...prev, apiKey: envApiKey }));
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (mounted) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const hasApiKey = Boolean(settings.apiKey);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, hasApiKey }}>
      {children}
    </SettingsContext.Provider>
  );
}
