"use client";

import React from "react";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { ShieldCheck, Clock, CreditCard, AlertCircle, FileText } from "lucide-react";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-16 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Terms of Hospitality
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 mb-3">
            Hotel & Booking Policies
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Transparent reservation terms, arrival guidelines, and simulated commercial demonstration notices.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-10">
        {/* Demo Disclaimer Banner */}
        <div className="p-6 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block font-semibold">Demonstration Application Disclaimer:</strong>
            <p>
              Stayora is a software demonstration built by Code Pe Charcha. All property names, guest profiles, simulated card transactions, room records, and tax calculations are fictional. No real payments are collected or processed.
            </p>
          </div>
        </div>

        {/* Section 1: Check-in / Out */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#0d2b24] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#c5a059]" /> Check-In & Check-Out Timings
          </h3>
          <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
            <p><strong>Standard Check-In:</strong> 14:00 hrs (2:00 PM).</p>
            <p><strong>Standard Check-Out:</strong> 11:00 hrs (11:00 AM).</p>
            <p>
              Early check-in from 10:00 hrs or late check-out until 15:00 hrs is subject to room availability upon arrival and may be requested through the reservation notes.
            </p>
            <p>
              <strong>Identification Requirement:</strong> Government-mandated photo identification (Passport, Aadhaar Card, Driving Licence, or Voter ID) must be presented by all adult guests during registration.
            </p>
          </div>
        </div>

        {/* Section 2: Cancellation & Refund */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#0d2b24] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#c5a059]" /> Cancellation & Refund Rules
          </h3>
          <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
            <p>
              <strong>Standard Flexible Rate:</strong> Cancellations made at least 48 hours prior to the scheduled check-in time (14:00 hrs of the arrival date) are completely free of charge. Deposits are returned in full.
            </p>
            <p>
              <strong>Advance Saver / Non-Refundable Rate:</strong> Bookings confirmed under advance purchase rates receive a 15% discount and are non-refundable in the event of cancellation or no-show.
            </p>
            <p>
              <strong>No-Show Policy:</strong> If a guest does not arrive without prior written notice by 23:59 hrs on the arrival date, the booking will be marked as a No-Show and the first night retention charge will be applied.
            </p>
          </div>
        </div>

        {/* Section 3: Taxes & Levies */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#0d2b24] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#c5a059]" /> Taxes, Tariffs & Currency
          </h3>
          <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
            <p>
              All rates are quoted in Indian Rupees (INR, ₹). In this demo environment, room tariffs and restaurant charges are subject to an illustrative 12% Goods and Services Tax (GST) and 5% discretionary service charge.
            </p>
            <p>
              In production deployment, tax rates and electronic invoice GSTIN rules must be configured according to prevailing government statutory requirements.
            </p>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
