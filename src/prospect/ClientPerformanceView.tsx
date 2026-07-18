import React, { useEffect, useState } from 'react';
import PerformanceDashboard, { MonthData } from './components/PerformanceDashboard';
import { ProspectData } from './types';
import Logo from './components/Logo';
import { Loader2 } from 'lucide-react';

const ClientPerformanceView: React.FC = () => {
  const [data, setData] = useState<{ p: ProspectData; m: MonthData[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parseUrlData = () => {
      try {
        const hash = window.location.hash;
        if (!hash.includes('?')) {
          setError('Nenhum dado de performance foi fornecido no link.');
          setLoading(false);
          return;
        }

        const queryString = hash.split('?')[1];
        const urlParams = new URLSearchParams(queryString);
        let encoded = urlParams.get('d');

        if (!encoded) {
          setError('Parâmetros de visualização inválidos ou ausentes.');
          setLoading(false);
          return;
        }

        // Substitui os espaços de volta para '+' que o URLSearchParams converteu
        const cleanEncoded = encoded.replace(/ /g, '+');
        const decodedJson = decodeURIComponent(escape(atob(cleanEncoded)));
        const parsed = JSON.parse(decodedJson);

        if (parsed && parsed.p && parsed.m) {
          setData(parsed);
        } else {
          setError('O link de compartilhamento contém dados corrompidos.');
        }
      } catch (e) {
        console.error(e);
        setError('Ocorreu um erro ao processar o link de compartilhamento.');
      } finally {
        setLoading(false);
      }
    };

    parseUrlData();

    // Ouvir mudanças de hash para recarregar se o link mudar
    window.addEventListener('hashchange', parseUrlData);
    return () => window.removeEventListener('hashchange', parseUrlData);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
        <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Carregando painel...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-zinc-900 border border-zinc-800 rounded-[32px] p-10 space-y-6 shadow-xl">
          <div className="w-28 h-11 mx-auto opacity-70"><Logo className="w-full h-full" /></div>
          <div className="space-y-2">
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Ops, algo deu errado!</h2>
            <p className="text-zinc-500 font-medium text-xs leading-relaxed uppercase tracking-tight">{error || 'Painel de Desempenho indisponível.'}</p>
          </div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide leading-normal">
            Peça ao seu gestor de contas na LoopFlow para gerar e enviar um novo link de compartilhamento atualizado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PerformanceDashboard
      prospect={data.p}
      initialData={data.m}
      isClientView={true}
      onBack={() => {}}
    />
  );
};

export default ClientPerformanceView;
