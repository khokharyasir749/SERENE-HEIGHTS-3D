import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTourStore } from '../../store/useTourStore';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  MessageCircle,
  Building2,
  Mountain,
  Home,
  CheckCircle2,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  category: 'EXTERIOR' | 'VIEWS' | 'SUITES';
  title: string;
  subtitle: string;
  tag: string;
  featured?: boolean;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'img-1',
    src: '/gallery/gallery-ext-twilight.jpg',
    category: 'EXTERIOR',
    title: 'Twilight Alpine Facade & Illuminated Balconies',
    subtitle: 'French-Chalet classical stone architecture with warm amber suite glows under Himalayan twilight skies.',
    tag: 'Official Render • 7,906 FT',
    featured: true,
  },
  {
    id: 'img-2',
    src: '/gallery/gallery-penthouse-terrace.jpg',
    category: 'SUITES',
    title: 'Royal Penthouse Sky Terrace & Cedar Pergola',
    subtitle: 'Private rooftop outdoor entertaining deck with open cedar timber pergola and 360° Mukshpuri mountain panorama.',
    tag: 'Sky Lounge Deck • Level 8.5',
    featured: true,
  },
  {
    id: 'img-3',
    src: '/gallery/gallery-balcony-view.jpg',
    category: 'SUITES',
    title: 'Cantilevered Suite Balcony & Mountain Vista',
    subtitle: 'Deep private balcony terrace with black wrought-iron balustrades overlooking snow-clad pine valleys.',
    tag: 'Executive Suite Terrace',
    featured: true,
  },
  {
    id: 'img-4',
    src: '/gallery/gallery-hotel-entrance.jpg',
    category: 'EXTERIOR',
    title: 'Grand Porte-Cochère & Schist Podium Arrival',
    subtitle: 'Natural schist stone retaining walls, brass-trimmed arrival canopy, and classical carriage lanterns.',
    tag: 'Ground Level Arrival',
  },
  {
    id: 'img-5',
    src: '/gallery/gallery-elevation-snow.jpg',
    category: 'EXTERIOR',
    title: 'Snow-Clad Winter Elevation & Pine Forest',
    subtitle: 'Frontal architectural elevation surrounded by pristine snow-covered pine slopes of Nathia Gali.',
    tag: 'Winter Elevation View',
  },
  {
    id: 'img-6',
    src: '/gallery/gallery-chalet-architecture.jpg',
    category: 'EXTERIOR',
    title: 'French Limestone Arch Windows & Multi-Tier Bay',
    subtitle: 'Continuous central Roman-arched window bay framed with limestone pilasters and decorative keystone headers.',
    tag: 'Architectural Details',
  },
  {
    id: 'img-7',
    src: '/gallery/gallery-aerial-forest.jpg',
    category: 'VIEWS',
    title: 'Himalayan Forest Canopy & Aerial Panorama',
    subtitle: 'Breathtaking high-altitude perspective of virgin evergreen pine ridges stretching towards Kashmir peaks.',
    tag: 'Aerial Ridge Perspective',
  },
  {
    id: 'img-8',
    src: '/gallery/gallery-pine-ridge-view.jpg',
    category: 'VIEWS',
    title: 'Sunlit Pine Ridge & Valley Vista',
    subtitle: 'Crisp mountain air and endless Himalayan valley views from the north-facing suites.',
    tag: 'Valley Horizon',
  },
  {
    id: 'img-9',
    src: '/gallery/gallery-ext-day.jpg',
    category: 'EXTERIOR',
    title: 'Daylight Architectural Perspective',
    subtitle: 'Natural alpine daylight highlighting the warm cream stucco finish, cedar accents, and dark metal mullions.',
    tag: 'Daylight Architecture',
  },
  {
    id: 'img-10',
    src: '/gallery/gallery-residence-facade.jpg',
    category: 'EXTERIOR',
    title: 'Luxury Serviced Residences Frontage',
    subtitle: 'Symmetrical facade design ensuring every suite enjoys unhindered front-facing Himalayan sunrise views.',
    tag: 'Residences Frontage',
  },
  {
    id: 'img-11',
    src: '/gallery/gallery-suite-interior-view.jpg',
    category: 'SUITES',
    title: 'Panoramic Glass Glazing & Living Space',
    subtitle: 'Floor-to-ceiling double-glazed thermal windows offering immersive alpine views from the comfort of bed.',
    tag: 'Turnkey Suite Living',
  },
  {
    id: 'img-12',
    src: '/gallery/gallery-sunset-facade.jpg',
    category: 'VIEWS',
    title: 'Sunset Crimson Sky & Alpine Silhouette',
    subtitle: 'Magical golden-hour alpine glow lighting up the mountain ridgelines behind Serene Heights.',
    tag: 'Alpine Sunset Hour',
  },
  {
    id: 'img-13',
    src: '/gallery/gallery-snow-approach.jpg',
    category: 'VIEWS',
    title: 'Scenic Winter Snow Road Approach',
    subtitle: 'Snow-plowed private access drive lined with lit carriage lamps leading up to the hotel arrival court.',
    tag: 'Private Access Drive',
  },
];

export const ProjectGalleryModal: React.FC = () => {
  const isOpen = useTourStore((state) => state.isGalleryModalOpen);
  const setIsOpen = useTourStore((state) => state.setGalleryModalOpen);

  const [filter, setFilter] = useState<'ALL' | 'EXTERIOR' | 'VIEWS' | 'SUITES'>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    if (filter === 'ALL') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === filter);
  }, [filter]);

  // Navigate lightbox
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          setIsOpen(false);
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxIndex, handlePrev, handleNext, setIsOpen]);

  // WhatsApp booking inquiry with current image context
  const handleWhatsAppInquiry = (imgTitle?: string) => {
    const message = encodeURIComponent(
      `Hello Serene Heights Team, I am viewing the official gallery photo "${
        imgTitle || 'Serene Heights Architecture'
      }". I would like more details regarding unit availability, pricing, and site visits.`
    );
    window.open(`https://wa.me/923008555777?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-3xl overflow-y-auto animate-fadeIn select-none">
      {/* ===================================================================== */}
      {/* 1. TOP STICKY HEADER                                                  */}
      {/* ===================================================================== */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-12 py-5 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Serene Heights Nathia Gali
              </h2>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                7,906 FT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Official High-Resolution Photo & Architectural Gallery ({GALLERY_IMAGES.length} Images)
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
          title="Close Gallery (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 2. FILTER TABS & STATS BAR                                            */}
      {/* ===================================================================== */}
      <div className="px-6 sm:px-12 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'ALL', label: 'All Photos', count: GALLERY_IMAGES.length, icon: Sparkles },
            {
              key: 'EXTERIOR',
              label: 'Exterior Architecture',
              count: GALLERY_IMAGES.filter((i) => i.category === 'EXTERIOR').length,
              icon: Building2,
            },
            {
              key: 'VIEWS',
              label: 'Valley & Forest Views',
              count: GALLERY_IMAGES.filter((i) => i.category === 'VIEWS').length,
              icon: Mountain,
            },
            {
              key: 'SUITES',
              label: 'Suites & Balconies',
              count: GALLERY_IMAGES.filter((i) => i.category === 'SUITES').length,
              icon: Home,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-slate-950' : 'text-amber-300'}`} />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                    active ? 'bg-slate-950/20 text-slate-950' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 font-medium hidden md:block">
          Showing <span className="text-white font-bold">{filteredItems.length}</span> official photo assets
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. MASONRY / BENTO PHOTO GRID                                         */}
      {/* ===================================================================== */}
      <div className="flex-1 p-6 sm:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-3xl overflow-hidden bg-slate-950/60 border border-white/10 hover:border-amber-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Zoom on Hover */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Top Badge Tag */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 text-amber-300 text-[10px] font-semibold tracking-wider uppercase">
                  {item.tag}
                </div>

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-amber-400 text-slate-950 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-2 bg-gradient-to-b from-slate-950/40 to-slate-950/90 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-amber-300/80 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Official Render
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300 text-white">
                    View Fullscreen →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. FULL-SCREEN LIGHTBOX PREVIEW MODAL                                 */}
      {/* ===================================================================== */}
      {currentLightboxItem && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-3xl animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar inside Lightbox */}
          <div
            className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-70 bg-gradient-to-b from-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                {lightboxIndex! + 1} / {filteredItems.length}
              </span>
              <span className="text-sm text-slate-300 font-medium hidden sm:inline-block">
                {currentLightboxItem.tag}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleWhatsAppInquiry(currentLightboxItem.title)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire About This View</span>
              </button>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 z-70 p-3.5 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-slate-950 transition-all cursor-pointer shadow-2xl backdrop-blur-lg"
            title="Previous Image (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentLightboxItem.src}
              alt={currentLightboxItem.title}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/15"
            />

            {/* Bottom Caption & WhatsApp CTA */}
            <div className="w-full max-w-2xl text-center mt-4 px-4 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentLightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {currentLightboxItem.subtitle}
              </p>
              <div className="pt-2 sm:hidden">
                <button
                  onClick={() => handleWhatsAppInquiry(currentLightboxItem.title)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 z-70 p-3.5 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-slate-950 transition-all cursor-pointer shadow-2xl backdrop-blur-lg"
            title="Next Image (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

// Also export as GalleryModal for alternate imports
export const GalleryModal = ProjectGalleryModal;
export default ProjectGalleryModal;
