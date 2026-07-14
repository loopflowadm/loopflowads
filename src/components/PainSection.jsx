import React from 'react';
import { motion } from 'framer-motion';

const pains = [
  {
    id: 1,
    title: "Freelancer que Some",
    text: "O freelancer que cuidava dos seus anúncios sumiu (de novo). E ninguém sabe explicar o que ele estava fazendo."
  },
  {
    id: 2,
    title: "Métricas de Vaidade",
    text: "Você já contratou agência antes. Recebeu relatório bonito, cheio de gráfico. Mas no fim do mês, o telefone não tocou mais que antes."
  },
  {
    id: 3,
    title: "Concorrente Dominando",
    text: "Seu concorrente está em todo lugar: Instagram, Google, indicações. E você não sabe como ele faz tudo isso rodar sozinho."
  },
  {
    id: 4,
    title: "Sobrecarga de Tempo",
    text: "Você simplesmente não tem tempo ou paciência. Para aprender a gerenciar campanha, testar criativo e ficar lendo métrica."
  },
  {
    id: 5,
    title: '"Achismos" de Retorno',
    text: "Gasta com marketing todo o mês. Mas na hora de explicar o retorno financeiro, só sobra palpites ou silêncio."
  }
];

export default function PainSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="dores" className="py-16 sm:py-24 relative overflow-hidden bg-brand-black select-none border-b border-white/5">
      
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
        
        {/* Layout em Grid Estático de 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card de Título (Sem borda, texto branco) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            className="bg-transparent rounded-[32px] p-6 md:p-10 flex flex-col justify-center min-h-0 md:min-h-[360px] text-left"
          >
            <h2 className="text-4xl sm:text-[2.8rem] lg:text-[3.2rem] font-black text-brand-yellow tracking-tight leading-[1.05]">
              Você reconhece algum desses sinais?
            </h2>
          </motion.div>
          
          {/* Cards de Dores */}
          {pains.map((pain, index) => {
            return (
              <motion.div
                key={pain.id}
                custom={index + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariants}
                className="bg-[#0e0e0e] border border-white/10 rounded-[32px] p-6 sm:p-8 md:p-10 text-left transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:border-brand-yellow/40 hover:bg-[#121212] flex flex-col gap-6 min-h-0 md:min-h-[360px] group relative"
              >
                {/* Tag superior de numeração clássica de luxo */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-brand-yellow text-sm font-bold tracking-widest whitespace-nowrap">0{index + 1}</span>
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

        </div>

        {/* Conclusão Copyscripting Premium no Rodapé (Texto Centralizado e Dividido em Duas Linhas) */}
        <div className="mt-20 max-w-4xl mx-auto rounded-3xl p-6 md:p-8 bg-[#121212] border border-white/5 flex flex-col items-center justify-center shadow-2xl text-center gap-6">
          <div className="text-center w-full">
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-semibold leading-relaxed">
              "Cada real gasto sem clareza é um real que você não vai recuperar.
              <br />
              E o problema não é a falta de verba. <span className="text-brand-yellow font-black">É a falta de processo.</span>"
            </p>
          </div>
          
          <a 
            href="#metodo" 
            className="inline-flex items-center gap-2 text-sm md:text-base font-extrabold text-neutral-400 hover:text-brand-yellow transition-all group mt-1"
          >
            <span>Veja como solucionamos isso</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
