import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DESIGN_TOKENS, getSpringEntrance } from './design-tokens';

const COLORS = DESIGN_TOKENS.colors;

export const SafeZone: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div
      style={{
        padding: `${DESIGN_TOKENS.safeZones.top}px ${DESIGN_TOKENS.safeZones.horizontal}px ${DESIGN_TOKENS.safeZones.bottom}px ${DESIGN_TOKENS.safeZones.horizontal}px`,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.text,
        textAlign: 'center',
        fontFamily: DESIGN_TOKENS.fonts.primary,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const BrainGear: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = getSpringEntrance(frame, fps);
  const rotation = interpolate(frame, [0, 300], [0, 360]);

  return (
    <div style={{ transform: `scale(${spr})`, filter: 'drop-shadow(0 20px 40px rgba(250, 204, 21, 0.4))' }}>
      <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
        <path
          d="M50 5 L55 15 L65 12 L68 22 L78 22 L80 32 L90 35 L88 45 L95 50 L88 55 L90 65 L80 68 L78 78 L68 80 L65 90 L55 87 L50 97 L45 87 L35 90 L32 80 L22 78 L20 68 L10 65 L12 55 L5 50 L12 45 L10 35 L20 32 L22 22 L32 22 L35 12 L45 15 Z"
          stroke={COLORS.accent}
          strokeWidth="4"
          fill={`${COLORS.accent}22`}
          style={{ transformOrigin: 'center', transform: `rotate(${rotation}deg)` }}
        />
        <path
          d="M30 50 C30 35 40 30 50 30 C60 30 70 35 70 50 C70 65 60 70 50 70 C40 70 30 65 30 50"
          stroke={COLORS.text}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M50 30 L50 70 M30 50 L70 50"
          stroke={COLORS.text}
          strokeWidth="2"
          opacity="0.3"
        />
        <circle cx="42" cy="45" r="4" fill={COLORS.text} />
        <circle cx="58" cy="45" r="4" fill={COLORS.text} />
      </svg>
    </div>
  );
};

export const DataFlow: React.FC = () => {
  const frame = useCurrentFrame();
  
  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const offset = i * 5;
    const progress = ((frame + offset) % 60) / 60;
    const distance = interpolate(progress, [0, 1], [450, 0]);
    const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = interpolate(progress, [0, 1], [0.5, 1.5]);
    
    return (
      <circle
        key={i}
        cx={500 + Math.cos(angle) * distance}
        cy={500 + Math.sin(angle) * distance}
        r={15 * scale}
        fill={COLORS.accent}
        opacity={opacity}
      />
    );
  });

  return (
    <svg width="600" height="600" viewBox="0 0 1000 1000">
      <defs>
        <radialGradient id="centerGrad">
          <stop offset="0%" stopColor={COLORS.text} />
          <stop offset="100%" stopColor={COLORS.accent} />
        </radialGradient>
      </defs>
      <circle cx="500" cy="500" r="60" fill={COLORS.text} style={{ filter: 'drop-shadow(0 0 15px white)' }} />
      {particles}
    </svg>
  );
};

export const Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = ["Define Objetivo", "Gera Plano de Ação", "Executa Tarefas"];

  return (
    <div style={{ textAlign: 'left', width: '100%', maxWidth: '800px' }}>
      {items.map((text, i) => {
        const itemFrame = frame - i * 15;
        const spr = spring({ frame: itemFrame, fps, config: DESIGN_TOKENS.spring.default });
        const dashOffset = interpolate(itemFrame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });

        return (
          <div key={i} style={{ 
            display: 'flex', alignItems: 'center', margin: '40px 0', 
            opacity: spr, transform: `translateX(${interpolate(spr, [0, 1], [-80, 0])}px)`,
            backgroundColor: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke={COLORS.success}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset={dashOffset}
              />
            </svg>
            <span style={{ fontSize: '54px', fontWeight: 800, marginLeft: '30px' }}>{text}</span>
          </div>
        );
      })}
    </div>
  );
};

export const ToolOrbit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = [
    { icon: '🔍', label: 'Search' },
    { icon: '💻', label: 'Code' },
    { icon: '🗄️', label: 'Data' },
    { icon: '📧', label: 'Email' }
  ];

  return (
    <div style={{ position: 'relative', width: '600px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
        width: '160px', height: '160px', borderRadius: '50%', backgroundColor: COLORS.accent, color: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px',
        boxShadow: `0 0 60px ${COLORS.accent}66`, zIndex: 10,
        transform: `scale(${spring({ frame, fps, config: DESIGN_TOKENS.spring.bouncy })})`
      }}>
        🤖
      </div>
      
      <div style={{ position: 'absolute', width: '450px', height: '450px', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '50%' }} />

      {tools.map((tool, i) => {
        const rotation = (frame / 1.5) + (i * (360 / tools.length));
        const radius = 225;
        const x = Math.cos(rotation * Math.PI / 180) * radius;
        const y = Math.sin(rotation * Math.PI / 180) * radius;
        
        return (
          <div key={i} style={{
            position: 'absolute',
            transform: `translate(${x}px, ${y}px)`,
            width: '120px', height: '120px', borderRadius: '40px',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ fontSize: '50px' }}>{tool.icon}</span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: COLORS.muted, marginTop: '8px' }}>{tool.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export const ParticlesBG: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const x = (i * 137) % 1080;
    const y = (2100 - (frame * 3 + i * 250) % 2300);
    const size = 10 + (i % 30);
    const opacity = interpolate(Math.sin(frame / 20 + i), [-1, 1], [0.05, 0.2]);
    return (
      <circle key={i} cx={x} cy={y} r={size} fill={COLORS.accent} opacity={opacity} />
    );
  });

  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
      {particles}
    </svg>
  );
};
