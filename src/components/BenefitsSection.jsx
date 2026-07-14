import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, Clock, LineChart, MessageSquare, Zap } from 'lucide-react';
import MetricDashboard from './MetricDashboard';

const cards = [
  {
    id: 1,
    icon: Eye,
    title: "Clareza total sobre onde seu dinheiro está indo",
    text: "Chega de relatório que ninguém entende. Você sabe exatamente quantos leads, quantas vendas e qual custo — mês a mês.",
    colSpan: "md:col-span-2"
  },
  {
    id: 2,
    icon: Users,
    title: "Estrutura de marketing sem o custo de contratar um time interno",
    text: "Estratégia, tráfego, criativo e análise de dados trabalhando juntos — pelo custo de uma fração de uma equipe própria.",
    colSpan: "md:col-span-1"
  },
  {
    id: 3,
    icon: Clock,
    title: "Você recupera o tempo que gastaria tentando entender algoritmo",
    text: "Enquanto cuidamos da execução, você foca em vender e atender — que é o que só você sabe fazer.",
    colSpan: "md:col-span-1"
  },
  {
    id: 4,
    icon: LineChart,
    title: "Crescimento que se sustenta, não que depende de um golpe de sorte",
    text: "O Loop garante que cada ciclo aprende com o anterior. O resultado de hoje melhora o resultado de amanhã.",
    colSpan: "md:col-span-2",
    hasTrend: true
  },
  {
    id: 5,
    icon: MessageSquare,
    title: "Um parceiro que você consegue realmente falar",
    text: "Sem central de atendimento genérica. Você tem contato direto com quem está tocando sua conta.",
    colSpan: "md:col-span-1"
  },
  {
    id: 6,
    icon: Zap,
    title: "Decisões guiadas por dados reais",
    text: "Unimos a precisão de dados com a criatividade humana para criar campanhas que escalam sem perder a rentabilidade, mantendo o seu custo de aquisição sob controle.",
    colSpan: "md:col-span-2",
    hasFunnel: true
  }
];

export default function BenefitsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="beneficios" className="py-24 relative overflow-hidden bg-brand-yellow select-none">
      
      {/* Grid de fundo sutil em preto sobre amarelo */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Título de Seção (Preto no Amarelo) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-black/60 font-bold block mb-3">Vantagens</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            Por que empresas de alta performance escolhem o Loop?
          </h2>
          <p className="mt-3 text-sm text-brand-black/75 font-semibold">
            Entregamos processo e previsibilidade, eliminando a dor de cabeça clássica de agências tradicionais.
          </p>
        </div>

        {/* Bento Grid com Altura Sob Medida, Fontes Ampliadas e Animações Maiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isFirstCard = card.id === 1;
            const isSixthCard = card.id === 6;
            const isDoubleCol = card.colSpan === "md:col-span-2";

            const isVerticalCol = isFirstCard || card.id === 4;

            return (
              <motion.div
                key={card.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariants}
                className={`bg-white border border-black/5 rounded-3xl p-8 text-left transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 min-h-[300px] md:min-h-[290px] relative z-10 hover:z-20 overflow-hidden ${card.colSpan} ${
                  isVerticalCol || isSixthCard
                    ? "flex flex-col justify-between gap-6"
                    : isDoubleCol
                      ? "flex flex-col md:flex-row md:items-stretch md:justify-between gap-6" 
                      : "flex flex-col justify-between"
                }`}
              >
                {isSixthCard ? (
                  <>
                    {/* Header at the top, full width, single line */}
                    <div className="w-full z-10">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-brand-black shadow-inner">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-[1.38rem] font-black text-brand-black tracking-tight leading-tight whitespace-nowrap">
                          Decisões guiadas por dados reais
                        </h3>
                      </div>
                    </div>

                    {/* Content below title: text left, funnel right */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full mt-auto">
                      <div className="flex-1 min-w-0 md:max-w-[50%] z-10">
                        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-semibold">
                          {card.text}
                        </p>
                      </div>

                      <div className="shrink-0 z-10 w-full md:w-[45%] h-[290px] flex items-center justify-center relative pointer-events-none select-none self-center md:self-center">
                        <div className="absolute inset-0 bg-brand-yellow/5 rounded-full blur-xl pointer-events-none" />
                        
                        <svg className="w-full h-full max-w-[360px]" viewBox="50 8 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.05" />
                              <stop offset="100%" stopColor="#FFCC00" stopOpacity="0.15" />
                            </linearGradient>
                            <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#E6B800" />
                              <stop offset="50%" stopColor="#FFCC00" />
                              <stop offset="100%" stopColor="#FFF5C2" />
                            </linearGradient>
                            <filter id="funnelGlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="2.5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Grade de base da ilustração */}
                          <path d="M 52 135 L 180 135" stroke="#E5E7EB" strokeWidth="0.8" strokeDasharray="3, 4" />

                          {/* O Funil Isométrico de Linhas Finas */}
                          <ellipse cx="100" cy="40" rx="42" ry="11" fill="url(#funnelGrad)" stroke="url(#goldStroke)" strokeWidth="2.5" filter="url(#funnelGlow)" />
                          <ellipse cx="100" cy="75" rx="26" ry="7" fill="url(#funnelGrad)" stroke="url(#goldStroke)" strokeWidth="2.0" opacity="0.85" />
                          <ellipse cx="100" cy="110" rx="12" ry="3" fill="url(#funnelGrad)" stroke="url(#goldStroke)" strokeWidth="1.8" opacity="0.75" />

                          {/* Linhas de conexão lateral do funnel */}
                          <line x1="58" y1="40" x2="88" y2="110" stroke="url(#goldStroke)" strokeWidth="2.0" opacity="0.45" />
                          <line x1="142" y1="40" x2="112" y2="110" stroke="url(#goldStroke)" strokeWidth="2.0" opacity="0.45" />

                          {/* Seta de crescimento verde emergindo da saída */}
                          <g>
                            <path d="M 97 122 L 100 115 L 103 122 M 100 115 L 100 133" stroke="#10B981" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round" filter="url(#funnelGlow)">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                            </path>
                          </g>

                          {/* Partículas de dados */}
                          <circle cx="92" cy="22" r="2.5" fill="#FFCC00" opacity="0.8">
                            <animate attributeName="cy" values="10;38" dur="1.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="108" cy="18" r="2" fill="#FFCC00" opacity="0.8">
                            <animate attributeName="cy" values="8;38" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" />
                          </circle>

                          {/* Partículas qualificadas */}
                          <circle cx="100" cy="50" r="1.8" fill="#FFCC00">
                            <animate attributeName="cy" values="40;73" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="100" cy="82" r="1.5" fill="#10B981">
                            <animate attributeName="cy" values="75;108" dur="1.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
                          </circle>

                          {/* Etiquetas conceituais */}
                          <text x="148" y="43" fill="#9CA3AF" fontSize="6.5" className="font-mono font-bold" letterSpacing="0.5">LEADS</text>
                          <text x="132" y="78" fill="#9CA3AF" fontSize="6.5" className="font-mono font-bold" letterSpacing="0.5">VENDAS</text>
                          <text x="118" y="113" fill="#10B981" fontSize="6.5" className="font-mono font-bold" letterSpacing="0.5">LUCRO (ROI)</text>
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Textos explicativos (Fontes Ampliadas, Alinhamento no Topo) */}
                    <div className={`space-y-4 z-10 ${isVerticalCol ? 'w-full md:max-w-3xl' : isDoubleCol ? 'flex-1 min-w-0 md:max-w-[50%]' : 'flex-1 w-full'}`}>
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-brand-black shadow-inner">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-[1.38rem] font-black text-brand-black tracking-tight leading-tight">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-semibold">
                        {card.text}
                      </p>
                    </div>

                    {/* Dashboard de Métricas Interativo (Card 1 - Posicionado abaixo dos textos no desktop) */}
                    {isFirstCard && (
                      <div className="shrink-0 z-10 w-full mt-2">
                        <MetricDashboard />
                      </div>
                    )}

                    {/* Linha de Tendência Animada de Alta (Card 4 - Posicionado abaixo dos textos) */}
                    {!isFirstCard && card.hasTrend && (
                      <div className="shrink-0 z-10 w-full h-[180px] flex items-center justify-center relative pointer-events-none select-none mt-2">
                        <svg className="w-full h-full max-w-2xl" viewBox="-10 -10 470 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="100%">
                              <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="trendStroke" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#E6B800" />
                              <stop offset="50%" stopColor="#FFCC00" />
                              <stop offset="100%" stopColor="#10B981" />
                            </linearGradient>
                            <filter id="trendGlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3.0" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Eixo de base tracejado dourado sutil */}
                          <path d="M 20 120 L 440 120" stroke="#FFCC00" strokeWidth="0.8" strokeDasharray="3, 4" opacity="0.3" />

                          {/* Linhas de projeção vertical tracejadas de grade */}
                          <line x1="160" y1="85" x2="160" y2="120" stroke="#E5E7EB" strokeWidth="0.8" strokeDasharray="2, 2" />
                          <line x1="300" y1="55" x2="300" y2="120" stroke="#E5E7EB" strokeWidth="0.8" strokeDasharray="2, 2" />
                          <line x1="440" y1="20" x2="440" y2="120" stroke="#10B981" strokeWidth="0.8" strokeDasharray="3, 3" opacity="0.5" />

                          {/* Curva de referência concorrente (Crescimento lento tradicional) */}
                          <path 
                            d="M 20 120 C 130 115 250 110 440 95" 
                            fill="none" 
                            stroke="#D1D5DB" 
                            strokeWidth="1.5" 
                            strokeDasharray="4, 4"
                          />
                          <text x="250" y="112" fill="#9CA3AF" fontSize="6" className="font-mono font-bold">MÉDIA DO MERCADO</text>

                          {/* Preenchimento sob a curva Loop */}
                          <path 
                            d="M 20 120 C 130 110 250 70 440 20 L 440 120 L 20 120 Z" 
                            fill="url(#trendFill)" 
                          />

                          {/* Linha principal Loop com Glow e degradê */}
                          <path 
                            d="M 20 120 C 130 110 250 70 440 20" 
                            fill="none" 
                            stroke="url(#trendStroke)" 
                            strokeWidth="3.2" 
                            strokeLinecap="round"
                            filter="url(#trendGlow)"
                          />

                          {/* Pontos de dados */}
                          <circle cx="20" cy="120" r="3.5" fill="#E6B800" />
                          <circle cx="160" cy="85" r="3.5" fill="#FFCC00" />
                          <circle cx="300" cy="55" r="3.5" fill="#FFCC00" />

                          {/* Ponto final verde brilhante de lucro com anel de pulso */}
                          <circle cx="440" cy="20" r="5.5" fill="#10B981" filter="url(#trendGlow)" />
                          <circle cx="440" cy="20" r="12" fill="none" stroke="#10B981" strokeWidth="1.2" opacity="0.6">
                            <animate attributeName="r" values="5.5;18" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite" />
                          </circle>

                          {/* Orb de luz animado viajando na curva */}
                          <circle r="4" fill="#FFFFFF" filter="url(#trendGlow)">
                            <animateMotion 
                              dur="3s" 
                              repeatCount="indefinite" 
                              path="M 20 120 C 130 110 250 70 440 20"
                            />
                          </circle>

                          {/* Tooltip flutuante de ROAS */}
                          <g filter="url(#trendGlow)">
                            <rect x="375" y="-12" rx="4" ry="4" width="60" height="18" fill="#10B981" />
                            <text x="405" y="0" fill="#FFFFFF" fontSize="7" className="font-mono font-black" textAnchor="middle">ROAS 5.9x</text>
                          </g>

                          {/* Rótulos discretos de dados */}
                          <text x="15" y="130" fill="#9CA3AF" fontSize="7" className="font-mono font-bold" letterSpacing="0.3">MÊS 01</text>
                          <text x="420" y="130" fill="#9CA3AF" fontSize="7" className="font-mono font-bold" letterSpacing="0.3">MÊS 03</text>
                        </svg>
                      </div>
                    )}

                    {/* Ilustração: Rede de Nós Integrados (Card 2) */}
                    {card.id === 2 && (
                      <div className="w-full h-[180px] mt-auto flex items-center justify-center relative pointer-events-none select-none">
                        <svg className="w-[250px] h-full" viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            {/* Gradiente para o Hub central */}
                            <linearGradient id="hubGrad2" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#FFCC00" />
                              <stop offset="100%" stopColor="#E6B800" />
                            </linearGradient>

                            {/* Gradiente para as linhas de conexão (dourado vibrante) */}
                            <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#FFCC00" />
                              <stop offset="50%" stopColor="#E6B800" />
                              <stop offset="100%" stopColor="#FFCC00" />
                            </linearGradient>

                            {/* Filtro de brilho intenso */}
                            <filter id="hubGlow2" x="-40%" y="-40%" width="180%" height="180%">
                              <feGaussianBlur stdDeviation="3.5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Linha de base tracejada dourada sutil */}
                          <path d="M 10 118 L 210 118" stroke="#FFCC00" strokeWidth="0.8" strokeDasharray="3, 4" opacity="0.3" />

                          {/* Caminhos curvos grossos e dourados do hub para os módulos */}
                          <path d="M 110 65 Q 70 40 34 30" stroke="url(#lineGrad2)" strokeWidth="1.8" strokeDasharray="4,3" fill="none" filter="url(#hubGlow2)" opacity="0.8">
                            <animate attributeName="stroke-dashoffset" values="0;-14" dur="2s" repeatCount="indefinite" />
                          </path>
                          <path d="M 110 65 Q 150 40 186 30" stroke="url(#lineGrad2)" strokeWidth="1.8" strokeDasharray="4,3" fill="none" filter="url(#hubGlow2)" opacity="0.8">
                            <animate attributeName="stroke-dashoffset" values="0;-14" dur="2.3s" repeatCount="indefinite" />
                          </path>
                          <path d="M 110 65 Q 65 85 34 100" stroke="url(#lineGrad2)" strokeWidth="1.8" strokeDasharray="4,3" fill="none" filter="url(#hubGlow2)" opacity="0.8">
                            <animate attributeName="stroke-dashoffset" values="0;-14" dur="1.8s" repeatCount="indefinite" />
                          </path>
                          <path d="M 110 65 Q 155 85 186 100" stroke="url(#lineGrad2)" strokeWidth="1.8" strokeDasharray="4,3" fill="none" filter="url(#hubGlow2)" opacity="0.8">
                            <animate attributeName="stroke-dashoffset" values="0;-14" dur="2.5s" repeatCount="indefinite" />
                          </path>

                          {/* Hub central hexagonal ampliado */}
                          <polygon points="110,46 126,55.5 126,74.5 110,84 94,74.5 94,55.5" fill="url(#hubGrad2)" stroke="#D4AF37" strokeWidth="2" filter="url(#hubGlow2)" />
                          <text x="110" y="69.5" fill="#0A0A0A" fontSize="8" textAnchor="middle" className="font-mono font-black" letterSpacing="0.8">LOOP</text>

                          {/* Anéis de pulso concêntricos do hub */}
                          <circle cx="110" cy="65" r="20" fill="none" stroke="#FFCC00" strokeWidth="1" opacity="0.4">
                            <animate attributeName="r" values="20;32" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0" dur="2.5s" repeatCount="indefinite" />
                          </circle>

                          {/* Módulo 1 — Estratégia (topo-esq) */}
                          <rect x="8" y="15" rx="6" ry="6" width="46" height="24" fill="#FFFFFF" stroke="#FFCC00" strokeWidth="1.2" shadow="sm" />
                          <line x1="16" y1="23" x2="38" y2="23" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                          <line x1="16" y1="29" x2="30" y2="29" stroke="#E6B800" strokeWidth="1.5" strokeLinecap="round" />
                          <text x="31" y="9" fill="#0A0A0A" fontSize="6.5" textAnchor="middle" className="font-mono font-black" letterSpacing="0.3">ESTRATÉGIA</text>

                          {/* Módulo 2 — Tráfego (topo-dir) */}
                          <rect x="166" y="15" rx="6" ry="6" width="46" height="24" fill="#FFFFFF" stroke="#FFCC00" strokeWidth="1.2" shadow="sm" />
                          <polyline points="173,31 180,24 185,28 191,19 197,23" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <text x="189" y="9" fill="#0A0A0A" fontSize="6.5" textAnchor="middle" className="font-mono font-black" letterSpacing="0.3">TRÁFEGO</text>

                          {/* Módulo 3 — Copy (baixo-esq) */}
                          <rect x="8" y="90" rx="6" ry="6" width="46" height="24" fill="#FFFFFF" stroke="#FFCC00" strokeWidth="1.2" shadow="sm" />
                          <text x="21" y="106" fill="#0A0A0A" fontSize="13" className="font-serif font-black" opacity="0.8">Aa</text>
                          <text x="31" y="125" fill="#0A0A0A" fontSize="6.5" textAnchor="middle" className="font-mono font-black" letterSpacing="0.3">COPY</text>

                          {/* Módulo 4 — Dados (baixo-dir) */}
                          <rect x="166" y="90" rx="6" ry="6" width="46" height="24" fill="#FFFFFF" stroke="#FFCC00" strokeWidth="1.2" shadow="sm" />
                          <rect x="174" y="102" width="5" height="7" rx="1" fill="#E5E7EB" />
                          <rect x="181" y="98" width="5" height="11" rx="1" fill="#E6B800" />
                          <rect x="188" y="94" width="5" height="15" rx="1" fill="#10B981" />
                          <text x="189" y="125" fill="#0A0A0A" fontSize="6.5" textAnchor="middle" className="font-mono font-black" letterSpacing="0.3">DADOS</text>

                          {/* Partículas douradas brilhantes viajando pelas curvas */}
                          <circle r="3" fill="#FFCC00" filter="url(#hubGlow2)">
                            <animateMotion dur="2s" repeatCount="indefinite" path="M 34 30 Q 70 40 110 65" />
                            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle r="3" fill="#FFCC00" filter="url(#hubGlow2)">
                            <animateMotion dur="2.3s" repeatCount="indefinite" path="M 186 30 Q 150 40 110 65" />
                            <animate attributeName="opacity" values="0;1;0" dur="2.3s" repeatCount="indefinite" />
                          </circle>
                          <circle r="2.5" fill="#FFCC00">
                            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 34 100 Q 65 85 110 65" />
                            <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
                          </circle>
                          <circle r="2.5" fill="#FFCC00">
                            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 186 100 Q 155 85 110 65" />
                            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                      </div>
                    )}

                    {/* Ilustração: Relógio Acelerado (Card 3 - Recupere seu Tempo) */}
                    {card.id === 3 && (
                      <div className="w-full h-[160px] mt-auto flex items-center justify-center relative pointer-events-none select-none">
                        <svg className="w-[160px] h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <filter id="clockGlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="1.5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Aro externo do relógio */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#FFCC00" strokeWidth="1.5" strokeDasharray="40 200" opacity="0.5">
                            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite" />
                          </circle>

                          {/* Marcadores de hora (12, 3, 6, 9) */}
                          <line x1="50" y1="14" x2="50" y2="18" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="86" y1="50" x2="82" y2="50" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="50" y1="86" x2="50" y2="82" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="14" y1="50" x2="18" y2="50" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />

                          {/* Marcadores menores */}
                          <line x1="68" y1="16.5" x2="66.5" y2="20" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="83.5" y1="32" x2="80" y2="33.5" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="83.5" y1="68" x2="80" y2="66.5" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="68" y1="83.5" x2="66.5" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="32" y1="83.5" x2="33.5" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="16.5" y1="68" x2="20" y2="66.5" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="16.5" y1="32" x2="20" y2="33.5" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />
                          <line x1="32" y1="16.5" x2="33.5" y2="20" stroke="#E5E7EB" strokeWidth="1" strokeLinecap="round" />

                          {/* Ponteiro de hora (giro lento) */}
                          <line x1="50" y1="50" x2="50" y2="28" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round">
                            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite" />
                          </line>

                          {/* Ponteiro de minuto (giro rápido — tempo acelerado) */}
                          <line x1="50" y1="50" x2="50" y2="22" stroke="#E6B800" strokeWidth="1.8" strokeLinecap="round" filter="url(#clockGlow)">
                            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite" />
                          </line>

                          {/* Centro do relógio */}
                          <circle cx="50" cy="50" r="3" fill="#FFCC00" filter="url(#clockGlow)" />
                          <circle cx="50" cy="50" r="1.5" fill="#0A0A0A" />

                          {/* Etiqueta "TEMPO SALVO" */}
                          <text x="50" y="64" fill="#9CA3AF" fontSize="5" textAnchor="middle" className="font-mono font-bold" letterSpacing="1">SALVO</text>
                        </svg>
                      </div>
                    )}

                    {/* Ilustração: Chat Direto (Card 5 - Um Parceiro Próximo) */}
                    {card.id === 5 && (
                      <div className="w-full h-[160px] mt-auto flex items-center justify-center relative pointer-events-none select-none">
                        <svg className="w-[170px] h-full" viewBox="0 0 170 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <filter id="chatGlow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="1.5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Balão de chat 1 — Esquerda (usuário) */}
                          <g>
                            <rect x="8" y="12" rx="10" ry="10" width="70" height="24" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
                            {/* Linhas de texto simulado */}
                            <line x1="18" y1="21" x2="58" y2="21" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                            <line x1="18" y1="28" x2="42" y2="28" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                            {/* Cauda do balão */}
                            <polygon points="15,36 22,36 15,42" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" strokeLinejoin="round" />
                            <animate attributeName="opacity" values="0;1;1;1" dur="3s" repeatCount="indefinite" />
                          </g>

                          {/* Balão de chat 2 — Direita (resposta do parceiro, dourado) */}
                          <g>
                            <rect x="88" y="42" rx="10" ry="10" width="74" height="24" fill="#FFCC00" stroke="#E6B800" strokeWidth="1" filter="url(#chatGlow)" />
                            {/* Linhas de texto simulado */}
                            <line x1="98" y1="51" x2="148" y2="51" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                            <line x1="98" y1="58" x2="130" y2="58" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                            {/* Cauda do balão */}
                            <polygon points="155,66 148,66 155,72" fill="#FFCC00" stroke="#E6B800" strokeWidth="1" strokeLinejoin="round" />
                            <animate attributeName="opacity" values="0;0;1;1" dur="3s" repeatCount="indefinite" />
                          </g>

                          {/* Indicador de "digitando..." animado */}
                          <g>
                            <animate attributeName="opacity" values="0;0;0;1" dur="3s" repeatCount="indefinite" />
                            <circle cx="18" cy="80" r="2" fill="#D1D5DB">
                              <animate attributeName="r" values="1.5;2.5;1.5" dur="0.8s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="26" cy="80" r="2" fill="#D1D5DB">
                              <animate attributeName="r" values="1.5;2.5;1.5" dur="0.8s" begin="0.2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="34" cy="80" r="2" fill="#D1D5DB">
                              <animate attributeName="r" values="1.5;2.5;1.5" dur="0.8s" begin="0.4s" repeatCount="indefinite" />
                            </circle>
                          </g>

                          {/* Etiquetas */}
                          <text x="43" y="52" fill="#9CA3AF" fontSize="5.5" textAnchor="middle" className="font-mono font-bold">DIRETO</text>
                        </svg>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
