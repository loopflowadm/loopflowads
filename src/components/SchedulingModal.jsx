import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { X, Clock, Video, Upload, ArrowRight, AlertCircle } from 'lucide-react';
import Logo from './Logo';
import { supabase } from '../lib/supabase';

export default function SchedulingModal({ isOpen, onClose }) {
  // Parâmetros do Calendly
  const calendlyUrl = "https://calendly.com/loopflowsolutions/30min?hide_event_type_details=1&hide_gdpr_banner=1";

  // Estados do Formulário de 2 etapas
  const [step, setStep] = useState('form');
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('');
  const [logo, setLogo] = useState('');
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Reset state ao abrir/fechar
  useEffect(() => {
    if (!isOpen) {
      // Small delay before reset to allow exit animation
      const t = setTimeout(() => {
        setStep('form');
        setName('');
        setSegment('');
        setLogo('');
        setIframeError(false);
        setIframeLoaded(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Fecha com Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && segment) {
      const id = Date.now().toString();

      // Salva no Supabase de forma assíncrona (não-bloqueante)
      supabase.from('prospects').insert([
        {
          id: id,
          name: name,
          segment: segment,
          logo: logo || null,
          google_sheets_url: null
        }
      ]).then(({ error }) => {
        if (error) {
          // Silently fail — backup via localStorage
        }
      }).catch(() => {
        // Silently fail — backup via localStorage
      });

      // Salva no localStorage como redundância
      const newProspect = {
        id: id,
        name: name,
        segment: segment,
        logo: logo,
        date: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('loopflow_prospects:v1') || '[]');
      localStorage.setItem('loopflow_prospects:v1', JSON.stringify([newProspect, ...existing]));

      setStep('calendly');
    }
  };

  const isCalendly = step === 'calendly';

  return (
    <AnimatePresence>
      {isOpen && (
        <LazyMotion features={domAnimation}>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Modal de agendamento de diagnóstico"
          >
            
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Container */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
              className="relative w-full max-w-xl md:max-w-4xl bg-brand-black border border-white/10 rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] z-10 flex flex-col md:flex-row max-h-[90vh] h-[640px]"
            >
              
              {/* SIDEBAR (desktop) */}
              <div className="hidden md:flex flex-col w-[260px] bg-black/35 border-r border-white/5 p-8 text-left justify-between shrink-0 select-none">
                <div className="space-y-6">
                  <Logo className="h-7 w-auto" color="#FFCC00" />
                  
                  <div className="space-y-1 pt-3">
                    <span className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Loop Flow</span>
                    <h4 className="text-lg font-black text-white leading-tight">
                      Call de Diagnóstico Comercial
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs text-neutral-400 font-semibold">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
                      <span>30 minutos</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Video className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
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
                    <div className={`w-2 h-2 rounded-full transition-colors ${!isCalendly ? 'bg-brand-yellow' : 'bg-neutral-600'}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${!isCalendly ? 'text-brand-yellow' : 'text-neutral-600'}`}>
                      1. Seu negócio
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full transition-colors ${isCalendly ? 'bg-brand-yellow' : 'bg-neutral-700'}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isCalendly ? 'text-brand-yellow' : 'text-neutral-700'}`}>
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
                  
                  {/* Botão X — tamanho mínimo 44px para touch */}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar modal de agendamento"
                    className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                      isCalendly
                        ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-600 hover:text-neutral-900'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Corpo */}
                <div className="flex-1 w-full overflow-hidden relative">
                  {step === 'form' ? (
                    <form
                      onSubmit={handleSubmit}
                      className="p-6 sm:p-8 space-y-5 overflow-y-auto h-full flex flex-col justify-center"
                    >
                      <div className="space-y-1.5">
                        <label htmlFor="modalCompanyName" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          Nome da Empresa
                        </label>
                        <input
                          id="modalCompanyName"
                          type="text"
                          required
                          placeholder="Ex: Burger Flow"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm text-white font-semibold focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all placeholder:text-zinc-600"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          autoComplete="organization"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="modalNichoSelect" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          Nicho de Atuação
                        </label>
                        <select
                          id="modalNichoSelect"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm text-white font-semibold focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none transition-all appearance-none cursor-pointer"
                          value={segment}
                          onChange={e => setSegment(e.target.value)}
                          required
                        >
                          <option value="">Selecione o segmento...</option>
                          <option value="Restaurante / Delivery">Restaurante / Delivery</option>
                          <option value="E-commerce / Varejo">E-commerce / Varejo</option>
                          <option value="Negócio Local / Clínicas / Serviços">Negócio Local / Clínicas / Serviços</option>
                          <option value="B2B / Corporativo / Outro">B2B / Corporativo / Outro</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">
                          Identidade Visual — Opcional
                        </span>
                        <div className="flex items-center gap-3">
                          <label
                            htmlFor="modalLogoFile"
                            className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl py-4 cursor-pointer hover:border-brand-yellow/50 transition-all bg-zinc-900/40 group"
                          >
                            <span className="text-zinc-500 text-xs font-semibold group-hover:text-brand-yellow transition-colors flex items-center gap-2">
                              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                              {logo ? 'Logo Carregada ✓' : 'Fazer upload da logo'}
                            </span>
                            <input
                              id="modalLogoFile"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleLogoChange}
                              aria-label="Upload da logo da empresa"
                            />
                          </label>
                          {logo && (
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center border-2 border-brand-yellow shadow-lg bg-zinc-900 shrink-0">
                              <img src={logo} alt="Preview da logo" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-black font-black py-4 rounded-2xl uppercase tracking-widest text-xs shadow-lg shadow-brand-yellow/10 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all active:scale-[0.98] cursor-pointer mt-2"
                      >
                        Avançar para Agendamento
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </form>
                  ) : (
                    <div className="relative w-full h-full">
                      {/* Loading state do iframe */}
                      {!iframeLoaded && !iframeError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-3">
                          <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Carregando calendário...</span>
                        </div>
                      )}

                      {/* Estado de erro do iframe */}
                      {iframeError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-4 p-8 text-center">
                          <AlertCircle className="w-10 h-10 text-amber-500" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-bold text-neutral-800">Calendário indisponível</p>
                            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                              Não foi possível carregar o calendário. Entre em contato pelo WhatsApp ou tente novamente.
                            </p>
                          </div>
                          <a
                            href="https://wa.me/55000000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-yellow text-brand-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest"
                          >
                            Falar no WhatsApp
                          </a>
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

            </m.div>
          </div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
}
