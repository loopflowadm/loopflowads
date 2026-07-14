import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    let target = 0;
    let prefix = '';
    let suffix = '';
    let isDecimal = false;

    if (value.includes('R$')) {
      prefix = 'R$ ';
      target = parseFloat(value.replace('R$', '').replace(/\./g, '').trim());
    } else if (value.includes('x')) {
      suffix = 'x';
      target = parseFloat(value.replace('x', '').trim());
      isDecimal = true;
    } else {
      target = parseInt(value.replace(/\D/g, ''), 10);
    }

    const start = 0;
    const duration = 1200; // 1.2 seconds animation
    const startTime = performance.now();

    function updateNumber(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress);
      const current = start + (target - start) * easeProgress;

      if (prefix) {
        const formatted = Math.floor(current).toLocaleString('pt-BR');
        setDisplayValue(`${prefix}${formatted}`);
      } else if (isDecimal) {
        setDisplayValue(`${current.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(Math.floor(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

const metricsData = [
  {
    id: 'leads',
    title: 'Leads',
    value: '247',
    change: '+18%',
    isPositive: true,
    // Coordenadas da linha do gráfico (viewBox 0 0 120 35)
    path: 'M 5,28 L 25,24 L 45,28 L 65,18 L 85,20 L 105,8 L 115,4',
    // Bounding box fechada para o preenchimento de gradiente
    fillPath: 'M 5,28 L 25,24 L 45,28 L 65,18 L 85,20 L 105,8 L 115,4 L 115,35 L 5,35 Z',
    points: [
      { cx: 5, cy: 28 },
      { cx: 25, cy: 24 },
      { cx: 45, cy: 28 },
      { cx: 65, cy: 18 },
      { cx: 85, cy: 20 },
      { cx: 105, cy: 8 },
      { cx: 115, cy: 4 }
    ]
  },
  {
    id: 'receita',
    title: 'Receita',
    value: 'R$ 128.450',
    change: '+21%',
    isPositive: true,
    path: 'M 5,26 L 25,24 L 45,18 L 65,22 L 85,15 L 105,10 L 115,4',
    fillPath: 'M 5,26 L 25,24 L 45,18 L 65,22 L 85,15 L 105,10 L 115,4 L 115,35 L 5,35 Z',
    points: [
      { cx: 5, cy: 26 },
      { cx: 25, cy: 24 },
      { cx: 45, cy: 18 },
      { cx: 65, cy: 22 },
      { cx: 85, cy: 15 },
      { cx: 105, cy: 10 },
      { cx: 115, cy: 4 }
    ]
  },
  {
    id: 'cac',
    title: 'CAC',
    value: 'R$ 42',
    change: '-16%',
    isPositive: false, // CAC reduzindo é positivo comercialmente, mas o gráfico é descendente
    path: 'M 5,6 L 15,22 L 35,24 L 55,24 L 75,25 L 95,25 L 115,29',
    fillPath: 'M 5,6 L 15,22 L 35,24 L 55,24 L 75,25 L 95,25 L 115,29 L 115,35 L 5,35 Z',
    points: [
      { cx: 5, cy: 6 },
      { cx: 15, cy: 22 },
      { cx: 35, cy: 24 },
      { cx: 55, cy: 24 },
      { cx: 75, cy: 25 },
      { cx: 95, cy: 25 },
      { cx: 115, cy: 29 }
    ]
  },
  {
    id: 'roas',
    title: 'ROAS',
    value: '5.9x',
    change: '+12%',
    isPositive: true,
    path: 'M 5,30 L 25,22 L 45,23 L 65,16 L 85,18 L 105,12 L 115,4',
    fillPath: 'M 5,30 L 25,22 L 45,23 L 65,16 L 85,18 L 105,12 L 115,4 L 115,35 L 5,35 Z',
    points: [
      { cx: 5, cy: 30 },
      { cx: 25, cy: 22 },
      { cx: 45, cy: 23 },
      { cx: 65, cy: 16 },
      { cx: 85, cy: 18 },
      { cx: 105, cy: 12 },
      { cx: 115, cy: 4 }
    ]
  }
];

export default function MetricDashboard() {
  return (
    <div className="w-full bg-brand-yellow/5 border border-brand-yellow/40 shadow-[0_15px_40px_rgba(255,204,0,0.05)] rounded-[24px] p-5 md:p-6 text-left select-none relative overflow-hidden">
      
      {/* Listagem das Métricas */}
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-brand-yellow/20 w-full gap-4 md:gap-0">
        {metricsData.map((metric, idx) => {
          // Commercial success colors (CAC going down is good, so CAC reduction should be green)
          const isGoodChange = metric.isPositive || metric.id === 'cac';
          const changeColor = isGoodChange ? 'text-emerald-600' : 'text-neutral-500';

          return (
            <motion.div 
              key={metric.id} 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="py-3.5 md:py-3 md:px-5 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0 flex items-center md:items-start justify-between md:flex-col gap-2 md:gap-3 flex-1 w-full hover:bg-brand-yellow/10 rounded-2xl transition-colors duration-200 cursor-pointer group"
            >
              {/* Esquerda/Topo: Identificação da Métrica */}
              <div className="flex flex-col justify-center">
                <span className="text-[10px] uppercase font-black text-brand-black/50 tracking-wider">
                  {metric.title}
                </span>
                <span className="text-xl sm:text-[1.38rem] font-black text-brand-black tracking-tight mt-0.5 leading-none transition-colors group-hover:text-brand-yellow-hover">
                  <AnimatedNumber value={metric.value} />
                </span>
              </div>

              {/* Direita/Base: Gráfico Animado e Indicador de Mudança */}
              <div className="flex flex-col items-end md:items-start justify-center gap-1.5 md:w-full">
                {/* Seta e Percentual */}
                <div className={`flex items-center gap-0.5 text-[10px] sm:text-xs font-black ${changeColor}`}>
                  {metric.isPositive ? (
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-1" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-y-1" />
                  )}
                  <span>{metric.change}</span>
                </div>

                {/* Sparkline Animada Ampliada com Glow e Degradê */}
                <div className="w-[110px] h-[32px] relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 120 35">
                    <defs>
                      {/* Gradiente de fundo sob a linha */}
                      <linearGradient id={`grad-${metric.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isGoodChange ? "#FFCC00" : "#D1D5DB"} stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>

                      {/* Gradiente do traço do gráfico (ouro para verde/cinza) */}
                      <linearGradient id={`stroke-${metric.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E6B800" />
                        <stop offset="50%" stopColor="#FFCC00" />
                        <stop offset="100%" stopColor={isGoodChange ? "#10B981" : "#9CA3AF"} />
                      </linearGradient>

                      {/* Filtro de brilho sutil */}
                      <filter id={`glow-${metric.id}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Preenchimento sob a linha (fade-in) */}
                    <motion.path
                      d={metric.fillPath}
                      fill={`url(#grad-${metric.id})`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.12 + 0.3 }}
                    />

                    {/* Linha Principal (Desenho dinâmico pathLength com Glow) */}
                    <motion.path
                      d={metric.path}
                      fill="none"
                      stroke={`url(#stroke-${metric.id})`}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#glow-${metric.id})`}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.12 }}
                    />

                    {/* Orb de luz animado viajando na curva */}
                    <circle r="2" fill="#FFFFFF" filter={`url(#glow-${metric.id})`}>
                      <animateMotion 
                        dur="2.4s" 
                        repeatCount="indefinite" 
                        path={metric.path}
                      />
                      <animate 
                        attributeName="opacity" 
                        values="0;1;1;0" 
                        dur="2.4s" 
                        repeatCount="indefinite" 
                      />
                    </circle>

                    {/* Vértices / Pontinhos de dados (Fade-in com escala) */}
                    {metric.points.map((pt, pIdx) => {
                      const isLast = pIdx === metric.points.length - 1;
                      if (!isLast && pIdx !== 0 && pIdx % 2 !== 0) return null; // Apenas alguns pontos para manter limpo

                      return (
                        <motion.circle
                          key={pIdx}
                          cx={pt.cx}
                          cy={pt.cy}
                          r={isLast ? 3.5 : 1.8}
                          fill={isLast ? (isGoodChange ? "#10B981" : "#9CA3AF") : "#FFCC00"}
                          filter={isLast ? `url(#glow-${metric.id})` : undefined}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 150, 
                            damping: 10, 
                            delay: idx * 0.12 + (pIdx * 0.06) 
                          }}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Base: Status de Atualização com Bolinha Pulsante Verde */}
      <div className="flex items-center gap-1.5 mt-4 pt-3.5 border-t border-brand-yellow/20 text-[9px] uppercase font-black text-brand-black/40 tracking-wider">
        <span className="w-2.5 h-2.5 relative flex">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>Atualizado agora há pouco</span>
      </div>

    </div>
  );
}
