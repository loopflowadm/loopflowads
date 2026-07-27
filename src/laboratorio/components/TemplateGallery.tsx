import { useState } from 'react';
import { layoutTemplates, type LayoutTemplate } from '../lib/templates';
import CreativePostRenderer from './CreativePostRenderer';
import type { CreativePage } from '../types';

interface TemplateGalleryProps {
  selected: LayoutTemplate | null;
  onSelect: (template: LayoutTemplate | null) => void;
}

function buildPreviewPage(template: LayoutTemplate): CreativePage {
  const style = template.getSlideStyle(0, 1);
  return {
    id: 'preview',
    title: 'EXEMPLO DE HEADLINE',
    content: 'Texto de apoio do criativo de elite.',
    kicker: 'Estratégia',
    tag: 'Saiba mais',
    handle: '@suamarca',
    layoutType: style.layoutType,
    bgColorHex: '#09090b',
    textColorHex: '#ffffff',
    accentColorHex: '#facc15',
  };
}

export default function TemplateGallery({ selected, onSelect }: TemplateGalleryProps) {
  const isAiMode = selected === null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
          Template Visual
        </label>
        <span className="text-[10px] text-zinc-500 font-medium">Adaptação automática ao DNA da marca</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* AI Decides Option */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect(null)}
          className={`relative rounded-2xl border overflow-hidden transition-all duration-300 group cursor-pointer ${
            isAiMode
              ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
              : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
          }`}
        >
          <div className="aspect-[4/3] flex flex-col items-center justify-center gap-1.5 p-4 text-center">
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
              isAiMode ? 'bg-yellow-400 text-black font-extrabold' : 'bg-zinc-900 text-zinc-400'
            }`}>
              Automático
            </span>
            <span className={`text-xs font-bold ${isAiMode ? 'text-white' : 'text-zinc-400'}`}>
              IA Decide
            </span>
          </div>
        </div>

        {/* Template Cards */}
        {layoutTemplates.map((template) => {
          const isSelected = selected?.id === template.id;
          const previewPage = buildPreviewPage(template);

          return (
            <div
              key={template.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(template)}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 group cursor-pointer ${
                isSelected
                  ? 'border-yellow-400 bg-yellow-400/10 shadow-lg'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-950">
                <CreativePostRenderer page={previewPage} isThumbnail aspectRatio="4/5" />
              </div>
              <div className="p-2.5 bg-zinc-900 border-t border-zinc-800">
                <span className="text-[10px] font-bold text-white block uppercase tracking-tight">{template.name}</span>
                <span className="text-[9px] text-zinc-500 block truncate">{template.mood}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
