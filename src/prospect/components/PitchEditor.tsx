import React, { useState, useEffect } from 'react';
import { Slide, ProspectData, Path } from '../types';
import { ArrowUp, ArrowDown, Eye, EyeOff, Edit3, Trash2, ArrowLeft, Play, RotateCcw, Check, Plus, AlertCircle } from 'lucide-react';
import Logo from './Logo';

interface PitchEditorProps {
  prospect: ProspectData;
  path: Path;
  defaultSlides: Slide[];
  onBack: () => void;
  onStartPresentation: (slides: Slide[]) => void;
}

// Extende Slide com campo opcional de inativo para controle interno
interface EditableSlide extends Slide {
  inactive?: boolean;
}

const PitchEditor: React.FC<PitchEditorProps> = ({
  prospect,
  path,
  defaultSlides,
  onBack,
  onStartPresentation
}) => {
  const [slides, setSlides] = useState<EditableSlide[]>([]);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);

  // Estados locais para edição rápida de um slide
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editHighlight, setEditHighlight] = useState('');
  const [editPausePrompt, setEditPausePrompt] = useState('');
  const [editMetrics, setEditMetrics] = useState<{ label: string; value: string; desc: string }[]>([]);

  const storageKey = `loopflow_pitch_${prospect.name.replace(/\s+/g, '_')}_${path.id}`;

  // Inicializa slides: tenta carregar do localStorage ou usa os padrões
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setSlides(JSON.parse(saved));
      } catch (e) {
        setSlides([...defaultSlides]);
      }
    } else {
      setSlides([...defaultSlides]);
    }
  }, [storageKey, defaultSlides]);

  const saveToStorage = (updatedSlides: EditableSlide[]) => {
    setSlides(updatedSlides);
    localStorage.setItem(storageKey, JSON.stringify(updatedSlides));
  };

  // Reordenação de slides
  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;

    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    saveToStorage(updated);
  };

  // Habilitar/Desabilitar slide
  const toggleSlideVisibility = (index: number) => {
    const updated = [...slides];
    updated[index] = {
      ...updated[index],
      inactive: !updated[index].inactive
    };
    saveToStorage(updated);
  };

  // Iniciar formulário de edição para um slide específico
  const startEditing = (slide: EditableSlide) => {
    setEditingSlideId(slide.id);
    setEditTitle(slide.title);
    setEditSubtitle(slide.subtitle || '');
    setEditContent(slide.content.join('\n'));
    setEditHighlight(slide.highlight || '');
    setEditPausePrompt(slide.pausePrompt || '');
    setEditMetrics(slide.metrics ? [...slide.metrics] : []);
  };

  // Salvar edições do slide no estado
  const saveSlideChanges = (id: string) => {
    const updated = slides.map(s => {
      if (s.id === id) {
        const contentArr = editContent.split('\n').map(l => l.trim()).filter(Boolean);
        return {
          ...s,
          title: editTitle,
          subtitle: editSubtitle || undefined,
          content: contentArr,
          highlight: editHighlight || undefined,
          pausePrompt: editPausePrompt || undefined,
          metrics: s.type === 'metrics' ? editMetrics : undefined
        };
      }
      return s;
    });

    saveToStorage(updated);
    setEditingSlideId(null);
  };

  // Restaurar fluxo padrão do segmento
  const resetToDefault = () => {
    if (window.confirm("Deseja realmente redefinir todos os slides e descartar suas customizações para esta apresentação?")) {
      localStorage.removeItem(storageKey);
      setSlides([...defaultSlides]);
      setEditingSlideId(null);
    }
  };

  // Envia apenas slides ativos para a apresentação
  const handleStart = () => {
    const activeSlides = slides.filter(s => !s.inactive);
    if (activeSlides.length === 0) {
      alert("Por favor, ative pelo menos um slide para a apresentação.");
      return;
    }
    onStartPresentation(activeSlides);
  };

  // Gerenciamento de métricas dinâmicas na edição
  const handleMetricChange = (idx: number, field: 'label' | 'value' | 'desc', val: string) => {
    const updated = [...editMetrics];
    updated[idx] = { ...updated[idx], [field]: val };
    setEditMetrics(updated);
  };

  const addMetricField = () => {
    setEditMetrics([...editMetrics, { label: 'Rótulo', value: 'Valor', desc: 'Descrição' }]);
  };

  const removeMetricField = (idx: number) => {
    setEditMetrics(editMetrics.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 selection:bg-yellow-400 selection:text-black">
      {/* Header Unificado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-zinc-900">
        <div>
          <div className="flex items-center gap-3 text-zinc-500 mb-2 uppercase text-[9px] tracking-[0.3em] font-black">
            <button onClick={onBack} className="hover:text-white flex items-center gap-1 transition-colors uppercase">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar
            </button>
            <span>/</span>
            <span className="text-yellow-400">{prospect.name}</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">
            Personalizar Apresentação
          </h1>
          <p className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest mt-2">
            Ajuste a ordem, oculte ou edite o faturamento e argumentações antes da reunião.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white font-black py-2.5 px-5 rounded-xl uppercase tracking-widest text-[9.5px] transition-all active:scale-95 cursor-pointer"
            title="Restaurar slides originais do nicho"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Padrão
          </button>
          <button
            onClick={handleStart}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-6 rounded-xl uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-yellow-400/5 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            Iniciar Apresentação
          </button>
        </div>
      </div>

      {/* Lista de Slides */}
      <div className="space-y-6">
        {slides.map((s, idx) => {
          const isEditing = editingSlideId === s.id;
          const isInactive = s.inactive;

          return (
            <div
              key={s.id}
              className={`bg-zinc-900/25 border rounded-[28px] overflow-hidden transition-all ${
                isEditing
                  ? 'border-yellow-400/40 bg-zinc-900/40 shadow-xl shadow-yellow-400/[0.02]'
                  : isInactive
                  ? 'border-zinc-950 opacity-45 bg-zinc-950/20'
                  : 'border-zinc-900/80 hover:border-zinc-800'
              }`}
            >
              {/* Top/Preview Bar do Slide */}
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Posição e Tipo */}
                  <div className="flex flex-col items-center justify-center bg-zinc-950 border border-zinc-900 text-zinc-400 rounded-2xl w-14 h-14 shrink-0 font-black italic">
                    <span className="text-[8px] uppercase tracking-wider text-zinc-650 leading-none mb-1">Slide</span>
                    <span className="text-lg text-zinc-300 leading-none">0{idx + 1}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="bg-zinc-900 text-zinc-400 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-800">
                        {s.type}
                      </span>
                      {isInactive && (
                        <span className="bg-rose-950/30 text-rose-400 border border-rose-900/30 text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1">
                          <EyeOff className="w-2.5 h-2.5" /> Ocultado
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-black text-white truncate uppercase tracking-tight italic leading-tight">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Controles do Slide */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Subir/Descer */}
                  <div className="flex flex-col md:flex-row gap-1">
                    <button
                      onClick={() => moveSlide(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-white rounded-lg disabled:opacity-10 disabled:pointer-events-none transition-all cursor-pointer"
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveSlide(idx, 'down')}
                      disabled={idx === slides.length - 1}
                      className="p-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-white rounded-lg disabled:opacity-10 disabled:pointer-events-none transition-all cursor-pointer"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Toggle Habilitar/Ocultar */}
                  <button
                    onClick={() => toggleSlideVisibility(idx)}
                    className={`p-2 border rounded-lg transition-all cursor-pointer ${
                      isInactive
                        ? 'bg-rose-950/20 border-rose-900/30 text-rose-400 hover:bg-rose-950/40'
                        : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                    title={isInactive ? "Mostrar Slide" : "Ocultar Slide"}
                  >
                    {isInactive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>

                  {/* Botão de Editar */}
                  <button
                    onClick={() => {
                      if (isEditing) setEditingSlideId(null);
                      else startEditing(s);
                    }}
                    className={`px-3 py-2 border rounded-lg font-black uppercase text-[9px] tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                      isEditing
                        ? 'bg-yellow-400 border-yellow-500 text-black'
                        : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? "Fechar" : "Editar"}</span>
                  </button>
                </div>
              </div>

              {/* Formulário de Edição Inline */}
              {isEditing && (
                <div className="border-t border-zinc-900 bg-zinc-950/50 p-6 space-y-5 animate-fade-in text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Título */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-550 uppercase tracking-widest ml-1">Título do Slide</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-yellow-400 outline-none transition-all"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                      />
                    </div>

                    {/* Subtítulo */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-550 uppercase tracking-widest ml-1">Subtítulo (Opcional)</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-yellow-400 outline-none transition-all"
                        value={editSubtitle}
                        onChange={e => setEditSubtitle(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Edição de Conteúdo / Tópicos (Apenas se não for do tipo metrics) */}
                  {s.type !== 'metrics' && (
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-550 uppercase tracking-widest ml-1 flex justify-between">
                        <span>Tópicos de Conteúdo</span>
                        <span className="text-[8px] text-zinc-650">Um tópico por linha. Use vírgula para separar título e descrição se for comparação.</span>
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-yellow-400 outline-none transition-all"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Edição de Métricas (Apenas se for metrics) */}
                  {s.type === 'metrics' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center ml-1">
                        <label className="text-[9px] font-black text-zinc-550 uppercase tracking-widest">Lista de KPIs</label>
                        <button
                          onClick={addMetricField}
                          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-yellow-400 px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Adicionar KPI
                        </button>
                      </div>

                      {editMetrics.length === 0 ? (
                        <div className="p-4 border border-dashed border-zinc-900 rounded-xl text-center text-[10px] uppercase font-bold text-zinc-600">
                          Nenhum KPI configurado neste slide.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {editMetrics.map((m, mIdx) => (
                            <div key={mIdx} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-3 relative">
                              <button
                                onClick={() => removeMetricField(mIdx)}
                                className="absolute top-2 right-2 text-zinc-600 hover:text-rose-500 transition-colors p-1"
                                title="Remover métrica"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[7px] font-black text-zinc-600 uppercase">Rótulo</label>
                                  <input
                                    type="text"
                                    className="w-full bg-zinc-900/50 border border-zinc-850 rounded px-2.5 py-1.5 text-[10px] font-bold text-white outline-none focus:border-yellow-400"
                                    value={m.label}
                                    onChange={e => handleMetricChange(mIdx, 'label', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="text-[7px] font-black text-zinc-600 uppercase">Valor</label>
                                  <input
                                    type="text"
                                    className="w-full bg-zinc-900/50 border border-zinc-850 rounded px-2.5 py-1.5 text-[10px] font-bold text-white outline-none focus:border-yellow-400"
                                    value={m.value}
                                    onChange={e => handleMetricChange(mIdx, 'value', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[7px] font-black text-zinc-600 uppercase">Descrição</label>
                                <input
                                  type="text"
                                  className="w-full bg-zinc-900/50 border border-zinc-850 rounded px-2.5 py-1.5 text-[10px] font-bold text-white outline-none focus:border-yellow-400"
                                  value={m.desc}
                                  onChange={e => handleMetricChange(mIdx, 'desc', e.target.value)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Highlight */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-550 uppercase tracking-widest ml-1">Mensagem de Destaque (Foco)</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-yellow-400 outline-none transition-all"
                        value={editHighlight}
                        onChange={e => setEditHighlight(e.target.value)}
                        placeholder="Ex: Domine a aquisição direta de clientes..."
                      />
                    </div>

                    {/* Pergunta de Pausa */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-550 uppercase tracking-widest ml-1">Pergunta de Pausa / Engajamento</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-yellow-400 outline-none transition-all"
                        value={editPausePrompt}
                        onChange={e => setEditPausePrompt(e.target.value)}
                        placeholder="Ex: Vocês já sentiram esse impacto na operação?"
                      />
                    </div>
                  </div>

                  {/* Ações do Formulário */}
                  <div className="flex items-center gap-3 pt-2 border-t border-zinc-900">
                    <button
                      onClick={() => saveSlideChanges(s.id)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-6 rounded-xl uppercase tracking-widest text-[9px] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Salvar Alterações
                    </button>
                    <button
                      onClick={() => setEditingSlideId(null)}
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-400 hover:text-white font-black py-2.5 px-5 rounded-xl uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Banner Informativo */}
      <div className="mt-10 bg-zinc-900/10 border border-zinc-900 rounded-[24px] p-6 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">Como funciona a personalização?</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase tracking-tight">
            As alterações realizadas acima são salvas apenas para este prospect e caminho específico no seu navegador. Os slides modificados serão usados na apresentação em tela e as alterações persistem até você clicar em "Restaurar Padrão".
          </p>
        </div>
      </div>
    </div>
  );
};

export default PitchEditor;
