import React from 'react';

const words = [
  "DIAGNÓSTICO",
  "ESTRATÉGIA",
  "EXECUÇÃO",
  "OTIMIZAÇÃO",
  "RETORNO",
  "CRESCIMENTO",
  "LEADS",
  "VENDAS",
  "LOOP FLOW"
];

export default function Marquee() {
  // Duplicamos a lista de palavras para fazer o loop infinito sem cortes visuais
  const displayList = [...words, ...words, ...words];

  return (
    <div className="w-full overflow-hidden bg-brand-black border-y border-white/10 py-6 sm:py-8 select-none">
      <div className="animate-marquee flex items-center gap-12 sm:gap-20">
        {displayList.map((word, index) => {
          const isYellow = index % 3 === 0; // Algumas palavras em Amarelo para quebrar a monotonia
          return (
            <span
              key={index}
              className={`text-4xl sm:text-7xl font-black tracking-tighter shrink-0 ${
                isYellow 
                  ? "text-brand-yellow font-black" 
                  : "text-outline font-black"
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}
