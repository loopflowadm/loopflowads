import { Slide } from './types';

// ==========================================
// 1. DELIVERY & FOOD SERVICE FLOWS
// ==========================================

export const DELIVERY_PERFORMANCE_FLOW: Slide[] = [
  {
    id: 'market-context',
    title: 'O mercado mudou e quem depende de apps está ficando sem margem.',
    subtitle: 'Veja por que a maioria dos restaurantes trava o crescimento aqui.',
    type: 'text',
    content: [
      'Alta concorrência local e regional saturando o mercado.',
      'Preço virou commodity. Marca virou diferencial.',
      'Decisão de compra emocional e extremamente rápida.',
      'Taxas de apps corroem até 30% do lucro.'
    ],
    highlight: 'Quem domina a aquisição direta de clientes, domina a própria margem de lucro.',
    pausePrompt: 'Vocês já sentiram esse impacto das taxas no faturamento?'
  },
  {
    id: 'central-problem',
    title: 'Por que o tráfego não está resolvendo seu crescimento hoje?',
    subtitle: 'O que realmente limita o seu crescimento hoje?',
    type: 'comparison',
    content: [
      'Ausência de Estratégia: Anúncios sem metas claras,Muito clique e pouco pedido,Você investe… mas não sabe o lucro real.',
      'Canais próprios → mais margem,Escala previsível → faturamento estável,Independência → menos taxas mais lucro.'
    ],
    highlight: 'Resultado: Transformamos faturamento instável em crescimento sustentável.',
    pausePrompt: 'Isso faz sentido com o que vocês vivem hoje na operação?'
  },
  {
    id: 'transformation-opportunity',
    title: 'Como restaurantes organizados crescem mesmo em mercados saturados',
    subtitle: 'Tráfego pago deixa de ser mídia e passa a ser seu canal de vendas estruturado.',
    type: 'text',
    content: [
      'Pedidos indo direto para você (WhatsApp/Site), sem comissão.',
      'Mais pedidos gastando menos por venda.',
      'Clientes recorrentes comprando toda semana.',
      'Aumento de ticket médio com remarketing estratégico.'
    ],
    highlight: 'Tráfego pago não resolve operação ruim, mas potencializa operações organizadas.',
    pausePrompt: 'Qual desses resultados faria mais diferença para vocês agora?'
  },
  {
    id: 'market-benchmarks',
    title: 'Benchmarks do Segmento Food',
    subtitle: 'Métricas reais dos projetos que já gerenciamos.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Ticket Médio', value: 'R$ 65,00', desc: 'Média de pedidos diretos' },
      { label: 'ROAS Médio', value: '6.5x', desc: 'Retorno sobre investimento' },
      { label: '% Canal Próprio', value: '42%', desc: 'Vendas fora de apps' },
      { label: 'Custo/Pedido', value: 'R$ 1,80', desc: 'Eficiência de aquisição' }
    ],
    pausePrompt: 'Como esses números comparam com o que vocês têm hoje?'
  },
  {
    id: 'methodology-phases',
    title: 'O sistema que aplicamos para gerar crescimento previsível',
    subtitle: 'Uma estrutura completa de aquisição em 4 pilares.',
    type: 'text',
    content: [
      'Fase 1: Validação de dados - Testes de públicos e criativos.',
      'Fase 2: Aquisição previsível - Otimização refinada para novos pedidos.',
      'Fase 3: Recorrência automática - Reativação e aumento de frequência.',
      'Fase 4: Escala lucrativa - Crescimento sustentável com rentabilidade.'
    ],
    highlight: 'Não rodamos anúncios isolados. Rodamos engenharia de vendas.',
    pausePrompt: 'Qual dessas fases parece mais crítica para o momento de vocês?'
  },
  {
    id: 'action-plan',
    title: 'Plano de Ação: 30 | 60 | 90 Dias',
    subtitle: 'A jornada estruturada para a sua escala previsível.',
    type: 'roadmap',
    content: [
      'DIAS 1-30: Estruturação - Mapeamos gargalos e validamos o que realmente vende.',
      'DIAS 31-60: Otimização - Estabilizamos aquisição e reduzimos custo por venda.',
      'DIAS 61-90: Escala - Aumentamos pedidos diretos e margem de lucro em até 40–60%.'
    ],
    pausePrompt: 'Vocês se veem conseguindo implementar isso em 90 dias com apoio?'
  },
  {
    id: 'status-quo-cost',
    title: 'Manter o cenário atual também tem um preço',
    subtitle: 'Sem estratégia de aquisição própria, o crescimento trava e a margem encolhe.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Dependência de Apps', value: '20-30%', desc: 'Taxas pagas por cada venda' },
      { label: 'CAC Descontrolado', value: 'Invisível', desc: 'Investir sem saber o lucro' },
      { label: 'Previsibilidade', value: 'Zero', desc: 'Altos e baixos que travam caixa' },
      { label: 'Estagnação', value: 'Alerta', desc: 'Concorrentes dominam e você mantém' }
    ],
    highlight: 'O maior risco hoje não é investir. É continuar igual.',
    pausePrompt: 'Quanto vocês estimam que essas ineficiências custam por mês?'
  },
  {
    id: 'expected-outcomes',
    title: 'O cenário da prospect 90 dias depois de começarmos',
    subtitle: 'Mais margem, mais controle e vendas previsíveis sem depender de apps.',
    type: 'conclusion',
    content: [
      'Faturamento estável mês após mês, sem picos ou quedas inesperadas.',
      'Você sabe exatamente quanto custa cada cliente e quanto lucro ele gera.',
      'Mais pedidos no seu canal próprio, menos dinheiro indo para aplicativos terceiros como iFood/Rappi.',
      'Base de clientes recorrentes que compram sem você pagar anúncio toda vez.'
    ],
    highlight: 'Transforme seu marketing em uma máquina de receita previsível agora.',
    pausePrompt: 'Desses 4 resultados, qual seria o ideal para o momento de vocês?'
  }
];

export const DELIVERY_OMNICHANNEL_FLOW: Slide[] = [
  {
    id: 'omni-intro',
    title: 'Clientes hoje estão em múltiplos canais, mas compram onde é mais fácil',
    subtitle: 'Quem unifica a experiência, domina a decisão de compra.',
    type: 'text',
    content: [
      'Instagram mostra o prato, mas WhatsApp ou site fecha a venda.',
      'Google traz intenção de compra rápida (fome local), mas falta tráfego rápido.',
      'Apps de delivery limitam sua margem e escondem os dados do seu cliente.',
      'O cliente quer praticidade: clicar no link e fazer o pedido em segundos.'
    ],
    highlight: 'Crescimento omnichannel não é estar em tudo. É conectar tudo para converter mais.',
    pausePrompt: 'Vocês percebem clientes chamando em um canal e comprando em outro?'
  },
  {
    id: 'omni-problem',
    title: 'O que impede restaurantes de crescer em múltiplos canais',
    subtitle: 'Esforço disperso gera resultado fragmentado.',
    type: 'comparison',
    content: [
      'Canais Isolados: Cada canal opera sem inteligência central,Atendimento manual lento e gargalos,Perda de clientes que abandonam carrinho.',
      'Canais Integrados: Todos os canais levam ao seu funil próprio,Automação de atendimento e remarketing ativo,Rastreamento de conversão em tempo real.'
    ],
    highlight: 'O segredo não é ter mais canais. É orquestrar todos eles para vender de forma recorrente.',
    pausePrompt: 'Vocês conseguem rastrear hoje a origem dos seus pedidos diretos?'
  },
  {
    id: 'omni-benchmarks',
    title: 'Resultados de Estratégia Omnichannel',
    subtitle: 'Impacto real de integrar múltiplos canais.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Conversão WhatsApp', value: '23%', desc: 'De visitantes para pedidos' },
      { label: 'Retenção (60d)', value: '34%', desc: 'Clientes que voltam' },
      { label: 'Ticket Médio', value: '+28%', desc: 'Vs. canais isolados' },
      { label: 'CAC Reduzido', value: '-41%', desc: 'Com remarketing ativo' }
    ],
    pausePrompt: 'Qual dessas métricas teria maior impacto no caixa de vocês?'
  }
];

export const DELIVERY_BRAND_AUTHORITY_FLOW: Slide[] = [
  {
    id: 'brand-intro',
    title: 'No mercado saturado, quem tem marca forte cobra mais e vende mais',
    subtitle: 'Autoridade não é luxo. É vantagem competitiva comprovada.',
    type: 'text',
    content: [
      'Pessoas pagam 30-50% a mais por marcas em que confiam.',
      'Decisão de compra em alimentação é 70% visual e emocional.',
      'Concorrentes competem por preço. Marcas fortes competem por desejo.',
      'Autoridade gera vendas orgânicas, reduzindo custos de tráfego.'
    ],
    highlight: 'Marca forte não precisa de desconto constante para converter. Ela vende pelo valor percebido.',
    pausePrompt: 'Vocês sentem que competem por preço ou que o cliente compra pelo valor?'
  },
  {
    id: 'brand-problem',
    title: 'Por que restaurantes bons ficam invisíveis no mercado',
    subtitle: 'Qualidade sem posicionamento gera commodity.',
    type: 'comparison',
    content: [
      'Marca Commodity: Produto de qualidade sem diferenciação visual,Dependência de cupom de desconto para vender,Fidelidade do cliente é quase nula.',
      'Marca Premium: Posicionamento claro que gera desejo imediato,Marca reconhecida e defendida no mercado local,Premium pricing sustentável sem cupons.'
    ],
    highlight: 'Autoridade de marca transforma "mais um restaurante" na referência absoluta do nicho.',
    pausePrompt: 'Os clientes de vocês indicam o produto de forma espontânea?'
  },
  {
    id: 'brand-benchmarks',
    title: 'Impacto de Autoridade de Marca',
    subtitle: 'Números reais de marcas que investiram em posicionamento.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Ticket Médio', value: '+45%', desc: 'Vs. concorrentes genéricos' },
      { label: 'Taxa de Conversão', value: '2.8x', desc: 'Maior que média do setor' },
      { label: 'Pedidos Orgânicos', value: '38%', desc: 'Vendas sem investimento em mídia' },
      { label: 'NPS da Marca', value: '72', desc: 'Recomendação espontânea' }
    ],
    pausePrompt: 'Como seria o negócio se 38% das suas vendas fossem 100% orgânicas?'
  }
];


// ==========================================
// 2. E-COMMERCE & RETAIL FLOWS
// ==========================================

export const ECOMMERCE_PERFORMANCE_FLOW: Slide[] = [
  {
    id: 'market-context',
    title: 'O e-commerce mudou e quem depende de tráfego frio sem funil fica sem margem.',
    subtitle: 'Aumento de custos e concorrência exigem processos cirúrgicos de anúncios.',
    type: 'text',
    content: [
      'Custo por Mil Visualizações (CPM) subindo ano após ano.',
      'Alta concorrência no feed disputando a atenção do mesmo cliente.',
      'Ausência de Pixel/API faz o e-commerce queimar verba de anúncios.',
      'Clientes entram no site, adicionam ao carrinho e não finalizam.'
    ],
    highlight: 'Domine a otimização de dados no checkout para garantir ROAS sustentável.',
    pausePrompt: 'Como está o custo de aquisição de clientes (CAC) de vocês ultimamente?'
  },
  {
    id: 'central-problem',
    title: 'O que impede o seu E-commerce de tracionar e escalar?',
    subtitle: 'Muito tráfego para a página inicial, pouca conversão real de compra.',
    type: 'comparison',
    content: [
      'Operação Tradicional: Tráfego apenas para público frio genérico,Falta de remarketing dinâmico de catálogo,API de conversão desconectada com perda de dados.',
      'Escala Previsível: Públicos baseados em LTV e comportamento,Campanhas inteligentes de recuperação de carrinho,Mensuração 100% precisa com rastreamento ativo.'
    ],
    highlight: 'Resultado: Deixamos de comprar cliques e passamos a comprar conversões qualificadas.',
    pausePrompt: 'Você sabe qual o seu faturamento que vem do remarketing hoje?'
  },
  {
    id: 'market-benchmarks',
    title: 'Benchmarks do Segmento E-commerce',
    subtitle: 'Métricas de escala realistas para lojas virtuais estruturadas.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Ticket Médio', value: 'R$ 180,00', desc: 'Valor médio por compra' },
      { label: 'ROAS Médio', value: '4.5x', desc: 'Retorno sobre investimento' },
      { label: 'Taxa Conversão', value: '1.8%', desc: 'Visitantes que finalizam' },
      { label: 'CPA Médio', value: 'R$ 22,00', desc: 'Custo por aquisição de compra' }
    ],
    pausePrompt: 'Essas métricas estão próximas das que vocês operam hoje?'
  },
  {
    id: 'action-plan',
    title: 'Plano de Ação E-commerce: 30 | 60 | 90 Dias',
    subtitle: 'A jornada estratégica para a sua escala de faturamento.',
    type: 'roadmap',
    content: [
      'DIAS 1-30: Infraestrutura - Integração cirúrgica da API de Conversão, catálogo dinâmico e tags.',
      'DIAS 31-60: Atração & Conversão - Testes estruturados de criativos em escala e públicos Lookalike.',
      'DIAS 61-90: LTV & Fidelização - Implementação de remarketing avançado e recuperação automática.'
    ],
    pausePrompt: 'Vocês têm facilidade em produzir novos criativos para os anúncios hoje?'
  }
];

export const ECOMMERCE_OMNICHANNEL_FLOW: Slide[] = [
  {
    id: 'omni-intro',
    title: 'Vender no site é ótimo, mas conectar WhatsApp e redes dobra a receita.',
    subtitle: 'A jornada do e-commerce moderno une atração com relacionamento ativo.',
    type: 'text',
    content: [
      'Remarketing no WhatsApp converte até 4x mais do que por e-mail.',
      'Tráfego vindo de anúncios sociais convertendo via chat humano/bot.',
      'Falta de integração faz com que clientes nunca mais retornem à loja.',
      'A base de clientes antigos é o seu ativo mais valioso e mais barato.'
    ],
    highlight: 'O tráfego atrai, mas a experiência omnichannel é o que fideliza e escala.',
    pausePrompt: 'Vocês costumam reatar contato com clientes antigos para novas ofertas?'
  },
  {
    id: 'omni-benchmarks',
    title: 'Métricas Omnichannel no E-commerce',
    subtitle: 'Impacto de integrar automações ao e-commerce.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Conversão no Whats', value: '28%', desc: 'Recuperação de carrinhos' },
      { label: 'Recompra (90d)', value: '38%', desc: 'Clientes recorrentes' },
      { label: 'Crescimento LTV', value: '+30%', desc: 'Aumento de valor do cliente' },
      { label: 'CPA Geral', value: '-35%', desc: 'Redução com tráfego combinado' }
    ],
    pausePrompt: 'Imagine o impacto de recuperar 28% dos carrinhos que hoje são abandonados.'
  }
];

export const ECOMMERCE_BRAND_AUTHORITY_FLOW: Slide[] = [
  {
    id: 'brand-intro',
    title: 'E-commerces sem marca viram leilão de preço. Branding traz lucro.',
    subtitle: 'A diferenciação é a única barreira de entrada duradoura no e-commerce.',
    type: 'text',
    content: [
      'Quem concorre apenas no preço destrói a própria margem operacional.',
      'Anúncios de marca criam defensores que compram sem pesquisar no concorrente.',
      'Estética premium e unboxing geram prova social espontânea no Instagram.',
      'O posicionamento correto permite cobrar mais caro pelo mesmo produto.'
    ],
    highlight: 'Invista em narrativa de marca e pare de competir na planilha de custos com o mercado.',
    pausePrompt: 'O que o concorrente de vocês não consegue copiar de jeito nenhum?'
  },
  {
    id: 'brand-benchmarks',
    title: 'Benchmarks de Branding no Varejo',
    subtitle: 'O valor financeiro de uma marca consolidada.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Tráfego Direto', value: '35%', desc: 'Acessos orgânicos no site' },
      { label: 'Recompra Anual', value: '55%', desc: 'Fidelidade de marca' },
      { label: 'Margem Bruta', value: '+40%', desc: 'Vs. e-commerces sem marca' },
      { label: 'NPS da Loja', value: '78', desc: 'Pontuação de satisfação' }
    ],
    pausePrompt: 'Vocês têm uma base de clientes recorrente consolidada ou vendem sempre para novos?'
  }
];


// ==========================================
// 3. LOCAL BUSINESS & SERVICES FLOWS
// ==========================================

export const SERVICES_PERFORMANCE_FLOW: Slide[] = [
  {
    id: 'market-context',
    title: 'Quem depende apenas de indicações está com o crescimento travado.',
    subtitle: 'No mercado local de serviços, quem atrai leads qualificados domina a região.',
    type: 'text',
    content: [
      'Indicação é excelente, mas é instável e impossível de escalar.',
      'Clientes buscam serviços diariamente no Google e redes sociais.',
      'Anúncios genéricos atraem curiosos sem dinheiro, poluindo o comercial.',
      'Velocidade no atendimento do WhatsApp define quem fecha a venda.'
    ],
    highlight: 'O tráfego atrai o lead, mas o processo de vendas local é o que garante o faturamento.',
    pausePrompt: 'Como está o volume e a qualidade dos contatos comerciais hoje?'
  },
  {
    id: 'central-problem',
    title: 'Por que o seu marketing de serviços não gera agenda cheia?',
    subtitle: 'O funil que perde contatos no meio do caminho.',
    type: 'comparison',
    content: [
      'Fluxo Amador: Anúncios sem segmentação regional cirúrgica,Página lenta com formulários complexos,Atendimento comercial demorado e frio.',
      'Máquina de Leads: Tráfego segmentado por raio e poder de compra,Campanhas diretas para WhatsApp qualificado,Script comercial validado e automação.'
    ],
    highlight: 'Resultado: Geramos oportunidades prontas para comprar, economizando tempo do time.',
    pausePrompt: 'Faz sentido estruturar uma máquina previsível em vez de depender de sorte?'
  },
  {
    id: 'market-benchmarks',
    title: 'Benchmarks do Segmento Serviços/Local',
    subtitle: 'Métricas ideais obtidas em campanhas de captação locais.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Custo por Lead (CPL)', value: 'R$ 6,50', desc: 'Investimento por contato' },
      { label: 'Taxa Agendamento', value: '35%', desc: 'Conversão para reunião' },
      { label: 'Comparecimento', value: '75%', desc: 'Percentual de presença' },
      { label: 'Retorno Investimento', value: '5.2x', desc: 'Eficiência financeira' }
    ],
    pausePrompt: 'Você saberia estimar o custo por lead que vocês têm hoje?'
  },
  {
    id: 'action-plan',
    title: 'Plano de Ação Local: 30 | 60 | 90 Dias',
    subtitle: 'A jornada para dominar a sua região e estruturar a agenda comercial.',
    type: 'roadmap',
    content: [
      'DIAS 1-30: Captação - Criação de anúncios cirúrgicos no Google Maps e Meta direcionados ao WhatsApp.',
      'DIAS 31-60: Qualificação - Automação básica de triagem para filtrar leads curiosos.',
      'DIAS 61-90: Escala & CRM - Estruturação de CRM para reativação de orçamentos não fechados.'
    ],
    pausePrompt: 'Qual é o maior obstáculo do seu time comercial ao atender no WhatsApp hoje?'
  }
];

export const SERVICES_OMNICHANNEL_FLOW: Slide[] = [
  {
    id: 'omni-intro',
    title: 'Google traz quem quer comprar agora. Meta traz quem vai desejar você.',
    subtitle: 'Negócios locais de alta performance combinam captura de demanda com redes sociais.',
    type: 'text',
    content: [
      'Google Ads captura a intenção imediata (Ex: "médico perto de mim").',
      'Instagram cria autoridade visual e prova social na região.',
      'Falta de integração perde o lead que olhou o Google mas tirou dúvidas no Instagram.',
      'O WhatsApp centraliza a conversão de todos os canais locais.'
    ],
    highlight: 'Sua marca local precisa estar no topo das buscas E na mente do cliente regional.',
    pausePrompt: 'Hoje vocês recebem mais contatos pelo Google ou pelo Instagram?'
  },
  {
    id: 'omni-benchmarks',
    title: 'Métricas de Funil Local Integrado',
    subtitle: 'Métricas consolidadas de campanhas combinadas.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Conversão WhatsApp', value: '40%', desc: 'Leads qualificados agendados' },
      { label: 'CPL Reduzido', value: '-30%', desc: 'Graças a anúncios híbridos' },
      { label: 'Recomendação', value: '45%', desc: 'Indicações de novos clientes' },
      { label: 'CAC Local', value: 'R$ 25,00', desc: 'Custo por novo cliente fechado' }
    ],
    pausePrompt: 'Com R$ 25,00 por cliente conquistado, quão rápido vocês poderiam escalar?'
  }
];

export const SERVICES_BRAND_AUTHORITY_FLOW: Slide[] = [
  {
    id: 'brand-intro',
    title: 'Na prestação de serviços, autoridade é o que destrói a desconfiança.',
    subtitle: 'Ninguém compra serviços de quem parece amador. Confiança gera fechamento.',
    type: 'text',
    content: [
      'A estética do seu perfil e site define o valor que o cliente acha que você cobra.',
      'Depoimentos e fotos reais de resultados são os maiores aceleradores de vendas.',
      'Produzir conteúdo de valor cria o gatilho da reciprocidade no cliente local.',
      'Quem tem autoridade cobra 2x mais e tem fila de espera na agenda.'
    ],
    highlight: 'Pare de vender "serviço" e comece a vender "solução e autoridade".',
    pausePrompt: 'O visual e comunicação de vocês hoje condiz com o preço que querem cobrar?'
  },
  {
    id: 'brand-benchmarks',
    title: 'Indicadores de Autoridade de Serviços',
    subtitle: 'Métricas de posicionamento no mercado local.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Taxa de Fechamento', value: '45%', desc: 'Conversão de reuniões' },
      { label: 'Recompra de Planos', value: '60%', desc: 'Fidelização de contratos' },
      { label: 'Crescimento Preço', value: '+50%', desc: 'Capacidade de valorização' },
      { label: 'Pesquisa da Marca', value: '3x', desc: 'Crescimento de busca direta' }
    ],
    pausePrompt: 'Se puder cobrar 50% a mais com a mesma estrutura, o que isso faria com seu lucro?'
  }
];


// ==========================================
// 4. B2B & CORPORATE / GENERAL FLOWS
// ==========================================

export const B2B_PERFORMANCE_FLOW: Slide[] = [
  {
    id: 'market-context',
    title: 'B2B de alto valor exige geração previsível de reuniões qualificadas.',
    subtitle: 'Esqueça panfletagem digital. Foque em decisores de alto nível.',
    type: 'text',
    content: [
      'Ciclo de vendas longo requer nutrição de leads focada em dor corporativa.',
      'Cold Mail e Cold Call tradicionais estão com taxas de resposta abaixo de 1%.',
      'O tráfego qualificado traz o decisor (CEO, Diretor) até a sua marca.',
      'Seu time comercial precisa de reuniões qualificadas na agenda semanal.'
    ],
    highlight: 'Gere oportunidades reais de negócios em vez de apenas cliques sem valor corporativo.',
    pausePrompt: 'Qual é o perfil ideal de empresa (ICP) que vocês buscam fechar hoje?'
  },
  {
    id: 'central-problem',
    title: 'Por que o marketing B2B atual de vocês não atrai grandes contas?',
    subtitle: 'Muito lead desqualificado e pouca conversa produtiva com decisores.',
    type: 'comparison',
    content: [
      'Abordagem Tradicional: Anúncios rasos com público genérico demais,Tráfego para páginas amadoras sem prova social corporativa,Falta de processos comerciais integrados ao tráfego.',
      'Geração Corporativa: Segmentação industrial e profissional no Google e LinkedIn,Landing pages de alta conversão focadas na dor do decisor,Pipeline comercial integrado com automação de reuniões.'
    ],
    highlight: 'Resultado: Transformamos cliques corporativos em reuniões de negócios agendadas.',
    pausePrompt: 'Faz sentido investir para falar direto com quem assina o contrato?'
  },
  {
    id: 'market-benchmarks',
    title: 'Benchmarks do Segmento B2B',
    subtitle: 'Métricas consolidadas de campanhas corporativas gerenciadas.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Custo por Reunião', value: 'R$ 85,00', desc: 'Reunião qualificada agendada' },
      { label: 'Leads Qualif. (SQL)', value: '40%', desc: 'Conversão de leads corporativos' },
      { label: 'LTV do Contrato', value: 'R$ 8.500', desc: 'Média de ticket anual' },
      { label: 'ROI Estimado', value: '4.8x', desc: 'Retorno sobre investimento' }
    ],
    pausePrompt: 'Qual seria o impacto de preencher a agenda comercial com reuniões qualificadas a R$ 85 cada?'
  },
  {
    id: 'action-plan',
    title: 'Plano de Ação B2B: 30 | 60 | 90 Dias',
    subtitle: 'O cronograma para gerar reuniões corporativas de forma automática.',
    type: 'roadmap',
    content: [
      'DIAS 1-30: Estrutura - Criação de landing pages focadas em dor industrial, mapeamento de ICP e Google Ads.',
      'DIAS 31-60: Aquisição - Campanhas de fundo de funil focadas em agendamento de reuniões qualificadas.',
      'DIAS 61-90: Nutrição - Campanhas institucionais e distribuição de cases de sucesso para fechar contas.'
    ],
    pausePrompt: 'Quanto tempo leva hoje em média para fechar um contrato B2B na sua empresa?'
  }
];

export const B2B_OMNICHANNEL_FLOW: Slide[] = [
  {
    id: 'omni-intro',
    title: 'LinkedIn atrai o decisor. Google captura o interesse. WhatsApp fecha o contrato.',
    subtitle: 'A unificação das mídias corporativas acelera o fechamento de vendas complexas.',
    type: 'text',
    content: [
      'LinkedIn Ads permite segmentar por cargo, empresa e faturamento.',
      'Google Ads captura quem já busca ativamente pela sua solução B2B.',
      'WhatsApp Business estruturado acelera a resposta comercial de propostas.',
      'Remarketing integrado lembra o decisor do valor da sua empresa durante o ciclo.'
    ],
    highlight: 'O tráfego gera o lead corporativo, a consistência omnichannel garante a credibilidade.',
    pausePrompt: 'Vocês utilizam LinkedIn hoje na estratégia de atração da empresa?'
  },
  {
    id: 'omni-benchmarks',
    title: 'Métricas de Relacionamento B2B',
    subtitle: 'Indicadores de campanhas corporativas integradas.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Taxa de Resposta', value: '18%', desc: 'Contatos comerciais ativos' },
      { label: 'Ciclo de Venda', value: '-30%', desc: 'Redução de tempo de fechamento' },
      { label: 'Agendamentos', value: '45%', desc: 'Conversão de leads gerados' },
      { label: 'SQL para Oport.', value: '60%', desc: 'Aproveitamento do funil B2B' }
    ],
    pausePrompt: 'Reduzir em 30% o tempo para fechar um contrato melhoraria o fluxo de caixa de vocês?'
  }
];

export const B2B_BRAND_AUTHORITY_FLOW: Slide[] = [
  {
    id: 'brand-intro',
    title: 'No mercado B2B, grandes empresas não compram de marcas amadoras.',
    subtitle: 'Autoridade digital reduz o atrito comercial e valida o valor da sua proposta.',
    type: 'text',
    content: [
      'Decisores pesquisam sobre a sua marca no Google antes de assinar orçamentos.',
      'Cases de sucesso em vídeo aumentam a taxa de conversão comercial em até 80%.',
      'Identidade corporativa coesa transmite solidez financeira e institucional.',
      'O posicionamento correto atrai grandes marcas dispostas a pagar mais.'
    ],
    highlight: 'Construa autoridade para que os grandes clientes venham até você, e não o contrário.',
    pausePrompt: 'O que o seu site e perfil digital dizem sobre a solidez do seu negócio hoje?'
  },
  {
    id: 'brand-benchmarks',
    title: 'Parâmetros de Posicionamento B2B',
    subtitle: 'Métricas de branding para vendas complexas.',
    type: 'metrics',
    content: [],
    metrics: [
      { label: 'Fechamento Reunião', value: '45%', desc: 'Conversão de vendas direta' },
      { label: 'Contratos Anuais', value: '80%', desc: 'Taxa de renovação (LTV)' },
      { label: 'Aumento de Margem', value: '30%', desc: 'Graças ao posicionamento' },
      { label: 'Clientes Indicados', value: '25%', desc: 'Indicações espontâneas' }
    ],
    pausePrompt: 'Ter 80% de renovação nos contratos anuais daria mais segurança para escalar?'
  }
];
