import React from 'react';
import { Path, Slide, ProspectData } from './types';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnalyticsUpIcon } from '@hugeicons/core-free-icons';

const TrendingUp = (props: any) =>
  React.createElement(HugeiconsIcon, {
    icon: AnalyticsUpIcon,
    size: props.size || 20,
    className: props.className || '',
    color: props.color || 'currentColor',
    strokeWidth: props.strokeWidth || 1.5,
  });

// Função para gerar os slides da Proposta Comercial dinamicamente com base nos dados do prospect
export const getCommercialProposalSlides = (prospect?: ProspectData): Slide[] => {
  const companyName = prospect?.name || 'Sua Empresa';
  const segment = prospect?.segment || 'Mercado Relevante & Vendas Diretas';
  const painPoint = prospect?.mainPainPoint || 'Custo de aquisição elevado e falta de previsibilidade na geração de novos clientes.';
  const marketingSituation = prospect?.marketingSituation || 'Investimento sem rastreamento unificado de conversão e alta dependência de canais não controlados.';
  const auditFinding1 = prospect?.auditFinding1 || 'Falta de otimização de topo e meio de funil, gerando tráfego sem retenção de leads.';
  const auditFinding2 = prospect?.auditFinding2 || 'Ausência de testes A/B contínuos em criativos de alta conversão e remarketing ativo.';
  const businessGoal = prospect?.businessGoal || 'Escalar o faturamento mensal de forma previsível e aumentar a margem de lucro operacional.';
  const front1 = prospect?.front1 || 'Planejamento das campanhas e definição do público certo desde o início (Meta Ads, e Google Ads quando aplicável). Foco em não desperdiçar verba com quem não converte.';
  const front2 = prospect?.front2 || 'Configuração dos anúncios com foco em conversão e rastreamento correto (pixel e eventos de conversão). Isso garante que os dados que guiam a otimização sejam confiáveis desde o primeiro dia.';
  const front3 = prospect?.front3 || 'Ajustes constantes com base em performance real, com relatório semanal simplificado, relatório mensal completo e reunião mensal de acompanhamento. Assim você sempre sabe onde está o dinheiro.';

  const todayStr = prospect?.presentationDate || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const kickoffDays = prospect?.kickoffDays || '2';
  const deliveriesDays = prospect?.deliveriesDays || '5';

  return [
    {
      id: 'prop-cover',
      type: 'proposal-cover',
      title: companyName,
      subtitle: 'Como vamos colocar seu negócio em loop de crescimento',
      highlight: 'PROPOSTA COMERCIAL',
      pausePrompt: `REUNIÃO DE DIAGNÓSTICO · ${todayStr}`,
      bgVideo: '/videos/rocket.mp4',
      content: []
    },
    {
      id: 'prop-agenda',
      type: 'proposal-agenda',
      title: 'O que vamos ver hoje',
      subtitle: '~25-28 minutos · fique à vontade para interromper e perguntar',
      content: [
        'PASSO 01|O que entendemos|Sobre o seu momento e desafio atual',
        'PASSO 02|O que analisamos e qual o seu objetivo|O resultado de negócio que importa',
        'PASSO 03|Nossa proposta|Como vamos estruturar o trabalho',
        'PASSO 04|Investimento e passos|Condições e como começamos'
      ]
    },
    {
      id: 'prop-understanding',
      type: 'proposal-understanding',
      title: `O que entendemos sobre ${companyName}`,
      subtitle: 'Com base no que você nos contou no formulário de agendamento',
      bgVideo: '/videos/Target_hit.mp4',
      content: [
        `SEGMENTO:${segment}`,
        `PROBLEMA:${painPoint}`,
        `SITUAÇÃO:${marketingSituation}`
      ]
    },
    {
      id: 'prop-findings',
      type: 'proposal-findings',
      title: 'O que vimos e qual o seu objetivo',
      subtitle: 'Com base no que analisamos e o que nos contou',
      bgVideo: '/videos/Growth_chart.mp4',
      content: [
        `ACHADO_1:${auditFinding1}`,
        `ACHADO_2:${auditFinding2}`,
        `OBJETIVO:${businessGoal}`
      ]
    },
    {
      id: 'prop-pillars',
      type: 'proposal-pillars',
      title: `Nossa proposta para ${companyName}`,
      subtitle: 'Conectada diretamente ao que você nos contou',
      bgVideo: '/videos/montain.mp4',
      content: [
        `FRENTE_1:${front1}`,
        `FRENTE_2:${front2}`,
        `FRENTE_3:${front3}`
      ]
    },
    {
      id: 'prop-investment',
      type: 'proposal-investment',
      title: 'Investimento',
      subtitle: 'Sem fidelidade após o setup — se não entregarmos o combinado no prazo, você sai sem multa.',
      content: [
        `PLAN_NAME:${prospect?.planName || 'Essencial'}`,
        `PLAN_DESC:${prospect?.planDesc || 'Fase de setup: construção da esteira, ainda sem o ciclo completo rodando.'}`,
        `SETUP_PRICE:${prospect?.setupPrice || 'R$ 2.000'}`,
        `OPERATION_PRICE:${prospect?.operationPrice || 'R$ 3.000'}`
      ]
    },
    {
      id: 'prop-how-it-works',
      type: 'proposal-how-it-works',
      title: 'Como funciona na prática',
      subtitle: 'O que está incluso',
      content: [
        `CAMPAIGNS:${prospect?.activeCampaignsCount || 'Até 4 campanhas ativas otimizadas por mês'}`,
        `CREATIVES:${prospect?.creativesCount || '8 a 12 peças publicitárias e criativos por mês'}`,
        `MEETINGS:${prospect?.meetingFrequency || 'Reuniões quinzenais de alinhamento e estratégia'}`,
        `REPORTS:${prospect?.reportFormat || 'Relatórios de performance quinzenais com dashboards ao vivo'}`,
        `CHANNELS:${prospect?.includedChannels || 'Canais inclusos: Meta Ads (Instagram & Facebook) + Google Ads'}`,
        `LANDING_PAGE:${prospect?.landingPageIncluded || 'Criação e otimização contínua de páginas de conversão'}`
      ]
    },
    {
      id: 'prop-next-steps',
      type: 'proposal-next-steps',
      title: 'Próximos passos',
      subtitle: 'Abrimos 1 onboarding novo por vez — é assim que garantimos atenção total a cada cliente nos primeiros 60 dias.',
      highlight: 'Faz sentido pra você começarmos ainda esse mês?',
      pausePrompt: `Se topar, o próximo passo é: assinatura do contrato → kickoff em até ${kickoffDays} dias úteis → primeiras entregas em até ${deliveriesDays} dias úteis.`,
      bgVideo: '/videos/Astronaut.mp4',
      content: [
        `KICKOFF_DAYS:${kickoffDays}`,
        `DELIVERIES_DAYS:${deliveriesDays}`
      ]
    }
  ];
};

// Função auxiliar para obter os slides dinamicamente com base no nicho do lead e no caminho selecionado
export const getPitchFlowBySegment = (_segment: string, _pathId: string, prospect?: ProspectData): Slide[] => {
  return getCommercialProposalSlides(prospect);
};

// Estrutura de caminhos de apresentação exibidos no painel do gestor
export const PATHS: Path[] = [
  {
    id: 'performance-scale',
    title: 'Proposta Comercial\n& Performance',
    description: 'Apresentação comercial e diagnóstico personalizado com engenharia de tráfego focada em aquisição direta, diagnóstico e escala.',
    icon: React.createElement(TrendingUp),
    color: '#FACC15',
    slides: []
  }
];

