import React from 'react';
import { motion } from 'framer-motion';

const benefitCards = [
  {
    id: 1,
    title: "Estrutura de marketing sem o custo de contratar um time interno",
    text: "Estratégia, tráfego, criativo e análise de dados trabalhando juntos. Pelo custo de uma fração de uma equipe própria."
  },
  {
    id: 2,
    title: "Você recupera o tempo que gastaria tentando entender algoritmo",
    text: "Enquanto cuidamos da execução, você foca em vender e atender. Que é o que só você sabe fazer."
  },
  {
    id: 3,
    title: "Crescimento que se sustenta, não que depende de um golpe de sorte",
    text: "O Loop garante que cada ciclo aprende com o anterior. O resultado de hoje melhora o resultado de amanhã."
  },
  {
    id: 4,
    title: "Um parceiro que você consegue realmente falar",
    text: "Sem central de atendimento genérica. Você tem contato direto com quem está tocando sua conta."
  }
];

export default function BenefitsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="beneficios" className="py-16 sm:py-24 relative overflow-hidden bg-brand-yellow select-none border-b border-black/5">
      
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
      
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Título de Seção (Clareza total sobre onde seu dinheiro está indo) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-brand-black tracking-tight leading-tight">
            Clareza total sobre onde seu dinheiro está indo
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-800 font-semibold leading-relaxed max-w-2xl mx-auto">
            Chega de relatório que ninguém entende.
            <br />
            Você sabe exatamente quantos leads, quantas vendas e qual custo. Mês a mês.
          </p>
        </div>
 
        {/* Grid de 4 Cards em 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {benefitCards.map((card, index) => (
            <motion.div
              key={card.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              className="bg-white border border-black/5 rounded-[32px] p-6 sm:p-8 text-left transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 relative z-10 flex flex-col justify-start h-full"
            >
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-black tracking-tight leading-snug mb-3 md:min-h-[56px]">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-semibold">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
