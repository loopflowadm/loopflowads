import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { AIAgentVideo } from './remotion/AIAgentVideo';
import { DataDashboardVideo } from './remotion/DataDashboardVideo';
import { ProspectData } from '../../prospect/types';

interface VideoSectionProps {
  prospect: ProspectData;
}

type VideoTemplate = 'ai-agent' | 'dashboard';

export const VideoSection: React.FC<VideoSectionProps> = ({ prospect }) => {
  const companyName = prospect.name || prospect.companyName || '';
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate>('ai-agent');
  const [videoTitle, setVideoTitle] = useState(`${companyName} - Apresentação Automática`);

  const activeComponent = selectedTemplate === 'ai-agent' ? AIAgentVideo : DataDashboardVideo;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full min-h-[600px]">
      {/* Left: Video Player */}
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="w-full max-w-[360px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
          <Player
            key={selectedTemplate}
            component={activeComponent}
            inputProps={{
              companyName: companyName,
              segment: prospect.segment
            }}
            durationInFrames={selectedTemplate === 'ai-agent' ? 780 : 540}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls
            autoPlay={false}
            loop
          />
        </div>
        <p className="text-[11px] font-mono text-zinc-500 mt-4 tracking-wider uppercase">
          Player Remotion HD (1080x1920 Verticais / Reels / TikTok)
        </p>
      </div>

      {/* Right: Controls & Prompt */}
      <div className="w-full lg:w-[420px] flex flex-col gap-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-black uppercase text-white tracking-tight">Gerador de Vídeos Remotion</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Gere reels e vídeos dinâmicos adaptados ao nicho de <span className="text-yellow-400 font-bold">{prospect.segment}</span>.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
              Template do Vídeo
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedTemplate('ai-agent')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  selectedTemplate === 'ai-agent'
                    ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                🤖 Agente & Apresentação
              </button>
              <button
                onClick={() => setSelectedTemplate('dashboard')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  selectedTemplate === 'dashboard'
                    ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                📊 Dashboard & Métricas
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Título do Vídeo
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Empresa / Marca
            </label>
            <input
              type="text"
              readOnly
              value={companyName}
              className="w-full bg-zinc-950/50 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
              Segmento / Nicho
            </label>
            <input
              type="text"
              readOnly
              value={prospect.segment}
              className="w-full bg-zinc-950/50 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-400 cursor-not-allowed"
            />
          </div>

          <div className="pt-4 border-t border-zinc-900 flex gap-3">
            <button
              onClick={() => alert(`Vídeo "${videoTitle}" pronto para renderização via estúdio Remotion!`)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Exportar Vídeo MP4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
