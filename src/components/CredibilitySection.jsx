import React from 'react';
import { Award, ShieldCheck, Users } from 'lucide-react';

export default function CredibilitySection({ onOpenModal }) {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white border-t border-neutral-200/40 select-none">
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Título de Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight md:whitespace-nowrap">
            Estrutura enxuta. Conhecimento comprovado.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Nós funcionamos como o seu <strong className="text-brand-black font-extrabold">departamento de marketing terceirizado</strong>.
            <br className="hidden md:inline" />
            Você foca naquilo que faz de melhor: fechar negócios e atender bem seus clientes.
          </p>
        </div>

        {/* Bloco Dividido em Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LADO ESQUERDO: Quem toca sua conta & Certificados */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Card Quem Toca */}
            <div className="p-6 sm:p-8 text-left bg-white border border-neutral-200/70 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-neutral-500 shrink-0" />
                <h3 className="text-xl font-bold text-brand-black tracking-tight">
                  Quem toca sua conta
                </h3>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-neutral-500 leading-relaxed font-semibold">
                <p>
                  Antes de fundar a <strong className="text-brand-black font-extrabold">Loop Flow</strong>, nossa equipe de gestores atuais passaram 5 anos gerindo tráfego pago e estratégia de marketing para diversos negócios, sendo 2 deles dedicados como consultores diretos da Meta atendendo mais de 300 clientes de diversos nichos.
                </p>
                <p>
                  A <strong className="text-brand-black font-extrabold">Loop Flow</strong> nasceu justamente da experiência de ver pequenas empresas pagando caro por atendimento genérico de agência grande.
                </p>
              </div>
            </div>

            {/* Certificação Card com badges circulares */}
            <div className="p-6 sm:p-8 text-left bg-white border border-neutral-200/70 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-center">
              <div className="flex items-center gap-2.5 text-brand-black font-bold text-base tracking-tight mb-6">
                <Award className="w-5 h-5 text-[#0064e0] shrink-0" />
                <span>Certificado pelas próprias plataformas que operamos</span>
              </div>

              {/* Selos / Badges em formato de imagem oficial (Grid responsivo cobrindo todo o espaço com maior preenchimento) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full mt-6">
                {/* Meta Media Buying */}
                <div className="aspect-square bg-white rounded-3xl flex items-center justify-center shadow-md border border-neutral-200/50 hover:scale-105 transition-transform duration-300 select-none overflow-hidden p-3">
                  <img src="/badge_1.png" alt="Meta Certified Media Buying Professional" className="w-full h-full object-contain" />
                </div>

                {/* Meta Digital Marketing */}
                <div className="aspect-square bg-white rounded-3xl flex items-center justify-center shadow-md border border-neutral-200/50 hover:scale-105 transition-transform duration-300 select-none overflow-hidden p-3">
                  <img src="/badge_2.png" alt="Meta Certified Digital Marketing Associate" className="w-full h-full object-contain" />
                </div>

                {/* Meta Media Measurement */}
                <div className="aspect-square bg-white rounded-3xl flex items-center justify-center shadow-md border border-neutral-200/50 hover:scale-105 transition-transform duration-300 select-none overflow-hidden p-3">
                  <img src="/badge_3.png" alt="Meta Certified Media Measurement Specialist" className="w-full h-full object-contain" />
                </div>

                {/* Google Ads */}
                <div className="aspect-square bg-white rounded-3xl flex items-center justify-center shadow-md border border-neutral-200/50 hover:scale-105 transition-transform duration-300 select-none overflow-hidden p-3">
                  <img src="/badge_4.png" alt="Google Ads Search Certified" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: Condição de Entrada / Baixo Risco (Fundo Preto, com botão amarelo) */}
          <div className="lg:col-span-5 flex flex-col justify-between items-stretch">
            
            {/* Card Condição de Entrada */}
            <div className="p-6 sm:p-8 text-left space-y-6 bg-brand-black border border-white/10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex-1 flex flex-col justify-between relative overflow-hidden group">
              
              {/* Retroiluminação de fundo azul suave no topo direito do card */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-brand-yellow font-extrabold text-xs uppercase tracking-widest mb-4">
                    <ShieldCheck className="w-5 h-5 text-brand-yellow" />
                    <span>Condição especial de Entrada</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Você testa com menos risco
                  </h3>
                  
                  <p className="text-sm text-neutral-400 leading-relaxed font-semibold mt-4">
                    Por sermos uma operação nova, o primeiro trimestre tem investimento promocional. Se o resultado for satisfatório, seguimos juntos no valor padrão a partir do <strong>3º mês</strong>. Você não está apostando no escuro, está testando a metodologia pagando menos até ter certeza de que funciona pra você.
                  </p>
                </div>
                
                <p className="text-[11px] text-neutral-500 leading-relaxed font-medium mt-6 italic border-t border-white/5 pt-4">
                  Importante: isso é uma condição comercial de entrada, não uma promessa de resultado. Você quem define os critérios "satisfatórios" para evitar ruído de expectativa lá na frente.
                </p>
              </div>

              {/* Botão Amarelo de Agendar Conversa na base do card */}
              <div className="pt-6 relative z-10 w-full mt-auto">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="w-full py-4.5 px-6 bg-brand-yellow text-brand-black font-extrabold rounded-2xl shadow-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 text-sm font-black"
                >
                  Agendar uma conversa →
                </button>
              </div>
            </div>
            
          </div>
          
        </div>

      </div>
    </section>
  );
}
