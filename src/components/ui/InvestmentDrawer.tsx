import React from 'react';
import { useTourStore, APARTMENT_TIERS_INFO } from '../../store/useTourStore';
import type { ApartmentTier } from '../../types/tour';
import {
  X,
  TrendingUp,
  ShieldCheck,
  Building,
  Calendar,
  Sparkles,
  Percent,
} from 'lucide-react';

export const InvestmentDrawer: React.FC = () => {
  const isOpen = useTourStore((state) => state.isInvestmentDrawerOpen);
  const setIsOpen = useTourStore((state) => state.setInvestmentDrawerOpen);
  const selectedTier = useTourStore((state) => state.selectedApartmentType);
  const setApartmentType = useTourStore((state) => state.setApartmentType);
  const setInquiryOpen = useTourStore((state) => state.setInquiryModalOpen);

  if (!isOpen) return null;

  const currentDetails = APARTMENT_TIERS_INFO[selectedTier];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in pointer-events-auto">
      <div className="w-full max-w-lg h-full bg-slate-900/95 border-l border-amber-400/25 shadow-2xl flex flex-col overflow-hidden animate-slide-left">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider font-cinzel text-amber-100">
                Investment ROI & Payment Plans
              </h3>
              <p className="text-[11px] text-slate-400">
                Official Hotel Serviced Suites • sereneheightsnathiagali.com
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Typology Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
            {(['EXECUTIVE_SUITE', '2_BED_LUXURY', 'SKY_PENTHOUSE'] as ApartmentTier[]).map((tier) => {
              const isSelected = selectedTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setApartmentType(tier)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-amber-400/25 text-amber-200 border border-amber-400/50 shadow-sm'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {tier === 'EXECUTIVE_SUITE' && 'Executive (550)'}
                  {tier === '2_BED_LUXURY' && '2-Bed (950)'}
                  {tier === 'SKY_PENTHOUSE' && 'Penthouse (1850)'}
                </button>
              );
            })}
          </div>

          {/* Active Tier Investment Snapshot */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-400/15 via-slate-900/80 to-slate-950/90 border border-amber-400/35 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">
                Official Pricing & Returns
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                <Percent className="w-3 h-3" />
                <span>{currentDetails.rentalYield}</span>
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold font-cinzel text-white">
                {currentDetails.name}
              </h4>
              <p className="text-xs text-slate-300">{currentDetails.tagline}</p>
            </div>

            {/* Price & Area Specs */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-400/20 text-xs">
              <div className="p-2.5 rounded-xl bg-black/30">
                <span className="block text-slate-400 text-[10px]">Total Price</span>
                <span className="font-bold text-amber-200 text-sm">{currentDetails.pricePKR}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30">
                <span className="block text-slate-400 text-[10px]">Floor Area</span>
                <span className="font-bold text-amber-200 text-sm">{currentDetails.sqft} SQFT</span>
              </div>
            </div>
          </div>

          {/* 3-Year Installment Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-300 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>3-Year Flexible Payment Plan (PKR)</span>
            </h4>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Down Payment (25% on Booking)</span>
                <span className="font-bold text-amber-300">{currentDetails.downPayment}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">12 Quarterly Installments</span>
                <span className="font-bold text-amber-300">{currentDetails.quarterlyInstallment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">On Possession (Key Handover)</span>
                <span className="font-bold text-emerald-400">Remaining Balance (10%)</span>
              </div>
            </div>
          </div>

          {/* Hotel Management Rental Pool Advantages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Serviced Hotel Rental Program Advantages</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              {[
                'Zero hassle hotel management: check-in, marketing, housekeeping & maintenance handled by on-site operator.',
                'Guaranteed high occupancy driven by Nathia Gali peak summer season & snowy winter tourism.',
                'Quarterly revenue sharing paid directly into your verified bank account.',
                '30 complimentary days of luxury personal vacation stay per annum for owners.',
              ].map((adv, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-white/10 bg-white/5">
          <button
            onClick={() => {
              setIsOpen(false);
              setInquiryOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Building className="w-4 h-4" />
            <span>Request Official Payment Plan Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
