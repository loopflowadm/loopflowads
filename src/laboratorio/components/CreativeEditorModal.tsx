import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight, Layers, LayoutTemplate, Square, Smartphone, RectangleVertical, RefreshCw } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import CreativePostRenderer from './CreativePostRenderer';
import type { CreativePage, LayoutType, AspectRatio } from '../types';

interface CreativeEditorModalProps {
  pages: CreativePage[];
  type?: 'single' | 'carousel' | 'video';
  initialAspectRatio?: AspectRatio;
  onClose: () => void;
  onSave?: (pages: CreativePage[], newSize: AspectRatio) => void;
}

const LAYOUT_OPTIONS: { value: LayoutType; label: string }[] = [
  { value: 'editorial',     label: 'Editorial' },
  { value: 'floating-card', label: 'Cartão Flutuante' },
  { value: 'split',         label: 'Meio a Meio (Split)' },
  { value: 'quote',         label: 'Citação / Aspas' },
  { value: 'data-story',    label: 'Story de Dados' },
  { value: 'minimal',       label: 'Minimalista' },
];

const ASPECT_OPTS: { value: AspectRatio; label: string; sub: string; icon: React.ReactNode }[] = [
  { value: '1/1',  label: 'Feed',    sub: '1:1',  icon: <Square className="w-4 h-4" /> },
  { value: '4/5',  label: 'Retrato', sub: '4:5',  icon: <RectangleVertical className="w-4 h-4" /> },
  { value: '9/16', label: 'Story',   sub: '9:16', icon: <Smartphone className="w-4 h-4" /> },
];

export default function CreativeEditorModal({ pages: initialPages, type = 'carousel', initialAspectRatio = '4/5', onClose, onSave }: CreativeEditorModalProps) {
  const [pages, setPages] = useState<CreativePage[]>(initialPages);
  const [logoBase64, setLogoBase64] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeField, setActiveField] = useState<'title' | 'content' | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(initialAspectRatio);
  const [isRefreshingImage, setIsRefreshingImage] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const currentPage = pages[currentSlide] || pages[0];

  const updateCurrentPage = useCallback((field: keyof CreativePage, value: unknown) => {
    setPages(prev => {
      const next = [...prev];
      if (next[currentSlide]) {
        next[currentSlide] = { ...next[currentSlide], [field]: value };
      }
      return next;
    });
  }, [currentSlide]);

  const handleRefreshImage = async () => {
    if (!currentPage?.imagePrompt) return;
    setIsRefreshingImage(true);
    const seed = Math.floor(Math.random() * 9999);
    const newUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      currentPage.imagePrompt + ', cinematic photography, no text, no watermark'
    )}?width=1080&height=1920&nologo=true&seed=${seed}`;
    updateCurrentPage('fgImage', newUrl);
    setTimeout(() => setIsRefreshingImage(false), 2000);
  };

  const downloadDataUrl = (dataUrl: string, index: number) => {
    const a = document.createElement('a');
    a.download = type === 'carousel'
      ? `slide-${index + 1}-${Date.now()}.png`
      : `criativo-${Date.now()}.png`;
    a.href = dataUrl;
    a.click();
  };

  const exportSlide = async (): Promise<string | null> => {
    if (!editorRef.current) return null;
    return htmlToImage.toPng(editorRef.current, { cacheBust: true, pixelRatio: 3 });
  };

  const handleExportCurrent = async () => {
    setIsExporting(true);
    try {
      const url = await exportSlide();
      if (url) downloadDataUrl(url, currentSlide);
    } catch { alert('Erro ao exportar. Tente novamente.'); }
    finally { setIsExporting(false); }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    const original = currentSlide;
    try {
      for (let i = 0; i < pages.length; i++) {
        setCurrentSlide(i);
        await new Promise(r => setTimeout(r, 900));
        const url = await exportSlide();
        if (url) downloadDataUrl(url, i);
        await new Promise(r => setTimeout(r, 300));
      }
    } catch { alert('Erro ao exportar carrossel.'); }
    finally { setCurrentSlide(original); setIsExporting(false); }
  };

  const handleSaveAndClose = () => {
    onSave?.(pages, aspectRatio);
    onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentSlide(c => Math.min(pages.length - 1, c + 1));
      if (e.key === 'ArrowLeft')  setCurrentSlide(c => Math.max(0, c - 1));
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pages.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[1300px] h-[95vh] flex flex-col md:flex-row bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10">

        {/* ─── Sidebar Controls ────────────────────────────────────────────── */}
        <div className="w-full md:w-80 border-r border-white/5 bg-zinc-900/60 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              {type === 'carousel' ? <LayoutTemplate className="w-4 h-4 text-yellow-400" /> : <Layers className="w-4 h-4 text-yellow-400" />}
              <span className="font-bold text-sm text-white">Editor Avançado</span>
            </div>
            {pages.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button onClick={() => setCurrentSlide(c => Math.max(0, c - 1))} disabled={currentSlide === 0} className="p-1 hover:bg-white/10 rounded-lg disabled:opacity-20 transition text-zinc-300">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-zinc-400 font-mono w-12 text-center">{currentSlide + 1}/{pages.length}</span>
                <button onClick={() => setCurrentSlide(c => Math.min(pages.length - 1, c + 1))} disabled={currentSlide === pages.length - 1} className="p-1 hover:bg-white/10 rounded-lg disabled:opacity-20 transition text-zinc-300">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Scrollable form controls */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

            {/* Layout */}
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">Layout do Slide</label>
              <select
                value={currentPage?.layoutType || 'editorial'}
                onChange={e => updateCurrentPage('layoutType', e.target.value as LayoutType)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-yellow-400 cursor-pointer"
              >
                {LAYOUT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Headline */}
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">Título / Headline</label>
              <textarea
                value={currentPage?.title || ''}
                onFocus={() => setActiveField('title')}
                onBlur={() => setActiveField(null)}
                onChange={e => updateCurrentPage('title', e.target.value)}
                rows={2}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-400 resize-none leading-snug"
              />
            </div>

            {/* Kicker + Tag */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">Kicker</label>
                <input type="text" value={currentPage?.kicker || ''} onChange={e => updateCurrentPage('kicker', e.target.value)} placeholder="Ex: Estratégia" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-400 placeholder:text-zinc-700" />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">CTA / Tag</label>
                <input type="text" value={currentPage?.tag || ''} onChange={e => updateCurrentPage('tag', e.target.value)} placeholder="Saiba mais" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-400 placeholder:text-zinc-700" />
              </div>
            </div>

            {/* Texto de apoio */}
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">Texto de Apoio</label>
              <textarea
                value={currentPage?.content || ''}
                onFocus={() => setActiveField('content')}
                onBlur={() => setActiveField(null)}
                onChange={e => updateCurrentPage('content', e.target.value)}
                rows={3}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-400 resize-none leading-snug"
              />
            </div>

            {/* Handle + Atribuição */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">Handle</label>
                <input type="text" value={currentPage?.handle || ''} onChange={e => updateCurrentPage('handle', e.target.value)} placeholder="@suamarca" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-400 placeholder:text-zinc-700" />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5 block">Autor</label>
                <input type="text" value={currentPage?.attribution || ''} onChange={e => updateCurrentPage('attribution', e.target.value)} placeholder="Nome · Cargo" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-400 placeholder:text-zinc-700" />
              </div>
            </div>

            {/* Cores */}
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2 block">Cores</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'bgColorHex', label: 'Fundo', default: '#09090b' },
                  { key: 'textColorHex', label: 'Texto', default: '#ffffff' },
                  { key: 'accentColorHex', label: 'Destaque', default: '#facc15' },
                ].map(c => (
                  <div key={c.key}>
                    <label className="text-[9px] text-zinc-600 uppercase block mb-1">{c.label}</label>
                    <input type="color" value={(currentPage as any)?.[c.key] || c.default} onChange={e => updateCurrentPage(c.key as keyof CreativePage, e.target.value)} className="w-full h-8 rounded-lg cursor-pointer border border-white/10 bg-zinc-950" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tipografia */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <label className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold block">Tipografia e Tamanhos</label>
              
              <div>
                <label className="text-[9px] text-zinc-500 uppercase block mb-1.5">Fonte do Título</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['sans', 'serif', 'mono'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => updateCurrentPage('titleFontFamily', f)}
                      className={`py-1.5 rounded-lg border text-[10px] capitalize transition ${currentPage?.titleFontFamily === f ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-bold' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] text-zinc-500 uppercase">Tam. Título</label>
                    <span className="text-[9px] text-zinc-400">{currentPage?.titleFontSize || 'Auto'}</span>
                  </div>
                  <input
                    type="range" min="4" max="25" step="0.5"
                    value={currentPage?.titleFontSize || 12}
                    onFocus={() => setActiveField('title')}
                    onBlur={() => setActiveField(null)}
                    onChange={e => updateCurrentPage('titleFontSize', parseFloat(e.target.value))}
                    className="w-full accent-yellow-400 outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] text-zinc-500 uppercase">Tam. Corpo</label>
                    <span className="text-[9px] text-zinc-400">{currentPage?.contentFontSize || 'Auto'}</span>
                  </div>
                  <input
                    type="range" min="2" max="10" step="0.2"
                    value={currentPage?.contentFontSize || 4}
                    onFocus={() => setActiveField('content')}
                    onBlur={() => setActiveField(null)}
                    onChange={e => updateCurrentPage('contentFontSize', parseFloat(e.target.value))}
                    className="w-full accent-yellow-400 outline-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Posicionamento */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <label className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold block">Ajustes de Posição (X / Y)</label>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase block mb-1">Offset Título</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number" placeholder="X"
                      value={currentPage?.titleOffsetX || 0}
                      onFocus={() => setActiveField('title')}
                      onBlur={() => setActiveField(null)}
                      onChange={e => updateCurrentPage('titleOffsetX', parseFloat(e.target.value))}
                      className="bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-yellow-400 outline-none"
                    />
                    <input
                      type="number" placeholder="Y"
                      value={currentPage?.titleOffsetY || 0}
                      onFocus={() => setActiveField('title')}
                      onBlur={() => setActiveField(null)}
                      onChange={e => updateCurrentPage('titleOffsetY', parseFloat(e.target.value))}
                      className="bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-yellow-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-zinc-500 uppercase block mb-1">Offset Corpo de Texto</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number" placeholder="X"
                      value={currentPage?.contentOffsetX || 0}
                      onFocus={() => setActiveField('content')}
                      onBlur={() => setActiveField(null)}
                      onChange={e => updateCurrentPage('contentOffsetX', parseFloat(e.target.value))}
                      className="bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-yellow-400 outline-none"
                    />
                    <input
                      type="number" placeholder="Y"
                      value={currentPage?.contentOffsetY || 0}
                      onFocus={() => setActiveField('content')}
                      onBlur={() => setActiveField(null)}
                      onChange={e => updateCurrentPage('contentOffsetY', parseFloat(e.target.value))}
                      className="bg-zinc-950 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-yellow-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    updateCurrentPage('titleOffsetX', 0);
                    updateCurrentPage('titleOffsetY', 0);
                    updateCurrentPage('contentOffsetX', 0);
                    updateCurrentPage('contentOffsetY', 0);
                    updateCurrentPage('titleFontSize', undefined);
                    updateCurrentPage('contentFontSize', undefined);
                  }}
                  className="w-full py-1.5 text-[9px] text-zinc-500 hover:text-white transition uppercase tracking-tighter cursor-pointer"
                >
                  Resetar Posições
                </button>
              </div>
            </div>

            {/* Imagem de Fundo (IA + Upload) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Imagem de Fundo</label>
                {currentPage?.imagePrompt && (
                  <button onClick={handleRefreshImage} disabled={isRefreshingImage} className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-yellow-400 transition-colors">
                    <RefreshCw className={`w-3 h-3 ${isRefreshingImage ? 'animate-spin' : ''}`} />
                    Nova IA
                  </button>
                )}
              </div>

              {currentPage?.imagePrompt && (
                <div className="mb-2">
                  <textarea
                    value={currentPage.imagePrompt}
                    onChange={e => {
                      updateCurrentPage('imagePrompt', e.target.value);
                      if (e.target.value.trim()) {
                        updateCurrentPage('fgImage', `https://image.pollinations.ai/prompt/${encodeURIComponent(
                          e.target.value + ', cinematic photography, no text, no watermark'
                        )}?width=1080&height=1920&nologo=true&seed=${Math.floor(Math.random()*9999)}`);
                      }
                    }}
                    placeholder="Prompt da imagem em inglês..."
                    rows={2}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400 outline-none focus:border-yellow-400 resize-none"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <label className="flex-1 bg-zinc-950 hover:bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-center text-zinc-400 cursor-pointer transition truncate">
                  {currentPage?.fgImage ? 'Trocar imagem...' : 'Upload de imagem...'}
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = ev => updateCurrentPage('fgImage', ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }} />
                </label>
                {currentPage?.fgImage && (
                  <button onClick={() => updateCurrentPage('fgImage', '')} className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/10 transition cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Proporção */}
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2 block">Proporção</label>
              <div className="grid grid-cols-3 gap-2">
                {ASPECT_OPTS.map(o => (
                  <button key={o.value} onClick={() => setAspectRatio(o.value)} className={`flex flex-col items-center py-2 rounded-xl border text-xs transition-all cursor-pointer ${aspectRatio === o.value ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-bold' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'}`}>
                    {o.icon}
                    <span className="mt-1 font-medium">{o.label}</span>
                    <span className="text-[9px] opacity-60">{o.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé Ações */}
          <div className="px-5 py-4 border-t border-white/5 space-y-2 shrink-0">
            {type === 'carousel' ? (
              <>
                <button onClick={handleExportAll} disabled={isExporting} className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer">
                  <Download className="w-4 h-4" />
                  {isExporting ? 'Exportando...' : 'Baixar Todos os Slides'}
                </button>
                <button onClick={handleExportCurrent} disabled={isExporting} className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer">
                  Baixar Slide Atual
                </button>
              </>
            ) : (
              <button onClick={handleExportCurrent} disabled={isExporting} className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer">
                <Download className="w-4 h-4" />
                {isExporting ? 'Exportando...' : 'Baixar Arte (HD)'}
              </button>
            )}
            <button onClick={handleSaveAndClose} disabled={isExporting} className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer">
              Salvar e Fechar
            </button>
          </div>
        </div>

        {/* ─── Main Canvas Preview ─────────────────────────────────────────── */}
        <div className="flex-1 bg-zinc-950 flex items-center justify-center relative overflow-hidden p-6">
          <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition border border-white/10 cursor-pointer">
            <X className="w-4 h-4" />
          </button>

          {/* Slide thumbs strip */}
          {pages.length > 1 && (
            <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center gap-2 py-6 overflow-y-auto">
              {pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-10 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${i === currentSlide ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)] scale-105' : 'border-transparent opacity-40 hover:opacity-70'}`}
                  style={{ aspectRatio: aspectRatio.replace('/', '/') }}
                >
                  <div className="w-full h-full scale-[0.5] origin-top-left" style={{ width: '200%', height: '200%' }}>
                    <CreativePostRenderer page={p} isThumbnail aspectRatio={aspectRatio} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Main Canvas View */}
          <div
            ref={editorRef}
            className={`relative overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 ${
              aspectRatio === '1/1'  ? 'w-[520px] aspect-square' :
              aspectRatio === '4/5' ? 'w-[440px] aspect-[4/5]'  :
              'w-[320px] aspect-[9/16]'
            }`}
          >
            <AnimatePresence mode="wait">
              <m.div
                key={currentSlide}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <div id="creative-export-canvas" className="relative group">
                  <CreativePostRenderer
                    page={currentPage}
                    isPreview
                    slideIndex={currentSlide}
                    totalSlides={pages.length}
                    aspectRatio={aspectRatio}
                    activeElement={activeField}
                  />
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
