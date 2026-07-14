import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Já contratei agência antes e não funcionou. Por que seria diferente?",
    answer: "A maioria das agências tradicionais vende campanhas prontas e criativos padronizados. A Loop Flow entrega processo comercial — com diagnóstico profundo antes de qualquer real investido em tráfego. Você entende os gargalos e só decide seguir conosco após aprovar o plano estratégico desenhado para o seu momento."
  },
  {
    question: "Não tenho orçamento grande para marketing comercial. É viável?",
    answer: "Nossa call de diagnóstico gratuito serve exatamente para isso: entender a saúde financeira e a capacidade de investimento do seu negócio. Propomos um plano escalável e compatível com a sua realidade atual, evitando gastos desnecessários. Não vendemos pacotes genéricos fechados."
  },
  {
    question: "Não tenho tempo para gerenciar mais uma frente de trabalho.",
    answer: "Esse é o principal motivo pelo qual você nos contrata. Você não vai gerenciar nada operacional. Nós assumimos toda a execução, criação, análise e configurações técnicas. Daremos visibilidade total a você através de um painel de indicadores direto, sem demandar mais reuniões ou e-mails na sua rotina."
  },
  {
    question: "Meu nicho é muito específico. O método funciona para mim?",
    answer: "O Método Loop Flow é focado em engenharia de processos e testes científicos. Ele já foi testado com sucesso em negócios locais, clínicas de saúde, escritórios de advocacia, e-commerce e indústrias B2B. A estratégia de canais muda conforme o público, mas o processo de validar dados e escalar o que dá certo nunca muda."
  },
  {
    question: "Vou ficar preso a um contrato de fidelidade longo?",
    answer: "Não trabalhamos com pegadinhas comerciais ou letras miúdas. Todos os termos contratuais, flexibilidade e prazos são alinhados com total transparência e concordância mútua durante a nossa call de diagnóstico, garantindo uma parceria saudável."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-brand-black border-t border-white/5">
      
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Título de Seção */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gray font-bold block mb-3">Transparência</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes & Objeções
          </h2>
        </div>

        {/* Lista de Acordeões macOS style */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className="rounded-2xl overflow-hidden border border-white/5 bg-brand-dark/20 hover:border-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 px-6 text-left cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-brand-yellow' : 'text-neutral-500'}`} />
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-300 ${isOpen ? 'rotate-45 text-brand-yellow border-brand-yellow/30' : ''}`}>
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Resposta Animada */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-brand-gray leading-relaxed font-semibold bg-white/[0.01]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
