import React from 'react';
import { Award, ShieldCheck, Users } from 'lucide-react';

export default function CredibilitySection({ onOpenModal }) {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-neutral-200/40 select-none">
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Título de Seção (Preto no Branco com Quebra de Linha para alinhar "Conhecimento comprovado.") */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-3">Bastidores</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black">
            Estrutura enxuta.
            <br />
            Conhecimento comprovado.
          </h2>
          <p className="mt-4 text-sm text-neutral-500 font-medium max-w-md mx-auto">
            Entenda quem estará cuidando das suas campanhas e por que nossa operação boutique protege seu caixa.
          </p>
        </div>

        {/* Bloco Dividido em Cards Claras */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LADO ESQUERDO: Quem Somos & Selos (Espaço utilizado de forma inteligente e integrada) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Card Quem Toca (White style glass - flex-1 expande para eliminar o espaço vazio de forma harmônica) */}
            <div className="p-8 text-left bg-white border border-neutral-200/70 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-black font-extrabold text-xs uppercase tracking-widest">
                  <Users className="w-5 h-5 text-neutral-500" />
                  <span>Quem toca sua conta</span>
                </div>
                <h3 className="text-xl font-bold text-brand-black tracking-tight">
                  Gestores sênior dedicados, não estagiários.
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
                  Antes de fundar a Loop Flow, nossa equipe de gestores atuais passou <strong>5 anos</strong> gerindo tráfego pago e estratégia de marketing para diversos negócios, sendo <strong>2 deles dedicados como consultores diretos da Meta</strong> atendendo mais de 300 clientes de diversos nichos.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed font-semibold">
                  A Loop Flow nasceu justamente da experiência de ver pequenas e médias empresas pagando caro por atendimento genérico de agência grande, onde sua conta é repassada para estagiários lerem relatórios prontos.
                </p>
              </div>
            </div>

            {/* Certificação Badge (Fundo Claro com Selo Oficial da Meta) */}
            <div className="p-6 flex flex-col sm:flex-row items-center gap-6 text-left bg-white border border-neutral-200/70 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              {/* Badge Oficial com o Logotipo da Meta em Azul */}
              <div className="relative w-16 h-16 shrink-0 bg-neutral-50 border border-neutral-200/50 rounded-2xl flex items-center justify-center shadow-sm">
                <svg 
                  className="w-9 h-9 text-[#0064e0]"
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
                </svg>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0064e0]">
                  <Award className="w-3.5 h-3.5 text-[#0064e0]" />
                  <span>Certificação Oficial</span>
                </div>
                <h4 className="text-sm font-bold text-brand-black tracking-tight">
                  Meta Certified Ads Product Developer
                </h4>
                <p className="text-xs text-neutral-400 font-semibold leading-relaxed">
                  Garantia de conhecimento avançado da API de Conversões da Meta, pixel de rastreamento e configuração técnica de servidores de anúncios.
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Condição de Entrada / Baixo Risco (Animação Ampliada de Alto Luxo) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Card Condição de Entrada (Fundo Preto com Borda Fina de Luxo e Backlight Azul) */}
            <div className="p-8 text-left space-y-6 bg-brand-black border border-white/10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex-1 flex flex-col justify-between relative overflow-hidden group">
              
              {/* Retroiluminação de fundo azul suave no topo direito do card */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-blue-400 font-extrabold text-xs uppercase tracking-widest">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span>Condição de Entrada</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Você testa com menos risco.
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-semibold">
                  Por sermos uma operação nova, o primeiro trimestre tem investimento promocional. Se o resultado for satisfatório, seguimos juntos no valor padrão a partir do 4º mês.
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed font-semibold">
                  Você não está apostando no escuro — está testando a nossa metodologia pagando menos até ter certeza de que funciona para você.
                </p>
              </div>

              {/* PAINEL MINIMALISTA PREMIUM AMPLIADO (Escalado para preenchimento de layout com total nitidez) */}
              <div className="w-full h-[170px] my-1 flex items-center justify-center relative select-none">
                
                {/* Brilho esférico difuso de fundo */}
                <div 
                  className="absolute w-36 h-36 rounded-full opacity-[0.08] blur-xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #FFCC00 0%, transparent 70%)',
                    top: '15%',
                    left: '38%'
                  }}
                />

                <svg className="w-full h-full max-w-[340px] overflow-visible" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Degradê fino para a linha de conexão */}
                    <linearGradient id="glowPathGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#52525B" />
                      <stop offset="50%" stopColor="#FFCC00" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>

                    {/* Filtro de brilho sutil para a esfera flutuante */}
                    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <style>{`
                    @keyframes rotateRing {
                      to {
                        transform: rotate(360deg);
                      }
                    }
                    .ring-spin {
                      animation: rotateRing 20s linear infinite;
                      transform-origin: 160px 55px;
                    }
                  `}</style>

                  {/* Caminho Curvo do Fluxo Principal (Glow largo de base) */}
                  <path 
                    d="M 45 75 C 90 35, 130 35, 160 55 C 190 75, 230 75, 275 40" 
                    stroke="url(#glowPathGrad)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    opacity="0.15"
                    filter="url(#softGlow)"
                  />

                  {/* Caminho Curvo do Fluxo Principal (Linha nítida de topo) */}
                  <path 
                    id="flowCurve"
                    d="M 45 75 C 90 35, 130 35, 160 55 C 190 75, 230 75, 275 40" 
                    stroke="url(#glowPathGrad)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    opacity="0.55"
                  />

                  {/* Desvio do Risco (Vermelho Sutil) */}
                  <path 
                    d="M 105 46 Q 130 50, 140 86 T 170 94" 
                    stroke="#EF4444" 
                    strokeWidth="1" 
                    strokeDasharray="3, 4"
                    opacity="0.4"
                  />

                  {/* Ponto de Fluxo Flutuante (Orbe de Luz Animado com animateMotion) */}
                  <circle r="4" fill="#FFCC00" filter="url(#softGlow)">
                    <animateMotion 
                      dur="3.5s" 
                      repeatCount="indefinite" 
                      path="M 45 75 C 90 35, 130 35, 160 55 C 190 75, 230 75, 275 40"
                    />
                  </circle>

                  {/* Nó de Risco Minimizado (X discreto com anel vermelho) */}
                  <g transform="translate(165, 89)">
                    <circle cx="5" cy="5" r="6" fill="#0A0A0A" stroke="#EF4444" strokeWidth="1" />
                    <path d="M 2.5 2.5 L 7.5 7.5 M 7.5 2.5 L 2.5 7.5" stroke="#EF4444" strokeWidth="1.2" />
                  </g>
                  <text x="182" y="97" fill="#EF4444" fontSize="8" className="font-mono font-bold" opacity="0.65" letterSpacing="0.5">
                    RISCO MINIMIZADO
                  </text>

                  {/* NÓ 1: Verba (Círculo Fino com Ponto Central) */}
                  <g transform="translate(45, 75)">
                    <circle cx="0" cy="0" r="9" fill="#0A0A0A" stroke="#52525b" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="3" fill="#71717a" />
                    <text x="0" y="-14" fill="#71717a" fontSize="8" className="font-mono font-bold" textAnchor="middle">VERBA</text>
                  </g>

                  {/* NÓ 2: Boutique Loop Flow (Círculo com Anel Pontilhado Fino em Rotação) */}
                  <g>
                    <circle 
                      cx="160" cy="55" r="14" 
                      fill="none" 
                      stroke="#FFCC00" 
                      strokeWidth="1" 
                      strokeDasharray="3, 4" 
                      className="ring-spin" 
                    />
                    <g transform="translate(160, 55)">
                      <circle cx="0" cy="0" r="8" fill="#0A0A0A" stroke="#FFCC00" strokeWidth="1.2" />
                      <circle cx="0" cy="0" r="2.5" fill="#FFCC00" />
                    </g>
                    <text x="160" y="24" fill="#FFCC00" fontSize="8" className="font-mono font-bold" textAnchor="middle" letterSpacing="0.5">LOOP LF</text>
                  </g>

                  {/* NÓ 3: Retorno (Círculo Fino com Pulso Suave) */}
                  <g transform="translate(275, 40)">
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#10B981" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2.5s' }} opacity="0.25" />
                    <circle cx="0" cy="0" r="9" fill="#0A0A0A" stroke="#10B981" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="3.5" fill="#10B981" filter="url(#softGlow)" />
                    <text x="0" y="-14" fill="#10B981" fontSize="8" className="font-mono font-bold" textAnchor="middle">RETORNO</text>
                  </g>
                </svg>
              </div>
              
              {/* Rodapé do Card adaptado para fundo preto com texto claro */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                  Quer falar diretamente conosco?
                </span>
                <button
                  onClick={onOpenModal}
                  className="text-xs font-black text-white hover:text-brand-yellow transition-all uppercase tracking-widest border-b border-white hover:border-brand-yellow pb-0.5 cursor-pointer"
                >
                  Agendar conversa →
                </button>
              </div>
            </div>
            
          </div>
          
        </div>

      </div>
    </section>
  );
}
