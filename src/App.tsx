import { AlpineScene } from './components/canvas/AlpineScene';
import { ArchitecturalPhotoAssembly } from './components/canvas/ArchitecturalPhotoAssembly';
import { ScrollyHeader } from './components/ui/ScrollyHeader';
import { ScrollyAssemblyStream } from './components/scrollytelling/ScrollyAssemblyStream';
import { InquiryModal } from './components/ui/InquiryModal';
import { InvestmentDrawer } from './components/ui/InvestmentDrawer';
import { ProjectGalleryModal } from './components/ui/ProjectGalleryModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { useTourStore } from './store/useTourStore';

export function App() {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#070b10] text-slate-100 font-sans selection:bg-amber-500/30">
        {/* ========================================================================= */}
        {/* 1. DYNAMIC WEATHER BACKDROP (Sunset / Daylight / Snowy Winter Cross-Fade) */}
        {/* ========================================================================= */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
          {/* Mode 1: Sunset / Golden Hour */}
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
              weatherMode === 'GOLDEN_HOUR' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('/nathia_gali_sunset.jpg')` }}
          />

          {/* Mode 2: Daylight / Sunny Clear Sky */}
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
              weatherMode === 'MORNING_MIST' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('/nathia_gali_day.jpg')` }}
          />

          {/* Mode 3: Snowy Winter Elevation */}
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
              weatherMode === 'SNOWY_WINTER' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('/nathia_gali_nature.jpg')` }}
          />

          {/* Dynamic twilight & contrast gradient overlays for left-docked cards */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              weatherMode === 'MORNING_MIST'
                ? 'bg-gradient-to-t from-[#070b10]/95 via-slate-950/40 to-transparent'
                : 'bg-gradient-to-t from-[#070b10] via-slate-950/25 to-transparent'
            }`}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              weatherMode === 'MORNING_MIST'
                ? 'bg-gradient-to-r from-[#070b10]/90 via-slate-950/60 to-transparent w-full sm:w-1/2 lg:w-2/5'
                : 'bg-gradient-to-r from-[#070b10]/85 via-slate-950/40 to-transparent w-full sm:w-1/2 lg:w-2/5'
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(7,11,16,0.45)_100%)]" />
        </div>

        {/* ========================================================================= */}
        {/* 2. ATMOSPHERIC 3D CANVAS (Snow Particles & Twilight Sky Lighting)         */}
        {/* ========================================================================= */}
        <AlpineScene />

        {/* ========================================================================= */}
        {/* 3. 2.5D PHOTOREALISTIC ARCHITECTURAL DEPTH-LAYERED ASSEMBLY (Apple Style)  */}
        {/* ========================================================================= */}
        <ArchitecturalPhotoAssembly />

        {/* ========================================================================= */}
        {/* 3. LUXURY TOP NAVIGATION HEADER                                           */}
        {/* ========================================================================= */}
        <ScrollyHeader />

        {/* ========================================================================= */}
        {/* 4. FOREGROUND SCROLLYTELLING STORY STREAM (Left-Docked)                   */}
        {/* ========================================================================= */}
        <ScrollyAssemblyStream />

        {/* ========================================================================= */}
        {/* 5. INTERACTIVE MODALS & DRAWERS                                           */}
        {/* ========================================================================= */}
        <InquiryModal />
        <InvestmentDrawer />
        <ProjectGalleryModal />
      </div>
    </ErrorBoundary>
  );
}

export default App;
