import React, { useState, useEffect, useRef } from 'react';
import { useTourStore } from '../../store/useTourStore';

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const ArchitecturalPhotoAssembly: React.FC = () => {
  const scrollProgress = useTourStore((state) => state.scrollProgress);

  // Interactive 3D mouse perspective tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      targetTilt.current = {
        x: nx * 3.5, // max 3.5 deg
        y: -ny * 3.5, // max 3.5 deg
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth tilt damping loop
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

  // Calculate tier vertical offsets based on scroll progress (0.0 to 1.0)
  const p = Math.max(0, Math.min(1, scrollProgress));

  // Tier 1 (Base): Stays grounded
  const t1Offset = 0;

  // Tier 2 (Lower Suites: Floors 1-3): starts elevated at -80px, locks at 0px
  const t2Factor = smoothstep(0.15, 0.45, p);
  const t2Offset = (1 - t2Factor) * -80;

  // Tier 3 (Upper Residences: Floors 4-6): starts elevated at -160px, locks at 0px
  const t3Factor = smoothstep(0.40, 0.70, p);
  const t3Offset = (1 - t3Factor) * -160;

  // Tier 4 (Penthouse Crown & Pergola: Floors 7-9): starts elevated at -240px, locks at 0px
  const t4Factor = smoothstep(0.65, 0.90, p);
  const t4Offset = (1 - t4Factor) * -240;

  const isFullyAssembled = p >= 0.92;
  const isElevated = (offset: number) => Math.abs(offset) > 2;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-end pr-4 sm:pr-8 lg:pr-14 xl:pr-20 overflow-hidden">
      {/* 3D Perspective Viewport Container */}
      <div
        className="relative w-[92vw] sm:w-[70vw] lg:w-[54vw] xl:w-[48vw] max-w-[880px] aspect-[16/9] transition-transform duration-75 ease-out"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Tilting 3D Card Wrapper */}
        <div
          className="relative w-full h-full transform-gpu transition-shadow duration-700"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Ambient Golden Bloom behind Windows on Completion */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              isFullyAssembled ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(ellipse at 56% 48%, rgba(255, 183, 77, 0.45) 0%, rgba(255, 152, 0, 0.2) 35%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* ================================================================= */}
          {/* TIER 1: GROUND ARRIVAL, CARRIAGE LAMPS & BASE (74.5% to 100%)     */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{
              clipPath: 'polygon(0% 74.5%, 100% 74.5%, 100% 100%, 0% 100%)',
              transform: `translate3d(0, ${t1Offset}px, 0)`,
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Base Tier"
              className="w-full h-full object-contain pointer-events-none select-none rounded-3xl"
            />
          </div>

          {/* ================================================================= */}
          {/* TIER 2: LOWER SERVICED SUITES & BALCONIES (48.5% to 74.5%)        */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform transition-[filter] duration-300"
            style={{
              clipPath: 'polygon(0% 48.5%, 100% 48.5%, 100% 74.5%, 0% 74.5%)',
              transform: `translate3d(0, ${t2Offset}px, ${isElevated(t2Offset) ? '25px' : '0px'})`,
              filter: isElevated(t2Offset)
                ? 'drop-shadow(0 25px 25px rgba(0,0,0,0.75)) drop-shadow(0 10px 10px rgba(0,0,0,0.5))'
                : 'none',
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Lower Suites Tier"
              className="w-full h-full object-contain pointer-events-none select-none rounded-3xl"
            />
          </div>

          {/* ================================================================= */}
          {/* TIER 3: UPPER MOUNTAIN RESIDENCES & ARCHED BAY (23.0% to 48.5%)   */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform transition-[filter] duration-300"
            style={{
              clipPath: 'polygon(0% 23.0%, 100% 23.0%, 100% 48.5%, 0% 48.5%)',
              transform: `translate3d(0, ${t3Offset}px, ${isElevated(t3Offset) ? '50px' : '0px'})`,
              filter: isElevated(t3Offset)
                ? 'drop-shadow(0 30px 30px rgba(0,0,0,0.8)) drop-shadow(0 15px 15px rgba(0,0,0,0.6))'
                : 'none',
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Upper Residences Tier"
              className="w-full h-full object-contain pointer-events-none select-none rounded-3xl"
            />
          </div>

          {/* ================================================================= */}
          {/* TIER 4: ROYAL PENTHOUSE CROWN & ROOFTOP PERGOLA (0.0% to 23.0%)   */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full will-change-transform transition-[filter] duration-300"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 23.0%, 0% 23.0%)',
              transform: `translate3d(0, ${t4Offset}px, ${isElevated(t4Offset) ? '75px' : '0px'})`,
              filter: isElevated(t4Offset)
                ? 'drop-shadow(0 35px 35px rgba(0,0,0,0.85)) drop-shadow(0 20px 20px rgba(0,0,0,0.65))'
                : 'none',
            }}
          >
            <img
              src="/assets/serene-heights.jpg"
              alt="Serene Heights Penthouse & Pergola Tier"
              className="w-full h-full object-contain pointer-events-none select-none rounded-3xl"
            />
          </div>

          {/* Subdued Edge Accent Glow when Assembled */}
          {isFullyAssembled && (
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl border border-amber-400/20 transition-opacity duration-1000"
              style={{
                boxShadow: 'inset 0 0 30px rgba(251, 191, 36, 0.15)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
