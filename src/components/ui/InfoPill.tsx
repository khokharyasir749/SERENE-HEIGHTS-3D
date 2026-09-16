import React, { useEffect } from 'react';
import { useTourStore } from '../../store/useTourStore';
import { alpineAudio } from '../../audio/ambientAudio';
import { Compass, Volume2, VolumeX, Wind, Thermometer } from 'lucide-react';

export const InfoPill: React.FC = () => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);
  const audioMuted = useTourStore((state) => state.audioAmbientMuted);
  const toggleAudio = useTourStore((state) => state.toggleAudio);

  // Sync ambient audio engine with store state
  useEffect(() => {
    if (!audioMuted) {
      alpineAudio.play();
    } else {
      alpineAudio.stop();
    }
    return () => {
      alpineAudio.stop();
    };
  }, [audioMuted]);

  const weatherStats = () => {
    switch (weatherMode) {
      case 'SNOWY_WINTER':
        return { temp: '-2°C', cond: 'Alpine Frost', wind: '18 km/h NW' };
      case 'GOLDEN_HOUR':
        return { temp: '14°C', cond: 'Golden Sunset', wind: '8 km/h W' };
      case 'MORNING_MIST':
      default:
        return { temp: '9°C', cond: 'Pine Ridge Mist', wind: '12 km/h WNW' };
    }
  };

  const stats = weatherStats();

  return (
    <div className="fixed top-20 left-4 md:left-8 z-30 pointer-events-auto flex flex-col gap-2">
      {/* Elevation & Coordinates Badge */}
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold tracking-wider text-amber-200">
              7,906 FT ELEVATION
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] text-slate-300 font-medium">Nathia Gali, KPK</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-0.5">
              <Thermometer className="w-2.5 h-2.5 text-amber-400" />
              {stats.temp}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Wind className="w-2.5 h-2.5 text-cyan-400" />
              {stats.wind}
            </span>
            <span>•</span>
            <span className="text-emerald-300/90">{stats.cond}</span>
          </div>
        </div>
      </div>

      {/* Ambient Audio Toggle Pill */}
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-xl border transition-all duration-300 cursor-pointer self-start ${
          !audioMuted
            ? 'bg-amber-400/15 border-amber-400/40 text-amber-200 shadow-lg shadow-amber-950/30'
            : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-slate-200'
        }`}
        title={audioMuted ? 'Unmute Alpine Breeze Ambient' : 'Mute Ambient Audio'}
      >
        {!audioMuted ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[11px]">Alpine Audio: Active</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px]">Ambient: Muted</span>
          </>
        )}
      </button>
    </div>
  );
};
