import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Clock01Icon, Video01Icon, ArrowRight01Icon, AlertCircleIcon } from '@hugeicons/core-free-icons';

const createHugeIcon = (icon) => (props) => (
  <HugeiconsIcon icon={icon} size={props.size || 20} className={props.className || ''} color={props.color || 'currentColor'} strokeWidth={props.strokeWidth || 1.5} />
);

const Clock = createHugeIcon(Clock01Icon);
const Video = createHugeIcon(Video01Icon);
const ArrowRight = createHugeIcon(ArrowRight01Icon);
const AlertCircle = createHugeIcon(AlertCircleIcon);
import Logo from './Logo';
import { supabase } from '../lib/supabase';

const MODEL_OPTIONS = [
  "Venda direta ao consumidor final (B2C)",
  "Venda para outras empresas (B2B)",
  "Negócio local (clínica, escritório, loja física)",
  "Loja virtual / e-commerce",
  "Curso ou produto digital",
  "Sistema/software (SaaS)"
];

export default function AgendarPage() {
  const calendlyUrl = "https://calendly.com/loopflowsolutions/30min?hide_event_type_details=1&hide_gdpr_banner=1";

  const [step, setStep] = useState('form');
  const [name, setName] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const toggleModel = (opt) => {
    if (selectedModels.includes(opt)) {
      setSelectedModels(selectedModels.filter(s => s !== opt));
    } else {
      setSelectedModels([...selectedModels, opt]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && selectedModels.length > 0) {
      const segmentStr = selectedModels.join(', ');
      const id = Date.now().toString();

      supabase.from('prospects').insert([
        {
          id: id,
          name: name,
          segment: segmentStr,
          logo: null,
          google_sheets_url: null
        }
      ]).catch(() => {});

      const newProspect = {
        id: id,
        name: name,
        segment: segmentStr,
        logo: '',
        date: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('loopflow_prospects:v1') || '[]');
      localStorage.setItem('loopflow_prospects:v1', JSON.stringify([newProspect, ...existing]));

      setStep('calendly');
    }
  };

  const isCalendly = step === 'calendly';

  return (
    <div className="min-h-screen bg-brand-yellow flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden select-none">
      {/* Background texture sutil */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, #000000 1.5px, transparent 1.5px),
            linear-gradient(to bottom, #000000 1.5px, transparent 1.5px)
          `
        }}
      />

      {/* Card Centralizado */}
      <div className="relative w-full max-w-xl md:max-w-4xl bg-brand-black border border-black/20 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.35)] z-10 flex flex-col md:flex-row h-[640px] max-h-[92vh]">
        
        {/* SIDEBAR (desktop) */}
        <div className="hidden md:flex flex-col w-[280px] bg-black/40 border-r border-white/5 p-8 text-left justify-between shrink-0">
          <div className="space-y-6">
            <Logo className="h-8 w-auto" color="#FFCC00" />
            
            <div className="space-y-1 pt-3">
              <span className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Loop Flow</span>
              <h4 className="text-xl font-black text-white leading-tight">
                Call de Diagnóstico Comercial
              </h4>
            </div>

            <div className="space-y-3 text-xs text-neutral-400 font-semibold">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>30 minutos</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Google Meet (Vídeo)</span>
              </div>
            </div>
            
            <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold">
              Análise técnica das suas campanhas de tráfego, funil de conversão e processos comerciais de vendas.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors ${!isCalendly ? 'bg-brand-yellow shadow-[0_0_10px_rgba(255,204,0,0.5)]' : 'bg-neutral-600'}`} />
              <span className={`text-[9.5px] font-black uppercase tracking-widest ${!isCalendly ? 'text-brand-yellow' : 'text-neutral-600'}`}>
                1. Seu negócio
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isCalendly ? 'bg-brand-yellow shadow-[0_0_10px_rgba(255,204,0,0.5)]' : 'bg-neutral-700'}`} />
              <span className={`text-[9.5px] font-black uppercase tracking-widest ${isCalendly ? 'text-brand-yellow' : 'text-neutral-700'}`}>
                2. Escolher horário
              </span>
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className={`flex-1 flex flex-col overflow-hidden h-full transition-colors duration-300 ${isCalendly ? 'bg-white' : 'bg-zinc-950'}`}>
          
          {/* Header */}
          <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${isCalendly ? 'bg-neutral-50 border-neutral-100' : 'bg-zinc-900/50 border-white/5'}`}>
            <div>
              <h3 className={`font-extrabold text-base tracking-tight ${isCalendly ? 'text-neutral-900' : 'text-white'}`}>
                {isCalendly ? 'Agende sua Sessão' : 'Personalize seu Diagnóstico'}
              </h3>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isCalendly ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {isCalendly ? 'Selecione o melhor dia e horário' : 'Conte-nos sobre o seu negócio'}
              </span>
            </div>
          </div>

          {/* Corpo */}
          <div className="flex-1 w-full overflow-hidden relative">
            {step === 'form' ? (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 space-y-4 overflow-y-auto h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="agendarCompanyName" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      Nome da Empresa
                    </label>
                    <input
                      id="agendarCompanyName"
                      type="text"
                      required
                      placeholder="Ex: Sua Empresa"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm text-white font-semibold focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all placeholder:text-zinc-600"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      autoComplete="organization"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">
                      Modelo do Negócio / Tipo de Atuação
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {MODEL_OPTIONS.map((opt) => {
                        const isSelected = selectedModels.includes(opt);
                        return (
                          <div
                            key={opt}
                            onClick={() => toggleModel(opt)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-yellow/10 border-brand-yellow text-white shadow-[0_0_15px_rgba(255,204,0,0.1)]'
                                : 'bg-zinc-900 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                              isSelected ? 'bg-brand-yellow border-brand-yellow text-black' : 'border-zinc-700 bg-zinc-950'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="leading-snug">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!name || selectedModels.length === 0}
                  className={`w-full font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer mt-3 shrink-0 ${
                    name && selectedModels.length > 0
                      ? 'bg-brand-yellow hover:bg-brand-yellow-hover text-brand-black shadow-brand-yellow/10 hover:-translate-y-0.5 active:scale-[0.98]'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  Avançar para Agendamento
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="relative w-full h-full">
                {!iframeLoaded && !iframeError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-3">
                    <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Carregando calendário...</span>
                  </div>
                )}

                {iframeError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-4 p-8 text-center">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-neutral-800">Calendário indisponível</p>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        Não foi possível carregar o calendário. Entre em contato pelo WhatsApp ou tente novamente.
                      </p>
                    </div>
                  </div>
                )}

                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className={`w-full h-full transition-opacity duration-300 ${iframeLoaded && !iframeError ? 'opacity-100' : 'opacity-0'}`}
                  title="Agendamento Calendly — Loop Flow"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeError(true)}
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
