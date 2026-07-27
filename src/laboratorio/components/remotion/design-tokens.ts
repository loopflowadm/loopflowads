import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const DESIGN_TOKENS = {
  // Animation Configs
  spring: {
    default: { damping: 200 },
    snappy: { damping: 20, stiffness: 200 },
    bouncy: { damping: 10, stiffness: 100 },
    heavy: { damping: 15, stiffness: 80, mass: 2 },
  },
  
  // Layout
  safeZones: {
    top: 150,
    bottom: 170,
    horizontal: 60,
  },
  
  // Colors
  colors: {
    background: '#0a0a0a',
    lightBackground: '#f8f9fa',
    text: '#ffffff',
    darkText: '#1a1a1a',
    accent: '#facc15', // Gold/Yellow (LoopFlow)
    gold: '#f59e0b',
    success: '#22c55e',
    muted: '#64748b',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Typography
  fonts: {
    primary: 'Inter, sans-serif',
  },
};

// Helper for unified spring entrance
export const getSpringEntrance = (frame: number, fps: number, delay = 0) => {
  return spring({
    frame,
    fps,
    delay,
    config: DESIGN_TOKENS.spring.default,
  });
};

/**
 * 🔒 useSafeRemotion
 * Safely access Remotion hooks without crashing in non-Remotion contexts (like Web Previews).
 */
export const useSafeRemotion = () => {
  try {
    const frame = useCurrentFrame();
    const config = useVideoConfig();
    return { frame, fps: config.fps, isRemotion: true };
  } catch (e) {
    return { frame: 100, fps: 30, isRemotion: false };
  }
};
