import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState, ProspectData, Path, Slide } from './types';
import Presentation from './components/Presentation';
import ProspectSetup from './components/ProspectSetup';
import PathSelector from './components/PathSelector';
import BudgetCalculator from './components/BudgetCalculator';
import PerformanceDashboard from './components/PerformanceDashboard';
import PitchEditor from './components/PitchEditor';
import Logo from './components/Logo';
import { supabase } from '../lib/supabase';
import { Trash2, Play, Calendar, Plus, TrendingUp, GripVertical, Settings, Calculator, Menu, X, CheckCircle2, Sun, Moon, LayoutGrid, LogOut, ChevronDown, Briefcase } from 'lucide-react';

// Toast notification system
type Toast = { id: string; message: string; type: 'success' | 'error' };
const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);
  return { toasts, show };
};
import { getPitchFlowBySegment } from './data';

interface ProspectWithId extends ProspectData {
  id: string;
  date?: string;
}

const ProspectDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('loopflow_gestor_auth') === 'true';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('loopflow_theme') as 'light' | 'dark') || 'dark';
  });
  const [view, setView] = useState<AppState>('list');
  const [prospects, setProspects] = useState<ProspectWithId[]>([]);
  const [activeProspect, setActiveProspect] = useState<ProspectData | null>(null);
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [customSlides, setCustomSlides] = useState<Slide[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leadsOpen, setLeadsOpen] = useState(false);
  const { toasts, show: showToast } = useToast();

  const [editingIntegrationsProspect, setEditingIntegrationsProspect] = useState<ProspectWithId | null>(null);
  const [editGoogleSheetsUrl, setEditGoogleSheetsUrl] = useState('');
  const [editMetaAdAccountId, setEditMetaAdAccountId] = useState('');
  const [editMetaAccessToken, setEditMetaAccessToken] = useState('');

  useEffect(() => {
    if (editingIntegrationsProspect) {
      setEditGoogleSheetsUrl(editingIntegrationsProspect.googleSheetsUrl || '');
      setEditMetaAdAccountId(editingIntegrationsProspect.metaAdAccountId || '');
      setEditMetaAccessToken(editingIntegrationsProspect.metaAccessToken || '');
    }
  }, [editingIntegrationsProspect]);

  const handleSaveIntegrations = async () => {
    if (!editingIntegrationsProspect) return;

    const id = editingIntegrationsProspect.id;
    const currentProspect = prospects.find(p => p.id === id);
    const serializedGoogleSheetsUrl = JSON.stringify({
      sheetsUrl: editGoogleSheetsUrl || '',
      contactName: currentProspect?.contactName || '',
      contactPhone: currentProspect?.contactPhone || '',
      websiteUrl: currentProspect?.websiteUrl || '',
      estimatedRevenue: currentProspect?.estimatedRevenue || '',
      mainPainPoint: currentProspect?.mainPainPoint || ''
    });

    const updatedList = prospects.map(p => p.id === id ? {
      ...p,
      googleSheetsUrl: editGoogleSheetsUrl,
      metaAdAccountId: editMetaAdAccountId,
      metaAccessToken: editMetaAccessToken
    } : p);
    
    setProspects(updatedList);
    localStorage.setItem('loopflow_prospects:v1', JSON.stringify(updatedList));

    const { error } = await supabase.from('prospects')
      .update({
        google_sheets_url: serializedGoogleSheetsUrl,
        meta_ad_account_id: editMetaAdAccountId || null,
        meta_access_token: editMetaAccessToken || null
      })
      .eq('id', id);

    if (error) {
      console.warn("Erro ao sincronizar integrações com o Supabase:", error.message);
    }

    setEditingIntegrationsProspect(null);
    showToast('Integrações salvas com sucesso!');
  };

  const STAGES = [
    { id: 'novo', label: 'Novo Contato' },
    { id: 'agendado', label: 'Diagnóstico Marcado' },
    { id: 'proposta', label: 'Apresentação / Proposta' },
    { id: 'ganho', label: 'Fechado (Ganho)' },
    { id: 'perdido', label: 'Perdido / Arquivado' }
  ] as const;

  const updateProspectStatus = (id: string, newStatus: 'novo' | 'agendado' | 'proposta' | 'ganho' | 'perdido') => {
    const updatedList = prospects.map(p => p.id === id ? { ...p, status: newStatus } : p);
    setProspects(updatedList);
    localStorage.setItem('loopflow_prospects:v1', JSON.stringify(updatedList));

    supabase.from('prospects')
      .update({ status: newStatus })
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.warn("Erro ao atualizar status no Supabase:", error.message);
        }
      });
  };

  const [draggedOverStageId, setDraggedOverStageId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.4';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  const handleDrop = (e: React.DragEvent, stageId: 'novo' | 'agendado' | 'proposta' | 'ganho' | 'perdido') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      updateProspectStatus(id, stageId);
    }
    setDraggedOverStageId(null);
  };

  const boardRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.group') || target.closest('button') || target.closest('select') || target.closest('a')) {
      return;
    }
    setIsMouseDown(true);
    if (boardRef.current) {
      setStartX(e.pageX - boardRef.current.offsetLeft);
      setScrollLeft(boardRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !boardRef.current) return;
    e.preventDefault();
    const x = e.pageX - boardRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    boardRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragStartBoard = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.group')) {
      e.preventDefault();
    }
  };

  // Carrega os prospects do Supabase (com fallback para localStorage e mesclagem)
  const loadProspects = async () => {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Recupera backup para mesclar dados locais que possam não estar na nuvem
      const backup = JSON.parse(localStorage.getItem('loopflow_prospects:v1') || '[]');
      const backupMap = new Map(backup.map((p: any) => [p.id, p]));

      const mapped = data.map((p: any) => {
        const local = backupMap.get(p.id);
        let parsedSheetsUrl = p.google_sheets_url || '';
        let contactName = '';
        let contactPhone = '';
        let websiteUrl = '';
        let estimatedRevenue = '';
        let mainPainPoint = '';

        if (p.google_sheets_url && p.google_sheets_url.trim().startsWith('{')) {
          try {
            const parsed = JSON.parse(p.google_sheets_url);
            parsedSheetsUrl = parsed.sheetsUrl || '';
            contactName = parsed.contactName || '';
            contactPhone = parsed.contactPhone || '';
            websiteUrl = parsed.websiteUrl || '';
            estimatedRevenue = parsed.estimatedRevenue || '';
            mainPainPoint = parsed.mainPainPoint || '';
          } catch (e) {}
        } else {
          contactName = local?.contactName || '';
          contactPhone = local?.contactPhone || '';
          websiteUrl = local?.websiteUrl || '';
          estimatedRevenue = local?.estimatedRevenue || '';
          mainPainPoint = local?.mainPainPoint || '';
        }

        return {
          id: p.id,
          name: p.name,
          segment: p.segment,
          logo: p.logo || '',
          googleSheetsUrl: parsedSheetsUrl,
          contactName,
          contactPhone,
          websiteUrl,
          estimatedRevenue,
          mainPainPoint,
          status: (p.status !== undefined && p.status !== null) ? p.status : (local?.status || 'novo'),
          metaAdAccountId: (p.meta_ad_account_id !== undefined && p.meta_ad_account_id !== null) ? p.meta_ad_account_id : (local?.metaAdAccountId || ''),
          metaAccessToken: (p.meta_access_token !== undefined && p.meta_access_token !== null) ? p.meta_access_token : (local?.metaAccessToken || ''),
          date: p.created_at
        };
      });
      setProspects(mapped);
      localStorage.setItem('loopflow_prospects:v1', JSON.stringify(mapped));
    } catch {
      const backup = JSON.parse(localStorage.getItem('loopflow_prospects:v1') || '[]');
      setProspects(backup);
    }
  };

  useEffect(() => {
    loadProspects();
  }, [view]);

  const handleSetupComplete = async (data: ProspectData) => {
    const id = Date.now().toString();
    const newProspect: ProspectWithId = {
      id: id,
      name: data.name,
      segment: data.segment,
      logo: data.logo || '',
      googleSheetsUrl: data.googleSheetsUrl || '',
      contactName: data.contactName || '',
      contactPhone: data.contactPhone || '',
      websiteUrl: data.websiteUrl || '',
      estimatedRevenue: data.estimatedRevenue || '',
      mainPainPoint: data.mainPainPoint || '',
      status: 'novo',
      metaAdAccountId: data.metaAdAccountId || '',
      metaAccessToken: data.metaAccessToken || '',
      date: new Date().toISOString()
    };

    const serializedGoogleSheetsUrl = JSON.stringify({
      sheetsUrl: data.googleSheetsUrl || '',
      contactName: data.contactName || '',
      contactPhone: data.contactPhone || '',
      websiteUrl: data.websiteUrl || '',
      estimatedRevenue: data.estimatedRevenue || '',
      mainPainPoint: data.mainPainPoint || ''
    });

    // Salva no Supabase (Nuvem)
    const { error } = await supabase.from('prospects').insert([
      {
        id: id,
        name: data.name,
        segment: data.segment,
        logo: data.logo || null,
        google_sheets_url: serializedGoogleSheetsUrl,
        status: 'novo',
        meta_ad_account_id: data.metaAdAccountId || null,
        meta_access_token: data.metaAccessToken || null
      }
    ]);

    if (error) {
      console.warn("Erro ao inserir novo lead no Supabase:", error.message);
    }

    // Salva no localStorage como redundância/backup
    const list = JSON.parse(localStorage.getItem('loopflow_prospects:v1') || '[]');
    localStorage.setItem('loopflow_prospects:v1', JSON.stringify([newProspect, ...list]));
    
    setActiveProspect(newProspect);
    setView('performance-dashboard');
  };

  const handlePathSelect = (path: Path) => {
    setSelectedPath(path);
    setView('pitch-editor');
  };

  const handleStartPresentation = (slides: Slide[]) => {
    setCustomSlides(slides);
    setView('presentation');
  };

  const handleOpenCalculator = () => {
    setView('calculator');
  };

  const handleExitToMenu = () => {
    setSelectedPath(null);
    setView('menu');
  };

  const handleResetMenu = () => {
    setActiveProspect(null);
    setSelectedPath(null);
    setView('list');
  };

  const deleteProspect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deletingId !== id) {
      setDeletingId(id);
      return;
    }

    // Se clicou de novo, deleta
    const list = prospects.filter(p => p.id !== id);
    setProspects(list);
    localStorage.setItem('loopflow_prospects:v1', JSON.stringify(list));
    setDeletingId(null);
    showToast('Lead removido.');

    // Deleta do Supabase em segundo plano (não-bloqueante)
    supabase.from('prospects')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.warn("Erro ao deletar lead no Supabase:", error.message);
        }
      });
  };

  const startPitch = (p: ProspectWithId) => {
    setActiveProspect(p);
    setView('performance-dashboard');
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <ProspectLogin onLoginSuccess={() => {
        sessionStorage.setItem('loopflow_gestor_auth', 'true');
        setIsAuthenticated(true);
      }} />
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-400 selection:text-black">

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl pointer-events-auto"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar - Visible on all views except 'presentation' */}
      {view !== 'presentation' && (
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Sidebar panel (Minimalist w-20 Icon-only) */}
          <div className={`fixed md:sticky top-0 left-0 z-40 md:z-auto w-20 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between h-screen shrink-0 select-none transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            {/* Sidebar inner */}
            <div className="flex flex-col flex-1 min-h-0 items-center py-6">
              
              {/* Logo */}
              <div className="mb-8 shrink-0">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Logo className="w-8 h-8 text-yellow-400" symbolOnly />
                </div>
              </div>

              {/* Navigation Icons */}
              <div className="flex-1 flex flex-col items-center gap-4 w-full px-2">
                {/* Painel CRM */}
                <button
                  onClick={() => { setView('list'); setSidebarOpen(false); }}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all cursor-pointer group relative ${
                    view === 'list'
                      ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/10'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                  aria-label="Ver painel CRM"
                >
                  <LayoutGrid className="w-5 h-5 shrink-0" />
                  <span className="absolute left-16 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-zinc-800 shadow-xl whitespace-nowrap z-50">
                    Painel CRM
                  </span>
                </button>

                {/* Active Lead Workspace Button - ALWAYS FIXED/VISIBLE */}
                <button
                  onClick={() => {
                    if (activeProspect) {
                      setView('performance-dashboard');
                    } else if (prospects.length > 0) {
                      setActiveProspect(prospects[0]);
                      setView('performance-dashboard');
                    } else {
                      showToast("Nenhum lead cadastrado. Cadastre um lead primeiro!", "error");
                    }
                    setSidebarOpen(false);
                  }}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all cursor-pointer group relative border ${
                    view !== 'list'
                      ? 'bg-yellow-400 text-black border-transparent shadow-lg shadow-yellow-400/10'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-zinc-900'
                  }`}
                  aria-label="Workspace do Lead"
                >
                  {activeProspect ? (
                    activeProspect.logo ? (
                      <img src={activeProspect.logo} alt={activeProspect.name} className="w-6 h-6 rounded object-cover" />
                    ) : (
                      <span className="text-[10px] font-black uppercase text-inherit">
                        {activeProspect.name.charAt(0)}
                      </span>
                    )
                  ) : (
                    <Briefcase className="w-5 h-5 shrink-0" />
                  )}
                  <span className="absolute left-16 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-zinc-800 shadow-xl whitespace-nowrap z-50">
                    {activeProspect ? `Workspace: ${activeProspect.name}` : 'Área do Lead'}
                  </span>
                </button>
              </div>

            </div>

            {/* Sidebar Footer */}
            <div className="px-4 py-4 border-t border-zinc-900 shrink-0 flex flex-col items-center gap-3">
              {/* Session Indicator */}
              <div className="flex items-center justify-center w-full relative group">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></div>
                <span className="absolute left-16 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-zinc-800 shadow-xl whitespace-nowrap z-50">
                  Sessão Ativa
                </span>
              </div>

              {/* Alternador de Tema */}
              <button
                onClick={() => {
                  const newTheme = theme === 'light' ? 'dark' : 'light';
                  setTheme(newTheme);
                  localStorage.setItem('loopflow_theme', newTheme);
                }}
                className="w-12 h-12 flex items-center justify-center bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white border border-zinc-800 rounded-2xl transition-colors cursor-pointer group relative"
                aria-label="Alternar tema"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="absolute left-16 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-zinc-800 shadow-xl whitespace-nowrap z-50">
                  Alternar Tema
                </span>
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  sessionStorage.removeItem('loopflow_gestor_auth');
                  setIsAuthenticated(false);
                }}
                className="w-12 h-12 flex items-center justify-center bg-zinc-900 hover:bg-rose-950/20 text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-900/30 rounded-2xl transition-colors cursor-pointer group relative"
                aria-label="Sair da Central"
              >
                <LogOut className="w-4 h-4" />
                <span className="absolute left-16 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-zinc-800 shadow-xl whitespace-nowrap z-50">
                  Sair da Central
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Workspace Frame */}
      <div className={`flex-1 min-h-screen overflow-y-auto flex flex-col md:ml-0 transition-colors duration-300 ${
        (theme === 'light' && view !== 'presentation') ? 'theme-light bg-zinc-50 text-zinc-900' : 'bg-zinc-950 text-white'
      }`}>
        {/* Mobile topbar */}
        {view !== 'presentation' && (
          <div className="md:hidden flex items-center gap-4 px-4 py-3 border-b border-zinc-900 bg-zinc-950 sticky top-0 z-20">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
              aria-label="Abrir menu lateral"
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <Logo className="w-7 h-7 text-yellow-400" symbolOnly />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Top Navbar */}
        {view !== 'presentation' && (
          <header className={`hidden md:flex h-16 border-b shrink-0 items-center sticky top-0 z-30 transition-colors ${
            theme === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-900'
          }`}>
            <div className="max-w-7xl w-full mx-auto px-6 md:px-8 flex items-center justify-between">
                 {/* Left Column: Lead Dropdown Selector */}
              <div className="w-1/3 flex justify-start">
                {view !== 'list' && (
                  <div className="relative">
                    <button
                      onClick={() => setLeadsOpen(prev => !prev)}
                      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer border ${
                        theme === 'light' ? 'border-zinc-200 hover:bg-zinc-50 text-zinc-900' : 'border-zinc-900 hover:bg-zinc-900/60 text-white'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border ${
                        activeProspect ? 'border-yellow-400/60' : 'border-zinc-800'
                      }`}>
                        {activeProspect ? (
                          activeProspect.logo ? (
                            <img src={activeProspect.logo} alt={activeProspect.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-yellow-400 text-black flex items-center justify-center text-[10px] font-black">
                              {activeProspect.name.charAt(0).toUpperCase()}
                            </div>
                          )
                        ) : (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-zinc-550">
                              <circle cx="6" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
                              <path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        {activeProspect ? (
                          <>
                            <span className="text-[10px] font-black uppercase tracking-tight block leading-tight">{activeProspect.name}</span>
                            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider block leading-none mt-0.5">{activeProspect.segment}</span>
                          </>
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Escolher Lead</span>
                        )}
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0 ml-1.5" />
                    </button>
      
                    {/* Floating Dropdown List */}
                    <AnimatePresence>
                      {leadsOpen && (
                        <>
                          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setLeadsOpen(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute left-0 top-12 mt-1 w-64 rounded-2xl border shadow-2xl z-50 p-1.5 space-y-0.5 max-h-96 overflow-y-auto ${
                              theme === 'light' ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-900'
                            }`}
                          >
                            {prospects.map(p => {
                              const isActive = activeProspect && (activeProspect as any).id === (p as any).id;
                              const stageColor: Record<string, string> = {
                                novo: 'bg-zinc-500',
                                agendado: 'bg-blue-400',
                                proposta: 'bg-amber-400',
                                ganho: 'bg-emerald-400',
                                perdido: 'bg-red-500'
                              };
                              return (
                                <button
                                  key={(p as any).id}
                                  onClick={() => {
                                    setActiveProspect(p);
                                    setLeadsOpen(false);
                                    setView('performance-dashboard');
                                  }}
                                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all cursor-pointer text-left border ${
                                    isActive
                                      ? 'bg-zinc-100 border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800'
                                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/60 border-transparent'
                                  }`}
                                >
                                  <div className="w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-zinc-800">
                                    {p.logo ? (
                                      <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full bg-yellow-400 text-black flex items-center justify-center text-[10px] font-black">
                                        {p.name.charAt(0).toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-black uppercase tracking-tight truncate">
                                      {p.name}
                                    </div>
                                    <div className="text-[8px] text-zinc-550 font-bold uppercase tracking-wide truncate">
                                      {p.segment}
                                    </div>
                                  </div>
                                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${stageColor[(p as any).status] ?? 'bg-zinc-500'}`} />
                                </button>
                              );
                            })}
                            {activeProspect && (
                              <button
                                onClick={() => { setActiveProspect(null); setLeadsOpen(false); setView('list'); }}
                                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all cursor-pointer text-left border border-transparent"
                              >
                                <X className="w-3.5 h-3.5 shrink-0" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Limpar Seleção</span>
                              </button>
                            )}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
    
              {/* Center Column: Lead navigation tabs */}
              <div className="w-1/3 flex justify-center">
                {view !== 'list' && activeProspect && (
                  <nav className={`flex items-center gap-1 p-1 rounded-xl border ${
                    theme === 'light' ? 'bg-zinc-100 border-zinc-200/60' : 'bg-zinc-900/60 border-zinc-900'
                  }`}>
                    <button
                      onClick={() => setView('performance-dashboard')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        view === 'performance-dashboard'
                          ? 'bg-yellow-400 text-black shadow-sm'
                          : 'text-zinc-550 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <span>Métricas</span>
                    </button>
                    <button
                      onClick={() => setView('calculator')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        view === 'calculator'
                          ? 'bg-yellow-400 text-black shadow-sm'
                          : 'text-zinc-550 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5 shrink-0" />
                      <span>Calculadora</span>
                    </button>
                    <button
                      onClick={() => setView('menu')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        view === 'menu' || view === 'pitch-editor'
                          ? 'bg-yellow-400 text-black shadow-sm'
                          : 'text-zinc-555 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 shrink-0" />
                      <span>Pitch</span>
                    </button>
                  </nav>
                )}
              </div>
    
              {/* Right Column: Lead settings button or Spacer to ensure absolute centering */}
              <div className="w-1/3 flex justify-end">
                {view !== 'list' && activeProspect && (
                  <button
                    type="button"
                    onClick={() => setEditingIntegrationsProspect(activeProspect as ProspectWithId)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer text-[10px] font-black uppercase tracking-wider ${
                      theme === 'light'
                        ? 'border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 bg-white shadow-sm'
                        : 'border-zinc-900 hover:bg-zinc-900/60 text-zinc-400 hover:text-white bg-zinc-950'
                    }`}
                    title="Configurações e Integrações do Lead"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Configurar Lead</span>
                  </button>
                )}
              </div>
            </div>
          </header>
        )}

        {view === 'list' && (
          <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8 flex-1 flex flex-col">
            {/* Page Header — padrão unificado */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-zinc-900">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">Painel de Prospecção</h1>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
                  {prospects.length} {prospects.length === 1 ? 'lead cadastrado' : 'leads cadastrados'}
                </p>
              </div>
              <button
                onClick={() => setView('setup')}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2.5 px-5 rounded-xl uppercase tracking-widest text-[10px] transition-all shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer shrink-0"
                aria-label="Cadastrar novo lead"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                Novo Lead
              </button>
            </div>
            
            {/* Kanban Board CRM */}
            <div className="space-y-4 overflow-hidden flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.25em]">Etapas do funil</span>
                <span className="text-xs bg-zinc-900 text-yellow-400 font-bold py-1.5 px-4 rounded-full border border-zinc-850">
                  {prospects.length} {prospects.length === 1 ? 'Lead total' : 'Leads totais'}
                </span>
              </div>

              {prospects.length === 0 ? (
                <div className="h-64 border border-dashed border-zinc-900 rounded-3xl flex flex-col items-center justify-center text-zinc-600 gap-4 bg-zinc-950/20">
                  <p className="text-base font-bold uppercase tracking-widest">Nenhum prospect cadastrado</p>
                  <button
                    onClick={() => setView('setup')}
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-350 hover:text-white px-6 py-3.5 rounded-xl font-bold uppercase text-[11px] tracking-widest border border-zinc-850 transition-colors"
                  >
                    Criar primeiro prospect
                  </button>
                </div>
              ) : (
                <div 
                  ref={boardRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onDragStart={handleDragStartBoard}
                  className="flex gap-6 overflow-x-auto pb-4 pt-1 select-none scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent cursor-grab active:cursor-grabbing max-w-full flex-1"
                >
                  {STAGES.map(stage => {
                    const stageProspects = prospects.filter(p => p.status === stage.id);
                    const isDraggedOver = draggedOverStageId === stage.id;
                    
                    return (
                      <div 
                        key={stage.id} 
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDraggedOverStageId(stage.id);
                        }}
                        onDragLeave={() => setDraggedOverStageId(null)}
                        onDrop={(e) => handleDrop(e, stage.id)}
                        className={`w-80 shrink-0 bg-zinc-900/10 border ${
                          isDraggedOver 
                            ? 'border-yellow-400/50 bg-[#FFD400]/[0.02]' 
                            : 'border-zinc-900/60'
                        } rounded-3xl p-5 flex flex-col min-h-[480px] transition-all`}
                      >
                        {/* Stage Title */}
                        <div className="flex items-center justify-between mb-5 select-none">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              stage.id === 'novo' ? 'bg-zinc-400' :
                              stage.id === 'agendado' ? 'bg-blue-400' :
                              stage.id === 'proposta' ? 'bg-yellow-400' :
                              stage.id === 'ganho' ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}></span>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-300">{stage.label}</h3>
                          </div>
                          <span className="text-[10px] bg-zinc-950 border border-zinc-900 text-zinc-400 font-black px-2.5 py-0.5 rounded">
                            {stageProspects.length}
                          </span>
                        </div>

                        {/* Stage Lead Cards */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-zinc-850">
                          {stageProspects.length === 0 ? (
                            <div className="h-24 border border-dashed border-zinc-850 rounded-2xl flex items-center justify-center text-zinc-600 text-xs font-bold uppercase tracking-wider text-center px-4">
                              Sem leads nesta etapa
                            </div>
                          ) : (
                            stageProspects.map(p => (
                              <div
                                key={p.id}
                                onClick={() => startPitch(p)}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, p.id)}
                                onDragEnd={handleDragEnd}
                                className="group bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-yellow-400/30 p-5 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden active:cursor-grabbing select-none shadow-md"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 transition-colors shrink-0" />
                                    <div className="w-12 h-12 bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center shrink-0">
                                      {p.logo ? (
                                        <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
                                      ) : (
                                        <div className="w-full h-full bg-[#FFD400] text-black flex items-center justify-center text-sm font-black italic">
                                          {p.name.substring(0, 1).toUpperCase()}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-left">
                                      <div className="text-[15px] font-black text-white uppercase tracking-tight italic leading-tight group-hover:text-yellow-400 transition-colors">
                                        {p.name}
                                      </div>
                                      <div className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
                                        {p.segment}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Data de Coleta */}
                                {p.date && (
                                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2 mt-3.5">
                                    <Calendar className="w-3.5 h-3.5 text-[#FFD400]" />
                                    <span>{formatDate(p.date)}</span>
                                  </div>
                                )}

                                {/* Controles de Estágio (Quick Move) */}
                                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3.5 mt-4 gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const idx = STAGES.findIndex(s => s.id === p.status);
                                        if (idx > 0) updateProspectStatus(p.id, STAGES[idx - 1].id);
                                      }}
                                      disabled={p.status === 'novo'}
                                      className="w-7 h-7 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer text-[9px]"
                                      title="Mover para etapa anterior"
                                      aria-label="Mover lead para etapa anterior"
                                    >
                                      ◀
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const idx = STAGES.findIndex(s => s.id === p.status);
                                        if (idx < STAGES.length - 1) updateProspectStatus(p.id, STAGES[idx + 1].id);
                                      }}
                                      disabled={p.status === 'perdido'}
                                      className="w-7 h-7 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer text-[9px]"
                                      title="Mover para próxima etapa"
                                      aria-label="Mover lead para próxima etapa"
                                    >
                                      ▶
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => deleteProspect(p.id, e)}
                                      onMouseLeave={() => setDeletingId(null)}
                                      className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 text-[9px] font-black uppercase tracking-wider ${
                                        deletingId === p.id 
                                          ? 'bg-rose-600 text-white border border-rose-600'
                                          : 'bg-zinc-950 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 border border-zinc-800'
                                      }`}
                                      title={deletingId === p.id ? 'Confirmar exclusão' : 'Remover lead'}
                                      aria-label={deletingId === p.id ? 'Confirmar exclusão do lead' : `Remover lead ${p.name}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                      {deletingId === p.id && <span>Excluir?</span>}
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingIntegrationsProspect(p);
                                      }}
                                      className="p-2 bg-zinc-950 hover:bg-yellow-400/10 text-zinc-400 hover:text-yellow-400 border border-zinc-800 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                                      title="Configurar Integrações"
                                    >
                                      <Settings className="w-3.5 h-3.5" />
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveProspect(p);
                                        setView('performance-dashboard');
                                      }}
                                      className="p-2 bg-zinc-950 hover:bg-yellow-400/10 text-[#FFD400]/80 hover:text-yellow-400 border border-zinc-800 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                                      title="Dashboard de Métricas"
                                    >
                                      <TrendingUp className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'setup' && (
          <div className="p-4 md:p-8 flex-1 flex items-center justify-center">
            <ProspectSetup onComplete={handleSetupComplete} />
          </div>
        )}

        {view === 'menu' && activeProspect && (
          <div className="w-full">
            <PathSelector
              prospect={activeProspect}
              onSelect={handlePathSelect}
              onReset={() => {}}
            />
          </div>
        )}
        
        {view === 'calculator' && activeProspect && (
          <div className="w-full">
            <BudgetCalculator
              prospect={activeProspect}
              onBack={() => setView('list')}
            />
          </div>
        )}
        
        {view === 'pitch-editor' && activeProspect && selectedPath && (
          <div className="w-full animate-fade-in">
            <PitchEditor
              prospect={activeProspect}
              path={selectedPath}
              defaultSlides={getPitchFlowBySegment(activeProspect.segment, selectedPath.id)}
              onBack={() => setView('menu')}
              onStartPresentation={handleStartPresentation}
            />
          </div>
        )}
        
        {view === 'presentation' && activeProspect && selectedPath && (
          <Presentation
            slides={customSlides}
            prospect={activeProspect}
            onExit={handleExitToMenu}
          />
        )}
        
        {view === 'performance-dashboard' && activeProspect && (
          <div className="w-full">
            <PerformanceDashboard
              prospect={activeProspect}
              onBack={() => setView('list')}
            />
          </div>
        )}

        {editingIntegrationsProspect && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-[32px] shadow-2xl space-y-6 text-left relative">
              <div>
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-400/20">
                  {editingIntegrationsProspect.name}
                </span>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-white mt-2">Configurar Integrações</h3>
                <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Conecte fontes de dados reais a este lead.</p>
              </div>

              {/* Google Sheets */}
              <div className="space-y-2 border-t border-zinc-800/60 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-black text-zinc-500 uppercase tracking-widest">Link do Google Sheets (Opcional)</label>
                  <span className="text-[9px] bg-[#FFD400]/10 text-[#FFD400] border border-[#FFD400]/20 px-2 py-0.5 rounded font-black">Live Sync</span>
                </div>
                <input
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-bold focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] outline-none transition-all placeholder:text-zinc-800 text-[11px]"
                  value={editGoogleSheetsUrl}
                  onChange={e => setEditGoogleSheetsUrl(e.target.value)}
                />
              </div>

              {/* Meta Account ID */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-black text-zinc-500 uppercase tracking-widest">Meta Ads ID da Conta (Opcional)</label>
                  <span className="text-[9px] bg-blue-400/10 text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded font-black">Meta API</span>
                </div>
                <input
                  type="text"
                  placeholder="act_XXXXXXXXX"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-bold focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] outline-none transition-all placeholder:text-zinc-800 text-[11px]"
                  value={editMetaAdAccountId}
                  onChange={e => setEditMetaAdAccountId(e.target.value)}
                />
              </div>

              {/* Meta Access Token */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-black text-zinc-500 uppercase tracking-widest">Meta Ads Token de Acesso (Opcional)</label>
                  <span className="text-[9px] bg-blue-400/10 text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded font-black">Meta Token</span>
                </div>
                <input
                  type="password"
                  placeholder="EAAXX..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-bold focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] outline-none transition-all placeholder:text-zinc-800 text-[11px]"
                  value={editMetaAccessToken}
                  onChange={e => setEditMetaAccessToken(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSaveIntegrations}
                  className="flex-1 bg-[#FFD400] hover:bg-yellow-300 text-black font-black py-3 rounded-xl uppercase tracking-widest text-[9px] transition-colors cursor-pointer text-center"
                >
                  Salvar Integrações
                </button>
                <button
                  onClick={() => setEditingIntegrationsProspect(null)}
                  className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black rounded-xl uppercase tracking-widest text-[9px] transition-colors cursor-pointer text-center"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProspectLogin: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'LF_performance@2026' || password === 'loopflow@admin') {
      onLoginSuccess();
    } else {
      setError('Senha administrativa incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-6 text-left selection:bg-yellow-400 selection:text-black">
      <div className="max-w-md w-full bg-zinc-900/40 border border-zinc-850 rounded-[32px] p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto"><Logo className="w-full h-full text-yellow-400" symbolOnly /></div>
          <div className="space-y-1">
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Central de Prospecção</h2>
            <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-widest leading-relaxed">Acesso restrito para gestores da Loop Flow</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[7.5px] font-black text-zinc-550 uppercase tracking-widest block">Senha Administrativa</label>
            <input
              type="password"
              required
              placeholder="Digite a senha de acesso"
              className="w-full bg-zinc-950 border border-zinc-850 focus:border-yellow-400/50 rounded-xl px-4 py-3.5 text-xs text-white placeholder-zinc-700 outline-none transition-all focus:ring-1 focus:ring-yellow-400/20"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
            />
            {error && (
              <span className="text-[8.5px] font-bold text-rose-500 block uppercase tracking-wide">{error}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD400] hover:bg-yellow-300 text-black font-black uppercase text-[10px] tracking-widest py-4.5 rounded-xl transition-all shadow-lg shadow-yellow-400/5 hover:shadow-yellow-400/10 cursor-pointer text-center"
          >
            Acessar Painel
          </button>
        </form>

        <div className="text-center pt-2">
          <span className="text-[7.5px] text-zinc-650 font-bold uppercase tracking-wider block">
            Loop Flow Marketing de Performance © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProspectDashboard;
