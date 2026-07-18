import React from 'react';
import { Path, Slide } from './types';
import { TrendingUp, Rocket, Award } from 'lucide-react';
import {
  DELIVERY_PERFORMANCE_FLOW, DELIVERY_OMNICHANNEL_FLOW, DELIVERY_BRAND_AUTHORITY_FLOW,
  ECOMMERCE_PERFORMANCE_FLOW, ECOMMERCE_OMNICHANNEL_FLOW, ECOMMERCE_BRAND_AUTHORITY_FLOW,
  SERVICES_PERFORMANCE_FLOW, SERVICES_OMNICHANNEL_FLOW, SERVICES_BRAND_AUTHORITY_FLOW,
  B2B_PERFORMANCE_FLOW, B2B_OMNICHANNEL_FLOW, B2B_BRAND_AUTHORITY_FLOW
} from './dataFlows';

// Função auxiliar para obter os slides dinamicamente com base no nicho do lead e no caminho selecionado
export const getPitchFlowBySegment = (segment: string, pathId: string): Slide[] => {
  const s = segment.toLowerCase();
  
  if (s.includes('delivery') || s.includes('restaurante')) {
    if (pathId === 'performance-scale') return DELIVERY_PERFORMANCE_FLOW;
    if (pathId === 'omnichannel-growth') return DELIVERY_OMNICHANNEL_FLOW;
    if (pathId === 'brand-authority') return DELIVERY_BRAND_AUTHORITY_FLOW;
  }
  
  if (s.includes('commerce') || s.includes('varejo') || s.includes('loja')) {
    if (pathId === 'performance-scale') return ECOMMERCE_PERFORMANCE_FLOW;
    if (pathId === 'omnichannel-growth') return ECOMMERCE_OMNICHANNEL_FLOW;
    if (pathId === 'brand-authority') return ECOMMERCE_BRAND_AUTHORITY_FLOW;
  }
  
  if (s.includes('local') || s.includes('clínica') || s.includes('serviço') || s.includes('clinica')) {
    if (pathId === 'performance-scale') return SERVICES_PERFORMANCE_FLOW;
    if (pathId === 'omnichannel-growth') return SERVICES_OMNICHANNEL_FLOW;
    if (pathId === 'brand-authority') return SERVICES_BRAND_AUTHORITY_FLOW;
  }
  
  // Default B2B / Corporativo / Outro
  if (pathId === 'performance-scale') return B2B_PERFORMANCE_FLOW;
  if (pathId === 'omnichannel-growth') return B2B_OMNICHANNEL_FLOW;
  if (pathId === 'brand-authority') return B2B_BRAND_AUTHORITY_FLOW;

  return B2B_PERFORMANCE_FLOW;
};

// Estrutura de caminhos de apresentação exibidos no painel do gestor
export const PATHS: Path[] = [
  {
    id: 'performance-scale',
    title: 'Performance\nE escala',
    description: 'Engenharia de tráfego focada em aquisição direta, redução de custos e escala previsível.',
    icon: React.createElement(TrendingUp),
    color: '#FACC15',
    slides: [] // Injetados dinamicamente com base no nicho do prospect
  },
  {
    id: 'omnichannel-growth',
    title: 'Crescimento\nOmnichannel',
    description: 'Estratégia multicanal conectando atração social, Google e relacionamento ativo por WhatsApp.',
    icon: React.createElement(Rocket),
    color: '#FACC15',
    slides: []
  },
  {
    id: 'brand-authority',
    title: 'Autoridade\nde marca',
    description: 'Posicionamento premium focado em diferenciação e valor percebido para vender com mais margem.',
    icon: React.createElement(Award),
    color: '#FACC15',
    slides: []
  }
];
