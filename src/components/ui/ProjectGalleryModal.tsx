import React, { useState } from 'react';
import { useTourStore } from '../../store/useTourStore';
import {
  X,
  Layers,
  Image as ImageIcon,
  Compass,
  Building,
  Check,
  ZoomIn,
} from 'lucide-react';

export const ProjectGalleryModal: React.FC = () => {
  const isOpen = useTourStore((state) => state.isGalleryModalOpen);
  const setIsOpen = useTourStore((state) => state.setGalleryModalOpen);
  const setInquiryOpen = useTourStore((state) => state.setInquiryModalOpen);

  const [activeTab, setActiveTab] = useState<'EXTERIOR' | 'BLUEPRINT' | 'FLOORPLAN'>('EXTERIOR');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const galleryData = [
    {
      id: 'ext-1',
      tab: 'EXTERIOR',
      title: 'South-East Mountain Elevation & Cantilever Balconies',
      desc: 'Stepped modern alpine architecture facing the Mukshpuri pine ridges with floor-to-ceiling double glazing.',
      tag: 'Architectural Render • 7,906 FT',
      svg: (
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="bldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#skyGrad)" />
          {/* Mountain Silhouettes */}
          <polygon points="0,180 80,110 160,160 260,90 340,150 400,100 400,240 0,240" fill="#1e3a29" />
          <polygon points="40,240 140,140 220,200 310,130 400,190 400,240 0,240" fill="#13271b" opacity="0.8" />
          {/* Building Massing */}
          <rect x="120" y="50" width="160" height="150" fill="url(#bldGrad)" stroke="#d4af37" strokeWidth="1.5" rx="3" />
          {/* Cantilever Balconies */}
          {[70, 95, 120, 145, 170].map((y, i) => (
            <g key={i}>
              <rect x="105" y={y} width="190" height="16" fill="#3b2210" stroke="#d4af37" strokeWidth="0.8" />
              <rect x="105" y={y - 8} width="190" height="8" fill="rgba(186, 230, 253, 0.4)" stroke="#bae6fd" strokeWidth="0.5" />
            </g>
          ))}
          {/* Rooftop Pergola */}
          <rect x="135" y="38" width="130" height="12" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          <text x="200" y="225" textAnchor="middle" fill="#d4af37" fontSize="10" fontWeight="700">
            SERENE HEIGHTS - SOUTHEAST ELEVATION (7,906 FT)
          </text>
        </svg>
      ),
    },
    {
      id: 'ext-2',
      tab: 'EXTERIOR',
      title: 'Rooftop Sky Dining & Heated Fire Pit Deck',
      desc: '360° open-air fine dining lounge featuring heated outdoor seating and glass windscreens at 7,906 ft.',
      tag: 'Sky Lounge Deck • Level 8.5',
      svg: (
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <rect width="400" height="240" fill="#0f172a" />
          {/* Sunset Horizon */}
          <rect x="0" y="0" width="400" height="140" fill="linear-gradient(to bottom, #1e1b4b, #c2410c)" />
          {/* Timber Deck */}
          <rect x="30" y="130" width="340" height="90" fill="#2d1c11" stroke="#d4af37" strokeWidth="1.5" />
          {/* Fire Pit */}
          <circle cx="200" cy="175" r="28" fill="#181c20" stroke="#ff7a18" strokeWidth="2" />
          <circle cx="200" cy="175" r="16" fill="#ff5500" className="animate-pulse" />
          {/* Glass Railing */}
          <rect x="30" y="115" width="340" height="16" fill="rgba(147, 197, 253, 0.3)" stroke="#93c5fd" strokeWidth="0.8" />
          <text x="200" y="215" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">
            OPEN-AIR SKY LOUNGE & FIRE PIT
          </text>
        </svg>
      ),
    },
    {
      id: 'blue-1',
      tab: 'BLUEPRINT',
      title: 'Seismic Zone 4 Reinforced Concrete Foundation',
      desc: 'High-strength alpine structural engineering designed specifically for Himalayan geological conditions and frost heave.',
      tag: 'Engineering Blueprint • Structural CAD',
      svg: (
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <rect width="400" height="240" fill="#032541" />
          <defs>
            <pattern id="bpGrid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#094572" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="400" height="240" fill="url(#bpGrid)" />
          {/* Structural Lines */}
          <rect x="50" y="40" width="300" height="150" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <line x1="50" y1="90" x2="350" y2="90" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="50" y1="140" x2="350" y2="140" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="150" y1="40" x2="150" y2="190" stroke="#60a5fa" strokeWidth="1.5" />
          <line x1="250" y1="40" x2="250" y2="190" stroke="#60a5fa" strokeWidth="1.5" />
          {/* Foundation Footings */}
          {[70, 150, 230, 310].map((x) => (
            <rect key={x} x={x} y="190" width="30" height="25" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.5" />
          ))}
          <text x="200" y="30" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="700">
            SEISMIC ZONE 4 PILE & RAFT FOUNDATION SCHEMATIC
          </text>
        </svg>
      ),
    },
    {
      id: 'blue-2',
      tab: 'BLUEPRINT',
      title: 'European Radiant Underfloor Heating & Thermal Envelope',
      desc: 'Central hot-water radiant loops embedded within floor slabs providing even, draft-free warmth throughout sub-zero winters.',
      tag: 'HVAC Schematic • Radiant Heating',
      svg: (
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <rect width="400" height="240" fill="#1a1c23" />
          <rect x="40" y="40" width="320" height="150" fill="#0f172a" stroke="#f97316" strokeWidth="2" />
          {/* Heating coils S-curves */}
          <path
            d="M 60 70 Q 200 60 340 70 M 340 95 Q 200 105 60 95 M 60 120 Q 200 110 340 120 M 340 145 Q 200 155 60 145 M 60 170 Q 200 160 340 170"
            fill="none"
            stroke="#fb923c"
            strokeWidth="2"
          />
          <text x="200" y="30" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="700">
            RADIANT FLOOR HEATING LOOP DISTRIBUTION PLAN
          </text>
        </svg>
      ),
    },
    {
      id: 'fp-1',
      tab: 'FLOORPLAN',
      title: 'Executive Serviced Hotel Suite (550 SQFT)',
      desc: 'Complete turnkey luxury studio suite with private cantilevered balcony, spa bath, and kitchenette bar.',
      tag: 'Suite Layout • 550 SQFT',
      svg: (
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <rect width="400" height="240" fill="#0a0f18" />
          <rect x="60" y="30" width="280" height="140" fill="#1e293b" stroke="#d4af37" strokeWidth="2" rx="3" />
          <rect x="140" y="170" width="200" height="45" fill="#3b2210" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="240" y="196" textAnchor="middle" fill="#d4af37" fontSize="9" fontWeight="600">
            PRIVATE BALCONY (180° MOUNTAIN VISTA)
          </text>
          <rect x="75" y="45" width="90" height="60" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <text x="120" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="700">
            KING BED SUITE
          </text>
          <rect x="190" y="45" width="130" height="70" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          <text x="255" y="85" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">
            LIVING LOUNGE & FIREPLACE
          </text>
        </svg>
      ),
    },
    {
      id: 'fp-2',
      tab: 'FLOORPLAN',
      title: '2-Bedroom Luxury Serviced Residence (950 SQFT)',
      desc: 'Dual-aspect corner residence with wrap-around balcony, two master ensuite bedrooms, and spacious central lounge.',
      tag: 'Family Suite Layout • 950 SQFT',
      svg: (
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <rect width="400" height="240" fill="#0a0f18" />
          <rect x="40" y="25" width="320" height="150" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="3" />
          <rect x="100" y="175" width="260" height="45" fill="#3b2210" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="230" y="202" textAnchor="middle" fill="#d4af37" fontSize="9" fontWeight="600">
            EXPANSIVE CORNER BALCONY DECK
          </text>
          <rect x="55" y="40" width="80" height="70" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="95" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="700">
            MASTER 1
          </text>
          <rect x="265" y="40" width="80" height="70" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="305" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="700">
            MASTER 2
          </text>
          <rect x="145" y="40" width="110" height="90" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          <text x="200" y="90" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">
            CENTRAL LIVING
          </text>
        </svg>
      ),
    },
  ];

  const filteredItems = galleryData.filter((item) => item.tab === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-amber-400/35 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wider font-cinzel text-amber-100">
                Official Media Gallery & Master Blueprints
              </h2>
              <p className="text-xs text-slate-400">
                Serene Heights Nathia Gali (7,906 FT) • Fixed Architectural Standards
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 bg-black/20">
          {[
            { id: 'EXTERIOR', label: 'Exterior Views & Site Renders', icon: <ImageIcon className="w-3.5 h-3.5" /> },
            { id: 'BLUEPRINT', label: 'Architectural & Engineering Blueprints', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'FLOORPLAN', label: 'Suite CAD Floor Plans', icon: <Building className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'EXTERIOR' | 'BLUEPRINT' | 'FLOORPLAN')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400/25 text-amber-200 border border-amber-400/50 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className="group p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer flex flex-col space-y-3"
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/40 border border-white/5">
                {item.svg}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-full bg-slate-900/90 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-400/40">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View High-Res Schematic</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {item.tag}
                </span>
                <h3 className="text-sm font-bold text-white font-cinzel mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Approved Architectural Drawings (sereneheightsnathiagali.com)</span>
          </span>

          <button
            onClick={() => {
              setIsOpen(false);
              setInquiryOpen(true);
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            <span>Request Full Architectural Dossier</span>
          </button>
        </div>

        {/* Single Image Lightbox Popup */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full p-4 rounded-3xl bg-slate-900 border border-amber-400/40">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-full aspect-[16/10]">
                {galleryData.find((d) => d.id === selectedImage)?.svg}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
