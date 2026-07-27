import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { BrainGear, DataFlow, Checklist, ToolOrbit, ParticlesBG, SafeZone } from './SceneComponents';
import { DESIGN_TOKENS } from './design-tokens';

const COLORS = DESIGN_TOKENS.colors;
const SCENE_DURATION = 150;
const TRANSITION_DURATION = 15;

export interface AIAgentVideoProps {
  companyName?: string;
  segment?: string;
}

export const AIAgentVideo: React.FC<AIAgentVideoProps> = ({ companyName = 'LoopFlow', segment = 'Agência' }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <ParticlesBG />
      <TransitionSeries>
        {/* SCENE 01: HOOK */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <SafeZone>
            <h1 style={{ fontSize: '78px', fontWeight: 900, color: COLORS.accent, marginBottom: '40px', letterSpacing: '-2px' }}>
              {companyName.toUpperCase()} AI
            </h1>
            <BrainGear />
            <p style={{ fontSize: '44px', fontWeight: 600, marginTop: '60px', lineHeight: 1.2, maxWidth: '800px' }}>
              Automação inteligente de alta performance para <span style={{ color: COLORS.accent }}>{segment}</span>.
            </p>
          </SafeZone>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* SCENE 02: PERCEPTION */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <SafeZone>
            <h1 style={{ fontSize: '72px', fontWeight: 800, marginBottom: '60px' }}>
              CAPTURA DE LEADS
            </h1>
            <DataFlow />
            <p style={{ fontSize: '42px', marginTop: '60px', color: COLORS.muted, fontWeight: 500 }}>
              Análise e nutrição inteligente de dados em <span style={{ color: COLORS.text }}>Tempo Real</span>.
            </p>
          </SafeZone>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* SCENE 03: REASONING */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <SafeZone>
            <h1 style={{ fontSize: '72px', fontWeight: 800, marginBottom: '80px' }}>
              FLUXO DE CONVERSÃO
            </h1>
            <Checklist />
            <p style={{ fontSize: '40px', marginTop: '80px', opacity: 0.8, fontStyle: 'italic' }}>
              Estruturação automática de propostas e fechamentos rápidos.
            </p>
          </SafeZone>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* SCENE 04: ACTION */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <SafeZone>
            <h1 style={{ fontSize: '72px', fontWeight: 800, marginBottom: '60px' }}>
              FERRAMENTAS CONECTADAS
            </h1>
            <ToolOrbit />
            <p style={{ fontSize: '42px', marginTop: '80px', fontWeight: 600 }}>
              Integração completa com Meta Ads, CRM e WhatsApp.
            </p>
          </SafeZone>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* SCENE 05: CONCLUSION */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION + 30}>
          <SafeZone>
            <h1 style={{ fontSize: '96px', fontWeight: 950, color: COLORS.accent, marginBottom: '60px' }}>
              RESULTADOS ESCALÁVEIS
            </h1>
            <div style={{ fontSize: '150px', margin: '40px 0', filter: 'drop-shadow(0 0 40px rgba(250, 204, 21, 0.4))' }}>⚡</div>
            <p style={{ fontSize: '48px', fontWeight: 800, maxWidth: '800px', lineHeight: 1.1 }}>
              O motor de prospecção da <span style={{ color: COLORS.accent }}>{companyName}</span>.
            </p>
          </SafeZone>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
