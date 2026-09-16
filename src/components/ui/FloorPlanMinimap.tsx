import React from 'react';
import { useTourStore } from '../../store/useTourStore';
import type { RoomType } from '../../types/tour';
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Tv,
  BedDouble,
  Trees,
  UtensilsCrossed,
  Laptop,
  DoorOpen,
} from 'lucide-react';

export const FloorPlanMinimap: React.FC = () => {
  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const currentRoom = useTourStore((state) => state.currentRoom);
  const setCurrentRoom = useTourStore((state) => state.setCurrentRoom);
  const isFloorPlanOpen = useTourStore((state) => state.isFloorPlanOpen);
  const setFloorPlanOpen = useTourStore((state) => state.setFloorPlanOpen);
  const selectedApartmentType = useTourStore((state) => state.selectedApartmentType);

  const cameraPosition = useTourStore((state) => state.cameraPosition);
  const cameraYaw = useTourStore((state) => state.cameraYaw);

  // Show minimap only when exploring the hotel suite or balcony
  if (activeViewMode !== 'APARTMENT_INTERIOR' && activeViewMode !== 'BALCONY_PANORAMA') {
    return null;
  }

  // Map 3D coordinates [-7.8 to 7.8, -5.8 to 8.6] into SVG 300x260 viewport
  const mapToSVG = (x: number, z: number) => {
    // 3D bounds: X (-8 to 8), Z (-6 to 9)
    const svgX = ((x + 8) / 16) * 280 + 10;
    const svgY = ((z + 6) / 15) * 230 + 15;
    return { x: svgX, y: svgY };
  };

  const currentPin = mapToSVG(cameraPosition[0], cameraPosition[2]);

  // Radar cone rotation angle in degrees
  const radarRotationDeg = (-cameraYaw * 180) / Math.PI;

  const roomHotspots: { id: RoomType; label: string; x3d: number; z3d: number; icon: React.ReactNode }[] = [
    {
      id: 'FOYER',
      label: 'Foyer Entry',
      x3d: 1.2,
      z3d: -4.5,
      icon: <DoorOpen className="w-3 h-3" />,
    },
    {
      id: 'LIVING_ROOM',
      label: 'Living Lounge',
      x3d: 2.8,
      z3d: 2.0,
      icon: <Tv className="w-3 h-3" />,
    },
    {
      id: 'KITCHENETTE',
      label: 'Kitchenette Bar',
      x3d: 2.5,
      z3d: -3.5,
      icon: <UtensilsCrossed className="w-3 h-3" />,
    },
    {
      id: 'MASTER_SUITE',
      label: 'Master Suite',
      x3d: -5.0,
      z3d: 2.2,
      icon: <BedDouble className="w-3 h-3" />,
    },
    {
      id: 'EXECUTIVE_DESK',
      label: 'Executive Desk',
      x3d: -5.2,
      z3d: -1.8,
      icon: <Laptop className="w-3 h-3" />,
    },
    {
      id: 'BALCONY_DECK',
      label: 'Panoramic Balcony',
      x3d: 2.8,
      z3d: 7.2,
      icon: <Trees className="w-3 h-3 text-emerald-400" />,
    },
  ];

  return (
    <div className="fixed bottom-24 right-4 md:right-8 z-30 pointer-events-auto">
      <div className="w-72 md:w-80 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
        {/* Header Bar */}
        <div
          onClick={() => setFloorPlanOpen(!isFloorPlanOpen)}
          className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10 cursor-pointer select-none hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-cinzel text-amber-100 tracking-wider">
                Suite Floor Plan
              </h4>
              <p className="text-[10px] text-slate-400">
                {selectedApartmentType === 'EXECUTIVE_SUITE' && 'Executive Hotel Suite • 550 SQFT'}
                {selectedApartmentType === '2_BED_LUXURY' && '2-Bed Luxury Suite • 950 SQFT'}
                {selectedApartmentType === 'SKY_PENTHOUSE' && 'Sky Penthouse Suite • 1,850 SQFT'}
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            {isFloorPlanOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Architectural Floor Plan SVG */}
        {isFloorPlanOpen && (
          <div className="p-3 bg-slate-950/70 space-y-2">
            <div className="relative w-full aspect-[300/250] rounded-xl bg-[#090e15] border border-white/10 overflow-hidden">
              {/* Architectural CAD vector layout */}
              <svg
                viewBox="0 0 300 250"
                className="w-full h-full text-slate-400 select-none"
              >
                {/* Grid guidelines */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  </pattern>
                  {/* Radar Gradient */}
                  <linearGradient id="radarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(212, 175, 55, 0.5)" />
                    <stop offset="100%" stopColor="rgba(212, 175, 55, 0.0)" />
                  </linearGradient>
                </defs>
                <rect width="300" height="250" fill="url(#grid)" />

                {/* 1. Suite Outer Perimeter Walls */}
                <rect
                  x="20"
                  y="20"
                  width="260"
                  height="160"
                  fill="rgba(15, 23, 42, 0.6)"
                  stroke="#334155"
                  strokeWidth="2.5"
                  rx="4"
                />

                {/* 2. Cantilever Private Balcony Deck */}
                <rect
                  x="90"
                  y="180"
                  width="180"
                  height="55"
                  fill="rgba(59, 34, 16, 0.5)"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  rx="3"
                />
                <text x="180" y="212" textAnchor="middle" fill="#d4af37" fontSize="9" fontWeight="600">
                  PRIVATE VALLEY BALCONY (180° VISTA)
                </text>

                {/* 3. Interior Partition Wall (Bedroom Divider) */}
                <line x1="115" y1="20" x2="115" y2="105" stroke="#475569" strokeWidth="2.5" />
                <line x1="115" y1="140" x2="115" y2="180" stroke="#475569" strokeWidth="2.5" />
                {/* Doorway passage arc */}
                <path d="M 115 105 A 35 35 0 0 1 115 140" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" strokeDasharray="2 2" />

                {/* 4. Luxury Bathroom Box */}
                <rect
                  x="25"
                  y="25"
                  width="85"
                  height="60"
                  fill="rgba(30, 41, 59, 0.6)"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <text x="67" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="500">
                  SPA BATH
                </text>

                {/* 5. Kitchenette Area */}
                <rect
                  x="130"
                  y="25"
                  width="135"
                  height="45"
                  fill="rgba(30, 41, 59, 0.5)"
                  stroke="#475569"
                  strokeWidth="1"
                />
                <text x="197" y="50" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="500">
                  KITCHENETTE BAR
                </text>

                {/* 6. Master King Bed Staging */}
                <rect
                  x="40"
                  y="105"
                  width="55"
                  height="60"
                  fill="rgba(6, 78, 59, 0.4)"
                  stroke="#10b981"
                  strokeWidth="1"
                  rx="2"
                />
                <text x="67" y="140" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="600">
                  KING BED
                </text>

                {/* 7. Living Sofa Staging */}
                <rect
                  x="145"
                  y="100"
                  width="95"
                  height="55"
                  fill="rgba(30, 41, 59, 0.6)"
                  stroke="#64748b"
                  strokeWidth="1"
                  rx="3"
                />
                <text x="192" y="132" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="600">
                  LIVING LOUNGE
                </text>

                {/* 8. Floor-to-Ceiling Glass Sliding Doors line */}
                <line x1="20" y1="180" x2="280" y2="180" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />

                {/* 9. Live Radar Viewing Cone */}
                <g transform={`translate(${currentPin.x}, ${currentPin.y}) rotate(${radarRotationDeg})`}>
                  {/* Viewing Fan */}
                  <path
                    d="M 0 0 L -35 65 A 75 75 0 0 0 35 65 Z"
                    fill="url(#radarGrad)"
                    pointerEvents="none"
                  />
                  {/* Direction pointer */}
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
                </g>

                {/* 10. Live User Position Marker Dot */}
                <circle
                  cx={currentPin.x}
                  cy={currentPin.y}
                  r="5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Quick Room Hotspots Pills */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              {roomHotspots.map((room) => {
                const isActive = currentRoom === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => setCurrentRoom(room.id)}
                    className={`flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400/25 text-amber-200 border border-amber-400/60 shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <span>{room.icon}</span>
                    <span className="truncate">{room.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
