import React, { useEffect } from 'react';
import { useTourStore, APARTMENT_TIERS_INFO } from '../../store/useTourStore';
import {
  Mountain,
  Sparkles,
  Layers,
  Flame,
  CheckCircle2,
  Download,
  MessageCircle,
  Building2,
  TrendingUp,
  Maximize2,
} from 'lucide-react';

export const ScrollyAssemblyStream: React.FC = () => {
  const setScrollProgress = useTourStore((state) => state.setScrollProgress);
  const setActiveAssemblySection = useTourStore((state) => state.setActiveAssemblySection);
  const setInquiryModalOpen = useTourStore((state) => state.setInquiryModalOpen);
  const setInvestmentDrawerOpen = useTourStore((state) => state.setInvestmentDrawerOpen);
  const setGalleryModalOpen = useTourStore((state) => state.setGalleryModalOpen);
  const setApartmentType = useTourStore((state) => state.setApartmentType);

  // Monitor window scroll to update global scrollProgress (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      setScrollProgress(progress);

      // Section indexing (0 to 5)
      const section = Math.min(5, Math.floor(progress * 5.8));
      setActiveAssemblySection(section);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress, setActiveAssemblySection]);

  const handleWhatsAppBooking = (suiteName?: string) => {
    const message = encodeURIComponent(
      `Hello Serene Heights Team, I am interested in booking an official inquiry for ${
        suiteName || 'a Serviced Hotel Apartment'
      } at Serene Heights Nathia Gali (7,906 FT). Please share the payment schedule and site visit details.`
    );
    window.open(`https://wa.me/923008555777?text=${message}`, '_blank');
  };

  return (
    <div className="relative z-20 w-full pointer-events-none">
      {/* ========================================================================= */}
      {/* HERO SECTION (0% Scroll)                                                 */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-28 pointer-events-auto">
        <div className="max-w-xl lg:max-w-2xl ml-0 sm:ml-4 lg:ml-10 space-y-6 pt-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/30 backdrop-blur-xl border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-xl shadow-black/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>7,906 FT ELEVATION • NATHIA GALI, PAKISTAN</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
            SERENE HEIGHTS
            <span className="block text-xl sm:text-3xl lg:text-4xl font-light text-amber-200/90 mt-2 tracking-normal">
              Luxury Serviced Living Reimagined
            </span>
          </h1>

          <div className="p-6 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-2xl shadow-black/50 space-y-3">
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              Perched atop the pine-clad ridges of Nathia Gali. Scroll down to witness the piece-by-piece architectural assembly of Pakistan's finest high-altitude hotel apartment resort.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {[
                { label: 'Altitude', value: '7,906 FT', sub: 'Himalayan Ridge' },
                { label: 'Hotel Model', value: '100% Turnkey', sub: 'Fully Managed' },
                { label: 'Rental ROI', value: '14% – 19%', sub: 'Quarterly Payout' },
                { label: 'Payment', value: '3 Years', sub: '12 Installments' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-950/35 backdrop-blur-xl border border-white/10 shadow-lg"
                >
                  <div className="text-[10px] font-medium text-amber-300/90 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">{stat.value}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="flex items-center gap-3 text-amber-300/90 text-xs sm:text-sm font-medium tracking-wide animate-bounce pb-4 ml-0 sm:ml-4 lg:ml-10">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-950/30 backdrop-blur-xl border border-amber-400/40 shadow-lg text-amber-300">
            ↓
          </span>
          <span className="drop-shadow-md">Scroll down to assemble architectural tiers</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: PODIUM & SCHIST STONE ENTRANCE (20% Scroll)                    */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 p-7 sm:p-8 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-2xl shadow-black/50 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>STAGE 01 / 04 • FOUNDATION & ARRIVAL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
            The Alpine Schist Foundation & Porte-Cochère Arrival
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Anchored into solid Himalayan bedrock with natural grey schist stone masonry, an architectural bronze drop-off porch canopy, and a grand panoramic glass reception lobby.
          </p>

          <div className="space-y-2.5 pt-1">
            {[
              {
                title: 'Schist Stone Foundation Base',
                desc: 'Reinforced seismic podium engineered for steep alpine slopes.',
              },
              {
                title: 'Porte-Cochère Canopy',
                desc: 'Dual structural schist columns with warm recessed LED arrival lighting.',
              },
              {
                title: 'Grand Glass Reception Lobby',
                desc: '24/7 concierge with heated stone flooring & forest frontage.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-slate-950/30 backdrop-blur-md border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{item.title}: </span>
                  <span className="text-slate-300">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setGalleryModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-amber-500/20"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Architectural Gallery</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: LOWER SERVICED SUITES (40% Scroll)                             */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 p-7 sm:p-8 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-2xl shadow-black/50 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>STAGE 02 / 04 • FLOORS 1 TO 3</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
            Turnkey Executive Serviced Suites (550 SQFT)
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Tier 2 descends into place. Designed for luxury holidaymakers and high-yield hotel rental pools. Each suite features private cantilevered balconies with warm under-slab downlighting.
          </p>

          <div className="grid grid-cols-2 gap-2.5 py-1">
            <div className="p-3 rounded-2xl bg-slate-950/35 backdrop-blur-xl border border-white/10">
              <div className="text-[10px] text-amber-300 font-medium uppercase tracking-wider">Suite Size</div>
              <div className="text-sm sm:text-base font-bold text-white">550 SQFT</div>
              <div className="text-[10px] text-slate-400">1 King Bed + Lounge</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/35 backdrop-blur-xl border border-white/10">
              <div className="text-[10px] text-emerald-300 font-medium uppercase tracking-wider">Rental Pool ROI</div>
              <div className="text-sm sm:text-base font-bold text-white">14% – 18% p.a.</div>
              <div className="text-[10px] text-slate-400">Quarterly Dividends</div>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              {
                title: 'Cantilevered Balconies',
                desc: 'Solid cedar decking with reflective crystal glass balustrades.',
              },
              {
                title: 'Full Turnkey Furnishing',
                desc: 'Delivered fully fitted with Italian fixtures & hotel furnishings.',
              },
              {
                title: 'Smart Climate Control',
                desc: 'Underfloor heating & double-glazed thermal acoustic glass.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-slate-950/30 backdrop-blur-md border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{item.title}: </span>
                  <span className="text-slate-300">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setApartmentType('EXECUTIVE_SUITE');
                setInvestmentDrawerOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>View 550 SQFT Payment Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: UPPER LUXURY RESIDENCES (60% Scroll)                           */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 p-7 sm:p-8 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-2xl shadow-black/50 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span>STAGE 03 / 04 • FLOORS 4 TO 6</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
            Panoramic Mountain Residences (950 SQFT)
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Tier 3 locks in seamlessly. Expansive 2-Bedroom luxury serviced apartments with dual-aspect corner glazing, architectural louvers, and dramatic 180° views of Mukshpuri Ridge.
          </p>

          <div className="grid grid-cols-2 gap-2.5 py-1">
            <div className="p-3 rounded-2xl bg-slate-950/35 backdrop-blur-xl border border-white/10">
              <div className="text-[10px] text-amber-300 font-medium uppercase tracking-wider">Residence Size</div>
              <div className="text-sm sm:text-base font-bold text-white">950 SQFT</div>
              <div className="text-[10px] text-slate-400">2 Executive Master Beds</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/35 backdrop-blur-xl border border-white/10">
              <div className="text-[10px] text-emerald-300 font-medium uppercase tracking-wider">Rental Yield</div>
              <div className="text-sm sm:text-base font-bold text-white">15% – 19% p.a.</div>
              <div className="text-[10px] text-slate-400">Prime Family Demand</div>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              {
                title: 'Vertical Cedar Louvers',
                desc: 'Acoustic and sun shading louvers in warm smoked walnut tones.',
              },
              {
                title: 'Corner Panoramic Balconies',
                desc: 'Extended depth cantilevered decks with bronze balustrades.',
              },
              {
                title: 'Designer Fireplace Lounge',
                desc: 'Linear electric fireplace, Calacatta marble island & bar stools.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-slate-950/30 backdrop-blur-md border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{item.title}: </span>
                  <span className="text-slate-300">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setApartmentType('2_BED_LUXURY');
                setInvestmentDrawerOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>View 950 SQFT Payment Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: ROYAL SKY PENTHOUSE & PERGOLA CROWN (80% Scroll)               */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 p-7 sm:p-8 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-2xl shadow-black/50 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>STAGE 04 / 04 • LEVEL 8 & SKY TERRACE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
            The Royal Sky Penthouse & Pergola Observation Deck
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            The crown tier descends and locks onto the structure. Royal Sky Penthouse (1,850 SQFT) with double-height glass frontage, open-air timber pergola dining canopy, and sunken basalt fire pit lounge.
          </p>

          <div className="space-y-2.5">
            {[
              {
                title: 'Open Timber Pergola Canopy',
                desc: 'Architectural steel frame and smoked oak slats with warm LED lighting.',
              },
              {
                title: 'Sunken Basalt Fire Pit',
                desc: 'Circular basalt stone basin with flickering alpine fire & modular lounge sofas.',
              },
              {
                title: 'Highest Altitude in Nathia Gali',
                desc: 'Perched at 7,926 FT offering 360° unobstructed Himalayan horizon views.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl bg-slate-950/30 backdrop-blur-md border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{item.title}: </span>
                  <span className="text-slate-300">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setApartmentType('SKY_PENTHOUSE');
                setInvestmentDrawerOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Sky Penthouse Details</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: FULL ARCHITECTURAL COMPLETION & WHATSAPP CTA (100% Scroll)     */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 pt-28 md:pt-36 pb-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 p-6 sm:p-7 rounded-3xl bg-black/25 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 shadow-2xl shadow-black/50 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wider uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ARCHITECTURAL ASSEMBLY COMPLETE • 7,906 FT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md leading-snug">
            Own a Piece of Nathia Gali's Most Coveted Luxury Address
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            The entire building is fully assembled. Delivered 100% turnkey with full hotel furniture, managed under an international rental pool model with 14%–19% annual returns.
          </p>

          {/* Typologies Comparison (Compact Left-Docked Stack) */}
          <div className="space-y-2 pt-1">
            {Object.values(APARTMENT_TIERS_INFO).map((tier) => (
              <div
                key={tier.id}
                className="p-3 rounded-2xl bg-slate-950/40 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
                    {tier.name}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {tier.pricePKR} • <span className="text-slate-300 font-normal">{tier.sqft} SQFT</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">{tier.rentalYield}</div>
                </div>

                <button
                  onClick={() => handleWhatsAppBooking(tier.name)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-amber-500/10 shrink-0"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Book</span>
                </button>
              </div>
            ))}
          </div>

          {/* Direct Developer Contact Banner */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 border-t border-white/10">
            <button
              onClick={() => handleWhatsAppBooking()}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Booking (+92 300 8555777)</span>
            </button>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-950/40 hover:bg-slate-900/60 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Brochure & Plan</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

