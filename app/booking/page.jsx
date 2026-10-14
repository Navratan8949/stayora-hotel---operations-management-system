"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { 
  Check, 
  Calendar, 
  Users, 
  Bed, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Printer, 
  AlertCircle,
  Building2,
  CheckCircle2,
  Tag
} from "lucide-react";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    currentProperty, 
    properties, 
    roomTypes, 
    ratePlans, 
    addons, 
    offers, 
    bookingQuery, 
    checkRoomAvailability, 
    createBooking, 
    setActivePrintDoc,
    addToast 
  } = useStayora();

  // Current Step (1 through 7)
  const [step, setStep] = useState(2);

  // Form states
  const [propertyId, setPropertyId] = useState(bookingQuery.propertyId || currentProperty.id);
  const [checkIn, setCheckIn] = useState(bookingQuery?.checkIn || "2026-10-14");
  const [checkOut, setCheckOut] = useState(bookingQuery?.checkOut || "2026-10-16");
  const [adults, setAdults] = useState(bookingQuery.adults || 2);
  const [children, setChildren] = useState(bookingQuery.children || 0);
  const [roomsCount, setRoomsCount] = useState(bookingQuery.roomsCount || 1);

  // Step 2 selections
  const initialRoomId = searchParams.get("roomTypeId") || roomTypes[0]?.id;
  const initialRatePlanId = searchParams.get("ratePlanId") || ratePlans[0]?.id;
  const initialPromo = searchParams.get("promoCode") || "";

  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(initialRoomId);
  const [selectedRatePlanId, setSelectedRatePlanId] = useState(initialRatePlanId);

  // Step 3 Guest info
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCity, setGuestCity] = useState("Jaipur");
  const [estimatedArrival, setEstimatedArrival] = useState("14:00 - 16:00");
  const [specialRequests, setSpecialRequests] = useState("");

  // Step 4 Addons
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Step 5 Promo Code
  const [promoCodeInput, setPromoCodeInput] = useState(initialPromo);
  const [appliedPromo, setAppliedPromo] = useState(initialPromo ? offers.find(o => o.code.toUpperCase() === initialPromo.toUpperCase()) : null);

  // Step 6 Payment Simulation
  const [paymentMethod, setPaymentMethod] = useState("Simulated Credit Card");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("888");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Step 7 Confirmed Reservation Record
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  // Nights calculation
  const inD = new Date(checkIn);
  const outD = new Date(checkOut);
  const nights = Math.max(1, Math.round((outD - inD) / (1000 * 60 * 60 * 24)));

  // Selected entities
  const selectedRoomType = roomTypes.find((r) => r.id === selectedRoomTypeId) || roomTypes[0];
  const selectedRatePlan = ratePlans.find((rp) => rp.id === selectedRatePlanId) || ratePlans[0];

  // Pricing calculations
  const baseNightlyRate = Math.round((selectedRoomType?.basePrice || 8500) * (selectedRatePlan?.priceMultiplier || 1));
  const roomSubtotal = baseNightlyRate * nights * roomsCount;

  // Addons total
  let addonsTotal = 0;
  selectedAddons.forEach((addonId) => {
    const ad = addons.find((a) => a.id === addonId);
    if (ad) {
      if (ad.pricePerStay) addonsTotal += ad.pricePerStay;
      else if (ad.pricePerPersonNight) addonsTotal += ad.pricePerPersonNight * (adults + children) * nights;
      else if (ad.pricePerPerson) addonsTotal += ad.pricePerPerson * (adults + children);
      else if (ad.pricePerNight) addonsTotal += ad.pricePerNight * nights;
    }
  });

  // Promo discount
  let discountAmount = 0;
  if (appliedPromo) {
    discountAmount = Math.round((roomSubtotal * appliedPromo.discountPercent) / 100);
  }

  const taxableAmount = Math.max(0, roomSubtotal + addonsTotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * (currentProperty.taxRate || 12)) / 100);
  const grandTotal = taxableAmount + taxAmount;
  const depositRequired = selectedRatePlan?.depositRequiredPercent
    ? Math.round((grandTotal * selectedRatePlan.depositRequiredPercent) / 100)
    : grandTotal;

  // Toggle addon
  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Apply promo
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const found = offers.find((o) => o.code.toUpperCase() === promoCodeInput.trim().toUpperCase() && o.active);
    if (found) {
      setAppliedPromo(found);
      addToast(`Promo code ${found.code} applied! ${found.discountPercent}% discount saved.`, "success");
    } else {
      addToast("Invalid or expired promo code.", "error");
    }
  };

  // Submit Step 6 (Execute Payment & Create Booking in PMS)
  const handleExecuteBooking = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);

      const res = createBooking({
        propertyId,
        roomTypeId: selectedRoomTypeId,
        ratePlanId: selectedRatePlanId,
        checkIn,
        checkOut,
        adults,
        children,
        roomsCount,
        guestName,
        guestEmail,
        guestPhone,
        guestCity,
        specialRequests: `Arrival window: ${estimatedArrival}. ${specialRequests}`,
        selectedAddons,
        promoCode: appliedPromo?.code || "",
        paymentMethod,
        depositAmountPaid: depositRequired
      });

      if (res) {
        setConfirmedReservation(res);
        setStep(7);
      }
    }, 1200);
  };

  const stepsHeader = [
    { num: 1, title: "Dates & Guests" },
    { num: 2, title: "Room & Rate" },
    { num: 3, title: "Guest Details" },
    { num: 4, title: "Royal Add-ons" },
    { num: 5, title: "Review Breakdown" },
    { num: 6, title: "Payment Simulation" },
    { num: 7, title: "Confirmation" }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      {/* Booking Stepper Top Bar */}
      <div className="bg-[#0d2b24] text-white py-6 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
                Direct Reservation Engine
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Book Your Stay at {currentProperty.name}
              </h1>
            </div>
            <div className="text-xs text-stone-300 font-mono bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Step {step} of 7: {stepsHeader[step - 1]?.title}</span>
            </div>
          </div>

          {/* Stepper Pills */}
          <div className="hidden md:flex items-center justify-between text-xs pt-2">
            {stepsHeader.map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 ${
                  step === s.num
                    ? "text-[#dfc285] font-bold"
                    : step > s.num
                    ? "text-white opacity-80"
                    : "text-stone-500 opacity-50"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                    step === s.num
                      ? "bg-[#c5a059] text-[#0d2b24]"
                      : step > s.num
                      ? "bg-emerald-700 text-white"
                      : "bg-white/10 text-stone-400"
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </span>
                <span>{s.title}</span>
                {s.num < 7 && <span className="text-white/20 mx-1">&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Flow Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Interactive Stage (8 cols) */}
          <div className="lg:col-span-8">
            {/* STEP 1: Search & Dates */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  Step 1: Select Stay Dates & Occupancy
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-medium text-stone-500 block mb-1">Property</label>
                    <select
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                    >
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.city})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-stone-500 block mb-1">Number of Rooms</label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n} Room{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-stone-500 block mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-500 block mb-1">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-500 block mb-1">Adult Guests</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-stone-500 block mb-1">Children</label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n}>{n} Child{n > 1 ? "ren" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <span>Proceed to Room Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Select Room & Rate Plan */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                        Step 2: Choose Room Type & Rate Plan
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Select your preferred suite and flexible cancellation tier.
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-stone-500 underline"
                    >
                      Edit Dates
                    </button>
                  </div>

                  {/* Room Type Cards */}
                  <div className="space-y-4">
                    {roomTypes
                      .filter((r) => r.propertyId === propertyId)
                      .map((room) => {
                        const { totalAvailable } = checkRoomAvailability(propertyId, checkIn, checkOut, room.id);
                        const isAvailable = totalAvailable >= roomsCount;
                        const isSelected = selectedRoomTypeId === room.id;

                        return (
                          <div
                            key={room.id}
                            onClick={() => isAvailable && setSelectedRoomTypeId(room.id)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-center justify-between ${
                              isSelected
                                ? "border-[#0d2b24] bg-stone-50/80 ring-2 ring-[#0d2b24]/20 shadow-md"
                                : isAvailable
                                ? "border-stone-200 hover:border-stone-300 bg-white"
                                : "border-stone-200 bg-stone-100 opacity-50 cursor-not-allowed"
                            }`}
                          >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                                <Image
                                  src={room.images[0]}
                                  alt={room.name}
                                  fill
                                  referrerPolicy="no-referrer"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider">
                                  {room.category}
                                </span>
                                <h4 className="font-serif text-lg font-bold text-stone-900">
                                  {room.name}
                                </h4>
                                <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-1">
                                  <span>{room.size}</span>
                                  <span>•</span>
                                  <span>Max {room.maxAdults} Guests</span>
                                  <span>•</span>
                                  <span className={totalAvailable > 0 ? "text-emerald-700 font-medium" : "text-rose-700"}>
                                    {totalAvailable > 0 ? `${totalAvailable} Left` : "Sold Out"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                              <div className="text-left sm:text-right">
                                <span className="font-serif text-2xl font-bold text-[#0d2b24]">
                                  ₹{room.basePrice.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-stone-400 block">/ night</span>
                              </div>
                              <input
                                type="radio"
                                name="selectedRoom"
                                checked={isSelected}
                                onChange={() => setSelectedRoomTypeId(room.id)}
                                disabled={!isAvailable}
                                className="w-5 h-5 accent-[#0d2b24]"
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Rate Plan Selection */}
                  <div className="pt-6 border-t border-stone-200 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#0d2b24]">
                      Select Rate Plan
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ratePlans.map((plan) => {
                        const calculatedRate = Math.round(selectedRoomType.basePrice * plan.priceMultiplier);
                        const isSelected = selectedRatePlanId === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedRatePlanId(plan.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? "border-[#0d2b24] bg-stone-50 shadow-sm"
                                : "border-stone-200 hover:border-stone-300 bg-white"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-xs text-stone-900">{plan.name}</span>
                              <span className="font-serif font-bold text-sm text-[#0d2b24]">
                                ₹{calculatedRate.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 leading-snug">{plan.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                    >
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                    >
                      <span>Proceed to Guest Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Guest Details Form */}
            {step === 3 && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  Step 3: Primary Guest Information
                </h2>
                <p className="text-xs text-stone-500">
                  Please provide your contact details for booking confirmation and arrival concierge.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharani Sunita Rao"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sunita.rao@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 block mb-1">City / Country of Residence</label>
                    <input
                      type="text"
                      placeholder="Mumbai, India"
                      value={guestCity}
                      onChange={(e) => setGuestCity(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Estimated Arrival Time</label>
                    <select
                      value={estimatedArrival}
                      onChange={(e) => setEstimatedArrival(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                    >
                      <option value="12:00 - 14:00 (Early Check-in Request)">12:00 - 14:00 (Early Request)</option>
                      <option value="14:00 - 16:00 (Standard)">14:00 - 16:00 (Standard)</option>
                      <option value="16:00 - 19:00 (Late Afternoon)">16:00 - 19:00 (Late Afternoon)</option>
                      <option value="After 20:00 (Night Arrival)">After 20:00 (Night Arrival)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Dietary / Room Preferences</label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetarian, Feather-free pillows, Quiet wing"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => {
                      if (!guestName || !guestEmail || !guestPhone) {
                        addToast("Please fill in required name, email and phone.", "error");
                        return;
                      }
                      setStep(4);
                    }}
                    className="px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <span>Proceed to Add-ons</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Add-ons */}
            {step === 4 && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                      Step 4: Enhance Your Stay with Curated Add-ons
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Add royal airport chauffeurs, dining indulgences, and spa wellness therapies.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {addons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isChecked
                            ? "border-[#0d2b24] bg-stone-50 shadow-sm"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon.id)}
                            className="w-5 h-5 accent-[#0d2b24] rounded"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider">
                              {addon.category}
                            </span>
                            <h4 className="font-semibold text-xs text-stone-900">{addon.name}</h4>
                            <p className="text-[11px] text-stone-500 mt-0.5">{addon.description}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-serif font-bold text-sm text-[#0d2b24]">
                            ₹{(addon.pricePerStay || addon.pricePerPersonNight || addon.pricePerPerson || addon.pricePerNight).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            {addon.pricePerStay ? "per stay" : addon.pricePerPersonNight ? "per person/nt" : addon.pricePerPerson ? "per person" : "per night"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <span>Review Price Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Review & Price Breakdown */}
            {step === 5 && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  Step 5: Review Reservation Details & Totals
                </h2>

                {/* Summary Table */}
                <div className="p-5 rounded-2xl bg-[#faf8f5] border border-stone-200 text-xs space-y-3">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Destination Property:</span>
                    <strong className="text-stone-900">{currentProperty.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Selected Suite:</span>
                    <strong className="text-stone-900">{selectedRoomType.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Rate Plan:</span>
                    <strong className="text-stone-900">{selectedRatePlan.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Dates of Stay:</span>
                    <strong className="text-stone-900">
                      {checkIn} to {checkOut} ({nights} Night{nights > 1 ? "s" : ""})
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Guests & Rooms:</span>
                    <strong className="text-stone-900">{adults} Adults, {children} Children ({roomsCount} Room)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Primary Guest:</span>
                    <strong className="text-stone-900">{guestName} ({guestEmail}, {guestPhone})</strong>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <span className="text-xs font-semibold text-amber-900 flex items-center gap-1.5 mb-2">
                    <Tag className="w-4 h-4 text-[#c5a059]" /> Have a Promotional Code?
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ROYAL15 or WELCOME10"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-mono uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-800 font-medium mt-2">
                      ✓ Promo &ldquo;{appliedPromo.code}&rdquo; active ({appliedPromo.discountPercent}% off room subtotal)
                    </p>
                  )}
                </div>

                {/* Itemized Calculation */}
                <div className="space-y-2 text-xs border-t border-stone-200 pt-4">
                  <div className="flex justify-between text-stone-600">
                    <span>Room Charges ({nights} night{nights > 1 ? "s" : ""} × ₹{baseNightlyRate.toLocaleString()}):</span>
                    <span>₹{roomSubtotal.toLocaleString()}</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Curated Add-ons & Services:</span>
                      <span>₹{addonsTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount ({appliedPromo.code}):</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Estimated Taxes & Tourism Levies (GST 12%):</span>
                    <span>₹{taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#0d2b24] pt-2 border-t border-stone-200">
                    <span>Total Reservation Amount:</span>
                    <span className="font-serif text-xl">₹{grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#c5a059] font-semibold pt-1">
                    <span>Advance Deposit Due Now ({selectedRatePlan.depositRequiredPercent || 100}%):</span>
                    <span>₹{depositRequired.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => setStep(6)}
                    className="px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <span>Proceed to Simulated Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Payment Simulation */}
            {step === 6 && (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                    Step 6: Secure Payment Simulation
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Demo card simulator for Stayora presentation. No actual currency is debited.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Simulated Sandbox Mode. Pre-filled with demo testing credentials.
                  </span>
                </div>

                {/* Method Tabs */}
                <div className="flex gap-2 text-xs">
                  {["Simulated Credit Card", "Simulated UPI / QR", "Pay at Property"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`flex-1 py-2.5 rounded-xl border font-semibold transition-all ${
                        paymentMethod === m
                          ? "border-[#0d2b24] bg-[#0d2b24] text-white shadow-sm"
                          : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {paymentMethod === "Simulated Credit Card" && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-medium text-stone-700 block mb-1">Demo Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-900"
                        />
                        <CreditCard className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-stone-700 block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-stone-700 block mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "Simulated UPI / QR" && (
                  <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center text-xs space-y-2">
                    <p className="font-semibold text-stone-800">Simulated Instant UPI Transfer</p>
                    <p className="text-stone-500">Virtual VPA: <code>stayora.jaipur@demobank</code></p>
                    <div className="w-32 h-32 bg-stone-200 mx-auto rounded-xl flex items-center justify-center text-stone-400 font-mono text-[10px]">
                      [Demo QR Code]
                    </div>
                  </div>
                )}

                {paymentMethod === "Pay at Property" && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                    <p className="font-medium text-stone-800 mb-1">Pay Upon Check-in at Reception</p>
                    <p>A credit card pre-authorization or cash deposit will be collected at check-in.</p>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setStep(5)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={handleExecuteBooking}
                    disabled={isProcessingPayment}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#0d2b24] to-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-[1.01] transition-all"
                  >
                    {isProcessingPayment ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Validating Availability & Processing...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                        <span>Confirm & Authorize ₹{depositRequired.toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: Confirmation */}
            {step === 7 && confirmedReservation && (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-8 animate-in fade-in">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
                    Reservation Confirmed
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24]">
                    Your Royal Stay is Secured!
                  </h2>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    A confirmation voucher has been generated and your room inventory is reserved in the Stayora PMS.
                  </p>
                </div>

                {/* Booking Reference Pill */}
                <div className="p-6 bg-[#0d2b24] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-mono tracking-wider">
                      Booking Reference Number
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#dfc285]">
                      {confirmedReservation.bookingReference}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setActivePrintDoc({
                          title: "Official Booking Confirmation Voucher",
                          docType: "RESERVATION VOUCHER",
                          data: confirmedReservation
                        })
                      }
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-white/20"
                    >
                      <Printer className="w-4 h-4 text-[#c5a059]" />
                      <span>Print Voucher</span>
                    </button>
                  </div>
                </div>

                {/* Key Details Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#faf8f5] p-6 rounded-2xl border border-stone-200">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Guest Name</span>
                    <strong className="text-stone-900 text-sm">{confirmedReservation.guestName}</strong>
                    <p className="text-stone-500">{confirmedReservation.guestEmail} • {confirmedReservation.guestPhone}</p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Assigned Accommodation</span>
                    <strong className="text-stone-900 text-sm">
                      Room {confirmedReservation.roomNumber} ({confirmedReservation.roomTypeName})
                    </strong>
                    <p className="text-stone-500">{confirmedReservation.ratePlanName}</p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Dates of Stay</span>
                    <strong className="text-stone-900">
                      {confirmedReservation.checkIn} to {confirmedReservation.checkOut} ({confirmedReservation.nights} nights)
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Payment Summary</span>
                    <strong className="text-emerald-700">
                      Paid: ₹{confirmedReservation.amountPaid.toLocaleString()} (Balance: ₹{confirmedReservation.balanceDue.toLocaleString()})
                    </strong>
                  </div>
                </div>

                {/* Client Demonstration Jump CTA */}
                <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-amber-950">
                    <strong className="block font-serif text-sm">See this Booking in Hotel Operations:</strong>
                    <span>
                      Because this is a connected system, your new reservation is immediately live in the Front Desk arrivals and Room inventory!
                    </span>
                  </div>
                  <Link
                    href={`/app/reservations?ref=${confirmedReservation.bookingReference}`}
                    className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-md hover:brightness-110"
                  >
                    View in PMS Portal &rarr;
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                  <Link
                    href={`/manage-booking?ref=${confirmedReservation.bookingReference}`}
                    className="text-[#0d2b24] font-semibold underline underline-offset-4"
                  >
                    Manage or View Reservation Later
                  </Link>
                  <span>•</span>
                  <Link href="/" className="text-stone-500 hover:text-stone-800">
                    Return to Homepage
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-lg sticky top-28 space-y-5">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider block mb-1">
                  Stay Summary
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0d2b24]">
                  {selectedRoomType?.name}
                </h3>
                <p className="text-xs text-stone-500">{currentProperty.name}</p>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <strong className="text-stone-900">{checkIn} (14:00)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <strong className="text-stone-900">{checkOut} (11:00)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <strong className="text-stone-900">{nights} night{nights > 1 ? "s" : ""}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Occupancy:</span>
                  <strong className="text-stone-900">{adults} Adults, {children} Children</strong>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Base Room Rate:</span>
                  <span>₹{baseNightlyRate.toLocaleString()} / nt</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Room Subtotal:</span>
                  <span>₹{roomSubtotal.toLocaleString()}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-stone-700">
                    <span>Curated Add-ons:</span>
                    <span>₹{addonsTotal.toLocaleString()}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Taxes (12%):</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900">
                  <span>Estimated Total:</span>
                  <span className="font-serif text-xl text-[#0d2b24]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 leading-snug">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] inline mr-1" />
                Guaranteed official direct rate with flexible cancellation up to 48h before check-in.
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-400">Loading booking engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}
