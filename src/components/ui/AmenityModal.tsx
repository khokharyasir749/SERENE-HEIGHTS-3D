import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Building,
} from 'lucide-react';

export const AmenityModal: React.FC = () => {
  const selectedAmenity = useTourStore((state) => state.selectedAmenity);
  const setSelectedAmenity = useTourStore((state) => state.setSelectedAmenity);
  const setViewMode = useTourStore((state) => state.setViewMode);
  const setCurrentRoom = useTourStore((state) => state.setCurrentRoom);
  const setInquiryOpen = useTourStore((state) => state.setInquiryModalOpen);

  if (!selectedAmenity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-amber-400/35 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Official Feature Spotlight
              </span>
              <h3 className="text-base font-bold font-cinzel text-amber-100">
                {selectedAmenity.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedAmenity(null)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-semibold text-amber-300/90 italic">
            "{selectedAmenity.tagline}"
          </p>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedAmenity.description}
          </p>

          {/* Key Bullet Specifications */}
          {selectedAmenity.specs && selectedAmenity.specs.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Project Specifications</span>
              </span>
              <div className="space-y-1.5">
                {selectedAmenity.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            {selectedAmenity.targetViewMode && (
              <button
                onClick={() => {
                  if (selectedAmenity.targetRoom) {
                    setCurrentRoom(selectedAmenity.targetRoom);
                  } else if (selectedAmenity.targetViewMode) {
                    setViewMode(selectedAmenity.targetViewMode);
                  }
                  setSelectedAmenity(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Fly to Vantage Point</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            )}

            <button
              onClick={() => {
                setSelectedAmenity(null);
                setInquiryOpen(true);
              }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Inquire & Reserve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
