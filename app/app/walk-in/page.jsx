"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  UserCheck, 
  BedDouble, 
  Calendar, 
  CreditCard, 
  Printer, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function WalkInCheckInPage() {
  const router = useRouter();
  const { 
    currentProperty, 
    roomTypes, 
    rooms, 
    createBooking, 
    checkInGuest, 
    setActivePrintDoc, 
    addToast 
  } = useStayora();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCity, setGuestCity] = useState("Jaipur");
  const [idType, setIdType] = useState("Aadhaar Card");
  const [idNumber, setIdNumber] = useState("XXXX-XXXX-4421");

  const [checkIn, setCheckIn] = useState("2026-10-14");
  const [checkOut, setCheckOut] = useState("2026-10-15");
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(roomTypes[0]?.id || "");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const [adults, setAdults] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("Cash (Demo Front Desk)");
  const [depositAmount, setDepositAmount] = useState("");

  const inD = new Date(checkIn);
  const outD = new Date(checkOut);
  const nights = Math.max(1, Math.round((outD - inD) / (1000 * 60 * 60 * 24)));

  const selectedRoomType = roomTypes.find((r) => r.id === selectedRoomTypeId) || roomTypes[0];
  const roomSubtotal = (selectedRoomType?.basePrice || 8500) * nights;
  const taxAmount = Math.round(roomSubtotal * 0.12);
  const grandTotal = roomSubtotal + taxAmount;

  // Filter available rooms of selected type
  const availableRooms = rooms.filter(
    (r) =>
      r.propertyId === currentProperty.id &&
      r.roomTypeId === selectedRoomTypeId &&
      r.operationalStatus === "Available"
  );

  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      addToast("Please provide guest name and mobile number.", "error");
      return;
    }

    if (!selectedRoomId) {
      addToast("Please assign a physical room.", "error");
      return;
    }

    const depositToRecord = depositAmount ? Number(depositAmount) : grandTotal;

    // Create reservation record
    const res = createBooking({
      propertyId: currentProperty.id,
      roomTypeId: selectedRoomTypeId,
      ratePlanId: "rp_standard_flex",
      checkIn,
      checkOut,
      adults: Number(adults),
      children: 0,
      roomsCount: 1,
      guestName,
      guestEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, ".")}@guest-demo.in`,
      guestPhone,
      guestCity,
      specialRequests: `Walk-in registration. ID: ${idType} (${idNumber})`,
      paymentMethod,
      depositAmountPaid: depositToRecord
    });

    if (res) {
      // Check in immediately into the selected physical room!
      checkInGuest(res.id, selectedRoomId);
      addToast(`Walk-in guest ${guestName} checked in directly to Room!`, "success");

      // Trigger registration card print
      setActivePrintDoc({
        title: "Guest Registration & Check-In Card",
        docType: "REGISTRATION CARD",
        data: { ...res, idType, idNumber }
      });

      router.push("/app/in-house");
    }
  };

  return (
    <PmsLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Front Desk Reception
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Walk-In Guest Direct Check-In
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Register an unscheduled arrival, collect identification, assign key card, and check in immediately.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <form onSubmit={handleWalkInSubmit} className="space-y-6">
          {/* Guest Identity Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              1. Guest Contact & Government Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kunwar Pratap Singh"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
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
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="pratap@example.in"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">City / State of Residence</label>
                <input
                  type="text"
                  placeholder="Jaipur, Rajasthan"
                  value={guestCity}
                  onChange={(e) => setGuestCity(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Photo ID Document Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving Licence">Driving Licence</option>
                  <option value="Voter ID Card">Voter ID Card</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">ID Document Number</label>
                <input
                  type="text"
                  placeholder="XXXX-XXXX-4421"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Room Allocation & Stay Window */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              2. Room Selection & Stay Dates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Room Category</label>
                <select
                  value={selectedRoomTypeId}
                  onChange={(e) => {
                    setSelectedRoomTypeId(e.target.value);
                    setSelectedRoomId("");
                  }}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                >
                  {roomTypes
                    .filter((rt) => rt.propertyId === currentProperty.id)
                    .map((rt) => (
                      <option key={rt.id} value={rt.id}>
                        {rt.name} (₹{rt.basePrice.toLocaleString()} / night)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Assign Available Physical Room *
                </label>
                <select
                  required
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-bold text-stone-900"
                >
                  <option value="">Choose an available room...</option>
                  {availableRooms.map((rm) => (
                    <option key={rm.id} value={rm.id}>
                      Room {rm.number} (Floor {rm.floor}, {rm.housekeepingStatus})
                    </option>
                  ))}
                </select>
                {availableRooms.length === 0 && (
                  <p className="text-[11px] text-rose-600 mt-1">
                    No physical rooms currently clean and available in this category.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Billing & Settlement */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              3. Tariff & Advance Deposit Settlement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-[#faf8f5] p-4 rounded-2xl border border-stone-100">
                <div className="flex justify-between">
                  <span>Room Tariff ({nights} nights):</span>
                  <span>₹{roomSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (12%):</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due:</span>
                  <span className="font-serif text-base text-[#0d2b24]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <option value="Cash (Demo Front Desk)">Cash (Front Desk)</option>
                    <option value="Credit Card POS (Demo)">Credit Card POS Terminal</option>
                    <option value="UPI QR (Demo)">UPI QR Instant Transfer</option>
                    <option value="Direct Company Bill">Direct Company Bill</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Advance Collected Now (₹)
                  </label>
                  <input
                    type="number"
                    placeholder={`e.g. ${grandTotal}`}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    Leave blank to record full payment of ₹{grandTotal.toLocaleString()}.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push("/app")}
                className="px-5 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-[#0d2b24] to-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shadow-xl hover:brightness-110 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                <span>Confirm Walk-In & Check In Now</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </PmsLayout>
  );
}
