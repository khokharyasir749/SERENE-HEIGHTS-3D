import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import type { WeatherMode } from '../../types/tour';
import { CloudFog, SunMedium, Snowflake } from 'lucide-react';

export const WeatherSwitcher: React.FC = () => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);
  const setWeatherMode = useTourStore((state) => state.setWeatherMode);

  const presets: { id: WeatherMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'MORNING_MIST',
      label: 'Morning Mist',
      desc: 'Cool dawn fog',
      icon: <CloudFog className="w-4 h-4" />,
    },
    {
      id: 'GOLDEN_HOUR',
      label: 'Golden Hour',
      desc: 'Sunset radiance',
      icon: <SunMedium className="w-4 h-4" />,
    },
    {
      id: 'SNOWY_WINTER',
      label: 'Alpine Snow',
      desc: 'Crisp winter frost',
      icon: <Snowflake className="w-4 h-4" />,
    },
  ];

  return (
    <div className="fixed top-20 right-4 md:right-8 z-30 pointer-events-auto">
      <div className="flex flex-col gap-1.5 p-1.5 rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400 border-b border-white/5 flex items-center justify-between">
          <span>Atmosphere</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
        </div>

        <div className="flex flex-row md:flex-col gap-1">
          {presets.map((preset) => {
            const isActive = weatherMode === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setWeatherMode(preset.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400/20 to-emerald-400/10 text-amber-200 border border-amber-400/40 shadow-md shadow-amber-950/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={preset.desc}
              >
                <span className={isActive ? 'text-amber-300' : 'text-slate-400'}>
                  {preset.icon}
                </span>
                <span className="hidden md:inline whitespace-nowrap">{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
