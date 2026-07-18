import React, { useState, useEffect } from 'react';
import { ProspectData } from '../types';
import { 
  ChevronLeft,
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Sliders, 
  Lightbulb, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Share, 
  Smartphone, 
  Monitor, 
  Target, 
  Zap, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  ArrowDown, 
  Maximize2,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

interface PerformanceDashboardProps {
  prospect: ProspectData;
  onBack: () => void;
  isClientView?: boolean;
  initialData?: MonthData[];
}

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
  initialData
}) => {
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

    // Conversão
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
      <td colSpan={9} className="px-6 py-4 text-left">
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
    const val = currentRangeMetrics[row.key as keyof typeof currentRangeMetrics];
    const prevVal = prevRangeMetrics[row.key as keyof typeof prevRangeMetrics];
    const pct = prevVal > 0 ? ((val - prevVal) / prevVal) * 100 : 0;
    const isUp = pct >= 0;

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

        {/* Meta */}
        <td className="px-4 py-4 text-center text-xs font-bold text-zinc-500">
          {row.meta}
        </td>

        {/* Status */}
        <td className="px-4 py-4 text-center">
          <span className={`w-2 h-2 rounded-full inline-block ${
            isUp ? 'bg-emerald-500' : 'bg-rose-500'
          }`}></span>
        </td>

        {/* Sparkline */}
        <td className="px-4 py-4 text-center">
          <svg className="w-14 h-6 text-[#FFD400]/70 group-hover:text-[#FFD400] transition-colors" viewBox="0 0 50 18">
            <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={getSparklinePoints(row.key, currentKey)} />
          </svg>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen font-sans selection:bg-[#FFD400] selection:text-black pb-16">
      

      {/* HEADER PRINCIPAL */}
      <header className="max-w-7xl mx-auto px-8 pt-8 pb-6 border-b border-zinc-900 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">Dashboard</h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-2">Acompanhe toda a saúde do seu funil de aquisição e vendas.</p>
        </div>

        {/* Controles: período + ações */}
        <div className="flex items-center gap-2">
          {/* Dropdown Seletor de Período Meta-style */}
          <div className="relative">
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700 rounded-xl px-4 py-2.5 flex items-center gap-2 text-[10px] font-black text-white outline-none transition-all cursor-pointer select-none active:scale-95 shadow-md"
            >
              <Calendar className="w-4 h-4 text-yellow-400" />
              <span>
                {formatDateLabel(startDate)} – {formatDateLabel(endDate)}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDatePickerOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsDatePickerOpen(false)}
                />
                
                <div className="absolute right-0 top-12 mt-2 bg-[#0B0B0B] border border-zinc-900 rounded-[28px] p-6 shadow-2xl z-50 flex gap-6 min-w-[580px] text-left animate-fade-in">
                  
                  {/* Atalhos */}
                  <div className="w-48 shrink-0 flex flex-col gap-1 border-r border-zinc-900 pr-5">
                    <span className="text-[7.5px] font-black text-zinc-600 uppercase tracking-widest mb-2 pl-2.5">Períodos de Data</span>
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
                              : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
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
                      <span className="text-[7.5px] font-black text-zinc-650 uppercase tracking-widest block">Customizado</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-zinc-550 uppercase tracking-widest block pl-1">Início</label>
                          <input 
                            type="date"
                            min="2025-01-01"
                            max="2026-06-30"
                            value={localStart}
                            onChange={e => {
                              setLocalStart(e.target.value);
                              setPresetSelected('personalizado');
                            }}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3.5 py-2.5 text-white font-bold text-[11px] focus:border-yellow-400 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-zinc-550 uppercase tracking-widest block pl-1">Término</label>
                          <input 
                            type="date"
                            min="2025-01-01"
                            max="2026-06-30"
                            value={localEnd}
                            onChange={e => {
                              setLocalEnd(e.target.value);
                              setPresetSelected('personalizado');
                            }}
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3.5 py-2.5 text-white font-bold text-[11px] focus:border-yellow-400 outline-none transition-all"
                          />
                        </div>
                      </div>
                      
                      {localStart > localEnd && (
                        <p className="text-[8px] font-bold text-rose-500 uppercase tracking-wide">
                          A data de início não pode ser posterior à data de término.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-zinc-900 mt-4">
                      <button
                        onClick={() => {
                          if (localStart > localEnd) return;
                          setStartDate(localStart);
                          setEndDate(localEnd);
                          setIsDatePickerOpen(false);
                        }}
                        disabled={localStart > localEnd}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-20 disabled:pointer-events-none text-black font-black py-2.5 rounded-xl uppercase tracking-widest text-[9.5px] transition-colors cursor-pointer text-center"
                      >
                        Aplicar Período
                      </button>
                      <button
                        onClick={() => {
                          setLocalStart(startDate);
                          setLocalEnd(endDate);
                          setIsDatePickerOpen(false);
                        }}
                        className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-black rounded-xl uppercase tracking-widest text-[9.5px] transition-colors cursor-pointer"
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
          <div className="w-px h-5 bg-zinc-800" />

          {/* Importar CSV */}
          {!isClientView && (
            <label
              className="h-9 w-9 flex items-center justify-center bg-zinc-950 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Importar CSV"
            >
              <FileText className="w-3.5 h-3.5" />
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

          {/* Compartilhar */}
          <button 
            onClick={generateShareLink}
            className="h-9 w-9 flex items-center justify-center bg-zinc-950 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
            title={copied ? 'Link copiado!' : 'Compartilhar'}
          >
            <Share className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* CONTAINER PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 pt-10 space-y-12">
        
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
                <div key={i} className="bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[22px] p-6 flex flex-col justify-between h-44 relative overflow-hidden transition-all duration-300 group hover:scale-[1.03] hover:border-yellow-400/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/5">
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

        {/* SCORE DO FUNIL */}
        <div className="bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 grid grid-cols-1 md:grid-cols-5 gap-8 items-center text-left ring-1 ring-inset ring-white/5 shadow-xl">
          {/* Placar Geral */}
          <div className="md:col-span-1 border-r border-zinc-900/60 pr-6 flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-[5px] border-[#FFD400] flex items-center justify-center font-black text-white text-2xl shadow-[0_0_20px_rgba(255,212,0,0.3)] shrink-0">
              {scores.geral}
            </div>
            <div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Score Geral</span>
              <h4 className="text-base font-black italic uppercase tracking-tight text-white mt-1">Saúde Geral</h4>
              <div className="w-24 bg-zinc-950/80 h-2 border border-zinc-900 rounded-full mt-2 overflow-hidden">
                <div style={{ width: `${scores.geral}%` }} className="bg-[#FFD400] h-full"></div>
              </div>
            </div>
          </div>

          {/* Sub Scores */}
          {[
            { label: 'Topo do Funil', val: scores.topo, desc: 'Engajamento & CPM' },
            { label: 'Meio do Funil', val: scores.meio, desc: 'Leads & Conversões' },
            { label: 'Fundo do Funil', val: scores.fundo, desc: 'Compras & CPA' },
            { label: 'Financeiro', val: scores.fin, desc: 'ROAS & Faturamento' }
          ].map((sc, i) => (
            <div key={i} className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] lg:text-[11px] font-black text-zinc-400 uppercase tracking-wider">
                <span>{sc.label}</span>
                <span className="text-white font-black">{sc.val}%</span>
              </div>
              <div className="w-full bg-zinc-950/80 h-2 border border-zinc-900 rounded-full overflow-hidden">
                <div style={{ width: `${sc.val}%` }} className="bg-yellow-400/90 h-full"></div>
              </div>
              <span className="text-[10px] text-zinc-550 font-bold block">{sc.desc}</span>
            </div>
          ))}
        </div>

        {/* LINHA 2: FUNIL COMPLETO (13 ETAPAS) */}
        {currentRangeMetrics && (
          <div className="bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 text-left space-y-6 shadow-xl ring-1 ring-inset ring-white/5">
            <div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Acompanhamento Linear Comercial</span>
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mt-1">Funil Completo</h3>
            </div>

            {/* Grid de etapas horizontais scrollable */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 overflow-x-auto py-6">
              {[
                { label: 'Investimento', key: 'valorUsado', format: 'currency', desc: 'Mídia paga total' },
                { label: 'Impressões', key: 'impressões', format: 'number', desc: 'Visualizações de anúncios' },
                { label: 'Alcance', key: 'alcance', format: 'number', desc: 'Pessoas únicas atingidas' },
                { label: 'Cliques', key: 'clicks', format: 'number', desc: 'Cliques nos criativos' },
                { label: 'LP Views', key: 'lpViews', format: 'number', desc: 'Visitantes na página' },
                { label: 'Mensagens', key: 'mensagens', format: 'number', desc: 'Inícios de conversas' },
                { label: 'Leads', key: 'leads', format: 'number', desc: 'Leads totais cadastrados' },
                { label: 'Qualificados', key: 'qualificados', format: 'number', desc: 'MQLs filtrados' },
                { label: 'Propostas', key: 'propostas', format: 'number', desc: 'Reuniões ou propostas' },
                { label: 'Compras', key: 'compras', format: 'number', desc: 'Transações confirmadas' },
                { label: 'Vendas', key: 'vendas', format: 'number', desc: 'Pedidos fechados' },
                { label: 'Receita', key: 'receita', format: 'currency', desc: 'Entrada líquida' },
                { label: 'Lucro', key: 'lucroBruto', format: 'currency', desc: 'Resultado operacional' }
              ].map((stage, idx, arr) => {
                const val = currentRangeMetrics[stage.key as keyof typeof currentRangeMetrics];
                const prevVal = prevRangeMetrics[stage.key as keyof typeof prevRangeMetrics];
                const pct = prevVal > 0 ? ((val - prevVal) / prevVal) * 100 : 0;
                const isUp = pct >= 0;
                
                // Calcula a taxa de conversão em relação ao passo anterior
                let conversionRate = 0;
                if (idx > 0) {
                  const prevValOriginal = currentRangeMetrics[arr[idx - 1].key as keyof typeof currentRangeMetrics];
                  conversionRate = prevValOriginal > 0 ? (val / prevValOriginal) * 100 : 0;
                }

                return (
                  <React.Fragment key={idx}>
                    {/* Card da etapa */}
                    <div className="bg-[#0B0B0C] border border-zinc-900 rounded-2xl p-5 shrink-0 w-44 space-y-3 hover:border-yellow-400/40 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200">
                      <span className="text-[10px] text-yellow-400 font-extrabold uppercase tracking-wider block leading-none">{stage.label}</span>
                      <h4 className="text-lg font-black italic uppercase tracking-tight text-white leading-none mt-1">
                        {formatCell(val, stage.format)}
                      </h4>
                      <div className="flex justify-between items-center border-t border-zinc-900/60 pt-2.5 text-[9.5px] font-bold text-zinc-500">
                        <span className={isUp ? 'text-emerald-500' : 'text-rose-500'}>
                          {isUp ? '▲' : '▼'} {Math.abs(pct).toFixed(0)}%
                        </span>
                        <span className="truncate w-20 text-right" title={stage.desc}>{stage.desc}</span>
                      </div>
                    </div>

                    {/* Conector com taxa de conversão */}
                    {idx < arr.length - 1 && (
                      <div className="flex flex-row md:flex-col items-center justify-center gap-1.5 py-2 md:py-0 shrink-0">
                        <ArrowRight className="w-4 h-4 text-zinc-700 hidden md:block animate-pulse" />
                        <ArrowDown className="w-4 h-4 text-zinc-700 block md:hidden animate-pulse" />
                        <span className="bg-zinc-900 border border-zinc-850 text-zinc-400 text-[8px] lg:text-[9px] px-2 py-0.5 rounded-md font-black shadow-md uppercase tracking-widest">
                          {idx === 0 ? 'CTR' : `${conversionRate.toFixed(1)}%`}
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* SEÇÃO IA & INSIGHTS (DOIS PAINÉIS LADO A LADO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Inteligência: Recomendações da IA */}
          <div className="md:col-span-2 bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 text-left space-y-5 shadow-xl ring-1 ring-inset ring-white/5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-base font-black uppercase italic tracking-wider text-white">O que a IA recomenda</h3>
            </div>
            
            <div className="space-y-3">
              {getIaRecommendations().map((rec, i) => (
                <div key={i} className="bg-zinc-950/60 border border-zinc-900/60 p-4.5 rounded-2xl text-[11px] lg:text-xs font-semibold text-zinc-300 leading-relaxed shadow-sm">
                  {rec}
                </div>
              ))}
            </div>
          </div>

          {/* Painel Lateral: Insights Inteligentes */}
          <div className="md:col-span-1 bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 text-left space-y-5 shadow-xl ring-1 ring-inset ring-white/5">
            <div className="flex items-center gap-2.5">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="text-base font-black uppercase italic tracking-wider text-white">Insights Inteligentes</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'ROAS aumentou 18%', priority: 'Alta', status: 'green' },
                { label: 'CPA caiu nos anúncios', priority: 'Média', status: 'green' },
                { label: 'CTR abaixo da média', priority: 'Média', status: 'yellow' },
                { label: 'Conversão da Landing caiu', priority: 'Alta', status: 'red' },
                { label: 'Lucro bruto subiu', priority: 'Alta', status: 'green' }
              ].map((ins, i) => (
                <div key={i} className="bg-zinc-950/60 border border-zinc-900/60 p-4.5 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      ins.status === 'green' ? 'bg-emerald-500' : ins.status === 'yellow' ? 'bg-yellow-400' : 'bg-rose-500'
                    }`}></span>
                    <span className="text-[11px] lg:text-xs font-bold text-zinc-200">{ins.label}</span>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-wider text-yellow-400 hover:underline hover:text-yellow-300 transition-colors">Detalhes</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LINHA 3: GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Gráfico 1: Evolução do Funil */}
          <div className="lg:col-span-1 bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 text-left space-y-6 shadow-xl ring-1 ring-inset ring-white/5">
            <div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Histórico do Semestre</span>
              <h3 className="text-base font-black uppercase italic tracking-wider text-white mt-1">Evolução do Funil</h3>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-44 relative">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="300" y2="20" stroke="#18181b" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#18181b" strokeWidth="0.5" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#18181b" strokeWidth="0.5" />
                
                {/* Linha Investimento (Yellow) */}
                <polyline fill="none" stroke="#FFD400" strokeWidth="2.5" points="0,85 60,70 120,60 180,68 240,75 300,45" />
                
                {/* Linha Receita (Green) */}
                <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points="0,75 60,62 120,40 180,55 240,58 300,25" />
              </svg>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFD400]"></span> Investimento</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Receita</span>
            </div>
          </div>

          {/* Gráfico 2: Conversão entre Etapas */}
          <div className="lg:col-span-1 bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 text-left space-y-5 shadow-xl ring-1 ring-inset ring-white/5">
            <div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Fluxo Percentual</span>
              <h3 className="text-base font-black uppercase italic tracking-wider text-white mt-1">Conversão entre Etapas</h3>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                { label: 'Impressões ➔ Cliques (CTR)', pct: 2.1, color: 'bg-[#FFD400]' },
                { label: 'Cliques ➔ LP Views', pct: 88.0, color: 'bg-emerald-500' },
                { label: 'LP Views ➔ Mensagens', pct: 15.5, color: 'bg-[#FFD400]' },
                { label: 'Mensagens ➔ Leads', pct: 40.8, color: 'bg-emerald-500' },
                { label: 'Leads ➔ Propostas', pct: 35.0, color: 'bg-[#FFD400]' },
                { label: 'Propostas ➔ Vendas', pct: 53.0, color: 'bg-emerald-500' }
              ].map((bar, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] lg:text-[11px] font-bold text-zinc-300">
                    <span>{bar.label}</span>
                    <span className="text-white font-black">{bar.pct}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                    <div style={{ width: `${bar.pct}%` }} className={`h-full ${bar.color}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico 3: Distribuição dos Canais */}
          <div className="lg:col-span-1 bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-[28px] p-8 text-left space-y-6 shadow-xl ring-1 ring-inset ring-white/5">
            <div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Mix de Mídia</span>
              <h3 className="text-base font-black uppercase italic tracking-wider text-white mt-1">Distribuição dos Canais</h3>
            </div>

            <div className="flex items-center justify-around py-2 gap-4">
              {/* Donut */}
              <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#18181b" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FFD400" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a78bfa" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-45" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#818cf8" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-75" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e4e4e7" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="-90" />
                </svg>
                <div className="absolute w-10 h-10 rounded-full bg-[#0B0B0B] border border-zinc-900 flex items-center justify-center text-[#FFD400] shadow-md">
                  <Activity className="w-4 h-4" />
                </div>
              </div>

              {/* Legendas */}
              <div className="space-y-2 text-left">
                {[
                  { label: 'Meta Ads', pct: '45%', color: 'bg-[#FFD400]' },
                  { label: 'Google Ads', pct: '30%', color: 'bg-purple-400' },
                  { label: 'TikTok', pct: '15%', color: 'bg-indigo-400' },
                  { label: 'LinkedIn', pct: '10%', color: 'bg-zinc-300' }
                ].map((channel, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold text-zinc-300">
                    <span className={`w-2 h-2 rounded-full ${channel.color}`}></span>
                    <span className="w-20 truncate">{channel.label}</span>
                    <span className="text-white font-black">{channel.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* LINHA 4: TABELA EXECUTIVA DETALHADA */}
        <div className="bg-zinc-900/30 border border-zinc-850 rounded-[28px] overflow-hidden hover:border-zinc-800 transition-all shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[950px]">
              
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/60">
                  <th className="sticky left-0 bg-[#0B0B0B] px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 w-52 border-r border-zinc-900/60 z-20 text-left">
                    Métrica
                  </th>
                  <th className="px-4 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-right">Período Selecionado</th>
                  <th className="px-4 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-right">Comparativo Anterior</th>
                  <th className="px-4 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-right">Variação %</th>
                  <th className="px-4 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-center">Meta</th>
                  <th className="px-4 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-center">Status</th>
                  <th className="px-4 py-5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-center">Tendência</th>
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
              <div key={i} className="bg-[#121214]/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between h-48 hover:scale-[1.02] hover:border-zinc-700 transition-all shadow-xl ring-1 ring-inset ring-white/5">
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

      </main>
    </div>
  );
};

export default PerformanceDashboard;
