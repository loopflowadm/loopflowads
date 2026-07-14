import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Cpu, RefreshCw, Layers } from 'lucide-react';
import Symbol from './Symbol';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar o plugin
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Diagnóstico",
    subtitle: "Identificação de Gargalos",
    description: "Entendemos seu negócio, seu momento comercial e onde está o gargalo real que impede as vendas de crescerem. Nem sempre o problema está onde parece estar.",
    icon: Search,
    color: "#FFF5C2",
    cx: 150,
    cy: 40
  },
  {
    id: 2,
    title: "Estratégia",
    subtitle: "Planejamento Focado em ROI",
    description: "Montamos um plano com prioridade clara: o que fazer primeiro, com qual verba alocada e qual resultado exato esperar. Sem desperdício ou ações aleatórias.",
    icon: Compass,
    color: "#FFE066",
    cx: 260,
    cy: 150
  },
  {
    id: 3,
    title: "Execução",
    subtitle: "Mão na Massa Especializada",
    description: "Colocamos a operação para rodar: tráfego pago de alto desempenho (Ads), criativos focados em conversão, landing pages velozes e estruturação de funil.",
    icon: Cpu,
    color: "#FFCC00",
    cx: 150,
    cy: 260
  },
  {
    id: 4,
    title: "Otimização",
    subtitle: "Melhoria Contínua de Conversão",
    description: "Medimos tudo, testamos variações e ajustamos os ponteiros semanalmente. Em seguida, reiniciamos o ciclo — sempre otimizando, nunca estagnando.",
    icon: RefreshCw,
    color: "#E6B800",
    cx: 40,
    cy: 150
  }
];

export default function MethodSection() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(() => {
    // 1. Fazer o SVG de loop rotacionar de acordo com o scroll (Scrubbing)
    gsap.to(svgRef.current, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // 2. Alternar os passos automaticamente à medida que o usuário rola o bloco principal
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 40%",
      end: "bottom 60%",
      onUpdate: (self) => {
        const prog = self.progress;
        if (prog < 0.25) {
          setActiveStep(1);
        } else if (prog >= 0.25 && prog < 0.5) {
          setActiveStep(2);
        } else if (prog >= 0.5 && prog < 0.75) {
          setActiveStep(3);
        } else {
          setActiveStep(4);
        }
      }
    });
  }, { scope: containerRef });

  const activeData = steps.find(s => s.id === activeStep);

  return (
    <section id="metodo" ref={containerRef} className="py-24 relative overflow-hidden bg-brand-black/20 border-y border-white/5">
      {/* Luz radial atrás do ciclo */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-yellow-glow rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Título de Seção */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="text-xs uppercase tracking-widest text-brand-gray font-bold block mb-3">Metodologia</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            O Método Loop Flow: um motor comercial rodando em ciclo contínuo
          </h2>
          <p className="mt-4 text-brand-gray text-sm sm:text-base font-semibold max-w-2xl leading-relaxed">
            Marketing de agência renomada não vive de campanhas isoladas. Marketing é um processo de melhoria contínua. Nós implementamos um ecossistema previsível e otimizado no seu negócio.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: Loop Circular Interativo (macOS Style) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] select-none">
              
              {/* SVG de Base para o Anel e Fluxos */}
              <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                {/* Linha circular base */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="110" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.04)" 
                  strokeWidth="2" 
                />
                
                {/* Feixe de luz correndo (Animação de Flow em Amarelo) */}
                <motion.circle 
                  cx="150" 
                  cy="150" 
                  r="110" 
                  fill="none" 
                  stroke="url(#yellowGradient)" 
                  strokeWidth="3.5"
                  strokeDasharray="90 300"
                  animate={{ strokeDashoffset: [0, -390] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />

                {/* Linha que conecta o centro ao nó ativo */}
                <motion.line
                  x1="150"
                  y1="150"
                  x2={activeData.cx}
                  y2={activeData.cy}
                  stroke="rgba(255, 204, 0, 0.25)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                
                {/* Gradiente Amarelo */}
                <defs>
                  <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE066" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#FFCC00" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FACC15" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Botões dos Nós */}
              {steps.map((step) => {
                const isSelected = activeStep === step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    style={{ 
                      left: `${step.cx - 20}px`, 
                      top: `${step.cy - 20}px` 
                    }}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg cursor-pointer ${
                      isSelected 
                        ? "bg-brand-yellow text-brand-black border-brand-yellow scale-110 shadow-[0_0_20px_rgba(255,204,0,0.4),0_0_0_1px_rgba(255,255,255,0.2)_inset] z-20" 
                        : "bg-brand-black text-brand-gray border-white/10 hover:border-white/20 hover:text-white z-10"
                    }`}
                  >
                    <span className="text-xs font-extrabold">{step.id}</span>
                  </button>
                );
              })}

              {/* Centro do Círculo macOS Style */}
              <div className="absolute inset-0 m-auto w-32 h-32 rounded-full glass flex flex-col items-center justify-center border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center px-2"
                  >
                    <div className="mb-1">
                      <Symbol className="w-9 h-9" color={activeData.color} />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Passo {activeStep}</span>
                    <span className="text-xs font-bold text-white truncate max-w-[100px]">{activeData.title}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <p className="mt-8 text-center text-xs text-neutral-500 font-semibold italic">
              O ciclo rotaciona com o scroll da página. Você também pode clicar nos números.
            </p>
          </div>

          {/* LADO DIREITO: Cards de Explicação dos Passos (macOS Style) */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step) => {
              const isSelected = activeStep === step.id;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left select-none relative overflow-hidden group shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] ${
                    isSelected
                      ? "bg-brand-dark/50 border-white/12 shadow-[0_12px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
                      : "bg-transparent border-transparent hover:bg-brand-light-gray/20 hover:border-white/5"
                  }`}
                >
                  {/* Linha vertical de progresso seletivo */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Número e Ícone */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300 ring-1 ring-inset ring-white/5 ${
                      isSelected 
                        ? "bg-brand-yellow text-brand-black border-brand-yellow ring-brand-yellow/30" 
                        : "bg-brand-dark text-brand-gray border-white/5 group-hover:border-white/10 group-hover:text-white"
                    }`}>
                      <StepIcon className="w-5 h-5" />
                    </div>

                    {/* Textos */}
                    <div className="space-y-1.5 w-full">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? "text-brand-yellow" : "text-brand-gray"}`}>
                          Fase 0{step.id}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                        <span className="text-xs text-brand-gray font-medium">{step.subtitle}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {step.title}
                      </h3>

                      {/* Descrição Expansível */}
                      {isSelected ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-brand-gray leading-relaxed pt-1 font-medium"
                        >
                          {step.description}
                        </motion.p>
                      ) : (
                        <p className="text-sm text-neutral-500 truncate max-w-[350px] sm:max-w-xl group-hover:text-neutral-400 transition-colors font-medium">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Resumo do Posicionamento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 glass rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/8 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-yellow-glow rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-yellow tracking-wider bg-brand-yellow/10 px-3 py-1.5 rounded-full border border-brand-yellow/10">
                <Layers className="w-3.5 h-3.5" />
                <span>SEU TIME DE MARKETING TERCEIRIZADO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Fazemos o trabalho duro. Você foca em fechar negócios.
              </h3>
              <p className="text-sm text-brand-gray leading-relaxed font-medium">
                Nós funcionamos de fato como o seu <strong>departamento de marketing terceirizado</strong>. 
                Fazemos o diagnóstico prévio, desenhamos a estratégia personalizada, executamos as campanhas de tráfego pago (Ads) 
                e monitoramos cada indicador de vendas. Sem central de atendimento fria ou processos burocráticos.
              </p>
            </div>
            
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <div className="py-5 px-6 rounded-2xl bg-brand-dark/70 border border-white/5 text-left space-y-2.5 shadow-md shadow-black/25">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Divisão de Foco</span>
                <div className="space-y-1.5 text-sm font-bold">
                  <div className="flex justify-between gap-12 text-brand-gray">
                    <span>Você foca em:</span>
                    <span className="text-white">Vender & Atender</span>
                  </div>
                  <div className="flex justify-between gap-12 text-brand-gray">
                    <span>Nós focamos em:</span>
                    <span className="text-brand-yellow">Motor de Leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
