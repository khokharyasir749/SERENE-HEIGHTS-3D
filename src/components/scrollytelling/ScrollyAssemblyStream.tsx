import React, { useEffect } from 'react';
import { useTourStore, APARTMENT_TIERS_INFO } from '../../store/useTourStore';
import {
  ArrowDown,
  ArrowUpRight,
  MessageCircle,
  FileText,
  Images,
} from 'lucide-react';

export const ScrollyAssemblyStream: React.FC = () => {
  const setScrollProgress = useTourStore((state) => state.setScrollProgress);
  const setActiveAssemblySection = useTourStore((state) => state.setActiveAssemblySection);
  const setInquiryModalOpen = useTourStore((state) => state.setInquiryModalOpen);
  const setInvestmentDrawerOpen = useTourStore((state) => state.setInvestmentDrawerOpen);
  const setGalleryModalOpen = useTourStore((state) => state.setGalleryModalOpen);
  const setApartmentType = useTourStore((state) => state.setApartmentType);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      setScrollProgress(progress);

      const section = Math.min(4, Math.floor(progress * 4.8));
      setActiveAssemblySection(section);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress, setActiveAssemblySection]);

  const handleWhatsAppInquiry = (subject?: string) => {
    const message = encodeURIComponent(
      `Hello Serene Heights Team, I am interested in inquiring about ${
        subject || 'Serviced Hotel Apartments'
      } at Serene Heights Nathia Gali (7,906 FT). Please share the payment schedule and private viewing arrangements.`
    );
    window.open(`https://wa.me/923008555777?text=${message}`, '_blank');
  };

  return (
    <div className="relative z-20 w-full pointer-events-none">
      {/* ===================================================================== */}
      {/* 0. HERO SECTION (0% Scroll)                                           */}
      {/* ===================================================================== */}
      <section className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-28 pointer-events-auto">
        <div className="max-w-md lg:max-w-lg ml-0 sm:ml-6 lg:ml-12 pt-8 space-y-6">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Nathia Gali • 7,906 FT
          </div>

          <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08]">
            SERENE HEIGHTS
            <span className="block text-xl sm:text-2xl font-normal text-slate-300 mt-2">
              Private Serviced Residences
            </span>
          </h1>

          <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5">
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              An exclusive high-altitude alpine resort situated on the forested ridgelines of Nathia Gali, offering fully managed luxury suites with institutional rental yields.
            </p>

            {/* Clean Tabular Spec Table */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-left">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Elevation</div>
                <div className="text-sm font-semibold text-white mt-0.5">7,906 FT</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Rental ROI</div>
                <div className="text-sm font-semibold text-amber-400 mt-0.5">14% – 19%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Installments</div>
                <div className="text-sm font-semibold text-white mt-0.5">3 Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="flex items-center gap-2 text-slate-400 text-xs tracking-wider uppercase ml-0 sm:ml-6 lg:ml-12 pb-6">
          <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>Scroll to explore architecture</span>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 1. GROUND & ARRIVAL (25% Scroll)                                      */}
      {/* ===================================================================== */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            01 / Foundation
          </div>

          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Ground & Arrival
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Engineered into solid Himalayan bedrock with native grey schist masonry, an architectural bronze drop-off canopy, and a 24/7 panoramic glass reception lobby.
          </p>

          <div className="border-t border-b border-white/10 py-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Structure</span>
              <span className="text-white font-medium">Seismic Zone 4 Podium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Access</span>
              <span className="text-white font-medium">Private Heated Approach</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Concierge</span>
              <span className="text-white font-medium">24/7 Hotel Reception</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setGalleryModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            >
              <Images className="w-3.5 h-3.5 text-amber-400" />
              <span>View Arrival Gallery</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. EXECUTIVE SUITES (50% Scroll)                                      */}
      {/* ===================================================================== */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            02 / Floors 1–3
          </div>

          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Executive Suites
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Turnkey 550 SQFT hotel suites designed for high-yield holiday rental pools. Featuring cantilevered cedar balconies, underfloor heating, and Italian sanitary fittings.
          </p>

          <div className="border-t border-b border-white/10 py-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Unit Area</span>
              <span className="text-white font-medium">550 SQFT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Configuration</span>
              <span className="text-white font-medium">1 King Bed + Living Room</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rental Pool Yield</span>
              <span className="text-amber-400 font-semibold">14% – 18% p.a.</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setApartmentType('EXECUTIVE_SUITE');
                setInvestmentDrawerOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>550 SQFT Payment Schedule</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. PANORAMIC RESIDENCES (75% Scroll)                                  */}
      {/* ===================================================================== */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            03 / Floors 4–6
          </div>

          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Panoramic Residences
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Expansive 950 SQFT two-bedroom residences with continuous Roman-arched corner glazing, cedar acoustic louvers, and 180° views across Mukshpuri Ridge.
          </p>

          <div className="border-t border-b border-white/10 py-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Unit Area</span>
              <span className="text-white font-medium">950 SQFT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Configuration</span>
              <span className="text-white font-medium">2 Master Suites + Dining</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rental Pool Yield</span>
              <span className="text-amber-400 font-semibold">15% – 19% p.a.</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setApartmentType('2_BED_LUXURY');
                setInvestmentDrawerOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>950 SQFT Payment Schedule</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. ROYAL PENTHOUSE (90% Scroll)                                       */}
      {/* ===================================================================== */}
      <section className="min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            04 / Sky Level
          </div>

          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Royal Penthouse
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            The pinnacle of alpine luxury at 7,926 FT. Double-height panoramic living spaces, private cedar pergola dining terrace, and a sunken basalt fire pit lounge.
          </p>

          <div className="border-t border-b border-white/10 py-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Residence Area</span>
              <span className="text-white font-medium">1,850 SQFT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sky Terrace</span>
              <span className="text-white font-medium">620 SQFT Outdoor Lounge</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Orientation</span>
              <span className="text-white font-medium">360° Mountain Panorama</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setApartmentType('SKY_PENTHOUSE');
                setInvestmentDrawerOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>View Penthouse Specifications</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. RESIDENCES PORTFOLIO & INQUIRY (100% Scroll)                       */}
      {/* ===================================================================== */}
      <section className="min-h-screen flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 py-24 pointer-events-auto">
        <div className="max-w-md w-full ml-0 sm:ml-6 lg:ml-12 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Reserve a Residence
          </div>

          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Own at Serene Heights
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Fully managed serviced suites with quarterly rental distributions and structured 3-year installment plans.
          </p>

          {/* Clean Minimalist Typology Rows */}
          <div className="space-y-2 border-t border-b border-white/10 py-3">
            {Object.values(APARTMENT_TIERS_INFO).map((tier) => (
              <div
                key={tier.id}
                className="flex items-center justify-between py-1.5 text-xs"
              >
                <div>
                  <div className="text-white font-medium">{tier.name}</div>
                  <div className="text-[11px] text-slate-400">{tier.sqft} SQFT • {tier.rentalYield}</div>
                </div>
                <div className="text-right">
                  <div className="text-amber-400 font-semibold">{tier.pricePKR}</div>
                  <button
                    onClick={() => handleWhatsAppInquiry(tier.name)}
                    className="text-[10px] text-slate-300 hover:text-white underline cursor-pointer mt-0.5"
                  >
                    Reserve Unit →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp CTA */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleWhatsAppInquiry()}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Inquiry</span>
            </button>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Brochure</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
