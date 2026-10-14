"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { Utensils, Clock, Users, Calendar, Sparkles, Check, Phone } from "lucide-react";

export default function DiningPage() {
  const { menuItems, currentProperty, addToast } = useStayora();

  const [activeCategory, setActiveCategory] = useState("All");
  const [resDate, setResDate] = useState(new Date().toISOString().split("T")[0]);
  const [resTime, setResTime] = useState("19:30");
  const [resGuests, setResGuests] = useState(2);
  const [resVenue, setResVenue] = useState("Sheesh Mahal Fine Dining");
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [tableBooked, setTableBooked] = useState(false);

  const categories = ["All", ...new Set(menuItems.map((m) => m.category))];

  const filteredItems = menuItems.filter((item) =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  const handleBookTable = (e) => {
    e.preventDefault();
    if (!resName || !resPhone) {
      addToast("Please provide your name and phone number for the table reservation.", "error");
      return;
    }
    setTableBooked(true);
    addToast(`Table reserved for ${resGuests} guests at ${resVenue} on ${resDate} at ${resTime}!`, "success");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      {/* Hero */}
      <div className="relative py-24 bg-[#0d2b24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Gastronomic Excellence
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-2 mb-4 tracking-tight">
            Royal Rajputana Dining & Sheesh Mahal
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Feast beneath mirrored mosaics, shimmering chandeliers, and courtyards perfumed with night jasmine. Relive the royal culinary feasts of the Jaipur court.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-16">
        {/* Dining Venues Intro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sheesh Mahal Fine Dining",
              time: "Dinner: 19:00 - 23:30",
              vibe: "Opulent mirrored pavilion, live classical sitar, royal Rajasthani recipes.",
              image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "The Lotus Courtyard Cafe",
              time: "All Day: 07:00 - 23:00",
              vibe: "Sunlit marble verandah, specialty teas, artisanal pastries, organic salads.",
              image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "Rooftop Starlit Gazebo",
              time: "Sunset & Evening: 17:30 - 23:00",
              vibe: "Private high teas, champagne bar, panoramic Aravali hill skyline vistas.",
              image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
            }
          ].map((venue, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0d2b24] mb-1">{venue.name}</h3>
                  <p className="text-[11px] text-[#c5a059] font-medium mb-3 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {venue.time}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">{venue.vibe}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              Curated Menu
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0d2b24] mt-1">
              Chef Harish Mahawar&rsquo;s Signature Creations
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0d2b24] text-[#dfc285] shadow-md"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <span
                    className={`absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      item.veg ? "bg-emerald-600" : "bg-rose-600"
                    }`}
                    title={item.veg ? "Vegetarian" : "Non-Vegetarian"}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-serif text-base font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <span className="font-serif text-base font-bold text-[#0d2b24] shrink-0">
                      ₹{item.price}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider block mb-1">
                    {item.category} • {item.veg ? "Pure Veg" : "Royal Meat"}
                  </span>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Reservation Card */}
        <div className="bg-[#0d2b24] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
              Intimate Evenings
            </span>
            <h3 className="font-serif text-3xl font-bold mb-3">
              Reserve a Royal Dining Table
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-8">
              Book a courtyard fountain table or candlelight gazebo table for private celebrations and family dinners.
            </p>

            {tableBooked ? (
              <div className="p-6 bg-white/10 rounded-2xl border border-[#c5a059]/40 text-xs text-[#dfc285] space-y-2">
                <p className="font-bold text-sm">✓ Demonstration Table Reservation Confirmed!</p>
                <p className="text-stone-300">
                  We look forward to welcoming {resName} for {resGuests} guests at {resVenue} on {resDate} at {resTime}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-stone-300 block mb-1">Select Dining Venue</label>
                  <select
                    value={resVenue}
                    onChange={(e) => setResVenue(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                  >
                    <option value="Sheesh Mahal Fine Dining" className="text-stone-900">Sheesh Mahal Fine Dining</option>
                    <option value="The Lotus Courtyard Cafe" className="text-stone-900">The Lotus Courtyard Cafe</option>
                    <option value="Rooftop Starlit Gazebo" className="text-stone-900">Rooftop Starlit Gazebo</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Date</label>
                  <input
                    type="date"
                    value={resDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Preferred Time</label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                  >
                    <option value="12:30" className="text-stone-900">12:30 PM (Lunch)</option>
                    <option value="14:00" className="text-stone-900">02:00 PM (Lunch)</option>
                    <option value="19:30" className="text-stone-900">07:30 PM (Dinner)</option>
                    <option value="20:30" className="text-stone-900">08:30 PM (Dinner)</option>
                    <option value="21:30" className="text-stone-900">09:30 PM (Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Number of Guests</label>
                  <select
                    value={resGuests}
                    onChange={(e) => setResGuests(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
                  >
                    {[1, 2, 4, 6, 8, 12].map((g) => (
                      <option key={g} value={g} className="text-stone-900">{g} Guests</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400"
                  />
                </div>

                <div>
                  <label className="text-stone-300 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#c5a059] text-[#0d2b24] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 transition-all"
                  >
                    Confirm Table Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
