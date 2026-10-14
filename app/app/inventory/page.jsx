"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { Package, AlertCircle, Plus, Minus, Printer, Search, ArrowRight } from "lucide-react";

export default function InventoryPage() {
  const { inventoryItems, adjustInventoryStock, setActivePrintDoc, addToast } = useStayora();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustReason, setAdjustReason] = useState("Room Turndown Consumption");

  const categories = ["All", ...new Set(inventoryItems.map((i) => i.category))];

  const filteredItems = inventoryItems.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const totalValuation = inventoryItems.reduce(
    (sum, i) => sum + i.currentStock * i.unitCost,
    0
  );

  const lowStockCount = inventoryItems.filter((i) => i.currentStock <= i.minStock).length;

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (!targetItem || !adjustQty) return;
    adjustInventoryStock(targetItem.id, adjustQty, adjustReason);
    setAdjustModalOpen(false);
    setAdjustQty("");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Procurement & Materials
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Operational Inventory & Stock
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Live supplies tracking for housekeeping amenities, royal kitchen pantry, and guest linen.
            </p>
          </div>

          <button
            onClick={() =>
              setActivePrintDoc({
                title: "Complete Hotel Inventory Valuation Statement",
                docType: "INVENTORY AUDIT",
                data: {
                  items: inventoryItems,
                  totalValuation
                }
              })
            }
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
          >
            <Printer className="w-4 h-4 text-[#0d2b24]" />
            <span>Print Stock Audit</span>
          </button>
        </div>

        {/* Inventory KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 uppercase font-semibold block text-[10px]">Tracked SKUs</span>
            <strong className="font-serif text-2xl text-stone-900 block mt-1">{inventoryItems.length} Items</strong>
            <span className="text-stone-500 text-[10px]">Active store categories</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 uppercase font-semibold block text-[10px]">Total Valuation</span>
            <strong className="font-serif text-2xl text-emerald-900 block mt-1">
              ₹{totalValuation.toLocaleString()}
            </strong>
            <span className="text-stone-500 text-[10px]">At average cost basis</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-amber-700 uppercase font-semibold block text-[10px]">Low Stock Warnings</span>
            <strong className="font-serif text-2xl text-amber-800 block mt-1">{lowStockCount} Items</strong>
            <span className="text-stone-500 text-[10px]">Below minimum threshold</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search items, storage locations, or vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 ${
                  selectedCategory === c ? "bg-[#0d2b24] text-[#dfc285]" : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Items Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#faf8f5] text-stone-500 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Category & Location</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Min. Threshold</th>
                  <th className="p-4">Unit Cost</th>
                  <th className="p-4">Supplier</th>
                  <th className="p-4 text-right">Stock Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredItems.map((item) => {
                  const isLow = item.currentStock <= item.minStock;

                  return (
                    <tr key={item.id} className="hover:bg-stone-50/50">
                      <td className="p-4">
                        <strong className="text-stone-900 block font-semibold">{item.name}</strong>
                        {isLow && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded mt-0.5">
                            <AlertCircle className="w-3 h-3" /> Low Stock
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-stone-700 block">{item.category}</span>
                        <span className="text-[10px] text-stone-400">{item.location}</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-sm text-stone-900">
                        {item.currentStock} {item.unit}
                      </td>
                      <td className="p-4 text-stone-500">
                        {item.minStock} {item.unit}
                      </td>
                      <td className="p-4 font-mono font-medium text-stone-700">
                        ₹{item.unitCost}
                      </td>
                      <td className="p-4 text-stone-600">
                        {item.supplier}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setTargetItem(item);
                            setAdjustModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-medium transition-colors"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustModalOpen && targetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Adjust Stock: {targetItem.name}
            </h3>
            <p className="text-stone-500">
              Current stock on record: <strong>{targetItem.currentStock} {targetItem.unit}</strong>.
            </p>

            <form onSubmit={handleAdjustSubmit} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Quantity Adjustment (positive or negative)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. -5 (for consumption) or 20 (for addition)"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Reason for Movement</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Room Turndown Consumption">Room Turndown Consumption</option>
                  <option value="Kitchen Preparation Usage">Kitchen Preparation Usage</option>
                  <option value="Damaged / Spoiled Wastage">Damaged / Spoiled Wastage</option>
                  <option value="Physical Inventory Audit Count">Physical Inventory Audit Count</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Save Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
