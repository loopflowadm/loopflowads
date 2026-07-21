import React from 'react';

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  type: 'text' | 'metrics' | 'roadmap' | 'comparison' | 'conclusion' | 'proposal-cover' | 'proposal-agenda' | 'proposal-understanding' | 'proposal-findings' | 'proposal-pillars' | 'proposal-investment' | 'proposal-how-it-works' | 'proposal-next-steps';
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
  contactName?: string;
  contactPhone?: string;
  websiteUrl?: string;
  estimatedRevenue?: string;
  mainPainPoint?: string;

  // Campos Dinâmicos da Proposta Comercial
  marketingSituation?: string;
  auditFinding1?: string;
  auditFinding2?: string;
  businessGoal?: string;
  front1?: string;
  front2?: string;
  front3?: string;
  presentationDate?: string;

  // Preços e Escopo da Proposta
  planName?: string;
  planDesc?: string;
  setupPrice?: string;
  operationPrice?: string;

  // O que está incluso
  activeCampaignsCount?: string;
  creativesCount?: string;
  meetingFrequency?: string;
  reportFormat?: string;
  includedChannels?: string;
  landingPageIncluded?: string;

  // Onboarding
  kickoffDays?: string;
  deliveriesDays?: string;
}

export type AppState = 'list' | 'setup' | 'menu' | 'presentation' | 'calculator' | 'performance-dashboard' | 'pitch-editor';


