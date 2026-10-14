"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { Users, Bed, Maximize2, Check, ArrowRight, Filter, Sparkles, AlertCircle } from "lucide-react";

export default function RoomsPage() {
  const { roomTypes, currentProperty, properties, setSelectedPropertyId, checkRoomAvailability, bookingQuery } = useStayora();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(40000);
  const [minGuests, setMinGuests] = useState(1);
  const [sortBy, setSortBy] = useState("recommended");

  // Get categories
  const categories = ["All", ...new Set(roomTypes.map((r) => r.category))];

  // Filtered and sorted rooms
  const filteredRooms = useMemo(() => {
    return roomTypes
      .filter((room) => {
        if (room.propertyId !== currentProperty.id) return false;
        if (selectedCategory !== "All" && room.category !== selectedCategory) return false;
        if (room.basePrice > maxPrice) return false;
        if (room.maxAdults < minGuests) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.basePrice - b.basePrice;
        if (sortBy === "price_desc") return b.basePrice - a.basePrice;
        if (sortBy === "capacity") return b.maxAdults - a.maxAdults;
        return b.featured ? 1 : -1; // recommended
      });
  }, [roomTypes, currentProperty.id, selectedCategory, maxPrice, minGuests, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      {/* Banner */}
      <div className="relative py-20 bg-[#0d2b24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Accommodations at {currentProperty.name}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 mb-4 tracking-tight">
            Rooms, Suites & Royal Sanctuaries
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Every room at Stayora is meticulously appointed with heritage artistry, custom teak woodwork, plush organic bedding, and marble baths.
          </p>
        </div>
      </div>

      {/* Filter and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-10">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <Filter className="w-4 h-4 text-[#c5a059]" /> Filter & Sort Options
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category */}
            <div>
              <label className="text-[11px] font-medium text-stone-500 block mb-1">Room Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Min Capacity */}
            <div>
              <label className="text-[11px] font-medium text-stone-500 block mb-1">Minimum Guests</label>
              <select
                value={minGuests}
                onChange={(e) => setMinGuests(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              >
                <option value={1}>1+ Guest</option>
                <option value={2}>2+ Guests</option>
                <option value={3}>3+ Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>

            {/* Max Nightly Rate */}
            <div>
              <label className="text-[11px] font-medium text-stone-500 block mb-1">
                Max Price: ₹{maxPrice.toLocaleString()} / night
              </label>
              <input
                type="range"
                min={8000}
                max={40000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0d2b24] mt-2"
              />
            </div>

            {/* Sort by */}
            <div>
              <label className="text-[11px] font-medium text-stone-500 block mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="capacity">Capacity: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        {filteredRooms.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500">
            <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-800">No rooms match your filter criteria.</p>
            <p className="text-xs mt-1">Try resetting the maximum price or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => {
              // Calculate live availability for current dates
              const { totalAvailable } = checkRoomAvailability(
                room.propertyId,
                bookingQuery.checkIn,
                bookingQuery.checkOut,
                room.id
              );

              return (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200 transition-all duration-300 flex flex-col group"
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

                    <div className="absolute top-4 right-4">
                      {totalAvailable > 0 ? (
                        <span className="bg-emerald-800/90 backdrop-blur-sm text-emerald-100 px-2.5 py-1 rounded-full text-[11px] font-medium shadow">
                          {totalAvailable} available
                        </span>
                      ) : (
                        <span className="bg-rose-800/90 backdrop-blur-sm text-rose-100 px-2.5 py-1 rounded-full text-[11px] font-medium shadow">
                          Booked out
                        </span>
                      )}
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
                      <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                        {room.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 py-3 border-y border-stone-100">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#c5a059]" /> {room.maxAdults} Adults, {room.maxChildren} Child
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" /> {room.size}
                        </span>
                        <span className="flex items-center gap-1.5 col-span-2">
                          <Bed className="w-3.5 h-3.5 text-[#c5a059]" /> {room.bedType}
                        </span>
                      </div>

                      {/* Amenities snippet */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {room.amenities.slice(0, 3).map((am, i) => (
                          <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 flex items-center justify-between gap-3">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="text-xs font-medium text-stone-600 hover:text-[#0d2b24] underline underline-offset-4"
                      >
                        View Full Details
                      </Link>
                      <Link
                        href={`/booking?roomTypeId=${room.id}`}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                          totalAvailable > 0
                            ? "bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285]"
                            : "bg-stone-300 text-stone-500 cursor-not-allowed pointer-events-none"
                        }`}
                      >
                        {totalAvailable > 0 ? "Book Now" : "Unavailable"}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PublicFooter />
    </div>
  );
}
