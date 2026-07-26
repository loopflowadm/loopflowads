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
  bgVideo?: string;
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

  // Campos Dinâmicos de Personalização de Slides
  coverTag?: string;
  coverSubtitle?: string;
  coverFooter?: string;
  agendaSubtitle?: string;
  agendaStep1Title?: string;
  agendaStep1Desc?: string;
  agendaStep2Title?: string;
  agendaStep2Desc?: string;
  agendaStep3Title?: string;
  agendaStep3Desc?: string;
  agendaStep4Title?: string;
  agendaStep4Desc?: string;
  understandingTitlePrefix?: string;
  understandingSubtitle?: string;
  segmentCardLabel?: string;
  painPointCardLabel?: string;
  marketingSituationCardLabel?: string;
  findingsTitlePrefix?: string;
  findingsTitleWord1?: string;
  findingsTitleMid?: string;
  findingsTitleWord2?: string;
  findingsSubtitle?: string;
  finding1Title?: string;
  finding2Title?: string;
  goalCardLabel?: string;
  pillarsTag?: string;
  pillarsPrefix?: string;
  pillarsSubtitle?: string;
  front1Title?: string;
  front2Title?: string;
  front3Title?: string;
  howItWorksTitlePrefix?: string;
  howItWorksTitle?: string;
  step1Title?: string;
  step1Desc?: string;
  step2Title?: string;
  step2Desc?: string;
  step3Title?: string;
  step3Desc?: string;
  step4Title?: string;
  step4Desc?: string;
  deliverablesTag?: string;
  investmentTitle?: string;
  investmentSubtitle?: string;
  setupLabel?: string;
  operationLabel?: string;
  investmentFooter?: string;
  nextStepsPrefix?: string;
  nextStepsTitle?: string;
  nextStepsSubtitle?: string;
  step1CardTitle?: string;
  step1CardDesc?: string;
  step2CardTitle?: string;
  step3CardTitle?: string;
  ctaBannerTitle?: string;
  ctaBannerSubtext?: string;
}

export type AppState = 'list' | 'setup' | 'menu' | 'presentation' | 'calculator' | 'performance-dashboard' | 'pitch-editor';


