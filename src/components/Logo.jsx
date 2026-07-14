import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ className = "h-10 w-auto", color = "#FFCC00", showShine = false, onShineComplete, delay = 0 }) {
  // O delay base de início na Splash Screen
  const baseDelay = showShine ? 0.15 : delay;

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Container SVG animado: overflow: visible adicionado para garantir que rotações de elementos não sofram corte visual */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3655 1909"
        className="w-full h-full"
        role="img"
        aria-label="LoopFlow Logo"
        style={{ overflow: 'visible' }} // Evita cortes das bordas rígidas do SVG nas animações
        animate={showShine ? {
          scale: [1, 1, 1.03, 1],
          filter: [
            "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))",
            "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))",
            "brightness(1.15) drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
            "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))"
          ]
        } : {}}
        transition={showShine ? {
          duration: 1.25,
          times: [0, 0.65, 0.8, 1],
          ease: "easeInOut",
          delay: baseDelay
        } : {}}
      >
        <g fill={color}>
          {/* Letra L */}
          <motion.path 
            d="M0 877l797 0c-33,-65 -56,-135 -67,-209l-494 0 0 -668 -236 0 0 877z"
            initial={showShine ? { opacity: 0, y: 20, scale: 0.95 } : {}}
            animate={showShine ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={showShine ? { type: "spring", stiffness: 120, damping: 15, delay: baseDelay + 0.2 } : {}}
          />
          
          {/* Letra O1 */}
          <motion.polygon 
            points="0,1909 228,1909 228,1614 534,1614 534,1407 228,1407 228,1242 602,1242 602,1033 0,1033 "
            initial={showShine ? { opacity: 0, y: 20, scale: 0.95 } : {}}
            animate={showShine ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={showShine ? { type: "spring", stiffness: 120, damping: 15, delay: baseDelay + 0.3 } : {}}
          />
          
          {/* Letra P */}
          <motion.path 
            d="M686 1909l809 0c-89,-51 -165,-123 -222,-208l-351 0 0 -668 -236 0 0 876z"
            initial={showShine ? { opacity: 0, y: 20, scale: 0.95 } : {}}
            animate={showShine ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={showShine ? { type: "spring", stiffness: 120, damping: 15, delay: baseDelay + 0.4 } : {}}
          />
          
          {/* Letras F-l-o-w */}
          <motion.path 
            d="M2925 877l228 0 0 -268 99 0c68,0 127,-11 176,-32 49,-22 88,-55 116,-101 27,-45 41,-100 41,-164 0,-37 -4,-71 -12,-102 -7,-31 -20,-60 -37,-85 -17,-26 -37,-49 -62,-67 -25,-18 -55,-33 -90,-43 -35,-10 -74,-15 -117,-15l-342 0 0 877zm228 -471l0 -200 62 0c40,0 72,10 93,29 22,19 33,43 33,71 0,32 -11,57 -35,74 -23,18 -53,26 -92,26l-61 0z"
            initial={showShine ? { opacity: 0, y: 20, scale: 0.95 } : {}}
            animate={showShine ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={showShine ? { type: "spring", stiffness: 120, damping: 15, delay: baseDelay + 0.5 } : {}}
          />
          
          {/* Letra O2 */}
          <motion.path 
            d="M3405 1033l-127 488 -3 0 -115 -488 -247 0 -117 488 -3 0 -112 -429c-58,46 -123,83 -194,107 -2,1 -11,4 -18,6l218 704 213 0 137 -533 3 0 130 533 213 0 272 -876 -250 0z"
            initial={showShine ? { opacity: 0, y: 20, scale: 0.95 } : {}}
            animate={showShine ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={showShine ? { type: "spring", stiffness: 120, damping: 15, delay: baseDelay + 0.6 } : {}}
          />
          
          {/* Símbolo do Loop Central - originX/Y 0.5 adicionado para garantir que a rotação ocorra exatamente sobre o próprio centro do caminho, sem translações ou cortes */}
          <motion.path 
            d="M1687 545c-15,-152 -144,-272 -301,-272 -166,0 -301,135 -301,302 0,154 115,280 263,299 -66,69 -118,152 -150,244 -225,-78 -386,-291 -386,-543 0,-317 257,-575 574,-575 308,0 558,241 575,544 1,32 0,57 6,89 28,143 153,244 296,244 167,0 302,-135 302,-302 0,-288 -368,-410 -542,-183 -27,-94 -74,-180 -136,-252 368,-319 951,-59 951,435 0,459 -501,710 -856,501 -210,-122 -459,28 -459,258 0,167 135,302 302,302 217,0 360,-222 278,-418 93,23 192,26 286,8 68,353 -202,683 -564,683 -401,0 -674,-398 -542,-768 50,-140 137,-233 260,-308 99,-60 155,-171 144,-288z"
            initial={showShine ? { opacity: 0, scale: 0.15, rotate: -150, originX: 0.5, originY: 0.5 } : {}}
            animate={showShine ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={showShine ? { type: "spring", stiffness: 90, damping: 14, delay: baseDelay } : {}}
            onAnimationComplete={showShine ? onShineComplete : undefined}
          />
        </g>
      </motion.svg>
    </div>
  );
}
