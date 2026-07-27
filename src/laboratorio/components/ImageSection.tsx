import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import CreativePostRenderer from './CreativePostRenderer';
import { CreativePage, LayoutType, AspectRatio } from '../types';
import { ProspectData } from '../../prospect/types';

interface ImageSectionProps {
  prospect: ProspectData;
  onSaveToGallery?: (page: CreativePage, format: AspectRatio) => void;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ prospect, onSaveToGallery }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const companyName = prospect.name || prospect.companyName || '';

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('4/5');
  const [layoutType, setLayoutType] = useState<LayoutType>('floating-card');
  const [title, setTitle] = useState(`Como a ${companyName} escala no digital`);
  const [content, setContent] = useState(`Estratégias validadas de tráfego e conversão focadas no segmento de ${prospect.segment}.`);
  const [kicker, setKicker] = useState('INSIGHT DE PERFORMANCE');
  const [accentColorHex, setAccentColorHex] = useState('#facc15');

  const pageData: CreativePage = {
    id: 'single-post-1',
    title,
    content,
    kicker,
    accentColorHex,
    layoutType,
    handle: `@${companyName.toLowerCase().replace(/\s+/g, '')}`,
    index: '01 / 01'
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `criativo-${companyName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full min-h-[600px]">
      {/* Visual Canvas Preview */}
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div
          ref={previewRef}
          className={`overflow-hidden shadow-2xl rounded-xl border border-zinc-800 transition-all ${
            aspectRatio === '9/16' ? 'w-[320px] h-[568px]' : aspectRatio === '4/5' ? 'w-[380px] h-[475px]' : 'w-[400px] h-[400px]'
          }`}
        >
          <CreativePostRenderer page={pageData} isPreview aspectRatio={aspectRatio} />
        </div>
        <p className="text-[11px] font-mono text-zinc-500 mt-4 tracking-wider uppercase">
          Formato Selecionado: {aspectRatio}
        </p>
      </div>

      {/* Editor Sidebar */}
      <div className="w-full lg:w-[420px] flex flex-col gap-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-black uppercase text-white tracking-tight">Criador de Artes & Anúncios</h3>
          <p className="text-xs text-zinc-400 mt-1">Crie imagens estáticas de alta conversão para Instagram e Ads.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Format Selector */}
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Proporção / Formato
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['9/16', '4/5', '1/1'] as AspectRatio[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setAspectRatio(fmt)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    aspectRatio === fmt
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Selector */}
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Estilo Visual / Layout
            </label>
            <select
              value={layoutType}
              onChange={(e) => setLayoutType(e.target.value as LayoutType)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
            >
              <option value="floating-card">Card Flutuante Glass</option>
              <option value="split">Split Dividido (Destaque)</option>
              <option value="quote">Citação / Frase de Impacto</option>
              <option value="editorial">Editorial / Revista Modern</option>
              <option value="data-story">Story de Dados & Métricas</option>
              <option value="minimal">Minimalista Clean</option>
            </select>
          </div>

          {/* Kicker */}
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Selo / Kicker
            </label>
            <input
              type="text"
              value={kicker}
              onChange={(e) => setKicker(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Título Principal
            </label>
            <textarea
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Texto de Apoio
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-900 flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Baixar Imagem PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
