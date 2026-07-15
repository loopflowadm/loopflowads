import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Video } from 'lucide-react';
import Logo from './Logo';

export default function SchedulingModal({ isOpen, onClose }) {
  // Parâmetros do Calendly:
  // hide_event_type_details = 1 (Remove os detalhes do evento e logo do Calendly internos, já que temos na nossa sidebar)
  // hide_gdpr_banner = 1 (Oculta o banner de cookies interno)
  const calendlyUrl = "https://calendly.com/loopflowsolutions/30min?hide_event_type_details=1&hide_gdpr_banner=1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container estilo macOS/Cal.com */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-xl md:max-w-4xl bg-brand-black border border-white/10 rounded-[28px] overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] z-10 flex flex-col md:flex-row max-h-[90vh] h-[650px]"
          >
            
            {/* SIDEBAR DO CAL.COM (Exibida na esquerda no desktop, contendo o logotipo da agência) */}
            <div className="hidden md:flex flex-col w-[280px] bg-black/35 border-r border-white/5 p-8 text-left justify-between shrink-0 select-none">
              <div className="space-y-6">
                {/* Logo oficial no topo da sidebar */}
                <Logo className="h-7 w-auto" color="#FFCC00" />
                
                <div className="space-y-2 pt-4">
                  <span className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Loop Flow</span>
                  <h4 className="text-lg font-black text-white leading-tight">
                    Call de Diagnóstico Comercial
                  </h4>
                </div>

                <div className="space-y-3 pt-2 text-xs text-neutral-400 font-semibold">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span>30 minutos</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Video className="w-4 h-4 text-neutral-500" />
                    <span>Google Meet (Vídeo)</span>
                  </div>
                </div>
                
                <p className="text-[11px] text-neutral-500 leading-relaxed font-semibold pt-2">
                  Análise técnica das suas campanhas de tráfego, funil de conversão e processos comerciais de vendas.
                </p>
              </div>
            </div>

            {/* CONTEÚDO PRINCIPAL (Calendly Embed na direita - Ajustado para fundo branco para fundir com o Calendly gratuito) */}
            <div className="flex-1 flex flex-col overflow-hidden h-full bg-white">
              
              {/* Header da área de conteúdo (Estilo claro integrado com o widget) */}
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50 shrink-0">
                <div>
                  <h3 className="font-extrabold text-neutral-900 text-base tracking-tight">
                    Agende sua Sessão
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">
                    Selecione o melhor dia e horário
                  </span>
                </div>
                
                <button 
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-neutral-150 hover:bg-neutral-200 flex items-center justify-center border border-neutral-200 text-neutral-500 hover:text-neutral-900 transition-all cursor-pointer shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Iframe do Calendly integrado */}
              <div className="flex-1 w-full bg-white overflow-hidden">
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Agendamento Calendly"
                />
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

