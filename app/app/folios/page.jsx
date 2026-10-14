"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Receipt, 
  Search, 
  Plus, 
  CreditCard, 
  Printer, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

function FoliosContent() {
  const searchParams = useSearchParams();
  const { folios, addFolioCharge, recordFolioPayment, setActivePrintDoc, addToast } = useStayora();

  const initialFolio = searchParams.get("folio") || "";
  const initialResId = searchParams.get("resId") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolioId, setSelectedFolioId] = useState(
    folios.find(f => f.id === initialFolio || f.reservationId === initialResId)?.id || folios[0]?.id
  );

  // Modals
  const [chargeModalOpen, setChargeModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // New charge inputs
  const [chargeDesc, setChargeDesc] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [chargeCategory, setChargeCategory] = useState("Dining");

  // New payment inputs
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Credit Card (Demo)");

  const currentFolio = folios.find((f) => f.id === selectedFolioId) || folios[0];

  const handlePostCharge = (e) => {
    e.preventDefault();
    if (!chargeDesc || !chargeAmount) return;
    addFolioCharge(currentFolio.id, {
      description: chargeDesc,
      amount: chargeAmount,
      category: chargeCategory
    });
    setChargeModalOpen(false);
    setChargeDesc("");
    setChargeAmount("");
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!payAmount) return;
    recordFolioPayment(currentFolio.id, {
      amount: payAmount,
      method: payMethod
    });
    setPaymentModalOpen(false);
    setPayAmount("");
  };

  const filteredFolios = folios.filter((f) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.roomNumber.toLowerCase().includes(q) ||
      f.guestName.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q)
    );
  });

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Financial Ledger & Billing
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Guest Folios & Invoicing
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Itemized room accounts, restaurant charges, deposits, and official invoice generation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Folios List Selector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search room or guest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredFolios.map((f) => {
                const isSelected = f.id === currentFolio?.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFolioId(f.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#0d2b24] bg-stone-50 shadow-md ring-2 ring-[#0d2b24]/20"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-bold text-stone-900">
                        Room {f.roomNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          f.balanceDue <= 0 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {f.balanceDue <= 0 ? "Settled" : "Open"}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-stone-800 truncate">{f.guestName}</p>

                    <div className="flex justify-between items-center text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-100">
                      <span>Charges: ₹{f.totalCharges.toLocaleString()}</span>
                      <span className={f.balanceDue > 0 ? "text-amber-800 font-bold" : "text-emerald-700"}>
                        {f.balanceDue > 0 ? `Due: ₹${f.balanceDue.toLocaleString()}` : "Fully Paid"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Folio Ledger Detail (8 cols) */}
          {currentFolio && (
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
              {/* Folio Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xl font-bold text-[#0d2b24]">
                      Folio: Room {currentFolio.roomNumber}
                    </span>
                    <span className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-mono">
                      {currentFolio.id}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Registered to <strong>{currentFolio.guestName}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChargeModalOpen(true)}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Charge</span>
                  </button>

                  <button
                    onClick={() => setPaymentModalOpen(true)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Record Payment</span>
                  </button>

                  <button
                    onClick={() =>
                      setActivePrintDoc({
                        title: `Official Guest Folio Statement — Room ${currentFolio.roomNumber}`,
                        docType: "FINAL INVOICE",
                        data: currentFolio
                      })
                    }
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs"
                    title="Print Official Invoice"
                  >
                    <Printer className="w-4 h-4 text-[#0d2b24]" />
                  </button>
                </div>
              </div>

              {/* Ledger Summary Cards */}
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Total Charges</span>
                  <strong className="font-serif text-2xl text-stone-900 block mt-1">
                    ₹{currentFolio.totalCharges.toLocaleString()}
                  </strong>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 uppercase font-semibold block">Payments Recorded</span>
                  <strong className="font-serif text-2xl text-emerald-900 block mt-1">
                    ₹{currentFolio.totalPaid.toLocaleString()}
                  </strong>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <span className="text-[10px] text-amber-700 uppercase font-semibold block">Balance Outstanding</span>
                  <strong className="font-serif text-2xl text-amber-900 block mt-1">
                    ₹{currentFolio.balanceDue.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Itemized Charges Table */}
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Itemized Charges Ledger
                </h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-stone-700">
                    <thead className="bg-[#faf8f5] text-stone-500 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="p-3">Description</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Posted By</th>
                        <th className="p-3 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {currentFolio.charges.map((chg) => (
                        <tr key={chg.id} className="hover:bg-stone-50/50">
                          <td className="p-3 font-medium text-stone-900">{chg.description}</td>
                          <td className="p-3 text-stone-500">{chg.category}</td>
                          <td className="p-3 text-stone-500">{chg.date}</td>
                          <td className="p-3 text-stone-400">{chg.postedBy}</td>
                          <td className="p-3 text-right font-mono font-medium text-stone-900">
                            ₹{Number(chg.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payments Ledger */}
              <div className="space-y-2 pt-2">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Payments & Settlements
                </h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-stone-700">
                    <thead className="bg-[#faf8f5] text-stone-500 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="p-3">Reference</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Received By</th>
                        <th className="p-3 text-right">Amount Paid (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {currentFolio.payments.map((p) => (
                        <tr key={p.id}>
                          <td className="p-3 font-mono font-bold text-stone-900">{p.transactionRef}</td>
                          <td className="p-3 text-stone-600">{p.method}</td>
                          <td className="p-3 text-stone-500">{p.date}</td>
                          <td className="p-3 text-stone-400">{p.receivedBy}</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-700">
                            ₹{Number(p.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Charge Modal */}
      {chargeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Add Charge to Room {currentFolio.roomNumber}
            </h3>
            <form onSubmit={handlePostCharge} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minibar Consumption"
                  value={chargeDesc}
                  onChange={(e) => setChargeDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Category</label>
                <select
                  value={chargeCategory}
                  onChange={(e) => setChargeCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Dining">Dining / Room Service</option>
                  <option value="Minibar">Minibar Consumption</option>
                  <option value="Spa">Ayurvedic Spa</option>
                  <option value="Laundry">Laundry Services</option>
                  <option value="Transfer">Chauffeur Transport</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1200"
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
                  Post Charge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Record Payment on Room {currentFolio.roomNumber}
            </h3>
            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Credit Card (Demo)">Credit Card (Demo POS)</option>
                  <option value="Cash (Demo)">Cash (Reception Drawer)</option>
                  <option value="UPI (Demo)">UPI Instant Transfer</option>
                  <option value="Bank Wire">Bank Wire Transfer</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder={`Current balance: ${currentFolio.balanceDue}`}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}

export default function GuestFoliosPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-400">Loading folios...</div>}>
      <FoliosContent />
    </Suspense>
  );
}
