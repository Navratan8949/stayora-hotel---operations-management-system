"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import {
  CalendarDays,
  Search,
  Filter,
  Download,
  Plus,
  Printer,
  XCircle,
  CheckCircle,
  Eye,
  UserCheck,
  BedDouble,
  DollarSign,
  AlertCircle,
  Clock,
  ArrowRight
} from "lucide-react";

function ReservationsContent() {
  const searchParams = useSearchParams();
  const {
    currentProperty,
    reservations,
    rooms,
    roomTypes,
    ratePlans,
    checkInGuest,
    checkOutGuest,
    cancelReservation,
    assignOrMoveRoom,
    createBooking,
    setActivePrintDoc,
    addToast
  } = useStayora();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState(searchParams.get("ref") || "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // Drawer / Modals
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [moveRoomModalOpen, setMoveRoomModalOpen] = useState(false);
  const [targetRoomId, setTargetRoomId] = useState("");
  const [newResModalOpen, setNewResModalOpen] = useState(searchParams.get("action") === "new");

  // New manual reservation form state
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [newRoomTypeId, setNewRoomTypeId] = useState(roomTypes[0]?.id || "");
  const [newCheckIn, setNewCheckIn] = useState("2026-10-14");
  const [newCheckOut, setNewCheckOut] = useState("2026-10-15");
  const [newAdults, setNewAdults] = useState(2);
  const [newDepositPaid, setNewDepositPaid] = useState(0);

  // Property scoped & filtered
  const filteredReservations = useMemo(() => {
    return reservations
      .filter((r) => r.propertyId === currentProperty.id)
      .filter((r) => {
        if (statusFilter !== "All" && r.status !== statusFilter) return false;
        if (paymentFilter !== "All" && r.paymentStatus !== paymentFilter) return false;
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchRef = r.bookingReference.toLowerCase().includes(q);
          const matchName = r.guestName.toLowerCase().includes(q);
          const matchRoom = r.roomNumber && r.roomNumber.toLowerCase().includes(q);
          const matchPhone = r.guestPhone && r.guestPhone.includes(q);
          return matchRef || matchName || matchRoom || matchPhone;
        }
        return true;
      });
  }, [reservations, currentProperty.id, statusFilter, paymentFilter, searchTerm]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Booking Reference",
      "Guest Name",
      "Email",
      "Phone",
      "Room Number",
      "Room Type",
      "Check-In",
      "Check-Out",
      "Nights",
      "Total (INR)",
      "Paid (INR)",
      "Balance (INR)",
      "Status",
      "Payment Status",
      "Booking Source"
    ];

    const rows = filteredReservations.map((r) => [
      r.bookingReference,
      `"${r.guestName}"`,
      r.guestEmail,
      r.guestPhone,
      r.roomNumber,
      `"${r.roomTypeName || ""}"`,
      r.checkIn,
      r.checkOut,
      r.nights,
      r.totalAmount,
      r.amountPaid,
      r.balanceDue,
      r.status,
      r.paymentStatus,
      `"${r.bookingSource}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `stayora_reservations_${currentProperty.city.toLowerCase()}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    addToast("Exported reservation roster to CSV successfully.", "success");
  };

  // Submit manual reservation
  const handleCreateManualReservation = (e) => {
    e.preventDefault();
    if (!newGuestName || !newGuestEmail || !newGuestPhone) {
      addToast("Please fill in required guest contact fields.", "error");
      return;
    }

    const res = createBooking({
      propertyId: currentProperty.id,
      roomTypeId: newRoomTypeId,
      ratePlanId: "rp_standard_flex",
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      adults: Number(newAdults),
      children: 0,
      roomsCount: 1,
      guestName: newGuestName,
      guestEmail: newGuestEmail,
      guestPhone: newGuestPhone,
      paymentMethod: "Manual Front Office Record",
      depositAmountPaid: Number(newDepositPaid)
    });

    if (res) {
      setNewResModalOpen(false);
      setSelectedReservation(res);
      addToast(`Reservation ${res.bookingReference} logged successfully.`, "success");
    }
  };

  const availableRoomsForProperty = rooms.filter(
    (r) => r.propertyId === currentProperty.id && r.operationalStatus !== "Out of Service"
  );

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Front Office Operations
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Reservation Management
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Active bookings, guest arrivals, room assignments, and folio status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewResModalOpen(true)}
              className="px-4 py-2.5 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Reservation</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
            >
              <Download className="w-4 h-4 text-[#0d2b24]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search reference, guest name, room number, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="Checked Out">Checked Out</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 font-medium"
            >
              <option value="All">All Payment States</option>
              <option value="Paid">Fully Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div className="sm:col-span-1 flex items-center justify-center font-bold text-stone-500">
            {filteredReservations.length} records
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#faf8f5] text-stone-500 border-b border-stone-200 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Guest Details</th>
                  <th className="p-4">Room</th>
                  <th className="p-4">Dates & Duration</th>
                  <th className="p-4">Financials</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-400">
                      No reservations match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Ref */}
                      <td className="p-4 font-mono font-bold text-[#0d2b24]">
                        {res.bookingReference}
                        <span className="block text-[10px] font-sans font-normal text-stone-400">
                          {res.bookingSource}
                        </span>
                      </td>

                      {/* Guest */}
                      <td className="p-4">
                        <strong className="text-stone-900 block font-semibold">{res.guestName}</strong>
                        <span className="text-[11px] text-stone-500">{res.guestPhone}</span>
                      </td>

                      {/* Room */}
                      <td className="p-4">
                        <span className="inline-block bg-stone-100 px-2 py-0.5 rounded font-mono font-bold text-stone-800">
                          Room {res.roomNumber}
                        </span>
                        <span className="block text-[11px] text-stone-400 mt-0.5 truncate max-w-[120px]">
                          {res.roomTypeName}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="p-4">
                        <span className="font-semibold text-stone-800">
                          {res.checkIn} &rarr; {res.checkOut}
                        </span>
                        <span className="block text-[11px] text-stone-400">
                          {res.nights} Night{res.nights > 1 ? "s" : ""} ({res.adults} Ad, {res.children} Ch)
                        </span>
                      </td>

                      {/* Financials */}
                      <td className="p-4">
                        <span className="font-serif font-bold text-stone-900">
                          ₹{res.totalAmount.toLocaleString()}
                        </span>
                        <div className="text-[11px] mt-0.5">
                          {res.balanceDue > 0 ? (
                            <span className="text-amber-700 font-medium">Due: ₹{res.balanceDue.toLocaleString()}</span>
                          ) : (
                            <span className="text-emerald-700 font-medium">Settled</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            res.status === "Confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : res.status === "Checked In"
                              ? "bg-emerald-100 text-emerald-800"
                              : res.status === "Checked Out"
                              ? "bg-stone-200 text-stone-700"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedReservation(res)}
                            className="p-1.5 text-stone-500 hover:text-[#0d2b24] hover:bg-stone-100 rounded-lg transition-colors"
                            title="View Full Reservation Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {res.status === "Confirmed" && (
                            <button
                              onClick={() => checkInGuest(res.id, res.assignedRoomId)}
                              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-semibold transition-colors"
                              title="Check in guest"
                            >
                              Check-In
                            </button>
                          )}

                          {res.status === "Checked In" && (
                            <button
                              onClick={() => checkOutGuest(res.id)}
                              className="px-2.5 py-1 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-lg text-[11px] font-semibold transition-colors"
                              title="Check out guest"
                            >
                              Check-Out
                            </button>
                          )}

                          <button
                            onClick={() =>
                              setActivePrintDoc({
                                title: "Official Reservation Voucher",
                                docType: "RESERVATION VOUCHER",
                                data: res
                              })
                            }
                            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                            title="Print voucher"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Drawer Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400">Reservation Details</span>
                <h3 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  {selectedReservation.bookingReference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReservation(null)}
                className="p-1 text-stone-400 hover:text-stone-800"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-400 block text-[10px]">Guest Information</span>
                <strong className="text-stone-900 block text-sm">{selectedReservation.guestName}</strong>
                <p className="text-stone-600">{selectedReservation.guestEmail}</p>
                <p className="text-stone-600">{selectedReservation.guestPhone}</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-400 block text-[10px]">Room Allocation</span>
                <strong className="text-stone-900 block text-sm">
                  Room {selectedReservation.roomNumber} ({selectedReservation.roomTypeName})
                </strong>
                <p className="text-stone-600">{selectedReservation.ratePlanName}</p>
                <button
                  onClick={() => setMoveRoomModalOpen(true)}
                  className="text-[11px] text-[#0d2b24] font-semibold underline mt-1"
                >
                  Change / Reassign Room &rarr;
                </button>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-400 block text-[10px]">Stay Window</span>
                <strong className="text-stone-900 block">
                  {selectedReservation.checkIn} to {selectedReservation.checkOut}
                </strong>
                <p className="text-stone-600">{selectedReservation.nights} Nights • {selectedReservation.adults} Adults</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl space-y-1">
                <span className="text-stone-400 block text-[10px]">Financial Status</span>
                <strong className="text-stone-900 block">
                  Total: ₹{selectedReservation.totalAmount.toLocaleString()}
                </strong>
                <p className="text-stone-600">
                  Paid: ₹{selectedReservation.amountPaid.toLocaleString()} | Due: ₹{selectedReservation.balanceDue.toLocaleString()}
                </p>
              </div>
            </div>

            {selectedReservation.specialRequests && (
              <div className="p-4 bg-amber-50 rounded-xl text-xs text-amber-950">
                <strong>Guest Special Requests:</strong>
                <p className="mt-0.5">{selectedReservation.specialRequests}</p>
              </div>
            )}

            <div className="pt-4 border-t border-stone-200 flex flex-wrap justify-between items-center gap-3">
              <div className="flex gap-2">
                <Link
                  href={`/app/folios?resId=${selectedReservation.id}`}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                >
                  Open Guest Folio
                </Link>
                <button
                  onClick={() =>
                    setActivePrintDoc({
                      title: "Guest Registration Card",
                      docType: "REGISTRATION CARD",
                      data: selectedReservation
                    })
                  }
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                >
                  Print Reg Card
                </button>
              </div>

              {selectedReservation.status === "Confirmed" && (
                <button
                  onClick={() => {
                    cancelReservation(selectedReservation.id, "Front Desk Cancellation");
                    setSelectedReservation(null);
                  }}
                  className="px-4 py-2 bg-rose-100 text-rose-800 hover:bg-rose-200 rounded-xl text-xs font-bold"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Move Room Modal */}
      {moveRoomModalOpen && selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Reassign Room for {selectedReservation.guestName}
            </h3>
            <p className="text-stone-500">
              Current room: <strong>Room {selectedReservation.roomNumber}</strong>. Select available target room:
            </p>

            <select
              value={targetRoomId}
              onChange={(e) => setTargetRoomId(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
            >
              <option value="">Select a room...</option>
              {availableRoomsForProperty.map((rm) => (
                <option key={rm.id} value={rm.id}>
                  Room {rm.number} ({rm.operationalStatus}, Housekeeping: {rm.housekeepingStatus})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setMoveRoomModalOpen(false)}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!targetRoomId) return;
                  assignOrMoveRoom(selectedReservation.id, targetRoomId);
                  setMoveRoomModalOpen(false);
                  setSelectedReservation(null);
                }}
                className="px-4 py-2 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold"
              >
                Reassign Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Reservation Modal */}
      {newResModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
                Create Reservation (Front Office)
              </h3>
              <button onClick={() => setNewResModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateManualReservation} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharani Sunita Rao"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newGuestPhone}
                    onChange={(e) => setNewGuestPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Room Type</label>
                <select
                  value={newRoomTypeId}
                  onChange={(e) => setNewRoomTypeId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  {roomTypes.filter(rt => rt.propertyId === currentProperty.id).map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      {rt.name} (Base ₹{rt.basePrice.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Check-In</label>
                  <input
                    type="date"
                    value={newCheckIn}
                    onChange={(e) => setNewCheckIn(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={newCheckOut}
                    min={newCheckIn}
                    onChange={(e) => setNewCheckOut(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Adults</label>
                  <select
                    value={newAdults}
                    onChange={(e) => setNewAdults(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Adults</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Deposit Collected (₹)</label>
                  <input
                    type="number"
                    value={newDepositPaid}
                    onChange={(e) => setNewDepositPaid(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setNewResModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}

export default function ReservationsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-400">Loading reservations...</div>}>
      <ReservationsContent />
    </Suspense>
  );
}
