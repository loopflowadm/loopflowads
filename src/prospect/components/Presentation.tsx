import React, { useState, useEffect } from 'react';
import { Slide, ProspectData } from '../types';
import Logo, { BlueLogo } from './Logo';
import GLSLHills from './GLSLHills';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  HelpCircleIcon,
  FlashIcon,
  CheckmarkCircle01Icon,
  Comment01Icon,
  Building01Icon,
  Alert01Icon,
  BarChartIcon,
  Search01Icon,
  PaintBoardIcon,
  Brain01Icon,
  Wallet01Icon,
  Idea01Icon,
  Target01Icon,
  AnalyticsUpIcon,
  StarIcon,
  FilterIcon,
  Settings01Icon,
  ClipboardIcon,
  RocketIcon,
  CheckCheckIcon,
  Edit01Icon
} from '@hugeicons/core-free-icons';

const createHugeIcon = (icon: any) => (props: any) => (
  <HugeiconsIcon icon={icon} size={props.size || 20} className={props.className || ''} color={props.color || 'currentColor'} strokeWidth={props.strokeWidth || 1.5} />
);

const ChevronLeft = createHugeIcon(ChevronLeftIcon);
const ChevronRight = createHugeIcon(ChevronRightIcon);
const Check = createHugeIcon(CheckIcon);
const HelpCircle = createHugeIcon(HelpCircleIcon);
const Zap = createHugeIcon(FlashIcon);
const CheckCircle2 = createHugeIcon(CheckmarkCircle01Icon);
const MessageCircle = createHugeIcon(Comment01Icon);
const Building2 = createHugeIcon(Building01Icon);
const AlertTriangle = createHugeIcon(Alert01Icon);
const BarChart3 = createHugeIcon(BarChartIcon);
const Search = createHugeIcon(Search01Icon);
const Palette = createHugeIcon(PaintBoardIcon);
const Brain = createHugeIcon(Brain01Icon);
const Wallet = createHugeIcon(Wallet01Icon);
const Lightbulb = createHugeIcon(Idea01Icon);
const Target = createHugeIcon(Target01Icon);
const TrendingUp = createHugeIcon(AnalyticsUpIcon);
const Star = createHugeIcon(StarIcon);
const Filter = createHugeIcon(FilterIcon);
const Cog = createHugeIcon(Settings01Icon);
const Settings = createHugeIcon(Settings01Icon);
const ClipboardList = createHugeIcon(ClipboardIcon);
const Rocket = createHugeIcon(RocketIcon);
const CheckCheck = createHugeIcon(CheckCheckIcon);
const Edit3 = createHugeIcon(Edit01Icon);

const SmoothBgImage: React.FC<{ src: string; alt?: string; className?: string }> = ({ src, alt = '', className = 'absolute inset-0 w-full h-full object-cover z-0' }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-all duration-700 ease-out ${
        loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
      }`}
    />
  );
};

const SmoothBgVideo: React.FC<{
  src: string;
  className?: string;
  targetOpacityClass?: string;
}> = ({
  src,
  className = 'absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] object-cover object-right z-0 pointer-events-none',
  targetOpacityClass = 'opacity-100'
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      onLoadedData={() => setLoaded(true)}
      onCanPlay={() => setLoaded(true)}
      className={`${className} transition-all duration-1000 ease-out ${
        loaded ? `${targetOpacityClass} scale-100 blur-0` : 'opacity-0 scale-105 blur-sm'
      }`}
      src={src}
    />
  );
};

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
  const [localSlides, setLocalSlides] = useState<Slide[]>(slides);

  useEffect(() => {
    setLocalProspect(prospect);
  }, [prospect]);

  useEffect(() => {
    setLocalSlides(slides);
  }, [slides]);

  const updateField = (field: keyof ProspectData, val: string) => {
    const updated = { ...localProspect, [field]: val };
    setLocalProspect(updated);
    if (onUpdateProspect) {
      onUpdateProspect(updated);
    }
  };

  const updateSlideTitle = (newTitle: string) => {
    const updated = [...localSlides];
    updated[currentStep] = { ...updated[currentStep], title: newTitle };
    setLocalSlides(updated);
  };

  const updateSlideSubtitle = (newSubtitle: string) => {
    const updated = [...localSlides];
    updated[currentStep] = { ...updated[currentStep], subtitle: newSubtitle };
    setLocalSlides(updated);
  };

  const updateSlideContentItem = (index: number, val: string) => {
    const updated = [...localSlides];
    const newContent = [...(updated[currentStep].content || [])];
    newContent[index] = val;
    updated[currentStep] = { ...updated[currentStep], content: newContent };
    setLocalSlides(updated);
  };

  const updateSlideMetricField = (mIdx: number, field: 'label' | 'value' | 'desc', val: string) => {
    const updated = [...localSlides];
    const currentMetrics = [...(updated[currentStep].metrics || [])];
    currentMetrics[mIdx] = { ...currentMetrics[mIdx], [field]: val };
    updated[currentStep] = { ...updated[currentStep], metrics: currentMetrics };
    setLocalSlides(updated);
  };

  const updateSlideHighlightField = (val: string) => {
    const updated = [...localSlides];
    updated[currentStep] = { ...updated[currentStep], highlight: val };
    setLocalSlides(updated);
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

    return (
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newText = e.currentTarget.textContent || '';
          onChange(newText);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            e.currentTarget.blur();
          }
          e.stopPropagation();
        }}
        onKeyUp={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className={`${className} outline-none border-b-2 border-dashed border-yellow-400/90 focus:border-yellow-300 focus:bg-yellow-400/10 transition-colors px-0.5 rounded-sm inline-block max-w-full relative z-50 cursor-text`}
      >
        {clean(value)}
      </span>
    );
  };

  const slide = localSlides[currentStep] || slides[currentStep];

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

  const getAnimProps = (delayMs: number) => {
    if (isEditing) return {};
    return {
      className: 'animate-fade-in-up',
      style: {
        animationDelay: `${delayMs}ms`,
        animationFillMode: 'backwards' as const
      }
    };
  };

  const renderSlideContent = (slide: Slide) => {
    let effectiveType = slide.type;
    if (slide.type && slide.type.startsWith('cp-')) {
      effectiveType = slide.type;
    } else if (slide.type === 'proposal-cover' || slide.id === 'prop-cover') effectiveType = 'proposal-cover';
    else if (slide.type === 'proposal-agenda' || slide.id === 'prop-agenda') effectiveType = 'proposal-agenda';
    else if (slide.type === 'proposal-understanding' || slide.id === 'prop-understanding') effectiveType = 'proposal-understanding';
    else if (slide.type === 'proposal-findings' || slide.id === 'prop-findings') effectiveType = 'proposal-findings';
    else if (slide.type === 'proposal-pillars' || slide.id === 'prop-pillars') effectiveType = 'proposal-pillars';
    else if (slide.type === 'proposal-how-it-works' || slide.id === 'prop-how-it-works') effectiveType = 'proposal-how-it-works';
    else if (slide.type === 'proposal-investment' || slide.id === 'prop-investment') effectiveType = 'proposal-investment';
    else if (slide.type === 'proposal-next-steps' || slide.id === 'prop-next-steps') effectiveType = 'proposal-next-steps';
    else if (currentStep === 0) effectiveType = 'proposal-cover';
    else if (currentStep === 1) effectiveType = 'proposal-agenda';
    else if (currentStep === 2) effectiveType = 'proposal-understanding';
    else if (currentStep === 3) effectiveType = 'proposal-findings';
    else if (currentStep === 4) effectiveType = 'proposal-pillars';
    else if (currentStep === 5) effectiveType = 'proposal-how-it-works';
    else if (currentStep === 6) effectiveType = 'proposal-investment';
    else if (currentStep === 7) effectiveType = 'proposal-next-steps';

    switch (effectiveType) {
      case 'proposal-cover':
        return (
          <div className="flex-1 flex flex-col justify-between -m-8 md:-m-12 p-8 md:p-14 bg-zinc-950 text-white relative overflow-hidden select-none">
            {/* Background Video */}
            <SmoothBgVideo
              src={slide.bgVideo || '/videos/rocket.mp4'}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              targetOpacityClass="opacity-80"
            />

            {/* Left side gradient overlay / transparency for crisp readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent/30 z-1 pointer-events-none" />

            {/* Top Bar: Pill Tag Left, LoopFlow Logo Right */}
            <div className={`flex justify-between items-center relative z-10 ${getAnimProps(0).className || ''}`} style={getAnimProps(0).style}>
              <span className="bg-yellow-400 text-black px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg">
                <EditableField
                  value={localProspect.coverTag || 'PROPOSTA COMERCIAL'}
                  onChange={(v) => updateField('coverTag' as any, v)}
                />
              </span>
              <div className="flex items-center space-x-2">
                <Logo className="h-8 sm:h-10 w-auto" color="#FFFFFF" />
              </div>
            </div>

            {/* Center Content: Layout executivo vertical com logo integrada */}
            <div className="my-auto py-8 relative z-10 max-w-4xl space-y-6">
              {/* Logo Badge da Blue Financial Intelligence */}
              {localProspect.name?.toLowerCase().includes('blue') && (
                <div className={`inline-flex items-center bg-[#0C2239]/95 border-2 border-white/20 p-5 px-8 rounded-3xl shadow-2xl backdrop-blur-md ${getAnimProps(100).className || ''}`} style={getAnimProps(100).style}>
                  <BlueLogo className="h-24 sm:h-32 md:h-40 w-auto" color="#FFFFFF" />
                </div>
              )}

              {/* Título Principal da Empresa */}
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase drop-shadow-xl ${getAnimProps(150).className || ''}`} style={getAnimProps(150).style}>
                <EditableField
                  value={localProspect.name}
                  onChange={(v) => updateField('name', v)}
                  placeholder="Nome da Empresa"
                />
              </h1>

              {/* Subtítulo em Pill Destacada */}
              <div className={`inline-block bg-yellow-400 text-black px-6 py-3.5 rounded-2xl shadow-2xl ${getAnimProps(300).className || ''}`} style={getAnimProps(300).style}>
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
            <div className={`relative z-10 pt-6 border-t border-white/10 flex justify-between items-center text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-300 ${getAnimProps(450).className || ''}`} style={getAnimProps(450).style}>
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
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden select-none bg-zinc-950">
            {/* Interactive GLSL 3D Hills Shader Background */}
            <GLSLHills />
            {/* Subtle dark gradient overlay from bottom to top & top vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/30 to-transparent pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent pointer-events-none z-0" />

            <div className="space-y-10 relative z-10">
              {/* Header (Centralizado em uma só linha) */}
              <div className={`text-center max-w-5xl mx-auto ${getAnimProps(0).className || ''}`} style={getAnimProps(0).style}>
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight uppercase mb-3 whitespace-nowrap">
                  O QUE <span className="text-yellow-400">VAMOS VER</span> HOJE
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic">
                  <EditableField
                    value={localProspect.agendaSubtitle || cleanText(slide.subtitle) || '-25-28 minutos · fique à vontade para interromper e perguntar'}
                    onChange={(v) => updateField('agendaSubtitle' as any, v)}
                  />
                </p>
              </div>

              {/* 4 Cards Container */}
              <div className="relative">
                {/* Connecting dotted golden line passing behind cards */}
                <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 border-t-2 border-dashed border-yellow-500/30 -translate-y-6 z-0" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {[
                    {
                      keyStep: 'agendaStep1Title',
                      keyDesc: 'agendaStep1Desc',
                      defaultTitle: 'O que entendemos',
                      defaultDesc: 'Sobre o seu momento e desafio atual',
                      icon: (
                        <svg className="w-9 h-9 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          <circle cx="11" cy="9" r="2"/>
                        </svg>
                      ),
                      num: '01',
                      delay: 180
                    },
                    {
                      keyStep: 'agendaStep2Title',
                      keyDesc: 'agendaStep2Desc',
                      defaultTitle: 'O que analisamos e qual o seu objetivo',
                      defaultDesc: 'O resultado de negócio que importa',
                      icon: <Target className="w-9 h-9 text-yellow-400" />,
                      num: '02',
                      delay: 300
                    },
                    {
                      keyStep: 'agendaStep3Title',
                      keyDesc: 'agendaStep3Desc',
                      defaultTitle: 'Nossa proposta',
                      defaultDesc: 'Como vamos estruturar o trabalho',
                      icon: <Lightbulb className="w-9 h-9 text-yellow-400" />,
                      num: '03',
                      delay: 420
                    },
                    {
                      keyStep: 'agendaStep4Title',
                      keyDesc: 'agendaStep4Desc',
                      defaultTitle: 'Investimento e passos',
                      defaultDesc: 'Condições e como começamos',
                      icon: (
                        <svg className="w-9 h-9 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <line x1="10" y1="9" x2="8" y2="9"/>
                        </svg>
                      ),
                      num: '04',
                      delay: 540
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-[#0b0b0b]/95 border border-zinc-800/90 rounded-2xl p-7 flex flex-col justify-between min-h-[260px] shadow-2xl hover:border-yellow-400/50 hover:bg-[#111111] transition-all duration-300 group ${getAnimProps(item.delay).className || ''}`}
                      style={getAnimProps(item.delay).style}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-xl bg-yellow-400/10">
                          {item.icon}
                        </div>
                        <span className="text-3xl font-black text-zinc-700 group-hover:text-yellow-400/30 transition-colors pointer-events-none select-none">
                          {item.num}
                        </span>
                      </div>
                      <div className="space-y-2 mt-auto">
                        <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors leading-snug">
                          <EditableField
                            value={(localProspect as any)[item.keyStep] || item.defaultTitle}
                            onChange={(v) => updateField(item.keyStep as any, v)}
                          />
                        </h4>
                        <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed font-medium">
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
          </div>
        );

      case 'proposal-understanding': {
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden select-none bg-zinc-950">
            {/* Background Video */}
            <SmoothBgVideo
              src={slide.bgVideo || '/videos/Target_hit.mp4'}
              className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] object-cover object-right z-0 pointer-events-none"
              targetOpacityClass="opacity-100"
            />

            {/* Gradient overlay suave */}
            <div className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-1 pointer-events-none" />

            {/* Left Content (Title & Cards) */}
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className={getAnimProps(0).className} style={getAnimProps(0).style}>
                <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight uppercase">
                  <EditableField
                    value={localProspect.understandingTitlePrefix || 'O QUE ENTENDEMOS SOBRE'}
                    onChange={(v) => updateField('understandingTitlePrefix' as any, v)}
                  />
                  <span className="text-yellow-400 block mt-2">
                    <EditableField
                      value={localProspect.name}
                      onChange={(v) => updateField('name', v)}
                    />
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic mt-3">
                  <EditableField
                    value={localProspect.understandingSubtitle || 'Com base no que você nos contou no formulário de agendamento'}
                    onChange={(v) => updateField('understandingSubtitle' as any, v)}
                    multiline
                  />
                </p>
              </div>

              <div className="space-y-4">
                {/* Top Row: Segment & Problem */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card Segmento */}
                  <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex items-center space-x-4 hover:border-yellow-400/40 transition-all shadow-xl ${getAnimProps(180).className || ''}`} style={getAnimProps(180).style}>
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                      <svg className="w-7 h-7 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        <line x1="8" y1="7" x2="16" y2="7"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block mb-0.5">
                        <EditableField
                          value={localProspect.segmentCardLabel || 'SEGMENTO'}
                          onChange={(v) => updateField('segmentCardLabel' as any, v)}
                        />
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                        <EditableField
                          value={localProspect.segment || 'Mercado Relevante'}
                          onChange={(v) => updateField('segment', v)}
                        />
                      </p>
                    </div>
                  </div>

                  {/* Card Problema */}
                  <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex items-center space-x-4 hover:border-yellow-400/40 transition-all shadow-xl ${getAnimProps(320).className || ''}`} style={getAnimProps(320).style}>
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-7 h-7 text-yellow-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block mb-0.5">
                        <EditableField
                          value={localProspect.painPointCardLabel || 'PROBLEMA A SER RESOLVIDO'}
                          onChange={(v) => updateField('painPointCardLabel' as any, v)}
                        />
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                        <EditableField
                          value={localProspect.mainPainPoint || 'Custo de aquisição elevado e falta de previsibilidade.'}
                          onChange={(v) => updateField('mainPainPoint', v)}
                          multiline
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Marketing Situation */}
                <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex items-center space-x-4 hover:border-yellow-400/40 transition-all shadow-xl ${getAnimProps(460).className || ''}`} style={getAnimProps(460).style}>
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 11 18-5v12L3 13v-2z"/>
                      <path d="M11.6 16.8 a3 3 0 1 1-5.8-1.6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block mb-0.5">
                      <EditableField
                        value={localProspect.marketingSituationCardLabel || 'SITUAÇÃO DE MARKETING'}
                        onChange={(v) => updateField('marketingSituationCardLabel' as any, v)}
                      />
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug italic">
                      <EditableField
                        value={localProspect.marketingSituation || 'Investimento sem rastreamento unificado de conversão.'}
                        onChange={(v) => updateField('marketingSituation', v)}
                        multiline
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-findings': {
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden select-none bg-zinc-950">
            {/* Background Video */}
            <SmoothBgVideo
              src={slide.bgVideo || '/videos/Growth_chart.mp4'}
              className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] object-cover object-right z-0 pointer-events-none"
              targetOpacityClass="opacity-100"
            />

            {/* Gradient overlay */}
            <div className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-1 pointer-events-none" />

            {/* Left Content (Title & Cards) */}
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className={getAnimProps(0).className} style={getAnimProps(0).style}>
                <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight uppercase">
                  <EditableField
                    value={localProspect.findingsTitlePrefix || 'O QUE'}
                    onChange={(v) => updateField('findingsTitlePrefix' as any, v)}
                  />{' '}
                  <span className="text-yellow-400">
                    <EditableField
                      value={localProspect.findingsTitleWord1 || 'VIMOS'}
                      onChange={(v) => updateField('findingsTitleWord1' as any, v)}
                    />
                  </span>{' '}
                  <EditableField
                    value={localProspect.findingsTitleMid || 'E QUAL O SEU'}
                    onChange={(v) => updateField('findingsTitleMid' as any, v)}
                  />{' '}
                  <span className="text-yellow-400">
                    <EditableField
                      value={localProspect.findingsTitleWord2 || 'OBJETIVO'}
                      onChange={(v) => updateField('findingsTitleWord2' as any, v)}
                    />
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic mt-3">
                  <EditableField
                    value={localProspect.findingsSubtitle || 'Com base no que analisamos e o que nos contou'}
                    onChange={(v) => updateField('findingsSubtitle' as any, v)}
                    multiline
                  />
                </p>
              </div>

              <div className="space-y-4">
                {/* Top Row: Achado 1 & Achado 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Achado 1 */}
                  <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex items-center space-x-4 hover:border-yellow-400/40 transition-all shadow-xl ${getAnimProps(180).className || ''}`} style={getAnimProps(180).style}>
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                      <Search className="w-7 h-7 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white mb-0.5 tracking-tight">
                        <EditableField
                          value={localProspect.finding1Title || 'Achado 1'}
                          onChange={(v) => updateField('finding1Title' as any, v)}
                        />
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug italic">
                        <EditableField
                          value={localProspect.auditFinding1 || 'Gargalos no rastreamento e retenção de leads.'}
                          onChange={(v) => updateField('auditFinding1', v)}
                          multiline
                        />
                      </p>
                    </div>
                  </div>

                  {/* Achado 2 */}
                  <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex items-center space-x-4 hover:border-yellow-400/40 transition-all shadow-xl ${getAnimProps(320).className || ''}`} style={getAnimProps(320).style}>
                    <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-7 h-7 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white mb-0.5 tracking-tight">
                        <EditableField
                          value={localProspect.finding2Title || 'Achado 2'}
                          onChange={(v) => updateField('finding2Title' as any, v)}
                        />
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug italic">
                        <EditableField
                          value={localProspect.auditFinding2 || 'Ausência de testes A/B contínuos de criativos.'}
                          onChange={(v) => updateField('auditFinding2', v)}
                          multiline
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Onde você quer chegar */}
                <div className={`bg-[#0e0e0e]/95 backdrop-blur-md border-2 border-yellow-400/90 p-6 rounded-2xl flex items-center space-x-5 shadow-[0_0_35px_rgba(250,204,21,0.15)] ${getAnimProps(460).className || ''}`} style={getAnimProps(460).style}>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block mb-1">
                      <EditableField
                        value={localProspect.goalCardLabel || 'ONDE VOCÊ QUER CHEGAR'}
                        onChange={(v) => updateField('goalCardLabel' as any, v)}
                      />
                    </span>
                    <p className="text-base sm:text-xl font-black text-white leading-snug tracking-tight">
                      <EditableField
                        value={localProspect.businessGoal || 'Escalar faturamento mantendo a margem de lucro.'}
                        onChange={(v) => updateField('businessGoal', v)}
                        multiline
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-pillars': {
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden select-none bg-zinc-950">
            {/* Background Video */}
            <SmoothBgVideo
              src={slide.bgVideo || '/videos/montain.mp4'}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              targetOpacityClass="opacity-75"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent/30 z-0 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Restrito ao lado esquerdo com contraste de pesos tipográficos maior e mais imponente */}
              <div className={`max-w-2xl lg:max-w-3xl ${getAnimProps(0).className || ''}`} style={getAnimProps(0).style}>
                <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-3 shadow-md">
                  <EditableField
                    value={localProspect.pillarsTag || 'Proposta de Valor'}
                    onChange={(v) => updateField('pillarsTag' as any, v)}
                  />
                </div>
                <h3 className="uppercase tracking-tight">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-200 tracking-wider block mb-1">
                    <EditableField
                      value={localProspect.pillarsPrefix || 'NOSSA PROPOSTA PARA'}
                      onChange={(v) => updateField('pillarsPrefix' as any, v)}
                    />
                  </span>
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-black text-yellow-400 block leading-[0.95] drop-shadow-xl">
                    <EditableField
                      value={localProspect.name}
                      onChange={(v) => updateField('name', v)}
                    />
                  </span>
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-semibold italic mt-3">
                  <EditableField
                    value={localProspect.pillarsSubtitle || 'Conectada diretamente ao que você nos contou:'}
                    onChange={(v) => updateField('pillarsSubtitle' as any, v)}
                    multiline
                  />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Frente 1 */}
                <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-6 rounded-2xl space-y-3 hover:border-yellow-400/40 transition-all group flex flex-col justify-between shadow-xl ${getAnimProps(180).className || ''}`} style={getAnimProps(180).style}>
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-4">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors mb-2 leading-snug">
                      <EditableField
                        value={localProspect.front1Title || 'Frente 1 — Estratégia e Segmentação'}
                        onChange={(v) => updateField('front1Title' as any, v)}
                      />
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed italic">
                      <EditableField
                        value={localProspect.front1 || 'Planejamento das campanhas e definição do público certo desde o início (Meta Ads, e Google Ads quando aplicável). Foco em não desperdiçar verba com quem não converte.'}
                        onChange={(v) => updateField('front1', v)}
                        multiline
                      />
                    </p>
                  </div>
                </div>

                {/* Frente 2 */}
                <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-6 rounded-2xl space-y-3 hover:border-yellow-400/40 transition-all group flex flex-col justify-between shadow-xl ${getAnimProps(320).className || ''}`} style={getAnimProps(320).style}>
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-4">
                      <Palette className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors mb-2 leading-snug">
                      <EditableField
                        value={localProspect.front2Title || 'Frente 2 — Execução Técnica Correta'}
                        onChange={(v) => updateField('front2Title' as any, v)}
                      />
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed italic">
                      <EditableField
                        value={localProspect.front2 || 'Configuração dos anúncios com foco em conversão e rastreamento correto (pixel e eventos de conversão). Isso garante que os dados que guiam a otimização sejam confiáveis desde o primeiro dia.'}
                        onChange={(v) => updateField('front2', v)}
                        multiline
                      />
                    </p>
                  </div>
                </div>

                {/* Frente 3 */}
                <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-6 rounded-2xl space-y-3 hover:border-yellow-400/40 transition-all group flex flex-col justify-between shadow-xl ${getAnimProps(460).className || ''}`} style={getAnimProps(460).style}>
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-4">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-white tracking-tight group-hover:text-yellow-400 transition-colors mb-2 leading-snug">
                      <EditableField
                        value={localProspect.front3Title || 'Frente 3 — Otimização e Transparência Contínua'}
                        onChange={(v) => updateField('front3Title' as any, v)}
                      />
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 leading-relaxed italic">
                      <EditableField
                        value={localProspect.front3 || 'Ajustes constantes com base em performance real, com relatório semanal simplificado, relatório mensal completo e reunião mensal de acompanhamento. Assim você sempre sabe onde está o dinheiro.'}
                        onChange={(v) => updateField('front3', v)}
                        multiline
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-how-it-works': {
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden select-none bg-zinc-950">
            {/* Background Video */}
            <SmoothBgVideo
              src={slide.bgVideo || '/videos/target.mp4'}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              targetOpacityClass="opacity-75"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent/30 z-0 pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Main Title: COMO FUNCIONA NA PRÁTICA */}
              <div className={getAnimProps(0).className} style={getAnimProps(0).style}>
                <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight uppercase">
                  <EditableField
                    value={localProspect.howItWorksTitlePrefix || 'COMO'}
                    onChange={(v) => updateField('howItWorksTitlePrefix' as any, v)}
                  />{' '}
                  <span className="text-yellow-400">
                    <EditableField
                      value={localProspect.howItWorksTitle || 'FUNCIONA NA PRÁTICA'}
                      onChange={(v) => updateField('howItWorksTitle' as any, v)}
                    />
                  </span>
                </h3>
              </div>

              {/* 4 Circular Nodes Stepper with Dotted Line */}
              <div className="relative my-4">
                {/* Connecting Dotted Line */}
                <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-yellow-500/40 z-0 pointer-events-none" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {[
                    {
                      titleKey: 'howStep1Title',
                      descKey: 'howStep1Desc',
                      defTitle: 'DIAGNÓSTICO',
                      defDesc: 'Entendemos o cenário e os dados disponíveis.',
                      icon: <Search className="w-8 h-8 text-yellow-400" />
                    },
                    {
                      titleKey: 'howStep2Title',
                      descKey: 'howStep2Desc',
                      defTitle: 'ESTRUTURA',
                      defDesc: 'Criamos a estrutura de funil e tracking.',
                      icon: <Filter className="w-8 h-8 text-yellow-400" />
                    },
                    {
                      titleKey: 'howStep3Title',
                      descKey: 'howStep3Desc',
                      defTitle: 'OPERAÇÃO',
                      defDesc: 'Executamos, otimizamos e testamos diariamente.',
                      icon: <Settings className="w-8 h-8 text-yellow-400" />
                    },
                    {
                      titleKey: 'howStep4Title',
                      descKey: 'howStep4Desc',
                      defTitle: 'ESCALA',
                      defDesc: 'Escalamos o que funciona com previsibilidade.',
                      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />
                    }
                  ].map((item, idx) => (
                    <div key={idx} className={`flex flex-col items-center text-center space-y-3 ${getAnimProps(150 + idx * 120).className || ''}`} style={getAnimProps(150 + idx * 120).style}>
                      {/* Circular Glassmorphism Sphere Icon */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-800/90 via-zinc-900/95 to-zinc-950 backdrop-blur-md border border-zinc-700/70 shadow-2xl flex items-center justify-center text-yellow-400 shadow-yellow-500/10 group hover:scale-105 hover:border-yellow-400 transition-all duration-300 relative z-10">
                        {item.icon}
                      </div>
                      {/* Node Title */}
                      <h4 className="text-base font-black text-white uppercase tracking-wider">
                        <EditableField
                          value={(localProspect as any)[item.titleKey] || item.defTitle}
                          onChange={(v) => updateField(item.titleKey as any, v)}
                        />
                      </h4>
                      {/* Node Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug max-w-[220px] italic">
                        <EditableField
                          value={(localProspect as any)[item.descKey] || item.defDesc}
                          onChange={(v) => updateField(item.descKey as any, v)}
                          multiline
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Deliverables Section: O QUE ESTÁ INCLUSO */}
              <div className={`space-y-3 ${getAnimProps(630).className || ''}`} style={getAnimProps(630).style}>
                <h4 className="text-yellow-400 font-extrabold text-sm uppercase tracking-widest">
                  <EditableField
                    value={localProspect.deliverablesTag || 'O QUE ESTÁ INCLUSO'}
                    onChange={(v) => updateField('deliverablesTag' as any, v)}
                  />
                </h4>

                <div className="border border-zinc-800/90 bg-zinc-950/75 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {[
                      { key: 'activeCampaignsCount', def: 'Até 4 campanhas ativas otimizadas por mês' },
                      { key: 'reportFormat', def: 'Relatórios de performance quinzenais com dashboards ao vivo' },
                      { key: 'creativesCount', def: '8 a 12 peças publicitárias e criativos por mês' },
                      { key: 'includedChannels', def: 'Canais inclusos: Meta Ads (Instagram & Facebook) • Google Ads' },
                      { key: 'meetingFrequency', def: 'Reuniões quinzenais de alinhamento e estratégia' },
                      { key: 'landingPageIncluded', def: 'Criação e otimização contínua de páginas de conversão' }
                    ].map((item, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-3 text-xs sm:text-sm font-semibold text-zinc-200">
                        <div className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-md font-black">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className="leading-snug">
                          <EditableField
                            value={(localProspect as any)[item.key] || item.def}
                            onChange={(v) => updateField(item.key as any, v)}
                            multiline
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'proposal-investment': {
        return (
          <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-5 -m-8 md:-m-12 p-8 md:p-14 text-black relative overflow-hidden select-none bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-300">
            {/* Luxury Gold Metallic Shimmer & Light Beams */}
            <div 
              className="absolute inset-0 opacity-60 pointer-events-none z-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.9) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(255, 215, 0, 0.6) 0%, transparent 50%), linear-gradient(125deg, rgba(255, 255, 255, 0.5) 0%, transparent 40%, rgba(180, 120, 0, 0.3) 100%)`
              }}
            />

            {/* Glowing Diagonal Light Streak Lines */}
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none z-0"
              style={{
                backgroundImage: `repeating-linear-gradient(55deg, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0.3) 2px, transparent 2px, transparent 60px)`
              }}
            />

            {/* Header */}
            <div className={`relative z-10 space-y-1 ${getAnimProps(0).className || ''}`} style={getAnimProps(0).style}>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight uppercase drop-shadow-sm">
                <EditableField
                  value={localProspect.investmentTitle || 'INVESTIMENTO'}
                  onChange={(v) => updateField('investmentTitle' as any, v)}
                />
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-black/90 font-bold italic max-w-3xl leading-snug">
                <EditableField
                  value={localProspect.investmentSubtitle || 'Sem fidelidade após o setup — se não entregarmos o combinado no prazo, você sai sem multa.'}
                  onChange={(v) => updateField('investmentSubtitle' as any, v)}
                  multiline
                />
              </p>
            </div>

            {/* Main Dark Capsule Container */}
            <div className={`relative z-10 bg-[#0b0b0b]/95 backdrop-blur-md text-white p-6 sm:p-10 rounded-[32px] shadow-2xl border border-zinc-800/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${getAnimProps(200).className || ''}`} style={getAnimProps(200).style}>
              {/* Left Column: Plan Name & Subtitle */}
              <div className="md:col-span-5 space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 shrink-0" />
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                    <EditableField
                      value={localProspect.planName || 'ESSENCIAL'}
                      onChange={(v) => updateField('planName', v)}
                    />
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed italic">
                  <EditableField
                    value={localProspect.planDesc || 'Fase de setup: construção de esteira, ainda sem o ciclo completo rodando.'}
                    onChange={(v) => updateField('planDesc', v)}
                    multiline
                  />
                </p>
              </div>

              {/* Right Column: 2 Price Cards */}
              <div className="md:col-span-7 flex flex-col space-y-3">
                {/* Meses 1-2 Setup */}
                <div className="bg-[#141414] border border-zinc-800/90 p-5 rounded-2xl flex items-center justify-between shadow-xl">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                    <EditableField
                      value={localProspect.setupLabel || 'MESES 1-2 · SETUP'}
                      onChange={(v) => updateField('setupLabel' as any, v)}
                    />
                  </span>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400">
                    <EditableField
                      value={localProspect.setupPrice || 'R$ 2.000'}
                      onChange={(v) => updateField('setupPrice', v)}
                    /> <span className="text-xs sm:text-sm text-white font-normal">/mês</span>
                  </div>
                </div>

                {/* Mês 3+ Operação */}
                <div className="bg-[#141414] border border-zinc-800/90 p-5 rounded-2xl flex items-center justify-between shadow-xl">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                    <EditableField
                      value={localProspect.operationLabel || 'MÊS 3+ · OPERAÇÃO'}
                      onChange={(v) => updateField('operationLabel' as any, v)}
                    />
                  </span>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400">
                    <EditableField
                      value={localProspect.operationPrice || 'R$ 3.000'}
                      onChange={(v) => updateField('operationPrice', v)}
                    /> <span className="text-xs sm:text-sm text-white font-normal">/mês</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bullet Note */}
            <div className={`relative z-10 flex items-center space-x-2 text-xs sm:text-sm font-bold text-black/90 ${getAnimProps(450).className || ''}`} style={getAnimProps(450).style}>
              <span className="w-2 h-2 rounded-full bg-black shrink-0" />
              <span>
                <EditableField
                  value={localProspect.investmentFooter || 'Verba de mídia paga é sempre separada da mensalidade de gestão, conforme o pacote contratado.'}
                  onChange={(v) => updateField('investmentFooter' as any, v)}
                  multiline
                />
              </span>
            </div>
          </div>
        );
      }

      case 'proposal-next-steps': {
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden select-none bg-zinc-950">
            {/* Background Video on Right Side (Astronaut.mp4 - Fade suave 100% visível) */}
            <SmoothBgVideo
              src={slide.bgVideo || '/videos/Astronaut.mp4'}
              className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] object-cover object-right z-0 pointer-events-none"
              targetOpacityClass="opacity-100"
            />

            {/* Gradient overlay suave no lado esquerdo do vídeo */}
            <div className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] bg-gradient-to-r from-zinc-950 via-zinc-950/25 to-transparent z-1 pointer-events-none" />

            <div className="space-y-6 relative z-10 max-w-4xl">
              <div className={getAnimProps(0).className} style={getAnimProps(0).style}>
                <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight uppercase">
                  <EditableField
                    value={localProspect.nextStepsPrefix || 'PRÓXIMOS'}
                    onChange={(v) => updateField('nextStepsPrefix' as any, v)}
                  />{' '}
                  <span className="text-yellow-400">
                    <EditableField
                      value={localProspect.nextStepsTitle || 'PASSOS'}
                      onChange={(v) => updateField('nextStepsTitle' as any, v)}
                    />
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic mt-3">
                  <EditableField
                    value={localProspect.nextStepsSubtitle || 'Abrimos 1 onboarding novo por vez — é assim que garantimos atenção total a cada cliente nos primeiros 60 dias.'}
                    onChange={(v) => updateField('nextStepsSubtitle' as any, v)}
                    multiline
                  />
                </p>
              </div>

              {/* 3 Step Cards Container */}
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 border-t-2 border-dashed border-yellow-500/30 -translate-y-4 z-0" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
                  {/* Card 01 Assinatura */}
                  <div className={`bg-[#0e0e0e]/95 backdrop-blur-md border-2 border-yellow-400/90 p-5 rounded-2xl flex flex-col justify-between shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:border-yellow-400 transition-all ${getAnimProps(180).className || ''}`} style={getAnimProps(180).style}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-yellow-400">01</span>
                      <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
                        <Edit3 className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight mb-0.5">
                        <EditableField
                          value={localProspect.step1CardTitle || 'Assinatura'}
                          onChange={(v) => updateField('step1CardTitle' as any, v)}
                        />
                      </h4>
                      <p className="text-xs text-zinc-300 font-medium italic">
                        <EditableField
                          value={localProspect.step1CardDesc || 'Contrato e condições combinadas'}
                          onChange={(v) => updateField('step1CardDesc' as any, v)}
                          multiline
                        />
                      </p>
                    </div>
                  </div>

                  {/* Card 02 Kickoff */}
                  <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex flex-col justify-between shadow-xl hover:border-yellow-400/40 transition-all ${getAnimProps(320).className || ''}`} style={getAnimProps(320).style}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-white/90">02</span>
                      <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
                        <Rocket className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight mb-0.5">
                        <EditableField
                          value={localProspect.step2CardTitle || 'Kickoff'}
                          onChange={(v) => updateField('step2CardTitle' as any, v)}
                        />
                      </h4>
                      <p className="text-xs text-zinc-300 font-medium italic">
                        Em até <EditableField value={localProspect.kickoffDays || '2'} onChange={(v) => updateField('kickoffDays', v)} /> dias úteis
                      </p>
                    </div>
                  </div>

                  {/* Card 03 Primeiras entregas */}
                  <div className={`bg-[#0e0e0e]/90 backdrop-blur-md border border-zinc-800/90 p-5 rounded-2xl flex flex-col justify-between shadow-xl hover:border-yellow-400/40 transition-all ${getAnimProps(460).className || ''}`} style={getAnimProps(460).style}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-white/90">03</span>
                      <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
                        <CheckCheck className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight mb-0.5">
                        <EditableField
                          value={localProspect.step3CardTitle || 'Primeiras entregas'}
                          onChange={(v) => updateField('step3CardTitle' as any, v)}
                        />
                      </h4>
                      <p className="text-xs text-zinc-300 font-medium italic">
                        Em até <EditableField value={localProspect.deliveriesDays || '5'} onChange={(v) => updateField('deliveriesDays', v)} /> dias úteis
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Giant Yellow Banner */}
              <div className={`bg-yellow-400 text-black p-5 sm:p-6 rounded-2xl shadow-2xl text-center space-y-1 ${getAnimProps(600).className || ''}`} style={getAnimProps(600).style}>
                <h4 className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-tight">
                  <EditableField
                    value={localProspect.ctaBannerTitle || 'FAZ SENTIDO PRA VOCÊ COMEÇARMOS AINDA ESSE MÊS?'}
                    onChange={(v) => updateField('ctaBannerTitle' as any, v)}
                    multiline
                  />
                </h4>
                <p className="text-xs sm:text-sm font-bold text-black/80 leading-snug">
                  <EditableField
                    value={localProspect.ctaBannerSubtext || `Se topar, o próximo passo é: assinatura do contrato → kickoff em até ${localProspect.kickoffDays || '2'} dias úteis → primeiras entregas em até ${localProspect.deliveriesDays || '5'} dias úteis.`}
                    onChange={(v) => updateField('ctaBannerSubtext' as any, v)}
                    multiline
                  />
                </p>
              </div>
            </div>
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
                  <EditableField
                    value={slide.title}
                    onChange={updateSlideTitle}
                  />
                </h3>
                {(slide.subtitle || isEditing) && (
                  <p className="text-base lg:text-lg text-zinc-400 font-bold max-w-2xl leading-snug tracking-tight border-l-2 border-yellow-400/30 pl-6 italic">
                    <EditableField
                      value={slide.subtitle || ''}
                      onChange={updateSlideSubtitle}
                      multiline
                      placeholder="Subtítulo da métrica..."
                    />
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {slide.metrics?.map((m, idx) => (
                  <div key={idx} className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-7 lg:p-8 rounded-3xl border-b-4 border-b-yellow-400 shadow-xl group hover:border-yellow-400/40 transition-all duration-300 flex flex-col justify-center min-h-[220px]">
                    <div className="text-zinc-500 font-black mb-4 uppercase text-[9px] tracking-[0.2em]">
                      <EditableField
                        value={m.label}
                        onChange={(v) => updateSlideMetricField(idx, 'label', v)}
                      />
                    </div>
                    <div className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter group-hover:text-yellow-400 transition-colors uppercase italic leading-none">
                      <EditableField
                        value={m.value}
                        onChange={(v) => updateSlideMetricField(idx, 'value', v)}
                      />
                    </div>
                    <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                      <EditableField
                        value={m.desc}
                        onChange={(v) => updateSlideMetricField(idx, 'desc', v)}
                        multiline
                      />
                    </div>
                  </div>
                ))}
              </div>

              {(slide.highlight || isEditing) && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl ml-0">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black w-full">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter flex-1">
                      "<EditableField
                        value={slide.highlight || ''}
                        onChange={updateSlideHighlightField}
                        multiline
                        placeholder="Mensagem de destaque..."
                      />"
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
                  <EditableField
                    value={slide.title}
                    onChange={updateSlideTitle}
                  />
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {slide.content.map((item, idx) => {
                  return (
                    <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-400/40 transition-all duration-300 min-h-[220px] flex flex-col justify-center shadow-xl">
                      <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/5 italic select-none pointer-events-none">0{idx + 1}</div>
                      <div className="text-yellow-400 font-black text-[10px] uppercase tracking-widest mb-6 bg-yellow-400/10 w-fit px-4 py-1 rounded-full">Etapa 0{idx + 1}</div>
                      <div className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight relative z-10">
                        <EditableField
                          value={item}
                          onChange={(v) => updateSlideContentItem(idx, v)}
                          multiline
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {(slide.highlight || isEditing) && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black w-full">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter flex-1">
                      "<EditableField
                        value={slide.highlight || ''}
                        onChange={updateSlideHighlightField}
                        multiline
                        placeholder="Mensagem de destaque..."
                      />"
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
                  <EditableField
                    value={slide.title}
                    onChange={updateSlideTitle}
                  />
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-900 relative shadow-xl">
                  <div className="absolute -top-4 left-10 bg-zinc-900 px-6 py-2 rounded-xl text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800">Cenário A</div>
                  <h4 className="text-2xl font-black text-zinc-400 mb-8 uppercase tracking-tighter italic">Gestão Tradicional</h4>
                  <ul className="space-y-4">
                    {(slide.content[0] || '').split(',').map((item, i) => (
                      <li key={i} className="flex items-start text-zinc-400 font-bold text-base leading-tight">
                        <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full mr-4 mt-2 shrink-0"></span>
                        <EditableField
                          value={item.trim()}
                          onChange={(v) => {
                            const items = (slide.content[0] || '').split(',').map(x => x.trim());
                            items[i] = v;
                            updateSlideContentItem(0, items.join(', '));
                          }}
                          multiline
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-zinc-900/50 p-8 sm:p-10 rounded-3xl border-2 border-yellow-400 shadow-[0_0_80px_rgba(250,204,21,0.1)] relative">
                  <div className="absolute -top-4 left-10 bg-yellow-400 px-6 py-2 rounded-xl text-[10px] font-black text-black uppercase tracking-widest">Cenário LoopFlow</div>
                  <h4 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter italic">Escala Inteligente</h4>
                  <ul className="space-y-5">
                    {(slide.content[1] || '').split(',').map((item, i) => (
                      <li key={i} className="flex items-center text-white font-black text-xl italic leading-tight">
                        <CheckCircle2 className="w-6 h-6 mr-4 text-yellow-400 shrink-0" />
                        <EditableField
                          value={item.trim()}
                          onChange={(v) => {
                            const items = (slide.content[1] || '').split(',').map(x => x.trim());
                            items[i] = v;
                            updateSlideContentItem(1, items.join(', '));
                          }}
                          multiline
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {(slide.highlight || isEditing) && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black w-full">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter flex-1">
                      "<EditableField
                        value={slide.highlight || ''}
                        onChange={updateSlideHighlightField}
                        multiline
                        placeholder="Mensagem de destaque..."
                      />"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'cp-cover':
        return (
          <div className="flex-1 flex flex-col justify-between -m-8 md:-m-12 p-8 md:p-14 bg-zinc-950 text-white relative overflow-hidden select-none">
            <SmoothBgVideo src={slide.bgVideo || '/videos/rocket.mp4'} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" targetOpacityClass="opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent/30 z-1 pointer-events-none" />
            <div className="flex justify-between items-center relative z-10">
              <span className="bg-yellow-400 text-black px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg">
                <EditableField value={localProspect.cpCoverTag || slide.highlight || 'CREATIVE PERFORMANCE'} onChange={(v) => updateField('cpCoverTag' as any, v)} />
              </span>
              {localProspect.name?.toLowerCase().includes('blue') ? (
                <BlueLogo className="h-10 sm:h-12 w-auto" color="#FFFFFF" />
              ) : (
                <Logo className="h-8 sm:h-10 w-auto" color="#FFFFFF" />
              )}
            </div>
            <div className="my-auto py-12 relative z-10 max-w-4xl space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase drop-shadow-lg">
                <EditableField value={localProspect.name} onChange={(v) => updateField('name', v)} placeholder="Nome da Empresa" />
              </h1>
              <div className="inline-block bg-yellow-400 text-black px-6 py-3.5 rounded-2xl shadow-2xl">
                <p className="text-sm sm:text-xl font-bold tracking-tight">
                  <EditableField value={localProspect.cpCoverSubtitle || slide.subtitle || 'Proposta de Creative Performance'} onChange={(v) => updateField('cpCoverSubtitle' as any, v)} multiline />
                </p>
              </div>
            </div>
            <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-center text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-300">
              <span>
                <EditableField value={localProspect.cpCoverFooter || slide.pausePrompt || `APRESENTAÇÃO ESTRATÉGICA · ${new Date().toLocaleDateString('pt-BR')}`} onChange={(v) => updateField('cpCoverFooter' as any, v)} />
              </span>
            </div>
          </div>
        );

      case 'cp-who-we-are':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <div className="max-w-4xl space-y-8 relative z-10">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block mb-3">POSICIONAMENTO</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpWhoWeAreTitle || slide.title} onChange={(v) => updateField('cpWhoWeAreTitle' as any, v)} />
                </h2>
                <p className="text-base sm:text-xl text-zinc-300 font-semibold italic mt-3 border-l-2 border-yellow-400 pl-4">
                  <EditableField value={localProspect.cpWhoWeAreSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpWhoWeAreSubtitle' as any, v)} multiline />
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {slide.content.map((point, i) => (
                  <div key={i} className="bg-[#0e0e0e]/90 border border-zinc-800 p-6 rounded-2xl flex items-start space-x-4 shadow-xl hover:border-yellow-400/40 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-yellow-400/10 text-yellow-400 font-black flex items-center justify-center shrink-0 text-sm">{i + 1}</div>
                    <p className="text-sm sm:text-base font-bold text-zinc-200 leading-snug">
                      <EditableField value={point} onChange={(v) => updateSlideContentItem(i, v)} multiline />
                    </p>
                  </div>
                ))}
              </div>
              {slide.highlight && (
                <div className="bg-yellow-400 text-black p-5 rounded-2xl font-black text-lg uppercase tracking-tight shadow-2xl flex items-center space-x-3">
                  <Zap className="w-6 h-6 shrink-0 text-black" />
                  <span>
                    <EditableField value={localProspect.cpWhoWeAreHighlight || slide.highlight} onChange={(v) => updateField('cpWhoWeAreHighlight' as any, v)} />
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      case 'cp-understanding':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <SmoothBgVideo src={slide.bgVideo || '/videos/Target_hit.mp4'} className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] object-cover object-right z-0 pointer-events-none" targetOpacityClass="opacity-100" />
            <div className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-1 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-8">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block mb-3">DIAGNÓSTICO</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpUnderstandingTitle || slide.title} onChange={(v) => updateField('cpUnderstandingTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-lg text-zinc-300 font-medium italic mt-3">
                  <EditableField value={localProspect.cpUnderstandingSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpUnderstandingSubtitle' as any, v)} multiline />
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0e0e0e]/95 border border-zinc-800 p-6 rounded-2xl space-y-2 shadow-2xl">
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">
                    <EditableField value={localProspect.cpUnderstandingStat1Label || slide.content[0] || 'EMPRESAS ENDIVIDADAS'} onChange={(v) => updateField('cpUnderstandingStat1Label' as any, v)} />
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-white">
                    <EditableField value={localProspect.cpUnderstandingStat1Value || slide.content[1] || '5,4 milhões'} onChange={(v) => updateField('cpUnderstandingStat1Value' as any, v)} />
                  </p>
                </div>
                <div className="bg-[#0e0e0e]/95 border border-zinc-800 p-6 rounded-2xl space-y-2 shadow-2xl">
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">
                    <EditableField value={localProspect.cpUnderstandingStat2Label || slide.content[2] || 'VOLUME DE DÍVIDAS'} onChange={(v) => updateField('cpUnderstandingStat2Label' as any, v)} />
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-white">
                    <EditableField value={localProspect.cpUnderstandingStat2Value || slide.content[3] || 'R$ 4,5 Trilhões'} onChange={(v) => updateField('cpUnderstandingStat2Value' as any, v)} />
                  </p>
                </div>
              </div>
              <div className="bg-yellow-400/10 border-2 border-yellow-400 p-6 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.15)]">
                <p className="text-lg sm:text-2xl font-black text-yellow-400 italic tracking-tight">
                  "<EditableField value={localProspect.cpUnderstandingQuote || slide.content[4] || 'A Serasa trabalha para o credor. A Blue trabalha para o devedor.'} onChange={(v) => updateField('cpUnderstandingQuote' as any, v)} multiline />"
                </p>
              </div>
            </div>
          </div>
        );

      case 'cp-challenge':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <SmoothBgVideo src={slide.bgVideo || '/videos/Growth_chart.mp4'} className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] object-cover object-right z-0 pointer-events-none" targetOpacityClass="opacity-100" />
            <div className="absolute right-0 top-0 bottom-0 h-full w-[75%] lg:w-[68%] bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-1 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-8">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block mb-3">O GAP DE VALOR</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpChallengeTitle || slide.title} onChange={(v) => updateField('cpChallengeTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-lg text-zinc-300 font-medium italic mt-3">
                  <EditableField value={localProspect.cpChallengeSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpChallengeSubtitle' as any, v)} multiline />
                </p>
              </div>
              <div className="space-y-3">
                {slide.content.map((point, i) => (
                  <div key={i} className="bg-[#0e0e0e]/90 border border-zinc-800 p-4 rounded-xl flex items-center space-x-4 shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 shrink-0" />
                    <p className="text-sm sm:text-base font-bold text-zinc-200">
                      <EditableField value={point} onChange={(v) => updateSlideContentItem(i, v)} multiline />
                    </p>
                  </div>
                ))}
              </div>
              {slide.highlight && (
                <div className="bg-yellow-400 text-black p-5 rounded-2xl font-black text-base sm:text-lg uppercase tracking-tight shadow-xl">
                  <EditableField value={localProspect.cpChallengeHighlight || slide.highlight} onChange={(v) => updateField('cpChallengeHighlight' as any, v)} multiline />
                </div>
              )}
            </div>
          </div>
        );

      case 'cp-solution':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <SmoothBgVideo src={slide.bgVideo || '/videos/montain.mp4'} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" targetOpacityClass="opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent/30 z-0 pointer-events-none" />
            <div className="relative z-10 max-w-4xl space-y-8">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block mb-3">NOSSA SOLUÇÃO</span>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-yellow-400 uppercase tracking-tight leading-none drop-shadow-xl">
                  <EditableField value={localProspect.cpSolutionTitle || slide.title} onChange={(v) => updateField('cpSolutionTitle' as any, v)} />
                </h2>
                <p className="text-base sm:text-xl text-zinc-200 font-bold italic mt-3 max-w-2xl">
                  <EditableField value={localProspect.cpSolutionSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpSolutionSubtitle' as any, v)} multiline />
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {slide.content.slice(1).map((benefit, i) => (
                  <div key={i} className="bg-[#0e0e0e]/90 border border-zinc-800 p-5 rounded-2xl space-y-2 shadow-xl hover:border-yellow-400/50 transition-all">
                    <CheckCircle2 className="w-6 h-6 text-yellow-400" />
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                      <EditableField value={benefit} onChange={(v) => updateSlideContentItem(i + 1, v)} multiline />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cp-how-it-works':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <GLSLHills />
            <div className="relative z-10 space-y-10">
              <div className="text-center max-w-4xl mx-auto space-y-3">
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block">PROCESSO</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={slide.title} onChange={updateSlideTitle} />
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic">
                  <EditableField value={slide.subtitle || ''} onChange={updateSlideSubtitle} />
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { num: '01', titleKey: 'cpHowStep1Title', descKey: 'cpHowStep1Desc', defaultT: 'Briefing Estratégico', defaultD: 'Entendemos o objetivo de cada peça antes de iniciar.' },
                  { num: '02', titleKey: 'cpHowStep2Title', descKey: 'cpHowStep2Desc', defaultT: 'Criação & Design', defaultD: 'Desenvolvimento do ativo com foco em clareza e conversão.' },
                  { num: '03', titleKey: 'cpHowStep3Title', descKey: 'cpHowStep3Desc', defaultT: 'Revisão Colaborativa', defaultD: 'Ajustes guiados pelo seu feedback até aprovação final.' },
                  { num: '04', titleKey: 'cpHowStep4Title', descKey: 'cpHowStep4Desc', defaultT: 'Entrega & Aplicação', defaultD: 'Formatos otimizados prontos para uso imediato.' }
                ].map((step, idx) => (
                  <div key={idx} className="bg-[#0b0b0b]/95 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-2xl hover:border-yellow-400/50 transition-all">
                    <span className="text-3xl font-black text-yellow-400">{step.num}</span>
                    <div className="space-y-2 mt-auto">
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        <EditableField value={(localProspect as any)[step.titleKey] || step.defaultT} onChange={(v) => updateField(step.titleKey as any, v)} />
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                        <EditableField value={(localProspect as any)[step.descKey] || step.defaultD} onChange={(v) => updateField(step.descKey as any, v)} multiline />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cp-examples':
      case 'cp-opportunities':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            {/* Soft Background Gradient Glow */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="relative z-10 space-y-8 max-w-6xl mx-auto w-full">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/30 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md">
                  ECOSSISTEMA DE COMUNICAÇÃO
                </span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpOpportunitiesTitle || slide.title} onChange={(v) => updateField('cpOpportunitiesTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-semibold italic mt-3 border-l-2 border-yellow-400/60 pl-4">
                  <EditableField value={localProspect.cpOpportunitiesSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpOpportunitiesSubtitle' as any, v)} multiline />
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {slide.content.map((item, i) => {
                  const parts = item.includes('|') ? item.split('|') : ['ATIVO', item];
                  const category = parts[0].trim().toUpperCase();
                  const details = (parts[1] || '').split('·').map(s => s.trim()).filter(Boolean);

                  // Ícones específicos por categoria
                  let icon = <Zap className="w-6 h-6 text-yellow-400" />;
                  if (category.includes('MÍDIA') || category.includes('ADS')) {
                    icon = (
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    );
                  } else if (category.includes('CONVERSÃO')) {
                    icon = (
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    );
                  } else if (category.includes('AUTORIDADE')) {
                    icon = (
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    );
                  } else if (category.includes('COMERCIAL')) {
                    icon = (
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                    );
                  } else if (category.includes('INSTITUCIONAL')) {
                    icon = (
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    );
                  } else if (category.includes('VÍDEO')) {
                    icon = (
                      <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="bg-[#0c0c0c]/90 border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-400/50 hover:bg-[#111111] transition-all duration-300 group shadow-xl hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] relative overflow-hidden"
                    >
                      {/* Top Bar: Icon + Title Aligned Horizontally */}
                      <div className="flex items-center justify-between mb-5 border-b border-zinc-850 pb-4">
                        <div className="flex items-center space-x-3.5">
                          <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20 group-hover:scale-105 transition-transform shrink-0">
                            {icon}
                          </div>
                          <span className="text-base sm:text-lg font-black text-yellow-400 uppercase tracking-tight">
                            <EditableField value={parts[0]} onChange={(v) => updateSlideContentItem(i, `${v}|${parts[1] || ''}`)} />
                          </span>
                        </div>
                        <span className="text-xs font-black text-zinc-600 group-hover:text-yellow-400/40 transition-colors uppercase tracking-widest">
                          0{i + 1}
                        </span>
                      </div>

                      {/* Content Pills with Increased Typography */}
                      <div className="space-y-3">
                        {details.length > 1 ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {details.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-xs sm:text-sm font-extrabold text-zinc-200 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg group-hover:border-zinc-700 transition-colors shadow-sm"
                              >
                                <EditableField
                                  value={tag}
                                  onChange={(v) => {
                                    const newDetails = [...details];
                                    newDetails[tIdx] = v;
                                    updateSlideContentItem(i, `${parts[0]}|${newDetails.join(' · ')}`);
                                  }}
                                />
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base font-bold text-zinc-200 leading-relaxed italic">
                            <EditableField value={parts[1] || parts[0]} onChange={(v) => updateSlideContentItem(i, `${parts[0]}|${v}`)} multiline />
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'cp-workflow':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block mb-3">ROTINA</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpWorkflowTitle || slide.title} onChange={(v) => updateField('cpWorkflowTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic mt-3">
                  <EditableField value={localProspect.cpWorkflowSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpWorkflowSubtitle' as any, v)} multiline />
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {slide.content.map((step, i) => {
                  const parts = step.includes('|') ? step.split('|') : [`FASE ${i + 1}`, step];
                  return (
                    <div key={i} className="bg-[#0e0e0e]/95 border border-zinc-800 p-6 rounded-2xl space-y-3 shadow-xl hover:border-yellow-400/50 transition-all">
                      <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">
                        <EditableField value={parts[0]} onChange={(v) => updateSlideContentItem(i, `${v}|${parts[1]}`)} />
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                        <EditableField value={parts[1]} onChange={(v) => updateSlideContentItem(i, `${parts[0]}|${v}`)} multiline />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'cp-credits':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-6 md:p-10 overflow-hidden bg-zinc-950">
            {/* Background Glow */}
            <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-yellow-400/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="relative z-10 space-y-4 max-w-6xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-zinc-850 pb-4">
                <div>
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full inline-block mb-1.5 shadow-md">
                    ESTRUTURA DE CONSUMO
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                    <EditableField value={localProspect.cpCreditsTitle || slide.title} onChange={(v) => updateField('cpCreditsTitle' as any, v)} />
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-semibold italic max-w-md">
                  <EditableField value={localProspect.cpCreditsSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpCreditsSubtitle' as any, v)} multiline />
                </p>
              </div>

              {/* Tabela em 2 Colunas Otimizadas para Exibição Total dos 14 Itens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {slide.content.map((row, i) => {
                  const [item, credits] = row.split('|');
                  const numCredits = parseInt(credits.trim(), 10);
                  const label = numCredits === 1 ? 'CRÉDITO' : 'CRÉDITOS';
                  return (
                    <div
                      key={i}
                      className="bg-[#0c0c0c]/95 border border-zinc-800/90 hover:border-yellow-400/60 p-3 px-5 rounded-xl flex items-center justify-between shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 group-hover:scale-125 transition-transform shrink-0" />
                        <span className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                          <EditableField value={item} onChange={(v) => updateSlideContentItem(i, `${v}|${credits}`)} />
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-black bg-yellow-400 text-black px-3 py-1 rounded-lg shadow-md group-hover:scale-105 transition-transform tracking-wider shrink-0 ml-3">
                        <EditableField value={credits} onChange={(v) => updateSlideContentItem(i, `${item}|${v}`)} /> {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'cp-plans':
      case 'cp-investment':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-yellow-400/5 rounded-full blur-[160px] pointer-events-none" />
            
            <div className="relative z-10 space-y-10 max-w-6xl mx-auto w-full">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/30 px-4 py-1.5 rounded-full inline-block shadow-md">
                  INVESTIMENTO & FRANQUIAS
                </span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpInvestmentTitle || slide.title} onChange={(v) => updateField('cpInvestmentTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-semibold italic">
                  <EditableField value={localProspect.cpInvestmentSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpInvestmentSubtitle' as any, v)} multiline />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    nameKey: 'cpStarterName',
                    creditsKey: 'cpStarterCredits',
                    priceKey: 'cpStarterPrice',
                    defaultN: 'Starter',
                    defaultC: '20 créditos',
                    defaultP: 'R$ 1.000',
                    desc: 'Ideal para demandas pontuais e validação de modelo.',
                    icon: <Rocket className="w-6 h-6 text-zinc-400" />
                  },
                  {
                    nameKey: 'cpPerformanceName',
                    creditsKey: 'cpPerformanceCredits',
                    priceKey: 'cpPerformancePrice',
                    defaultN: 'Performance',
                    defaultC: '35 créditos',
                    defaultP: 'R$ 1.650',
                    desc: 'Volume ideal para manter materiais de vendas sempre atualizados.',
                    badge: 'RECOMENDADO',
                    icon: <TrendingUp className="w-6 h-6 text-yellow-400" />
                  },
                  {
                    nameKey: 'cpEnterpriseName',
                    creditsKey: 'cpEnterpriseCredits',
                    priceKey: 'cpEnterprisePrice',
                    defaultN: 'Enterprise',
                    defaultC: '50 créditos',
                    defaultP: 'R$ 2.250',
                    desc: 'Para operações que precisam de alta frequência e escala.',
                    icon: <Building2 className="w-6 h-6 text-zinc-400" />
                  }
                ].map((plan, idx) => {
                  const isHighlighted = !!plan.badge;
                  return (
                    <div
                      key={idx}
                      className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-500 group ${
                        isHighlighted
                          ? 'bg-zinc-900/90 border-2 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.25)] md:-translate-y-2'
                          : 'bg-[#0d0d0d]/90 border border-zinc-800/90 hover:border-zinc-700 shadow-xl'
                      }`}
                    >
                      {isHighlighted && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-xl flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-black" />
                          <span>{plan.badge}</span>
                        </div>
                      )}

                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                          <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                              <EditableField value={(localProspect as any)[plan.nameKey] || plan.defaultN} onChange={(v) => updateField(plan.nameKey as any, v)} />
                            </h3>
                            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest block mt-0.5">
                              FLUXO CONTÍNUO
                            </span>
                          </div>
                          <div className={`p-3 rounded-2xl ${isHighlighted ? 'bg-yellow-400/10' : 'bg-zinc-800/60'}`}>
                            {plan.icon}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                              <EditableField value={(localProspect as any)[plan.priceKey] || plan.defaultP} onChange={(v) => updateField(plan.priceKey as any, v)} />
                            </span>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">/mês</span>
                          </div>

                          <div className="mt-3 inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1.5 rounded-xl text-yellow-400 text-xs font-black uppercase tracking-wider">
                            <Zap className="w-3.5 h-3.5" />
                            <span>
                              <EditableField value={(localProspect as any)[plan.creditsKey] || plan.defaultC} onChange={(v) => updateField(plan.creditsKey as any, v)} />
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-300 font-medium leading-relaxed italic border-t border-zinc-850 pt-4">
                          <EditableField
                            value={(slide.content[idx] || '').split('|')[3] || plan.desc}
                            onChange={(v) => {
                              const parts = (slide.content[idx] || '').split('|');
                              parts[3] = v;
                              updateSlideContentItem(idx, parts.join('|'));
                            }}
                            multiline
                          />
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-zinc-850">
                        <div className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all ${
                          isHighlighted
                            ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                            : 'bg-zinc-850 text-zinc-300 group-hover:bg-zinc-800 group-hover:text-white'
                        }`}>
                          Contratar Plano
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'cp-differentials':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="relative z-10 space-y-8 max-w-6xl mx-auto w-full">
              <div className="border-b border-zinc-850 pb-5">
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/30 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md">
                  PATRIMÔNIO DIGITAL
                </span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpDifferentialsTitle || slide.title} onChange={(v) => updateField('cpDifferentialsTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-semibold italic mt-3 border-l-2 border-yellow-400/60 pl-4">
                  <EditableField value={localProspect.cpDifferentialsSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpDifferentialsSubtitle' as any, v)} multiline />
                </p>
              </div>

              {/* Grid Rigorosamente 3 em cima e 3 em baixo (grid-cols-3) com design aprimorado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {slide.content.map((item, i) => {
                  const parts = item.includes('|') ? item.split('|') : [`CANAL ${i + 1}`, item];
                  const channel = parts[0].trim().toUpperCase();

                  // Ícones específicos por canal
                  let icon = <Zap className="w-5 h-5 text-yellow-400" />;
                  if (channel.includes('SITE')) {
                    icon = (
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    );
                  } else if (channel.includes('COMERCIAL')) {
                    icon = (
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                    );
                  } else if (channel.includes('CAMPANHAS') || channel.includes('ADS')) {
                    icon = (
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    );
                  } else if (channel.includes('EVENTOS')) {
                    icon = (
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    );
                  } else if (channel.includes('LINKEDIN')) {
                    icon = (
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    );
                  } else if (channel.includes('TREINAMENTOS')) {
                    icon = (
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="bg-[#0c0c0c]/95 border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-400/50 hover:bg-[#111111] transition-all duration-300 group shadow-xl hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] relative overflow-hidden min-h-[170px]"
                    >
                      {/* Top Bar: Icon + Channel Title */}
                      <div className="flex items-center space-x-3 border-b border-zinc-850 pb-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-yellow-400/10 border border-yellow-400/20 group-hover:scale-105 transition-transform shrink-0">
                          {icon}
                        </div>
                        <span className="text-base sm:text-lg font-black text-yellow-400 uppercase tracking-tight">
                          <EditableField value={parts[0]} onChange={(v) => updateSlideContentItem(i, `${v}|${parts[1]}`)} />
                        </span>
                      </div>

                      {/* Description with Increased Typography */}
                      <p className="text-sm sm:text-base font-semibold text-zinc-200 leading-relaxed italic flex-1">
                        <EditableField value={parts[1]} onChange={(v) => updateSlideContentItem(i, `${parts[0]}|${v}`)} multiline />
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Banner Inferior com Destaque */}
              {(slide.highlight || isEditing) && (
                <div className="bg-[#0b0b0b] border border-yellow-400/40 p-4 px-6 rounded-2xl flex items-center space-x-4 shadow-xl">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black shrink-0">
                    🏆
                  </div>
                  <p className="text-sm sm:text-base font-black text-white uppercase tracking-wide flex-1 italic">
                    <EditableField value={localProspect.cpDifferentialHighlight || slide.highlight || ''} onChange={(v) => updateField('cpDifferentialHighlight' as any, v)} multiline />
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'cp-next-steps':
        return (
          <div className="flex-1 flex flex-col justify-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <SmoothBgVideo src={slide.bgVideo || '/videos/Astronaut.mp4'} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" targetOpacityClass="opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent/30 z-0 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-8">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full inline-block mb-3">ONBOARDING</span>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
                  <EditableField value={localProspect.cpNextStepsTitle || slide.title} onChange={(v) => updateField('cpNextStepsTitle' as any, v)} />
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-medium italic mt-3">
                  <EditableField value={localProspect.cpNextStepsSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpNextStepsSubtitle' as any, v)} multiline />
                </p>
              </div>
              <div className="space-y-4">
                {slide.content.map((step, i) => {
                  const parts = step.includes('|') ? step.split('|') : [`PASSO ${i + 1}`, step];
                  return (
                    <div key={i} className="bg-[#0e0e0e]/90 border border-zinc-800 p-5 rounded-2xl flex items-start space-x-4 shadow-xl">
                      <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center shrink-0 text-sm">{i + 1}</div>
                      <div>
                        <h4 className="text-sm font-extrabold text-yellow-400 uppercase tracking-wider">
                          <EditableField value={parts[0]} onChange={(v) => updateSlideContentItem(i, `${v}|${parts[1]}`)} />
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-zinc-200 mt-0.5">
                          <EditableField value={parts[1]} onChange={(v) => updateSlideContentItem(i, `${parts[0]}|${v}`)} multiline />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'cp-closing':
        return (
          <div className="flex-1 flex flex-col justify-center items-center text-center relative -m-8 md:-m-12 p-8 md:p-14 overflow-hidden bg-zinc-950">
            <SmoothBgVideo src={slide.bgVideo || '/videos/Astronaut.mp4'} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" targetOpacityClass="opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40 z-0 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-6">
              {localProspect.name?.toLowerCase().includes('blue') ? (
                <BlueLogo className="h-14 sm:h-16 w-auto mx-auto" color="#FFFFFF" />
              ) : (
                <Logo className="h-12 w-auto mx-auto" color="#FFFFFF" />
              )}
              <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
                <EditableField value={localProspect.cpClosingTitle || slide.title} onChange={(v) => updateField('cpClosingTitle' as any, v)} />
              </h1>
              <p className="text-base sm:text-xl text-zinc-300 font-semibold italic max-w-2xl mx-auto">
                <EditableField value={localProspect.cpClosingSubtitle || slide.subtitle || ''} onChange={(v) => updateField('cpClosingSubtitle' as any, v)} multiline />
              </p>
              <div className="pt-4">
                <span className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black text-lg uppercase tracking-wider shadow-2xl">
                  <EditableField value={localProspect.cpClosingCTA || slide.highlight || 'Vamos começar?'} onChange={(v) => updateField('cpClosingCTA' as any, v)} />
                </span>
              </div>
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
                  <EditableField
                    value={slide.title}
                    onChange={updateSlideTitle}
                  />
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.content.map((item, i) => (
                  <div key={i} className="bg-zinc-900/50 p-7 lg:p-8 rounded-3xl border border-zinc-800 flex items-center space-x-6 hover:border-yellow-400/40 transition-all duration-300 min-h-[120px] shadow-xl">
                    <div className="w-10 h-10 bg-yellow-400/10 text-yellow-400 rounded-xl flex items-center justify-center font-black text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div className="text-xl font-bold text-zinc-100 tracking-tight italic leading-snug flex-1">
                      <EditableField
                        value={item}
                        onChange={(v) => updateSlideContentItem(i, v)}
                        multiline
                      />
                    </div>
                  </div>
                ))}
              </div>

              {(slide.highlight || isEditing) && (
                <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                    SUCCESS
                  </div>
                  <div className="flex items-center space-x-5 relative z-10 text-black w-full">
                    <div className="bg-black/10 p-2 rounded-xl shrink-0">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter flex-1">
                      "<EditableField
                        value={slide.highlight || ''}
                        onChange={updateSlideHighlightField}
                        multiline
                        placeholder="Mensagem de destaque..."
                      />"
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
                    <EditableField
                      value={slide.title}
                      onChange={updateSlideTitle}
                    />
                  </h3>
                  {(slide.subtitle || isEditing) && (
                    <p className="text-base lg:text-lg text-zinc-400 font-bold max-w-2xl leading-snug tracking-tight border-l-2 border-yellow-400/30 pl-6 italic">
                      <EditableField
                        value={slide.subtitle || ''}
                        onChange={updateSlideSubtitle}
                        multiline
                      />
                    </p>
                  )}
                </div>

                <ul className="space-y-4">
                  {slide.content.map((item, i) => (
                    <li key={i} className="flex items-start text-xl lg:text-2xl text-zinc-100 font-black leading-tight tracking-tight group italic">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black rounded-lg font-black flex items-center justify-center mr-5 group-hover:scale-110 transition-transform not-italic text-sm mt-1">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <EditableField
                          value={item}
                          onChange={(v) => updateSlideContentItem(i, v)}
                          multiline
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                {(slide.highlight || isEditing) && (
                  <div className="p-5 lg:p-6 bg-yellow-400 rounded-[24px] relative overflow-hidden shadow-xl flex items-center group max-w-2xl">
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[80px] font-black text-black opacity-[0.05] select-none pointer-events-none transform -rotate-12 italic group-hover:translate-x-0 transition-transform duration-700">
                      SUCCESS
                    </div>
                    <div className="flex items-center space-x-5 relative z-10 text-black w-full">
                      <div className="bg-black/10 p-2 rounded-xl shrink-0">
                        <Zap className="w-8 h-8" />
                      </div>
                      <div className="text-lg lg:text-xl font-black leading-tight italic uppercase tracking-tighter flex-1">
                        "<EditableField
                          value={slide.highlight || ''}
                          onChange={updateSlideHighlightField}
                          multiline
                          placeholder="Mensagem de destaque..."
                        />"
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
        {/* Floating Formatting Toolbar when Editor Mode is Active */}
        {isEditing && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[80] bg-zinc-900/95 backdrop-blur-xl border border-yellow-400/40 rounded-2xl px-5 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center space-x-4 text-xs font-semibold animate-fade-in text-white select-none">
            <div className="flex items-center space-x-2 border-r border-zinc-800 pr-3">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
              <span className="font-black uppercase tracking-wider text-yellow-400 text-[10px]">MODO EDIÇÃO ATIVO</span>
            </div>

            {/* Text Color Swatches */}
            <div className="flex items-center space-x-1.5 border-r border-zinc-800 pr-3">
              <span className="text-[10px] text-zinc-400 uppercase font-black mr-1">COR:</span>
              {[
                { color: '#FACC15', label: 'Amarelo Ouro' },
                { color: '#FFFFFF', label: 'Branco' },
                { color: '#A1A1AA', label: 'Cinza' },
                { color: '#F97316', label: 'Laranja' },
                { color: '#22C55E', label: 'Verde' },
                { color: '#3B82F6', label: 'Azul' }
              ].map((c) => (
                <button
                  key={c.color}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    document.execCommand('foreColor', false, c.color);
                  }}
                  className="w-5 h-5 rounded-full border border-white/20 hover:scale-125 transition-transform cursor-pointer shadow-sm"
                  style={{ backgroundColor: c.color }}
                  title={c.label}
                />
              ))}
            </div>

            {/* Quick Style Toggles */}
            <div className="flex items-center space-x-1 border-r border-zinc-800 pr-3">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand('bold');
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-extrabold text-white text-xs transition-colors cursor-pointer border border-zinc-700"
                title="Negrito (Ctrl+B)"
              >
                B
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand('italic');
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 italic font-semibold text-white text-xs transition-colors cursor-pointer border border-zinc-700"
                title="Itálico (Ctrl+I)"
              >
                I
              </button>
            </div>

            {/* Font Size Adjustments */}
            <div className="flex items-center space-x-1.5 border-r border-zinc-800 pr-3">
              <span className="text-[10px] text-zinc-400 uppercase font-black mr-1">TAMANHO:</span>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand('fontSize', false, '3');
                }}
                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-yellow-400 hover:text-black font-black text-[11px] transition-all cursor-pointer border border-zinc-700"
                title="Tamanho Pequeno (P)"
              >
                P
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand('fontSize', false, '5');
                }}
                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-yellow-400 hover:text-black font-black text-[11px] transition-all cursor-pointer border border-zinc-700"
                title="Tamanho Médio (M)"
              >
                M
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  document.execCommand('fontSize', false, '7');
                }}
                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-yellow-400 hover:text-black font-black text-[11px] transition-all cursor-pointer border border-zinc-700"
                title="Tamanho Grande (G)"
              >
                G
              </button>
            </div>

            {/* Done Editing Button */}
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 px-3.5 py-1 bg-yellow-400 text-black font-black rounded-lg text-xs hover:bg-yellow-300 transition-colors cursor-pointer flex items-center space-x-1 shadow-lg"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              <span>Concluir</span>
            </button>
          </div>
        )}

        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div key={currentStep} className="animate-fade-in flex-1 max-w-[1600px] mx-auto w-full px-12 lg:px-20 py-6 flex flex-col justify-center">
          {renderSlideContent(slide)}
        </div>

        {/* Global Navigation Controls */}
        <div className="absolute bottom-8 right-12 z-[70] flex flex-col items-end space-y-2.5">
          {/* Botão de Edição (Apenas Ícone, acima das setas) */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            title={isEditing ? 'Concluir Edição' : 'Ativar Edição'}
            className={`p-3.5 rounded-2xl transition-all cursor-pointer backdrop-blur-xl border shadow-2xl flex items-center justify-center ${
              isEditing
                ? 'bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.5)] border-yellow-300 animate-pulse scale-105'
                : 'bg-zinc-900/90 text-zinc-300 hover:text-white border-zinc-800 hover:border-yellow-400/50 hover:bg-zinc-850'
            }`}
          >
            <Edit3 className={`w-5 h-5 ${isEditing ? 'text-black' : 'text-yellow-400'}`} strokeWidth={2.5} />
          </button>

          {/* Setas de Navegação */}
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
