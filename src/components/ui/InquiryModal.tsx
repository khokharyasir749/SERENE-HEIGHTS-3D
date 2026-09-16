import React, { useState } from 'react';
import { useTourStore, APARTMENT_TIERS_INFO } from '../../store/useTourStore';
import type { ApartmentTier } from '../../types/tour';
import {
  X,
  Sparkles,
  CheckCircle2,
  Maximize2,
  BedDouble,
  Bath,
  Phone,
  Mail,
  User,
  Check,
  MessageCircle,
  MapPin,
} from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const isOpen = useTourStore((state) => state.isInquiryModalOpen);
  const setIsOpen = useTourStore((state) => state.setInquiryModalOpen);
  const selectedTier = useTourStore((state) => state.selectedApartmentType);
  const setApartmentType = useTourStore((state) => state.setApartmentType);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tier: selectedTier,
    notes: '',
  });

  if (!isOpen) return null;

  const currentDetails = APARTMENT_TIERS_INFO[selectedTier];

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Hello Serene Heights Sales Team,\n\nI am interested in reserving / requesting details for the *${currentDetails.name}* (${currentDetails.sqft} SQFT, ${currentDetails.pricePKR}) at Serene Heights Nathia Gali (7,906 FT).\n\n• Name: ${formData.name || 'Interested Client'}\n• Contact: ${formData.phone || 'Provided via Web'}\n• Email: ${formData.email || 'N/A'}\n• Inquiries: ${formData.notes || 'Please share official payment plan & dossier.'}\n\nThank you!`;

    const whatsappUrl = `https://wa.me/923008555777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-amber-400/35 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wider font-cinzel text-amber-100">
                Official VIP Reservation & WhatsApp Connect
              </h2>
              <p className="text-xs text-slate-400">
                Serene Heights Nathia Gali (7,906 FT) • Direct Developer Desk
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

        {submitted ? (
          <div className="p-8 flex flex-col items-center text-center gap-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold font-cinzel text-amber-100">
              Inquiry Registered & WhatsApp Connected
            </h3>
            <p className="text-sm text-slate-300 max-w-md">
              Thank you, <span className="text-amber-300 font-semibold">{formData.name || 'Valued Investor'}</span>. A WhatsApp chat with our Senior Investment Specialist has been initiated with your chosen suite specifications and payment schedule.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setIsOpen(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition-all cursor-pointer"
            >
              Return to 3D Virtual Walkthrough
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Selected Apartment Tier Overview */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">
                    Selected Serviced Suite
                  </span>
                  <h3 className="text-base font-bold font-cinzel text-white">
                    {currentDetails.name}
                  </h3>
                  <p className="text-xs text-slate-300">{currentDetails.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-amber-300">
                    {currentDetails.pricePKR}
                  </span>
                  <p className="text-[10px] text-emerald-400 font-semibold">
                    {currentDetails.rentalYield}
                  </p>
                </div>
              </div>

              {/* Spec Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/20">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentDetails.sqft} SQFT</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/20">
                  <BedDouble className="w-3.5 h-3.5 text-amber-300" />
                  <span className="truncate">{currentDetails.beds}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-black/20">
                  <Bath className="w-3.5 h-3.5 text-amber-300" />
                  <span className="truncate">{currentDetails.baths}</span>
                </div>
              </div>

              {/* Tier Switcher Chips */}
              <div className="flex items-center gap-2 pt-1">
                {(['EXECUTIVE_SUITE', '2_BED_LUXURY', 'SKY_PENTHOUSE'] as ApartmentTier[]).map(
                  (tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setApartmentType(tier)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        selectedTier === tier
                          ? 'bg-amber-400/25 text-amber-200 border border-amber-400/50'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {tier === 'EXECUTIVE_SUITE' && 'Executive (550 SQFT)'}
                      {tier === '2_BED_LUXURY' && '2-Bed (950 SQFT)'}
                      {tier === 'SKY_PENTHOUSE' && 'Penthouse (1850 SQFT)'}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Official Developer Contact Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Nathia Gali Site Office</span>
                  <span className="text-slate-200 text-[11px]">Main Murree Road, Nathia Gali (7,906 FT)</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Direct Developer Hotline</span>
                  <span className="text-emerald-300 font-mono text-[11px]">+92 300 8555777</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mansoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/70"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/70"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="tariq@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Inquiry Notes & Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Inquiry about rental pool revenue share, flexible 3-year installments, or site visit..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400/70 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Direct Official Pricing • No Broker Commissions
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-950/50 hover:from-emerald-400 hover:to-emerald-500 transition-all cursor-pointer flex items-center justify-center gap-2 border border-emerald-400/50"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Connect Directly on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
