import React from 'react';
import { Header } from './Header';
import { NavigationDock } from './NavigationDock';
import { WeatherSwitcher } from './WeatherSwitcher';
import { InfoPill } from './InfoPill';
import { InquiryModal } from './InquiryModal';
import { FloorPlanMinimap } from './FloorPlanMinimap';
import { AmenityModal } from './AmenityModal';
import { InvestmentDrawer } from './InvestmentDrawer';
import { ProjectGalleryModal } from './ProjectGalleryModal';
import { CinematicOverlay } from './CinematicOverlay';
import { useTourStore } from '../../store/useTourStore';

export const HUDOverlay: React.FC = () => {
  const navigationMode = useTourStore((state) => state.navigationMode);
  const isCinematicActive = useTourStore((state) => state.isCinematicTourActive);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {/* 1. Guided Cinematic Auto-Tour Presentation Overlay */}
      {isCinematicActive ? (
        <CinematicOverlay />
      ) : (
        <>
          {/* 2. Luxury Header & Navigation Bar */}
          <Header />

          {/* 3. Elevation, Weather Stats & Ambient Audio Pill */}
          <InfoPill />

          {/* 4. Weather / Lighting Preset Switcher */}
          <WeatherSwitcher />

          {/* 5. First-Person Center Crosshair Reticle */}
          {navigationMode === 'FIRST_PERSON' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full border border-amber-300/60 bg-amber-400/20 backdrop-blur-sm animate-pulse" />
            </div>
          )}

          {/* 6. Interactive 2D Floor Plan & Live Radar Minimap */}
          <FloorPlanMinimap />

          {/* 7. Floating Bottom Navigation Dock */}
          <NavigationDock />
        </>
      )}

      {/* 8. Modals and Drawers (Always mounted, controlled by store) */}
      <InquiryModal />
      <InvestmentDrawer />
      <AmenityModal />
      <ProjectGalleryModal />
    </div>
  );
};
