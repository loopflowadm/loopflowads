import React from 'react';

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  type: 'text' | 'metrics' | 'roadmap' | 'comparison' | 'conclusion';
  highlight?: string;
  pausePrompt?: string;
  image?: string;
  metrics?: { label: string; value: string; desc: string }[];
}

export interface Path {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  slides: Slide[];
}

export interface ProspectData {
  name: string;
  segment: string;
  logo: string; // Base64 ou URL
  googleSheetsUrl?: string; // Link público CSV do Google Sheets
  status?: 'novo' | 'agendado' | 'proposta' | 'ganho' | 'perdido';
  metaAdAccountId?: string;
  metaAccessToken?: string;
}

export type AppState = 'list' | 'setup' | 'menu' | 'presentation' | 'calculator' | 'performance-dashboard' | 'pitch-editor';
