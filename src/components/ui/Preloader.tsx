import React, { useState, useEffect } from 'react';
import { Mountain, Compass, Sparkles, ArrowRight } from 'lucide-react';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    const durationMs = 1400; // Fast and smooth 1.4s load
    const intervalMs = 25;
    const steps = durationMs / intervalMs;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setAltitude(7906);
          setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        setAltitude(Math.floor((next / 100) * 7906));
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Fallback cleanup timer: guarantees preloader will close after 2.5s maximum
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(maxTimer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 md:p-8 bg-[#06090e] transition-opacity duration-500 select-none ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold tracking-widest uppercase">
        <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
        <span>Nathia Gali, KPK • Pakistan</span>
      </div>

      {/* Center Crest & Altitude Counter */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Glowing Emblem */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-amber-400/20 via-emerald-500/20 to-slate-900 border border-amber-400/50 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)]">
          <Mountain className="w-8 h-8 md:w-10 md:h-10 text-amber-300 animate-soft-pulse" />
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-ping" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl md:text-3xl font-black font-cinzel tracking-[0.25em] uppercase text-amber-100 drop-shadow-lg">
            Serene Heights
          </h1>
          <p className="text-[11px] md:text-xs font-semibold tracking-widest text-slate-300/80 uppercase mt-1">
            Luxury Serviced Hotel Apartments & Suites
          </p>
        </div>

        {/* Altitude Counter */}
        <div className="pt-1">
          <div className="text-2xl md:text-4xl font-black font-cinzel text-amber-300 gold-glow">
            {altitude.toLocaleString()} <span className="text-base md:text-xl text-amber-400/80 font-normal">FT</span>
          </div>
          <p className="text-[10px] md:text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
            Ascending into Alpine Elevation
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Skip */}
      <div className="w-full max-w-xs md:max-w-sm space-y-3">
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_12px_#d4af37]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Loading 3D Alpine Experience...</span>
          <button
            onClick={() => {
              setProgress(100);
              setVisible(false);
              if (onComplete) onComplete();
            }}
            className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Enter</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
