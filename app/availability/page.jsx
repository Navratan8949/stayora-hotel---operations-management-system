"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import BookingSearchPanel from "../../components/public/BookingSearchPanel";
import { useStayora } from "../../context/StayoraContext";
import { Users, Bed, Check, ArrowRight, AlertCircle, Calendar, ShieldCheck } from "lucide-react";

export default function AvailabilityPage() {
  const router = useRouter();
  const { currentProperty, roomTypes, checkRoomAvailability, bookingQuery, setBookingQuery } = useStayora();

  const [filterType, setFilterType] = useState("All");

  const inDate = new Date(bookingQuery.checkIn);
  const outDate = new Date(bookingQuery.checkOut);
  const nights = Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));

  const propertyRoomTypes = roomTypes.filter((rt) => rt.propertyId === currentProperty.id);

  const handleSelectRoom = (roomTypeId) => {
    setBookingQuery((prev) => ({
      ...prev,
      selectedRoomTypeId: roomTypeId
    }));
    router.push(`/booking?roomTypeId=${roomTypeId}`);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      {/* Top Banner */}
      <div className="bg-[#0d2b24] text-white py-12 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Real-Time Live Inventory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-2">
            Availability for {currentProperty.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#c5a059]" />
            <span>
              {bookingQuery.checkIn} to {bookingQuery.checkOut} ({nights} night{nights > 1 ? "s" : ""}) • {bookingQuery.adults} Adults, {bookingQuery.children} Children
            </span>
          </p>
        </div>
      </div>

      {/* Search modifier bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-20 relative w-full">
        <BookingSearchPanel />
      </div>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
              Available Accommodations ({propertyRoomTypes.length} Types)
            </h2>
            <span className="text-xs text-stone-500">
              Prices exclude 12% GST illustrative demo tax
            </span>
          </div>

          <div className="space-y-6">
            {propertyRoomTypes.map((room) => {
              const { availableRooms, totalAvailable } = checkRoomAvailability(
                room.propertyId,
                bookingQuery.checkIn,
                bookingQuery.checkOut,
                room.id
              );

              const isAvailable = totalAvailable >= bookingQuery.roomsCount;
              const subtotalForStay = room.basePrice * nights;

              return (
                <div
                  key={room.id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all ${
                    isAvailable
                      ? "border-stone-200 shadow-sm hover:shadow-xl"
                      : "border-stone-200 opacity-60 bg-stone-50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                    {/* Thumbnail (4 cols) */}
                    <div className="md:col-span-4 relative h-56 md:h-auto rounded-2xl overflow-hidden">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#0d2b24]/90 text-[#dfc285] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {room.category}
                      </div>
                    </div>

                    {/* Room Info (5 cols) */}
                    <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-serif text-2xl font-bold text-[#0d2b24]">
                            {room.name}
                          </h3>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed mb-4">
                          {room.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-stone-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-[#c5a059]" /> Up to {room.maxAdults} Guests
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-[#c5a059]" /> {room.bedType}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {room.amenities.slice(0, 4).map((am, i) => (
                            <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            {totalAvailable} room{totalAvailable > 1 ? "s" : ""} remaining for these dates
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-rose-800 font-semibold bg-rose-50 px-2.5 py-1 rounded-lg">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            Fully booked on selected dates
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing & CTA (3 cols) */}
                    <div className="md:col-span-3 flex flex-col justify-between p-4 rounded-2xl bg-[#faf8f5] border border-stone-100 text-right">
                      <div>
                        <span className="text-[11px] text-stone-400 block uppercase font-medium">
                          From
                        </span>
                        <div className="font-serif text-3xl font-bold text-[#0d2b24]">
                          ₹{room.basePrice.toLocaleString()}
                        </div>
                        <span className="text-[11px] text-stone-500">per night</span>

                        <div className="mt-3 pt-3 border-t border-stone-200/80 text-xs text-stone-600">
                          <p>
                            <strong>₹{subtotalForStay.toLocaleString()}</strong> for {nights} night{nights > 1 ? "s" : ""}
                          </p>
                          <p className="text-[10px] text-stone-400 mt-0.5">
                            + 12% demo tax at checkout
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => handleSelectRoom(room.id)}
                          disabled={!isAvailable}
                          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all ${
                            isAvailable
                              ? "bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] hover:scale-[1.01]"
                              : "bg-stone-300 text-stone-500 cursor-not-allowed"
                          }`}
                        >
                          <span>{isAvailable ? "Select & Book" : "Not Available"}</span>
                          {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
                        </button>

                        <Link
                          href={`/rooms/${room.slug}`}
                          className="block text-center text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4"
                        >
                          View Room Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
