import React, { useState, useRef } from 'react';
import { useCreativeWizard, TONE_OPTIONS, STYLE_OPTIONS } from '../hooks/useCreativeWizard';
import CreativePostRenderer from './CreativePostRenderer';
import TemplateGallery from './TemplateGallery';
import CreativeEditorModal from './CreativeEditorModal';
import type { LayoutTemplate } from '../lib/templates';
import { ProspectData } from '../../prospect/types';

interface CreativeGeneratorViewProps {
  prospect: ProspectData;
}

const STEP_LABELS: Record<string, string> = {
  intent:   '1. Intenção',
  analysis: '2. Raio-X',
  angles:   '3. Ângulos',
  skeleton: '4. Esqueleto',
  refine:   '5. Copy',
  blocks:   '6. Design',
};

const ALL_STEPS = ['intent', 'analysis', 'angles', 'skeleton', 'refine', 'blocks'] as const;

export const CreativeGeneratorView: React.FC<CreativeGeneratorViewProps> = ({ prospect }) => {
  const wizard = useCreativeWizard(prospect);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<LayoutTemplate | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const currentStepIndex = ALL_STEPS.indexOf(wizard.wizardStep as any);

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => wizard.setInspirationImage(event.target?.result as string);
          reader.readAsDataURL(file);
        }
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
      {/* Header com Indicador de Passos sem barra de rolagem e sem badge */}
      <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            {prospect.name || prospect.companyName}
          </h2>
          <p className="text-xs text-zinc-400 font-medium mt-1">
            Etapa {currentStepIndex + 1} de {ALL_STEPS.length}: <span className="text-white font-bold">{STEP_LABELS[wizard.wizardStep]}</span>
          </p>
        </div>

        {/* Step Navigation Pill Selector sem rolagem */}
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-850">
          {ALL_STEPS.map((s, i) => {
            const isCurrent = wizard.wizardStep === s;
            const isPast = currentStepIndex > i;
            return (
              <button
                key={s}
                onClick={() => wizard.goToStep(s as any)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-yellow-400 text-black shadow-md font-black'
                    : isPast
                    ? 'bg-zinc-850 text-zinc-200 border border-zinc-750'
                    : 'bg-zinc-950 text-zinc-500 border border-zinc-900 hover:text-zinc-300'
                }`}
              >
                {STEP_LABELS[s]}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: INTENT & SETUP */}
      {wizard.wizardStep === 'intent' && (
        <div className="space-y-8">
          {/* Seletor de Intenção */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => wizard.setIntent('transform')}
              className={`p-6 rounded-2xl border text-left space-y-2.5 transition-all cursor-pointer ${
                wizard.intent === 'transform'
                  ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg'
                  : 'border-zinc-850 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <h3 className="text-base font-bold text-white uppercase tracking-tight">Transformar Conteúdo Existente</h3>
              <p className="text-xs leading-relaxed text-zinc-400">Cole transcrições, textos longos ou links do cliente para a IA transformar em carrossel.</p>
            </button>

            <button
              onClick={() => wizard.setIntent('create')}
              className={`p-6 rounded-2xl border text-left space-y-2.5 transition-all cursor-pointer ${
                wizard.intent === 'create'
                  ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg'
                  : 'border-zinc-850 bg-zinc-950 text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <h3 className="text-base font-bold text-white uppercase tracking-tight">Criar Anúncio do Zero</h3>
              <p className="text-xs leading-relaxed text-zinc-400">Gere uma narrativa completa a partir de uma ideia rápida ou objetivo de campanha.</p>
            </button>
          </div>

          {/* Form Insumos */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Insumo / Prompt de Entrada
                </label>
                <textarea
                  onPaste={handlePaste}
                  rows={6}
                  value={wizard.prompt}
                  onChange={(e) => wizard.setPrompt(e.target.value)}
                  placeholder="O que você quer comunicar para a audiência deste cliente?"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-white placeholder-zinc-600 outline-none focus:border-yellow-400"
                />
              </div>

              {/* Upload de Referência Visual */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  Referência Visual (Upload ou Cole Ctrl+V)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-[148px] border-2 border-dashed border-zinc-800 hover:border-yellow-400/50 rounded-xl bg-zinc-900 flex flex-col items-center justify-center gap-2 cursor-pointer relative overflow-hidden group transition-all"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => wizard.setInspirationImage(event.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {wizard.inspirationImage ? (
                    <>
                      <img src={wizard.inspirationImage} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Ref" />
                      <button
                        onClick={(e) => { e.stopPropagation(); wizard.setInspirationImage(null); }}
                        className="absolute top-2 right-2 px-2 py-1 bg-red-600 rounded text-white text-[10px] font-bold uppercase z-10 cursor-pointer"
                      >
                        Remover
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-white font-bold uppercase tracking-wider">Clique ou Pressione Ctrl+V</span>
                      <span className="text-[10px] text-zinc-500">Arraste screenshots ou criativos de referência</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Configurações de Tom e Estilo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-850">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2.5">Tom de Voz</label>
                <div className="grid grid-cols-2 gap-2">
                  {TONE_OPTIONS.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => wizard.setToneOfVoice(t.value)}
                      className={`py-3 px-4 rounded-xl border text-center text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        wizard.toneOfVoice === t.value
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-extrabold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2.5">Estilo da Copy</label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLE_OPTIONS.map((st) => (
                    <button
                      key={st.value}
                      onClick={() => wizard.setCopyStyle(st.value)}
                      className={`py-3 px-4 rounded-xl border text-center text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        wizard.copyStyle === st.value
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-extrabold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ação */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={wizard.handleExtractAnalysis}
                disabled={wizard.isGenerating}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {wizard.isGenerating ? 'Analisando com IA...' : 'Iniciar Raio-X Estratégico →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ANALYSIS */}
      {wizard.wizardStep === 'analysis' && wizard.analysis && (
        <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div>
            <h3 className="text-lg font-black uppercase text-white tracking-tight">Etapa 2: Raio-X Estratégico do Insumo</h3>
            <p className="text-xs text-zinc-400 mt-1">Diagnóstico profundo extraído pelo modelo Gemini 2.5 Flash.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider block mb-1">Tema Central</span>
              <p className="text-sm font-bold text-white leading-relaxed">{wizard.analysis.temaCentral}</p>
            </div>

            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider block mb-1">Transformação (Ponto A → B)</span>
              <p className="text-sm font-bold text-white leading-relaxed">{wizard.analysis.transformacao}</p>
            </div>

            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">Fricção Central (Dor)</span>
              <p className="text-sm font-bold text-white leading-relaxed">{wizard.analysis.friccaoCentral}</p>
            </div>

            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">Ângulo Dominante</span>
              <p className="text-sm font-bold text-white leading-relaxed">{wizard.analysis.anguloDominante}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => wizard.goToStep('intent')} className="px-5 py-3 bg-zinc-900 text-zinc-400 rounded-xl text-xs font-bold uppercase hover:text-white cursor-pointer border border-zinc-800">
              ← Ajustar Prompt
            </button>
            <button
              onClick={wizard.handleGenerateAngles}
              disabled={wizard.isGenerating}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3.5 px-7 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Explorar Ângulos Estratégicos →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ANGLES */}
      {wizard.wizardStep === 'angles' && (
        <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div>
            <h3 className="text-lg font-black uppercase text-white tracking-tight">Etapa 3: Selecionar Ângulo de Copy</h3>
            <p className="text-xs text-zinc-400 mt-1">Escolha a abordagem narrativa para estruturar os anúncios.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {wizard.generatedAngles.map((angle, idx) => (
              <div
                key={idx}
                onClick={() => wizard.handleGenerateSkeleton(angle)}
                className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-yellow-400/50 p-6 rounded-2xl cursor-pointer transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-400/20 inline-block">
                    Abordagem 0{idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors mt-2.5">
                    {angle.headline}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{angle.reasoning}</p>
                </div>
                <button className="bg-yellow-400 text-black font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shrink-0 group-hover:scale-105 transition-transform cursor-pointer">
                  Usar Este Ângulo →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: SKELETON */}
      {wizard.wizardStep === 'skeleton' && wizard.skeleton && (
        <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div>
            <h3 className="text-lg font-black uppercase text-white tracking-tight">Etapa 4: Esqueleto Narrativo</h3>
            <p className="text-xs text-zinc-400 mt-1">Estratégia narrativa estruturada pela IA.</p>
          </div>

          <div className="space-y-4 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div>
              <span className="text-[9px] font-mono text-yellow-400 uppercase tracking-wider block mb-1">Hook (Gancho)</span>
              <p className="text-sm font-bold text-white leading-relaxed">{wizard.skeleton.hook}</p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Mecanismo Único</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{wizard.skeleton.mecanismo}</p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Aplicação Prática</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{wizard.skeleton.aplicacao}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => wizard.goToStep('angles')} className="px-5 py-3 bg-zinc-900 text-zinc-400 rounded-xl text-xs font-bold uppercase hover:text-white cursor-pointer border border-zinc-800">
              ← Trocar Ângulo
            </button>
            <button
              onClick={wizard.handleGenerateBlocks}
              disabled={wizard.isGenerating}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3.5 px-7 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Gerar Mídias e Cards Visuais →
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 & 6: DESIGN & RENDER */}
      {wizard.wizardStep === 'blocks' && wizard.generatedBlocks.length > 0 && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950 border border-zinc-850 rounded-2xl p-6 shadow-xl">
            <div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">Design & Renderização dos Anúncios</h3>
              <p className="text-xs text-zinc-400 mt-1">{wizard.generatedBlocks.length} slides/cards gerados para o cliente.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditorOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Abrir Editor Fino (X/Y e Fontes)
              </button>
            </div>
          </div>

          {/* Template Gallery */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-6 shadow-xl">
            <TemplateGallery selected={selectedTemplate} onSelect={setSelectedTemplate} />
          </div>

          {/* Grid de Cards Visuais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wizard.pages.map((p, idx) => (
              <div key={p.id} className="h-[440px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative group">
                <CreativePostRenderer page={p} isPreview aspectRatio="4/5" slideIndex={idx} totalSlides={wizard.pages.length} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Edição Fina (CreativeEditorModal) */}
      {isEditorOpen && (
        <CreativeEditorModal
          pages={wizard.pages}
          type="carousel"
          onClose={() => setIsEditorOpen(false)}
          onSave={(updatedPages) => {
            wizard.setPages(updatedPages);
            setIsEditorOpen(false);
          }}
        />
      )}
    </div>
  );
};
