import React from 'react';
import { interpolate, spring } from 'remotion';
import { DESIGN_TOKENS, useSafeRemotion } from './design-tokens';

export const AnimatedCursor: React.FC<{
  x: number;
  y: number;
  isClicked?: boolean;
  clickFrame?: number;
}> = ({ x, y, isClicked = false, clickFrame }) => {
  const { frame, fps } = useSafeRemotion();

  const rippleProgress = clickFrame !== undefined 
    ? spring({
        frame: frame - clickFrame,
        fps,
        config: DESIGN_TOKENS.spring.snappy,
      })
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-10px, -5px)',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {isClicked && rippleProgress > 0 && rippleProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 5,
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: `4px solid ${DESIGN_TOKENS.colors.accent}`,
            transform: `translate(-50%, -50%) scale(${rippleProgress * 2})`,
            opacity: 1 - rippleProgress,
          }}
        />
      )}

      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={{
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
        }}
      >
        <path
          d="M7 2L25 18L17.5 19.5L24 29L21 31L14.5 21.5L7 26V2Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const CountUp: React.FC<{
  value: number;
  startFrame: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}> = ({ value, startFrame, duration = 30, suffix = '', decimals = 0, style }) => {
  const { frame, fps } = useSafeRemotion();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    durationInFrames: duration,
    config: DESIGN_TOKENS.spring.default,
  });

  const currentValue = (progress * value).toFixed(decimals);

  return (
    <span style={{ fontFamily: 'tabular-nums', ...style }}>
      {currentValue}{suffix}
    </span>
  );
};
