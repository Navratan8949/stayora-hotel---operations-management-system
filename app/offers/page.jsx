"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { Sparkles, Copy, Check, ArrowRight, Tag, Calendar, ShieldCheck } from "lucide-react";

export default function OffersPage() {
  const { offers, currentProperty, addToast } = useStayora();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addToast(`Promo code ${code} copied!`, "success");
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-16 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Curated Privileges & Packages
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 mb-3">
            Special Offers & Promotional Rates
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Reserve directly with Stayora to unlock guaranteed best available rates, complimentary champagne breakfasts, and bespoke royal upgrades.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {offer.badge && (
                <span className="absolute top-5 right-5 bg-[#c5a059] text-[#0d2b24] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {offer.badge}
                </span>
              )}

              <div>
                <div className="font-serif text-4xl font-bold text-[#0d2b24] mb-2">
                  {offer.discountPercent}% OFF
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-[#c5a059] transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-6">
                  {offer.description}
                </p>

                <div className="space-y-2 text-xs text-stone-500 py-4 border-y border-stone-100">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Min. Booking Value: ₹{offer.minBookingValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Valid until: {offer.validUntil}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0d2b24] bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="p-2 text-stone-400 hover:text-stone-800 transition-colors"
                    title="Copy promo code"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <Link
                  href={`/booking?promoCode=${offer.code}`}
                  className="px-4 py-2.5 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <span>Book With Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Booking Guarantee Card */}
        <div className="mt-16 bg-[#f3ede2]/70 rounded-3xl p-8 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Stayora Direct Pledge
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0d2b24]">
              Always the Guaranteed Best Rate
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              When you book directly with Stayora, you receive priority room assignment, early check-in preference, complimentary high-speed Wi-Fi, and personalized concierge care.
            </p>
          </div>
          <Link
            href="/rooms"
            className="px-8 py-3.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg"
          >
            Explore Accommodations
          </Link>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
