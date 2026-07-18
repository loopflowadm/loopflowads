import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import Logo from './Logo';
export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/90 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.01] shrink-0"
          aria-label="Loop Flow — Início"
        >
          <Logo className="h-7 sm:h-8 w-auto" color={scrolled ? '#FFCC00' : '#0A0A0A'} />
        </a>

        {/* Ações direita */}
        <div className="flex items-center">
          {/* CTA principal */}
          <button
            type="button"
            onClick={onOpenModal}
            className={`relative inline-flex items-center gap-1.5 font-extrabold text-xs py-2.5 px-5 rounded-full transition-all cursor-pointer ${
              scrolled
                ? 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-hover shadow-[0_2px_4px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.25)_inset]'
                : 'bg-brand-black text-brand-yellow hover:bg-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:scale-[0.96]'
            }`}
            aria-label="Abrir modal de diagnóstico gratuito"
          >
            <span className="hidden sm:inline">Diagnóstico Gratuito</span>
            <span className="sm:hidden">Diagnóstico</span>
            <Sparkles className={`w-3.5 h-3.5 ${scrolled ? 'fill-brand-black text-brand-black' : 'fill-brand-yellow text-brand-yellow'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
