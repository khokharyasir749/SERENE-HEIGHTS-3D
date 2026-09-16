import React, { useEffect, useState } from 'react';
import { useTourStore, CINEMATIC_TOUR_STAGES } from '../../store/useTourStore';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Clapperboard,
} from 'lucide-react';

export const CinematicOverlay: React.FC = () => {
  const isCinematicActive = useTourStore((state) => state.isCinematicTourActive);
  const stageIndex = useTourStore((state) => state.cinematicStageIndex);
  const stopTour = useTourStore((state) => state.stopCinematicTour);
  const nextStage = useTourStore((state) => state.nextCinematicStage);
  const setStage = useTourStore((state) => state.setCinematicStage);

  const [progress, setProgress] = useState(0);

  const currentStage = CINEMATIC_TOUR_STAGES[stageIndex];
  const totalStages = CINEMATIC_TOUR_STAGES.length;

  // Auto progression timer
  useEffect(() => {
    if (!isCinematicActive || !currentStage) return;

    setProgress(0);
    const intervalMs = 50;
    const totalMs = currentStage.durationSeconds * 1000;
    const step = (intervalMs / totalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextStage();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isCinematicActive, stageIndex, currentStage, nextStage]);

  if (!isCinematicActive || !currentStage) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between overflow-hidden animate-fade-in">
      {/* 1. Top Cinematic Letterbox Bar */}
      <div className="w-full bg-slate-950/95 border-b border-amber-400/30 px-6 py-4 flex items-center justify-between pointer-events-auto backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
            <Clapperboard className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400">
              CINEMATIC PRESENTATION MODE
            </span>
            <h2 className="text-xs font-bold font-cinzel text-white">
              Serene Heights Nathia Gali (7,906 FT)
            </h2>
          </div>
        </div>

        {/* Stage Progress Dots & Skip */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {CINEMATIC_TOUR_STAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === stageIndex
                    ? 'w-8 bg-amber-400 shadow-[0_0_8px_#d4af37]'
                    : idx < stageIndex
                    ? 'w-3 bg-amber-400/50'
                    : 'w-3 bg-white/20'
                }`}
                title={`Jump to Scene ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={stopTour}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-amber-300" />
            <span>Exit Tour</span>
          </button>
        </div>
      </div>

      {/* 2. Center Stage Navigation Buttons (Left/Right) */}
      <div className="flex items-center justify-between px-6 pointer-events-auto">
        <button
          onClick={() => {
            const prev = (stageIndex - 1 + totalStages) % totalStages;
            setStage(prev);
          }}
          className="w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-2xl"
        >
          <ChevronLeft className="w-5 h-5 text-amber-300" />
        </button>

        <button
          onClick={nextStage}
          className="w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-2xl"
        >
          <ChevronRight className="w-5 h-5 text-amber-300" />
        </button>
      </div>

      {/* 3. Bottom Cinematic Letterbox Bar & Caption Card */}
      <div className="w-full bg-gradient-to-t from-slate-950/98 via-slate-950/90 to-transparent pt-8 pb-6 px-6 flex flex-col items-center gap-3 pointer-events-auto">
        {/* Caption Card */}
        <div className="max-w-2xl w-full p-5 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-amber-400/35 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center space-y-2 relative overflow-hidden">
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_8px_#d4af37]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              SCENE {stageIndex + 1} OF {totalStages} • {currentStage.subtitle}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h3 className="text-lg md:text-xl font-bold font-cinzel text-amber-100">
            {currentStage.title}
          </h3>

          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            {currentStage.description}
          </p>
        </div>
      </div>
    </div>
  );
};
