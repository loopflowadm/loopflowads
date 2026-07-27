import React from 'react';
import { useCreativeWizard, TONE_OPTIONS, STYLE_OPTIONS } from '../hooks/useCreativeWizard';
import CreativePostRenderer from './CreativePostRenderer';
import { ProspectData } from '../../prospect/types';
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon, MagicWand01Icon, AnalyticsUpIcon, Task01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

interface AiWizardSectionProps {
  prospect: ProspectData;
}

const createIcon = (icon: any) => (props: any) => (
  <HugeiconsIcon icon={icon} size={props.size || 16} className={props.className || ''} color={props.color || 'currentColor'} strokeWidth={1.5} />
);

const Sparkles = createIcon(SparklesIcon);
const MagicWand = createIcon(MagicWand01Icon);
const Analytics = createIcon(AnalyticsUpIcon);
const Task = createIcon(Task01Icon);
const ArrowRight = createIcon(ArrowRight01Icon);

export const AiWizardSection: React.FC<AiWizardSectionProps> = ({ prospect }) => {
  const wizard = useCreativeWizard(prospect);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      {/* Step Header Indicator */}
      <div className="bg-zinc-900/50 border border-zinc-900 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-400/20 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Motor de Geração IA (Gemini 2.5)
          </span>
          <h2 className="text-xl font-black uppercase tracking-tight text-white mt-2">
            Criação de Anúncios & Conteúdo
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Prompting estratégico configurado para <span className="text-yellow-400 font-bold">{prospect.name || prospect.companyName}</span> ({prospect.segment}).
          </p>
        </div>

        {/* Wizard Steps Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'intent', label: '1. Prompt' },
            { id: 'analysis', label: '2. Raio-X' },
            { id: 'angles', label: '3. Ângulos' },
            { id: 'skeleton', label: '4. Esqueleto' },
            { id: 'blocks', label: '5. Mídias' },
          ].map((s, idx) => (
            <button
              key={s.id}
              onClick={() => wizard.goToStep(s.id as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all shrink-0 cursor-pointer ${
                wizard.wizardStep === s.id
                  ? 'bg-yellow-400 text-black font-black'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-850 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: PROMPT / INTENT */}
      {wizard.wizardStep === 'intent' && (
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-black uppercase text-white">Etapa 1: Insumo & Prompt de Entrada</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Descreva a ideia, oferta ou cole um texto base para a IA estruturar o criativo.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Prompt / Insumo Inicial
              </label>
              <textarea
                rows={4}
                value={wizard.prompt}
                onChange={(e) => wizard.setPrompt(e.target.value)}
                placeholder="Ex: Como atrair clientes qualificados no nicho usando tráfego pago e automação..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Tom de Voz
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TONE_OPTIONS.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => wizard.setToneOfVoice(t.value)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        wizard.toneOfVoice === t.value
                          ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                          : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Estilo de Copy
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLE_OPTIONS.map((st) => (
                    <button
                      key={st.value}
                      onClick={() => wizard.setCopyStyle(st.value)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        wizard.copyStyle === st.value
                          ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                          : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={wizard.handleExtractAnalysis}
                disabled={wizard.isGenerating}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                <MagicWand className="w-4 h-4" />
                {wizard.isGenerating ? 'Analisando com IA...' : 'Iniciar Raio-X com IA →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ANALYSIS */}
      {wizard.wizardStep === 'analysis' && wizard.analysis && (
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-black uppercase text-white">Etapa 2: Raio-X Estratégico</h3>
            <p className="text-xs text-zinc-400 mt-1">Diagnóstico automático feito pela IA com base no insumo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850">
              <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase">Tema Central</span>
              <p className="text-sm font-bold text-white mt-1">{wizard.analysis.temaCentral}</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850">
              <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase">Transformação</span>
              <p className="text-sm font-bold text-white mt-1">{wizard.analysis.transformacao}</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850">
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">Fricção Central (Dor)</span>
              <p className="text-sm font-bold text-white mt-1">{wizard.analysis.friccaoCentral}</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Ângulo Dominante</span>
              <p className="text-sm font-bold text-white mt-1">{wizard.analysis.anguloDominante}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => wizard.goToStep('intent')}
              className="px-4 py-2 bg-zinc-900 text-zinc-400 rounded-xl text-xs font-bold uppercase hover:text-white"
            >
              ← Voltar ao Prompt
            </button>
            <button
              onClick={wizard.handleGenerateAngles}
              disabled={wizard.isGenerating}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              Gerar Ângulos Estratégicos →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ANGLES */}
      {wizard.wizardStep === 'angles' && (
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-black uppercase text-white">Etapa 3: Escolher Ângulo de Copy</h3>
            <p className="text-xs text-zinc-400 mt-1">Selecione qual abordagem a IA usará para construir a narrativa.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {wizard.generatedAngles.map((angle, idx) => (
              <div
                key={idx}
                onClick={() => wizard.handleGenerateSkeleton(angle)}
                className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-yellow-400/50 p-5 rounded-2xl cursor-pointer transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2 py-0.5 rounded">
                    Ângulo 0{idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors mt-2">
                    {angle.headline}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">{angle.reasoning}</p>
                </div>
                <button className="bg-yellow-400 text-black font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider shrink-0 group-hover:scale-105 transition-transform">
                  Selecionar →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: SKELETON */}
      {wizard.wizardStep === 'skeleton' && wizard.skeleton && (
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-black uppercase text-white">Etapa 4: Esqueleto Narrativo</h3>
            <p className="text-xs text-zinc-400 mt-1">Estrutura lógica aprovada pela IA antes de gerar os blocos finais.</p>
          </div>

          <div className="space-y-3 bg-zinc-950 p-6 rounded-2xl border border-zinc-850">
            <div>
              <span className="text-[9px] font-mono text-yellow-400 uppercase">Hook (Gancho)</span>
              <p className="text-sm font-bold text-white">{wizard.skeleton.hook}</p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-zinc-400 uppercase">Mecanismo Único</span>
              <p className="text-xs text-zinc-300">{wizard.skeleton.mecanismo}</p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-zinc-400 uppercase">Aplicação Prática</span>
              <p className="text-xs text-zinc-300">{wizard.skeleton.aplicacao}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => wizard.goToStep('angles')}
              className="px-4 py-2 bg-zinc-900 text-zinc-400 rounded-xl text-xs font-bold uppercase hover:text-white"
            >
              ← Trocar Ângulo
            </button>
            <button
              onClick={wizard.handleGenerateBlocks}
              disabled={wizard.isGenerating}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MagicWand className="w-4 h-4" />
              Gerar Mídias & Cards Finais →
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: BLOCKS / RENDER */}
      {wizard.wizardStep === 'blocks' && wizard.pages.length > 0 && (
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black uppercase text-white">Etapa 5: Mídias Geradas com IA</h3>
              <p className="text-xs text-zinc-400 mt-1">{wizard.pages.length} cards gerados via Gemini 2.5 Flash.</p>
            </div>
            <button
              onClick={() => wizard.goToStep('intent')}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase"
            >
              + Novo Prompt
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wizard.pages.map((p, idx) => (
              <div key={p.id} className="h-[420px] rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
                <CreativePostRenderer page={p} isPreview aspectRatio="4/5" slideIndex={idx} totalSlides={wizard.pages.length} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
