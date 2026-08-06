import React from 'react';
import { Path, Slide, ProspectData } from './types';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnalyticsUpIcon, PaintBoardIcon } from '@hugeicons/core-free-icons';

const TrendingUp = (props: any) =>
  React.createElement(HugeiconsIcon, {
    icon: AnalyticsUpIcon,
    size: props.size || 20,
    className: props.className || '',
    color: props.color || 'currentColor',
    strokeWidth: props.strokeWidth || 1.5,
  });

const Palette = (props: any) =>
  React.createElement(HugeiconsIcon, {
    icon: PaintBoardIcon,
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

  // Os 8 slides originais intactos
  const originalSlides: Slide[] = [
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

  // Slides adicionais de Produção de Criativos / Creative Performance encaixados logo em seguida
  const creativeExtensionSlides: Slide[] = [
    {
      id: 'cp-who-we-are',
      type: 'cp-who-we-are',
      title: prospect?.cpWhoWeAreTitle || 'Módulo Adicional: Creative Performance',
      subtitle: prospect?.cpWhoWeAreSubtitle || 'Transformamos assuntos complexos em ativos estratégicos de alto impacto visual.',
      content: [
        prospect?.cpWhoWeArePoint1 || 'Ativos visuais focados em gerar autoridade para decisores (CEOs, CFOs, Diretores).',
        prospect?.cpWhoWeArePoint2 || 'Infográficos, decks comerciais, landing pages e vídeos estratégicos.',
        prospect?.cpWhoWeArePoint3 || 'Não vendemos apenas posts. Criamos patrimônio de comunicação para o seu negócio.',
        prospect?.cpWhoWeArePoint4 || 'Uma estrutura contínua para acelerar a conversão da sua equipe de vendas.'
      ],
      highlight: prospect?.cpWhoWeAreHighlight || 'Comunicação estratégica de alto ticket.'
    },
    {
      id: 'cp-opportunities',
      type: 'cp-opportunities',
      title: prospect?.cpOpportunitiesTitle || 'Oportunidades de Ativos de Comunicação',
      subtitle: prospect?.cpOpportunitiesSubtitle || 'Mapeamento de materiais de alto valor para alavancar a presença da sua marca.',
      content: [
        'MÍDIA PAGA|Criativos para Meta Ads · Google Ads · LinkedIn Ads · Remarketing',
        'CONVERSÃO|Landing pages · Estudos de caso · PDFs comerciais · Criativos para funil',
        'AUTORIDADE|Whitepapers · Ebooks · Materiais ricos · Infográficos estratégicos',
        'COMERCIAL|Apresentações de propostas · Materiais para parceiros · Prospecção · Treinamentos',
        'INSTITUCIONAL|Apresentações para investidores · Materiais para eventos · Identidade visual',
        'VÍDEO|Vídeos explicativos · Animações · Motion graphics · Vídeos para WhatsApp'
      ]
    },
    {
      id: 'cp-credits',
      type: 'cp-credits',
      title: prospect?.cpCreditsTitle || 'Modelo de Produção por Créditos',
      subtitle: prospect?.cpCreditsSubtitle || 'Flexibilidade para demandar o ativo que seu comercial mais precisa no mês.',
      content: [
        'Criativo estático (Meta / Google / LinkedIn)|1',
        'Banner estático ou Anúncio simples|1',
        'Motion graphic / Animação curta|2',
        'Carrossel (até 10 slides)|3',
        'Vídeo curto ou para WhatsApp (até 30s)|2',
        'Estudo de caso / PDF comercial|3',
        'Material para prospecção ou treinamento|3',
        'Landing page de alta conversão|8',
        'Infográfico estratégico|6',
        'Deck comercial de proposta|6',
        'Whitepaper / Ebook / Material rico|6',
        'Apresentação institucional ou investidores|6',
        'Vídeo explicativo animado|6',
        'Identidade visual de novo produto|8'
      ]
    },
    {
      id: 'cp-plans',
      type: 'cp-plans',
      title: 'Planos de Produção Recorrente de Criativos',
      subtitle: 'Escolha a franquia mensal de créditos ideal para acelerar seu crescimento.',
      content: [
        `${prospect?.cpStarterName || 'Starter'}|${prospect?.cpStarterCredits || '20 créditos'}|${prospect?.cpStarterPrice || 'R$ 1.000'}|Ideal para demandas pontuais e validação.`,
        `${prospect?.cpPerformanceName || 'Performance'}|${prospect?.cpPerformanceCredits || '35 créditos'}|${prospect?.cpPerformancePrice || 'R$ 1.650'}|Volume recomendado para manter campanhas e comercial ativos.|RECOMENDADO`,
        `${prospect?.cpEnterpriseName || 'Enterprise'}|${prospect?.cpEnterpriseCredits || '50 créditos'}|${prospect?.cpEnterprisePrice || 'R$ 2.250'}|Para alta demanda de novos ativos e múltiplas frentes.`
      ]
    },
    {
      id: 'cp-differentials',
      type: 'cp-differentials',
      title: prospect?.cpDifferentialsTitle || 'Ativos Duráveis: Patrimônio de Comunicação',
      subtitle: prospect?.cpDifferentialsSubtitle || 'Um bom infográfico ou deck comercial serve por anos em reuniões, site e prospecção.',
      content: [
        'SITE|Infográficos e páginas integrados diretamente ao seu ecossistema.',
        'COMERCIAL|Materiais que equipam seus vendedores para fechar contratos de ticket alto.',
        'CAMPANHAS|Anúncios com narrativa técnica simplificada que performam por meses.',
        'EVENTOS|Apresentações de alto padrão para reuniões estratégicas e investidores.',
        'LINKEDIN|Conteúdo executivo que atrai parceiros e decisores.',
        'TREINAMENTOS|Materiais visuais para capacitação interna da equipe.'
      ],
      highlight: prospect?.cpDifferentialHighlight || 'Cada peça criada se torna patrimônio reutilizável da empresa.'
    }
  ];

  return [...originalSlides, ...creativeExtensionSlides];
};

// =============================================
// CREATIVE PERFORMANCE INTEGRAL — 15 slides
// =============================================
export const getCreativePerformanceSlides = (prospect?: ProspectData): Slide[] => {
  const companyName = prospect?.name || 'Sua Empresa';
  const todayStr = prospect?.presentationDate || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return [
    {
      id: 'cp-cover',
      type: 'cp-cover',
      title: companyName,
      subtitle: prospect?.cpCoverSubtitle || 'Proposta de Creative Performance',
      highlight: prospect?.cpCoverTag || 'CREATIVE PERFORMANCE',
      pausePrompt: prospect?.cpCoverFooter || `APRESENTAÇÃO ESTRATÉGICA · ${todayStr}`,
      bgVideo: '/videos/rocket.mp4',
      content: []
    },
    {
      id: 'cp-who-we-are',
      type: 'cp-who-we-are',
      title: prospect?.cpWhoWeAreTitle || 'Quem somos',
      subtitle: prospect?.cpWhoWeAreSubtitle || 'Não somos uma agência de social media. Somos uma consultoria de comunicação estratégica.',
      content: [
        prospect?.cpWhoWeArePoint1 || 'Transformamos assuntos extremamente complexos em comunicação visual clara, moderna e de alto impacto.',
        prospect?.cpWhoWeArePoint2 || 'Desenvolvemos ativos estratégicos que aumentam autoridade e geram confiança.',
        prospect?.cpWhoWeArePoint3 || 'Nosso trabalho melhora campanhas, facilita o trabalho comercial e aumenta conversão.',
        prospect?.cpWhoWeArePoint4 || 'Atuamos como parceiro de longo prazo, não como fornecedor de artes.'
      ],
      highlight: prospect?.cpWhoWeAreHighlight || 'Comunicação que acelera vendas.'
    },
    {
      id: 'cp-understanding',
      type: 'cp-understanding',
      title: prospect?.cpUnderstandingTitle || `O que entendemos sobre ${companyName}`,
      subtitle: prospect?.cpUnderstandingSubtitle || 'Estudamos a fundo o seu negócio antes de propor qualquer solução.',
      bgVideo: '/videos/Target_hit.mp4',
      content: [
        prospect?.cpUnderstandingStat1Label || 'EMPRESAS ENDIVIDADAS',
        prospect?.cpUnderstandingStat1Value || '5,4 milhões de empresas com dívidas federais',
        prospect?.cpUnderstandingStat2Label || 'VOLUME DE DÍVIDAS',
        prospect?.cpUnderstandingStat2Value || 'Mais de R$ 4,5 trilhões em dívidas com a União',
        prospect?.cpUnderstandingQuote || 'A Serasa trabalha para o credor. A Blue trabalha para o devedor.'
      ]
    },
    {
      id: 'cp-challenge',
      type: 'cp-challenge',
      title: prospect?.cpChallengeTitle || 'O desafio da comunicação',
      subtitle: prospect?.cpChallengeSubtitle || 'O espaço entre conhecimento técnico e percepção de valor do cliente.',
      bgVideo: '/videos/Growth_chart.mp4',
      content: [
        prospect?.cpChallengePoint1 || 'A maioria dos empresários não sabe o que é CAPAG.',
        prospect?.cpChallengePoint2 || 'Não entendem como ela afeta diretamente sua dívida.',
        prospect?.cpChallengePoint3 || 'Não compreendem por que o cálculo do governo pode estar errado.',
        prospect?.cpChallengePoint4 || 'Não conhecem o método exclusivo da Blue.'
      ],
      highlight: prospect?.cpChallengeHighlight || 'A Blue domina o técnico. Falta traduzir isso em comunicação que o decisor entenda em segundos.'
    },
    {
      id: 'cp-solution',
      type: 'cp-solution',
      title: prospect?.cpSolutionTitle || 'Creative Performance',
      subtitle: prospect?.cpSolutionSubtitle || 'Uma estrutura contínua de produção de ativos de comunicação para acelerar as vendas.',
      bgVideo: '/videos/montain.mp4',
      content: [
        prospect?.cpSolutionDesc || 'Não vendemos posts. Não vendemos artes. Não vendemos design. Criamos patrimônio de comunicação estratégica.',
        prospect?.cpSolutionBenefit1 || 'Aumentar autoridade perante empresários e CFOs',
        prospect?.cpSolutionBenefit2 || 'Gerar confiança em mercados de alto ticket',
        prospect?.cpSolutionBenefit3 || 'Melhorar performance de campanhas pagas',
        prospect?.cpSolutionBenefit4 || 'Facilitar o trabalho comercial e de parceiros',
        prospect?.cpSolutionBenefit5 || 'Aumentar conversão em todas as etapas do funil'
      ]
    },
    {
      id: 'cp-how-it-works',
      type: 'cp-how-it-works',
      title: 'Como funciona o Creative Performance',
      subtitle: 'Um processo ágil e consultivo que garante qualidade e velocidade.',
      content: [
        prospect?.cpHowStep1Title || 'Briefing Estratégico',
        prospect?.cpHowStep1Desc || 'Entendemos o objetivo de cada peça e seu contexto de uso antes de iniciar.',
        prospect?.cpHowStep2Title || 'Criação & Design',
        prospect?.cpHowStep2Desc || 'Nossa equipe desenvolve o ativo com foco em clareza, impacto e conversão.',
        prospect?.cpHowStep3Title || 'Revisão Colaborativa',
        prospect?.cpHowStep3Desc || 'Você revisa, dá feedback e nós ajustamos até atingir o padrão ideal.',
        prospect?.cpHowStep4Title || 'Entrega & Aplicação',
        prospect?.cpHowStep4Desc || 'Entrega em todos os formatos necessários, pronto para uso imediato.'
      ]
    },
    {
      id: 'cp-examples',
      type: 'cp-examples',
      title: 'Exemplos de aplicações',
      subtitle: 'Ativos que podemos criar para fortalecer todas as frentes da Blue.',
      content: [
        'Criativos para Meta Ads, Google Ads e LinkedIn Ads',
        'Landing pages de alta conversão',
        'Decks comerciais e apresentações para investidores',
        'Infográficos estratégicos e whitepapers',
        'Vídeos explicativos e motion graphics',
        'Materiais para equipe comercial e prospecção'
      ]
    },
    {
      id: 'cp-opportunities',
      type: 'cp-opportunities',
      title: prospect?.cpOpportunitiesTitle || 'Oportunidades identificadas',
      subtitle: prospect?.cpOpportunitiesSubtitle || 'Mapeamos as frentes onde a comunicação visual pode gerar maior impacto para a Blue.',
      content: [
        'MÍDIA PAGA|Criativos para Meta Ads · Google Ads · LinkedIn Ads · Remarketing',
        'CONVERSÃO|Landing pages · Estudos de caso · PDFs comerciais · Criativos para funil',
        'AUTORIDADE|Whitepapers · Ebooks · Materiais ricos · Infográficos estratégicos',
        'COMERCIAL|Apresentações de propostas · Materiais para parceiros · Prospecção · Treinamentos',
        'INSTITUCIONAL|Apresentações para investidores · Materiais para eventos · Identidade visual',
        'VÍDEO|Vídeos explicativos · Animações · Motion graphics · Vídeos para WhatsApp'
      ]
    },
    {
      id: 'cp-workflow',
      type: 'cp-workflow',
      title: prospect?.cpWorkflowTitle || 'Fluxo de trabalho',
      subtitle: prospect?.cpWorkflowSubtitle || 'Simples, organizado e sem burocracia.',
      content: [
        'SOLICITAÇÃO|Você abre um pedido via formulário ou canal dedicado com o briefing.',
        'PRODUÇÃO|Nossa equipe inicia a criação com prazo definido (2-5 dias úteis conforme complexidade).',
        'REVISÃO|Você revisa a entrega e solicita ajustes (até 2 rodadas inclusas).',
        'ENTREGA FINAL|Arquivo entregue em todos os formatos, pronto para uso imediato.'
      ]
    },
    {
      id: 'cp-credits',
      type: 'cp-credits',
      title: prospect?.cpCreditsTitle || 'Modelo por créditos',
      subtitle: prospect?.cpCreditsSubtitle || 'Flexibilidade total. Você decide onde investir seus créditos a cada mês.',
      content: [
        'Criativo estático (Meta / Google / LinkedIn)|1',
        'Banner estático ou Anúncio simples|1',
        'Motion graphic / Animação curta|2',
        'Carrossel (até 10 slides)|3',
        'Vídeo curto ou para WhatsApp (até 30s)|2',
        'Estudo de caso / PDF comercial|3',
        'Material para prospecção ou treinamento|3',
        'Landing page de alta conversão|8',
        'Infográfico estratégico|6',
        'Deck comercial de proposta|6',
        'Whitepaper / Ebook / Material rico|6',
        'Apresentação institucional ou investidores|6',
        'Vídeo explicativo animado|6',
        'Identidade visual de novo produto|8'
      ]
    },
    {
      id: 'cp-plans',
      type: 'cp-plans',
      title: 'Planos',
      subtitle: 'Escolha o volume que faz sentido para o momento da Blue.',
      content: [
        `${prospect?.cpStarterName || 'Starter'}|${prospect?.cpStarterCredits || '20 créditos'}|${prospect?.cpStarterPrice || 'R$ 1.000'}|Ideal para começar com demandas pontuais e testar o modelo.`,
        `${prospect?.cpPerformanceName || 'Performance'}|${prospect?.cpPerformanceCredits || '35 créditos'}|${prospect?.cpPerformancePrice || 'R$ 1.650'}|Volume ideal para manter campanhas ativas e materiais comerciais atualizados.|RECOMENDADO`,
        `${prospect?.cpEnterpriseName || 'Enterprise'}|${prospect?.cpEnterpriseCredits || '50 créditos'}|${prospect?.cpEnterprisePrice || 'R$ 2.250'}|Para operações que precisam de escala e múltiplas frentes simultâneas.`
      ]
    },
    {
      id: 'cp-differentials',
      type: 'cp-differentials',
      title: prospect?.cpDifferentialsTitle || 'Patrimônio de comunicação',
      subtitle: prospect?.cpDifferentialsSubtitle || 'Um único criativo pode ser utilizado por anos. Não produzimos posts. Criamos ativos permanentes.',
      content: [
        'SITE|Um infográfico de qualidade pode ser usado no site por anos.',
        'COMERCIAL|O mesmo material serve para reuniões, propostas e follow-ups.',
        'CAMPANHAS|Criativos de alta qualidade performam por meses em mídia paga.',
        'EVENTOS|Apresentações institucionais servem para conferências, feiras e pitches.',
        'LINKEDIN|Materiais ricos geram autoridade orgânica e atraem parceiros.',
        'TREINAMENTOS|Conteúdo visual interno melhora onboarding e capacitação da equipe.'
      ],
      highlight: prospect?.cpDifferentialHighlight || 'Cada peça é um investimento. Não é um gasto recorrente sem retorno.'
    },
    {
      id: 'cp-next-steps',
      type: 'cp-next-steps',
      title: prospect?.cpNextStepsTitle || 'Próximos passos',
      subtitle: prospect?.cpNextStepsSubtitle || 'Como começamos a trabalhar juntos.',
      bgVideo: '/videos/Astronaut.mp4',
      content: [
        'ALINHAMENTO|Definimos as prioridades do primeiro mês e o plano ideal.',
        'ONBOARDING|Reunião de kickoff para entender a fundo os materiais existentes, tom de voz e identidade.',
        'PRODUÇÃO|Primeiras entregas em até 7 dias úteis após o onboarding.',
        'ACOMPANHAMENTO|Revisões mensais de prioridades e ajuste do plano conforme a demanda.'
      ]
    },
    {
      id: 'cp-investment',
      type: 'cp-investment',
      title: prospect?.cpInvestmentTitle || 'Investimento',
      subtitle: prospect?.cpInvestmentSubtitle || 'Sem fidelidade. Sem surpresas. Cancele quando quiser.',
      content: [
        `STARTER|${prospect?.cpStarterCredits || '20 créditos'}|${prospect?.cpStarterPrice || 'R$ 1.000/mês'}`,
        `PERFORMANCE|${prospect?.cpPerformanceCredits || '35 créditos'}|${prospect?.cpPerformancePrice || 'R$ 1.650/mês'}|RECOMENDADO`,
        `ENTERPRISE|${prospect?.cpEnterpriseCredits || '50 créditos'}|${prospect?.cpEnterprisePrice || 'R$ 2.250/mês'}`
      ],
      highlight: prospect?.cpInvestmentFooter || 'Créditos não utilizados podem ser acumulados para o mês seguinte.'
    },
    {
      id: 'cp-closing',
      type: 'cp-closing',
      title: prospect?.cpClosingTitle || companyName,
      subtitle: prospect?.cpClosingSubtitle || 'Estamos prontos para transformar a comunicação da Blue em vantagem competitiva.',
      highlight: prospect?.cpClosingCTA || 'Vamos começar?',
      bgVideo: '/videos/Astronaut.mp4',
      content: []
    }
  ];
};

// Função auxiliar para obter os slides dinamicamente com base no nicho do lead e no caminho selecionado
export const getPitchFlowBySegment = (_segment: string, pathId: string, prospect?: ProspectData): Slide[] => {
  if (pathId === 'creative-performance') {
    return getCreativePerformanceSlides(prospect);
  }
  return getCommercialProposalSlides(prospect);
};

// Estrutura de caminhos de apresentação exibidos no painel do gestor
export const PATHS: Path[] = [
  {
    id: 'performance-scale',
    title: 'Proposta Comercial\n& Performance',
    description: 'Apresentação comercial completa incluindo diagnóstico de tráfego e módulo de produção contínua de criativos por créditos.',
    icon: React.createElement(TrendingUp),
    color: '#FACC15',
    slides: []
  }
];

