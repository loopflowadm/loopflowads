import React, { useState } from 'react';
import { ProspectData } from '../types';
import Logo from './Logo';

interface ProspectSetupProps {
  onComplete: (data: ProspectData) => void;
}

const ProspectSetup: React.FC<ProspectSetupProps> = ({ onComplete }) => {
  const [data, setData] = useState<ProspectData>({
    name: '',
    segment: '',
    logo: ''
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.segment) {
      onComplete(data);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="max-w-xl w-full relative z-10">
        <div className="mb-8 text-center">
          <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-[0.3em]">Ambiente Seguro de Prospecção</p>
          <h2 className="text-xl font-black italic uppercase tracking-tight text-white mt-2">Cadastrar Novo Lead</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-850 p-10 rounded-[32px] shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Quem é o Prospect?</label>
            <input
              type="text"
              required
              placeholder="Nome da Empresa"
              className="w-full bg-zinc-950 border border-zinc-880 rounded-xl px-6 py-4 text-white font-bold focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all placeholder:text-zinc-700"
              value={data.name}
              onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nicho de Atuação</label>
            <select
              className="w-full bg-zinc-950 border border-zinc-880 rounded-xl px-6 py-4 text-white font-bold focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all appearance-none"
              value={data.segment}
              onChange={e => setData(prev => ({ ...prev, segment: e.target.value }))}
              required
            >
              <option value="">Selecione o segmento...</option>
              <option value="Restaurante / Delivery">Restaurante / Delivery</option>
              <option value="E-commerce / Varejo">E-commerce / Varejo</option>
              <option value="Negócio Local / Clínicas / Serviços">Negócio Local / Clínicas / Serviços</option>
              <option value="B2B / Corporativo / Outro">B2B / Corporativo / Outro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Identidade do Cliente</label>
            <div className="flex items-center space-x-4">
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl py-6 cursor-pointer hover:border-yellow-400/50 transition-all bg-zinc-950/30 group">
                <span className="text-zinc-500 text-sm font-bold group-hover:text-yellow-400 transition-colors">
                  {data.logo ? 'Logo Carregada ✓' : 'Upload da Logo'}
                </span>
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
              </label>
              {data.logo && (
                <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center border-2 border-yellow-400 shadow-xl">
                   <img src={data.logo} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-5 rounded-xl uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(250,204,21,0.2)] transform hover:-translate-y-1 active:scale-95 transition-all"
          >
            Iniciar Prospecção
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProspectSetup;
