import React, { useState, useEffect } from 'react';
import { ProspectData } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  ChevronLeftIcon,
  ArrowUpRight01Icon, 
  ArrowDownRight01Icon, 
  EyeIcon, 
  File01Icon, 
  AnalyticsUpIcon, 
  Dollar01Icon, 
  Activity01Icon, 
  SlidersHorizontalIcon, 
  Idea01Icon, 
  Calendar01Icon, 
  Layers01Icon, 
  ArrowRight01Icon, 
  Share01Icon, 
  SmartPhone01Icon, 
  ComputerIcon, 
  Target01Icon, 
  FlashIcon, 
  Alert01Icon, 
  HelpCircleIcon, 
  SparklesIcon, 
  ArrowDown01Icon, 
  Maximize01Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  Award01Icon,
  FilterIcon,
  ShoppingBag01Icon,
  Link01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons';

// Componentes utilitários de ícones do Hugeicons
const createHugeIcon = (icon: any) => (props: any) => (
  <HugeiconsIcon icon={icon} size={props.size || 20} className={props.className || ''} color={props.color || 'currentColor'} strokeWidth={props.strokeWidth || 1.5} />
);

const ChevronLeft = createHugeIcon(ChevronLeftIcon);
const ArrowUpRight = createHugeIcon(ArrowUpRight01Icon);
const ArrowDownRight = createHugeIcon(ArrowDownRight01Icon);
const Eye = createHugeIcon(EyeIcon);
const FileText = createHugeIcon(File01Icon);
const TrendingUp = createHugeIcon(AnalyticsUpIcon);
const DollarSign = createHugeIcon(Dollar01Icon);
const Activity = createHugeIcon(Activity01Icon);
const Sliders = createHugeIcon(SlidersHorizontalIcon);
const Lightbulb = createHugeIcon(Idea01Icon);
const Calendar = createHugeIcon(Calendar01Icon);
const Layers = createHugeIcon(Layers01Icon);
const ArrowRight = createHugeIcon(ArrowRight01Icon);
const Share = createHugeIcon(Share01Icon);
const Smartphone = createHugeIcon(SmartPhone01Icon);
const Monitor = createHugeIcon(ComputerIcon);
const Target = createHugeIcon(Target01Icon);
const Zap = createHugeIcon(FlashIcon);
const AlertTriangle = createHugeIcon(Alert01Icon);
const HelpCircle = createHugeIcon(HelpCircleIcon);
const Sparkles = createHugeIcon(SparklesIcon);
const ArrowDown = createHugeIcon(ArrowDown01Icon);
const Maximize2 = createHugeIcon(Maximize01Icon);
const ChevronDown = createHugeIcon(ChevronDownIcon);
const ChevronUp = createHugeIcon(ChevronUpIcon);
const Award = createHugeIcon(Award01Icon);
const Filter = createHugeIcon(FilterIcon);
const ShoppingBag = createHugeIcon(ShoppingBag01Icon);
const LinkIcon = createHugeIcon(Link01Icon);
const X = createHugeIcon(Cancel01Icon);

interface PerformanceDashboardProps {
  prospect: ProspectData;
  onBack: () => void;
  isClientView?: boolean;
  initialData?: MonthData[];
  theme?: 'light' | 'dark';
}

export interface FunnelStepConfig {
  label: string;
  volumeKey: string;
  costLabel: string;
  costKey: string;
  costFormat?: string;
}

export interface FunnelTemplate {
  id: string;
  label: string;
  steps: FunnelStepConfig[];
}

export const FUNNEL_TEMPLATES: Record<string, FunnelTemplate> = {
  ecommerce: {
    id: 'ecommerce',
    label: 'E-Commerce / Varejo',
    steps: [
      { label: 'Impressões', volumeKey: 'impressões', costLabel: 'CPM', costKey: 'cpm', costFormat: 'currency' },
      { label: 'Cliques no Link', volumeKey: 'clicks', costLabel: 'Custo/Clique', costKey: 'cpc', costFormat: 'currency' },
      { label: 'Page View', volumeKey: 'lpViews', costLabel: 'Custo/Page View', costKey: 'custoLpView', costFormat: 'currency' },
      { label: 'View Item', volumeKey: 'viewItem', costLabel: 'Custo/View Item', costKey: 'custoViewItem', costFormat: 'currency' },
      { label: 'Add to Cart', volumeKey: 'addToCart', costLabel: 'Custo/Add to Cart', costKey: 'custoAddToCart', costFormat: 'currency' },
      { label: 'Iniciou Checkout', volumeKey: 'checkout', costLabel: 'Custo/Iniciou Checkout', costKey: 'custoCheckout', costFormat: 'currency' },
      { label: 'Compras', volumeKey: 'compras', costLabel: 'Custo/Compra (CPA)', costKey: 'cpa', costFormat: 'currency' }
    ]
  },
  delivery: {
    id: 'delivery',
    label: 'Restaurante & Delivery',
    steps: [
      { label: 'Alcance', volumeKey: 'alcance', costLabel: 'CPM', costKey: 'cpm', costFormat: 'currency' },
      { label: 'Impressões', volumeKey: 'impressões', costLabel: 'Frequência', costKey: 'frequencia', costFormat: 'number' },
      { label: 'Cliques no Link', volumeKey: 'clicks', costLabel: 'Custo/Clique', costKey: 'cpc', costFormat: 'currency' },
      { label: 'Visualizou Cardápio', volumeKey: 'lpViews', costLabel: 'Custo/Cardápio', costKey: 'custoLpView', costFormat: 'currency' },
      { label: 'Adicionou ao Carrinho', volumeKey: 'addToCart', costLabel: 'Custo/Carrinho', costKey: 'custoAddToCart', costFormat: 'currency' },
      { label: 'Iniciou Pedido', volumeKey: 'checkout', costLabel: 'Custo/Checkout', costKey: 'custoCheckout', costFormat: 'currency' },
      { label: 'Pedidos Fechados', volumeKey: 'compras', costLabel: 'Custo por Pedido (CPA)', costKey: 'cpa', costFormat: 'currency' }
    ]
  },
  local: {
    id: 'local',
    label: 'Negócio Local & Clínicas',
    steps: [
      { label: 'Impressões', volumeKey: 'impressões', costLabel: 'CPM', costKey: 'cpm', costFormat: 'currency' },
      { label: 'Alcance', volumeKey: 'alcance', costLabel: 'Frequência', costKey: 'frequencia', costFormat: 'number' },
      { label: 'Cliques no Link', volumeKey: 'clicks', costLabel: 'Custo/Clique', costKey: 'cpc', costFormat: 'currency' },
      { label: 'Landing Page Views', volumeKey: 'lpViews', costLabel: 'Custo/LP View', costKey: 'custoLpView', costFormat: 'currency' },
      { label: 'Inícios Zap / Leads', volumeKey: 'leads', costLabel: 'CPL', costKey: 'cpl', costFormat: 'currency' },
      { label: 'Agendamentos Realizados', volumeKey: 'propostas', costLabel: 'Custo/Agendamento', costKey: 'custoAgendamento', costFormat: 'currency' },
      { label: 'Pacientes / Clientes Atendidos', volumeKey: 'compras', costLabel: 'CAC', costKey: 'cpa', costFormat: 'currency' }
    ]
  },
  b2b: {
    id: 'b2b',
    label: 'B2B & Vendas Consultivas',
    steps: [
      { label: 'Impressões', volumeKey: 'impressões', costLabel: 'CPM', costKey: 'cpm', costFormat: 'currency' },
      { label: 'Cliques no Link', volumeKey: 'clicks', costLabel: 'Custo/Clique', costKey: 'cpc', costFormat: 'currency' },
      { label: 'Visitas LP', volumeKey: 'lpViews', costLabel: 'Custo/Visita LP', costKey: 'custoLpView', costFormat: 'currency' },
      { label: 'Leads MQL', volumeKey: 'leads', costLabel: 'CPL', costKey: 'cpl', costFormat: 'currency' },
      { label: 'Reunião Agendada', volumeKey: 'qualificados', costLabel: 'Custo/Reunião', costKey: 'custoReuniao', costFormat: 'currency' },
      { label: 'Propostas Comerciais', volumeKey: 'propostas', costLabel: 'Custo/Proposta', costKey: 'custoProposta', costFormat: 'currency' },
      { label: 'Contratos Fechados', volumeKey: 'compras', costLabel: 'CAC', costKey: 'cpa', costFormat: 'currency' }
    ]
  },
  infoproduto: {
    id: 'infoproduto',
    label: 'Lançamento & Infoprodutos',
    steps: [
      { label: 'Impressões', volumeKey: 'impressões', costLabel: 'CPM', costKey: 'cpm', costFormat: 'currency' },
      { label: 'Cliques no Link', volumeKey: 'clicks', costLabel: 'Custo/Clique', costKey: 'cpc', costFormat: 'currency' },
      { label: 'Inscrições (Leads)', volumeKey: 'leads', costLabel: 'CPL', costKey: 'cpl', costFormat: 'currency' },
      { label: 'Participantes Live / CPL', volumeKey: 'qualificados', costLabel: 'Custo/Participante', costKey: 'custoParticipante', costFormat: 'currency' },
      { label: 'Página de Vendas Views', volumeKey: 'lpViews', costLabel: 'Custo/PV View', costKey: 'custoLpView', costFormat: 'currency' },
      { label: 'Iniciou Checkout', volumeKey: 'checkout', costLabel: 'Custo/Checkout', costKey: 'custoCheckout', costFormat: 'currency' },
      { label: 'Alunos / Compras', volumeKey: 'compras', costLabel: 'CPA (Custo/Aluno)', costKey: 'cpa', costFormat: 'currency' }
    ]
  }
};

export interface MonthData {
  month: string;
  yearCurrent: number;
  yearPrev: number;
  metrics: {
    cpm: { current: number; prev: number };
    cpc: { current: number; prev: number };
    cpl: { current: number; prev: number };
    cpa: { current: number; prev: number };
    compras: { current: number; prev: number };
    roas: { current: number; prev: number };
    mensagens: { current: number; prev: number };
    leads: { current: number; prev: number };
    valorUsado: { current: number; prev: number };
    engajamento: { current: number; prev: number };
    vendas: { current: number; prev: number };
    ticketMedio: { current: number; prev: number };
    faturamento: { current: number; prev: number };
    fee: { current: number; prev: number };
  };
}

export const getDefaultMonthsBySegment = (segment: string): MonthData[] => {
  const s = segment.toLowerCase();
  const isFood = s.includes('delivery') || s.includes('restaurante');
  const isEcom = s.includes('commerce') || s.includes('varejo') || s.includes('loja');
  const isLocal = s.includes('local') || s.includes('clínica') || s.includes('serviço') || s.includes('clinica');

  const monthsList = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  
  // Benchmarks por nicho
  let config = {
    cpmBase: 18,
    cpcBase: 0.68,
    cplBase: 56,
    cpaBase: 4700,
    roasBase: 1.4,
    ticketBase: 7000,
    valorBase: 120000,
    comprasBase: 25,
    feeBase: 2000
  };

  if (isFood) {
    config = {
      cpmBase: 16,
      cpcBase: 0.55,
      cplBase: 3,
      cpaBase: 14,
      roasBase: 5.8,
      ticketBase: 65,
      valorBase: 5000,
      comprasBase: 350,
      feeBase: 2000
    };
  } else if (isEcom) {
    config = {
      cpmBase: 22,
      cpcBase: 1.1,
      cplBase: 7,
      cpaBase: 25,
      roasBase: 4.2,
      ticketBase: 180,
      valorBase: 8000,
      comprasBase: 320,
      feeBase: 2500
    };
  } else if (isLocal) {
    config = {
      cpmBase: 18,
      cpcBase: 1.4,
      cplBase: 11,
      cpaBase: 55,
      roasBase: 3.2,
      ticketBase: 250,
      valorBase: 4000,
      comprasBase: 72,
      feeBase: 2000
    };
  }

  // Variações de crescimento e sazonalidade nos 6 meses
  const variations = [
    { spendMult: 0.85, perfMult: 0.90 }, // Jan
    { spendMult: 0.95, perfMult: 0.95 }, // Fev
    { spendMult: 1.05, perfMult: 1.00 }, // Mar
    { spendMult: 1.10, perfMult: 1.05 }, // Abr
    { spendMult: 1.20, perfMult: 1.15 }, // Mai
    { spendMult: 1.30, perfMult: 1.25 }  // Jun
  ];

  return monthsList.map((month, idx) => {
    const v = variations[idx];
    
    // Ano Atual (2026)
    const valorCurrent = Math.round(config.valorBase * v.spendMult);
    const cpmCurrent = Number((config.cpmBase * (1 + (idx * 0.05))).toFixed(2));
    const cpcCurrent = Number((config.cpcBase * (1 + (idx * 0.03))).toFixed(2));
    
    let comprasCurrent = 0;
    let leadsCurrent = 0;
    let mensagensCurrent = Math.round((valorCurrent / cpcCurrent) * 0.15); // 15% CTR p/ Whats
    
    if (isFood || isEcom) {
      const currentCpa = config.cpaBase / v.perfMult;
      comprasCurrent = Math.round(valorCurrent / currentCpa);
      leadsCurrent = Math.round(comprasCurrent * 1.5);
    } else {
      const currentCpl = config.cplBase / v.perfMult;
      leadsCurrent = Math.round(valorCurrent / currentCpl);
      comprasCurrent = Math.round(leadsCurrent * (isLocal ? 0.18 : 0.15));
    }

    const ticketCurrent = Math.round(config.ticketBase * (1 + (idx * 0.02)));
    const faturamentoCurrent = comprasCurrent * ticketCurrent;
    const roasCurrent = Number((faturamentoCurrent / valorCurrent).toFixed(2));
    const cplCurrent = leadsCurrent > 0 ? Number((valorCurrent / leadsCurrent).toFixed(2)) : config.cplBase;
    const cpaCurrent = comprasCurrent > 0 ? Number((valorCurrent / comprasCurrent).toFixed(2)) : config.cpaBase;

    // Ano Anterior (2025)
    const valorPrev = Math.round(valorCurrent * 0.75);
    const cpmPrev = Number((cpmCurrent * 0.85).toFixed(2));
    const cpcPrev = Number((cpcCurrent * 0.85).toFixed(2));
    const comprasPrev = Math.round(comprasCurrent * 0.6);
    const leadsPrev = Math.round(leadsCurrent * 0.65);
    const ticketPrev = Math.round(ticketCurrent * 0.9);
    const faturamentoPrev = comprasPrev * ticketPrev;
    const roasPrev = Number((faturamentoPrev / valorPrev).toFixed(2));
    const cplPrev = leadsPrev > 0 ? Number((valorPrev / leadsPrev).toFixed(2)) : config.cplBase * 1.1;
    const cpaPrev = comprasPrev > 0 ? Number((valorPrev / comprasPrev).toFixed(2)) : config.cpaBase * 1.15;
    const mensagensPrev = Math.round(mensagensCurrent * 0.7);

    return {
      month,
      yearCurrent: 2026,
      yearPrev: 2025,
      metrics: {
        cpm: { current: cpmCurrent, prev: cpmPrev },
        cpc: { current: cpcCurrent, prev: cpcPrev },
        cpl: { current: cplCurrent, prev: cplPrev },
        cpa: { current: cpaCurrent, prev: cpaPrev },
        compras: { current: comprasCurrent, prev: comprasPrev },
        roas: { current: roasCurrent, prev: roasPrev },
        mensagens: { current: mensagensCurrent, prev: mensagensPrev },
        leads: { current: leadsCurrent, prev: leadsPrev },
        valorUsado: { current: valorCurrent, prev: valorPrev },
        engajamento: { current: Math.round(mensagensCurrent * 5), prev: Math.round(mensagensPrev * 4.5) },
        vendas: { current: comprasCurrent, prev: comprasPrev },
        ticketMedio: { current: ticketCurrent, prev: ticketPrev },
        faturamento: { current: faturamentoCurrent, prev: faturamentoPrev },
        fee: { current: config.feeBase, prev: config.feeBase }
      }
    };
  });
};

const getMonthOverlapDays = (year: number, monthIdx: number, start: Date, end: Date): number => {
  const monthStart = new Date(year, monthIdx, 1);
  const monthEnd = new Date(year, monthIdx + 1, 0);
  
  const overlapStart = new Date(Math.max(monthStart.getTime(), start.getTime()));
  const overlapEnd = new Date(Math.min(monthEnd.getTime(), end.getTime()));
  
  if (overlapStart > overlapEnd) return 0;
  
  const diffTime = overlapEnd.getTime() - overlapStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

const getMonthTotalDays = (year: number, monthIdx: number): number => {
  return new Date(year, monthIdx + 1, 0).getDate();
};

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  prospect,
  onBack,
  isClientView = false,
  initialData,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';
  const [months, setMonths] = useState<MonthData[]>([]);
  const [copied, setCopied] = useState(false);
  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
  };
  const [activeYear, setActiveYear] = useState<'current' | 'prev'>('current');
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(5); // Junho por padrão
  const [comparePeriods, setComparePeriods] = useState(true);
  const [isSynced, setIsSynced] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

  // Estados para Filtro de Data Meta-style
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-06-30');
  const [localStart, setLocalStart] = useState<string>('2026-01-01');
  const [localEnd, setLocalEnd] = useState<string>('2026-06-30');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [presetSelected, setPresetSelected] = useState<string>('este_ano');

  const getInitialTemplateId = (segment: string): string => {
    const s = (segment || '').toLowerCase();
    if (s.includes('delivery') || s.includes('restaurante')) return 'delivery';
    if (s.includes('local') || s.includes('clínica') || s.includes('serviço') || s.includes('clinica')) return 'local';
    if (s.includes('b2b') || s.includes('consultiv')) return 'b2b';
    if (s.includes('info') || s.includes('lançamento') || s.includes('curso')) return 'infoproduto';
    return 'ecommerce';
  };

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => getInitialTemplateId(prospect.segment));

  const selectPreset = (presetKey: string) => {
    setPresetSelected(presetKey);
    let start = '2026-01-01';
    let end = '2026-06-30';
    if (presetKey === 'maximo') {
      start = '2025-01-01';
      end = '2026-06-30';
    } else if (presetKey === 'este_ano') {
      start = '2026-01-01';
      end = '2026-06-30';
    } else if (presetKey === 'ano_passado') {
      start = '2025-01-01';
      end = '2025-12-31';
    } else if (presetKey === 'ultimos_7') {
      start = '2026-06-24';
      end = '2026-06-30';
    } else if (presetKey === 'ultimos_30') {
      start = '2026-06-01';
      end = '2026-06-30';
    } else if (presetKey === 'trimestre') {
      start = '2026-04-01';
      end = '2026-06-30';
    }
    setLocalStart(start);
    setLocalEnd(end);
    setStartDate(start);
    setEndDate(end);
  };

  const aggregateMetricsForRange = (startStr: string, endStr: string, isComparisonShifted = false) => {
    let start = new Date(startStr + 'T00:00:00');
    let end = new Date(endStr + 'T00:00:00');

    if (isComparisonShifted) {
      start.setFullYear(start.getFullYear() - 1);
      end.setFullYear(end.getFullYear() - 1);
    }

    let valorUsado = 0;
    let faturamento = 0;
    let fee = 0;
    let compras = 0;
    let leads = 0;
    let mensagens = 0;
    let engajamento = 0;

    months.forEach((m, idx) => {
      // 2026
      const overlap2026 = getMonthOverlapDays(2026, idx, start, end);
      if (overlap2026 > 0) {
        const frac = overlap2026 / getMonthTotalDays(2026, idx);
        valorUsado += m.metrics.valorUsado.current * frac;
        faturamento += m.metrics.faturamento.current * frac;
        fee += m.metrics.fee.current * frac;
        compras += m.metrics.compras.current * frac;
        leads += m.metrics.leads.current * frac;
        mensagens += m.metrics.mensagens.current * frac;
        engajamento += m.metrics.engajamento.current * frac;
      }

      // 2025
      const overlap2025 = getMonthOverlapDays(2025, idx, start, end);
      if (overlap2025 > 0) {
        const frac = overlap2025 / getMonthTotalDays(2025, idx);
        valorUsado += m.metrics.valorUsado.prev * frac;
        faturamento += m.metrics.faturamento.prev * frac;
        fee += m.metrics.fee.prev * frac;
        compras += m.metrics.compras.prev * frac;
        leads += m.metrics.leads.prev * frac;
        mensagens += m.metrics.mensagens.prev * frac;
        engajamento += m.metrics.engajamento.prev * frac;
      }
    });

    const safeDiv = (num: number, den: number, mult = 1) => (den > 0 ? (num / den) * mult : 0);

    // CPC e CPM estimados com base nos dados agregados
    const totalCpc = safeDiv(valorUsado, mensagens * 5); // Cliques estimados ~ 5 * mensagens
    const totalCpm = 20; // CPM médio benchmark

    const lpViews = (valorUsado / (totalCpc || 0.8)) * 0.88;
    const impressoes = (valorUsado / totalCpm) * 1000;
    const alcance = impressoes * 0.85;
    const roas = safeDiv(faturamento, valorUsado);
    const roi = safeDiv(faturamento - valorUsado - fee, valorUsado, 100);
    const cpa = safeDiv(valorUsado, compras);
    const cac = safeDiv(valorUsado + fee, compras);
    const cpl = safeDiv(valorUsado, leads);

    return {
      valorUsado,
      valorUsadoMeta: valorUsado * 0.75,
      faturamento,
      receita: faturamento,
      fee,
      compras: Math.round(compras),
      vendas: Math.round(compras),
      leads: Math.round(leads),
      mensagens: Math.round(mensagens),
      engajamento: Math.round(engajamento),
      impressões: Math.round(impressoes),
      alcance: Math.round(alcance),
      frequencia: 1.18,
      clicks: Math.round(valorUsado / (totalCpc || 0.8)),
      ctr: safeDiv(valorUsado / (totalCpc || 0.8), impressoes, 100),
      cpm: totalCpm,
      cpc: totalCpc || 0.8,
      cpl,
      cpa,
      cac,
      roas,
      roi,
      ticketMedio: safeDiv(faturamento, compras),
      lpViews: Math.round(lpViews),
      custoLpView: safeDiv(valorUsado, lpViews),
      custoMensagem: safeDiv(valorUsado, mensagens),
      custoEngajamento: safeDiv(valorUsado, engajamento),
      qualificados: Math.round(leads * 0.70),
      propostas: Math.round(leads * 0.70 * 0.50),
      txCliqueLead: safeDiv(leads, valorUsado / (totalCpc || 0.8), 100),
      txLpLead: safeDiv(leads, lpViews, 100),
      txLeadVenda: safeDiv(compras, leads, 100),
      txPropostaVenda: safeDiv(compras, Math.round(leads * 0.70 * 0.50), 100),
      lucroBruto: faturamento - valorUsado - fee,
      lucroLiquido: faturamento - valorUsado - fee - (faturamento * 0.05),
      margem: safeDiv(faturamento - valorUsado - fee, faturamento, 100),
      custosExtras: faturamento * 0.05
    };
  };

  const currentRangeMetrics = aggregateMetricsForRange(startDate, endDate, false);
  const prevRangeMetrics = aggregateMetricsForRange(startDate, endDate, true);

  const isCustomRangeActive = presetSelected !== 'este_ano' || startDate !== '2026-01-01' || endDate !== '2026-06-30';


  // Accordions da Tabela
  const [openSections, setOpenSections] = useState({
    topo: true,
    engajamento: true,
    leads: true,
    conversao: true,
    financeiro: true
  });

  // Estado para Modal de Histórico de Métricas da Etapa do Funil
  const [selectedStageModal, setSelectedStageModal] = useState<'geral' | 'topo' | 'meio' | 'fundo' | 'fin' | null>(null);

  // Filtro de Métricas do Gráfico de Evolução & Tooltip Interativo
  const [chartMetricFilter, setChartMetricFilter] = useState<'investimento_receita' | 'roas_cpl' | 'leads_vendas'>('investimento_receita');
  const [hoveredChartMonth, setHoveredChartMonth] = useState<number | null>(null);

  // Parser de CSV do Sheets (Formato Vertical)
  const parseGoogleSheetsCSV = (csvText: string): MonthData[] => {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("Planilha vazia ou inválida.");

    const separator = lines[0].includes(';') ? ';' : ',';
    const cleanSplit = (line: string) => {
      return line.split(separator).map(val => val.trim().replace(/^["']|["']$/g, ''));
    };

    const headers = cleanSplit(lines[0]).map(h => h.toLowerCase().replace(/\s/g, ''));
    
    const headerMap: { [key: string]: keyof MonthData['metrics'] } = {
      cpm: 'cpm', cpc: 'cpc', cpl: 'cpl', cpa: 'cpa', compras: 'compras', roas: 'roas',
      mensagens: 'mensagens', leads: 'leads', valorusado: 'valorUsado', investimento: 'valorUsado',
      engajamento: 'engajamento', vendas: 'vendas', ticketmedio: 'ticketMedio', faturamento: 'faturamento', fee: 'fee'
    };

    const monthMap: { [key: string]: string } = {
      jan: 'Jan', fev: 'Fev', mar: 'Mar', abr: 'Abr', mai: 'Mai', jun: 'Jun',
      jul: 'Jul', ago: 'Ago', set: 'Set', out: 'Out', nov: 'Nov', dez: 'Dez'
    };

    const monthsTemp: { [monthName: string]: MonthData } = {};
    const parseValue = (valStr: string): number => {
      if (!valStr) return 0;
      const clean = valStr.replace(/[R$\s%x]/gi, '').replace(/\./g, '').replace(',', '.');
      return parseFloat(clean) || 0;
    };

    for (let j = 1; j < lines.length; j++) {
      const cols = cleanSplit(lines[j]);
      if (cols.length === 0 || !cols[0]) continue;

      const mesAnoStr = cols[0].toLowerCase();
      let detectedMonth = 'Jan';
      let found = false;
      for (const key in monthMap) {
        if (mesAnoStr.includes(key)) {
          detectedMonth = monthMap[key];
          found = true;
          break;
        }
      }
      if (!found) continue;

      let yearType: 'current' | 'prev' = 'current';
      if (mesAnoStr.includes('25') || mesAnoStr.includes('2025')) {
        yearType = 'prev';
      }

      if (!monthsTemp[detectedMonth]) {
        monthsTemp[detectedMonth] = {
          month: detectedMonth,
          yearCurrent: 2026,
          yearPrev: 2025,
          metrics: {
            cpm: { current: 0, prev: 0 }, cpc: { current: 0, prev: 0 }, cpl: { current: 0, prev: 0 },
            cpa: { current: 0, prev: 0 }, compras: { current: 0, prev: 0 }, roas: { current: 0, prev: 0 },
            mensagens: { current: 0, prev: 0 }, leads: { current: 0, prev: 0 }, valorUsado: { current: 0, prev: 0 },
            engajamento: { current: 0, prev: 0 }, vendas: { current: 0, prev: 0 }, ticketMedio: { current: 0, prev: 0 },
            faturamento: { current: 0, prev: 0 }, fee: { current: 0, prev: 0 }
          }
        };
      }

      for (let c = 1; c < cols.length; c++) {
        const colHeader = headers[c];
        const mappedMetric = headerMap[colHeader];
        if (mappedMetric) {
          monthsTemp[detectedMonth].metrics[mappedMetric][yearType] = parseValue(cols[c]);
        }
      }
    }

    const monthOrder = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const finalMonths: MonthData[] = [];
    monthOrder.forEach(m => {
      if (monthsTemp[m]) finalMonths.push(monthsTemp[m]);
    });

    return finalMonths;
  };

  const parseMetaInsights = (data: any[]): MonthData[] => {
    const monthMap: { [key: string]: string } = {
      '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
      '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez'
    };

    const tempMonths: { [key: string]: MonthData } = {};
    const activeMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    
    activeMonths.forEach(m => {
      tempMonths[m] = {
        month: m,
        yearCurrent: 2026,
        yearPrev: 2025,
        metrics: {
          cpm: { current: 15, prev: 15 },
          cpc: { current: 0.8, prev: 0.8 },
          cpl: { current: 0, prev: 0 },
          cpa: { current: 0, prev: 0 },
          compras: { current: 0, prev: 0 },
          roas: { current: 1.5, prev: 1.5 },
          mensagens: { current: 0, prev: 0 },
          leads: { current: 0, prev: 0 },
          valorUsado: { current: 0, prev: 0 },
          engajamento: { current: 0, prev: 0 },
          vendas: { current: 0, prev: 0 },
          ticketMedio: { current: 0, prev: 0 },
          faturamento: { current: 0, prev: 0 },
          fee: { current: 2000, prev: 2000 }
        }
      };
    });

    data.forEach((item: any) => {
      const dateParts = item.date_start.split('-');
      const year = parseInt(dateParts[0]);
      const monthCode = dateParts[1];
      const monthName = monthMap[monthCode];

      if (!monthName || !tempMonths[monthName]) return;

      const yearType: 'current' | 'prev' = year === 2025 ? 'prev' : 'current';
      const spend = parseFloat(item.spend) || 0;
      const impressions = parseFloat(item.impressions) || 0;
      const clicks = parseFloat(item.clicks) || 0;
      const cpc = parseFloat(item.cpc) || 0;
      const cpm = parseFloat(item.cpm) || 0;

      let messages = 0;
      let leads = 0;
      let purchases = 0;

      if (Array.isArray(item.actions)) {
        item.actions.forEach((act: any) => {
          const type = act.action_type;
          const val = parseInt(act.value) || 0;
          if (type.includes('messaging_first_reply') || type.includes('onsite_conversion.messaging_first_reply') || type === 'message') {
            messages += val;
          } else if (type === 'lead' || type.includes('onsite_conversion.lead')) {
            leads += val;
          } else if (type === 'purchase' || type.includes('purchase')) {
            purchases += val;
          }
        });
      }

      const currentMetrics = tempMonths[monthName].metrics;
      currentMetrics.valorUsado[yearType] = spend;
      currentMetrics.cpm[yearType] = cpm || (impressions > 0 ? (spend / impressions) * 1000 : 0);
      currentMetrics.cpc[yearType] = cpc || (clicks > 0 ? spend / clicks : 0);
      currentMetrics.mensagens[yearType] = messages;
      currentMetrics.leads[yearType] = leads;
      currentMetrics.compras[yearType] = purchases;
      currentMetrics.vendas[yearType] = purchases;

      currentMetrics.cpl[yearType] = leads > 0 ? spend / leads : 0;
      currentMetrics.cpa[yearType] = purchases > 0 ? spend / purchases : 0;
      
      let purchaseValue = 0;
      if (Array.isArray(item.action_values)) {
        item.action_values.forEach((actVal: any) => {
          if (actVal.action_type === 'purchase' || actVal.action_type.includes('purchase')) {
            purchaseValue += parseFloat(actVal.value) || 0;
          }
        });
      }
      
      currentMetrics.faturamento[yearType] = purchaseValue || (purchases * 5000);
      currentMetrics.ticketMedio[yearType] = purchases > 0 ? (purchaseValue || (purchases * 5000)) / purchases : 5000;
      currentMetrics.roas[yearType] = spend > 0 ? (purchaseValue || (purchases * 5000)) / spend : 2.0;
    });

    const finalMonths: MonthData[] = [];
    activeMonths.forEach(m => {
      finalMonths.push(tempMonths[m]);
    });

    return finalMonths;
  };

  useEffect(() => {
    if (initialData) {
      setMonths(initialData);
      return;
    }

    if (prospect.metaAdAccountId && prospect.metaAccessToken) {
      setSyncLoading(true);
      const cleanAccountId = prospect.metaAdAccountId.startsWith('act_') 
        ? prospect.metaAdAccountId 
        : `act_${prospect.metaAdAccountId}`;

      const url = `https://graph.facebook.com/v19.0/${cleanAccountId}/insights?fields=spend,impressions,clicks,cpc,cpm,actions,action_values&time_increment=monthly&time_range={"since":"2025-01-01","until":"2026-06-30"}&access_token=${prospect.metaAccessToken}`;

      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error("Erro na API da Meta");
          return res.json();
        })
        .then(json => {
          if (!json.data) throw new Error("Sem dados");
          const parsed = parseMetaInsights(json.data);
          setMonths(parsed);
          setIsSynced(true);
        })
        .catch(err => {
          console.error("Erro ao sincronizar com Meta Ads, usando backup local:", err);
          loadLocalBackup();
        })
        .finally(() => setSyncLoading(false));
    } else if (prospect.googleSheetsUrl) {
      setSyncLoading(true);
      fetch(prospect.googleSheetsUrl)
        .then(res => res.text())
        .then(csvText => {
          const parsed = parseGoogleSheetsCSV(csvText);
          setMonths(parsed);
          setIsSynced(true);
        })
        .catch(() => {
          loadLocalBackup();
        })
        .finally(() => setSyncLoading(false));
    } else {
      loadLocalBackup();
    }

    function loadLocalBackup() {
      const saved = localStorage.getItem(`loopflow_perf_${prospect.name.replace(/\s+/g, '_')}`);
      const defaultM = getDefaultMonthsBySegment(prospect.segment);
      if (saved) {
        try { setMonths(JSON.parse(saved)); } catch (e) { setMonths(defaultM); }
      } else {
        setMonths(defaultM);
      }
    }
  }, [prospect.name, prospect.googleSheetsUrl, prospect.metaAdAccountId, prospect.metaAccessToken, initialData]);

  const saveMonths = (updated: MonthData[]) => {
    setMonths(updated);
    if (!isClientView) {
      localStorage.setItem(`loopflow_perf_${prospect.name.replace(/\s+/g, '_')}`, JSON.stringify(updated));
    }
  };

  const handleCellChange = (monthIdx: number, key: string, yearType: 'current' | 'prev', value: string) => {
    const numeric = parseFloat(value) || 0;
    const updated = [...months];
    const targetKey = key as keyof MonthData['metrics'];
    if (updated[monthIdx].metrics[targetKey]) {
      updated[monthIdx].metrics[targetKey][yearType] = numeric;
      saveMonths(updated);
    }
  };

  // ----------------------------------------------------
  // FÓRMULAS DE CÁLCULO E DERIVAÇÃO DE MÉTRICAS
  // ----------------------------------------------------
  const getVal = (month: MonthData, key: string, yearType: 'current' | 'prev'): number => {
    if (!month) return 0;
    
    const used = month.metrics.valorUsado[yearType] || 0;
    const fat = month.metrics.faturamento[yearType] || 0;
    const fee = month.metrics.fee[yearType] || 0;
    const cpc = month.metrics.cpc[yearType] || 0.01;
    const cpm = month.metrics.cpm[yearType] || 1;
    const leads = month.metrics.leads[yearType] || 0;
    const msg = month.metrics.mensagens[yearType] || 0;
    const compras = month.metrics.compras[yearType] || 0;
    const ticket = month.metrics.ticketMedio[yearType] || 0;

    // Métricas Topo do Funil
    if (key === 'valorUsadoMeta') return used * 0.75;
    if (key === 'impressões') return (used / cpm) * 1000;
    if (key === 'alcance') return (used / cpm) * 1000 * 0.85;
    if (key === 'frequencia') return 1.18;
    if (key === 'cpm') return cpm;

    // Métricas Engajamento
    if (key === 'clicks') return used / cpc;
    if (key === 'ctr') {
      const imps = (used / cpm) * 1000;
      return imps > 0 ? ((used / cpc) / imps) * 100 : 0;
    }
    if (key === 'cpc') return cpc;
    if (key === 'engajamento') return month.metrics.engajamento[yearType] || 0;
    if (key === 'custoEngajamento') {
      const eng = month.metrics.engajamento[yearType] || 1;
      return used / eng;
    }
    if (key === 'lpViews') return (used / cpc) * 0.88; // 88% click-to-page-view rate
    if (key === 'custoLpView') {
      const lp = (used / cpc) * 0.88;
      return lp > 0 ? used / lp : 0;
    }

    // Geração de Leads
    if (key === 'mensagens') return msg;
    if (key === 'custoMensagem') return msg > 0 ? used / msg : 0;
    if (key === 'leads') return leads;
    if (key === 'cpl') return leads > 0 ? used / leads : 0;
    if (key === 'txCliqueLead') {
      const clk = used / cpc;
      return clk > 0 ? (leads / clk) * 100 : 0;
    }
    if (key === 'txLpLead') {
      const lp = (used / cpc) * 0.88;
      return lp > 0 ? (leads / lp) * 100 : 0;
    }

    // Conversão e Funil E-Commerce/Serviços
    if (key === 'viewItem') return Math.round((used / cpc) * 0.45);
    if (key === 'custoViewItem') {
      const vi = (used / cpc) * 0.45;
      return vi > 0 ? used / vi : 0;
    }
    if (key === 'addToCart') return Math.round((used / cpc) * 0.08);
    if (key === 'custoAddToCart') {
      const cart = (used / cpc) * 0.08;
      return cart > 0 ? used / cart : 0;
    }
    if (key === 'checkout') return Math.round((used / cpc) * 0.045);
    if (key === 'custoCheckout') {
      const chk = (used / cpc) * 0.045;
      return chk > 0 ? used / chk : 0;
    }
    if (key === 'custoAgendamento') {
      const prop = Math.round(leads * 0.70 * 0.50);
      return prop > 0 ? used / prop : 0;
    }
    if (key === 'custoReuniao') {
      const qual = Math.round(leads * 0.70);
      return qual > 0 ? used / qual : 0;
    }
    if (key === 'custoProposta') {
      const prop = Math.round(leads * 0.70 * 0.50);
      return prop > 0 ? used / prop : 0;
    }
    if (key === 'custoParticipante') {
      const qual = Math.round(leads * 0.70);
      return qual > 0 ? used / qual : 0;
    }

    if (key === 'qualificados') return Math.round(leads * 0.70);
    if (key === 'propostas') return Math.round(leads * 0.70 * 0.50);
    if (key === 'compras') return compras;
    if (key === 'vendas') return compras;
    if (key === 'cpa') return compras > 0 ? used / compras : 0;
    if (key === 'cac') return compras > 0 ? (used + fee) / compras : 0;
    if (key === 'txLeadVenda') return leads > 0 ? (compras / leads) * 100 : 0;
    if (key === 'txPropostaVenda') {
      const prop = Math.round(leads * 0.70 * 0.50);
      return prop > 0 ? (compras / prop) * 100 : 0;
    }

    // Financeiro
    if (key === 'ticketMedio') return ticket || (compras > 0 ? fat / compras : 0);
    if (key === 'receita') return fat;
    if (key === 'faturamento') return fat;
    if (key === 'roas') return month.metrics.roas[yearType] || (used > 0 ? fat / used : 0);
    if (key === 'roi') return used > 0 ? ((fat - used - fee) / used) * 100 : 0;
    if (key === 'lucroBruto') return fat - used - fee;
    if (key === 'lucroLiquido') return fat - used - fee - (fat * 0.05); // 5% custos extras
    if (key === 'margem') return fat > 0 ? ((fat - used - fee) / fat) * 100 : 0;
    if (key === 'fee') return fee;
    if (key === 'custosExtras') return fat * 0.05;

    return month.metrics[key as keyof MonthData['metrics']]?.[yearType] || 0;
  };

  const formatCell = (val: number, format: string) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    }
    if (format === 'multiplier') {
      return `${val.toFixed(2)}x`;
    }
    if (format === 'percent') {
      return `${val.toFixed(2)}%`;
    }
    return Math.round(val).toLocaleString('pt-BR');
  };

  const getVarPercent = (key: string, idx: number) => {
    const prev = getVal(months[idx], key, 'prev');
    const curr = getVal(months[idx], key, 'current');
    if (prev === 0) return 0;
    return ((curr - prev) / prev) * 100;
  };

  const getAverage = (key: string, yearType: 'current' | 'prev') => {
    if (months.length === 0) return 0;
    const sum = months.reduce((acc, m) => acc + getVal(m, key, yearType), 0);
    return sum / months.length;
  };

  const getAccumulated = (key: string, yearType: 'current' | 'prev') => {
    const avgKeys = ['cpm', 'cpc', 'cpl', 'cpa', 'roas', 'ctr', 'roi', 'margem', 'txCliqueLead', 'txLpLead', 'txLeadVenda', 'txPropostaVenda', 'frequencia', 'custoEngajamento', 'custoLpView', 'custoMensagem'];
    if (avgKeys.includes(key)) {
      return getAverage(key, yearType);
    }
    return months.reduce((acc, m) => acc + getVal(m, key, yearType), 0);
  };

  const getOverallVarPercent = (key: string) => {
    const prevVal = getAccumulated(key, 'prev');
    const currVal = getAccumulated(key, 'current');
    if (prevVal === 0) return 0;
    return ((currVal - prevVal) / prevVal) * 100;
  };

  const getSparklinePoints = (key: string, yearType: 'current' | 'prev', w = 50, h = 18) => {
    if (months.length < 2) return '';
    const vals = months.map(m => getVal(m, key, yearType));
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min === 0 ? 1 : max - min;

    return vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    }).join(' ');
  };

  const generateShareLink = () => {
    const dataObj = { p: prospect, m: months };
    const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(dataObj))));
    const shareableUrl = `${window.location.origin}${window.location.pathname}#/performance?d=${base64}`;
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const currentKey = activeYear;
  const selectedMonth = months[selectedMonthIdx] || null;

  // ----------------------------------------------------
  // INTELECTO / RECOMENDAÇÕES DA IA DINÂMICAS
  // ----------------------------------------------------
  const getIaRecommendations = () => {
    const cpcVar = prevRangeMetrics.cpc > 0 ? ((currentRangeMetrics.cpc - prevRangeMetrics.cpc) / prevRangeMetrics.cpc) * 100 : 0;
    const roasVar = prevRangeMetrics.roas > 0 ? ((currentRangeMetrics.roas - prevRangeMetrics.roas) / prevRangeMetrics.roas) * 100 : 0;
    const ctrVar = prevRangeMetrics.ctr > 0 ? ((currentRangeMetrics.ctr - prevRangeMetrics.ctr) / prevRangeMetrics.ctr) * 100 : 0;
    const cpaVar = prevRangeMetrics.cpa > 0 ? ((currentRangeMetrics.cpa - prevRangeMetrics.cpa) / prevRangeMetrics.cpa) * 100 : 0;

    const recs = [];
    if (cpcVar > 0) {
      recs.push(`O CPC aumentou ${cpcVar.toFixed(0)}%, porém o CTR também aumentou. Isso indica que seus anúncios continuam gerando engajamento saudável e qualificado.`);
    } else {
      recs.push(`O custo por clique (CPC) reduziu ${Math.abs(cpcVar).toFixed(0)}%, otimizando o fluxo de entrada de visitantes no funil.`);
    }
    if (roasVar > 0) {
      recs.push(`O ROAS aumentou mesmo com maior investimento de mídia, sinalizando eficiência de escala.`);
    } else {
      recs.push(`A taxa de conversão da Landing caiu. Considere revisar sua página e o tempo de carregamento.`);
    }
    if (cpaVar < 0) {
      recs.push(`O CPA caiu ${Math.abs(cpaVar).toFixed(0)}% neste período, sugerindo que a inteligência de público está no ponto ideal.`);
    } else {
      recs.push(`CPA acima do ideal. Recomenda-se rotacionar criativos antigos para combater a fadiga visual.`);
    }
    return recs;
  };

  // ----------------------------------------------------
  // CÁLCULO DINÂMICO DOS CORES DO FUNIL
  // ----------------------------------------------------
  const getFunnelScores = () => {
    const roas = currentRangeMetrics.roas;
    const ctr = currentRangeMetrics.ctr;
    
    const topo = Math.min(100, Math.round(80 + (ctr * 5)));
    const meio = Math.min(100, Math.round(82 + (roas * 3)));
    const fundo = Math.min(100, Math.round(88 + (roas * 2)));
    const fin = Math.min(100, Math.round(85 + (roas * 6)));
    const geral = Math.round((topo + meio + fundo + fin) / 4);

    return { geral, topo, meio, fundo, fin };
  };

  const scores = getFunnelScores();

  // Definição exata das linhas para a Tabela Executiva Detalhada
  const rowsConfig = {
    topo: [
      { key: 'valorUsado', label: 'Investimento', format: 'currency', meta: 'R$ 150.000' },
      { key: 'valorUsadoMeta', label: 'Valor Investido (Meta Ads)', format: 'currency', meta: 'R$ 100.000' },
      { key: 'impressões', label: 'Impressões', format: 'number', meta: '2.000.000' },
      { key: 'alcance', label: 'Alcance', format: 'number', meta: '1.500.000' },
      { key: 'frequencia', label: 'Frequência', format: 'number', meta: '1.20' },
      { key: 'cpm', label: 'CPM', format: 'currency', meta: 'R$ 20,00' }
    ],
    engajamento: [
      { key: 'clicks', label: 'Cliques', format: 'number', meta: '40.000' },
      { key: 'ctr', label: 'CTR', format: 'percent', meta: '2,00%' },
      { key: 'cpc', label: 'CPC', format: 'currency', meta: 'R$ 0,80' },
      { key: 'engajamento', label: 'Engajamento', format: 'number', meta: '5.000' },
      { key: 'custoEngajamento', label: 'Custo por Engajamento', format: 'currency', meta: 'R$ 0,10' },
      { key: 'lpViews', label: 'Landing Page Views', format: 'number', meta: '35.000' },
      { key: 'custoLpView', label: 'Custo por LP View', format: 'currency', meta: 'R$ 0,90' }
    ],
    leads: [
      { key: 'mensagens', label: 'Mensagens', format: 'number', meta: '500' },
      { key: 'custoMensagem', label: 'Custo por Mensagem', format: 'currency', meta: 'R$ 8,00' },
      { key: 'leads', label: 'Leads', format: 'number', meta: '120' },
      { key: 'cpl', label: 'CPL', format: 'currency', meta: 'R$ 50,00' },
      { key: 'txCliqueLead', label: 'Taxa Clique ➔ Lead', format: 'percent', meta: '5,00%' },
      { key: 'txLpLead', label: 'Taxa LP ➔ Lead', format: 'percent', meta: '6,00%' }
    ],
    conversao: [
      { key: 'qualificados', label: 'Qualificados', format: 'number', meta: '80' },
      { key: 'propostas', label: 'Propostas', format: 'number', meta: '40' },
      { key: 'compras', label: 'Compras', format: 'number', meta: '30' },
      { key: 'vendas', label: 'Vendas', format: 'number', meta: '30' },
      { key: 'cpa', label: 'CPA', format: 'currency', meta: 'R$ 3.500' },
      { key: 'cac', label: 'CAC', format: 'currency', meta: 'R$ 3.800' },
      { key: 'txLeadVenda', label: 'Taxa Lead ➔ Venda', format: 'percent', meta: '25,00%' },
      { key: 'txPropostaVenda', label: 'Taxa Proposta ➔ Venda', format: 'percent', meta: '50,00%' }
    ],
    financeiro: [
      { key: 'ticketMedio', label: 'Ticket Médio', format: 'currency', meta: 'R$ 6.500' },
      { key: 'receita', label: 'Receita', format: 'currency', meta: 'R$ 250.000' },
      { key: 'faturamento', label: 'Faturamento', format: 'currency', meta: 'R$ 250.000' },
      { key: 'roas', label: 'ROAS', format: 'multiplier', meta: '1.80x' },
      { key: 'roi', label: 'ROI', format: 'percent', meta: '50,00%' },
      { key: 'lucroBruto', label: 'Lucro Bruto', format: 'currency', meta: 'R$ 100.000' },
      { key: 'lucroLiquido', label: 'Lucro Líquido', format: 'currency', meta: 'R$ 80.000' },
      { key: 'margem', label: 'Margem', format: 'percent', meta: '40,00%' },
      { key: 'fee', label: 'Fee de Gestão', format: 'currency', meta: 'R$ 2.000' },
      { key: 'custosExtras', label: 'Custos Extras', format: 'currency', meta: 'R$ 12.000' }
    ]
  };
  const renderSectionHeader = (title: string, count: number, isOpen: boolean, onToggle: () => void) => (
    <tr 
      onClick={onToggle}
      className="bg-zinc-900/40 hover:bg-zinc-900/60 cursor-pointer border-y border-zinc-900/80 select-none transition-colors"
    >
      <td colSpan={8} className="px-6 py-4 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-yellow-400 flex items-center gap-2">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {title}
          </span>
          <span className="text-[10px] bg-zinc-950 border border-zinc-850 px-2.5 py-0.5 rounded-full text-zinc-400 font-bold uppercase tracking-widest">
            {count} Métricas
          </span>
        </div>
      </td>
    </tr>
  );

  const renderRow = (row: { key: string; label: string; format: string; meta: string }, idx: number) => {
    const val = currentRangeMetrics[row.key as keyof typeof currentRangeMetrics] ?? 0;
    const prevVal = prevRangeMetrics[row.key as keyof typeof prevRangeMetrics] ?? 0;
    const pct = prevVal > 0 ? ((val - prevVal) / prevVal) * 100 : 0;
    const isUp = pct >= 0;

    // Cálculo da Projeção de Fechamento (Run-Rate / Pacing Realista)
    const isAverageMetric = ['cpm', 'cpc', 'cpl', 'cpa', 'roas', 'ctr', 'roi', 'margem', 'txCliqueLead', 'txLpLead', 'txLeadVenda', 'txPropostaVenda', 'frequencia', 'custoEngajamento', 'custoLpView', 'custoMensagem', 'ticketMedio'].includes(row.key);
    const projFactor = isAverageMetric 
      ? (isUp ? 1 + (Math.min(pct, 20) * 0.04 / 100) : 1 - (Math.min(Math.abs(pct), 20) * 0.04 / 100))
      : (isUp ? 1.32 : 1.15);
    const projVal = val * projFactor;

    return (
      <tr key={row.key} className="hover:bg-zinc-950/60 group transition-colors border-b border-zinc-900/40">
        {/* Nome da Métrica */}
        <td className="sticky left-0 bg-[#0B0B0B]/95 backdrop-blur border-r border-zinc-900/60 px-6 py-4 text-[11px] font-black uppercase tracking-wider text-zinc-300 z-10 text-left">
          {row.label}
        </td>
        
        {/* Valor Atual */}
        <td className="px-4 py-4 text-right">
          <input
            type="text"
            disabled={isClientView || isSynced || isCustomRangeActive}
            className={`bg-transparent text-right text-xs lg:text-[13px] font-black text-white outline-none w-24 px-1.5 py-0.5 rounded transition-all focus:bg-zinc-800/40 focus:ring-1 focus:ring-yellow-400 ${
              (isClientView || isSynced || isCustomRangeActive) ? 'cursor-default text-zinc-350 font-bold' : 'hover:bg-zinc-900'
            }`}
            value={formatCell(val, row.format).replace('R$', '').trim()}
            onChange={e => handleCellChange(selectedMonthIdx, row.key, currentKey, e.target.value)}
          />
        </td>

        {/* Período Anterior */}
        <td className="px-4 py-4 text-right text-xs font-bold text-zinc-450">
          {formatCell(prevVal, row.format)}
        </td>

        {/* Variação % */}
        <td className="px-4 py-4 text-right">
          <span className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-end gap-1 ${
            isUp ? 'text-emerald-500' : 'text-rose-500'
          }`}>
            {isUp ? '▲' : '▼'} {Math.abs(pct).toFixed(1)}%
          </span>
        </td>

        {/* Projeção (Fim do Mês) */}
        <td className="px-4 py-4 text-right">
          <span className="text-xs font-black text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2 py-1 rounded-md inline-block shadow-sm">
            {formatCell(projVal, row.format)}
          </span>
        </td>

        {/* Meta */}
        <td className="px-4 py-4 text-center text-xs font-bold text-zinc-500">
          {row.meta}
        </td>

        {/* Status */}
        <td className="px-4 py-4 text-center">
          <span className={`w-2.5 h-2.5 rounded-full inline-block shadow-sm ${
            isUp ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-rose-500 shadow-rose-500/50'
          }`}></span>
        </td>

        {/* Sparkline com Projeção Futura */}
        <td className="px-4 py-4 text-center">
          {(() => {
            const pts = getSparklinePoints(row.key, currentKey, 42, 16);
            if (!pts) {
              return (
                <svg className="w-16 h-6 inline-block text-[#FFD400]/70" viewBox="0 0 60 18">
                  <polyline fill="none" stroke="currentColor" strokeWidth="1.8" points="0,9 42,9" />
                  <line x1="42" y1="9" x2="58" y2="9" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
                  <circle cx="58" cy="9" r="2" fill="#FFD400" />
                </svg>
              );
            }
            const ptArr = pts.split(' ').map(p => p.split(',').map(Number));
            const lastPt = ptArr[ptArr.length - 1] || [42, 9];
            const prevPt = ptArr[ptArr.length - 2] || [0, 9];
            const slopeY = lastPt[1] - prevPt[1];
            const projY = Math.max(2, Math.min(16, lastPt[1] + slopeY * 0.7));
            const projX = 58;

            return (
              <svg className="w-16 h-6 inline-block" viewBox="0 0 60 18">
                {/* Histórico Real */}
                <polyline fill="none" stroke="#FFD400" strokeWidth="1.8" points={pts} />
                {/* Linha de Projeção Tracejada */}
                <line 
                  x1={lastPt[0]} 
                  y1={lastPt[1]} 
                  x2={projX} 
                  y2={projY} 
                  stroke="#FFD400" 
                  strokeWidth="1.8" 
                  strokeDasharray="2 2" 
                  opacity="0.9" 
                />
                {/* Ponto Projetado */}
                <circle cx={projX} cy={projY} r="2" fill="#FFD400" />
              </svg>
            );
          })()}
        </td>
      </tr>
    );
  };

  return (
    <div className={`max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8 flex-1 flex flex-col ${
      isLight ? 'text-zinc-900' : 'text-white'
    }`}>
      

      {/* HEADER DO DASHBOARD & CONTROLES — PADRÃO UNIFICADO */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 mb-6 border-b ${
        isLight ? 'border-zinc-200' : 'border-zinc-800/80'
      }`}>
        <div>
          <h1 className={`text-3xl lg:text-4xl font-black italic uppercase tracking-tight leading-none ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>Dashboard</h1>
          <p className="text-xs lg:text-sm text-zinc-400 font-medium leading-relaxed mt-1.5">
            Acompanhe a saúde do seu funil de aquisição, métricas de mídia e desempenho de vendas.
          </p>
        </div>

        {/* Controles: Período + Ações (Design Ampliado & Destacado) */}
        <div className="flex items-center gap-3">
          {/* Dropdown Seletor de Período Meta-style Ampliado */}
          <div className="relative">
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className={`${
                isLight 
                  ? 'bg-white border-zinc-200/90 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm' 
                  : 'bg-zinc-950/80 border-zinc-800 text-white hover:bg-zinc-900 hover:border-zinc-700'
              } border rounded-2xl px-4.5 py-3 flex items-center gap-3 text-xs lg:text-sm font-bold tracking-tight outline-none transition-all cursor-pointer select-none active:scale-95 shadow-md`}
            >
              <Calendar className="w-5 h-5 text-yellow-400 shrink-0" />
              <span>
                {formatDateLabel(startDate)} – {formatDateLabel(endDate)}
              </span>
              <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDatePickerOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsDatePickerOpen(false)}
                />
                
                <div className={`absolute right-0 top-14 mt-2 ${
                  isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0B0B0B] border-zinc-900 text-white'
                } border rounded-[28px] p-6 shadow-2xl z-50 flex gap-6 min-w-[580px] text-left animate-fade-in`}>
                  
                  {/* Atalhos */}
                  <div className={`w-48 shrink-0 flex flex-col gap-1 border-r ${isLight ? 'border-zinc-200 pr-5' : 'border-zinc-900 pr-5'}`}>
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2 pl-2.5">Períodos de Data</span>
                    {[
                      { key: 'este_ano', label: 'Este Ano (2026)' },
                      { key: 'ultimos_7', label: 'Últimos 7 Dias' },
                      { key: 'ultimos_30', label: 'Últimos 30 Dias' },
                      { key: 'trimestre', label: 'Último Trimestre' },
                      { key: 'ano_passado', label: 'Ano Passado (2025)' },
                      { key: 'maximo', label: 'Período Máximo' }
                    ].map(preset => {
                      const isActive = presetSelected === preset.key;
                      return (
                        <button
                          key={preset.key}
                          onClick={() => selectPreset(preset.key)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-yellow-400 text-black' 
                              : isLight ? 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900' : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Formulário Calendário */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">Customizado</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-zinc-400 uppercase tracking-widest block pl-1">Início</label>
                          <input 
                            type="date"
                            min="2025-01-01"
                            max="2026-06-30"
                            value={localStart}
                            onChange={e => {
                              setLocalStart(e.target.value);
                              setPresetSelected('personalizado');
                            }}
                            className={`w-full ${
                              isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-zinc-950 border-zinc-900 text-white'
                            } border rounded-xl px-3.5 py-2.5 font-bold text-xs focus:border-yellow-400 outline-none transition-all`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-zinc-400 uppercase tracking-widest block pl-1">Término</label>
                          <input 
                            type="date"
                            min="2025-01-01"
                            max="2026-06-30"
                            value={localEnd}
                            onChange={e => {
                              setLocalEnd(e.target.value);
                              setPresetSelected('personalizado');
                            }}
                            className={`w-full ${
                              isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-zinc-950 border-zinc-900 text-white'
                            } border rounded-xl px-3.5 py-2.5 font-bold text-xs focus:border-yellow-400 outline-none transition-all`}
                          />
                        </div>
                      </div>
                      
                      {localStart > localEnd && (
                        <p className="text-[8.5px] font-bold text-rose-500 uppercase tracking-wide">
                          A data de início não pode ser posterior à data de término.
                        </p>
                      )}
                    </div>

                    <div className={`flex items-center gap-2 pt-4 border-t ${isLight ? 'border-zinc-200 mt-4' : 'border-zinc-900 mt-4'}`}>
                      <button
                        onClick={() => {
                          if (localStart > localEnd) return;
                          setStartDate(localStart);
                          setEndDate(localEnd);
                          setIsDatePickerOpen(false);
                        }}
                        disabled={localStart > localEnd}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-20 disabled:pointer-events-none text-black font-black py-2.5 rounded-xl uppercase tracking-widest text-[10px] transition-colors cursor-pointer text-center"
                      >
                        Aplicar Período
                      </button>
                      <button
                        onClick={() => {
                          setLocalStart(startDate);
                          setLocalEnd(endDate);
                          setIsDatePickerOpen(false);
                        }}
                        className={`px-4 py-2.5 ${
                          isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800' : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                        } font-black rounded-xl uppercase tracking-widest text-[10px] transition-colors cursor-pointer`}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>

          {/* Divisor */}
          <div className={`w-px h-6 ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`} />

          {/* Importar CSV Ampliado */}
          {!isClientView && (
            <label
              className={`h-11 w-11 flex items-center justify-center ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700'
              } border rounded-2xl transition-all cursor-pointer shadow-md`}
              title="Importar CSV"
            >
              <FileText className="w-5 h-5" />
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const text = event.target?.result;
                      if (typeof text === 'string') {
                        try {
                          const parsed = parseGoogleSheetsCSV(text);
                          saveMonths(parsed);
                          alert('Planilha CSV importada com sucesso!');
                        } catch (err) {
                          alert('Erro ao processar arquivo: Verifique a formatação do cabeçalho.');
                          console.error(err);
                        }
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
          )}

          {/* Compartilhar Ampliado */}
          <button 
            onClick={generateShareLink}
            className={`h-11 w-11 flex items-center justify-center ${
              isLight 
                ? 'bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm' 
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700'
            } border rounded-2xl transition-all cursor-pointer shadow-md`}
            title={copied ? 'Link copiado!' : 'Compartilhar'}
          >
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="space-y-12">
        
        {/* LINHA 1: KPIs EXECUTIVOS (6 CARDS) */}
        {currentRangeMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { key: 'valorUsado', label: 'Investimento', format: 'currency', icon: DollarSign, color: 'text-emerald-500' },
              { key: 'faturamento', label: 'Faturamento', format: 'currency', icon: TrendingUp, color: 'text-emerald-500' },
              { key: 'lucroBruto', label: 'Lucro Bruto', format: 'currency', icon: Zap, color: 'text-[#FFD400]' },
              { key: 'roas', label: 'ROAS', format: 'multiplier', icon: Target, color: 'text-[#FFD400]' },
              { key: 'cpa', label: 'CPA', format: 'currency', icon: AlertTriangle, color: 'text-rose-500' },
              { key: 'roi', label: 'ROI', format: 'percent', icon: Activity, color: 'text-emerald-500' }
            ].map((kpi, i) => {
              const val = currentRangeMetrics[kpi.key as keyof typeof currentRangeMetrics];
              const prevVal = prevRangeMetrics[kpi.key as keyof typeof prevRangeMetrics];
              const pct = prevVal > 0 ? ((val - prevVal) / prevVal) * 100 : 0;
              const isUp = pct >= 0;

              return (
                <div key={i} className="bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[22px] p-6 flex flex-col justify-between h-44 relative overflow-hidden transition-all duration-300 group hover:scale-[1.03] hover:border-yellow-400/40 ring-1 ring-inset ring-white/5">
                  {/* Etiqueta / Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] lg:text-[11px] font-black text-zinc-400 uppercase tracking-wider block">{kpi.label}</span>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>

                  {/* Valor Principal */}
                  <h3 className="text-2xl lg:text-3xl font-black italic uppercase tracking-tighter text-white leading-none my-2 group-hover:text-yellow-400 transition-colors">
                    {formatCell(val, kpi.format)}
                  </h3>

                  {/* Sparkline & Comparação */}
                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                      isUp ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {isUp ? '▲' : '▼'} {Math.abs(pct).toFixed(0)}%
                    </span>
                    <svg className="w-14 h-6 text-[#FFD400]/70 group-hover:text-[#FFD400] transition-colors" viewBox="0 0 50 18">
                      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={getSparklinePoints(kpi.key, currentKey)} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SEÇÃO LADO A LADO: FUNIL VISUAL (ESQUERDA) vs SCORE & SUB-SCORES (DIREITA) */}
        {currentRangeMetrics && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* COLUNA ESQUERDA (lg:col-span-7): FUNIL VISUAL EXPANDIDO */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* CARD PRINCIPAL: FUNIL COMERCIAL VISUAL */}
              <div className={`${
                isLight ? 'bg-white border-zinc-200/90' : 'bg-[#121214]/60 border-zinc-800/80'
              } backdrop-blur-xl border rounded-[28px] p-6 text-left space-y-6 flex-1 flex flex-col justify-between`}>
                {/* Header com Seletor do Tipo (Sem Subtítulo) */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b ${
                  isLight ? 'border-zinc-200' : 'border-zinc-800/80'
                }`}>
                  <div>
                    <h3 className={`text-xl lg:text-2xl font-black uppercase italic tracking-tight leading-tight ${
                      isLight ? 'text-zinc-900' : 'text-white'
                    }`}>Funil Comercial</h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Tipo:</span>
                    <select
                      value={selectedTemplateId}
                      onChange={(e) => setSelectedTemplateId(e.target.value)}
                      className={`${
                        isLight ? 'bg-zinc-50 border-zinc-300 text-zinc-900' : 'bg-zinc-950 border-yellow-400/40 text-yellow-400'
                      } border font-black text-[10px] uppercase tracking-wider rounded-xl px-3 py-1.5 outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer`}
                    >
                      {Object.values(FUNNEL_TEMPLATES).map(tmpl => (
                        <option key={tmpl.id} value={tmpl.id} className={isLight ? "bg-white text-zinc-900 font-bold" : "bg-zinc-950 text-white font-bold"}>
                          {tmpl.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Funil em SVG idêntico ao novo arquivo do CorelDRAW (espaçamento expandido) */}
                <div className="w-full flex justify-center py-2 flex-1 items-center">
                  <svg 
                    viewBox="0 0 128000 117600" 
                    className="w-full h-auto max-h-[620px] select-none"
                  >
                    <g id="CorelFunnelGroup">
                      {(() => {
                        const template = FUNNEL_TEMPLATES[selectedTemplateId] || FUNNEL_TEMPLATES.ecommerce;

                        const STAGE_POLYGONS = [
                          { yellow: "0,120 83430,120 80690,12610 2740,12610", shadow: "83450,0 80690,12610 6050,30160 3290,17550", centerX: 41715, centerY: 6365, rightX: 82060 },
                          { yellow: "80140,17550 77380,30160 6050,30160 3290,17550", shadow: "80140,17550 77380,30160 9360,47650 6600,35040", centerX: 41715, centerY: 23855, rightX: 78760 },
                          { yellow: "76820,35040 74060,47650 9360,47650 6600,35040", shadow: "76820,35040 74060,47650 12680,65130 9910,52520", centerX: 41715, centerY: 41345, rightX: 75440 },
                          { yellow: "73510,52520 70750,65130 12680,65130 9910,52520", shadow: "73510,52520 70750,65130 15990,82620 13230,70010", centerX: 41715, centerY: 58825, rightX: 72130 },
                          { yellow: "70200,70010 67440,82620 15990,82620 13230,70010", shadow: "70200,70010 67440,82620 19300,100110 16540,87500", centerX: 41715, centerY: 76315, rightX: 68820 },
                          { yellow: "66880,87500 64120,100110 19300,100110 16540,87500", shadow: "66880,87500 64120,100110 22620,117600 19850,104990", centerX: 41715, centerY: 93805, rightX: 65500 },
                          { yellow: "63570,104990 60810,117600 22620,117600 19850,104990", shadow: null, centerX: 41715, centerY: 111295, rightX: 62190 }
                        ];

                        const CONVERSION_BADGE_Y = [15080, 32600, 50085, 67570, 85060, 102550];

                        return (
                          <>
                            {/* Render 3D Depth Shadows (black) */}
                            {STAGE_POLYGONS.map((st, idx) => st.shadow ? (
                              <polygon key={`shadow-${idx}`} fill="#09090b" points={st.shadow} />
                            ) : null)}

                            {/* Render CorelDRAW 3D Yellow Polygons + Text Overlay */}
                            {STAGE_POLYGONS.map((st, idx) => {
                              const step = template.steps[idx] || template.steps[template.steps.length - 1];
                              const val = currentRangeMetrics[step.volumeKey as keyof typeof currentRangeMetrics] ?? 0;
                              const costVal = currentRangeMetrics[step.costKey as keyof typeof currentRangeMetrics] ?? 0;

                              return (
                                <g key={`stage-${idx}`} className="group cursor-pointer">
                                  {/* Yellow CorelDRAW Trapezoid Polygon */}
                                  <polygon 
                                    fill="#FFCC00" 
                                    points={st.yellow} 
                                    className="transition-all duration-300 group-hover:fill-[#FFE033]"
                                  />

                                  {/* Stage Label & Metric Volume Text inside Polygon */}
                                  <text 
                                    x={st.centerX} 
                                    y={st.centerY - 2200} 
                                    fill="#000000" 
                                    textAnchor="middle" 
                                    fontSize="2100" 
                                    fontWeight="900" 
                                    letterSpacing="130"
                                    className="uppercase"
                                  >
                                    {step.label}
                                  </text>
                                  <text 
                                    x={st.centerX} 
                                    y={st.centerY + 2600} 
                                    fill="#000000" 
                                    textAnchor="middle" 
                                    fontSize="4600" 
                                    fontWeight="900" 
                                    fontStyle="italic"
                                  >
                                    {formatCell(val, 'number')}
                                  </text>

                                  {/* Connecting Line to Right Metric Box */}
                                  <line 
                                    x1={st.rightX} 
                                    y1={st.centerY} 
                                    x2={95000} 
                                    y2={st.centerY} 
                                    stroke="#FFCC00" 
                                    strokeWidth="450" 
                                    strokeDasharray="1200,600"
                                    opacity="0.8"
                                  />

                                  {/* Right Metric Card Container */}
                                  <rect 
                                    x={95000} 
                                    y={st.centerY - 4500} 
                                    width={31000} 
                                    height={9000} 
                                    rx={2200} 
                                    ry={2200} 
                                    fill="#09090b" 
                                    stroke="#27272a" 
                                    strokeWidth="350"
                                    className="group-hover:stroke-[#FFCC00] transition-colors"
                                  />

                                  {/* Cost Label - Centralizado perfeitamente sem vazar */}
                                  <text 
                                    x={110500} 
                                    y={st.centerY - 1200} 
                                    fill="#a1a1aa" 
                                    textAnchor="middle" 
                                    fontSize="1850" 
                                    fontWeight="900"
                                    letterSpacing="40"
                                    className="uppercase"
                                  >
                                    {step.costLabel}
                                  </text>

                                  {/* Cost Value */}
                                  <text 
                                    x={110500} 
                                    y={st.centerY + 2600} 
                                    fill="#ffffff" 
                                    textAnchor="middle" 
                                    fontSize="3400" 
                                    fontWeight="900" 
                                    fontStyle="italic"
                                    className="group-hover:fill-[#FFCC00] transition-colors"
                                  >
                                    {formatCell(costVal, step.costFormat || 'currency')}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Conversion % Text floating cleanly in the expanded gaps between stages */}
                            {CONVERSION_BADGE_Y.map((badgeY, idx) => {
                              const prevStep = template.steps[idx];
                              const nextStep = template.steps[idx + 1];
                              const prevVal = prevStep ? (currentRangeMetrics[prevStep.volumeKey as keyof typeof currentRangeMetrics] ?? 0) : 0;
                              const nextVal = nextStep ? (currentRangeMetrics[nextStep.volumeKey as keyof typeof currentRangeMetrics] ?? 0) : 0;
                              const convRate = prevVal > 0 ? (nextVal / prevVal) * 100 : 0;

                              return (
                                <text 
                                  key={`badge-${idx}`}
                                  x={41715} 
                                  y={badgeY + 600} 
                                  fill="#FFCC00" 
                                  textAnchor="middle" 
                                  fontSize="2200" 
                                  fontWeight="900"
                                  letterSpacing="80"
                                >
                                  CONVERSÃO: {convRate.toFixed(1)}%
                                </text>
                              );
                            })}
                          </>
                        );
                      })()}
                    </g>
                  </svg>
                </div>
              </div>

            </div>

            {/* COLUNA DIREITA (lg:col-span-5): SCORE DO FUNIL + SUB-SCORES (ALTURA 100% IGUALADA + INTERATIVO) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* CARD 1: SCORE GERAL (SAÚDE GERAL DO FUNIL) - CLICÁVEL */}
              <div 
                onClick={() => setSelectedStageModal('geral')}
                className={`${
                  isLight ? 'bg-white border-zinc-200/90 hover:border-yellow-400/60' : 'bg-[#121214]/70 border-zinc-800/90 hover:border-yellow-400/50'
                } backdrop-blur-2xl border rounded-[28px] p-5 text-left space-y-4 relative overflow-hidden group transition-all duration-300 cursor-pointer hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Círculo do Score Geral */}
                    <div className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border-[4px] border-[#FFCC00] flex flex-col items-center justify-center font-black shrink-0 ${
                      isLight ? 'bg-yellow-400/10 text-zinc-900' : 'bg-zinc-950/60 text-white'
                    }`}>
                      <span className="text-xl sm:text-2xl font-black italic leading-none">{scores.geral}</span>
                      <span className={`text-[8.5px] font-extrabold mt-0.5 tracking-wider ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>/100</span>
                    </div>

                    {/* Detalhes do Score */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className={`text-[9px] font-black uppercase tracking-widest block truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>Score Geral</span>
                      <h3 className={`text-sm sm:text-base font-black italic uppercase tracking-tight leading-tight truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        Saúde Geral do Funil
                      </h3>
                      <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                        <span className="bg-[#FFCC00] text-black font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                          {scores.geral >= 80 ? 'Excelente' : scores.geral >= 60 ? 'Bom' : 'Atenção'}
                        </span>
                        <span className={`text-[10px] font-semibold truncate ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
                          Funil altamente rentável
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[8.5px] font-black uppercase tracking-wider text-yellow-600 dark:text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2 py-1 rounded-xl flex items-center gap-1 shrink-0 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                    Ver Histórico ↗
                  </span>
                </div>

                {/* Barra de Progresso Inferior */}
                <div className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${
                  isLight ? 'bg-zinc-150 border border-zinc-200/80' : 'bg-zinc-950/90 border border-zinc-900/90'
                }`}>
                  <div 
                    style={{ width: `${scores.geral}%` }} 
                    className="bg-gradient-to-r from-yellow-500 via-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-1000"
                  />
                </div>
              </div>

              {/* CONTÊINER DOS SUB-SCORES EMPILHADOS (PREENCHENDO A ALTURA + CLICÁVEIS) */}
              <div className="flex-1 flex flex-col justify-between gap-3">
                {[
                  { id: 'topo' as const, label: 'TOPO DO FUNIL', val: scores.topo, desc: 'Engajamento & CPM', icon: Target },
                  { id: 'meio' as const, label: 'MEIO DO FUNIL', val: scores.meio, desc: 'Leads & Conversões', icon: LinkIcon },
                  { id: 'fundo' as const, label: 'FUNDO DO FUNIL', val: scores.fundo, desc: 'Compras & CPA', icon: ShoppingBag },
                  { id: 'fin' as const, label: 'FINANCEIRO', val: scores.fin, desc: 'ROAS & Faturamento', icon: DollarSign }
                ].map((sc, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedStageModal(sc.id)}
                    className={`${
                      isLight ? 'bg-white border-zinc-200/90 hover:border-yellow-400/60' : 'bg-[#121214]/60 border-zinc-800/80 hover:border-yellow-400/50'
                    } backdrop-blur-xl border rounded-[24px] p-4 text-left space-y-2.5 flex-1 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:scale-[1.01] group`}
                  >
                    {/* Header do Card com Ícone, Título, Porcentagem e Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-500/5 border border-yellow-400/30 flex items-center justify-center text-yellow-500 shrink-0 group-hover:scale-105 transition-transform">
                          <sc.icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[9.5px] font-black uppercase tracking-widest block truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{sc.label}</span>
                          <span className={`text-[10.5px] font-bold block tracking-tight mt-0.5 truncate ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{sc.desc}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <h4 className={`text-2xl font-black italic leading-none group-hover:text-yellow-500 transition-colors ${isLight ? 'text-zinc-900' : 'text-white'}`}>{sc.val}%</h4>
                        <span className="text-[8.5px] font-black uppercase tracking-wider text-yellow-600 dark:text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2 py-1 rounded-lg flex items-center gap-1 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                          Ver ↗
                        </span>
                      </div>
                    </div>

                    {/* Barra de Progresso Horizontal */}
                    <div className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${
                      isLight ? 'bg-zinc-150 border border-zinc-200/80' : 'bg-zinc-950/80 border border-zinc-900/90'
                    }`}>
                      <div 
                        style={{ width: `${sc.val}%` }} 
                        className="bg-gradient-to-r from-yellow-400 to-amber-400 h-full rounded-full transition-all duration-700" 
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* LINHA 3: GRÁFICOS (DESIGN ENRIQUECIDO & LIMPO DE REDUNDÂNCIAS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch text-left">
          
          {/* GRÁFICO 1: EVOLUÇÃO DO FUNIL (DESIGN ULTRA-COMPACTO & ENCOSTADO NAS BORDAS) */}
          <div className={`${
            isLight ? 'bg-white border-zinc-200/90' : 'bg-[#121214]/60 border-zinc-800/80'
          } backdrop-blur-xl border rounded-[28px] p-6 text-left space-y-3 flex flex-col justify-between h-full relative`}>
            
            {/* Header */}
            <div className={`space-y-1 pb-2.5 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800/80'}`}>
              <h3 className={`text-xl lg:text-2xl font-black uppercase italic tracking-tight leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                Evolução do Funil
              </h3>
              <p className="text-xs lg:text-sm font-medium text-zinc-400 leading-relaxed">
                Acompanhe a evolução dos principais indicadores de investimento e receita ao longo do semestre.
              </p>
            </div>

            {/* Seletor de Filtro Posicionado em Cima do Gráfico (Compacto) */}
            <div className="flex items-center justify-between pt-0 pb-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                Métrica Exibida
              </span>
              <select
                value={chartMetricFilter}
                onChange={(e) => setChartMetricFilter(e.target.value as any)}
                className={`text-[9.5px] font-black uppercase tracking-wider rounded-xl px-2.5 py-1 outline-none border transition-all cursor-pointer ${
                  isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-900 focus:ring-1 focus:ring-yellow-400' : 'bg-zinc-950 border-zinc-800 text-yellow-400 focus:ring-1 focus:ring-yellow-400'
                }`}
              >
                <option value="investimento_receita">Investimento vs. Receita</option>
                <option value="roas_cpl">ROAS vs. Custo/Lead</option>
                <option value="leads_vendas">Leads vs. Vendas</option>
              </select>
            </div>

            {/* Cálculo Dinâmico dos Pontos do Gráfico a partir de `months` */}
            {(() => {
              const activeChartData = months.map(m => {
                if (chartMetricFilter === 'roas_cpl') {
                  return {
                    line1: m.metrics.roas.current,
                    line2: m.metrics.cpl.current,
                    label1: 'ROAS',
                    label2: 'CPL',
                    unit1: 'x',
                    unit2: 'R$',
                    month: m.month
                  };
                }
                if (chartMetricFilter === 'leads_vendas') {
                  return {
                    line1: m.metrics.leads.current,
                    line2: m.metrics.compras.current,
                    label1: 'Leads',
                    label2: 'Vendas',
                    unit1: '',
                    unit2: '',
                    month: m.month
                  };
                }
                return {
                  line1: m.metrics.faturamento.current,
                  line2: m.metrics.valorUsado.current,
                  label1: 'Receita',
                  label2: 'Investimento',
                  unit1: 'R$',
                  unit2: 'R$',
                  month: m.month
                };
              });

              const maxLine1 = Math.max(...activeChartData.map(d => d.line1)) || 1;
              const maxLine2 = Math.max(...activeChartData.map(d => d.line2)) || 1;
              const maxValChart = Math.max(maxLine1, maxLine2);

              const getSvgY = (val: number) => {
                if (!maxValChart) return 105;
                return Math.round(110 - (val / maxValChart) * 95);
              };

              const stepX = 300 / Math.max(activeChartData.length - 1, 1);
              const line1Coords = activeChartData.map((d, i) => ({ x: i * stepX, y: getSvgY(d.line1) }));
              const line2Coords = activeChartData.map((d, i) => ({ x: i * stepX, y: getSvgY(d.line2) }));

              // Função de Curva Bezier Suave (com garantia de comando 'M' inicial)
              const getSmoothPath = (pts: { x: number; y: number }[]) => {
                if (!pts || pts.length === 0) return 'M 0,120 L 300,120';
                if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
                let path = `M ${pts[0].x},${pts[0].y}`;
                for (let i = 0; i < pts.length - 1; i++) {
                  const curr = pts[i];
                  const next = pts[i + 1];
                  const cp1x = curr.x + (next.x - curr.x) / 2;
                  const cp1y = curr.y;
                  const cp2x = curr.x + (next.x - curr.x) / 2;
                  const cp2y = next.y;
                  path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
                }
                return path;
              };

              const path1Str = getSmoothPath(line1Coords);
              const path2Str = getSmoothPath(line2Coords);
              const area1Str = `${path1Str} L 300,120 L 0,120 Z`;
              const area2Str = `${path2Str} L 300,120 L 0,120 Z`;

              const label1Name = activeChartData[0]?.label1 || 'Receita';
              const label2Name = activeChartData[0]?.label2 || 'Investimento';

              const formatYAxis = (factor: number) => {
                const val = maxValChart * factor;
                if (chartMetricFilter === 'roas_cpl') return `${val.toFixed(1)}x`;
                if (chartMetricFilter === 'leads_vendas') return `${Math.round(val)}`;
                if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
                return `${Math.round(val)}`;
              };

              return (
                <div className="flex-1 flex flex-col justify-start relative">
                  {/* Tooltip Flutuante no Hover */}
                  {hoveredChartMonth !== null && activeChartData[hoveredChartMonth] && (
                    <div 
                      style={{ left: `${(hoveredChartMonth / (activeChartData.length - 1)) * 80 + 10}%` }}
                      className="absolute top-0 z-30 transform -translate-x-1/2 bg-zinc-950/95 border border-yellow-400/40 text-white rounded-xl p-2.5 shadow-2xl backdrop-blur-md pointer-events-none text-left min-w-[140px] animate-fade-in"
                    >
                      <span className="text-[8.5px] font-black text-yellow-400 uppercase tracking-widest block border-b border-zinc-800 pb-1 mb-1">
                        {activeChartData[hoveredChartMonth].month} — Detalhes
                      </span>
                      <div className="space-y-1 text-[10px] font-extrabold">
                        <div className="flex justify-between items-center text-emerald-400">
                          <span>{label1Name}:</span>
                          <span>{formatCell(activeChartData[hoveredChartMonth].line1, activeChartData[hoveredChartMonth].unit1 === 'R$' ? 'currency' : activeChartData[hoveredChartMonth].unit1 === 'x' ? 'multiplier' : 'number')}</span>
                        </div>
                        <div className="flex justify-between items-center text-yellow-400">
                          <span>{label2Name}:</span>
                          <span>{formatCell(activeChartData[hoveredChartMonth].line2, activeChartData[hoveredChartMonth].unit2 === 'R$' ? 'currency' : activeChartData[hoveredChartMonth].unit2 === 'x' ? 'currency' : 'number')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 items-stretch h-48 mt-1">
                    {/* Eixo Y Encostado à Esquerda (Compacto w-7) */}
                    <div className="flex flex-col justify-between text-[8px] font-black text-zinc-400 py-0.5 text-right w-7 shrink-0">
                      <span>{formatYAxis(1.0)}</span>
                      <span>{formatYAxis(0.8)}</span>
                      <span>{formatYAxis(0.6)}</span>
                      <span>{formatYAxis(0.4)}</span>
                      <span>{formatYAxis(0.2)}</span>
                      <span>{formatYAxis(0)}</span>
                    </div>

                    {/* Área do Gráfico Canvas SVG */}
                    <div className="flex-1 relative flex flex-col justify-between">
                      {/* SVG com Curvas Suaves e Gradientes */}
                      <svg className="w-full h-full overflow-visible select-none" viewBox="0 0 300 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FFD400" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#FFD400" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Linhas Guia */}
                        <line x1="0" y1="0" x2="300" y2="0" stroke={isLight ? "#e4e4e7" : "#27272a"} strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="0" y1="24" x2="300" y2="24" stroke={isLight ? "#e4e4e7" : "#27272a"} strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="0" y1="48" x2="300" y2="48" stroke={isLight ? "#e4e4e7" : "#27272a"} strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="0" y1="72" x2="300" y2="72" stroke={isLight ? "#e4e4e7" : "#27272a"} strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="0" y1="96" x2="300" y2="96" stroke={isLight ? "#e4e4e7" : "#27272a"} strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="0" y1="120" x2="300" y2="120" stroke={isLight ? "#e4e4e7" : "#27272a"} strokeWidth="1" />

                        {/* Preenchimento Suave de Área */}
                        <path fill="url(#receitaGrad)" d={area1Str} />
                        <path fill="url(#investGrad)" d={area2Str} />

                        {/* Linhas Curvas Sólidas */}
                        <path fill="none" stroke="#10b981" strokeWidth="3" d={path1Str} strokeLinecap="round" />
                        <path fill="none" stroke="#FFD400" strokeWidth="3" d={path2Str} strokeLinecap="round" />
                      </svg>

                      {/* Overlay HTML com Pontos 100% Redondos em CSS */}
                      {activeChartData.map((d, i) => {
                        const leftPct = (i / (activeChartData.length - 1)) * 100;
                        const topPct1 = (getSvgY(d.line1) / 120) * 100;
                        const topPct2 = (getSvgY(d.line2) / 120) * 100;
                        const isHovered = hoveredChartMonth === i;

                        return (
                          <div key={i}>
                            {/* Ponto Métrica 1 (Verde) */}
                            <div 
                              style={{ left: `${leftPct}%`, top: `${topPct1}%` }}
                              onMouseEnter={() => setHoveredChartMonth(i)}
                              onMouseLeave={() => setHoveredChartMonth(null)}
                              className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 ${
                                isLight ? 'bg-white' : 'bg-[#121214]'
                              } cursor-pointer transition-all duration-200 z-10 ${
                                isHovered ? 'scale-150 ring-4 ring-emerald-500/30 bg-emerald-500' : 'hover:scale-125'
                              }`}
                            />
                            {/* Ponto Métrica 2 (Amarelo Marca #FFD400) */}
                            <div 
                              style={{ left: `${leftPct}%`, top: `${topPct2}%` }}
                              onMouseEnter={() => setHoveredChartMonth(i)}
                              onMouseLeave={() => setHoveredChartMonth(null)}
                              className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-yellow-400 ${
                                isLight ? 'bg-white' : 'bg-[#121214]'
                              } cursor-pointer transition-all duration-200 z-10 ${
                                isHovered ? 'scale-150 ring-4 ring-yellow-400/30 bg-yellow-400' : 'hover:scale-125'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rótulos dos Meses Dinâmicos e Perfeitamente Alinhados 1:1 com o Gráfico */}
                  <div className="relative w-full h-4 mt-2 pl-9">
                    <div className="relative w-full h-full">
                      {activeChartData.map((d, i) => {
                        const leftPct = (i / (activeChartData.length - 1)) * 100;
                        const isHovered = hoveredChartMonth === i;
                        return (
                          <span 
                            key={i}
                            style={{ left: `${leftPct}%` }}
                            onMouseEnter={() => setHoveredChartMonth(i)}
                            onMouseLeave={() => setHoveredChartMonth(null)}
                            className={`absolute top-0 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                              isHovered ? 'text-yellow-400 font-bold scale-110' : 'text-zinc-400'
                            }`}
                          >
                            {d.month.toUpperCase()}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legenda Dinâmica do Gráfico */}
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-zinc-400 pt-2.5 mt-2 border-t border-zinc-100 dark:border-zinc-900/60">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> {label1Name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> {label2Name}
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <span className="w-3 border-b-2 border-dashed border-yellow-400"></span> Tendência
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Banner Projeção IA Calculado Dinamicamente */}
            {(() => {
              const lastVal = months[months.length - 1]?.metrics.faturamento.current || 380000;
              const projNext = Math.round(lastVal * 1.18);
              return (
                <div className="bg-blue-500/10 border border-blue-400/25 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 text-[10.5px] font-semibold text-zinc-300 leading-tight">
                    <span className="text-[8.5px] font-black text-blue-400 uppercase tracking-widest block">Projeção IA</span>
                    Mantido o ritmo atual, a receita pode alcançar <span className="font-black text-emerald-500">{formatCell(projNext, 'currency')}</span> no próximo mês.
                  </div>
                </div>
              );
            })()}

          </div>

          {/* GRÁFICO 2: CONVERSÃO ENTRE ETAPAS */}
          <div className={`${
            isLight ? 'bg-white border-zinc-200/90' : 'bg-[#121214]/60 border-zinc-800/80'
          } backdrop-blur-xl border rounded-[28px] p-6 text-left space-y-5 flex flex-col justify-between h-full`}>
            
            {/* Header */}
            <div className={`space-y-1 pb-2.5 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800/80'}`}>
              <h3 className={`text-xl lg:text-2xl font-black uppercase italic tracking-tight leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                Conversão entre Etapas
              </h3>
              <p className="text-xs lg:text-sm font-medium text-zinc-400 leading-relaxed">
                Análise de conversão entre cada etapa do funil para identificar gargalos e otimizar resultados.
              </p>
            </div>

            {/* Lista dos 6 Cartões de Etapa de Conversão */}
            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              {[
                { icon: Eye, label: 'Impressões ➔ Cliques (CTR)', val: '2.1%', delta: '↑ 0.4pp', isUp: true, pct: 21, color: 'bg-yellow-400' },
                { icon: ArrowUpRight, label: 'Cliques ➔ LP Views', val: '88%', delta: '↑ 5.2pp', isUp: true, pct: 88, color: 'bg-emerald-500' },
                { icon: Monitor, label: 'LP Views ➔ Mensagens', val: '15.5%', delta: '↓ 2.1pp', isUp: false, pct: 15.5, color: 'bg-yellow-400' },
                { icon: Smartphone, label: 'Mensagens ➔ Leads', val: '40.8%', delta: '↑ 3.7pp', isUp: true, pct: 40.8, color: 'bg-emerald-500' },
                { icon: Target, label: 'Leads ➔ Propostas', val: '35%', delta: '↑ 2.3pp', isUp: true, pct: 35, color: 'bg-yellow-400' },
                { icon: FileText, label: 'Propostas ➔ Vendas', val: '53%', delta: '↑ 4.8pp', isUp: true, pct: 53, color: 'bg-emerald-500' }
              ].map((step, i) => (
                <div key={i} className={`p-2.5 rounded-2xl border transition-all ${
                  isLight ? 'bg-zinc-50/80 border-zinc-200/80' : 'bg-zinc-950/60 border-zinc-900'
                } space-y-1.5`}>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={`font-bold truncate ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>{step.label}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-black italic ${isLight ? 'text-zinc-900' : 'text-white'}`}>{step.val}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                        step.isUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                      }`}>
                        {step.delta}
                      </span>
                    </div>
                  </div>

                  {/* Barra de Progresso Interna */}
                  <div className="w-full bg-zinc-200 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div style={{ width: `${step.pct}%` }} className={`h-full rounded-full ${step.color}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Taxa de Conversão Geral */}
            <div className="bg-emerald-500/10 border border-emerald-400/25 p-3.5 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8.5px] font-black text-zinc-400 uppercase tracking-widest block">Taxa de Conversão Geral</span>
                  <h4 className={`text-xl font-black italic ${isLight ? 'text-zinc-900' : 'text-white'}`}>0.57%</h4>
                </div>
              </div>

              <span className="text-[9.5px] font-black text-emerald-500 bg-emerald-500/15 px-2.5 py-1 rounded-full shrink-0">
                ↑ 12% <span className="text-zinc-400 font-normal text-[8.5px] ml-0.5">vs. período</span>
              </span>
            </div>

          </div>

          {/* GRÁFICO 3: DISTRIBUIÇÃO DOS CANAIS */}
          <div className={`${
            isLight ? 'bg-white border-zinc-200/90' : 'bg-[#121214]/60 border-zinc-800/80'
          } backdrop-blur-xl border rounded-[28px] p-6 text-left space-y-5 flex flex-col justify-between h-full`}>
            
            {/* Header */}
            <div className={`space-y-1 pb-2.5 border-b ${isLight ? 'border-zinc-200' : 'border-zinc-800/80'}`}>
              <h3 className={`text-xl lg:text-2xl font-black uppercase italic tracking-tight leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                Distribuição dos Canais
              </h3>
              <p className="text-xs lg:text-sm font-medium text-zinc-400 leading-relaxed">
                Distribuição de mídia por canal de aquisição para orientar a alocação inteligente de orçamento.
              </p>
            </div>

            {/* GRÁFICO DONUT CENTRALIZADO NO TOPO */}
            <div className="flex flex-col items-center justify-center py-2 flex-1 space-y-4">
              <div className="w-36 h-36 relative flex items-center justify-center shrink-0 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={isLight ? "#f4f4f5" : "#18181b"} strokeWidth="4.5" />
                  {/* Meta Ads (45%) - #1877F2 */}
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1877F2" strokeWidth="4.5" strokeDasharray="45 55" strokeDashoffset="0" />
                  {/* Google Ads (30%) - #4285F4 */}
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4285F4" strokeWidth="4.5" strokeDasharray="30 70" strokeDashoffset="-45" />
                  {/* TikTok (15%) - #EE1D52 */}
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EE1D52" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="-75" />
                  {/* LinkedIn (10%) - #0A66C2 */}
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0A66C2" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-90" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[8.5px] font-black text-zinc-400 uppercase tracking-widest leading-none">Investimento</span>
                  <span className="text-[9.5px] font-black text-zinc-400 uppercase tracking-widest leading-none mt-0.5">Total</span>
                </div>
              </div>

              {/* LEGENDA EMPILHADA ABAIXO DO GRÁFICO COM LOGOTIPOS & CORES OFICIAIS */}
              <div className="w-full space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-900/60">
                {[
                  { 
                    label: 'Meta Ads', 
                    pct: '45%', 
                    delta: '↑ 8%', 
                    isUp: true, 
                    color: 'bg-[#1877F2]',
                    icon: (
                      <svg className="w-[17px] h-[12px] shrink-0" viewBox="0 0 270 191" fill="none">
                        <defs>
                          <linearGradient id="MetaGrad1_leg" x1="61" y1="117" x2="259" y2="127" gradientUnits="userSpaceOnUse">
                            <stop style={{ stopColor: '#0064e1' }} offset="0"/>
                            <stop style={{ stopColor: '#0064e1' }} offset="0.4"/>
                            <stop style={{ stopColor: '#0073ee' }} offset="0.83"/>
                            <stop style={{ stopColor: '#0082fb' }} offset="1"/>
                          </linearGradient>
                          <linearGradient id="MetaGrad2_leg" x1="45" y1="139" x2="45" y2="66" gradientUnits="userSpaceOnUse">
                            <stop style={{ stopColor: '#0082fb' }} offset="0"/>
                            <stop style={{ stopColor: '#0064e0' }} offset="1"/>
                          </linearGradient>
                        </defs>
                        <path style={{ fill: '#0081fb' }} d="m31.06,125.96c0,10.98 2.41,19.41 5.56,24.51 4.13,6.68 10.29,9.51 16.57,9.51 8.1,0 15.51-2.01 29.79-21.76 11.44-15.83 24.92-38.05 33.99-51.98l15.36-23.6c10.67-16.39 23.02-34.61 37.18-46.96 11.56-10.08 24.03-15.68 36.58-15.68 21.07,0 41.14,12.21 56.5,35.11 16.81,25.08 24.97,56.67 24.97,89.27 0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75l0-31.02c17.63,0 22.03-16.2 22.03-34.74 0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16.05c-18.2,32.27-22.81,39.62-31.91,51.75-15.95,21.24-29.57,29.29-47.5,29.29-21.27,0-34.72-9.21-43.05-23.09-6.8-11.31-10.14-26.15-10.14-43.06z"/>
                        <path style={{ fill: 'url(#MetaGrad1_leg)' }} d="m24.49,37.3c14.24-21.95 34.79-37.3 58.36-37.3 13.65,0 27.22,4.04 41.39,15.61 15.5,12.65 32.02,33.48 52.63,67.81l7.39,12.32c17.84,29.72 27.99,45.01 33.93,52.22 7.64,9.26 12.99,12.02 19.94,12.02 17.63,0 22.03-16.2 22.03-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71l-25.79-43.08c-12.94-21.62-24.81-37.74-31.68-45.04-7.39-7.85-16.89-17.33-32.05-17.33-12.27,0-22.69,8.61-31.41,21.78z"/>
                        <path style={{ fill: 'url(#MetaGrad2_leg)' }} d="m82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78-12.33,18.61-19.88,46.33-19.88,72.95 0,10.98 2.41,19.41 5.56,24.51l-26.48,17.44c-6.8-11.31-10.14-26.15-10.14-43.06 0-30.75 8.44-62.8 24.49-87.55 14.24-21.95 34.79-37.3 58.36-37.3z"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'Google Ads', 
                    pct: '30%', 
                    delta: '↑ 5%', 
                    isUp: true, 
                    color: 'bg-[#4285F4]',
                    icon: (
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'TikTok', 
                    pct: '15%', 
                    delta: '↓ 3%', 
                    isUp: false, 
                    color: 'bg-[#EE1D52]',
                    icon: (
                      <svg className="w-4 h-4 text-[#EE1D52] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.83.12V9.37a6.34 6.34 0 0 0-1-.08 6.34 6.34 0 1 0 6.34 6.34V9.07a8.16 8.16 0 0 0 4.94 1.62V7.21a4.84 4.84 0 0 1-1-.52z"/>
                      </svg>
                    )
                  },
                  { 
                    label: 'LinkedIn', 
                    pct: '10%', 
                    delta: '- 0%', 
                    isUp: true, 
                    color: 'bg-[#0A66C2]',
                    icon: (
                      <svg className="w-4 h-4 text-[#0A66C2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    )
                  }
                ].map((ch, i) => (
                  <div key={i} className={`p-2 rounded-xl border flex items-center justify-between gap-2 text-[11px] ${
                    isLight ? 'bg-zinc-50/80 border-zinc-200/80' : 'bg-zinc-950/60 border-zinc-900'
                  }`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      {ch.icon}
                      <span className={`font-bold truncate ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>{ch.label}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-black italic ${isLight ? 'text-zinc-900' : 'text-white'}`}>{ch.pct}</span>
                      <span className={`text-[8.5px] font-black px-1.5 py-0.5 rounded-full ${
                        ch.delta.includes('-') ? 'text-zinc-400 bg-zinc-500/10' : ch.isUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                      }`}>
                        {ch.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Destaque: MELHOR DESEMPENHO (META ADS - AZUL OFICIAL & LOGO DA META) */}
            <div className="bg-[#1877F2]/10 border border-[#1877F2]/30 p-3.5 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0081FB]/15 flex items-center justify-center shrink-0">
                  <svg className="w-[20px] h-[14px] shrink-0" viewBox="0 0 270 191" fill="none">
                    <defs>
                      <linearGradient id="MetaGrad1_card" x1="61" y1="117" x2="259" y2="127" gradientUnits="userSpaceOnUse">
                        <stop style={{ stopColor: '#0064e1' }} offset="0"/>
                        <stop style={{ stopColor: '#0064e1' }} offset="0.4"/>
                        <stop style={{ stopColor: '#0073ee' }} offset="0.83"/>
                        <stop style={{ stopColor: '#0082fb' }} offset="1"/>
                      </linearGradient>
                      <linearGradient id="MetaGrad2_card" x1="45" y1="139" x2="45" y2="66" gradientUnits="userSpaceOnUse">
                        <stop style={{ stopColor: '#0082fb' }} offset="0"/>
                        <stop style={{ stopColor: '#0064e0' }} offset="1"/>
                      </linearGradient>
                    </defs>
                    <path style={{ fill: '#0081fb' }} d="m31.06,125.96c0,10.98 2.41,19.41 5.56,24.51 4.13,6.68 10.29,9.51 16.57,9.51 8.1,0 15.51-2.01 29.79-21.76 11.44-15.83 24.92-38.05 33.99-51.98l15.36-23.6c10.67-16.39 23.02-34.61 37.18-46.96 11.56-10.08 24.03-15.68 36.58-15.68 21.07,0 41.14,12.21 56.5,35.11 16.81,25.08 24.97,56.67 24.97,89.27 0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75l0-31.02c17.63,0 22.03-16.2 22.03-34.74 0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16.05c-18.2,32.27-22.81,39.62-31.91,51.75-15.95,21.24-29.57,29.29-47.5,29.29-21.27,0-34.72-9.21-43.05-23.09-6.8-11.31-10.14-26.15-10.14-43.06z"/>
                    <path style={{ fill: 'url(#MetaGrad1_card)' }} d="m24.49,37.3c14.24-21.95 34.79-37.3 58.36-37.3 13.65,0 27.22,4.04 41.39,15.61 15.5,12.65 32.02,33.48 52.63,67.81l7.39,12.32c17.84,29.72 27.99,45.01 33.93,52.22 7.64,9.26 12.99,12.02 19.94,12.02 17.63,0 22.03-16.2 22.03-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71l-25.79-43.08c-12.94-21.62-24.81-37.74-31.68-45.04-7.39-7.85-16.89-17.33-32.05-17.33-12.27,0-22.69,8.61-31.41,21.78z"/>
                    <path style={{ fill: 'url(#MetaGrad2_card)' }} d="m82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78-12.33,18.61-19.88,46.33-19.88,72.95 0,10.98 2.41,19.41 5.56,24.51l-26.48,17.44c-6.8-11.31-10.14-26.15-10.14-43.06 0-30.75 8.44-62.8 24.49-87.55 14.24-21.95 34.79-37.3 58.36-37.3z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[8.5px] font-black text-[#1877F2] uppercase tracking-widest block">Melhor Desempenho</span>
                  <h4 className="text-sm font-black text-[#1877F2]">Meta Ads</h4>
                  <p className="text-[9.5px] text-zinc-400 font-medium">Maior retorno sobre investimento (ROAS)</p>
                </div>
              </div>

              <span className="bg-[#1877F2]/20 text-[#1877F2] font-extrabold text-xs px-3 py-1 rounded-full shrink-0">
                ROAS 4.2x
              </span>
            </div>

          </div>

        </div>

        {/* LINHA 4: TABELA EXECUTIVA DETALHADA */}
        <div className="bg-zinc-900/30 border border-zinc-850 rounded-[28px] overflow-hidden hover:border-zinc-800 transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/80">
                  <th className="sticky left-0 bg-[#0B0B0B] px-6 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 w-60 border-r border-zinc-900/60 z-20 text-left">
                    Métrica
                  </th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-300 text-right">Período Selecionado</th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Comparativo Anterior</th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Variação %</th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-yellow-400 text-right bg-yellow-400/5 border-x border-yellow-400/10">Projeção (Fim do Mês)</th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 text-center">Meta</th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 text-center">Status</th>
                  <th className="px-4 py-5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 text-center">Tendência & Projeção</th>
                </tr>
              </thead>

              <tbody>
                {/* 1. TOPO DO FUNIL */}
                {renderSectionHeader('Topo do Funil', rowsConfig.topo.length, openSections.topo, () => setOpenSections(prev => ({ ...prev, topo: !prev.topo })))}
                {openSections.topo && rowsConfig.topo.map((row, idx) => renderRow(row, idx))}

                {/* 2. ENGAJAMENTO */}
                {renderSectionHeader('Engajamento', rowsConfig.engajamento.length, openSections.engajamento, () => setOpenSections(prev => ({ ...prev, engajamento: !prev.engajamento })))}
                {openSections.engajamento && rowsConfig.engajamento.map((row, idx) => renderRow(row, idx))}

                {/* 3. GERAÇÃO DE LEADS */}
                {renderSectionHeader('Geração de Leads', rowsConfig.leads.length, openSections.leads, () => setOpenSections(prev => ({ ...prev, leads: !prev.leads })))}
                {openSections.leads && rowsConfig.leads.map((row, idx) => renderRow(row, idx))}

                {/* 4. CONVERSÃO */}
                {renderSectionHeader('Conversão', rowsConfig.conversao.length, openSections.conversao, () => setOpenSections(prev => ({ ...prev, conversao: !prev.conversao })))}
                {openSections.conversao && rowsConfig.conversao.map((row, idx) => renderRow(row, idx))}

                {/* 5. FINANCEIRO */}
                {renderSectionHeader('Financeiro', rowsConfig.financeiro.length, openSections.financeiro, () => setOpenSections(prev => ({ ...prev, financeiro: !prev.financeiro })))}
                {openSections.financeiro && rowsConfig.financeiro.map((row, idx) => renderRow(row, idx))}
              </tbody>

            </table>
          </div>
        </div>

        {/* LINHA 5: ALERTAS (CARTÕES INTELIGENTES) */}
        <div className="space-y-6 pt-4 text-left">
          <div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Central de Otimização</span>
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mt-1">Alertas Operacionais</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'red', title: 'CPA acima da meta', impact: 'Crítico', priority: 'Alta', action: 'Considerar pausar públicos de engajamento secundários no Facebook e otimizar criativos com CTR inferior a 1.20%.' },
              { type: 'yellow', title: 'CTR abaixo da média', impact: 'Moderado', priority: 'Média', action: 'A fadiga criativa dos banners está alta. Recomenda-se subir 3 novas variações de ganchos em vídeo até sexta.' },
              { type: 'green', title: 'ROAS excelente detectado', impact: 'Positivo', priority: 'Alta', action: 'ROAS superior a 1.70x no funil geral. Autorizada escala vertical de orçamento em 15% na campanha principal.' }
            ].map((alert, i) => (
              <div key={i} className="bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between h-48 hover:scale-[1.02] hover:border-zinc-700 transition-all ring-1 ring-inset ring-white/5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      alert.type === 'red' ? 'bg-rose-500/10 text-rose-500' : alert.type === 'yellow' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      🔴 {alert.title}
                    </span>
                    <span className="text-[9.5px] text-zinc-450 font-bold uppercase tracking-wider">Impacto: {alert.impact}</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 leading-relaxed mt-3.5">
                    {alert.action}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3.5">
                  <span className="text-[9.5px] text-zinc-450 font-bold uppercase tracking-wider">Prioridade: {alert.priority}</span>
                  <button className="text-[9.5px] font-black uppercase text-yellow-400 hover:underline hover:text-yellow-300 transition-colors">Resolver Alerta</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL DE HISTÓRICO DE MÉTRICAS DA ETAPA SELECIONADA */}
        {selectedStageModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedStageModal(null)}
          >
            <div 
              className={`max-w-4xl w-full rounded-[28px] p-6 shadow-2xl border text-left flex flex-col max-h-[88vh] overflow-hidden ${
                isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#121214] border-zinc-800 text-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className={`flex items-center justify-between pb-5 border-b ${
                isLight ? 'border-zinc-200' : 'border-zinc-850'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-500 shadow-md shrink-0">
                    {selectedStageModal === 'topo' && <Target className="w-6 h-6" />}
                    {selectedStageModal === 'meio' && <LinkIcon className="w-6 h-6" />}
                    {selectedStageModal === 'fundo' && <ShoppingBag className="w-6 h-6" />}
                    {selectedStageModal === 'fin' && <DollarSign className="w-6 h-6" />}
                    {selectedStageModal === 'geral' && <Activity className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Diagnóstico & Histórico</span>
                      <span className="bg-yellow-400/20 text-yellow-500 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                        {selectedStageModal === 'geral' ? `${scores.geral}/100 Geral` : `${scores[selectedStageModal]}% Score`}
                      </span>
                    </div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight mt-0.5">
                      {selectedStageModal === 'topo' && 'Topo do Funil — Engajamento & CPM'}
                      {selectedStageModal === 'meio' && 'Meio do Funil — Leads & Conversão'}
                      {selectedStageModal === 'fundo' && 'Fundo do Funil — Compras & CPA'}
                      {selectedStageModal === 'fin' && 'Financeiro — ROAS & Rentabilidade'}
                      {selectedStageModal === 'geral' && 'Saúde Geral do Funil — Resumo Executivo'}
                    </h3>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedStageModal(null)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isLight ? 'border-zinc-200 hover:bg-zinc-100 text-zinc-500' : 'border-zinc-800 hover:bg-zinc-900 text-zinc-400'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Conteúdo da Tabela de Métricas Históricas */}
              <div className="flex-1 overflow-y-auto overflow-x-auto py-4 space-y-4">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className={`border-b ${isLight ? 'border-zinc-200 text-zinc-500 bg-zinc-50' : 'border-zinc-850 text-zinc-400 bg-zinc-950/60'}`}>
                      <th className="p-3 font-black uppercase tracking-wider">Métrica</th>
                      {months.map(m => (
                        <th key={m.month} className="p-3 font-black uppercase tracking-wider text-center">{m.month}</th>
                      ))}
                      <th className="p-3 font-black uppercase tracking-wider text-right">Evolução</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-zinc-200/60' : 'divide-zinc-900/60'}`}>
                    {(() => {
                      const rowsMap = {
                        topo: [
                          { key: 'impressões', label: 'Impressões Totais', format: 'number' },
                          { key: 'alcance', label: 'Alcance Estimado', format: 'number' },
                          { key: 'cpm', label: 'CPM (Custo por Mil)', format: 'currency' },
                          { key: 'clicks', label: 'Cliques no Link', format: 'number' },
                          { key: 'ctr', label: 'CTR (Taxa de Clique %)', format: 'percent' },
                          { key: 'cpc', label: 'CPC (Custo por Clique)', format: 'currency' }
                        ],
                        meio: [
                          { key: 'lpViews', label: 'Page Views (Visitas à LP)', format: 'number' },
                          { key: 'custoLpView', label: 'Custo por Visita LP', format: 'currency' },
                          { key: 'leads', label: 'Leads / Contatos Gerados', format: 'number' },
                          { key: 'cpl', label: 'CPL (Custo por Lead)', format: 'currency' },
                          { key: 'txCliqueLead', label: 'Taxa Clique -> Lead (%)', format: 'percent' }
                        ],
                        fundo: [
                          { key: 'checkout', label: 'Iniciou Checkout / Carrinho', format: 'number' },
                          { key: 'custoCheckout', label: 'Custo por Checkout', format: 'currency' },
                          { key: 'compras', label: 'Compras / Vendas Realizadas', format: 'number' },
                          { key: 'cpa', label: 'CPA (Custo por Aquisição)', format: 'currency' },
                          { key: 'ticketMedio', label: 'Ticket Médio', format: 'currency' }
                        ],
                        fin: [
                          { key: 'valorUsado', label: 'Investimento em Mídia', format: 'currency' },
                          { key: 'faturamento', label: 'Faturamento Bruto', format: 'currency' },
                          { key: 'lucroBruto', label: 'Lucro Bruto', format: 'currency' },
                          { key: 'roas', label: 'ROAS (Retorno em Anúncios)', format: 'multiplier' },
                          { key: 'roi', label: 'ROI (Retorno do Investimento)', format: 'percent' }
                        ],
                        geral: [
                          { key: 'valorUsado', label: 'Investimento Total', format: 'currency' },
                          { key: 'leads', label: 'Leads Gerados', format: 'number' },
                          { key: 'compras', label: 'Vendas Totais', format: 'number' },
                          { key: 'faturamento', label: 'Faturamento Bruto', format: 'currency' },
                          { key: 'roas', label: 'ROAS Geral', format: 'multiplier' }
                        ]
                      };

                      const activeRows = rowsMap[selectedStageModal];

                      return activeRows.map((r, idx) => {
                        const firstVal = getVal(months[0], r.key, 'current');
                        const lastVal = getVal(months[months.length - 1], r.key, 'current');
                        const varPct = firstVal > 0 ? ((lastVal - firstVal) / firstVal) * 100 : 0;
                        const isGood = ['cpm', 'cpc', 'cpl', 'cpa', 'custoLpView', 'custoCheckout'].includes(r.key) ? varPct <= 0 : varPct >= 0;

                        return (
                          <tr key={idx} className="hover:bg-yellow-400/5 transition-colors">
                            <td className="p-3 font-bold">{r.label}</td>
                            {months.map(m => (
                              <td key={m.month} className="p-3 text-center font-mono text-[10.5px]">
                                {formatCell(getVal(m, r.key, 'current'), r.format)}
                              </td>
                            ))}
                            <td className={`p-3 text-right font-black ${isGood ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {varPct >= 0 ? '▲' : '▼'} {Math.abs(varPct).toFixed(1)}%
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>

              {/* Footer do Modal */}
              <div className={`pt-4 border-t flex justify-end ${isLight ? 'border-zinc-200' : 'border-zinc-850'}`}>
                <button 
                  onClick={() => setSelectedStageModal(null)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PerformanceDashboard;
