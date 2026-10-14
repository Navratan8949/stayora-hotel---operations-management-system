"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStayora } from "../../context/StayoraContext";
import { Calendar, Users, Building, Search, AlertCircle } from "lucide-react";

export default function BookingSearchPanel({ className = "", compact = false }) {
  const router = useRouter();
  const { properties, currentProperty, bookingQuery, setBookingQuery, checkRoomAvailability } = useStayora();

  const [propertyId, setPropertyId] = useState(bookingQuery?.propertyId || currentProperty.id);
  const [checkIn, setCheckIn] = useState(bookingQuery?.checkIn || "2026-10-14");
  const [checkOut, setCheckOut] = useState(bookingQuery?.checkOut || "2026-10-16");
  const [adults, setAdults] = useState(bookingQuery.adults || 2);
  const [children, setChildren] = useState(bookingQuery.children || 0);
  const [roomsCount, setRoomsCount] = useState(bookingQuery.roomsCount || 1);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!checkIn || !checkOut) {
      setErrorMsg("Please select both check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      setErrorMsg("Check-out date must be strictly after check-in date.");
      return;
    }

    if (adults < 1) {
      setErrorMsg("At least 1 adult guest is required.");
      return;
    }

    // Check availability summary
    const { totalAvailable } = checkRoomAvailability(propertyId, checkIn, checkOut);
    if (totalAvailable < roomsCount) {
      setErrorMsg(`Only ${totalAvailable} room${totalAvailable === 1 ? "" : "s"} available for these dates.`);
    }

    // Save search query into central context
    setBookingQuery((prev) => ({
      ...prev,
      propertyId,
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children),
      roomsCount: Number(roomsCount)
    }));

    router.push("/availability");
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl border border-stone-200/80 p-4 sm:p-6 text-stone-800 ${className}`}>
      {errorMsg && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 items-end">
        {/* Property Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-[#c5a059]" /> Destination / Property
          </label>
          <select
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0d2b24]/20 focus:border-[#0d2b24]"
          >
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.city})
              </option>
            ))}
          </select>
        </div>

        {/* Check-In Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" /> Check-In Date
          </label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0d2b24]/20 focus:border-[#0d2b24]"
          />
        </div>

        {/* Check-Out Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" /> Check-Out Date
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full h-11 px-3 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0d2b24]/20 focus:border-[#0d2b24]"
          />
        </div>

        {/* Guests & Rooms */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#c5a059]" /> Guests & Rooms
          </label>
          <div className="grid grid-cols-3 gap-1">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="h-11 px-1.5 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 text-center"
              title="Adults"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} Ad{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="h-11 px-1.5 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 text-center"
              title="Children"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  {n} Ch
                </option>
              ))}
            </select>
            <select
              value={roomsCount}
              onChange={(e) => setRoomsCount(Number(e.target.value))}
              className="h-11 px-1.5 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 text-center"
              title="Rooms"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Rm
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full h-11 px-4 bg-gradient-to-r from-[#0d2b24] to-[#164237] hover:from-[#133e33] hover:to-[#1a4d40] text-[#dfc285] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#0d2b24]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Search className="w-4 h-4 text-[#c5a059]" />
            <span>Search Availability</span>
          </button>
        </div>
      </form>
    </div>
  );
}
