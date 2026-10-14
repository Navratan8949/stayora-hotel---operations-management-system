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
  BedDouble
} from "lucide-react";

export default function HomePage() {
  const { currentProperty, roomTypes, offers, setBookingQuery, addToast } = useStayora();
  const [copiedCode, setCopiedCode] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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
    addToast("Thank you! You have subscribed to Stayora demo newsletters.", "success");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      {/* 1. HERO SECTION WITH LUXURY INDUSTRIAL & HERITAGE AMBIENCE */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-20 md:pb-28 overflow-hidden bg-[#0d2b24]">
        {/* Cinematic High-Res Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentProperty.heroImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=85"}
            alt={currentProperty.name}
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center filter brightness-[0.68] contrast-[1.08] scale-105 transform transition-transform duration-1000"
          />
          {/* Deep Emerald, Dark Charcoal, & Royal Gold Ambient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b24] via-[#0d2b24]/60 to-black/40 backdrop-blur-[1px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#c5a059]/15 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-10 right-10 w-[450px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 text-center flex-1 flex flex-col justify-center items-center">
          {/* Luxury Sub-Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#c5a059]/40 text-[#dfc285] text-xs uppercase tracking-widest font-semibold mb-6 shadow-xl animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{currentProperty.tagline}</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-stone-300 hidden sm:inline font-normal">{currentProperty.city}, Rajasthan</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.1] mb-6 drop-shadow-lg">
            Where Royal Rajputana Heritage Meets Modern Hospitality Operations.
          </h1>

          <p className="text-stone-200 text-sm sm:text-lg max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
            Experience the regal grace of Stayora Grand Jaipur. Discover hand-carved heritage suites, bespoke 24-hour butler care, and our integrated real-time front desk, housekeeping, and restaurant POS management platform.
          </p>

          {/* Dual Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider mb-6">
            <Link
              href="/rooms"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c5a059] to-[#b38b3c] text-[#0d2b24] shadow-xl hover:brightness-110 transition-all hover:scale-105 flex items-center gap-2 font-bold cursor-pointer"
            >
              <BedDouble className="w-4 h-4" />
              <span>Explore Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="px-7 py-4 rounded-full bg-white/15 hover:bg-white/20 backdrop-blur-md text-white border border-[#c5a059]/40 transition-all hover:scale-105 flex items-center gap-2.5 font-bold shadow-lg"
            >
              <KeyRound className="w-4 h-4 text-[#dfc285]" />
              <span>Staff & PMS Operations Login</span>
              <span className="text-[10px] bg-[#c5a059] text-[#0d2b24] px-2 py-0.5 rounded-full font-black">
                6 Roles
              </span>
            </Link>

            <Link
              href="/app"
              className="px-5 py-4 rounded-full text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
                Sanctuaries of Comfort
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0d2b24] mt-2 tracking-tight">
                Featured Rooms & Grand Suites
              </h2>
            </div>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0d2b24] hover:text-[#c5a059] transition-colors group"
            >
              <span>View All Accommodations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0d2b24]/90 backdrop-blur-sm text-[#dfc285] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
                    {room.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-stone-900 shadow">
                    ₹{room.basePrice.toLocaleString()} <span className="text-stone-500 font-normal">/ night</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0d2b24] mb-2 group-hover:text-[#c5a059] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {room.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 pb-4 border-b border-stone-100">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#c5a059]" /> Up to {room.maxAdults} Adults
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" /> {room.size}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-3">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="text-xs font-medium text-stone-600 hover:text-[#0d2b24] underline underline-offset-4"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/booking?roomTypeId=${room.id}`}
                      className="px-4 py-2 bg-[#0d2b24] hover:bg-[#164237] text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                    >
                      Reserve Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY STAYORA (Pillars of Excellence) */}
      <section className="py-20 bg-[#f3ede2]/60 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              The Stayora Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24] mt-2">
              Heritage Grandeur with Contemporary Intuition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Restored Rajput Splendour",
                desc: "Original Jharokhas, hand-carved Kota stone arches and handcrafted frescoes preserved by local master artisans.",
                icon: Sparkles
              },
              {
                title: "Royal Butler Service",
                desc: "Discreet, attentive hospitality customized to your arrival rituals, dietary preferences, and leisure pacing.",
                icon: ShieldCheck
              },
              {
                title: "Culinary Alchemy",
                desc: "Authentic slow-smoked Laal Maas, Royal Mewar thalis, and organic courtyard farm-to-table breakfast spreads.",
                icon: Utensils
              },
              {
                title: "Holistic Ayurvedic Wellness",
                desc: "Signature herbal steam enclosures, private open-to-sky hot tubs and tailored abhyanga body therapies.",
                icon: Waves
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200/70 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d2b24]/5 text-[#0d2b24] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#c5a059]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0d2b24] mb-2">{pillar.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SPECIAL OFFERS & PROMO CODES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Curated Privileges
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24] mt-2">
              Exclusive Seasonal Packages & Codes
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              Book direct on our official website for complimentary upgrades and flexible cancellation terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#faf8f5] rounded-2xl p-8 border border-stone-200 relative overflow-hidden flex flex-col justify-between hover:border-[#c5a059]/60 transition-colors shadow-sm"
              >
                {offer.badge && (
                  <span className="absolute top-4 right-4 bg-[#c5a059] text-[#0d2b24] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {offer.badge}
                  </span>
                )}
                <div>
                  <div className="text-3xl font-serif font-bold text-[#0d2b24] mb-1">
                    {offer.discountPercent}% OFF
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0d2b24] mb-3">{offer.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">{offer.description}</p>
                </div>

                <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0d2b24] bg-stone-200/80 px-2.5 py-1 rounded border border-stone-300">
                      {offer.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="p-1.5 text-stone-500 hover:text-[#0d2b24] transition-colors"
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
                    className="px-4 py-2 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-xl text-xs font-semibold transition-all"
                  >
                    Apply & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOTEL EXPERIENCES & DINING HIGHLIGHT */}
      <section className="py-24 bg-[#0d2b24] text-white">
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
                Step inside our mirrored dining hall reflecting hundreds of flickering candlelight lanterns. Taste culinary recipes passed down through generations of Rajput royal khansamas, paired with vintage wines and artisanal courtyard sweets.
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
                  className="px-6 py-3 rounded-full bg-[#c5a059] text-[#0d2b24] font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  Explore Dining & Menus
                </Link>
                <Link
                  href="/experiences"
                  className="px-6 py-3 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-all"
                >
                  Jaipur Tours
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Dining"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
                  alt="Cocktail Bar & Tea"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                  alt="Courtyard Lotus Pond"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="Palace facade by night"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GUEST REVIEW HIGHLIGHTS (Demo testimonials) */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24] mt-2">
              Memories Cherished by Discerning Travellers
            </h2>
            <p className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider font-mono">
              Fictional Demonstration Reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The private Jharokha balcony overlooking the lotus fountain was magical. Butler service made our anniversary celebration seamless.",
                author: "Marcus & Elena Vance",
                location: "London, UK",
                stay: "Stayed in Royal Rajput Suite"
              },
              {
                quote: "Remarkable blend of 18th-century Rajputana architecture and modern technology. Booking directly was smooth and immediate.",
                author: "Vikram Singhania",
                location: "Mumbai, India",
                stay: "Stayed in Deluxe Heritage Room"
              },
              {
                quote: "The Sheesh Mahal dining experience and slow-cooked Laal Maas were sensational. Truly a jewel of boutique Indian luxury.",
                author: "Lady Beatrice Sterling",
                location: "Edinburgh, Scotland",
                stay: "Stayed in Maharaja Suite"
              }
            ].map((rev, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic mb-6">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-bold text-xs text-stone-900">{rev.author}</h4>
                  <p className="text-[11px] text-stone-400">{rev.location}</p>
                  <p className="text-[10px] text-[#c5a059] font-medium mt-1">{rev.stay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOCATION & ATTRACTIONS */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
                The Royal Environs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24] mt-2 mb-4">
                Minutes Away from Jaipur&rsquo;s Iconic Landmarks
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed mb-6">
                Positioned strategically within Civil Lines, Stayora Grand Jaipur provides a serene quietude while placing you a short chauffeured drive from the Pink City&rsquo;s historic monuments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { name: "Hawa Mahal (Palace of Winds)", distance: "5.2 km (14 mins)" },
                  { name: "City Palace & Museum", distance: "4.8 km (12 mins)" },
                  { name: "Amber Fort & Shila Devi", distance: "12 km (24 mins)" },
                  { name: "Jaipur International Airport (JAI)", distance: "11 km (20 mins)" }
                ].map((att, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <p className="font-semibold text-stone-800">{att.name}</p>
                    <p className="text-[11px] text-[#c5a059] flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {att.distance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 flex items-center justify-center text-center p-8">
              <Image
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
                alt="Jaipur Heritage Streetscape"
                fill
                referrerPolicy="no-referrer"
                className="object-cover brightness-90"
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl max-w-sm shadow-xl">
                <MapPin className="w-6 h-6 text-[#0d2b24] mx-auto mb-2" />
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {currentProperty.name}
                </h4>
                <p className="text-xs text-stone-600 mt-1">{currentProperty.address}</p>
                <Link
                  href="/contact"
                  className="inline-block mt-4 text-xs font-semibold text-[#0d2b24] underline underline-offset-4"
                >
                  View Driving Directions & Transfers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Help & Information
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0d2b24] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What are the standard check-in and check-out times?",
                a: "Check-in begins at 14:00 hrs and check-out is by 11:00 hrs. Early arrival and late departure can be requested subject to availability."
              },
              {
                q: "Can I cancel or modify my reservation online?",
                a: "Yes. Flexible rate reservations can be managed or cancelled up to 48 hours prior to arrival via our Manage Booking portal using your booking reference."
              },
              {
                q: "Do you arrange airport chauffeur pickups?",
                a: "Yes! Executive airport limousine and sedan pickups can be added during step 4 of your online booking or coordinated with our concierge."
              },
              {
                q: "Is breakfast included in the room rates?",
                a: "We offer both Standard Flexible and Royal Bed & Breakfast rate plans. Choosing the BNB rate includes full daily breakfast at Sheesh Mahal."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-sm">
                <h4 className="font-semibold text-sm text-[#0d2b24] mb-2">{faq.q}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER / DEMO SUBSCRIPTION */}
      <section className="py-16 bg-[#0b241e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-6 h-6 text-[#c5a059] mx-auto mb-3" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Join the Stayora Royal Connoisseur Circle
          </h3>
          <p className="text-xs text-stone-400 max-w-lg mx-auto mb-6">
            Receive curated seasonal offers, private dining invitations, and cultural chronicles from Jaipur.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-emerald-900/60 border border-emerald-600 text-emerald-200 rounded-xl text-xs max-w-md mx-auto">
              ✓ Thank you for subscribing to our demonstration newsletter.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-xs text-white placeholder-stone-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#dfc285] text-[#0d2b24] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
