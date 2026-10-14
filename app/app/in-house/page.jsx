"use client";

import React, { useState } from "react";
import Link from "next/link";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Users, 
  BedDouble, 
  Receipt, 
  CreditCard, 
  Utensils, 
  Plus, 
  Printer, 
  CheckCircle,
  ExternalLink 
} from "lucide-react";

export default function InHouseGuestsPage() {
  const { 
    currentProperty, 
    reservations, 
    folios, 
    rooms, 
    checkOutGuest, 
    addFolioCharge, 
    recordFolioPayment, 
    setActivePrintDoc,
    addToast 
  } = useStayora();

  // Add Charge Modal
  const [chargeModalOpen, setChargeModalOpen] = useState(false);
  const [targetFolioId, setTargetFolioId] = useState(null);
  const [chargeDesc, setChargeDesc] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [chargeCat, setChargeCat] = useState("Room Service");

  // In-House list
  const inHouseList = reservations.filter(
    (r) => r.propertyId === currentProperty.id && r.status === "Checked In"
  );

  const handlePostCharge = (e) => {
    e.preventDefault();
    if (!targetFolioId || !chargeDesc || !chargeAmount) return;
    addFolioCharge(targetFolioId, {
      description: chargeDesc,
      amount: chargeAmount,
      category: chargeCat
    });
    setChargeModalOpen(false);
    setChargeDesc("");
    setChargeAmount("");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Guest Operations
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              In-House Guests ({inHouseList.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Active residential stays, running folios, room service posting, and departure settlement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/walk-in"
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Walk-In Registration</span>
            </Link>
          </div>
        </div>

        {/* In-House Grid */}
        {inHouseList.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center text-stone-400">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-stone-700">No guests currently in-house.</p>
            <p className="text-xs mt-1">Check in today&rsquo;s arrivals from the Reservations tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inHouseList.map((res) => {
              const folio = folios.find((f) => f.reservationId === res.id);
              const roomObj = rooms.find((r) => r.id === res.assignedRoomId);

              return (
                <div
                  key={res.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Room & Key Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl font-bold text-[#0d2b24] bg-stone-100 px-3 py-1 rounded-xl">
                          Room {res.roomNumber}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          Occupied
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">
                        {roomObj?.keyCardCode || "KC-STD-01"}
                      </span>
                    </div>

                    {/* Guest Name & Specs */}
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                      {res.guestName}
                    </h3>
                    <p className="text-xs text-stone-500 mb-4">
                      {res.guestEmail} • {res.guestPhone}
                    </p>

                    <div className="space-y-1.5 text-xs text-stone-600 bg-[#faf8f5] p-3.5 rounded-2xl mb-4 border border-stone-100">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Stay Window:</span>
                        <span className="font-medium text-stone-800">{res.checkIn} &rarr; {res.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Accommodation:</span>
                        <span className="font-medium text-stone-800">{res.roomTypeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Guests:</span>
                        <span className="font-medium text-stone-800">{res.adults} Adults, {res.children} Children</span>
                      </div>
                    </div>

                    {/* Folio Ledger Snapshot */}
                    {folio && (
                      <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl bg-stone-50 border border-stone-200 mb-4">
                        <div>
                          <span className="text-[10px] text-stone-400 block">Total</span>
                          <strong className="text-stone-900">₹{folio.totalCharges.toLocaleString()}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-600 block">Paid</span>
                          <strong className="text-emerald-800">₹{folio.totalPaid.toLocaleString()}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-amber-600 block">Due</span>
                          <strong className="text-amber-800">₹{folio.balanceDue.toLocaleString()}</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (folio) {
                            setTargetFolioId(folio.id);
                            setChargeModalOpen(true);
                          }
                        }}
                        className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Post Charge</span>
                      </button>

                      <Link
                        href={`/app/folios?resId=${res.id}`}
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center"
                        title="View Complete Folio"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() =>
                          setActivePrintDoc({
                            title: `Guest Registration Form — Room ${res.roomNumber}`,
                            docType: "REGISTRATION CARD",
                            data: res
                          })
                        }
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                        title="Print Registration Form"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => checkOutGuest(res.id)}
                      className="w-full py-2.5 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                    >
                      Settle & Complete Checkout &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Post Charge Modal */}
      {chargeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Post Room Service / Service Charge
            </h3>
            <form onSubmit={handlePostCharge} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sheesh Mahal Wine Bottle or Laundry"
                  value={chargeDesc}
                  onChange={(e) => setChargeDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Category</label>
                <select
                  value={chargeCat}
                  onChange={(e) => setChargeCat(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Restaurant">Restaurant / Dining</option>
                  <option value="Room Service">In-Room Dining</option>
                  <option value="Spa">Ayurvedic Spa</option>
                  <option value="Laundry">Laundry & Dry Clean</option>
                  <option value="Transfer">Chauffeur Transfer</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1850"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setChargeModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Post to Folio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
