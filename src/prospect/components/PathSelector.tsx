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
            Proposta Comercial
          </h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
            Escolha o modelo de apresentação para {prospect.name}
          </p>
        </div>
      </div>

      {/* Divider label */}
      <div className="mb-6">
        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Modelos de Diagnóstico Comercial</span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PATHS.map((path) => {
          return (
            <div
              key={path.id}
              onClick={() => onSelect(path)}
              className="group relative bg-zinc-900/40 backdrop-blur-md rounded-3xl p-7 border border-yellow-400/50 ring-1 ring-yellow-400/20 shadow-[0_0_30px_rgba(250,204,21,0.1)] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between hover:scale-[1.02]"
            >
              <div className="flex flex-col mb-4">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl border bg-yellow-400 text-black border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.4)] mb-5">
                  {path.icon}
                </div>
                <h2 className="text-xl font-black transition-colors uppercase tracking-tight italic leading-tight whitespace-pre-line text-white">
                  {path.title}
                </h2>
              </div>
              <p className="text-xs leading-relaxed flex-grow font-semibold text-zinc-300 mb-6">
                {path.description}
              </p>
              <div className="pt-6 border-t border-yellow-400/20 font-black text-[10px] uppercase tracking-widest flex items-center text-yellow-400 group-hover:translate-x-1 transition-transform">
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
