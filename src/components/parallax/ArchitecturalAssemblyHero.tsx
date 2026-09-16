import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ArchitecturalAssemblyHero: React.FC = () => {
  const scrollProgress = useTourStore((state) => state.scrollProgress);
  const activeSection = useTourStore((state) => state.activeAssemblySection);

  // Smoothstep helper
  const smooth = (min: number, max: number, v: number) => {
    const x = Math.max(0, Math.min(1, (v - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  const p = Math.max(0, Math.min(1, scrollProgress));

  // ---------------------------------------------------------------------------
  // TIER ASSEMBLY INTERPOLATION (Seamless in-place assembly directly on backdrop)
  // ---------------------------------------------------------------------------
  // Tier 1 (Podium, Ground Retaining Wall & Snow Base): Fixed in place on the base layer
  // Tier 2 (Lower Suites: Floors 1 to 3): Assembles between 12% and 45%
  const t2 = smooth(0.12, 0.45, p);
  const t2Offset = (1 - t2) * -50; // Descends 50px into exact place
  const t2Opacity = 0.25 + t2 * 0.75;
  const t2Shadow = t2 < 0.98 ? 'drop-shadow(0 18px 25px rgba(0,0,0,0.85))' : 'none';

  // Tier 3 (Upper Residences: Floors 4 to 6 & Central Arches): Assembles between 42% and 72%
  const t3 = smooth(0.42, 0.72, p);
  const t3Offset = (1 - t3) * -90; // Descends 90px into exact place
  const t3Opacity = 0.15 + t3 * 0.85;
  const t3Shadow = t3 < 0.98 ? 'drop-shadow(0 22px 30px rgba(0,0,0,0.9))' : 'none';

  // Tier 4 (Rooftop Crown, Stepped Cornices & Pergola): Assembles between 68% and 92%
  const t4 = smooth(0.68, 0.92, p);
  const t4Offset = (1 - t4) * -130; // Descends 130px into exact place
  const t4Opacity = 0.1 + t4 * 0.9;
  const t4Shadow = t4 < 0.98 ? 'drop-shadow(0 28px 35px rgba(0,0,0,0.95))' : 'none';

  // Window Lights Bloom (Fades in warmly at 85% - 100%)
  const glowFactor = smooth(0.85, 1.0, p);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* ======================================================================= */}
      {/* 1. BASE FULLSCREEN TWILIGHT BACKDROP LAYER (Untouched Landscape Base)   */}
      {/* ======================================================================= */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('/assets/serene-heights.jpg')`,
          transform: `scale(${1 + p * 0.03}) translateY(${p * -10}px)`,
        }}
      />

      {/* Subtle twilight gradient overlays on the left for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b10] via-slate-950/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b10]/85 via-slate-950/30 to-transparent w-full sm:w-1/2 lg:w-2/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(7,11,16,0.55)_100%)]" />

      {/* ======================================================================= */}
      {/* 2. IN-PLACE ARCHITECTURAL ASSEMBLY SLICES (Exact Coordinate Alignment)  */}
      {/* ======================================================================= */}

      {/* TIER 2 SLICE: Lower Serviced Suites & Wrought-Iron Balconies (Floors 1-3) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out"
        style={{
          backgroundImage: `url('/assets/serene-heights.jpg')`,
          clipPath: 'polygon(24% 46%, 79% 46%, 79% 68.2%, 24% 68.2%)',
          transform: `scale(${1 + p * 0.03}) translate3d(0, ${t2Offset + p * -10}px, 0)`,
          opacity: t2Opacity,
          filter: t2Shadow,
        }}
      />

      {/* TIER 3 SLICE: Upper Residences & Continuous Arched Central Tower (Floors 4-6) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out"
        style={{
          backgroundImage: `url('/assets/serene-heights.jpg')`,
          clipPath: 'polygon(26% 22%, 77% 22%, 77% 46.2%, 26% 46.2%)',
          transform: `scale(${1 + p * 0.03}) translate3d(0, ${t3Offset + p * -10}px, 0)`,
          opacity: t3Opacity,
          filter: t3Shadow,
        }}
      />

      {/* TIER 4 SLICE: Penthouse Crown, Stepped Cornice Parapet & Pergola (Floors 7-9) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out"
        style={{
          backgroundImage: `url('/assets/serene-heights.jpg')`,
          clipPath: 'polygon(28% 0%, 76% 0%, 76% 22.2%, 28% 22.2%)',
          transform: `scale(${1 + p * 0.03}) translate3d(0, ${t4Offset + p * -10}px, 0)`,
          opacity: t4Opacity,
          filter: t4Shadow,
        }}
      />

      {/* ======================================================================= */}
      {/* 3. WARM GOLDEN WINDOW BLOOM LAYER (Active at 85% - 100% Assembly)       */}
      {/* ======================================================================= */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 mix-blend-screen"
        style={{
          opacity: glowFactor,
        }}
      >
        {/* Central Arched Bay Golden Bloom */}
        <div
          className="absolute left-[47%] top-[25%] w-[16%] h-[48%] rounded-full bg-amber-400/30 blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        {/* Left Balconies Glow */}
        <div className="absolute left-[33%] top-[30%] w-[12%] h-[42%] rounded-full bg-amber-500/20 blur-2xl" />
        {/* Right Balconies Glow */}
        <div className="absolute left-[63%] top-[30%] w-[12%] h-[42%] rounded-full bg-amber-500/20 blur-2xl" />
        {/* Ground Arrival Warm Canopy Downlight */}
        <div className="absolute left-[44%] top-[70%] w-[18%] h-[16%] rounded-full bg-amber-300/35 blur-2xl" />
      </div>

      {/* ======================================================================= */}
      {/* 4. REAL ESTATE ASSEMBLY HUD BADGE (Bottom Right of Fullscreen Viewport) */}
      {/* ======================================================================= */}
      <div className="fixed bottom-6 right-6 z-20 pointer-events-none">
        <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-2xl border border-white/15 text-white text-xs font-medium flex items-center gap-2.5 shadow-2xl shadow-black/80">
          {glowFactor > 0.85 ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-semibold tracking-wide">
                100% ARCHITECTURAL ASSEMBLY COMPLETE
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-amber-200">
                STAGE 0{Math.min(4, Math.max(1, activeSection))}/04 • SCROLL TO ASSEMBLE ({Math.round(p * 100)}%)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
