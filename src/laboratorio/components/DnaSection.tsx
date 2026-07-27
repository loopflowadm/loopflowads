import React, { useState } from 'react';
import { ProspectData } from '../../prospect/types';

interface DnaSectionProps {
  prospect: ProspectData;
}

export const DnaSection: React.FC<DnaSectionProps> = ({ prospect }) => {
  const companyName = prospect.name || prospect.companyName || '';
  const logoUrl = prospect.logo || prospect.logoUrl || '';

  const [brandName, setBrandName] = useState(companyName);
  const [segment, setSegment] = useState(prospect.segment);
  const [toneOfVoice, setToneOfVoice] = useState('Profissional, inovador, focado em conversão e ROI');
  const [targetAudience, setTargetAudience] = useState(`Empresários e tomada de decisão no setor de ${prospect.segment}`);
  const [primaryColor, setPrimaryColor] = useState(prospect.colorScheme?.primary || '#facc15');

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8">
      <div>
        <h3 className="text-xl font-black uppercase text-white tracking-tight">DNA de Marca do Lead</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Identidade visual e diretrizes de comunicação sincronizadas para a <span className="text-yellow-400 font-bold">{companyName}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Nome da Empresa / Marca
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Segmento / Nicho de Atuação
          </label>
          <input
            type="text"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Tom de Voz & Comunicação
          </label>
          <input
            type="text"
            value={toneOfVoice}
            onChange={(e) => setToneOfVoice(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Público-Alvo Alvo
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Cor Principal de Destaque
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 cursor-pointer"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Logotipo do Lead
          </label>
          <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-400 flex items-center justify-between">
            <span>{logoUrl ? 'Logo cadastrado' : 'Sem logotipo personalizado'}</span>
            {logoUrl && <img src={logoUrl} alt="Logo" className="h-6 w-auto object-contain" />}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-900 flex justify-end">
        <button
          onClick={() => alert('DNA do Lead atualizado com sucesso!')}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Salvar Alterações do DNA
        </button>
      </div>
    </div>
  );
};
