"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStayora } from "../../context/StayoraContext";
import { 
  Menu, 
  X, 
  CalendarDays, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  ChevronDown,
  Building2,
  KeyRound,
  ArrowRight
} from "lucide-react";

export default function PublicNavbar() {
  const pathname = usePathname();
  const { currentProperty, properties, setSelectedPropertyId } = useStayora();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Rooms & Suites", href: "/rooms" },
    { name: "Availability", href: "/availability" },
    { name: "Offers", href: "/offers" },
    { name: "Dining", href: "/dining" },
    { name: "Experiences", href: "/experiences" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Manage Booking", href: "/manage-booking" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d2b24]/95 backdrop-blur-md text-white border-b border-[#c5a059]/20 transition-all">
      {/* Top micro-bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs border-b border-white/10 text-stone-300">
        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-[#dfc285] font-medium"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{currentProperty.name}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
            {propertyDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-[#09201a] border border-[#c5a059]/30 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in">
                {properties.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPropertyId(p.id);
                      setPropertyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-white/10 transition-colors ${
                      p.id === currentProperty.id ? "text-[#dfc285] bg-white/5" : "text-stone-300"
                    }`}
                  >
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[10px] text-stone-400">{p.city}, {p.state}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#c5a059]" /> {currentProperty.phone}
          </span>
          <span>•</span>
          <span className="text-stone-400">Jaipur, Rajasthan, India</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-stone-400">Developed by <strong className="text-stone-200">Code Pe Charcha</strong></span>
          <Link
            href="/login"
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#c5a059]/20 hover:bg-[#c5a059]/30 text-[#dfc285] transition-all font-medium"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Staff & PMS Login</span>
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#99732b] flex items-center justify-center text-[#0d2b24] shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              STAYORA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#dfc285] font-semibold -mt-1">
              Luxury Boutique Hotels
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-[#dfc285] ${
                  isActive ? "text-[#dfc285] font-semibold" : "text-stone-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#dfc285] hover:text-white rounded-lg border border-[#c5a059]/40 hover:bg-white/10 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Staff Login</span>
          </Link>
          <Link
            href="/booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#b38b3c] text-[#0d2b24] font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all hover:scale-[1.02]"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Book Now</span>
          </Link>
        </div>

        {/* Mobile menu hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            href="/booking"
            className="px-3 py-1.5 rounded-full bg-[#c5a059] text-[#0d2b24] text-xs font-bold uppercase tracking-wider"
          >
            Book
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-200 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a231d] border-b border-white/10 px-5 sm:px-6 py-6 space-y-5 animate-in slide-in-from-top shadow-2xl">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-[#dfc285]">
              Stayora Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pb-4 border-b border-white/10 flex flex-col gap-2">
            <span className="text-xs text-stone-400">Current Property:</span>
            <select
              value={currentProperty.id}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="bg-[#133e33] text-[#dfc285] text-xs px-3 py-2 rounded-lg border border-[#c5a059]/30 font-medium"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.city})
                </option>
              ))}
            </select>
          </div>

          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-stone-200 hover:text-[#dfc285] py-1 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-stone-200 hover:text-[#dfc285] py-1 font-medium transition-colors"
            >
              Contact & Enquiries
            </Link>
            <Link
              href="/policies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-stone-200 hover:text-[#dfc285] py-1 font-medium transition-colors"
            >
              Hotel Policies
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-gradient-to-r from-[#c5a059] to-[#b38b3c] text-[#0d2b24] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Instant Direct Booking</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-white/10 hover:bg-white/15 text-[#dfc285] font-semibold text-xs uppercase tracking-wider rounded-xl border border-white/15 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-[#c5a059]" />
              <span>Staff & PMS Login (6 Personas)</span>
            </Link>
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-stone-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <span>Jump Straight to Operations Console</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
