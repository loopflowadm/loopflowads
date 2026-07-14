import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import heroPoster from '../assets/hero.png';

export default function Hero({ onOpenModal }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Estados para o efeito de digitação (Typewriter)
  const words = ["leads", "vendas", "faturamento"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const [videoSrc, setVideoSrc] = useState("");

  // Atrasar o carregamento do vídeo de fundo de 11MB para otimizar performance (Speed Index/LCP)
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setVideoSrc("/videos/hero.webm");
    }, 400);
    return () => clearTimeout(loadTimer);
  }, []);

  // Configurar a velocidade do vídeo de fundo
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.playbackRate = 0.55;
    }
  }, [videoSrc]);

  // Lógica do Typewriter
  useEffect(() => {
    let timer;
    const handleType = () => {
      const currentWord = words[wordIndex];
      
      if (!isDeleting) {
        // Digitante
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        setTypingSpeed(110);
        
        if (currentText === currentWord) {
          setIsDeleting(true);
          setTypingSpeed(2200);
        }
      } else {
        // Apagando
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(200);
        }
      }
    };

    // Atrasar o início da digitação na montagem inicial até a saída da Splash Screen
    timer = setTimeout(handleType, currentText === "" && !isDeleting && wordIndex === 0 ? 1700 : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  return (
    <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-12 overflow-hidden bg-brand-yellow select-none">
      
      {/* 1. Vídeo de fundo em cores originais com opacidade equilibrada */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={heroPoster}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-45 contrast-[1.12] brightness-[1.05]"
      >
        {videoSrc && (
          <>
            <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
            <source src={videoSrc} type="video/mp4" />
          </>
        )}
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* 2. Sombreado superior longo na cor amarela */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-brand-yellow via-brand-yellow/80 via-brand-yellow/30 to-transparent pointer-events-none z-10" />

      {/* 3. Sombreado inferior longo na cor amarela */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand-yellow via-brand-yellow/80 via-brand-yellow/30 to-transparent pointer-events-none z-10" />

      {/* 4. Brilho radial de blur amarelo central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-brand-yellow/40 rounded-full blur-[130px] pointer-events-none z-10" />
      
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">


        {/* Headline Tipográfica Premium - Atrasado para a saída da Splash Screen (1.5s) */}
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)', y: 25 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-[3.2rem] md:text-[3.65rem] tracking-tight leading-[1.08] text-brand-black max-w-3xl mb-8 font-normal"
        >
          <span className="font-semibold text-neutral-900/90 block sm:inline">Coloque sua empresa em</span>{' '}
          
          {/* Badge de Interface com Destaque em Preto/Amarelo */}
          <span className="inline-block bg-brand-black text-brand-yellow px-4.5 sm:px-6 py-1.5 sm:py-2.5 rounded-2xl sm:rounded-[22px] shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-white/10 font-black mx-1 transform -rotate-1 translate-y-[5px] align-middle select-none text-[0.88em]">
            loop de crescimento
          </span>
          
          {/* Digitação interativa (Typewriter) */}
          <span className="font-extrabold block mt-2 sm:mt-4 text-brand-black text-center">
            <span className="block min-h-[1.15em]">
              mais{' '}
              <span className="inline-block text-brand-black border-r-3 border-brand-black pr-1.5 animate-[blink_0.75s_step-end_infinite] min-w-[1px]">
                {currentText || "\u00A0"}
              </span>
            </span>
            <span className="block mt-1 sm:mt-1.5 text-brand-black">
              todos os meses.
            </span>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)', y: 25 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-neutral-800/80 font-medium leading-relaxed max-w-3xl mb-8"
        >
          Diagnóstico, estratégia, execução e acompanhamento de indicadores — tudo em um só lugar,<br className="hidden sm:inline" />
          com uma equipe que trata seu marketing como se fosse seu próprio negócio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3.5 mb-6 w-full"
        >
          <button
            onClick={onOpenModal}
            className="group relative overflow-hidden bg-brand-black text-brand-yellow font-extrabold py-4.5 px-10 rounded-2xl transition-all shadow-2xl hover:bg-neutral-900 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer w-full sm:w-auto text-center"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
            <span className="flex items-center justify-center gap-2.5">
              Quero meu diagnóstico gratuito
              <Calendar className="w-5 h-5 text-brand-yellow" />
            </span>
          </button>
        </motion.div>

        {/* Call to action secondary subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)', y: 25 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-neutral-800/80 font-bold max-w-2xl leading-relaxed mt-2"
        >
          Agende uma call de diagnóstico gratuita e descubra,<br className="hidden sm:inline" /> em 30 minutos, onde seu marketing está travando.
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-brand-black font-bold">Deslize</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-brand-black" />
        </motion.div>
      </div>
    </section>
  );
}
