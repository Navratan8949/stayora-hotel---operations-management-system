"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { CreditCard, Printer, DollarSign, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function PaymentsPage() {
  const { folios, currentProperty, currentRole, setActivePrintDoc, addToast } = useStayora();

  const [shiftClosed, setShiftClosed] = useState(false);

  // Collect all payments across all folios
  const allPayments = [];
  folios.forEach((f) => {
    f.payments?.forEach((p) => {
      allPayments.push({
        ...p,
        roomNumber: f.roomNumber,
        guestName: f.guestName,
        folioId: f.id
      });
    });
  });

  const totalCollected = allPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const cardTotal = allPayments
    .filter((p) => p.method?.toLowerCase().includes("card") || p.method?.toLowerCase().includes("amex"))
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const cashTotal = allPayments
    .filter((p) => p.method?.toLowerCase().includes("cash"))
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const upiTotal = allPayments
    .filter((p) => p.method?.toLowerCase().includes("upi"))
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const handleCloseShift = () => {
    setShiftClosed(true);
    addToast("Cashier shift balanced and daily closing logged successfully.", "success");
    setActivePrintDoc({
      title: `Daily Cashier Shift Closing Summary — ${currentProperty.name}`,
      docType: "CASHIER CLOSING",
      data: {
        totalCollected,
        cardTotal,
        cashTotal,
        upiTotal,
        cashier: currentRole,
        closingTime: new Date().toLocaleTimeString()
      }
    });
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Cashiering & Treasury
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Payments Ledger & Shift Settlement
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Audit trail of all front office card terminal, cash drawer, and UPI demo transactions.
            </p>
          </div>

          <button
            onClick={handleCloseShift}
            className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:brightness-110"
          >
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>Generate Shift Closing Report</span>
          </button>
        </div>

        {/* Method Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 uppercase font-semibold block text-[10px]">Total Collections</span>
            <strong className="font-serif text-2xl text-stone-900 block mt-1">
              ₹{totalCollected.toLocaleString()}
            </strong>
            <span className="text-[10px] text-stone-500">{allPayments.length} transactions</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-blue-700 uppercase font-semibold block text-[10px]">Cards & Gateway</span>
            <strong className="font-serif text-2xl text-stone-900 block mt-1">
              ₹{cardTotal.toLocaleString()}
            </strong>
            <span className="text-[10px] text-stone-500">POS terminals & online</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-emerald-700 uppercase font-semibold block text-[10px]">UPI & Digital</span>
            <strong className="font-serif text-2xl text-stone-900 block mt-1">
              ₹{upiTotal.toLocaleString()}
            </strong>
            <span className="text-[10px] text-stone-500">Instant QR settlements</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-amber-700 uppercase font-semibold block text-[10px]">Cash Drawer</span>
            <strong className="font-serif text-2xl text-stone-900 block mt-1">
              ₹{cashTotal.toLocaleString()}
            </strong>
            <span className="text-[10px] text-stone-500">Front desk physical cash</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#faf8f5] text-stone-500 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Transaction Ref</th>
                  <th className="p-4">Guest & Room</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Received By</th>
                  <th className="p-4 text-right">Amount (₹)</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {allPayments.map((p, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="p-4 font-mono font-bold text-[#0d2b24]">{p.transactionRef}</td>
                    <td className="p-4">
                      <strong className="text-stone-900 block">{p.guestName}</strong>
                      <span className="text-stone-500 text-[11px]">Room {p.roomNumber}</span>
                    </td>
                    <td className="p-4 text-stone-600">{p.method}</td>
                    <td className="p-4 text-stone-500">{p.date}</td>
                    <td className="p-4 text-stone-400">{p.receivedBy}</td>
                    <td className="p-4 text-right font-mono font-bold text-emerald-800 text-sm">
                      ₹{Number(p.amount).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() =>
                          setActivePrintDoc({
                            title: `Payment Receipt — ${p.transactionRef}`,
                            docType: "PAYMENT RECEIPT",
                            data: p
                          })
                        }
                        className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                        title="Print receipt"
                      >
                        <Printer className="w-4 h-4 text-[#0d2b24]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PmsLayout>
  );
}
