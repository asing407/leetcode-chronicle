import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

export type BackgroundStyle = 'birds' | 'net' | 'waves' | 'none';

// Extend window to include THREE for Vanta
declare global {
  interface Window {
    THREE: typeof THREE;
  }
}

interface VantaBackgroundProps {
  style?: BackgroundStyle;
}

export const VantaBackground = ({ style = 'birds' }: VantaBackgroundProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (style === 'none') {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
      return;
    }

    const loadVanta = async () => {
      if (!vantaRef.current) return;

      // Destroy existing effect
      if (vantaEffect) {
        vantaEffect.destroy();
      }

      // Make THREE available globally for Vanta
      window.THREE = THREE;

      const isDark = theme === 'dark';

      let effect: { destroy: () => void } | null = null;

      try {
        if (style === 'birds') {
          const VANTA = await import('vanta/dist/vanta.birds.min');
          effect = VANTA.default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: isDark ? 0x0a0a0b : 0xfafafa,
            color1: isDark ? 0x3b82f6 : 0x6366f1,
            color2: isDark ? 0x8b5cf6 : 0x3b82f6,
            colorMode: 'lerp',
            birdSize: 1.2,
            wingSpan: 25.0,
            speedLimit: 4.0,
            separation: 60.0,
            alignment: 40.0,
            cohesion: 30.0,
            quantity: 3.0,
          });
        } else if (style === 'net') {
          const VANTA = await import('vanta/dist/vanta.net.min');
          effect = VANTA.default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: isDark ? 0x3b82f6 : 0x6366f1,
            backgroundColor: isDark ? 0x0a0a0b : 0xfafafa,
            points: 12.0,
            maxDistance: 23.0,
            spacing: 18.0,
            showDots: true,
          });
        } else if (style === 'waves') {
          const VANTA = await import('vanta/dist/vanta.waves.min');
          effect = VANTA.default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: isDark ? 0x0a0a0b : 0xe0e0e0,
            shininess: isDark ? 35.0 : 25.0,
            waveHeight: 15.0,
            waveSpeed: 0.75,
            zoom: 0.85,
          });
        }

        if (effect) {
          setVantaEffect(effect);
        }
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [theme, style]);

  if (style === 'none') {
    return null;
  }

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
