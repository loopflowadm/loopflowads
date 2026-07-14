import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Check, Sparkles, Send, ArrowLeft, Video } from 'lucide-react';
import Logo from './Logo';

const availableTimes = ["09:00", "10:30", "14:00", "15:30", "17:00"];

const getNextBusinessDays = () => {
  const days = [];
  const today = new Date();
  let current = new Date(today);
  
  current.setDate(current.getDate() + 1);

  while (days.length < 5) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
};

const formatSelectedDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
};

export default function SchedulingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    revenue: '',
    bottleneck: '',
  });

  const businessDays = getNextBusinessDays();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBottleneckSelect = (tag) => {
    setFormData(prev => ({ ...prev, bottleneck: tag }));
  };

  const handleNextStep = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.whatsapp && formData.revenue && formData.bottleneck) {
      setStep(3);
    }
  };



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

          {/* Modal Container macOS/Cal.com style (w-full md:max-w-3xl no desktop para acomodar a sidebar) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-xl md:max-w-3xl bg-brand-black border border-white/10 rounded-[28px] overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] z-10 flex flex-col md:flex-row max-h-[90vh]"
          >
            
            {/* SIDEBAR DO CAL.COM (Exibida na esquerda no desktop, contendo o logotipo da agência) */}
            <div className="hidden md:flex flex-col w-[260px] bg-black/35 border-r border-white/5 p-8 text-left justify-between shrink-0 select-none">
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
              
              <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">
                Loop Flow Boutique
              </div>
            </div>

            {/* CONTEÚDO PRINCIPAL (Calendário e Qualificação na direita) */}
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Header da área de conteúdo */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-dark/40 shadow-sm">
                <div className="flex items-center gap-2">
                  {step === 2 && (
                    <button 
                      type="button"
                      onClick={handlePrevStep}
                      className="p-1.5 rounded-lg text-brand-gray hover:text-white hover:bg-white/5 mr-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <div>
                    <h3 className="font-extrabold text-white text-base tracking-tight">
                      {step === 1 && "Escolha Data e Horário"}
                      {step === 2 && "Qualificação Rápida"}
                      {step === 3 && "Agendamento Solicitado!"}
                    </h3>
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">
                      {step === 1 && "Etapa 1 de 2 · Call de Diagnóstico"}
                      {step === 2 && "Etapa 2 de 2 · Perfil do Negócio"}
                      {step === 3 && "Finalizado"}
                    </span>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-brand-light-gray/50 hover:bg-brand-light-gray flex items-center justify-center border border-white/5 text-brand-gray hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Corpo da área de conteúdo */}
              <div className="p-6 overflow-y-auto flex-1 text-left">
                
                {/* ETAPA 1 */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-xs text-brand-gray leading-relaxed font-medium">
                      Selecione um dos dias úteis disponíveis abaixo e o horário de sua preferência. A call dura em média 30 minutos via Google Meet.
                    </p>

                    {/* Lista de Dias */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">
                        Dias Disponíveis
                      </label>
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
                        {businessDays.map((date, idx) => {
                          const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                          const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
                          const dayNum = date.getDate();

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleDateSelect(date)}
                              className={`py-2.5 px-1 sm:p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-sm ${
                                isSelected
                                  ? "bg-brand-yellow border-brand-yellow text-brand-black font-bold scale-105 shadow-[0_0_12px_rgba(255,204,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]"
                                  : "bg-brand-light-gray/30 border-white/5 text-slate-300 hover:border-white/12"
                              }`}
                            >
                              <span className={`text-[9px] xs:text-[10px] uppercase ${isSelected ? 'text-brand-black font-bold' : 'text-neutral-500'}`}>
                                {dayName}
                              </span>
                              <span className="text-sm xs:text-base font-bold">{dayNum}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Lista de Horários */}
                    {selectedDate && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">
                          Horários Disponíveis ({selectedDate.toLocaleDateString('pt-BR', { month: 'long' })})
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {availableTimes.map((time, idx) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2.5 px-1.5 sm:px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-brand-yellow border-brand-yellow text-brand-black shadow-md shadow-brand-yellow/10"
                                    : "bg-brand-light-gray/20 border-white/5 text-slate-300 hover:border-white/10"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Botão Próximo */}
                    <div className="pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!selectedDate || !selectedTime}
                        className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-sm ${
                          selectedDate && selectedTime
                            ? "bg-brand-yellow text-brand-black hover:bg-brand-yellow-hover hover:shadow-[0_8px_20px_rgba(255,204,0,0.25)] active:scale-[0.98]"
                            : "bg-brand-light-gray/20 border border-white/5 text-neutral-600 cursor-not-allowed"
                        }`}
                      >
                        <span>Continuar para Qualificação</span>
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 2 */}
                {step === 2 && (
                  <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5 text-left"
                  >
                    <div className="p-3.5 bg-brand-light-gray/30 border border-white/5 rounded-xl text-[11px] text-brand-gray flex items-center gap-2 shadow-inner">
                      <Clock className="w-4 h-4 text-brand-yellow shrink-0" />
                      <span>
                        Horário Pré-selecionado: <strong className="text-white">{formatSelectedDate(selectedDate)} às {selectedTime}</strong>
                      </span>
                    </div>

                    {/* Nome */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        Seu Nome Completo *
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: João Silva"
                        className="w-full bg-brand-light-gray/30 border border-white/5 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:shadow-[0_0_15px_rgba(255,204,0,0.1)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-700 outline-none transition-all"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1.5">
                      <label htmlFor="whatsapp" className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        WhatsApp para Contato *
                      </label>
                      <input
                        required
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full bg-brand-light-gray/30 border border-white/5 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:shadow-[0_0_15px_rgba(255,204,0,0.1)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-700 outline-none transition-all"
                      />
                    </div>

                    {/* Faturamento Mensal */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        Qual o Faturamento Mensal aproximado da empresa? *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Até R$ 20k", "R$ 20k a R$ 50k", "R$ 50k a R$ 100k", "Acima de R$ 100k"].map((revenueOpt) => {
                          const isSel = formData.revenue === revenueOpt;
                          return (
                            <button
                              key={revenueOpt}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, revenue: revenueOpt }))}
                              className={`p-3 rounded-xl border text-xs font-semibold text-left cursor-pointer transition-all ${
                                isSel 
                                  ? "bg-brand-yellow/10 border-brand-yellow text-brand-yellow shadow-inner" 
                                  : "bg-brand-light-gray/10 border-white/5 text-brand-gray hover:border-white/10"
                              }`}
                            >
                              {revenueOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Principal Gargalo */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        Qual o principal gargalo do seu marketing hoje? *
                      </label>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-2">
                        {["Falta de leads", "Baixa conversão comercial", "Verba desperdiçada", "Falta de tempo", "Outro"].map((tag) => {
                          const isSel = formData.bottleneck === tag;
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleBottleneckSelect(tag)}
                              className={`py-2 px-3 sm:px-4 rounded-full border text-xs cursor-pointer transition-all text-center justify-center flex items-center ${
                                isSel 
                                  ? "bg-brand-yellow border-brand-yellow text-brand-black font-bold shadow-md" 
                                  : "bg-brand-light-gray/20 border-white/5 text-brand-gray hover:border-white/10"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Botão Enviar */}
                    <div className="pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={!formData.name || !formData.whatsapp || !formData.revenue || !formData.bottleneck}
                        className={`w-full py-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-sm ${
                          formData.name && formData.whatsapp && formData.revenue && formData.bottleneck
                            ? "bg-brand-yellow text-brand-black hover:bg-brand-yellow-hover hover:shadow-[0_8px_20px_rgba(255,204,0,0.25)]"
                            : "bg-brand-light-gray/20 border border-white/5 text-neutral-600 cursor-not-allowed"
                        }`}
                      >
                        <span>Confirmar Diagnóstico Gratuito</span>
                        <Send className="w-4 h-4 text-brand-black" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* ETAPA 3 */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 flex flex-col items-center text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-brand-yellow/20 rounded-full animate-ping opacity-75" />
                      <Check className="w-8 h-8 text-brand-yellow z-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-yellow-hover uppercase tracking-widest bg-brand-yellow/10 px-2.5 py-1 rounded-full border border-brand-yellow/10">
                        <Sparkles className="w-3 h-3" />
                        <span>PRÉ-RESERVA REALIZADA</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white">Excelente, {formData.name.split(' ')[0]}!</h3>
                      <p className="text-sm text-brand-gray leading-relaxed max-w-sm font-medium">
                        Seu diagnóstico foi agendado para <strong className="text-white">{formatSelectedDate(selectedDate)} às {selectedTime}</strong>.
                      </p>
                    </div>

                    <div className="p-4 bg-brand-light-gray/20 border border-white/5 rounded-2xl text-xs text-brand-gray leading-relaxed max-w-sm font-medium">
                      Enviaremos uma mensagem de confirmação no WhatsApp <strong className="text-white">{formData.whatsapp}</strong> em até 2 horas úteis para confirmar a call e enviar o link da reunião (Google Meet).
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setStep(1);
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setFormData({ name: '', whatsapp: '', revenue: '', bottleneck: '' });
                      }}
                      className="w-full sm:w-auto py-3 px-8 bg-brand-light-gray hover:bg-brand-dark border border-white/5 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                    >
                      Fechar Janela
                    </button>
                  </motion.div>
                )}

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
