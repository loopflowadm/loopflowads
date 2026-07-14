import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainSection from './components/PainSection';
import { ScrollingFeatureShowcase } from './components/ui/interactive-scrolling-story-component';
import CredibilitySection from './components/CredibilitySection';
import BenefitsSection from './components/BenefitsSection';
import FaqSection from './components/FaqSection';
import SchedulingModal from './components/SchedulingModal';
import Logo from './components/Logo';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Splash Screen de entrada amarela acelerada (de 3.5s para 1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans antialiased">
      
      {/* 1. Preloader / Splash Screen de entrada amarela com logotipo preto central */}
      <AnimatePresence>
        {loading && (
          <div className="fixed inset-0 z-[100] bg-brand-yellow flex items-center justify-center">
            {/* Logo Oficial preta no centro com o efeito de brilho/acendimento showShine */}
            <Logo className="h-16 sm:h-24 w-auto" color="#0A0A0A" showShine={true} />
          </div>
        )}
      </AnimatePresence>

      {/* Componente Navbar */}
      <Navbar onOpenModal={openModal} />

      {/* Componente Hero (Amarelo) */}
      <Hero onOpenModal={openModal} />

      {/* Componente PainSection (Branco) */}
      <PainSection />

      {/* Novo Componente de Método Interativo de Rolagem (Preto com Física de Scroll Nativo) */}
      <ScrollingFeatureShowcase onOpenModal={openModal} />

      {/* Componente CredibilitySection (Branco) */}
      <CredibilitySection onOpenModal={openModal} />

      {/* Componente BenefitsSection (Amarelo) */}
      <BenefitsSection />

      {/* Componente FaqSection (Preto) */}
      <FaqSection />

      {/* SEÇÃO CTA FINAL (Fundo Amarelo, Container Central Preto) */}
      <section className="py-24 relative overflow-hidden bg-brand-yellow select-none">
        
        {/* Grid de fundo sutil em preto sobre amarelo */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{
            backgroundSize: '40px 40px',
            backgroundImage: `
              linear-gradient(to right, #000000 1px, transparent 1px),
              linear-gradient(to bottom, #000000 1px, transparent 1px)
            `
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Caixa Preta Sólida sobre o Fundo Amarelo */}
          <div className="bg-brand-black rounded-[32px] p-8 sm:p-16 border border-neutral-800 shadow-2xl text-center">
            <span className="text-xs uppercase tracking-widest text-brand-yellow font-extrabold block mb-4">
              AÇÃO IMEDIATA
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
              Antes de gastar mais um real sem saber o retorno, entenda onde seu marketing está travando o crescimento.
            </h2>
            
            <p className="text-sm text-neutral-400 font-semibold max-w-xl mx-auto mb-10 leading-relaxed uppercase tracking-wider">
              A call de diagnóstico é gratuita, dura cerca de 30 minutos e não tem compromisso. 
              Você sai dela com clareza absoluta — com ou sem contrato com a gente.
            </p>

            {/* Botão de Agendamento */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="group relative overflow-hidden bg-brand-yellow text-brand-black font-extrabold py-4.5 px-10 rounded-2xl transition-all shadow-xl hover:bg-brand-yellow-hover hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
                <span className="flex items-center justify-center gap-2.5">
                  Quero meu diagnóstico gratuito
                  <Calendar className="w-5 h-5 text-brand-black" />
                </span>
              </button>
              
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest pt-2 sm:pt-0">
                Vagas limitadas por semana
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ (Preto com o Logotipo Oficial da Loop Flow) */}
      <footer className="bg-brand-black border-t border-white/5 py-12 text-neutral-500 text-xs font-semibold select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo e Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Logo className="h-5.5 w-auto" color="#FFCC00" />
            <p className="font-semibold text-center md:text-left text-neutral-600">
              © {new Date().getFullYear()} Loop Flow. Todos os direitos reservados.
            </p>
          </div>

          {/* Links e Informações Adicionais */}
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <div className="flex gap-6">
              <a href="#dores" className="hover:text-brand-yellow transition-colors duration-200">Sintomas</a>
              <a href="#metodo" className="hover:text-brand-yellow transition-colors duration-200">O Método</a>
              <a href="#beneficios" className="hover:text-brand-yellow transition-colors duration-200">Benefícios</a>
              <a href="#faq" className="hover:text-brand-yellow transition-colors duration-200">FAQ</a>
            </div>
            <p className="text-[10px] text-neutral-600 max-w-sm leading-relaxed normal-case">
              As condições comerciais e metas de entrega são acordadas formalmente sob proposta de serviço. Este site serve para demonstração de metodologia da agência.
            </p>
          </div>

        </div>

        {/* Botão flutuante para voltar ao topo */}
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-brand-dark hover:bg-brand-light-gray flex items-center justify-center border border-white/10 text-brand-gray hover:text-brand-yellow rounded-full transition-all shadow-md z-40 cursor-pointer active:scale-90"
          title="Voltar ao topo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </footer>

      {/* Componente Modal de Agendamento */}
      <SchedulingModal isOpen={isModalOpen} onClose={closeModal} />
      
    </div>
  );
}
