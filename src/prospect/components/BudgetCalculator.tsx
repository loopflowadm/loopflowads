import React, { useState, useEffect } from 'react';
import { ProspectData } from '../types';
import Logo from './Logo';
import { Download, ArrowRight, TrendingUp, Smartphone, Store, Calculator, MapPin, ShoppingBag, Target, Percent, DollarSign, Zap, Rocket, Clock, FileText, CheckCircle2, Shield, MessageCircle, ExternalLink, ChevronLeft } from 'lucide-react';

interface BudgetCalculatorProps {
  prospect: ProspectData;
  onBack: () => void;
}

type Scenario = 'conservador' | 'realista' | 'agressivo' | 'personalizado';
type Objective = 'sair_ifood' | 'escala_pedidos' | 'previsibilidade' | 'recompra';

const RESOURCES = [
  { id: 'whatsapp', label: 'Setup Funil WhatsApp/Zap', price: 600, desc: 'Gestão estratégica, otimização e criativos inclusos.' },
  { id: 'creative', label: 'Pacote de Criativos "Desejo"', price: 1200, desc: 'Produção profissional mensal focada em conversão.' },
  { id: 'retention', label: 'Automação de Recompra (CRM)', price: 900, desc: 'Fidelização via WhatsApp e recuperação de leads/carrinhos.' },
  { id: 'api', label: 'Setup API Conversão/Pixel', price: 1500, desc: 'Rastreamento avançado de ROI e inteligência de dados.' },
];

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ prospect, onBack }) => {
  // 1. Estados de Fluxo
  const [isProposalVisible, setIsProposalVisible] = useState(false);

  // Identificação do Nicho do Prospect
  const s = prospect.segment.toLowerCase();
  const isFood = s.includes('delivery') || s.includes('restaurante');
  const isEcom = s.includes('commerce') || s.includes('varejo') || s.includes('loja');
  const isLocal = s.includes('local') || s.includes('clínica') || s.includes('serviço') || s.includes('clinica');
  const isB2b = !isFood && !isEcom && !isLocal;

  // Labels dinâmicas com base no nicho
  const salesLabel = isFood || isEcom ? "Pedidos Est." : isLocal ? "Novos Clientes Est." : "Contratos Fechados Est.";
  const cpaLabel = isLocal ? "CPL Médio" : isB2b ? "Custo p/ Reunião" : "CPA Médio";
  const orderLabel = isFood || isEcom ? "Pedidos Atuais/Mês" : isLocal ? "Agendamentos Atuais/Mês" : "Vendas Fechadas/Mês";
  const capacityLabel = isFood || isEcom ? "Capacidade Op. (Pedidos/Mês)" : "Capacidade (Clientes/Mês)";
  const ticketLabel = isB2b ? "LTV / Valor do Contrato (R$)" : "Ticket Médio (R$)";
  const marginLabel = isFood || isEcom ? "Margem do Produto (%)" : "Margem Líquida (%)";

  // Cálculo da data do próximo ciclo (Ex: Próxima segunda ou +5 dias)
  const getNextCycleDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // 2. Dados Iniciais
  const [localidade, setLocalidade] = useState('');
  const [canalPrincipal, setCanalPrincipal] = useState<'marketplace' | 'pago' | 'organico' | 'outbound'>('pago');
  const [objetivo, setObjetivo] = useState<Objective>('escala_pedidos');

  // 3. Métricas de Operação
  const [ticketMedio, setTicketMedio] = useState<number>(65);
  const [pedidosAtuais, setPedidosAtuais] = useState<number>(300);
  const [capacidadeOperacional, setCapacidadeOperacional] = useState<number>(500);
  const [taxaMarketplace, setTaxaMarketplace] = useState<number>(27);
  const [margemProduto, setMargemProduto] = useState<number>(35);

  // 4. Estratégia e Investimento (Editáveis)
  const [scenario, setScenario] = useState<Scenario>('realista');
  const [adSpend, setAdSpend] = useState<number>(4500);
  const [baseFee, setBaseFee] = useState<number>(2500);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  // 5. Estados Calculados
  const [metrics, setMetrics] = useState({
    cacEstimado: { min: 0, max: 0 },
    pedidosEstimados: 0,
    faturamentoProjetado: 0,
    economiaMarketplace: 0,
    totalSetupUnico: 0, // Soma dos Ativos
    totalRecorrenteMensal: 0, // Fee + AdSpend
    lucroExtraEstimado: 0
  });

  // Inicialização de valores padrão baseados no nicho
  useEffect(() => {
    if (isFood) {
      setCanalPrincipal('marketplace');
      setObjetivo('sair_ifood');
      setTicketMedio(65);
      setPedidosAtuais(300);
      setCapacidadeOperacional(800);
      setTaxaMarketplace(27);
      setMargemProduto(35);
    } else if (isEcom) {
      setCanalPrincipal('pago');
      setObjetivo('escala_pedidos');
      setTicketMedio(180);
      setPedidosAtuais(150);
      setCapacidadeOperacional(1000);
      setTaxaMarketplace(5);
      setMargemProduto(50);
    } else if (isLocal) {
      setCanalPrincipal('organico');
      setObjetivo('previsibilidade');
      setTicketMedio(250);
      setPedidosAtuais(30);
      setCapacidadeOperacional(80);
      setTaxaMarketplace(0);
      setMargemProduto(70);
    } else {
      setCanalPrincipal('outbound');
      setObjetivo('previsibilidade');
      setTicketMedio(1500);
      setPedidosAtuais(3);
      setCapacidadeOperacional(15);
      setTaxaMarketplace(0);
      setMargemProduto(60);
    }
  }, [isFood, isEcom, isLocal, prospect.segment]);

  // Atualiza Ad Spend com base no cenário (Preset)
  const handleScenarioChange = (s: Scenario) => {
    setScenario(s);
    if (s === 'conservador') setAdSpend(2000);
    if (s === 'realista') setAdSpend(4500);
    if (s === 'agressivo') setAdSpend(9000);
  };

  useEffect(() => {
    let minCac = 0;
    let maxCac = 0;
    let avgCac = 0;
    let estPedidos = 0;
    let estFaturamento = 0;
    let economiaTotal = 0;

    // 1. Definição de Performance Base
    let baseCacVal = 8;
    if (isFood) {
      baseCacVal = ticketMedio < 40 ? 12 : 8;
    } else if (isEcom) {
      baseCacVal = 25; // CPA de compra do e-commerce
    } else if (isLocal) {
      baseCacVal = 8.5; // CPL de negócios locais
    } else {
      baseCacVal = 90; // Custo por reunião B2B
    }

    let scenarioMultiplier = 1;
    if (scenario === 'conservador') scenarioMultiplier = 1.3;
    if (scenario === 'agressivo') scenarioMultiplier = 0.85;

    // 2. Cálculo do "Bônus de Aceleração" (Melhoria de Performance por ferramentas)
    let accelerationBonus = 0;
    if (selectedResources.includes('whatsapp')) accelerationBonus += 0.05; // 5% melhoria
    if (selectedResources.includes('creative')) accelerationBonus += 0.10; // 10% melhoria
    if (selectedResources.includes('retention')) accelerationBonus += 0.08; // 8% melhoria
    if (selectedResources.includes('api')) accelerationBonus += 0.12; // 12% melhoria

    const performanceFactor = 1 - accelerationBonus;
    minCac = (baseCacVal * scenarioMultiplier * performanceFactor) * 0.8;
    maxCac = (baseCacVal * scenarioMultiplier * performanceFactor) * 1.2;
    avgCac = (minCac + maxCac) / 2;

    // 3. Resultados de Vendas
    if (isFood || isEcom) {
      estPedidos = avgCac > 0 ? Math.floor(adSpend / avgCac) : 0;
      estFaturamento = estPedidos * ticketMedio;
      const economiaPorPedido = canalPrincipal === 'marketplace' ? Math.max(0, ticketMedio * (taxaMarketplace / 100 - 0.05)) : 0;
      economiaTotal = estPedidos * economiaPorPedido;
    } else if (isLocal) {
      // Local/Serviço: avgCac é CPL. O adSpend / avgCac gera LEADS.
      const leads = avgCac > 0 ? Math.floor(adSpend / avgCac) : 0;
      // Taxa de agendamento (35%), taxa de fechamento comercial (50%)
      estPedidos = Math.floor(leads * 0.35 * 0.50); // Clientes fechados
      estFaturamento = estPedidos * ticketMedio;
      economiaTotal = leads; // Usamos este campo temporariamente para carregar quantidade de leads gerados
    } else {
      // B2B
      // avgCac é Custo por Reunião.
      const meetings = avgCac > 0 ? Math.floor(adSpend / avgCac) : 0;
      // Conversão de reunião para fechamento (~15%)
      estPedidos = Math.floor(meetings * 0.15); // Contratos fechados
      estFaturamento = estPedidos * ticketMedio;
      economiaTotal = meetings; // Usamos este campo para reuniões geradas
    }

    // 5. Custos da Operação
    const oneTimeAssets = selectedResources.reduce((acc, id) => {
      const r = RESOURCES.find(x => x.id === id);
      return acc + (r?.price || 0);
    }, 0);

    const recurringFee = baseFee;
    const recurringMonthlyTotal = recurringFee + adSpend;

    let lucroBrutoExtra = 0;
    if (isFood || isEcom) {
      lucroBrutoExtra = (estFaturamento * (margemProduto / 100)) + economiaTotal;
    } else {
      lucroBrutoExtra = estFaturamento * (margemProduto / 100);
    }

    // Lucro Líquido extra mensal (após o setup do mês 1)
    const monthlyNetProfit = lucroBrutoExtra - recurringMonthlyTotal;

    setMetrics({
      cacEstimado: { min: minCac, max: maxCac },
      pedidosEstimados: estPedidos,
      faturamentoProjetado: estFaturamento,
      economiaMarketplace: economiaTotal,
      totalSetupUnico: oneTimeAssets,
      totalRecorrenteMensal: recurringMonthlyTotal,
      lucroExtraEstimado: monthlyNetProfit
    });

  }, [ticketMedio, canalPrincipal, scenario, adSpend, baseFee, selectedResources, pedidosAtuais, capacidadeOperacional, margemProduto, taxaMarketplace, prospect.segment]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handlePrint = () => window.print();

  const toggleResource = (id: string) => {
    setSelectedResources(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getObjectiveLabel = (obj: Objective) => {
    const map = {
      escala_pedidos: 'Escalar Volume de Vendas',
      sair_ifood: 'Independência de Marketplace',
      previsibilidade: 'Previsibilidade de Clientes',
      recompra: 'Aumento de LTV / Recompra'
    };
    return map[obj];
  };

  if (isProposalVisible) {
    return (
      <div className="min-h-screen bg-zinc-950 p-6 lg:p-12 selection:bg-yellow-400 selection:text-black print:bg-white print:p-0">
        <style>
          {`
            @media print {
              @page { 
                margin: 0 !important; 
                size: A4 portrait !important;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 794px !important;
                background-color: white !important;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
              }
              .no-print { display: none !important; }
              
              .print-container { 
                width: 794px !important;
                margin: 0 !important;
                padding: 0 !important;
                background-color: white !important;
                border: none !important;
                box-shadow: none !important;
              }

              .page-container { 
                width: 794px !important;
                height: 1123px !important;
                position: relative !important;
                overflow: hidden !important;
                padding: 0 !important;
                display: flex !important;
                flex-direction: column !important;
                page-break-after: always !important;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `}
        </style>

        <div className="max-w-fit mx-auto space-y-8 pb-20">
          <div className="grid grid-cols-3 items-center no-print mb-8 w-[794px] mx-auto">
            <div className="flex justify-start">
              <button onClick={() => setIsProposalVisible(false)} className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors group uppercase font-black text-[10px] tracking-widest leading-none">
                <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                <span>Editar Parâmetros</span>
              </button>
            </div>

            <div className="flex justify-center">
            </div>

            <div className="flex justify-end">
              <button
                onClick={handlePrint}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center space-x-3 shadow-lg shadow-yellow-400/5 transition-transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Proposta (PDF)</span>
              </button>
            </div>
          </div>

          <div className="print-container mx-auto space-y-8 print:space-y-0">
            {/* PÁGINA 01: DIAGNÓSTICO E PERFORMANCE */}
            <div className="bg-white text-black proposal-card w-[794px] h-[1123px] relative border border-zinc-200 flex flex-col page-container">
              {/* Header Proposta */}
              <div className="bg-zinc-950 py-5 px-12 text-white flex justify-between items-center print:bg-black shrink-0 relative">
                <div className="flex items-center space-x-6">
                  <div className="w-18 h-8 pointer-events-none opacity-90"><Logo className="w-full h-full" /></div>
                  <div className="h-8 w-px bg-zinc-800/50"></div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.25em] italic leading-none">Proposta de Escala</div>
                  </div>
                </div>

                <div className="flex items-center space-x-5">
                  <div className="text-right">
                    <h2 className="text-[26px] font-black italic tracking-tighter uppercase leading-none text-white">{prospect.name}</h2>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{prospect.segment}</span>
                    </div>
                  </div>

                  <div className="h-16 w-16 bg-zinc-900 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-800 shrink-0">
                    {prospect.logo ? (
                      <img src={prospect.logo} alt={prospect.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="font-black text-xl italic text-zinc-700">
                        {prospect.name.substring(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 px-12 py-10 space-y-12">
                {/* 01. Diagnóstico */}
                <section className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-xl font-black uppercase tracking-tight italic border-b-2 border-yellow-400 pb-1.5 text-zinc-900 text-center">Diagnóstico Inicial</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { label: 'Localidade / Raio', value: localidade || 'Análise Regional' },
                      { label: 'Operação Atual', value: canalPrincipal === 'marketplace' ? 'Marketplaces' : canalPrincipal === 'pago' ? 'Tráfego Pago' : canalPrincipal === 'organico' ? 'Orgânico / Indicação' : 'Outbound' },
                      { label: orderLabel, value: pedidosAtuais > 0 ? `${pedidosAtuais} /mês` : 'Não Informado' },
                      { label: ticketLabel, value: formatCurrency(ticketMedio) },
                      { label: marginLabel, value: `${margemProduto}%` },
                      { label: 'Taxa / Gatway', value: canalPrincipal === 'marketplace' ? `${taxaMarketplace}%` : '0%' }
                    ].map((item, i) => (
                      <div key={i} className="bg-zinc-50/80 p-5 rounded-[20px] border border-zinc-100 flex flex-col justify-center items-center text-center">
                        <span className="text-zinc-400 font-bold uppercase text-[8px] tracking-[0.2em] mb-2">{item.label}</span>
                        <span className="font-black text-black tracking-tight leading-none italic text-[16px]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 02. Performance */}
                <section className="space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-xl font-black uppercase tracking-tight italic border-b-2 border-yellow-400 pb-1.5 text-zinc-900 text-center">Projeção de Performance</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-stretch">
                    <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-100 flex flex-col justify-center items-center text-center">
                      <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{salesLabel}</div>
                      <div className="text-2xl font-black italic tracking-tighter text-zinc-900">{metrics.pedidosEstimados}</div>
                    </div>
                    <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-100 flex flex-col justify-center items-center text-center">
                      <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-2">ROAS Projetado</div>
                      <div className="text-2xl font-black italic tracking-tighter text-zinc-900">{(metrics.faturamentoProjetado / adSpend).toFixed(1)}x</div>
                    </div>
                    <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-100 flex flex-col justify-center items-center text-center">
                      <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{cpaLabel}</div>
                      <div className="text-2xl font-black italic tracking-tighter text-zinc-900">{formatCurrency((metrics.cacEstimado.min + metrics.cacEstimado.max) / 2)}</div>
                    </div>
                    <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-100 flex flex-col justify-center items-center text-center">
                      <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Faturamento Est.</div>
                      <div className="text-2xl font-black italic tracking-tighter text-zinc-900">{formatCurrency(metrics.faturamentoProjetado)}</div>
                    </div>

                    {/* Gráfico de Projeção 30-60-90 dias */}
                    <div className="col-span-4 bg-zinc-950 rounded-2xl p-6 border border-zinc-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-yellow-500" />
                          Curva de Aceleração Estratégica
                        </div>
                        <div className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Faturamento Estimado vs Tempo</div>
                      </div>

                      <div className="relative h-64 w-full mt-6 select-none bg-zinc-900/40 rounded-xl border border-zinc-800/50 shadow-inner">
                        <div className="absolute inset-x-0 bottom-0 h-10 border-t border-zinc-800/50 bg-zinc-950/30 z-0"></div>
                        <div className="absolute inset-x-0 bottom-10 top-0 grid grid-cols-4 divide-x divide-zinc-800/20 pointer-events-none">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>

                        {/* SVG Curve Layer */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible z-10" viewBox="0 0 800 256" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FACC15" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          <path
                            d="M-50,256 C200,240 200,180 400,120 S650,40 850,20 L850,256 Z"
                            fill="url(#chartGradient)"
                            className="opacity-60"
                          />

                          <path
                            d="M-50,256 C200,240 200,180 400,120 S650,40 850,20"
                            fill="none"
                            stroke="#FACC15"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Data Points Layer */}
                        <div className="absolute inset-0 z-20">
                          {/* Point 1: 30 Dias */}
                          <div className="absolute left-[25%] bottom-0 top-0 flex flex-col items-center justify-end group">
                            <div className="absolute top-[78%] -translate-y-[135%] px-3 py-1.5 bg-zinc-950 border border-zinc-700/50 rounded-lg shadow-xl whitespace-nowrap z-30 transition-all duration-300">
                              <span className="text-[14px] font-black italic text-zinc-300 block leading-none">{formatCurrency(metrics.faturamentoProjetado)}</span>
                            </div>

                            <div className="absolute top-[78%] w-3 h-3 bg-zinc-950 border-[2px] border-yellow-500 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] z-20"></div>
                            <div className="absolute top-[78%] bottom-10 w-px border-r border-dashed border-zinc-700/50 bg-gradient-to-t from-zinc-800/0 to-yellow-500/20"></div>

                            <div className="h-10 w-full flex flex-col justify-center items-center pt-1">
                              <span className="text-[10px] font-black text-white uppercase tracking-widest block">30 Dias</span>
                              <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider block">Tração</span>
                            </div>
                          </div>

                          {/* Point 2: 60 Dias */}
                          <div className="absolute left-[50%] bottom-0 top-0 flex flex-col items-center justify-end group">
                            <div className="absolute top-[45%] -translate-y-[135%] px-3 py-1.5 bg-zinc-950 border border-zinc-700/50 rounded-lg shadow-xl whitespace-nowrap z-30 animate-none">
                              <span className="text-[14px] font-black italic text-zinc-200 block leading-none">{formatCurrency(metrics.faturamentoProjetado * 1.35)}</span>
                            </div>

                            <div className="absolute top-[45%] w-3 h-3 bg-zinc-950 border-[2px] border-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.6)] z-20"></div>
                            <div className="absolute top-[45%] bottom-10 w-px border-r border-dashed border-zinc-700/50 bg-gradient-to-t from-zinc-800/0 to-yellow-400/20"></div>

                            <div className="h-10 w-full flex flex-col justify-center items-center pt-1">
                              <span className="text-[10px] font-black text-white uppercase tracking-widest block">60 Dias</span>
                              <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider block">Otimização</span>
                            </div>
                          </div>

                          {/* Point 3: 90 Dias */}
                          <div className="absolute left-[82%] bottom-0 top-0 flex flex-col items-center justify-end group">
                            <div className="absolute top-[15%] -translate-y-[125%] px-4 py-2 bg-yellow-400 border border-yellow-300 rounded-xl shadow-[0_10px_30px_rgba(250,204,21,0.2)] whitespace-nowrap z-30">
                              <span className="text-[18px] font-black italic text-black block leading-none">{formatCurrency(metrics.faturamentoProjetado * 1.75)}</span>
                            </div>

                            <div className="absolute top-[15%] w-4 h-4 bg-yellow-400 border-[3px] border-white rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)] z-20 animate-pulse"></div>
                            <div className="absolute top-[15%] bottom-10 w-px bg-gradient-to-b from-yellow-400/30 to-transparent border-r border-dashed border-yellow-500/30"></div>

                            <div className="h-10 w-full flex flex-col justify-center items-center pt-1">
                              <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest block">90 Dias</span>
                              <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-wider block">Escala Máxima</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 flex flex-col justify-center items-center text-center">
                      <div className="text-[8px] font-bold text-green-600/60 uppercase tracking-widest mb-2">
                        {canalPrincipal === 'marketplace' ? "Economia de Comissões" : isFood ? "Economia iFood" : isEcom ? "Economia Gateway" : isLocal ? "Leads Gerados Est." : "Reuniões Geradas Est."}
                      </div>
                      <div className="text-2xl font-black italic text-green-700 tracking-tighter">
                        {canalPrincipal === 'marketplace' || isFood || isEcom ? `+${formatCurrency(metrics.economiaMarketplace)}` : `+${metrics.economiaMarketplace}`}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col justify-center overflow-hidden items-center text-center">
                      <div className="text-[8px] font-bold text-blue-500/60 uppercase tracking-widest mb-2">
                        {isFood || isEcom ? "Crescimento Estimado" : isLocal ? "Ocupação Agenda" : "Aproveitamento Op."}
                      </div>
                      <div className="text-2xl font-black italic text-blue-700 tracking-tighter leading-none">
                        {isFood || isEcom 
                          ? (pedidosAtuais > 0 ? `+${((metrics.faturamentoProjetado / (pedidosAtuais * ticketMedio)) * 100).toFixed(0)}%` : '+100%')
                          : `+${((metrics.pedidosEstimados / (capacidadeOperacional || 1)) * 100).toFixed(1)}%`}
                      </div>
                    </div>

                    <div className="col-span-2 bg-yellow-400 p-6 rounded-2xl flex flex-col justify-center items-center text-center border border-yellow-500 overflow-hidden relative">
                      <div className="relative z-10 w-full">
                        <div className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-1">Aumento de Lucro Líquido Previsto</div>
                        <div className="text-4xl font-black italic text-black leading-none tracking-tighter">{formatCurrency(metrics.lucroExtraEstimado)}</div>
                      </div>
                      <div className="text-[9px] font-black text-black/30 uppercase tracking-tight italic leading-tight mt-3 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                        Metodologia LoopFlow.
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer P1 */}
              <div className="px-12 py-8 border-t border-zinc-100 flex justify-center items-center italic font-bold text-[9px] text-zinc-400 uppercase tracking-widest shrink-0">
                <span>LoopFlow © {new Date().getFullYear()}</span>
              </div>
            </div>

            {/* PÁGINA 02: INVESTIMENTO E CRONOGRAMA */}
            <div className="bg-white text-black proposal-card w-[794px] h-[1123px] relative border border-zinc-200 flex flex-col page-container">
              {/* Header Simplificado P2 */}
              <div className="bg-zinc-50 py-5 px-12 border-b border-zinc-200 flex justify-center items-center shrink-0">
                <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest italic">{prospect.name} // Orçamento Estratégico</div>
              </div>

              <div className="flex-1 px-12 py-6 space-y-8">
                {/* 03. Investimento */}
                <section className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-lg font-black uppercase tracking-tight italic border-b-2 border-yellow-400 pb-1 text-zinc-900 text-center">Investimento & Escopo</h3>
                  </div>

                  <div className="bg-zinc-50 rounded-[20px] border border-zinc-200 overflow-hidden text-zinc-950">
                    <div className="grid grid-cols-3 divide-x divide-zinc-200/50">
                      <div className="col-span-2 bg-zinc-950 text-white p-6 space-y-6">
                        <div className="flex justify-between items-center text-zinc-600 font-bold uppercase text-[7px] tracking-[0.3em] border-b border-zinc-900 pb-3">
                          <span>Serviços Contratados</span>
                          <span>Investimento</span>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-start py-0.5">
                            <div className="space-y-1">
                              <div className="font-black italic text-[15px] uppercase tracking-tight text-white leading-none">Gestão de Tráfego & Atendimento</div>
                              <div className="text-zinc-600 text-[9px] uppercase font-bold tracking-widest leading-none">Recorrência Mensal (Fee + Assessoria)</div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-xl font-black italic text-zinc-200">{formatCurrency(baseFee)}</div>
                              <div className="text-[7px] font-bold text-zinc-600 uppercase">Mensal</div>
                            </div>
                          </div>

                          {selectedResources.map(id => {
                            const res = RESOURCES.find(r => r.id === id);
                            return (
                              <div key={id} className="flex justify-between items-start py-0.5 border-t border-zinc-900/50 pt-4">
                                <div className="space-y-1">
                                  <div className="font-black italic text-[14px] uppercase tracking-tight text-white leading-none">{res?.label}</div>
                                  <div className="text-zinc-600 text-[8px] uppercase font-bold tracking-widest leading-none">Ativação Única / Setup de Ativo</div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <div className="text-xl font-black italic text-zinc-200">{formatCurrency(res?.price || 0)}</div>
                                  <div className="text-[7px] font-bold text-yellow-600 uppercase">Único</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between items-center pt-6 border-t-[4px] border-zinc-900">
                            <div className="space-y-1">
                              <div className="text-[11px] font-black italic uppercase tracking-tighter text-zinc-500">Total Setup (Mês 01)</div>
                              <div className="text-zinc-700 text-[7px] uppercase font-bold tracking-widest leading-none">Investimento inicial único</div>
                            </div>
                            <div className="text-2xl font-black text-white italic tracking-tighter">{formatCurrency(metrics.totalSetupUnico + baseFee)}</div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-zinc-900/50">
                            <div className="space-y-1">
                              <div className="text-[11px] font-black italic uppercase tracking-tighter text-yellow-500">Investimento Recorrente (Fee + Mídia)</div>
                              <div className="text-zinc-700 text-[7px] uppercase font-bold tracking-widest leading-none">Custo recorrente mensal</div>
                            </div>
                            <div className="text-2xl font-black text-yellow-400 italic tracking-tighter">{formatCurrency(metrics.totalRecorrenteMensal)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-zinc-50/50 flex flex-col justify-between text-zinc-900">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.25em] flex items-center gap-2">
                              <Shield className="w-3.5 h-3.5 text-yellow-500" strokeWidth={2.5} />
                              Escopo de Atuação
                            </div>
                            <ul className="space-y-3 px-1">
                              {[
                                'Gestão de Tráfego Pago Full',
                                'Engenharia de Rastreamento',
                                'Otimização Mensal de Funil',
                                'Relatório Semanal de ROI/CPA'
                              ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5 text-[10px] font-bold text-zinc-700 leading-none">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-6 border-t border-zinc-200/50 space-y-3">
                            <div className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.25em]">Direcionamento</div>
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-2.5 text-[11px] font-black italic uppercase tracking-tight text-zinc-800">
                                <Target className="w-3.5 h-3.5 text-yellow-500" strokeWidth={2.5} />
                                {getObjectiveLabel(objetivo)}
                              </div>
                              <div className="flex items-center gap-2.5 text-[11px] font-black italic uppercase tracking-tight text-zinc-800">
                                <Rocket className="w-3.5 h-3.5 text-yellow-500" strokeWidth={2.5} />
                                Perfil {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 04. Cronograma */}
                <section className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-lg font-black uppercase tracking-tight italic border-b-2 border-yellow-400 pb-1 text-zinc-900 text-center">Cronograma de Implementação</h3>
                  </div>

                  <div className="bg-zinc-50 rounded-[20px] border border-zinc-200 overflow-hidden text-zinc-950">
                    <div className="grid grid-cols-3 divide-x divide-zinc-200/50">
                      {[
                        { icon: <Clock className="w-4 h-4" />, title: 'Semana 1: Setup', days: '01-07', desc: 'Setup de Dados e Integração de APIs.' },
                        { icon: <Rocket className="w-4 h-4" />, title: 'Semana 2: Launch', days: '08-15', desc: 'Ativação das Campanhas Públicas.' },
                        { icon: <TrendingUp className="w-4 h-4" />, title: 'Semana 3-4: Scale', days: '16-30', desc: 'Otimização de Custos e Escala de ROI.' }
                      ].map((step, i) => (
                        <div key={i} className="p-6 relative group overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 text-4xl font-black text-zinc-100 italic leading-none opacity-80 select-none">0{i + 1}</div>
                          <div className="bg-white p-2.5 rounded-xl w-fit mb-4 text-yellow-500 border border-zinc-200 flex items-center justify-center">
                            {React.cloneElement(step.icon as React.ReactElement, { strokeWidth: 2.5 })}
                          </div>
                          <div className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                            Dia {step.days}
                          </div>
                          <h4 className="text-[15px] font-black italic uppercase tracking-tighter mb-1.5 text-zinc-900 leading-none">{step.title}</h4>
                          <p className="text-[9px] font-bold text-zinc-500 leading-snug uppercase tracking-tight">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Banner de Fechamento P2 */}
                <div className="bg-yellow-400 p-4 rounded-xl text-black flex items-center justify-between border border-yellow-500 shrink-0">
                  <p className="text-[11px] font-black italic uppercase tracking-tight leading-snug max-w-lg">
                    "Esta proposta garante sua vaga no ciclo de {getNextCycleDate()}.<br />
                    Devido ao acompanhamento individualizado, nossa capacidade é limitada."
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    className="bg-black text-white px-6 py-3 rounded-lg font-black uppercase text-[9px] tracking-widest no-print"
                  >
                    Falar com Consultor
                  </a>
                </div>
              </div>

              {/* Footer P2 */}
              <div className="px-12 py-8 border-t border-zinc-100 flex justify-center items-center italic font-bold text-[9px] text-zinc-400 uppercase tracking-widest shrink-0">
                <span>LoopFlow © {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Page Header — padrão unificado */}
      <div className="mb-8 pb-6 border-b border-zinc-900">
        <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">Calculadora de Escala</h1>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Simule o retorno financeiro da operação</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Seção 1: Operação */}
          <section className="space-y-6">
            <h3 className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] border-l-2 border-yellow-400 pl-4">01. Dados da Operação</h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-yellow-400" />
                  Localidade (Raio de Atendimento)
                </label>
                <input
                  type="text"
                  value={localidade}
                  onChange={e => setLocalidade(e.target.value)}
                  placeholder="Ex: São Paulo - Pinheiros"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <ShoppingBag className="w-3 h-3 text-yellow-400" />
                  {orderLabel}
                </label>
                <input
                  type="number"
                  value={pedidosAtuais || ''}
                  onChange={e => setPedidosAtuais(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <DollarSign className="w-3 h-3 text-yellow-400" />
                  {ticketLabel}
                </label>
                <input
                  type="number"
                  value={ticketMedio || ''}
                  onChange={e => setTicketMedio(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Target className="w-3 h-3 text-yellow-400" />
                  {capacityLabel}
                </label>
                <input
                  type="number"
                  value={capacidadeOperacional || ''}
                  onChange={e => setCapacidadeOperacional(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Percent className="w-3 h-3 text-yellow-400" />
                  {marginLabel}
                </label>
                <input
                  type="number"
                  value={margemProduto || ''}
                  onChange={e => setMargemProduto(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
              {canalPrincipal === 'marketplace' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Percent className="w-3 h-3 text-yellow-400" />
                    Taxa Marketplace / Intermediação (%)
                  </label>
                  <input
                    type="number"
                    value={taxaMarketplace || ''}
                    onChange={e => setTaxaMarketplace(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Seção 2: Estratégia e Edição de Valores */}
          <section className="space-y-6">
            <h3 className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] border-l-2 border-yellow-400 pl-4">02. Estratégia & Investimento</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <DollarSign className="w-3 h-3 text-yellow-400" />
                  Fee de Gestão (R$)
                </label>
                <input
                  type="number"
                  value={baseFee || ''}
                  onChange={e => setBaseFee(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-yellow-400" />
                  Verba de Mídia / Ad Spend (R$)
                </label>
                <input
                  type="number"
                  value={adSpend || ''}
                  onChange={e => setAdSpend(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:border-yellow-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {(['conservador', 'realista', 'agressivo'] as Scenario[]).map(s => (
                <button
                  key={s}
                  onClick={() => handleScenarioChange(s)}
                  className={`p-6 rounded-3xl border-2 transition-all text-left ${scenario === s ? 'border-yellow-400 bg-yellow-400/5' : 'border-zinc-800 hover:border-zinc-700'}`}
                >
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${scenario === s ? 'text-yellow-400' : 'text-zinc-600'}`}>{s}</div>
                  <div className="text-xl font-black text-white italic uppercase tracking-tighter">
                    {s === 'conservador' && 'R$ 2.000'}
                    {s === 'realista' && 'R$ 4.500'}
                    {s === 'agressivo' && 'R$ 9.000'}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Seção 3: Ativos Extras */}
          <section className="space-y-6">
            <h3 className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] border-l-2 border-yellow-400 pl-4">03. Ativos e Aceleração</h3>
            <div className="grid grid-cols-1 gap-4">
              {RESOURCES.map(res => (
                <div
                  key={res.id}
                  onClick={() => toggleResource(res.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${selectedResources.includes(res.id) ? 'border-yellow-400 bg-yellow-400/5' : 'border-zinc-900 bg-zinc-900/40 hover:border-zinc-800'}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedResources.includes(res.id) ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                      {res.id === 'whatsapp' && <Smartphone className="w-6 h-6" />}
                      {res.id === 'creative' && <Zap className="w-6 h-6" />}
                      {res.id === 'retention' && <Target className="w-6 h-6" />}
                      {res.id === 'api' && <Calculator className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="font-black text-lg italic uppercase tracking-tight text-white">{res.label}</div>
                      <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">{res.desc}</div>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-xl font-black text-yellow-400 italic">{formatCurrency(res.price)}</div>
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Ativação Única</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar de Resumo */}
        <div className="space-y-6 print:hidden">
          <div className="sticky top-12 bg-zinc-900 rounded-[40px] p-10 border border-zinc-800 shadow-2xl space-y-8">
            <div className="space-y-2">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Resumo Estratégico</div>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white">ROI PROJETADO</h4>
            </div>

            <div className="space-y-4">
              {/* ROI / CPA Highlight */}
              <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 flex justify-between items-end">
                <div>
                  <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">
                    {isFood || isEcom ? "ROAS Estimado" : isLocal ? "CPL Estimado" : "Custo por Reunião"}
                  </div>
                  <div className="text-3xl font-black italic text-white flex items-baseline leading-none">
                    {isFood || isEcom ? (
                      <>
                        {(metrics.faturamentoProjetado / adSpend).toFixed(1)}
                        <span className="text-zinc-600 text-sm ml-1">x</span>
                      </>
                    ) : (
                      formatCurrency((metrics.cacEstimado.min + metrics.cacEstimado.max) / 2)
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Retorno Projetado</div>
                  <div className="text-xs font-black text-yellow-400 uppercase">
                    {isFood || isEcom ? "ROAS Elevado" : isLocal ? "CPL Eficiente" : "SQL Qualificado"}
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Faturamento Adicional</span>
                  <span className="font-black text-lg italic text-white">{formatCurrency(metrics.faturamentoProjetado)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Investimento Setup (Único)</span>
                  <span className="font-black text-lg italic text-white">{formatCurrency(metrics.totalSetupUnico)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Recorrência Fee+Mídia</span>
                  <span className="font-black text-lg italic text-white">{formatCurrency(metrics.totalRecorrenteMensal)}</span>
                </div>

                <div className="bg-zinc-800/40 p-4 rounded-2xl flex flex-col space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-bold uppercase text-[8px] tracking-[0.2em]">Custo Total Mês 01</span>
                    <span className="font-black text-lg italic text-white">{formatCurrency(metrics.totalSetupUnico + metrics.totalRecorrenteMensal)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-700/50">
                    <span className="text-yellow-400 font-black uppercase text-[8px] tracking-[0.2em]">Custo Mensal (Mês 02+)</span>
                    <span className="font-black text-lg italic text-yellow-400">{formatCurrency(metrics.totalRecorrenteMensal)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400 p-8 rounded-3xl shadow-[0_20px_40px_rgba(250,204,21,0.15)] transform hover:scale-[1.02] transition-transform">
                <div className="text-[10px] font-black text-black/60 uppercase tracking-[0.2em] mb-1">Lucro Líquido Extra</div>
                <div className="text-4xl font-black italic text-black leading-none">
                  {formatCurrency(metrics.lucroExtraEstimado > 0 ? metrics.lucroExtraEstimado : 0)}
                </div>
                <div className="mt-3 text-[8px] font-black text-black/40 uppercase tracking-widest">Projeção conservadora baseada em benchmarks</div>
              </div>
            </div>

            <button
              onClick={() => setIsProposalVisible(true)}
              disabled={ticketMedio === 0}
              className={`w-full font-black py-6 rounded-2xl uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(250,204,21,0.2)] transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-3 ${ticketMedio === 0 ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300 text-black'}`}
            >
              <span>Gerar Proposta Final</span>
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
