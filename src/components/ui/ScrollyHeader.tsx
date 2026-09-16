import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import {
  Mountain,
  MessageCircle,
  Images,
  TrendingUp,
  Sun,
  CloudSun,
  Snowflake,
} from 'lucide-react';

export const ScrollyHeader: React.FC = () => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);
  const setWeatherMode = useTourStore((state) => state.setWeatherMode);
  const setGalleryModalOpen = useTourStore((state) => state.setGalleryModalOpen);
  const setInvestmentDrawerOpen = useTourStore((state) => state.setInvestmentDrawerOpen);
  const scrollProgress = useTourStore((state) => state.scrollProgress);

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      'Hello Serene Heights Team, I am interested in inquiring about a luxury serviced apartment at Serene Heights Nathia Gali (7,906 FT). Please share the payment plan and site visit information.'
    );
    window.open(`https://wa.me/923008555777?text=${message}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between pointer-events-auto bg-slate-950/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      {/* Brand Title & Altitude Badge */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Mountain className="w-5 h-5 text-slate-950 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              SERENE HEIGHTS
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-bold text-amber-300">
              7,906 FT
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium tracking-wide">
            Nathia Gali • Luxury Serviced Hotel Apartments
          </div>
        </div>
      </div>

      {/* Assembly Progress Meter (Centered) */}
      <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs">
        <span className="text-slate-400">Assembly:</span>
        <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-150"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-bold text-amber-300">{Math.round(scrollProgress * 100)}%</span>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Weather Presets */}
        <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-white/10">
          <button
            onClick={() => setWeatherMode('MORNING_MIST')}
            title="Morning Mist"
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              weatherMode === 'MORNING_MIST' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudSun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeatherMode('GOLDEN_HOUR')}
            title="Golden Sunset"
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              weatherMode === 'GOLDEN_HOUR' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeatherMode('SNOWY_WINTER')}
            title="Snowy Winter"
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              weatherMode === 'SNOWY_WINTER' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Snowflake className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Modal Trigger */}
        <button
          onClick={() => setGalleryModalOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
        >
          <Images className="w-3.5 h-3.5 text-amber-300" />
          <span>Gallery</span>
        </button>

        {/* Payment Plan Drawer Trigger */}
        <button
          onClick={() => setInvestmentDrawerOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Payment Plan</span>
        </button>

        {/* Direct WhatsApp Booking CTA */}
        <button
          onClick={handleWhatsAppBooking}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span className="hidden sm:inline">WhatsApp Booking</span>
          <span className="sm:hidden">WhatsApp</span>
        </button>
      </div>
    </header>
  );
};
