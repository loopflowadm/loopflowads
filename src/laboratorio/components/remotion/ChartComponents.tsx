import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { DESIGN_TOKENS } from './design-tokens';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartData[];
  title?: string;
}

export const BarChart: React.FC<ChartProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      height: '400px',
      width: '100%',
      padding: '40px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '30px',
      gap: '20px'
    }}>
      {data.map((item, i) => {
        const heightMultiplier = spring({
          frame,
          fps,
          delay: i * 5,
          config: DESIGN_TOKENS.spring.default,
        });

        return (
          <div key={i} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '100%',
              height: `${item.value * 3 * heightMultiplier}px`,
              backgroundColor: item.color || DESIGN_TOKENS.colors.accent,
              borderRadius: '12px 12px 4px 4px',
              boxShadow: `0 10px 20px ${item.color || DESIGN_TOKENS.colors.accent}44`,
            }} />
            <span style={{ fontSize: '24px', fontWeight: 600, color: DESIGN_TOKENS.colors.muted }}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const DonutChart: React.FC<{ data: ChartData[], size?: number }> = ({ data, size = 400 }) => {
  const frame = useCurrentFrame();
  const radius = size / 2 - 40;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  let currentOffset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, i) => {
        const segmentLength = (item.value / total) * circumference;
        const progress = spring({
          frame,
          fps: 30,
          delay: i * 10,
          config: DESIGN_TOKENS.spring.default,
        });

        const offset = interpolate(progress, [0, 1], [segmentLength, 0]);
        const rotation = (currentOffset / circumference) * 360 - 90;
        currentOffset += segmentLength;

        return (
          <circle
            key={i}
            r={radius}
            cx={center}
            cy={center}
            fill="none"
            stroke={item.color || DESIGN_TOKENS.colors.accent}
            strokeWidth="40"
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={offset}
            style={{
              transformOrigin: 'center',
              transform: `rotate(${rotation}deg)`,
            }}
          />
        );
      })}
    </svg>
  );
};

export const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: DESIGN_TOKENS.spring.default,
  });

  const width = 800;
  const height = 300;

  const max = Math.max(...data);
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={DESIGN_TOKENS.colors.accent}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        strokeDasharray={1000}
        strokeDashoffset={interpolate(progress, [0, 1], [1000, 0])}
      />
    </svg>
  );
};
