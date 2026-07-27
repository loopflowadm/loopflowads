import React, { useState } from 'react';
import { ProspectData } from '../prospect/types';
import { CreativeGeneratorView } from './components/CreativeGeneratorView';
import { VideoSection } from './components/VideoSection';
import { ImageSection } from './components/ImageSection';
import { CarouselSection } from './components/CarouselSection';
import { DnaSection } from './components/DnaSection';
import { GallerySection } from './components/GallerySection';

interface LaboratorioViewProps {
  prospect: ProspectData;
}

type TabType = 'wizard' | 'videos' | 'images' | 'carousels' | 'dna' | 'gallery';

export const LaboratorioView: React.FC<LaboratorioViewProps> = ({ prospect }) => {
  const [activeTab, setActiveTab] = useState<TabType>('wizard');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'wizard', label: 'Estúdio IA (7 Etapas)' },
    { id: 'videos', label: 'Vídeos Remotion' },
    { id: 'images', label: 'Imagens & Postagens' },
    { id: 'carousels', label: 'Carrosséis' },
    { id: 'dna', label: 'DNA do Lead' },
    { id: 'gallery', label: 'Galeria' },
  ];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8 flex-1 flex flex-col">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-yellow-400/20 inline-block">
              Laboratório de Criativos & Mídias
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">
            {prospect.name || prospect.companyName}
          </h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1.5">
            Segmento: <span className="text-zinc-300 font-semibold">{prospect.segment}</span>
          </p>
        </div>

        {/* Sub-tabs selector sem ícones */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-850 self-stretch md:self-auto overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-yellow-400 text-black shadow-md font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'wizard' && <CreativeGeneratorView prospect={prospect} />}
        {activeTab === 'videos' && <VideoSection prospect={prospect} />}
        {activeTab === 'images' && <ImageSection prospect={prospect} />}
        {activeTab === 'carousels' && <CarouselSection prospect={prospect} />}
        {activeTab === 'dna' && <DnaSection prospect={prospect} />}
        {activeTab === 'gallery' && <GallerySection prospect={prospect} />}
      </div>
    </div>
  );
};

export default LaboratorioView;
