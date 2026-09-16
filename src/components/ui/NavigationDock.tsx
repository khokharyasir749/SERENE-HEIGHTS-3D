import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import type { ViewMode, RoomType, ApartmentTier } from '../../types/tour';
import {
  Compass,
  Home,
  Sun,
  Flame,
  Tv,
  BedDouble,
  Trees,
  UtensilsCrossed,
  Sparkles,
  Footprints,
  Orbit,
  Maximize,
  Laptop,
  DoorOpen,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export const NavigationDock: React.FC = () => {
  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const navigationMode = useTourStore((state) => state.navigationMode);
  const selectedApartmentType = useTourStore((state) => state.selectedApartmentType);
  const currentRoom = useTourStore((state) => state.currentRoom);
  const cameraTransitioning = useTourStore((state) => state.cameraTransitioning);

  const setViewMode = useTourStore((state) => state.setViewMode);
  const setNavigationMode = useTourStore((state) => state.setNavigationMode);
  const setApartmentType = useTourStore((state) => state.setApartmentType);
  const setCurrentRoom = useTourStore((state) => state.setCurrentRoom);
  const stepOntoBalcony = useTourStore((state) => state.stepOntoBalcony);

  const primaryViews: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
      id: 'DRONE_OVERVIEW',
      label: 'Valley Drone',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'APARTMENT_INTERIOR',
      label: 'Serviced Suite',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'BALCONY_PANORAMA',
      label: 'Balcony Panorama',
      icon: <Sun className="w-4 h-4" />,
    },
    {
      id: 'ROOFTOP_TERRACE',
      label: 'Rooftop Sky Lounge',
      icon: <Flame className="w-4 h-4" />,
    },
  ];

  const roomPills: { id: RoomType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'FOYER',
      label: 'Foyer',
      icon: <DoorOpen className="w-3.5 h-3.5" />,
    },
    {
      id: 'LIVING_ROOM',
      label: 'Living Lounge',
      icon: <Tv className="w-3.5 h-3.5" />,
    },
    {
      id: 'MASTER_SUITE',
      label: 'Master Suite',
      icon: <BedDouble className="w-3.5 h-3.5" />,
    },
    {
      id: 'EXECUTIVE_DESK',
      label: 'Workstation',
      icon: <Laptop className="w-3.5 h-3.5" />,
    },
    {
      id: 'KITCHENETTE',
      label: 'Kitchenette Bar',
      icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    },
    {
      id: 'BALCONY_DECK',
      label: 'Private Balcony',
      icon: <Trees className="w-3.5 h-3.5 text-emerald-400" />,
    },
  ];

  const apartmentTiers: { id: ApartmentTier; label: string; tag: string }[] = [
    { id: 'EXECUTIVE_SUITE', label: 'Executive Suite', tag: '550 sqft' },
    { id: '2_BED_LUXURY', label: '2-Bed Luxury', tag: '950 sqft' },
    { id: 'SKY_PENTHOUSE', label: 'Sky Penthouse', tag: '1,850 sqft' },
  ];

  // Helper for virtual mobile WASD buttons
  const triggerKeyEvent = (key: string, isDown: boolean) => {
    const eventType = isDown ? 'keydown' : 'keyup';
    window.dispatchEvent(new KeyboardEvent(eventType, { code: key }));
  };

  const isWalkSupported = activeViewMode === 'APARTMENT_INTERIOR' || activeViewMode === 'ROOFTOP_TERRACE';

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-3 pointer-events-none flex flex-col items-center gap-2">
      {/* 1. First-Person Walking Controls Hint & Mobile Virtual D-Pad */}
      {navigationMode === 'FIRST_PERSON' && (
        <div className="flex flex-col items-center gap-2 pointer-events-auto animate-fade-in">
          {/* Desktop walking keys hint badge */}
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-amber-400/40 text-xs text-amber-200 shadow-2xl">
            <span className="flex items-center gap-1 font-mono font-bold text-[11px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
              W A S D / Arrows
            </span>
            <span>Walk</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono font-bold text-[11px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
              Mouse Drag
            </span>
            <span>Look Around</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono font-bold text-[11px] bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
              Shift
            </span>
            <span>Sprint</span>
          </div>

          {/* Mobile Virtual Touch D-Pad */}
          <div className="flex md:hidden items-center gap-1 p-1 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onTouchStart={() => triggerKeyEvent('KeyA', true)}
              onTouchEnd={() => triggerKeyEvent('KeyA', false)}
              className="p-2.5 rounded-xl bg-white/10 text-white active:bg-amber-400 active:text-black"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex flex-col gap-1">
              <button
                onTouchStart={() => triggerKeyEvent('KeyW', true)}
                onTouchEnd={() => triggerKeyEvent('KeyW', false)}
                className="p-2.5 rounded-xl bg-white/10 text-white active:bg-amber-400 active:text-black"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onTouchStart={() => triggerKeyEvent('KeyS', true)}
                onTouchEnd={() => triggerKeyEvent('KeyS', false)}
                className="p-2.5 rounded-xl bg-white/10 text-white active:bg-amber-400 active:text-black"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
            <button
              onTouchStart={() => triggerKeyEvent('KeyD', true)}
              onTouchEnd={() => triggerKeyEvent('KeyD', false)}
              className="p-2.5 rounded-xl bg-white/10 text-white active:bg-amber-400 active:text-black"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Navigation Mode Selector: Orbit Inspection vs First-Person Walk */}
      {isWalkSupported && (
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-amber-400/30 shadow-xl pointer-events-auto">
          <button
            onClick={() => setNavigationMode('ORBIT')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              navigationMode === 'ORBIT'
                ? 'bg-amber-400/25 text-amber-200 border border-amber-400/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Orbit className="w-3.5 h-3.5 text-amber-300" />
            <span>Orbit Camera</span>
          </button>

          <button
            onClick={() => setNavigationMode('FIRST_PERSON')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              navigationMode === 'FIRST_PERSON'
                ? 'bg-gradient-to-r from-emerald-500/30 to-amber-400/20 text-emerald-200 border border-emerald-400/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Footprints className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>First-Person Walk (WASD)</span>
          </button>
        </div>
      )}

      {/* 3. Contextual Balcony & Room Switchers */}
      {activeViewMode === 'APARTMENT_INTERIOR' && (
        <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto animate-fade-in">
          {/* Quick "Step onto Balcony" Prominent Action Button */}
          {currentRoom !== 'BALCONY_DECK' && (
            <button
              onClick={stepOntoBalcony}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all border border-emerald-400/50 cursor-pointer"
            >
              <Maximize className="w-3.5 h-3.5 text-emerald-200" />
              <span>Step onto Private Balcony</span>
            </button>
          )}

          {/* Apartment Typology Selector */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-amber-400/25 shadow-2xl">
            {apartmentTiers.map((tier) => {
              const isSelected = selectedApartmentType === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setApartmentType(tier.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/25 text-amber-200 border border-amber-400/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Sparkles className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{tier.label}</span>
                </button>
              );
            })}
          </div>

          {/* Contextual Room Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-emerald-400/25 shadow-2xl">
            {roomPills.map((room) => {
              const isActive = currentRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setCurrentRoom(room.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-300' : 'text-slate-500'}>
                    {room.icon}
                  </span>
                  <span>{room.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Main Floating Bottom Navigation Dock */}
      <div className="flex items-center gap-1.5 p-1.5 md:p-2 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] pointer-events-auto">
        {primaryViews.map((item) => {
          const isActive = activeViewMode === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setViewMode(item.id);
                if (item.id === 'DRONE_OVERVIEW') {
                  setNavigationMode('ORBIT');
                }
              }}
              className={`relative flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-2xl text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400/25 via-amber-400/20 to-emerald-400/15 text-amber-100 border border-amber-400/60 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-amber-300 scale-110' : 'text-slate-400 transition-transform'}>
                {item.icon}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>

              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-amber-400 shadow-[0_0_8px_#d4af37]"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Camera transition smooth progress bar / indicator */}
      {cameraTransitioning && navigationMode === 'ORBIT' && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-amber-400/30 text-[11px] text-amber-300 font-medium animate-pulse pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Aligning 3D Viewport...</span>
        </div>
      )}
    </div>
  );
};
