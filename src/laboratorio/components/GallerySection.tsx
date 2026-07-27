import React from 'react';
import { ProspectData } from '../../prospect/types';

interface GallerySectionProps {
  prospect: ProspectData;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ prospect }) => {
  const companyName = prospect.name || prospect.companyName || '';

  const sampleItems = [
    {
      id: '1',
      title: `Vídeo Reels - Apresentação ${companyName}`,
      type: 'video',
      aspect: '9/16',
      date: 'Hoje, 10:30',
      previewBg: 'from-yellow-500/20 to-zinc-950',
    },
    {
      id: '2',
      title: `Carrossel 4 Slides - Diagnóstico ${prospect.segment}`,
      type: 'carousel',
      aspect: '4/5',
      date: 'Ontem, 16:45',
      previewBg: 'from-amber-500/20 to-zinc-950',
    },
    {
      id: '3',
      title: 'Arte Estática - Anúncio de Oferta Principal',
      type: 'single',
      aspect: '1/1',
      date: 'há 2 dias',
      previewBg: 'from-yellow-400/20 to-zinc-950',
    }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
        <div>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">Galeria de Mídias Salvas</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Histórico de criativos, vídeos e carrosséis gerados para a <span className="text-yellow-400 font-bold">{companyName}</span>.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
          {sampleItems.length} itens salvos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleItems.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${item.previewBg} border border-zinc-800/80 flex items-center justify-center relative overflow-hidden mb-4`}>
              <span className="text-4xl">
                {item.type === 'video' ? '🎥' : item.type === 'carousel' ? '🎠' : '🖼️'}
              </span>
              <span className="absolute top-3 right-3 text-[9px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-zinc-300 border border-zinc-800">
                {item.aspect}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                {item.title}
              </h4>
              <p className="text-[10px] text-zinc-500 font-mono mt-1">{item.date}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-900 flex justify-between items-center">
              <button
                onClick={() => alert(`Visualizando item: ${item.title}`)}
                className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Abrir Mídia →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
