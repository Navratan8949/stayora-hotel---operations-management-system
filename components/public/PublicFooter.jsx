"use client";

import React from "react";
import Link from "next/link";
import { useStayora } from "../../context/StayoraContext";
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, KeyRound } from "lucide-react";

export default function PublicFooter() {
  const { currentProperty, properties, setSelectedPropertyId } = useStayora();

  return (
    <footer className="bg-[#0b241e] text-stone-300 border-t border-[#c5a059]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c5a059] flex items-center justify-center text-[#0d2b24] shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                STAYORA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400">
              “Turn Hotel Visits Into Bookings—with a Website That Works.”
              Handcrafted boutique luxury, heritage architecture, and heartfelt Rajputana hospitality.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-semibold block mb-1">
                Property Portfolio:
              </span>
              <div className="flex flex-col gap-1">
                {properties.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPropertyId(p.id)}
                    className={`text-left text-xs transition-colors hover:text-white ${
                      p.id === currentProperty.id ? "text-[#dfc285] font-semibold" : "text-stone-400"
                    }`}
                  >
                    • {p.name} ({p.city})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
              The Property
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/rooms" className="hover:text-[#dfc285] transition-colors">
                  Rooms & Suites Catalogue
                </Link>
              </li>
              <li>
                <Link href="/availability" className="hover:text-[#dfc285] transition-colors">
                  Check Live Availability
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-[#dfc285] transition-colors">
                  Dining & Royal Sheesh Mahal
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#dfc285] transition-colors">
                  Jaipur Heritage Experiences
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#dfc285] transition-colors">
                  Architecture & Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#dfc285] transition-colors">
                  Special Packages & Promo Codes
                </Link>
              </li>
            </ul>
          </div>

          {/* Guest Services & Policies */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/manage-booking" className="hover:text-[#dfc285] transition-colors">
                  Manage Existing Booking
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#dfc285] transition-colors">
                  Cancellation & Refund Policies
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#dfc285] transition-colors">
                  Check-in / Check-out Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#dfc285] transition-colors">
                  Concierge & Chauffeur Enquiries
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#dfc285] transition-colors flex items-center gap-1.5 text-[#dfc285] font-semibold">
                  <KeyRound className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Staff & PMS Login (6 Roles)</span>
                </Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-[#dfc285] transition-colors flex items-center gap-1.5 text-stone-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Hotel Operations Portal (PMS)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide">
              {currentProperty.name}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{currentProperty.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{currentProperty.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>{currentProperty.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Check-in: {currentProperty.checkInTime} | Check-out: {currentProperty.checkOutTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Stayora Hotels. Commercial software demonstration by{" "}
            <strong className="text-stone-200">Code Pe Charcha</strong>.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>All guest, rate, and transaction records are simulated demo data.</span>
            <Link href="/policies" className="hover:text-white transition-colors">
              Terms & Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
