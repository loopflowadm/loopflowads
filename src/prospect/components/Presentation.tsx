import React, { useState } from 'react';
import { Slide, ProspectData } from '../types';
import Logo from './Logo';
import { ChevronLeft, ChevronRight, Check, HelpCircle, Zap, CheckCircle2, MessageCircle } from 'lucide-react';

interface PresentationProps {
  slides: Slide[];
  prospect: ProspectData;
  onExit: () => void;
}

const Presentation: React.FC<PresentationProps> = ({ slides, prospect, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const personalizeText = (text: string) => {
    if (!text) return "";
    return text.replace(/você|negócio|empresa|seu restaurante|o restaurante|prospect/gi, prospect.name);
  };

  const renderSlideContent = (slide: Slide) => {
    switch (slide.type) {
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
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col overflow-hidden select-none">
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 bg-zinc-900/50 px-4 py-2 rounded-2xl border border-zinc-800">
                {prospect.logo ? (
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <img src={prospect.logo} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-lg flex items-center justify-center text-sm font-black italic">{prospect.name.substring(0, 1)}</div>
                )}
                <div className="flex flex-col">
                  <span className="text-white font-black text-sm uppercase tracking-tight truncate max-w-[180px] leading-none mb-1">{prospect.name}</span>
                  <span className="text-yellow-400 font-bold text-[8px] uppercase tracking-[0.2em] leading-none opacity-50">{prospect.segment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {slide.pausePrompt && (
              <div className="group relative">
                <div className="flex items-center space-x-2 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/30 cursor-help transition-colors hover:bg-yellow-400/20">
                  <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[9px] font-black text-yellow-400/80 uppercase tracking-wider">Pergunta</span>
                </div>
                <div className="absolute top-full right-0 mt-4 w-72 bg-zinc-950 border border-zinc-800 p-6 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] transform group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                  <div className="absolute -top-1.5 right-6 w-3 h-3 bg-zinc-950 border-t border-l border-zinc-800 transform rotate-45"></div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 text-yellow-500">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pt-1">Engajamento Estratégico</div>
                  </div>
                  <div className="text-sm font-bold text-white leading-relaxed italic border-l-2 border-yellow-500 pl-3">
                    "{slide.pausePrompt}"
                  </div>
                </div>
              </div>
            )}
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
        <div className="absolute bottom-8 right-12 z-[70] flex items-center space-x-4">
          <div className="flex bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-1.5 shadow-2xl">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className={`p-4 rounded-xl transition-all ${currentStep === 0
                ? 'text-zinc-800 cursor-not-allowed'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              title="Anterior"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </button>
            <div className="w-px bg-zinc-800 mx-1.5 my-2"></div>
            <button
              onClick={currentStep === slides.length - 1 ? onExit : next}
              className={`p-4 rounded-xl transition-all ${currentStep === slides.length - 1
                ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400 hover:text-black scale-110'
                : 'text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800'
                }`}
              title={currentStep === slides.length - 1 ? "Concluir Diagnóstico" : "Próximo"}
            >
              {currentStep === slides.length - 1 ? (
                <Check className="w-6 h-6" strokeWidth={4} />
              ) : (
                <ChevronRight className="w-6 h-6" strokeWidth={3} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
