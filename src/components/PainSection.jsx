import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform, animate } from 'framer-motion';

const pains = [
  {
    id: 1,
    title: "Achismo no Retorno",
    text: "Você gasta com marketing todo mês — mas na hora de explicar o retorno financeiro real, só sobra palpite ou silêncio."
  },
  {
    id: 2,
    title: "Freelancer que Some",
    text: "O freelancer que cuidava dos seus anúncios sumiu (de novo). E agora ninguém na empresa sabe explicar o que ele estava fazendo."
  },
  {
    id: 3,
    title: "Métricas de Vaidade",
    text: "Você já contratou agência antes. Recebeu relatório bonito, cheio de gráfico colorido — mas no fim do mês, o telefone não tocou mais que antes."
  },
  {
    id: 4,
    title: "Concorrente Dominando",
    text: "Seu concorrente está em todo lugar: Instagram, Google, indicações. E você não sabe como ele consegue fazer isso rodar de forma consistente."
  },
  {
    id: 5,
    title: "Sobrecarga de Tempo",
    text: "Você simplesmente não tem tempo — nem paciência — para aprender algoritmo, testar criativos e ficar lendo métricas complexas."
  }
];

export default function PainSection() {
  const containerRef = useRef(null);
  const esteiraRef = useRef(null);
  
  // Limite de arraste calculado dinamicamente
  const [dragLimit, setDragLimit] = useState(0);

  // Valor de movimento da esteira (Framer Motion)
  const x = useMotionValue(0);
  
  // Captura da velocidade instantânea do arraste
  const xVelocity = useVelocity(x);

  // Efeito de Skew (Distorção Lateral) e Rotação baseados na velocidade de arraste (Tentwenty Style)
  const skewX = useTransform(xVelocity, [-1800, 1800], [-6, 6]);
  const rotateZ = useTransform(xVelocity, [-1800, 1800], [-4, 4]);

  // Efeito da Barra de Progresso do Scrollbar na base (Math.max evita divisão por zero se dragLimit for 0)
  const scrollbarLeft = useTransform(x, [-Math.max(1, dragLimit), 0], ["80%", "0%"]);

  // Estados para o Cursor customizado magnético
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // ResizeObserver moderno para recalcular o limite de arraste com total fidelidade em tempo real
  useEffect(() => {
    if (!containerRef.current || !esteiraRef.current) return;

    const updateLimit = () => {
      const limit = esteiraRef.current.scrollWidth - containerRef.current.offsetWidth;
      setDragLimit(limit > 0 ? limit : 0);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateLimit();
    });

    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(esteiraRef.current);

    updateLimit();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Detectar se é um dispositivo touch (mouse desabilitado)
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(!window.matchMedia('(pointer: fine)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Capturar coordenadas do mouse relativas ao contêiner
  const handleMouseMove = (e) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Navegação suave por botões com alinhamento inteligente (Snap) ao card mais próximo
  const handleScroll = (direction) => {
    const cardWidth = window.innerWidth < 640 ? 324 : 384; // largura do card (300/360) + gap (24)
    
    // Pega a posição atual e descobre qual card está mais próximo
    const currentX = x.get();
    const currentIndex = Math.round(-currentX / cardWidth);
    
    // Determina o próximo card alvo
    let nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    
    // Limita o index de destino (são 5 pains + 1 card final de Alerta = 6 cards no total)
    const maxIndex = pains.length; 
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > maxIndex) nextIndex = maxIndex;

    // Próxima posição exata de snap
    let newX = -nextIndex * cardWidth;

    // Trava nos limites reais da esteira
    if (newX < -dragLimit) newX = -dragLimit;
    if (newX > 0) newX = 0;
    
    animate(x, newX, {
      type: "spring",
      stiffness: 130,
      damping: 22
    });
  };

  return (
    <section id="dores" className="py-24 relative overflow-hidden bg-brand-black select-none border-b border-white/5">
      
      {/* Grid de fundo sutil em branco sobre preto */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Layout de Duas Colunas (Tentwenty Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* COLUNA ESQUERDA (Título Principal Fixo e Setas) */}
          <div className="lg:col-span-4 text-left flex flex-col justify-between h-auto lg:h-[380px] z-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-yellow font-extrabold block mb-3">
                Diagnóstico Prévio
              </span>
              
              {/* Título Principal Ampliado para maior presença e contraste */}
              <h2 className="text-4xl sm:text-[2.8rem] lg:text-[3.2rem] font-black text-white tracking-tight leading-[1.05] max-w-[360px] mb-6">
                Sua empresa enfrenta algum desses problemas de marketing?
              </h2>
              
              <a 
                href="#metodo" 
                className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-brand-yellow transition-all group mt-2"
              >
                <span>Veja como solucionamos isso</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </a>
            </div>
 
            {/* Setas de Controle Direcional */}
            <div className="flex gap-2.5 mt-8">
              <button 
                onClick={() => handleScroll('left')} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/40 transition-colors cursor-pointer bg-neutral-900/50 hover:bg-neutral-900 active:scale-[0.95] text-lg font-bold"
                aria-label="Cards Anteriores"
              >
                ←
              </button>
              <button 
                onClick={() => handleScroll('right')} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-brand-yellow hover:border-brand-yellow/40 transition-colors cursor-pointer bg-neutral-900/50 hover:bg-neutral-900 active:scale-[0.95] text-lg font-bold"
                aria-label="Próximos Cards"
              >
                →
              </button>
            </div>
          </div>
 
          {/* COLUNA DIREITA (Esteira Deslizante Otimizada com cursor oculto para custom follow cursor) */}
          <div 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setIsGrabbed(false); }}
            className="lg:col-span-8 w-full relative overflow-hidden lg:hover:cursor-none"
          >
            
            {/* Custom Follow Cursor (Indicador Flutuante Magnético - Card Retangular com Bordas Arredondadas) */}
            {!isTouchDevice && isHovering && (
              <motion.div
                style={{ 
                  left: mousePos.x, 
                  top: mousePos.y,
                  x: '-50%',
                  y: '-50%',
                  pointerEvents: 'none'
                }}
                animate={{
                  scale: isGrabbed ? 0.85 : 1,
                  borderColor: isGrabbed ? 'rgba(255, 204, 0, 0.4)' : 'rgba(255, 255, 255, 0.15)'
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="absolute z-30 pointer-events-none select-none font-black text-xl bg-neutral-950/90 border border-white/15 rounded-xl px-4 py-2 text-brand-yellow shadow-[0_12px_24px_rgba(0,0,0,0.6)] flex items-center justify-center gap-1.5"
              >
                <span className="leading-none tracking-wider">←</span>
                <span className="leading-none tracking-wider">→</span>
              </motion.div>
            )}

            {/* Gradiente de Mascaramento da Borda Direita (Luxo Visual de Sumiço) */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-black to-transparent pointer-events-none z-20 hidden md:block" />
 
            {/* Container da Esteira do Framer Motion (dragElastic={0} impede que a esteira passe das bordas ao arrastar) */}
            <motion.div
              ref={esteiraRef}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: -dragLimit, right: 0 }}
              dragElastic={0}
              style={{ x, touchAction: 'pan-y' }}
              onDragStart={() => setIsGrabbed(true)}
              onDragEnd={() => setIsGrabbed(false)}
              className="flex gap-6 py-4 px-1 select-none pointer-events-auto cursor-none active:cursor-none"
            >
              {pains.map((pain, index) => {
                return (
                  <motion.div
                    key={pain.id}
                    style={{ skewX, rotate: rotateZ, transformOrigin: 'center bottom' }}
                    className="w-[300px] sm:w-[360px] shrink-0 bg-[#0e0e0e] border border-white/10 rounded-[32px] p-8 sm:p-10 text-left transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:border-brand-yellow/40 hover:bg-[#121212] flex flex-col gap-6 min-h-[340px] sm:min-h-[360px] group relative select-none pointer-events-auto cursor-none active:cursor-none"
                  >
                    {/* Tag superior de numeração clássica de luxo */}
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono text-brand-yellow text-sm font-semibold">/ 0{index + 1}</span>
                    </div>
 
                    {/* Conteúdo de Texto e Título */}
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-brand-yellow transition-colors duration-300 leading-tight">
                        {pain.title}
                      </h3>
                      <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-semibold">
                        {pain.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
 
              {/* CARD FINAL DE ADVERTÊNCIA: Destaque Amarelo LoopFlow */}
              <motion.div
                style={{ skewX, rotate: rotateZ, transformOrigin: 'center bottom' }}
                className="w-[300px] sm:w-[360px] shrink-0 bg-brand-yellow border border-black/10 rounded-[32px] p-8 sm:p-10 text-left transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex flex-col gap-6 min-h-[340px] sm:min-h-[360px] relative group select-none pointer-events-auto cursor-none active:cursor-none"
              >
                {/* Tag superior preta */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-brand-black/70 text-sm font-semibold">/ 06</span>
                </div>
 
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight leading-tight">
                    O Custo da Inércia
                  </h3>
                  <p className="text-base sm:text-lg text-brand-black/85 leading-relaxed font-bold">
                    Ficar empurrando com a barriga custa mais caro do que contratar profissionais. A cada ciclo de hesitação, seu concorrente ganha mais terreno.
                  </p>
                  <a 
                    href="#metodo" 
                    className="inline-flex items-center gap-1 text-sm text-brand-black font-black underline hover:no-underline transition-all mt-1"
                  >
                    Veja como solucionamos isso →
                  </a>
                </div>
              </motion.div>
            </motion.div>
 
            {/* Barra de Progresso Horizontal Customizada (Tentwenty Style) */}
            <div className="w-full h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden relative max-w-md mx-auto lg:mx-0">
              <motion.div 
                style={{ left: scrollbarLeft, width: "20%" }}
                className="absolute top-0 bottom-0 bg-brand-yellow rounded-full"
              />
            </div>
          </div>
 
        </div>
 
        {/* Conclusão Copyscripting Premium no Rodapé (Texto Centralizado e Dividido em Duas Linhas) */}
        <div className="mt-20 max-w-4xl mx-auto rounded-3xl p-6 md:p-8 bg-[#121212] border border-white/5 flex items-center justify-center shadow-2xl text-center">
          <div className="text-center w-full">
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-semibold leading-relaxed">
              "Cada real gasto sem clareza é um real que você não vai recuperar.
              <br />
              E o problema não é a falta de verba. <span className="text-brand-yellow font-black">É a falta de processo.</span>"
            </p>
          </div>
        </div>
 
      </div>
    </section>
  );
}
