import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }} // Inicia sincronizado ao término da Splash Screen mais rápida (1.4s)
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-brand-black/80 backdrop-blur-md shadow-lg shadow-black/10 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Logo Oficial - Sólida e instantânea na Navbar, sem cascata de letras redundante */}
        <a href="#" className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.01]">
          <Logo className="h-7.5 sm:h-9 w-auto" color={scrolled ? "#FFCC00" : "#0A0A0A"} />
        </a>

        {/* CTA Amarelo com Volume Tátil Apple style */}
        <button
          onClick={onOpenModal}
          className={`relative inline-flex items-center gap-1.5 font-extrabold text-xs py-2.5 px-5 rounded-full transition-all cursor-pointer ${
            scrolled 
              ? "bg-brand-yellow text-brand-black hover:bg-brand-yellow-hover shadow-[0_2px_4px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.25)_inset]" 
              : "bg-brand-black text-brand-yellow hover:bg-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:scale-[0.96]"
          }`}
        >
          <span>Diagnóstico Gratuito</span>
          <Sparkles className={`w-3.5 h-3.5 ${scrolled ? 'fill-brand-black text-brand-black' : 'fill-brand-yellow text-brand-yellow'}`} />
        </button>
      </div>
    </motion.nav>
  );
}
