import React, { useState, useEffect } from 'react';
import { Slide, ProspectData } from '../types';
import Logo from './Logo';
import { ChevronLeft, ChevronRight, Check, HelpCircle, Zap, CheckCircle2, MessageCircle, Building2, AlertTriangle, BarChart3, Search, Palette, Brain, Wallet, Lightbulb, Target, TrendingUp, Star, Filter, Cog, ClipboardList, Rocket, CheckCheck, Edit3 } from 'lucide-react';

interface PresentationProps {
  slides: Slide[];
  prospect: ProspectData;
  onExit: () => void;
  onUpdateProspect?: (updated: ProspectData) => void;
}

const Presentation: React.FC<PresentationProps> = ({ slides, prospect, onExit, onUpdateProspect }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [localProspect, setLocalProspect] = useState<ProspectData>(prospect);

  useEffect(() => {
    setLocalProspect(prospect);
  }, [prospect]);

  const updateField = (field: keyof ProspectData, val: string) => {
    const updated = { ...localProspect, [field]: val };
    setLocalProspect(updated);
    if (onUpdateProspect) {
      onUpdateProspect(updated);
    }
  };

  const EditableField: React.FC<{
    value: string;
    onChange: (val: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
  }> = ({ value, onChange, className = '', multiline = false, placeholder = '' }) => {
    const clean = (str: string) => (str || '').replace(/[\[\]]/g, '');

    if (!isEditing) {
      return <span className={className}>{clean(value)}</span>;
    }

    const inputClasses = `${className} bg-transparent text-inherit font-[inherit] tracking-[inherit] leading-[inherit] select-text pointer-events-auto border-b-2 border-dashed border-yellow-400/90 focus:border-yellow-400 focus:bg-yellow-400/10 focus:outline-none transition-all w-full z-50 relative px-1 py-0.5 rounded-sm`;

    if (multiline) {
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          placeholder={placeholder}
          rows={2}
          className={inputClasses}
        />
      );
    }

    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        placeholder={placeholder}
        className={inputClasses}
      />
    );
  };

  const slide = slides[currentStep];

  const next = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentStep < slides.length - 1) {
          setCurrentStep(prevStep => prevStep + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentStep > 0) {
          setCurrentStep(prevStep => prevStep - 1);
        }
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, slides.length, onExit]);

  const personalizeText = (text: string) => {
    if (!text) return "";
    const cleaned = text.replace(/[\[\]]/g, '');
    return cleaned.replace(/você|negócio|empresa|seu restaurante|o restaurante|prospect/gi, localProspect.name);
  };

  const cleanText = (str?: string) => {
    if (!str) return '';
    return str.replace(/[\[\]]/g, '').trim();
  };

  const renderSlideContent = (slide: Slide) => {
    switch (slide.type) {
      case 'proposal-cover':
        return (
          <div className="flex-1 flex flex-col justify-between -m-8 md:-m-12 p-8 md:p-14 bg-brand-yellow text-black relative overflow-hidden">
            {/* Texture background */}
            <div 
              className="absolute inset-0 opacity-[0.07] pointer-events-none" 
              style={{
                backgroundSize: '40px 40px',
                backgroundImage: `
                  linear-gradient(to right, #000000 1.5px, transparent 1.5px),
                  linear-gradient(to bottom, #000000 1.5px, transparent 1.5px)
                `
              }}
            />

            {/* Top Bar: Pill Tag Left, Brand Logo Right */}
            <div className="flex justify-between items-center relative z-10">
              <span className="bg-black text-brand-yellow px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg">
                <EditableField
                  value={localProspect.coverTag || 'PROPOSTA COMERCIAL'}
                  onChange={(v) => updateField('coverTag' as any, v)}
                />
              </span>
              <div className="flex items-center space-x-2">
                <Logo className="h-8 sm:h-10 w-auto" color="#0A0A0A" />
              </div>
            </div>

            {/* Center Content: Main Company Name & Subtitle */}
            <div className="my-auto py-12 relative z-10 max-w-5xl space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-black tracking-tight leading-none uppercase">
                <EditableField
                  value={localProspect.name}
                  onChange={(v) => updateField('name', v)}
                  placeholder="Nome da Empresa"
                />
              </h1>
              <div className="inline-block bg-black text-brand-yellow px-6 py-3.5 rounded-2xl shadow-xl">
                <p className="text-sm sm:text-xl font-bold tracking-tight">
                  <EditableField
                    value={localProspect.coverSubtitle || 'Como vamos colocar seu negócio em loop de crescimento'}
                    onChange={(v) => updateField('coverSubtitle' as any, v)}
                    multiline
                  />
                </p>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="relative z-10 pt-6 border-t border-black/10 flex justify-between items-center text-xs sm:text-sm font-black uppercase tracking-wider text-black/80">
              <span>
                <EditableField
                  value={localProspect.coverFooter || `REUNIÃO DE DIAGNÓSTICO · ${new Date().toLocaleDateString('pt-BR')}`}
                  onChange={(v) => updateField('coverFooter' as any, v)}
                />
              </span>
            </div>
          </div>
        );

      case 'proposal-agenda':
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl lg:text-6xl font-extrabold text-yellow-400 leading-tight tracking-tight uppercase mb-2">
                  <EditableField
                    value={localProspect.agendaTitle || cleanText(slide.title) || 'O QUE VAMOS VER HOJE'}
                    onChange={(v) => updateField('agendaTitle' as any, v)}
                  />
                </h3>
                <p className="text-sm lg:text-base text-zinc-400 font-medium italic">
                  <EditableField
                    value={localProspect.agendaSubtitle || cleanText(slide.subtitle) || '~25-28 minutos · fique à vontade para interromper e perguntar'}
                    onChange={(v) => updateField('agendaSubtitle' as any, v)}
                  />
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { keyStep: 'agendaStep1Title', keyDesc: 'agendaStep1Desc', defaultTitle: 'O que entendemos', defaultDesc: 'Sobre o seu momento e desafio atual', icon: <TrendingUp className="w-6 h-6 text-yellow-400" />, stepNum: 'PASSO 01' },
                  { keyStep: 'agendaStep2Title', keyDesc: 'agendaStep2Desc', defaultTitle: 'O que analisamos e qual o seu objetivo', defaultDesc: 'O resultado de negócio que importa', icon: <Target className="w-6 h-6 text-yellow-400" />, stepNum: 'PASSO 02' },
                  { keyStep: 'agendaStep3Title', keyDesc: 'agendaStep3Desc', defaultTitle: 'Nossa proposta', defaultDesc: 'Como vamos estruturar o trabalho', icon: <Lightbulb className="w-6 h-6 text-yellow-400" />, stepNum: 'PASSO 03' },
                  { keyStep: 'agendaStep4Title', keyDesc: 'agendaStep4Desc', defaultTitle: 'Investimento e passos', defaultDesc: 'Condições e como começamos', icon: <Wallet className="w-6 h-6 text-yellow-400" />, stepNum: 'PASSO 04' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl flex flex-col justify-between min-h-[220px] hover:border-yellow-400/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      {item.icon}
                      <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full">
                        {item.stepNum}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                        <EditableField
                          value={(localProspect as any)[item.keyStep] || item.defaultTitle}
                          onChange={(v) => updateField(item.keyStep as any, v)}
                        />
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                        <EditableField
                          value={(localProspect as any)[item.keyDesc] || item.defaultDesc}
                          onChange={(v) => updateField(item.keyDesc as any, v)}
                          multiline
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'proposal-understanding': {
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight uppercase mb-2">
                  O que entendemos sobre <span className="text-yellow-400">
                    <EditableField
                      value={localProspect.name}
                      onChange={(v) => updateField('name', v)}
                    />
                  </span>
                </h3>
                <p className="text-sm lg:text-base text-zinc-400 font-medium italic">
                  Com base no que você nos contou no formulário de agendamento
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Segmento */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl space-y-3">
                  <div className="flex items-center space-x-3 text-yellow-400 font-black text-xs uppercase tracking-widest">
                    <Building2 className="w-5 h-5 text-yellow-400 shrink-0" />
                    <span>SEGMENTO</span>
                  </div>
                  <p className="text-lg font-bold text-zinc-200 leading-relaxed">
                    <EditableField
                      value={localProspect.segment || 'Mercado Relevante'}
                      onChange={(v) => updateField('segment', v)}
                    />
                  </p>
                </div>

                {/* Card Problema */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl space-y-3">
                  <div className="flex items-center space-x-3 text-yellow-400 font-black text-xs uppercase tracking-widest">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
                    <span>PROBLEMA A SER RESOLVIDO</span>
                  </div>
                  <p className="text-lg font-bold text-zinc-200 leading-relaxed">
                    <EditableField
                      value={localProspect.mainPainPoint || 'Custo de aquisição elevado e falta de previsibilidade.'}
                      onChange={(v) => updateField('mainPainPoint', v)}
                      multiline
                    />
                  </p>
                </div>
              </div>

              {/* Card Situação de Marketing */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-3">
                <div className="flex items-center space-x-3 text-yellow-400 font-black text-xs uppercase tracking-widest">
                  <BarChart3 className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span>SITUAÇÃO DE MARKETING</span>
                </div>
                <p className="text-lg font-bold text-zinc-200 leading-relaxed italic">
                  <EditableField
                    value={localProspect.marketingSituation || 'Investimento sem rastreamento unificado de conversão.'}
                    onChange={(v) => updateField('marketingSituation', v)}
                    multiline
                  />
                </p>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-findings': {
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl lg:text-5xl font-extrabold text-yellow-400 leading-tight tracking-tight uppercase mb-2">
                  O que vimos e qual o seu objetivo
                </h3>
                <p className="text-sm lg:text-base text-zinc-400 font-medium italic">
                  Com base no que analisamos e o que nos contou
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Achado 1 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl space-y-3">
                  <div className="flex items-center space-x-3 text-white font-extrabold text-xl tracking-tight">
                    <Search className="w-6 h-6 text-yellow-400 shrink-0" />
                    <span>Achado 1</span>
                  </div>
                  <p className="text-base font-semibold text-zinc-300 leading-relaxed italic">
                    <EditableField
                      value={localProspect.auditFinding1 || 'Gargalos no rastreamento e retenção de leads.'}
                      onChange={(v) => updateField('auditFinding1', v)}
                      multiline
                    />
                  </p>
                </div>

                {/* Achado 2 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl space-y-3">
                  <div className="flex items-center space-x-3 text-white font-extrabold text-xl tracking-tight">
                    <BarChart3 className="w-6 h-6 text-yellow-400 shrink-0" />
                    <span>Achado 2</span>
                  </div>
                  <p className="text-base font-semibold text-zinc-300 leading-relaxed italic">
                    <EditableField
                      value={localProspect.auditFinding2 || 'Ausência de testes A/B contínuos de criativos.'}
                      onChange={(v) => updateField('auditFinding2', v)}
                      multiline
                    />
                  </p>
                </div>
              </div>

              {/* Card Onde você quer chegar */}
              <div className="bg-zinc-900/80 border-2 border-yellow-400 p-8 rounded-3xl space-y-4 shadow-[0_0_40px_rgba(250,204,21,0.15)]">
                <div className="flex items-center space-x-3 text-yellow-400 font-black text-xs uppercase tracking-widest">
                  <Target className="w-6 h-6 text-yellow-400 shrink-0" />
                  <span>ONDE VOCÊ QUER CHEGAR</span>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
                  <EditableField
                    value={localProspect.businessGoal || 'Escalar faturamento mantendo a margem de lucro.'}
                    onChange={(v) => updateField('businessGoal', v)}
                    multiline
                  />
                </p>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-pillars': {
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight uppercase mb-2">
                  Nossa proposta para <span className="text-yellow-400">
                    <EditableField
                      value={localProspect.name}
                      onChange={(v) => updateField('name', v)}
                    />
                  </span>
                </h3>
                <p className="text-sm lg:text-base text-zinc-400 font-medium italic">
                  Conectada diretamente ao que você nos contou
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Frente 1 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-4 hover:border-yellow-400/40 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                    Frente 01 · Aquisição
                  </h4>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed italic">
                    <EditableField
                      value={localProspect.front1 || 'Tráfego Pago — Engenharia de aquisição direta de clientes.'}
                      onChange={(v) => updateField('front1', v)}
                      multiline
                    />
                  </p>
                </div>

                {/* Frente 2 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-4 hover:border-yellow-400/40 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                    Frente 02 · Conversão
                  </h4>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed italic">
                    <EditableField
                      value={localProspect.front2 || 'Otimização de Funil — Maximização da taxa de conversão.'}
                      onChange={(v) => updateField('front2', v)}
                      multiline
                    />
                  </p>
                </div>

                {/* Frente 3 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-4 hover:border-yellow-400/40 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                    Frente 03 · Retenção
                  </h4>
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed italic">
                    <EditableField
                      value={localProspect.front3 || 'Posicionamento & Retenção — Fortalecimento de marca e LTV.'}
                      onChange={(v) => updateField('front3', v)}
                      multiline
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-investment': {
        return (
          <div className="flex-1 flex flex-col justify-between -m-8 md:-m-12 p-8 md:p-14 bg-brand-yellow text-black relative overflow-hidden select-none">
            {/* Header */}
            <div>
              <h3 className="text-5xl lg:text-7xl font-extrabold text-black leading-none tracking-tight uppercase mb-3">
                Investimento
              </h3>
              <p className="text-sm lg:text-lg text-black/90 font-bold italic max-w-3xl">
                Sem fidelidade após o setup — se não entregarmos o combinado no prazo, você sai sem multa.
              </p>
            </div>

            {/* Main Dark Container */}
            <div className="my-auto bg-[#111111] text-white p-8 lg:p-12 rounded-[36px] shadow-2xl border border-black/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Plan Name & Subtitle */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-brand-yellow fill-brand-yellow shrink-0" />
                  <h4 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
                    <EditableField
                      value={localProspect.planName || 'Essencial'}
                      onChange={(v) => updateField('planName', v)}
                    />
                  </h4>
                </div>
                <p className="text-sm text-zinc-400 font-semibold leading-relaxed italic">
                  <EditableField
                    value={localProspect.planDesc || 'Fase de setup: construção da esteira, ainda sem o ciclo completo rodando.'}
                    onChange={(v) => updateField('planDesc', v)}
                    multiline
                  />
                </p>
              </div>

              {/* Right Column: 2 Price Cards */}
              <div className="md:col-span-7 flex flex-col space-y-4">
                {/* Meses 1-2 Setup */}
                <div className="bg-[#1C1C1C] border border-zinc-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">MESES 1-2 · SETUP</span>
                  <div className="text-3xl lg:text-4xl font-extrabold text-brand-yellow">
                    <EditableField
                      value={localProspect.setupPrice || 'R$ 2.000'}
                      onChange={(v) => updateField('setupPrice', v)}
                    /> <span className="text-sm text-white font-normal">/mês</span>
                  </div>
                </div>

                {/* Mês 3+ Operação */}
                <div className="bg-[#1C1C1C] border border-zinc-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">MÊS 3+ · OPERAÇÃO</span>
                  <div className="text-3xl lg:text-4xl font-extrabold text-white">
                    <EditableField
                      value={localProspect.operationPrice || 'R$ 3.000'}
                      onChange={(v) => updateField('operationPrice', v)}
                    /> <span className="text-sm text-white font-normal">/mês</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bullet Note */}
            <div className="pt-4 flex items-center space-x-3 text-xs sm:text-sm font-bold text-black/90">
              <span className="w-2 h-2 rounded-full bg-black shrink-0" />
              <span>Verba de mídia paga é sempre separada da mensalidade de gestão, conforme o pacote contratado.</span>
            </div>
          </div>
        );
      }

      case 'proposal-how-it-works': {
        return (
          <div className="flex-1 flex flex-col justify-center space-y-10">
            {/* Top Stepper Timeline */}
            <div>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-yellow-400 leading-tight tracking-tight uppercase mb-6">
                Como funciona na prática
              </h3>

              <div className="relative flex items-center justify-between max-w-4xl mx-auto py-4">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-zinc-700 -translate-y-6 z-0" />

                {[
                  { title: 'Diagnóstico', icon: <Search className="w-6 h-6 text-black" /> },
                  { title: 'Estrutura', icon: <Filter className="w-6 h-6 text-black" /> },
                  { title: 'Operação', icon: <Cog className="w-6 h-6 text-black" /> },
                  { title: 'Escala', icon: <TrendingUp className="w-6 h-6 text-black" /> }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg border-4 border-zinc-950">
                      {step.icon}
                    </div>
                    <span className="text-sm font-extrabold text-white tracking-tight uppercase">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Deliverables Section */}
            <div className="space-y-4">
              <h4 className="text-2xl font-extrabold text-yellow-400 tracking-tight uppercase">
                O que está incluso
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0 mt-0.5" />
                    <EditableField
                      value={localProspect.activeCampaignsCount || 'Até 4 campanhas ativas otimizadas por mês'}
                      onChange={(v) => updateField('activeCampaignsCount', v)}
                      multiline
                      className="text-base font-semibold text-zinc-200"
                    />
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0 mt-0.5" />
                    <EditableField
                      value={localProspect.creativesCount || '8 a 12 peças publicitárias e criativos por mês'}
                      onChange={(v) => updateField('creativesCount', v)}
                      multiline
                      className="text-base font-semibold text-zinc-200"
                    />
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0 mt-0.5" />
                    <EditableField
                      value={localProspect.meetingFrequency || 'Reuniões quinzenais de alinhamento e estratégia'}
                      onChange={(v) => updateField('meetingFrequency', v)}
                      multiline
                      className="text-base font-semibold text-zinc-200"
                    />
                  </div>
                </div>

                {/* Column 2 */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0 mt-0.5" />
                    <EditableField
                      value={localProspect.reportFormat || 'Relatórios de performance quinzenais com dashboards ao vivo'}
                      onChange={(v) => updateField('reportFormat', v)}
                      multiline
                      className="text-base font-semibold text-zinc-200"
                    />
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0 mt-0.5" />
                    <EditableField
                      value={localProspect.includedChannels || 'Canais inclusos: Meta Ads (Instagram & Facebook) + Google Ads'}
                      onChange={(v) => updateField('includedChannels', v)}
                      multiline
                      className="text-base font-semibold text-zinc-200"
                    />
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20 shrink-0 mt-0.5" />
                    <EditableField
                      value={localProspect.landingPageIncluded || 'Criação e otimização contínua de páginas de conversão'}
                      onChange={(v) => updateField('landingPageIncluded', v)}
                      multiline
                      className="text-base font-semibold text-zinc-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-next-steps': {
        return (
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-4xl lg:text-6xl font-extrabold text-yellow-400 leading-tight tracking-tight uppercase mb-2">
                Próximos passos
              </h3>
              <p className="text-sm lg:text-base text-zinc-400 font-medium italic">
                Abrimos 1 onboarding novo por vez — é assim que garantimos atenção total a cada cliente nos primeiros 60 dias.
              </p>
            </div>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 01 Assinatura */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl relative overflow-hidden group hover:border-yellow-400/50 transition-all">
                <span className="absolute top-4 right-6 text-5xl font-black text-zinc-800 group-hover:text-yellow-400/20 transition-colors pointer-events-none select-none">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-extrabold text-white tracking-tight mb-1">Assinatura</h4>
                <p className="text-xs text-zinc-400 font-medium italic">Contrato e condições combinadas</p>
              </div>

              {/* Card 02 Kickoff */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl relative overflow-hidden group hover:border-yellow-400/50 transition-all">
                <span className="absolute top-4 right-6 text-5xl font-black text-zinc-800 group-hover:text-yellow-400/20 transition-colors pointer-events-none select-none">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6">
                  <Rocket className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-extrabold text-white tracking-tight mb-1">Kickoff</h4>
                <p className="text-xs text-zinc-400 font-medium italic">
                  Em até <EditableField value={localProspect.kickoffDays || '2'} onChange={(v) => updateField('kickoffDays', v)} /> dias úteis
                </p>
              </div>

              {/* Card 03 Primeiras Entregas */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-7 rounded-3xl relative overflow-hidden group hover:border-yellow-400/50 transition-all">
                <span className="absolute top-4 right-6 text-5xl font-black text-zinc-800 group-hover:text-yellow-400/20 transition-colors pointer-events-none select-none">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6">
                  <CheckCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-extrabold text-white tracking-tight mb-1">Primeiras entregas</h4>
                <p className="text-xs text-zinc-400 font-medium italic">
                  Em até <EditableField value={localProspect.deliveriesDays || '5'} onChange={(v) => updateField('deliveriesDays', v)} /> dias úteis
                </p>
              </div>
            </div>

            {/* Giant Yellow Banner */}
            <div className="bg-yellow-400 text-black p-8 sm:p-10 rounded-3xl shadow-2xl text-center">
              <h4 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight">
                Faz sentido pra você começarmos ainda esse mês?
              </h4>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-zinc-400 italic text-center font-medium">
              Se topar, o próximo passo é: assinatura do contrato → kickoff em até {localProspect.kickoffDays || '2'} dias úteis → primeiras entregas em até {localProspect.deliveriesDays || '5'} dias úteis.
            </p>
          </div>
        );
      }
      case 'metrics':
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4 w-full">
                  <span className="px-3 py-1 bg-zinc-900 text-yellow-400 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border border-zinc-800">
                    MÓDULO ESTRATÉGICO
                  </span>
                </div>
                <h3 className="text-4xl lg:text-[52px] font-black text-white leading-[1] tracking-tight italic uppercase mb-4">
                  {personalizeText(slide.title)}
                </h3>
                {slide.subtitle && (
                  <p className="text-base lg:text-lg text-zinc-400 font-bold max-w-2xl leading-snug tracking-tight border-l-2 border-yellow-400/30 pl-6 italic">
                    {personalizeText(slide.subtitle)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {slide.metrics?.map((m, idx) => (
                  <div key={idx} className="bg-zinc-900/40 backdrop-blur border border-zinc-800 p-8 rounded-[32px] border-b-4 border-b-yellow-400 shadow-xl group hover:bg-zinc-900 transition-all flex flex-col justify-center min-h-[220px]">
                    <div className="text-zinc-500 font-black mb-4 uppercase text-[9px] tracking-[0.2em]">{m.label}</div>
                    <div className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter group-hover:text-yellow-400 transition-colors uppercase italic leading-none">{m.value}</div>
                    <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed">{m.desc}</div>
                  </div>
                ))}
              </div>

              {slide.highlight && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl ml-0">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter">
                      "{personalizeText(slide.highlight)}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'roadmap':
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4 w-full">
                  <span className="px-3 py-1 bg-zinc-900 text-yellow-400 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border border-zinc-800">
                    MÓDULO ESTRATÉGICO
                  </span>
                </div>
                <h3 className="text-4xl lg:text-[52px] font-black text-white leading-[1] tracking-tight italic uppercase mb-4">
                  {personalizeText(slide.title)}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {slide.content.map((item, idx) => {
                  const [header, desc] = item.split(': ');
                  return (
                    <div key={idx} className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[40px] relative overflow-hidden group hover:border-yellow-400/30 transition-all min-h-[220px] flex flex-col justify-center">
                      <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 italic">0{idx + 1}</div>
                      <div className="text-yellow-400 font-black text-[10px] uppercase tracking-widest mb-6 bg-yellow-400/10 w-fit px-4 py-1 rounded-full">{header}</div>
                      <div className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight relative z-10">
                        {personalizeText(desc)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {slide.highlight && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter">
                      "{personalizeText(slide.highlight)}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'comparison':
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4 w-full">
                  <span className="px-3 py-1 bg-zinc-900 text-yellow-400 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border border-zinc-800">
                    MÓDULO ESTRATÉGICO
                  </span>
                </div>
                <h3 className="text-4xl lg:text-[52px] font-black text-white leading-[1] tracking-tight italic uppercase mb-4">
                  {personalizeText(slide.title)}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-zinc-950 p-10 rounded-[40px] border border-zinc-900 relative">
                  <div className="absolute -top-4 left-10 bg-zinc-900 px-6 py-2 rounded-xl text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cenário A</div>
                  <h4 className="text-2xl font-black text-zinc-400 mb-8 uppercase tracking-tighter italic">Gestão Tradicional</h4>
                  <ul className="space-y-4">
                    {slide.content[0].split(',').map((item, i) => (
                      <li key={i} className="flex items-start text-zinc-500 font-bold text-base leading-tight">
                        <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full mr-4 mt-2 shrink-0"></span>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-zinc-900/50 p-10 rounded-[40px] border-2 border-yellow-400 shadow-[0_0_80px_rgba(250,204,21,0.1)] relative">
                  <div className="absolute -top-4 left-10 bg-yellow-400 px-6 py-2 rounded-xl text-[10px] font-black text-black uppercase tracking-widest">Cenário LoopFlow</div>
                  <h4 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter italic">Escala Inteligente</h4>
                  <ul className="space-y-5">
                    {slide.content[1].split(',').map((item, i) => (
                      <li key={i} className="flex items-center text-white font-black text-xl italic leading-tight">
                        <CheckCircle2 className="w-6 h-6 mr-4 text-yellow-400 shrink-0" />
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {slide.highlight && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter">
                      "{personalizeText(slide.highlight)}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'conclusion':
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4 w-full">
                  <span className="px-3 py-1 bg-zinc-900 text-yellow-400 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border border-zinc-800">
                    MÓDULO ESTRATÉGICO
                  </span>
                </div>
                <h3 className="text-4xl lg:text-[52px] font-black text-white leading-[1] tracking-tight italic uppercase mb-4">
                  {personalizeText(slide.title)}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {slide.content.map((item, i) => (
                  <div key={i} className="bg-zinc-900/40 p-8 rounded-[32px] border border-zinc-800 flex items-center space-x-6 hover:bg-zinc-900 transition-all min-h-[120px]">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 font-black text-sm">
                      {i + 1}
                    </div>
                    <div className="text-xl font-bold text-zinc-100 tracking-tight italic leading-snug">
                      {personalizeText(item)}
                    </div>
                  </div>
                ))}
              </div>

              {slide.highlight && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter">
                      "{personalizeText(slide.highlight)}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="flex items-center mb-4 w-full">
                    <span className="px-3 py-1 bg-zinc-900 text-yellow-400 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border border-zinc-800">
                      MÓDULO ESTRATÉGICO
                    </span>
                  </div>
                  <h3 className="text-4xl lg:text-[52px] font-black text-white leading-[1] tracking-tight italic uppercase mb-4">
                    {personalizeText(slide.title)}
                  </h3>
                  {slide.subtitle && (
                    <p className="text-base lg:text-lg text-zinc-400 font-bold max-w-2xl leading-snug tracking-tight border-l-2 border-yellow-400/30 pl-6 italic">
                      {personalizeText(slide.subtitle)}
                    </p>
                  )}
                </div>

                <ul className="space-y-4">
                  {slide.content.map((item, i) => (
                    <li key={i} className="flex items-start text-xl lg:text-2xl text-zinc-100 font-black leading-tight tracking-tight group italic">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black rounded-lg font-black flex items-center justify-center mr-5 group-hover:scale-110 transition-transform not-italic text-sm mt-1">
                        {i + 1}
                      </span>
                      {personalizeText(item)}
                    </li>
                  ))}
                </ul>

                {slide.highlight && (
                  <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                      SUCCESS
                    </div>
                    <div className="flex items-center space-x-5 relative z-10 text-black">
                      <div className="bg-black/10 p-2 rounded-xl shrink-0">
                        <Zap className="w-8 h-8" />
                      </div>
                      <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter">
                        "{personalizeText(slide.highlight)}"
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 h-[550px] relative group">
                <div className="w-full h-full bg-zinc-900/50 rounded-[40px] flex items-center justify-center overflow-hidden border border-zinc-800 shadow-2xl transform group-hover:rotate-1 transition-transform duration-700">
                  <img
                    src={currentStep % 3 === 0 ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" : currentStep % 3 === 1 ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" : "https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&q=80&w=1000"}
                    alt="Analytics Illustration"
                    className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col overflow-hidden">
      {/* LoopFlow Top Bar */}
      <div className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-[60]">
        <div className="max-w-[1600px] mx-auto w-full px-12 lg:px-20 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button onClick={onExit} className="flex items-center space-x-3 text-zinc-500 hover:text-white transition-all group uppercase font-black text-[10px] tracking-widest">
              <div className="p-1.5 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                <ChevronLeft className="w-4 h-4" strokeWidth={3} />
              </div>
              <span>Fechar</span>
            </button>

            <div className="h-8 w-px bg-zinc-800"></div>

            <div className="flex items-center space-x-4 bg-zinc-900/50 px-4 py-2 rounded-2xl border border-zinc-800">
              {localProspect.logo ? (
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src={localProspect.logo} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-yellow-400 text-black rounded-lg flex items-center justify-center text-sm font-black italic">{localProspect.name.substring(0, 1)}</div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-black text-sm uppercase tracking-tight truncate max-w-[180px] leading-none mb-1">{localProspect.name}</span>
                <span className="text-yellow-400 font-bold text-[8px] uppercase tracking-[0.2em] leading-none opacity-50">{localProspect.segment}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">PASSO</span>
              <span className="text-lg font-black text-yellow-400 leading-none italic">{currentStep + 1}<span className="text-zinc-800 mx-0.5">/</span><span className="text-zinc-700">{slides.length}</span></span>
            </div>

            <div className="flex items-center space-x-3">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-1.5 rounded-full transition-all duration-700 cursor-pointer ${idx === currentStep ? 'bg-yellow-400 w-16 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : idx < currentStep ? 'bg-zinc-600 w-6' : 'bg-zinc-800 w-4 hover:bg-zinc-700'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="flex-1 max-w-[1600px] mx-auto w-full px-12 lg:px-20 py-6 flex flex-col justify-center">
          {renderSlideContent(slide)}
        </div>

        {/* Global Navigation Controls */}
        <div className="absolute bottom-8 right-12 z-[70] flex items-center space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer backdrop-blur-xl border shadow-2xl ${
              isEditing
                ? 'bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.5)] border-yellow-300 animate-pulse'
                : 'bg-zinc-900/90 text-zinc-300 hover:text-white border-zinc-800 hover:border-yellow-400/50'
            }`}
          >
            <Edit3 className={`w-4 h-4 ${isEditing ? 'text-black' : 'text-yellow-400'}`} />
            <span>{isEditing ? 'Concluir Edição' : 'Ativar Edição'}</span>
          </button>

          <div className="flex bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-1.5 shadow-2xl">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className={`p-3.5 rounded-xl transition-all ${currentStep === 0
                ? 'text-zinc-800 cursor-not-allowed'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              title="Anterior (Tecla ←)"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={3} />
            </button>
            <div className="w-px bg-zinc-800 mx-1 my-2"></div>
            <button
              onClick={currentStep === slides.length - 1 ? onExit : next}
              className={`p-3.5 rounded-xl transition-all ${currentStep === slides.length - 1
                ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400 hover:text-black scale-105'
                : 'text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800'
                }`}
              title={currentStep === slides.length - 1 ? "Concluir Diagnóstico (Esc)" : "Próximo (Tecla → ou Espaço)"}
            >
              {currentStep === slides.length - 1 ? (
                <Check className="w-5 h-5" strokeWidth={4} />
              ) : (
                <ChevronRight className="w-5 h-5" strokeWidth={3} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
