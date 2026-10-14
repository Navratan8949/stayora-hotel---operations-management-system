"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "../../../components/public/PublicNavbar";
import PublicFooter from "../../../components/public/PublicFooter";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Users, 
  Bed, 
  Maximize2, 
  Check, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Bath,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { roomTypes, currentProperty, ratePlans, checkRoomAvailability, bookingQuery, setBookingQuery } = useStayora();

  const slug = params?.slug;
  const room = roomTypes.find((r) => r.slug === slug) || roomTypes[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedRatePlanId, setSelectedRatePlanId] = useState(ratePlans[0]?.id || "rp_standard_flex");

  // Check live availability for current dates
  const { totalAvailable } = checkRoomAvailability(
    room.propertyId,
    bookingQuery.checkIn,
    bookingQuery.checkOut,
    room.id
  );

  const activeRatePlan = ratePlans.find((rp) => rp.id === selectedRatePlanId) || ratePlans[0];
  const calculatedNightlyPrice = Math.round(room.basePrice * (activeRatePlan?.priceMultiplier || 1));

  const handleBookNow = () => {
    setBookingQuery((prev) => ({
      ...prev,
      propertyId: room.propertyId,
      selectedRoomTypeId: room.id,
      selectedRatePlanId: selectedRatePlanId
    }));
    router.push(`/booking?roomTypeId=${room.id}&ratePlanId=${selectedRatePlanId}`);
  };

  const relatedRooms = roomTypes
    .filter((r) => r.propertyId === room.propertyId && r.id !== room.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      {/* Breadcrumb Header */}
      <div className="bg-[#0d2b24] text-white py-6 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-white">Rooms</Link>
            <span>/</span>
            <span className="text-[#dfc285] font-semibold">{room.name}</span>
          </div>
          <span className="text-[11px] bg-white/10 px-3 py-1 rounded-full text-[#dfc285]">
            {room.category} Category
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Gallery & Details (2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div>
              <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-stone-200">
                <Image
                  src={room.images[activeImgIndex] || room.images[0]}
                  alt={room.name}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {room.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImgIndex === idx ? "border-[#0d2b24] shadow-md scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${room.name} ${idx + 1}`}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Headline & Specs */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24] mb-3">
                {room.name}
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed font-light mb-6">
                {room.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm text-xs">
                <div>
                  <span className="text-stone-400 block mb-1">Room Dimensions</span>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-[#c5a059]" /> {room.size}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 block mb-1">Bed Configuration</span>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#c5a059]" /> {room.bedType}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 block mb-1">Occupancy Limit</span>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#c5a059]" /> {room.maxAdults} Adults, {room.maxChildren} Child
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 block mb-1">Check-in / Out</span>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#c5a059]" /> 14:00 / 11:00
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#0d2b24] mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c5a059]" /> Included In-Room Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                {room.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-stone-50">
                    <Check className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bathroom Features */}
            {room.bathroomFeatures && (
              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-[#0d2b24] mb-6 flex items-center gap-2">
                  <Bath className="w-5 h-5 text-[#c5a059]" /> Luxury Bath & Wellness Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                  {room.bathroomFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#faf8f5] border border-stone-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
              <h4 className="font-bold text-[#0d2b24] text-sm">Reservation & Cancellation Policy</h4>
              <p>{room.cancellationPolicy}</p>
              <p className="text-[11px] text-stone-400">
                Rates include complimentary Wi-Fi and daily turn-down service. Valid government photo identification required at reception check-in.
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Card (1 col sticky) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/90 sticky top-28">
              <div className="border-b border-stone-100 pb-6 mb-6">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 block mb-1">
                  Starting Rate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24]">
                    ₹{calculatedNightlyPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">/ night + taxes</span>
                </div>

                <div className="mt-3">
                  {totalAvailable > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {totalAvailable} room{totalAvailable > 1 ? "s" : ""} available for selected dates
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      Sold out for current dates
                    </span>
                  )}
                </div>
              </div>

              {/* Rate Plan Selector */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block">
                  Select Rate Option
                </label>
                {ratePlans.map((plan) => {
                  const planPrice = Math.round(room.basePrice * plan.priceMultiplier);
                  return (
                    <label
                      key={plan.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedRatePlanId === plan.id
                          ? "border-[#0d2b24] bg-stone-50 shadow-sm"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="ratePlan"
                        value={plan.id}
                        checked={selectedRatePlanId === plan.id}
                        onChange={() => setSelectedRatePlanId(plan.id)}
                        className="mt-1 accent-[#0d2b24]"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between items-center font-bold text-stone-900">
                          <span>{plan.name}</span>
                          <span>₹{planPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                          {plan.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Dates confirmation */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs mb-6 space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Selected Stay:</span>
                  <span className="font-semibold text-stone-900">
                    {bookingQuery.checkIn} to {bookingQuery.checkOut}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Occupancy:</span>
                  <span>{bookingQuery.adults} Adults, {bookingQuery.children} Children</span>
                </div>
              </div>

              {/* Booking CTA */}
              <button
                onClick={handleBookNow}
                disabled={totalAvailable <= 0}
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  totalAvailable > 0
                    ? "bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] hover:scale-[1.01]"
                    : "bg-stone-300 text-stone-500 cursor-not-allowed"
                }`}
              >
                <span>{totalAvailable > 0 ? "Reserve This Room" : "Dates Unavailable"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-center">
                <Link
                  href="/availability"
                  className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4"
                >
                  Change Dates or Property
                </Link>
              </div>
            </div>

            {/* Related Rooms */}
            {relatedRooms.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#0d2b24]">
                  Other Suites You May Like
                </h4>
                {relatedRooms.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/rooms/${rel.slug}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors group"
                  >
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={rel.images[0]}
                        alt={rel.name}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-semibold text-stone-800 group-hover:text-[#c5a059] truncate">
                        {rel.name}
                      </p>
                      <p className="text-stone-500">₹{rel.basePrice.toLocaleString()} / night</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
