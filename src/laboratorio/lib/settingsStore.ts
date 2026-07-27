import { useState, useEffect } from 'react';

export type LLMProvider = 'gemini' | 'openai' | 'anthropic';

export interface LLMSettings {
  activeProvider: LLMProvider;
  geminiKey: string;
  openaiKey: string;
  anthropicKey: string;
}

const ENV_DEFAULTS: LLMSettings = {
  activeProvider: 'gemini',
  geminiKey: (import.meta as any).env?.VITE_GEMINI_API_KEY || '',
  openaiKey: (import.meta as any).env?.VITE_OPENAI_API_KEY || '',
  anthropicKey: (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '',
};

const SETTINGS_KEY = '@CriativosAI:settings';

class SettingsStore extends EventTarget {
  private settings: LLMSettings;

  constructor() {
    super();
    this.settings = this.load();
  }

  private load(): LLMSettings {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          activeProvider: parsed.activeProvider ?? ENV_DEFAULTS.activeProvider,
          geminiKey: ENV_DEFAULTS.geminiKey || parsed.geminiKey || '',
          openaiKey: ENV_DEFAULTS.openaiKey || parsed.openaiKey || '',
          anthropicKey: ENV_DEFAULTS.anthropicKey || parsed.anthropicKey || '',
        };
      }
    } catch {
      // ignore
    }
    return { ...ENV_DEFAULTS };
  }

  public get(): LLMSettings {
    return this.settings;
  }

  public set(newSettings: Partial<LLMSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
    this.dispatchEvent(new Event('change'));
  }

  public isConfigured(): boolean {
    const { geminiKey, openaiKey, anthropicKey } = this.settings;
    return !!(geminiKey || openaiKey || anthropicKey);
  }

  public isActiveProviderConfigured(): boolean {
    const { activeProvider, geminiKey, openaiKey, anthropicKey } = this.settings;
    if (activeProvider === 'gemini') return !!geminiKey;
    if (activeProvider === 'openai') return !!openaiKey;
    if (activeProvider === 'anthropic') return !!anthropicKey;
    return false;
  }
}

export const settingsStore = new SettingsStore();

export function useSettings() {
  const [settings, setSettings] = useState<LLMSettings>(settingsStore.get());

  useEffect(() => {
    const handleUpdate = () => setSettings(settingsStore.get());
    settingsStore.addEventListener('change', handleUpdate);
    return () => settingsStore.removeEventListener('change', handleUpdate);
  }, []);

  return {
    settings,
    updateSettings: (newSettings: Partial<LLMSettings>) => settingsStore.set(newSettings),
    isConfigured: settingsStore.isConfigured(),
    isActiveProviderConfigured: settingsStore.isActiveProviderConfigured(),
  };
}
