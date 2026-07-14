import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Settings, TrendingUp, Calendar } from 'lucide-react';
import Symbol from './Symbol';

const steps = [
  {
    id: 1,
    title: "1. Diagnóstico Estratégico",
    text: "Entendemos seu negócio antes de qualquer anúncio: histórico, margem, ticket médio, sazonalidade, concorrência e o que já foi tentado.",
    icon: Search
  },
  {
    id: 2,
    title: "2. Estrutura de Aquisição",
    text: "Revisamos a esteira completa: criativos, segmentação, landing page e rastreamento de dados. Montamos um plano com prioridade clara.",
    icon: Filter
  },
  {
    id: 3,
    title: "3. Execução e Otimização",
    text: "Colocamos a mão na massa: ciclos constantes de teste, leitura de dados e ajustes. Relatórios profissionais e reuniões periódicas.",
    icon: Settings
  },
  {
    id: 4,
    title: "4. Escala e Expansão",
    text: "Com a base validada, evoluímos juntos: novos públicos, formatos e frentes do ecossistema Loop Flow.",
    icon: TrendingUp
  }
];

const elementVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function MethodSection({ onOpenModal }) {

  return (
    <section id="metodo" className="py-16 sm:py-24 relative overflow-hidden bg-brand-yellow select-none border-b border-black/5">
      
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
      
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Título e Subtítulo da Seção */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={elementVariants}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight leading-tight mb-6">
            O Método LOOP FLOW
          </h2>
          <p className="text-sm sm:text-lg text-neutral-900 leading-relaxed font-semibold">
            Marketing que funciona não é uma campanha. Marketing é um <span className="font-extrabold text-black">ciclo comercial</span>.
            <br />
            Implementamos um processo de vendas na internet em 4 passos:
          </p>
        </motion.div>

        {/* Passos do Método em Cards Brancos de Alta Performance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={elementVariants}
                className="bg-white border border-black/5 rounded-[32px] p-6 sm:p-8 flex flex-col items-center text-center gap-6 relative shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Ícone Circular Centrado */}
                <div className="w-16 h-16 rounded-full bg-brand-black flex items-center justify-center text-brand-yellow shadow-lg shrink-0 mx-auto">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Seta direcional entre os passos (Desktop - Centralizada na altura do Card) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute left-[calc(100%_+_12px)] -translate-x-1/2 top-1/2 -translate-y-1/2 text-brand-black pointer-events-none select-none z-20">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 5l7 7-7 7v-5H3v-4h11V5z" />
                    </svg>
                  </div>
                )}

                {/* Conteúdo de Texto Centrado */}
                <div className="space-y-3 flex flex-col items-center text-center flex-1 justify-start">
                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-brand-black tracking-tight uppercase leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[1.05rem] text-neutral-600 leading-relaxed font-semibold text-center">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ciclo Contínuo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={elementVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16"
        >
          <Symbol className="w-10 h-10 shrink-0" color="#0A0A0A" />
          <span className="text-base sm:text-lg font-black text-brand-black text-center sm:text-left">
            CICLO CONTÍNUO – Ao validar a base, o processo se repete e evoluímos.
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={elementVariants}
          className="flex justify-center"
        >
          <button
            type="button"
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

      </div>
    </section>
  );
}
