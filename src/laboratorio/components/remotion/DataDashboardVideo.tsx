import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { DESIGN_TOKENS, getSpringEntrance } from './design-tokens';
import { BarChart, DonutChart, LineChart } from './ChartComponents';
import { CountUp } from './InteractionComponents';

const COLORS = DESIGN_TOKENS.colors;
const SCENE_DURATION = 120;
const TRANSITION_DURATION = 15;

export interface DataDashboardVideoProps {
  companyName?: string;
  segment?: string;
}

export const DataDashboardVideo: React.FC<DataDashboardVideoProps> = ({ companyName = 'LoopFlow', segment = 'Agência' }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <TransitionSeries>
        {/* PANEL 1: HERO KPI */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <HeroKpiPanel companyName={companyName} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* PANEL 2: GROWTH BARS */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <BarChartPanel segment={segment} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* PANEL 3: SEGMENTATION */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <DonutChartPanel />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* PANEL 4: TREND LINE */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION + 30}>
          <LineChartPanel companyName={companyName} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = getSpringEntrance(frame, fps);

  return (
    <div style={{ position: 'absolute', top: '120px', left: '80px', opacity: spr, transform: `translateY(${20 * (1-spr)}px)` }}>
      <h2 style={{ fontSize: '48px', color: COLORS.accent, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>
        {title}
      </h2>
      <div style={{ width: '80px', height: '6px', background: COLORS.accent, margin: '20px 0' }} />
      <p style={{ fontSize: '32px', color: COLORS.muted, fontWeight: 600 }}>{subtitle}</p>
    </div>
  );
};

const HeroKpiPanel = ({ companyName }: { companyName: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = getSpringEntrance(frame, fps, 10);

  return (
    <AbsoluteFill style={{ padding: '80px' }}>
      <Header title={companyName.toUpperCase()} subtitle="Dashboard de Métricas em Tempo Real" />
      <div style={{ 
        flex: 1, display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center',
        opacity: spr, transform: `scale(${0.9 + 0.1 * spr})`
      }}>
        <div style={{ fontSize: '240px', fontWeight: 950, color: COLORS.text, letterSpacing: '-8px' }}>
          <CountUp value={94} startFrame={15} suffix="%" duration={60} />
        </div>
        <div style={{ 
          marginTop: '-20px', padding: '20px 60px', background: 'rgba(250, 204, 21, 0.2)',
          border: `2px solid ${COLORS.accent}`, borderRadius: '100px', color: COLORS.accent,
          fontSize: '42px', fontWeight: 800
        }}>
          CRESCIMENTO EM VENDAS
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BarChartPanel = ({ segment }: { segment: string }) => {
  return (
    <AbsoluteFill style={{ padding: '80px' }}>
      <Header title="VOLUME DE LEADS" subtitle={`Performance no setor de ${segment}`} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '140px' }}>
        <BarChart
          data={[
            { label: 'Jan', value: 30, color: COLORS.muted },
            { label: 'Fev', value: 45, color: COLORS.muted },
            { label: 'Mar', value: 75, color: COLORS.muted },
            { label: 'Abr', value: 110, color: COLORS.accent },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

const DonutChartPanel = () => {
  return (
    <AbsoluteFill style={{ padding: '80px' }}>
      <Header title="ORIGEM DO TRÁFEGO" subtitle="Canais de Maior ROI" />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '140px' }}>
        <DonutChart
          size={500}
          data={[
            { label: 'Meta Ads', value: 55, color: COLORS.accent },
            { label: 'Google Search', value: 30, color: '#6366f1' },
            { label: 'Orgânico', value: 15, color: COLORS.muted },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

const LineChartPanel = ({ companyName }: { companyName: string }) => {
  return (
    <AbsoluteFill style={{ padding: '80px' }}>
      <Header title="PROJEÇÃO DE RECEITA" subtitle={`Resultados da ${companyName}`} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '140px' }}>
        <LineChart data={[10, 25, 40, 65, 95, 140]} />
      </div>
    </AbsoluteFill>
  );
};
