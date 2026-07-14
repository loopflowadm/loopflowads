import React, { useState, useEffect, useRef } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

// --- Data for each slide of the Method ---
const slidesData = [
  {
    phase: "Fase 01",
    subtitle: "Identificação de Gargalos",
    title: "Diagnóstico",
    description: "Entendemos seu negócio, seu momento e onde está o gargalo real (nem sempre é o que parece).",
    videoUrl: "/videos/Lupa.mp4",
    bgColor: "#0A0A0A", // Preto oficial da agência
    accentColor: "#FFF5C2",
    textColor: "#ffffff",
  },
  {
    phase: "Fase 02",
    subtitle: "Planejamento Focado em ROI",
    title: "Estratégia",
    description: "Montamos um plano com prioridade clara: o que fazer primeiro, com qual verba, e qual resultado esperar.",
    videoUrl: "/videos/Clipboard.mp4",
    bgColor: "#0A0A0A", // Preto oficial da agência
    accentColor: "#FFE066",
    textColor: "#ffffff",
  },
  {
    phase: "Fase 03",
    subtitle: "Mão na Massa e Testes",
    title: "Execução e Otimização",
    description: "Colocamos a mão na massa: tráfego pago, direcionamento de copy e criativos, testamos, medimos e ajustamos. Sem terceirizar para quem você nunca vai falar.",
    videoUrl: "/videos/Foguete.mp4",
    bgColor: "#0A0A0A", // Preto oficial da agência
    accentColor: "#FFCC00",
    textColor: "#ffffff",
  },
  {
    phase: "Fase 04",
    subtitle: "Crescimento sem Sorte",
    title: "Escala e expansão",
    description: "Validado o que funciona, aumentamos o investimento e expandimos para novos canais e públicos — sempre com o mesmo rigor de acompanhamento. Crescer não é sorte, é repetir o que já provou resultado.",
    videoUrl: "/videos/Símbolo_circular.mp4",
    bgColor: "#0A0A0A", // Preto oficial da agência
    accentColor: "#E6B800",
    textColor: "#ffffff",
  },
];

interface ShowcaseProps {
  onOpenModal?: () => void;
}

export function ScrollingFeatureShowcase({ onOpenModal }: ShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Array de refs para os 4 elementos de vídeo individuais
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Hook do Framer Motion para detectar a rolagem do container e alternar as fases
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Escuta a mudança no progresso da rolagem do container (0 a 1) para mudar as fases
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = 1 / slidesData.length;
      const newActiveIndex = Math.min(
        slidesData.length - 1,
        Math.floor(latest / step)
      );
      setActiveIndex(newActiveIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Controle de reprodução: Toca o vídeo ativo e pausa/reseta os inativos
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          // Reinicia o vídeo do começo ao entrar na fase ativa e dá Play
          video.currentTime = 0;
          video.play().catch(() => {
            // Ignora bloqueios normais de autoplay do navegador
          });
        } else {
          // Pausa e zera os vídeos das fases inativas para economizar performance
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  // Transição suave de cor de fundo e texto
  const dynamicStyles = {
    backgroundColor: slidesData[activeIndex].bgColor,
    color: slidesData[activeIndex].textColor,
    transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s ease',
  };

  // Padrão de grid sutil de luxo
  const gridPatternStyle = {
    '--grid-color': 'rgba(255, 204, 0, 0.015)',
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: '3.5rem 3.5rem',
  } as React.CSSProperties;

  // Lida com o clique nas barras de paginação para rolar o window suavemente até o slide correspondente
  const handlePaginationClick = (index: number) => {
    if (containerRef.current) {
      const elementTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      const slideHeight = window.innerHeight;
      window.scrollTo({
        top: elementTop + index * slideHeight + 5,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="metodo"
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${slidesData.length * 100}vh` }}
    >
      {/* Container Sticky que fica fixo na tela enquanto o usuário rola o bloco de 400vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center border-y border-white/5" style={dynamicStyles}>
        
        {/* Luz radial de fundo adaptada ao accentColor da fase ativa */}
        <div 
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-15"
          style={{ backgroundColor: slidesData[activeIndex].accentColor }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
          
          {/* Coluna Esquerda: Organização do Conteúdo (Centralizado Verticalmente com Elementos Integrados no Fluxo) */}
          <div className="relative flex flex-col justify-center p-8 md:p-16 py-20 z-20">
            
            {/* Bloco Unificado de Conteúdo + CTA (Paginação integrada no topo do próprio bloco de conteúdo) */}
            <div className="flex flex-col gap-10 text-left">
              
              {/* Paginação de Barras no Estilo Editorial (Integrado no fluxo, descendo junto com o texto) */}
              <div className="flex space-x-2.5">
                {slidesData.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaginationClick(index)}
                    className="h-1.5 rounded-full transition-all duration-500 ease-in-out cursor-pointer"
                    style={{
                      width: index === activeIndex ? '3.5rem' : '1.5rem',
                      backgroundColor: index === activeIndex ? slidesData[activeIndex].accentColor : 'rgba(255, 255, 255, 0.12)'
                    }}
                    aria-label={`Ir para ${slide.phase}`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-sm font-black uppercase tracking-widest" style={{ color: slidesData[activeIndex].accentColor }}>
                      {slidesData[activeIndex].phase}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                      {slidesData[activeIndex].subtitle}
                    </span>
                  </div>

                  {/* Título Aumentado */}
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                    {slidesData[activeIndex].title}
                  </h2>
                  
                  {/* Descrição Aumentada */}
                  <p className="text-lg md:text-xl text-neutral-200/90 leading-relaxed font-semibold max-w-xl">
                    {slidesData[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bloco de Ação (CTA) Posicionado Logo Abaixo do Texto */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={onOpenModal}
                  className="group relative overflow-hidden bg-brand-yellow text-brand-black font-extrabold py-4 px-8 rounded-2xl transition-all shadow-2xl hover:bg-brand-yellow/95 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider w-full sm:w-auto justify-center"
                >
                  <span>Quero meu diagnóstico gratuito</span>
                  <Calendar className="w-4 h-4 text-brand-black" />
                </button>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold pl-1 text-left">
                  Fale com nossos especialistas
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Vídeos Menores Otimizados para não cortar com Vinheta de Fusão no fundo da página */}
          <div className="hidden md:flex items-center justify-center p-4 z-10" style={gridPatternStyle}>
            <div className="relative w-[85%] h-[75vh] flex items-center justify-center bg-black shadow-[0_0_80px_80px_#000000] rounded-[32px]">
              <div className="w-full h-full relative overflow-hidden rounded-[32px]">
                {slidesData.map((slide, index) => (
                  <div 
                    key={index} 
                    className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
                    style={{ 
                      opacity: index === activeIndex ? 1 : 0,
                      zIndex: index === activeIndex ? 10 : 0,
                      pointerEvents: index === activeIndex ? 'auto' : 'none'
                    }}
                  >
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      className="w-full h-full object-contain"
                      muted
                      playsInline
                      loop
                      preload={index === activeIndex ? "auto" : "none"}
                    >
                      <source src={slide.videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                      <source src={slide.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
