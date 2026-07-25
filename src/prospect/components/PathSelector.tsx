import React from 'react';
import { PATHS } from '../data';
import { Path, ProspectData } from '../types';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChevronRightIcon } from '@hugeicons/core-free-icons';

const ChevronRight = (props: any) => (
  <HugeiconsIcon icon={ChevronRightIcon} size={props.size || 20} className={props.className || ''} color={props.color || 'currentColor'} strokeWidth={props.strokeWidth || 1.5} />
);

interface PathSelectorProps {
  prospect: ProspectData;
  onSelect: (path: Path) => void;
  onReset: () => void;
  theme?: 'light' | 'dark';
}

const PathSelector: React.FC<PathSelectorProps> = ({ prospect, onSelect, theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8 flex-1 flex flex-col">

      {/* Page Header — padrão unificado */}
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-3 mb-6 border-b ${
        isLight ? 'border-zinc-200' : 'border-zinc-900'
      }`}>
        <div>
          <h1 className={`text-3xl font-black uppercase tracking-tighter italic leading-none ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            Proposta Comercial
          </h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
            Escolha o modelo de apresentação para {prospect.name}
          </p>
        </div>
      </div>

      {/* Divider label */}
      <div className="mb-6">
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Modelos de Diagnóstico Comercial</span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PATHS.map((path) => {
          return (
            <div
              key={path.id}
              onClick={() => onSelect(path)}
              className={`group relative rounded-3xl p-7 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between hover:scale-[1.02] border ${
                isLight
                  ? 'bg-white border-zinc-200 shadow-xl hover:border-yellow-400/80 hover:shadow-2xl'
                  : 'bg-zinc-900/40 backdrop-blur-md border-yellow-400/50 ring-1 ring-yellow-400/20 shadow-[0_0_30px_rgba(250,204,21,0.1)]'
              }`}
            >
              <div className="flex flex-col mb-4">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl border bg-yellow-400 text-black border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.4)] mb-5">
                  {path.icon}
                </div>
                <h2 className={`text-xl font-black transition-colors uppercase tracking-tight italic leading-tight whitespace-pre-line ${
                  isLight ? 'text-zinc-900 group-hover:text-yellow-600' : 'text-white group-hover:text-yellow-400'
                }`}>
                  {path.title}
                </h2>
              </div>
              <p className={`text-xs leading-relaxed flex-grow font-semibold mb-6 ${
                isLight ? 'text-zinc-600' : 'text-zinc-300'
              }`}>
                {path.description}
              </p>
              <div className="pt-6 border-t border-yellow-400/20 font-black text-[10px] uppercase tracking-widest flex items-center text-yellow-500 group-hover:translate-x-1 transition-transform">
                Abrir Apresentação
                <ChevronRight className="w-4 h-4 ml-1.5" strokeWidth={3} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathSelector;
