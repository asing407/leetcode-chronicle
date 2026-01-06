import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

// Vanta types
declare global {
  interface Window {
    VANTA: {
      NET: (config: Record<string, unknown>) => { destroy: () => void };
    };
  }
}

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const loadVanta = async () => {
      if (!vantaRef.current) return;

      // Dynamically import Vanta
      const VANTA = await import('vanta/dist/vanta.net.min');

      if (vantaEffect) {
        vantaEffect.destroy();
      }

      const isDark = theme === 'dark';

      const effect = VANTA.default({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0x3b82f6 : 0x6366f1, // Primary blue/indigo
        backgroundColor: isDark ? 0x0a0a0b : 0xfafafa,
        points: 12.0,
        maxDistance: 23.0,
        spacing: 18.0,
        showDots: true,
      });

      setVantaEffect(effect);
    };

    loadVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [theme]);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
