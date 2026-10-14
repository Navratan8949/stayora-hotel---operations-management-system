"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import BookingSearchPanel from "../components/public/BookingSearchPanel";
import { useStayora } from "../context/StayoraContext";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  Wifi, 
  Coffee, 
  Utensils, 
  Waves, 
  ShieldCheck, 
  Star,
  Users,
  ChevronRight,
  Maximize2,
  KeyRound,
  Hotel,
  Building2,
  BedDouble,
  ChevronDown,
  Award,
  Crown,
  Calendar,
  Search,
  ExternalLink,
  Compass,
  Heart,
  CheckCircle2,
  Receipt,
  Bed
} from "lucide-react";

export default function HomePage() {
  const { currentProperty, roomTypes, offers, setBookingQuery, addToast, rooms, reservations, folios } = useStayora();
  const [copiedCode, setCopiedCode] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activePmsTab, setActivePmsTab] = useState("rack");
  const [openFaq, setOpenFaq] = useState(0);

  const featuredRooms = roomTypes
    .filter((rt) => rt.propertyId === currentProperty.id)
    .slice(0, 3);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addToast(`Promo code ${code} copied to clipboard!`, "success");
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    addToast("Welcome to the Stayora Connoisseur Circle! You will receive our royal chronicles.", "success");
  };

  // PMS Interactive Simulation Metrics
  const propRooms = rooms.filter((r) => r.propertyId === currentProperty.id);
  const occupiedCount = propRooms.filter((r) => r.operationalStatus === "Occupied").length;
  const vacantCleanCount = propRooms.filter((r) => r.operationalStatus === "Vacant" && r.housekeepingStatus === "Clean").length;
  const dirtyCount = propRooms.filter((r) => r.housekeepingStatus === "Dirty").length;
  const occupancyRate = Math.round((occupiedCount / Math.max(1, propRooms.length)) * 100);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-sans selection:bg-[#c5a059]/20 selection:text-[#0d2b24]">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-[#09201a] text-stone-300 text-[11px] py-2 px-4 border-b border-[#c5a059]/30 text-center flex items-center justify-center gap-2">
        <Crown className="w-3.5 h-3.5 text-[#dfc285]" />
        <span>
          <strong className="text-[#dfc285] font-semibold">Festive Royal Retreat Privileges:</strong> Reserve direct for complimentary sunset lake shikara cruise & high tea at Sheesh Mahal.
        </span>
        <Link href="/offers" className="text-[#dfc285] hover:text-white underline font-semibold ml-2 hidden sm:inline">
          View Privileges
        </Link>
      </div>

      <PublicNavbar />

      {/* 1. HERO SECTION WITH CINEMATIC ROYAL AMBIENCE */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-20 md:pb-28 overflow-hidden bg-[#0d2b24]">
        {/* Background Layer with Ambient Gold & Emerald Lighting */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentProperty.heroImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=85"}
            alt={currentProperty.name}
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center filter brightness-[0.65] contrast-[1.1] scale-105 transform transition-transform duration-1000"
          />
          {/* Deep Emerald, Dark Charcoal, & Royal Gold Ambient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b24] via-[#0d2b24]/60 to-black/40 backdrop-blur-[1px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#c5a059]/15 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-10 right-10 w-[450px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 text-center flex-1 flex flex-col justify-center items-center">
          {/* Award Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#c5a059]/40 text-[#dfc285] text-xs uppercase tracking-widest font-semibold mb-6 shadow-xl animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Condé Nast Readers’ Choice 2026 Winner</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-stone-300 hidden sm:inline font-normal">{currentProperty.name}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.08] mb-6 drop-shadow-2xl">
            Where Rajputana Royalty Meets Modern Luxury.
          </h1>

          <p className="text-stone-200 text-sm sm:text-lg max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
            Experience hand-carved heritage architecture, bespoke 24-hour royal butler care, starlit palace dining, and our integrated modern hospitality operations platform.
          </p>

          {/* Dual Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider mb-6">
            <Link
              href="/rooms"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c5a059] via-[#dfc285] to-[#c5a059] text-[#0d2b24] shadow-2xl hover:brightness-110 transition-all hover:scale-105 flex items-center gap-2 font-black cursor-pointer ring-2 ring-[#c5a059]/40"
            >
              <BedDouble className="w-4 h-4" />
              <span>Explore Palatial Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="px-7 py-4 rounded-full bg-white/15 hover:bg-white/20 backdrop-blur-md text-white border border-[#c5a059]/50 transition-all hover:scale-105 flex items-center gap-2.5 font-bold shadow-lg"
            >
              <KeyRound className="w-4 h-4 text-[#dfc285]" />
              <span>Staff & PMS Operations Login</span>
              <span className="text-[10px] bg-[#c5a059] text-[#0d2b24] px-2 py-0.5 rounded-full font-black">
                6 Roles
              </span>
            </Link>

            <Link
              href="/app"
              className="px-5 py-4 rounded-full text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <span>Instant PMS Demo Rack</span>
              <ChevronRight className="w-4 h-4 text-[#c5a059]" />
            </Link>
          </div>

          {/* Fast-Click Persona Quick Triggers */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-stone-300 mb-8 max-w-3xl">
            <span className="text-stone-400 font-medium mr-1">Direct Persona Jump:</span>
            <Link
              href="/login"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-[#dfc285] transition-colors"
            >
              👑 General Manager
            </Link>
            <Link
              href="/login"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-emerald-300 transition-colors"
            >
              🛎️ Front Desk
            </Link>
            <Link
              href="/login"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-teal-300 transition-colors"
            >
              🧹 Housekeeping
            </Link>
            <Link
              href="/login"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-orange-300 transition-colors"
            >
              🍽️ Restaurant F&B
            </Link>
            <Link
              href="/login"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-blue-300 transition-colors"
            >
              💳 Finance Cashier
            </Link>
          </div>

          {/* Live Hotel Trust Markers Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl text-left">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#dfc285] font-semibold block">
                Heritage Properties
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold mt-0.5">3 Palatial Retreats</p>
              <p className="text-[11px] text-stone-300 mt-0.5">Jaipur · Udaipur · Delhi</p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#dfc285] font-semibold block">
                Direct Guest Privilege
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold mt-0.5">Best Rate Guarantee</p>
              <p className="text-[11px] text-stone-300 mt-0.5">Complimentary Breakfast & High Tea</p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#dfc285] font-semibold block">
                Front Office PMS
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold mt-0.5">Live Room Calendar</p>
              <p className="text-[11px] text-stone-300 mt-0.5">Instant Check-in & Folio Billing</p>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[#dfc285] font-semibold block">
                Guest Experience
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold mt-0.5">4.9 / 5.0 Rating</p>
              <p className="text-[11px] text-stone-300 mt-0.5">Over 2,400 Verified Reviews</p>
            </div>
          </div>
        </div>

        {/* 1b. Floating Booking Search Panel */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 w-full">
          <BookingSearchPanel />
        </div>
      </section>

      {/* 2. FEATURED ROOM CATEGORIES */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d2b24]/5 border border-[#c5a059]/30 text-[#0d2b24] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Sanctuaries of Royal Comfort</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0d2b24] tracking-tight">
                Featured Palace Rooms & Grand Suites
              </h2>
              <p className="text-stone-600 text-sm max-w-xl">
                Every suite reflects the artistic craftsmanship of Rajput royalty with original stonework, hand-blocked linens, and tranquil views of private courtyards or Lake Pichola.
              </p>
            </div>

            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d2b24] hover:text-[#c5a059] transition-colors group px-5 py-3 rounded-xl border border-stone-300 hover:border-[#c5a059] bg-white shadow-xs"
            >
              <span>Explore All Suites</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 hover:shadow-2xl hover:border-[#c5a059]/60 transition-all duration-500 flex flex-col group"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0d2b24]/90 backdrop-blur-md text-[#dfc285] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#c5a059]/30 shadow-md">
                    {room.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-stone-900 shadow-lg border border-stone-100">
                    <span className="text-[#0d2b24] text-base font-serif font-bold">₹{room.basePrice.toLocaleString()}</span>{" "}
                    <span className="text-stone-500 font-normal text-[11px]">/ night</span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0d2b24] mb-2 group-hover:text-[#c5a059] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {room.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="w-3.5 h-3.5 text-[#c5a059]" /> Up to {room.maxAdults} Guests
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" /> {room.size}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Wifi className="w-3.5 h-3.5 text-[#c5a059]" /> High-Speed Wi-Fi
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Coffee className="w-3.5 h-3.5 text-[#c5a059]" /> 24h Room Service
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="text-xs font-bold text-stone-700 hover:text-[#0d2b24] underline underline-offset-4"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/booking?roomTypeId=${room.id}`}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#0d2b24] to-[#15473c] hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0d2b24]/20 flex items-center gap-1.5"
                    >
                      <span>Reserve Suite</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#dfc285]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE STAYORA DISTINCTION (Pillars of Royal Hospitality) */}
      <section className="py-24 bg-[#f3ede2]/60 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              The Stayora Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0d2b24] tracking-tight">
              Heritage Grandeur with Contemporary Intuition
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Every detail has been curated to immerse you in the authentic lifestyle of Rajput nobility while providing 5-star digital convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Restored Rajput Splendour",
                desc: "Original Jharokhas, hand-carved Kota stone arches, and handcrafted gold-leaf frescoes preserved by local master artisans.",
                icon: Crown
              },
              {
                title: "24-Hour Royal Butler Service",
                desc: "Discreet, attentive hospitality tailored to your arrival rituals, luggage unpacking, bespoke tea, and evening turn-down pacing.",
                icon: ShieldCheck
              },
              {
                title: "Palace Culinary Alchemy",
                desc: "Authentic slow-smoked Laal Maas, Royal Mewar thalis, and organic courtyard farm-to-table breakfast spreads at Sheesh Mahal.",
                icon: Utensils
              },
              {
                title: "Jharokha Ayurvedic Spa",
                desc: "Herbal steam enclosures, private open-to-sky hot tubs, and therapeutic Abhyanga massage therapies by veteran vaidyas.",
                icon: Waves
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl shadow-md border border-stone-200/80 hover:border-[#c5a059] hover:-translate-y-1 transition-all duration-300 space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0d2b24] text-[#dfc285] flex items-center justify-center shadow-md">
                    <Icon className="w-7 h-7 text-[#c5a059]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0d2b24] leading-snug">{pillar.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NEW: BEHIND THE ROYAL CURTAIN — INTEGRATED PMS SIMULATION */}
      <section className="py-24 bg-[#09201a] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#dfc285] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Hospitality Technology</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Behind the Velvet Curtain: The Stayora PMS Engine
              </h2>
              <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
                Stayora is not just an aesthetic palace hotel—it is powered by our proprietary full-stack Property Management System (PMS). Inspect live room racks, instant folios, and housekeeping status in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/app"
                className="px-6 py-3.5 rounded-2xl bg-[#c5a059] hover:bg-[#dfc285] text-[#0d2b24] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#c5a059]/20 flex items-center gap-2"
              >
                <span>Launch Staff Operations Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-stone-200 border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>6 Staff Personas</span>
              </Link>
            </div>
          </div>

          {/* Interactive PMS Simulation Console Display */}
          <div className="rounded-3xl bg-[#0d2b24] border border-[#c5a059]/30 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Top Bar with Live Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="font-mono font-bold text-white">LIVE_PMS_STATUS: {currentProperty.name.toUpperCase()}</span>
                <span className="text-stone-400 font-mono hidden sm:inline">| Cloud Sync: Online</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-stone-300">Occupancy: <strong className="text-[#dfc285]">{occupancyRate}%</strong></span>
                <span className="text-stone-300">Clean: <strong className="text-emerald-400">{vacantCleanCount}</strong></span>
                <span className="text-stone-300">Dirty / QC: <strong className="text-amber-400">{dirtyCount}</strong></span>
              </div>
            </div>

            {/* Interactive Module Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "rack", label: "Front Office Room Rack", icon: Bed },
                { id: "folio", label: "Guest Folio & Billing Audit", icon: Receipt },
                { id: "housekeeping", label: "Housekeeping Status Board", icon: Sparkles },
                { id: "restaurant", label: "Sheesh Mahal POS Queue", icon: Utensils },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activePmsTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePmsTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-[#c5a059] text-[#0d2b24] shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="p-5 rounded-2xl bg-[#09201a]/90 border border-white/10 min-h-[160px] text-xs">
              {activePmsTab === "rack" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-stone-300 text-xs pb-2 border-b border-white/10">
                    <span>Live Physical Rooms Inventory</span>
                    <span className="text-[#dfc285] font-mono">Total Rooms: {propRooms.length}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {propRooms.slice(0, 12).map((rm) => (
                      <div
                        key={rm.id}
                        className={`p-3 rounded-xl border text-center font-mono ${
                          rm.operationalStatus === "Occupied"
                            ? "bg-rose-950/40 border-rose-800 text-rose-300"
                            : rm.housekeepingStatus === "Clean"
                            ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
                            : "bg-amber-950/40 border-amber-800 text-amber-300"
                        }`}
                      >
                        <p className="font-bold text-sm text-white">Room {rm.roomNumber}</p>
                        <p className="text-[10px] mt-1">{rm.operationalStatus}</p>
                        <p className="text-[9px] opacity-70">{rm.housekeepingStatus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePmsTab === "folio" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-stone-300 pb-2 border-b border-white/10">
                    <span>Sample Live Guest Folio (Room 101 · Vikram Singhania)</span>
                    <span className="text-emerald-400 font-mono font-bold">Balance: Settled</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-stone-400 text-[11px]">Room Accommodation (2 Nights)</p>
                      <p className="text-white font-bold font-mono mt-1">₹37,000</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-stone-400 text-[11px]">Sheesh Mahal Dining POS</p>
                      <p className="text-white font-bold font-mono mt-1">₹4,850</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-stone-400 text-[11px]">Jharokha Ayurvedic Spa Charge</p>
                      <p className="text-white font-bold font-mono mt-1">₹6,200</p>
                    </div>
                  </div>
                </div>
              )}

              {activePmsTab === "housekeeping" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-stone-300 pb-2 border-b border-white/10">
                    <span>Active Housekeeping Roster (Supervisor: Sunita Bai)</span>
                    <span className="text-[#dfc285] font-mono">100% Turn-down Ready</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                      <span>Room 201 — Maharaja Suite · Departure Turn-down & Floral Setup</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">INSPECTED</span>
                    </div>
                    <div className="p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                      <span>Room 104 — Courtyard Deluxe · Linen Change & Minibar Restock</span>
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold text-[10px]">IN PROGRESS</span>
                    </div>
                  </div>
                </div>
              )}

              {activePmsTab === "restaurant" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-stone-300 pb-2 border-b border-white/10">
                    <span>Sheesh Mahal Kitchen Order Tickets (KOT Live Queue)</span>
                    <span className="text-[#dfc285] font-mono">Head Chef: Harish Mahawar</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">Table 4 (Courtyard Terrace)</p>
                        <p className="text-stone-400 text-[11px]">Royal Mewar Thali + Smoked Laal Maas</p>
                      </div>
                      <span className="text-amber-400 font-bold font-mono">Preparing</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">Room Service · Suite 204</p>
                        <p className="text-stone-400 text-[11px]">Saffron Tea Service & Artisan Sweets</p>
                      </div>
                      <span className="text-emerald-400 font-bold font-mono">Dispatched</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPECIAL OFFERS & PROMO CODES */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Curated Privileges
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0d2b24] tracking-tight">
              Exclusive Seasonal Packages & Codes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Book direct on our official portal for guaranteed complimentary room upgrades, dining vouchers, and flexible cancellation terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#faf8f5] rounded-3xl p-8 border-2 border-dashed border-[#c5a059]/50 relative overflow-hidden flex flex-col justify-between hover:border-[#c5a059] transition-all shadow-md hover:shadow-xl group"
              >
                {offer.badge && (
                  <span className="absolute top-4 right-4 bg-[#0d2b24] text-[#dfc285] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm border border-[#c5a059]/40">
                    {offer.badge}
                  </span>
                )}
                <div>
                  <div className="text-4xl font-serif font-black text-[#0d2b24] mb-2">
                    {offer.discountPercent}% OFF
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0d2b24] mb-3 group-hover:text-[#c5a059] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0d2b24] bg-white px-3 py-1.5 rounded-xl border border-stone-300 shadow-2xs">
                      {offer.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="p-2 text-stone-500 hover:text-[#0d2b24] hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
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
                    className="px-4 py-2 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    Apply Code
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOTEL EXPERIENCES & DINING HIGHLIGHT */}
      <section className="py-24 bg-[#071c17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#dfc285]">
                Gastronomy & Memories
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
                Royal Sheesh Mahal Dining & Sunset High Teas
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Step inside our mirrored dining hall reflecting hundreds of flickering candlelight lanterns. Taste recipes passed down through generations of Rajput royal khansamas, paired with vintage wines and artisanal courtyard sweets.
              </p>
              <div className="space-y-3 pt-2 text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#c5a059]" />
                  <span>Slow-cooked Laal Maas & Handcrafted Saffron Breads</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#c5a059]" />
                  <span>Evening Live Sitar & Rajasthani Folk Performances</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#c5a059]" />
                  <span>Private Candlelight Terrace Dinner under the Stars</span>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/dining"
                  className="px-6 py-3 rounded-full bg-[#c5a059] text-[#0d2b24] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#c5a059]/20"
                >
                  Explore Dining & Menus
                </Link>
                <Link
                  href="/experiences"
                  className="px-6 py-3 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-all border border-white/20"
                >
                  Jaipur Heritage Tours
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl mt-8 border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Dining"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
                  alt="Cocktail Bar & Tea"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                  alt="Courtyard Lotus Pond"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl mt-8 border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="Palace facade by night"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GUEST REVIEW HIGHLIGHTS */}
      <section className="py-24 bg-[#faf8f5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0d2b24] tracking-tight">
              Memories Cherished by Discerning Travellers
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              ★ 4.9 out of 5.0 Rating · Over 2,400 Verified Worldwide Guest Reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The private Jharokha balcony overlooking the lotus fountain was magical. Our personal royal butler arranged an unforgettable candlelight dinner on the terrace.",
                author: "Marcus & Elena Vance",
                location: "London, United Kingdom",
                stay: "Stayed in Royal Rajput Suite"
              },
              {
                quote: "Remarkable blend of 18th-century Rajputana architecture and modern technology. Booking directly was smooth, and check-in took less than 60 seconds.",
                author: "Vikram Singhania",
                location: "Mumbai, India",
                stay: "Stayed in Deluxe Heritage Room"
              },
              {
                quote: "The Sheesh Mahal dining experience and slow-cooked Laal Maas were sensational. Truly a jewel of boutique Indian hospitality.",
                author: "Lady Beatrice Sterling",
                location: "Edinburgh, Scotland",
                stay: "Stayed in Maharaja Presidential Suite"
              }
            ].map((rev, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200/90 hover:border-[#c5a059]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{rev.author}</h4>
                    <p className="text-[11px] text-stone-400">{rev.location}</p>
                  </div>
                  <span className="text-[10px] text-[#c5a059] font-bold px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                    Verified Guest
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Royal Concierge Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0d2b24] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-stone-600">
              Clear answers regarding our heritage accommodations, check-in rituals, and airport chauffeur transfers.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What are the standard check-in and check-out times at Stayora Grand?",
                a: "Check-in begins at 14:00 hrs with our traditional welcoming garland and saffron sherbet. Check-out is by 11:00 hrs. Early arrival and late departure can be requested subject to availability."
              },
              {
                q: "Can I cancel or modify my reservation online directly?",
                a: "Yes. Flexible rate reservations can be modified or cancelled up to 48 hours prior to arrival via our Manage Booking portal using your booking reference code."
              },
              {
                q: "Do you arrange luxury airport chauffeur pickups in Jaipur?",
                a: "Yes! Executive airport limousine and luxury sedan pickups can be added during step 4 of online booking or coordinated directly with our 24-hour concierge team."
              },
              {
                q: "Is breakfast included in the room rates?",
                a: "We offer both Standard Flexible and Royal Bed & Breakfast rate plans. Choosing the BNB rate includes full daily artisanal buffet & courtyard breakfast at Sheesh Mahal."
              },
              {
                q: "Are children allowed at the palace resort?",
                a: "Yes, Stayora warmly welcomes families. We provide family connecting suites, dedicated junior heritage cooking workshops, and child-safe pool amenities."
              }
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-stone-200 bg-[#faf8f5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-[#0d2b24]">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c5a059] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER / ROYAL CONNOISSEUR CLUB */}
      <section className="py-20 bg-[#09201a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#c5a059]/20 text-[#dfc285] flex items-center justify-center border border-[#c5a059]/40 shadow-lg">
            <Crown className="w-6 h-6 text-[#c5a059]" />
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Join the Stayora Royal Connoisseur Circle
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
            Receive private seasonal offers, invitation-only dining previews, and curated cultural chronicles from the royal courts of Rajasthan.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 rounded-2xl text-xs max-w-md mx-auto shadow-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You are now a member of the Stayora Connoisseur Circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3.5 bg-white/10 rounded-2xl text-xs text-white placeholder-stone-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#c5a059] shadow-inner"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-gradient-to-r from-[#c5a059] to-[#dfc285] hover:brightness-110 text-[#0d2b24] font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-[#c5a059]/30 cursor-pointer"
              >
                Join Circle
              </button>
            </form>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
