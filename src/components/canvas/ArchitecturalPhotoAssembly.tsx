import React, { useState, useEffect, useRef } from 'react';
import { useTourStore } from '../../store/useTourStore';

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const ArchitecturalPhotoAssembly: React.FC = () => {
  const scrollProgress = useTourStore((state) => state.scrollProgress);

  // Subtle interactive 3D perspective tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      targetTilt.current = {
        x: nx * 2.2, // subtle 2.2 deg
        y: -ny * 2.2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateTilt = () => {
      setTilt((prev) => ({
        x: prev.x + (targetTilt.current.x - prev.x) * 0.08,
        y: prev.y + (targetTilt.current.y - prev.y) * 0.08,
      }));
      animFrameId.current = requestAnimationFrame(updateTilt);
    };
    animFrameId.current = requestAnimationFrame(updateTilt);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Calculate subtle tier assembly offsets inside the pinned frame
  const p = Math.max(0, Math.min(1, scrollProgress));

  // Tier 1 (Base): Stays grounded
  const t1Offset = 0;

  // Tier 2 (Lower Suites): starts elevated by -10px, glides down to 0px
  const t2Factor = smoothstep(0.12, 0.42, p);
  const t2Offset = (1 - t2Factor) * -12;

  // Tier 3 (Upper Residences): starts elevated by -22px, glides down to 0px
  const t3Factor = smoothstep(0.38, 0.72, p);
  const t3Offset = (1 - t3Factor) * -24;

  // Tier 4 (Crown & Pergola): starts elevated by -34px, glides down to 0px
  const t4Factor = smoothstep(0.68, 0.94, p);
  const t4Offset = (1 - t4Factor) * -36;

  const isAssembled = p >= 0.94;

  return (
    <div className="fixed right-6 lg:right-16 top-1/2 -translate-y-1/2 w-[90vw] sm:w-[520px] lg:w-[620px] max-h-[85vh] aspect-[16/10] pointer-events-none z-10 flex items-center justify-center">
      {/* 3D Perspective Container */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-slate-950/40 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-700"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Tilting 3D Card */}
        <div
          className="relative w-full h-full transform-gpu"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Warm Window Glow Pulse at 100% Completion */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              isAssembled ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(ellipse at 55% 48%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 40%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          {/* ============================================================= */}
          {/* TIER 1: GROUND ARRIVAL & BASE (74% to 100%)                   */}
          {/* ============================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{
              clipPath: 'polygon(0% 74%, 100% 74%, 100% 100%, 0% 100%)',
              transform: `translate3d(0, ${t1Offset}px, 0)`,
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Ground Tier"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </div>

          {/* ============================================================= */}
          {/* TIER 2: LOWER SUITES & BALCONIES (49% to 74%)                 */}
          {/* ============================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{
              clipPath: 'polygon(0% 49%, 100% 49%, 100% 74%, 0% 74%)',
              transform: `translate3d(0, ${t2Offset}px, 0)`,
              filter: Math.abs(t2Offset) > 1 ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.5))' : 'none',
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Suites Tier"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </div>

          {/* ============================================================= */}
          {/* TIER 3: UPPER MOUNTAIN RESIDENCES (24% to 49%)                */}
          {/* ============================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{
              clipPath: 'polygon(0% 24%, 100% 24%, 100% 49%, 0% 49%)',
              transform: `translate3d(0, ${t3Offset}px, 0)`,
              filter: Math.abs(t3Offset) > 1 ? 'drop-shadow(0 12px 16px rgba(0,0,0,0.6))' : 'none',
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Residences Tier"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </div>

          {/* ============================================================= */}
          {/* TIER 4: ROYAL PENTHOUSE CROWN & PERGOLA (0% to 24%)           */}
          {/* ============================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 24%, 0% 24%)',
              transform: `translate3d(0, ${t4Offset}px, 0)`,
              filter: Math.abs(t4Offset) > 1 ? 'drop-shadow(0 16px 20px rgba(0,0,0,0.7))' : 'none',
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Penthouse Tier"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
          </div>

          {/* Subtle Architectural Frame Overlay */}
          <div className="absolute top-4 left-5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-medium tracking-wider uppercase text-slate-300">
            {isAssembled ? 'Assembled Elevation • 7,906 FT' : 'Architectural Elevation • 7,906 FT'}
          </div>

          {/* Gold Inset Border on Completion */}
          <div
            className={`absolute inset-0 rounded-3xl border transition-colors duration-700 pointer-events-none ${
              isAssembled ? 'border-amber-400/30' : 'border-transparent'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
