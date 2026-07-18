import React from 'react';
import { PATHS } from '../data';
import { Path, ProspectData } from '../types';
import { ChevronRight } from 'lucide-react';

interface PathSelectorProps {
  prospect: ProspectData;
  onSelect: (path: Path) => void;
  onReset: () => void;
}

const PathSelector: React.FC<PathSelectorProps> = ({ prospect, onSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">

      {/* Page Header — padrão unificado */}
      <div className="mb-8 pb-6 border-b border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">
            Estratégia de Escala
          </h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
            Escolha o modelo de apresentação para {prospect.name}
          </p>
        </div>

        {/* Cliente info compacto */}
        <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2.5 rounded-xl border border-zinc-800 shrink-0">
          {prospect.logo ? (
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
              <img src={prospect.logo} alt={prospect.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-yellow-400 text-black rounded-lg flex items-center justify-center text-sm font-black italic shrink-0">
              {prospect.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="text-white font-black text-xs uppercase tracking-tight">{prospect.name}</div>
            <div className="text-yellow-400 font-bold text-[9px] uppercase tracking-widest">{prospect.segment}</div>
          </div>
        </div>
      </div>

      {/* Divider label */}
      <div className="mb-6">
        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Dimensões da Engenharia Estratégica</span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PATHS.map((path, index) => {
          const isComingSoon = index === 1 || index === 2;
          const isActiveDefault = index === 0;
          return (
            <div
              key={path.id}
              onClick={() => onSelect(path)}
              className={`group relative bg-zinc-900/20 backdrop-blur-sm rounded-3xl p-6 border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full ${isActiveDefault ? 'border-yellow-400/50 ring-1 ring-yellow-400/20 shadow-[0_0_30px_rgba(250,204,21,0.1)]' : 'border-zinc-800 hover:border-yellow-400/50'
                }`}
            >
              {isComingSoon && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[7px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-bl-xl shadow-lg z-10">
                  Em Breve
                </div>
              )}
              <div className="flex flex-col mb-4">
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border transition-all mb-4 ${isActiveDefault
                  ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                  : 'text-zinc-500 bg-zinc-900/50 border-zinc-800 group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400'
                  }`}>
                  {path.icon}
                </div>
                <h2 className={`text-lg font-black transition-colors uppercase tracking-tight italic leading-tight whitespace-pre-line ${isActiveDefault ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                  }`}>
                  {path.title}
                </h2>
              </div>
              <p className={`text-xs leading-relaxed flex-grow font-medium ${isActiveDefault ? 'text-zinc-300' : 'text-zinc-500'
                }`}>
                {path.description}
              </p>
              <div className={`mt-6 pt-6 border-t font-black text-[9px] uppercase tracking-widest flex items-center transition-colors ${isActiveDefault ? 'border-yellow-400/20 text-yellow-400' : 'border-zinc-900 text-zinc-700 group-hover:text-yellow-400'
                }`}>
                Abrir Apresentação
                <ChevronRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathSelector;
