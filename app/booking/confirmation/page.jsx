"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PublicNavbar from "../../../components/public/PublicNavbar";
import PublicFooter from "../../../components/public/PublicFooter";
import { useStayora } from "../../../context/StayoraContext";
import { CheckCircle2, Printer, Calendar, Users, BedDouble, ShieldCheck, ArrowRight } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { reservations, currentProperty, setActivePrintDoc } = useStayora();

  const ref = searchParams.get("ref") || "STY-JP-8012";
  const reservation = reservations.find(
    (r) => r.bookingReference.toLowerCase() === ref.toLowerCase()
  ) || reservations[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-12 border-b border-[#c5a059]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Booking Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-2">
            Stayora Reservation Voucher
          </h1>
          <p className="text-xs text-stone-300">
            Booking Reference: <strong className="font-mono text-[#dfc285]">{reservation?.bookingReference}</strong>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {reservation ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-6">
            <div className="text-center space-y-2 pb-6 border-b border-stone-200">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                Thank You, {reservation.guestName}!
              </h2>
              <p className="text-xs text-stone-500">
                Your reservation at {currentProperty.name} is confirmed and recorded.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#faf8f5] p-6 rounded-2xl border border-stone-100">
              <div>
                <span className="text-stone-400 block mb-0.5">Room & Rate</span>
                <strong className="text-stone-900 text-sm">
                  Room {reservation.roomNumber} ({reservation.roomTypeName})
                </strong>
                <p className="text-stone-500">{reservation.ratePlanName}</p>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Stay Dates</span>
                <strong className="text-stone-900 text-sm">
                  {reservation.checkIn} to {reservation.checkOut}
                </strong>
                <p className="text-stone-500">{reservation.nights} nights • {reservation.adults} Adults</p>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Financials</span>
                <strong className="text-stone-900 text-sm">
                  Total: ₹{reservation.totalAmount?.toLocaleString()}
                </strong>
                <p className="text-emerald-700">Paid: ₹{reservation.amountPaid?.toLocaleString()}</p>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Payment Status</span>
                <strong className="text-stone-900 text-sm uppercase">
                  {reservation.paymentStatus}
                </strong>
                <p className="text-stone-500">{reservation.bookingSource}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() =>
                  setActivePrintDoc({
                    title: `Official Booking Confirmation Voucher — ${reservation.bookingReference}`,
                    docType: "RESERVATION VOUCHER",
                    data: reservation
                  })
                }
                className="flex-1 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-110"
              >
                <Printer className="w-4 h-4 text-[#c5a059]" />
                <span>Print Official Voucher</span>
              </button>

              <Link
                href={`/manage-booking?ref=${reservation.bookingReference}`}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider text-center"
              >
                Manage This Reservation
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-stone-400">Reservation not found.</p>
        )}
      </div>

      <PublicFooter />
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-400">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
