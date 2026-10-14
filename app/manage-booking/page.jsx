"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { Search, Calendar, User, Printer, XCircle, AlertCircle, CheckCircle2, BedDouble, Receipt } from "lucide-react";

function ManageBookingContent() {
  const searchParams = useSearchParams();
  const { reservations, folios, cancelReservation, setActivePrintDoc, addToast } = useStayora();

  const queryParamRef = searchParams.get("ref") || "";
  const [bookingRef, setBookingRef] = useState(queryParamRef);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [searchedResId, setSearchedResId] = useState(() => {
    if (!queryParamRef) return null;
    const found = reservations.find((r) => r.bookingReference.toLowerCase() === queryParamRef.toLowerCase());
    return found ? found.id : null;
  });
  const [searchError, setSearchError] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("Change of travel plans");

  const activeReservation = searchedResId ? reservations.find((r) => r.id === searchedResId) : null;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError("");

    const ref = bookingRef.trim().toLowerCase();
    const query = emailOrPhone.trim().toLowerCase();

    const found = reservations.find((r) => {
      const matchRef = r.bookingReference.toLowerCase() === ref;
      if (!query) return matchRef;
      const matchEmail = r.guestEmail?.toLowerCase().includes(query);
      const matchPhone = r.guestPhone && r.guestPhone.includes(query);
      return matchRef && (matchEmail || matchPhone);
    });

    if (found) {
      setSearchedResId(found.id);
    } else {
      setSearchedResId(null);
      setSearchError("No reservation found matching this booking reference and contact detail. Try sample ref: STY-JP-8012");
    }
  };

  const handleConfirmCancel = () => {
    if (!activeReservation) return;
    const ok = cancelReservation(activeReservation.id, cancelReason);
    if (ok) {
      setCancelModalOpen(false);
    }
  };

  // Linked Folio
  const folio = activeReservation ? folios.find((f) => f.reservationId === activeReservation.id) : null;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-12 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Guest Self-Service Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-2">
            Find & Manage Your Reservation
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
            Review your stay details, download an official confirmation voucher, view folios, or modify your itinerary.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Lookup Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5">
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Booking Reference *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. STY-JP-8012"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs uppercase"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Guest Email or Phone (Optional)
              </label>
              <input
                type="text"
                placeholder="email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full p-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-110"
              >
                <Search className="w-4 h-4" />
                <span>Retrieve Booking</span>
              </button>
            </div>
          </form>

          {searchError && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          <div className="mt-3 text-[11px] text-stone-400">
            Demo references you can test with: <code className="text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">STY-JP-8012</code>, <code className="text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">STY-JP-8015</code>, <code className="text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">STY-JP-8022</code>.
          </div>
        </div>

        {/* Found Reservation Details */}
        {activeReservation && (
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-bold text-[#0d2b24]">
                    {activeReservation.bookingReference}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      activeReservation.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : activeReservation.status === "Checked In"
                        ? "bg-emerald-100 text-emerald-800"
                        : activeReservation.status === "Checked Out"
                        ? "bg-stone-200 text-stone-700"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {activeReservation.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Booked on {activeReservation.createdAt} • Source: {activeReservation.bookingSource}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setActivePrintDoc({
                      title: "Official Booking Confirmation Voucher",
                      docType: "RESERVATION VOUCHER",
                      data: activeReservation
                    })
                  }
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-stone-200"
                >
                  <Printer className="w-4 h-4 text-[#0d2b24]" />
                  <span>Print Voucher</span>
                </button>

                {activeReservation.status === "Confirmed" && (
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-rose-200"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Stay</span>
                  </button>
                )}
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3 p-5 rounded-2xl bg-[#faf8f5] border border-stone-200">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-[#c5a059]" /> Guest Details
                </h4>
                <div className="space-y-1 text-stone-600">
                  <p><strong className="text-stone-800">Name:</strong> {activeReservation.guestName}</p>
                  <p><strong className="text-stone-800">Email:</strong> {activeReservation.guestEmail}</p>
                  <p><strong className="text-stone-800">Phone:</strong> {activeReservation.guestPhone}</p>
                  <p><strong className="text-stone-800">Requests:</strong> {activeReservation.specialRequests || "None recorded"}</p>
                </div>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-[#faf8f5] border border-stone-200">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-[#c5a059]" /> Room & Dates
                </h4>
                <div className="space-y-1 text-stone-600">
                  <p><strong className="text-stone-800">Room Type:</strong> {activeReservation.roomTypeName || "Deluxe Suite"}</p>
                  <p><strong className="text-stone-800">Assigned Room:</strong> Room {activeReservation.roomNumber}</p>
                  <p><strong className="text-stone-800">Dates:</strong> {activeReservation.checkIn} to {activeReservation.checkOut} ({activeReservation.nights} nights)</p>
                  <p><strong className="text-stone-800">Guests:</strong> {activeReservation.adults} Adults, {activeReservation.children} Children</p>
                </div>
              </div>
            </div>

            {/* Financial Ledger / Folio Preview */}
            {folio && (
              <div className="p-5 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#c5a059]" /> Stay Folio & Billing Statement
                  </h4>
                  <button
                    onClick={() =>
                      setActivePrintDoc({
                        title: `Guest Folio Statement — Room ${folio.roomNumber}`,
                        docType: "GUEST FOLIO",
                        data: { ...folio, guestName: activeReservation.guestName }
                      })
                    }
                    className="text-xs text-[#0d2b24] font-semibold underline underline-offset-4"
                  >
                    View Itemized Folio &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs text-center pt-2">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="text-stone-400 block text-[10px]">Total Charges</span>
                    <strong className="text-stone-900 font-mono text-sm">₹{folio.totalCharges.toLocaleString()}</strong>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <span className="text-emerald-700 block text-[10px]">Amount Settled</span>
                    <strong className="text-emerald-900 font-mono text-sm">₹{folio.totalPaid.toLocaleString()}</strong>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <span className="text-amber-700 block text-[10px]">Balance Due</span>
                    <strong className="text-amber-900 font-mono text-sm">₹{folio.balanceDue.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cancellation Dialog */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Confirm Reservation Cancellation
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to cancel booking <strong>{activeReservation?.bookingReference}</strong>?
              Under our standard flexible policy, this cancellation is free of penalty and your room will be released back to available inventory.
            </p>

            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1">Reason for Cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs"
              >
                <option value="Change of travel plans">Change of travel plans</option>
                <option value="Date rescheduling">Date rescheduling</option>
                <option value="Found alternative accommodation">Found alternative accommodation</option>
                <option value="Personal emergency">Personal emergency</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Keep Reservation
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-700 text-white hover:bg-rose-800 shadow"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}

export default function ManageBookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-400">Loading booking manager...</div>}>
      <ManageBookingContent />
    </Suspense>
  );
}
