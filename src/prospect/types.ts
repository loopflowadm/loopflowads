import React from 'react';

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  type: 'text' | 'metrics' | 'roadmap' | 'comparison' | 'conclusion' | 'proposal-cover' | 'proposal-agenda' | 'proposal-understanding' | 'proposal-findings' | 'proposal-pillars' | 'proposal-investment' | 'proposal-how-it-works' | 'proposal-next-steps' | 'cp-cover' | 'cp-who-we-are' | 'cp-understanding' | 'cp-challenge' | 'cp-solution' | 'cp-how-it-works' | 'cp-examples' | 'cp-opportunities' | 'cp-workflow' | 'cp-credits' | 'cp-plans' | 'cp-differentials' | 'cp-next-steps' | 'cp-investment' | 'cp-closing';
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
  companyName?: string;
  logoUrl?: string;
  colorScheme?: { primary: string; secondary?: string };
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

  // ============================================
  // Campos Creative Performance
  // ============================================

  // Capa
  cpCoverTag?: string;
  cpCoverSubtitle?: string;
  cpCoverFooter?: string;

  // Quem Somos
  cpWhoWeAreTitle?: string;
  cpWhoWeAreSubtitle?: string;
  cpWhoWeArePoint1?: string;
  cpWhoWeArePoint2?: string;
  cpWhoWeArePoint3?: string;
  cpWhoWeArePoint4?: string;
  cpWhoWeAreHighlight?: string;

  // Entendimento Blue
  cpUnderstandingTitle?: string;
  cpUnderstandingSubtitle?: string;
  cpUnderstandingStat1Label?: string;
  cpUnderstandingStat1Value?: string;
  cpUnderstandingStat2Label?: string;
  cpUnderstandingStat2Value?: string;
  cpUnderstandingQuote?: string;

  // Desafio de Comunicação
  cpChallengeTitle?: string;
  cpChallengeSubtitle?: string;
  cpChallengePoint1?: string;
  cpChallengePoint2?: string;
  cpChallengePoint3?: string;
  cpChallengePoint4?: string;
  cpChallengeHighlight?: string;

  // Solução
  cpSolutionTitle?: string;
  cpSolutionSubtitle?: string;
  cpSolutionDesc?: string;
  cpSolutionBenefit1?: string;
  cpSolutionBenefit2?: string;
  cpSolutionBenefit3?: string;
  cpSolutionBenefit4?: string;
  cpSolutionBenefit5?: string;

  // Como funciona
  cpHowStep1Title?: string;
  cpHowStep1Desc?: string;
  cpHowStep2Title?: string;
  cpHowStep2Desc?: string;
  cpHowStep3Title?: string;
  cpHowStep3Desc?: string;
  cpHowStep4Title?: string;
  cpHowStep4Desc?: string;

  // Oportunidades
  cpOpportunitiesTitle?: string;
  cpOpportunitiesSubtitle?: string;

  // Diferencial (Patrimônio)
  cpDifferentialTitle?: string;
  cpDifferentialSubtitle?: string;
  cpDifferentialHighlight?: string;

  // Fluxo de Trabalho
  cpWorkflowTitle?: string;
  cpWorkflowSubtitle?: string;

  // Créditos
  cpCreditsTitle?: string;
  cpCreditsSubtitle?: string;

  // Planos — Starter
  cpStarterName?: string;
  cpStarterCredits?: string;
  cpStarterPrice?: string;
  // Planos — Performance
  cpPerformanceName?: string;
  cpPerformanceCredits?: string;
  cpPerformancePrice?: string;
  // Planos — Enterprise
  cpEnterpriseName?: string;
  cpEnterpriseCredits?: string;
  cpEnterprisePrice?: string;

  // Diferenciais
  cpDifferentialsTitle?: string;
  cpDifferentialsSubtitle?: string;

  // Próximos Passos
  cpNextStepsTitle?: string;
  cpNextStepsSubtitle?: string;

  // Investimento
  cpInvestmentTitle?: string;
  cpInvestmentSubtitle?: string;
  cpInvestmentFooter?: string;

  // Encerramento
  cpClosingTitle?: string;
  cpClosingSubtitle?: string;
  cpClosingCTA?: string;
}

export type AppState = 'list' | 'setup' | 'menu' | 'presentation' | 'calculator' | 'performance-dashboard' | 'pitch-editor' | 'laboratorio';


