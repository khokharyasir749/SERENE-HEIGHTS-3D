import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import {
  Sparkles,
  Mountain,
  Calendar,
  TrendingUp,
  Clapperboard,
  Layers,
} from 'lucide-react';

export const Header: React.FC = () => {
  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const setViewMode = useTourStore((state) => state.setViewMode);
  const setInquiryModalOpen = useTourStore((state) => state.setInquiryModalOpen);
  const setInvestmentDrawerOpen = useTourStore((state) => state.setInvestmentDrawerOpen);
  const setGalleryModalOpen = useTourStore((state) => state.setGalleryModalOpen);
  const startCinematicTour = useTourStore((state) => state.startCinematicTour);
  const isCinematicActive = useTourStore((state) => state.isCinematicTourActive);

  if (isCinematicActive) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 pointer-events-none flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Brand Identity */}
      <div
        className="flex items-center gap-3.5 pointer-events-auto group cursor-pointer"
        onClick={() => setViewMode('DRONE_OVERVIEW')}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-emerald-500/20 to-slate-900/80 border border-amber-400/40 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:border-amber-400 transition-all duration-300">
          <Mountain className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm md:text-base font-bold tracking-[0.22em] uppercase font-cinzel text-amber-100/95 drop-shadow-md">
              Serene Heights
            </h1>
            <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded bg-amber-400/15 border border-amber-400/30 text-amber-300">
              Nathia Gali
            </span>
          </div>
          <p className="text-[11px] tracking-wider text-slate-300/80 font-medium">
            Luxury Serviced Hotel Apartments & Suites • <span className="text-amber-300/90 font-bold">7,906 FT</span>
          </p>
        </div>
      </div>

      {/* Direct Navigation Shortcuts (Desktop) */}
      <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
        {/* Guided Cinematic Auto-Tour Action */}
        <button
          onClick={startCinematicTour}
          className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 border border-amber-200 shadow-md shadow-amber-950/40 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <Clapperboard className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
          <span>Cinematic Tour</span>
        </button>

        <button
          onClick={() => setViewMode('DRONE_OVERVIEW')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
            activeViewMode === 'DRONE_OVERVIEW'
              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Valley Overview
        </button>

        <button
          onClick={() => setViewMode('APARTMENT_INTERIOR')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
            activeViewMode === 'APARTMENT_INTERIOR'
              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Serviced Suites
        </button>

        <button
          onClick={() => setViewMode('ROOFTOP_TERRACE')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
            activeViewMode === 'ROOFTOP_TERRACE'
              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Sky Lounge
        </button>

        <button
          onClick={() => setGalleryModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Gallery & CAD</span>
        </button>

        <button
          onClick={() => setInvestmentDrawerOpen(true)}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
          <span>Investment & ROI</span>
        </button>
      </nav>

      {/* CTA Inquire & Book */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => setInquiryModalOpen(true)}
          className="relative group overflow-hidden px-4 md:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-semibold text-xs md:text-sm tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 border border-amber-300/60 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-slate-950" />
          <span>Inquire & Reserve</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-950/80 animate-pulse" />
        </button>
      </div>
    </header>
  );
};
