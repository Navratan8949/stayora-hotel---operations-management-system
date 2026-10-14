"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { Sparkles, BedDouble, Plus, Check, Clock, ShieldCheck, Tag } from "lucide-react";

export default function RatePlansPage() {
  const { currentProperty, roomTypes, ratePlans, setRatePlans, addToast } = useStayora();

  const [newPlanModalOpen, setNewPlanModalOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanMultiplier, setNewPlanMultiplier] = useState("1.10");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [newPlanDeposit, setNewPlanDeposit] = useState("20");

  const propRoomTypes = roomTypes.filter((rt) => rt.propertyId === currentProperty.id);

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newPlanName) return;

    const newPlan = {
      id: `rp_${Date.now()}`,
      name: newPlanName,
      code: newPlanName.slice(0, 4).toUpperCase(),
      description: newPlanDesc,
      priceMultiplier: parseFloat(newPlanMultiplier) || 1,
      breakfastIncluded: false,
      cancellationHours: 48,
      depositRequiredPercent: parseInt(newPlanDeposit, 10) || 20,
      refundable: true
    };

    setRatePlans((prev) => [...prev, newPlan]);
    setNewPlanModalOpen(false);
    addToast(`Rate plan ${newPlanName} created successfully!`, "success");
  };

  return (
    <PmsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Revenue & Tariff Management
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Room Types & Rate Plans
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Configure room inventory tiers, base seasonal tariffs, and cancellation rate plans.
            </p>
          </div>

          <button
            onClick={() => setNewPlanModalOpen(true)}
            className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create Rate Plan</span>
          </button>
        </div>

        {/* Section 1: Rate Plans */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
            Active Rate Plans & Cancellation Tiers ({ratePlans.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ratePlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                      {plan.code}
                    </span>
                    <span className="text-xs font-semibold text-[#0d2b24]">
                      {plan.priceMultiplier}x Base Rate
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Deposit Due:</span>
                    <strong className="text-stone-800">{plan.depositRequiredPercent}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Refundable:</span>
                    <strong className={plan.refundable ? "text-emerald-700" : "text-rose-700"}>
                      {plan.refundable ? "Yes" : "Non-Refundable"}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Room Types Matrix */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
            Configured Room Categories for {currentProperty.name}
          </h2>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#faf8f5] text-stone-500 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-4">Room Type</th>
                    <th className="p-4">Base Capacity</th>
                    <th className="p-4">Size & Bedding</th>
                    <th className="p-4">Base Tariff (INR)</th>
                    <th className="p-4">Breakfast Included Plan</th>
                    <th className="p-4 text-right">Active Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {propRoomTypes.map((rt) => {
                    const bnbPrice = Math.round(rt.basePrice * 1.15);
                    return (
                      <tr key={rt.id} className="hover:bg-stone-50/60">
                        <td className="p-4">
                          <strong className="text-stone-900 font-semibold block text-sm">{rt.name}</strong>
                          <span className="text-[11px] text-[#c5a059] font-medium">{rt.category}</span>
                        </td>
                        <td className="p-4">
                          <span>{rt.maxAdults} Adults, {rt.maxChildren} Children</span>
                        </td>
                        <td className="p-4">
                          <span>{rt.size}</span>
                          <span className="block text-stone-400 text-[10px]">{rt.bedType}</span>
                        </td>
                        <td className="p-4 font-serif font-bold text-stone-900 text-sm">
                          ₹{rt.basePrice.toLocaleString()} <span className="text-[10px] font-normal text-stone-400">/ night</span>
                        </td>
                        <td className="p-4 font-serif text-stone-700">
                          ₹{bnbPrice.toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px] uppercase">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* New Rate Plan Modal */}
      {newPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Create New Rate Plan
            </h3>
            <form onSubmit={handleCreatePlan} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Plan Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monsoon Special Retreat"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Price Multiplier (e.g. 1.20 = +20%)</label>
                <input
                  type="number"
                  step="0.05"
                  value={newPlanMultiplier}
                  onChange={(e) => setNewPlanMultiplier(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Deposit Requirement (%)</label>
                <input
                  type="number"
                  value={newPlanDeposit}
                  onChange={(e) => setNewPlanDeposit(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Inclusions and cancellation terms"
                  value={newPlanDesc}
                  onChange={(e) => setNewPlanDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewPlanModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
