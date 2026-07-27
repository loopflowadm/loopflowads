import React, { useState } from 'react';
import CreativePostRenderer from './CreativePostRenderer';
import { CreativePage } from '../types';
import { ProspectData } from '../../prospect/types';

interface CarouselSectionProps {
  prospect: ProspectData;
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({ prospect }) => {
  const companyName = prospect.name || prospect.companyName || '';
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [slides, setSlides] = useState<CreativePage[]>([
    {
      id: 'slide-1',
      title: `5 Erros Fatais no Marketing de ${prospect.segment}`,
      content: `Descubra por que a ${companyName} pode estar perdendo clientes valiosos todos os dias.`,
      kicker: 'GUIA PRÁTICO',
      accentColorHex: '#facc15',
      layoutType: 'floating-card',
      handle: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
      index: '01 / 04'
    },
    {
      id: 'slide-2',
      title: 'Erro #1: Focar em Métricas de Vaidade',
      content: 'Curtidas não pagam contas. O verdadeiro foco deve ser o Custo por Aquisição (CAC) e ROI de conversão.',
      kicker: 'DIAGNÓSTICO',
      accentColorHex: '#facc15',
      layoutType: 'split',
      handle: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
      index: '02 / 04'
    },
    {
      id: 'slide-3',
      title: 'Erro #2: Não Testar Criativos Semanalmente',
      content: 'A fadiga de anúncios reduz suas vendas em até 60% se você não renovar as ofertas com frequência.',
      kicker: 'ESTRATÉGIA',
      accentColorHex: '#facc15',
      layoutType: 'editorial',
      handle: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
      index: '03 / 04'
    },
    {
      id: 'slide-4',
      title: 'Pronto para Transformar Seus Resultados?',
      content: `Acelere o crescimento da ${companyName} com o ecossistema completo da LoopFlow.`,
      kicker: 'CHAMADA PARA AÇÃO',
      accentColorHex: '#facc15',
      layoutType: 'minimal',
      tag: 'LINK NA BIO',
      handle: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
      index: '04 / 04'
    }
  ]);

  const activeSlide = slides[currentSlideIndex];

  const updateActiveSlide = (field: keyof CreativePage, value: any) => {
    setSlides(prev => prev.map((s, idx) => idx === currentSlideIndex ? { ...s, [field]: value } : s));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full min-h-[600px]">
      {/* Carousel Viewer */}
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="w-[380px] h-[475px] overflow-hidden shadow-2xl rounded-xl border border-zinc-800 transition-all">
          <CreativePostRenderer page={activeSlide} isPreview aspectRatio="4/5" slideIndex={currentSlideIndex} totalSlides={slides.length} />
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 cursor-pointer"
          >
            ← Slide Anterior
          </button>
          <span className="text-xs font-mono text-zinc-400 font-bold">
            {currentSlideIndex + 1} de {slides.length}
          </span>
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 cursor-pointer"
          >
            Próximo Slide →
          </button>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="w-full lg:w-[420px] flex flex-col gap-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-black uppercase text-white tracking-tight">Gerador de Carrosséis</h3>
          <p className="text-xs text-zinc-400 mt-1">Crie sequências de slides educativas e vendedoras para o cliente.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Selo / Kicker (Slide {currentSlideIndex + 1})
            </label>
            <input
              type="text"
              value={activeSlide.kicker || ''}
              onChange={(e) => updateActiveSlide('kicker', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Título do Slide {currentSlideIndex + 1}
            </label>
            <textarea
              rows={2}
              value={activeSlide.title}
              onChange={(e) => updateActiveSlide('title', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Conteúdo do Slide {currentSlideIndex + 1}
            </label>
            <textarea
              rows={3}
              value={activeSlide.content || ''}
              onChange={(e) => updateActiveSlide('content', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-900 flex gap-3">
            <button
              onClick={() => alert(`Carrossel completo de ${slides.length} slides pronto!`)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Exportar Carrossel (PDF/ZIP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
