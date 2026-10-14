"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { Briefcase, Plus, CheckCircle, PackageCheck, Printer, Users, Building } from "lucide-react";

export default function PurchasingPage() {
  const {
    purchaseOrders,
    setPurchaseOrders,
    suppliers,
    receivePurchaseOrder,
    setActivePrintDoc,
    addToast
  } = useStayora();

  const [activeTab, setActiveTab] = useState("orders"); // "orders" or "suppliers"
  const [newPoModalOpen, setNewPoModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || "");
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("10");
  const [itemCost, setItemCost] = useState("450");
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [targetPo, setTargetPo] = useState(null);
  const [receiveQtyInput, setReceiveQtyInput] = useState("");

  const handleCreatePo = (e) => {
    e.preventDefault();
    if (!itemName) return;

    const supplierObj = suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];
    const qty = parseInt(itemQty, 10);
    const cost = parseFloat(itemCost);
    const total = qty * cost;

    const newPO = {
      id: `po_${Date.now()}`,
      poNumber: `PO-2026-0${Math.floor(100 + Math.random() * 900)}`,
      supplierId: supplierObj.id,
      supplierName: supplierObj.name,
      orderDate: new Date().toISOString().split("T")[0],
      expectedDelivery: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
      status: "Ordered",
      items: [
        { itemName, quantity: qty, unit: "units", unitCost: cost, total }
      ],
      totalAmount: total,
      receivedQty: 0
    };

    setPurchaseOrders((prev) => [newPO, ...prev]);
    setNewPoModalOpen(false);
    setItemName("");
    addToast(`Purchase Order ${newPO.poNumber} created and dispatched to ${supplierObj.name}.`, "success");
  };

  const handleReceiveGoods = (e) => {
    e.preventDefault();
    if (!targetPo || !receiveQtyInput) return;
    receivePurchaseOrder(targetPo.id, receiveQtyInput);
    setReceiveModalOpen(false);
    setReceiveQtyInput("");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Procurement & Vendor Relations
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Purchase Orders & Goods Receipt
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Issue POs to certified suppliers and receive deliveries into live hotel inventory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewPoModalOpen(true)}
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Raise Purchase Order</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-stone-200 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "orders" ? "bg-[#0d2b24] text-[#dfc285]" : "text-stone-600 bg-white"
            }`}
          >
            Purchase Orders ({purchaseOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("suppliers")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "suppliers" ? "bg-[#0d2b24] text-[#dfc285]" : "text-stone-600 bg-white"
            }`}
          >
            Vendor Directory ({suppliers.length})
          </button>
        </div>

        {/* Orders Table */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#faf8f5] text-stone-500 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-4">PO Number</th>
                    <th className="p-4">Vendor Supplier</th>
                    <th className="p-4">Ordered Items</th>
                    <th className="p-4">Delivery Status</th>
                    <th className="p-4">Total Value</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {purchaseOrders.map((po) => {
                    const totalQty = po.items.reduce((acc, i) => acc + i.quantity, 0);
                    const isFullyReceived = po.status === "Received";

                    return (
                      <tr key={po.id} className="hover:bg-stone-50/50">
                        <td className="p-4 font-mono font-bold text-stone-900 text-sm">
                          {po.poNumber}
                          <span className="block text-[10px] font-sans font-normal text-stone-400">
                            Ordered: {po.orderDate}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-stone-800">
                          {po.supplierName}
                        </td>
                        <td className="p-4">
                          {po.items.map((it, idx) => (
                            <span key={idx} className="block text-stone-700">
                              {it.quantity} {it.unit} • {it.itemName}
                            </span>
                          ))}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              isFullyReceived ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {po.status} ({po.receivedQty || 0} / {totalQty} received)
                          </span>
                        </td>
                        <td className="p-4 font-serif font-bold text-stone-900 text-sm">
                          ₹{po.totalAmount.toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {!isFullyReceived && (
                              <button
                                onClick={() => {
                                  setTargetPo(po);
                                  setReceiveQtyInput(String(totalQty - (po.receivedQty || 0)));
                                  setReceiveModalOpen(true);
                                }}
                                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                              >
                                <PackageCheck className="w-3.5 h-3.5" />
                                <span>Receive Goods</span>
                              </button>
                            )}

                            <button
                              onClick={() =>
                                setActivePrintDoc({
                                  title: `Official Purchase Order — ${po.poNumber}`,
                                  docType: "PURCHASE ORDER",
                                  data: po
                                })
                              }
                              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                              title="Print Purchase Order"
                            >
                              <Printer className="w-4 h-4 text-[#0d2b24]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Suppliers Directory */}
        {activeTab === "suppliers" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suppliers.map((sup) => (
              <div key={sup.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3 text-xs">
                <div className="pb-2 border-b border-stone-100">
                  <h4 className="font-serif text-lg font-bold text-stone-900">{sup.name}</h4>
                  <span className="text-[11px] text-[#c5a059] font-medium">{sup.categories}</span>
                </div>
                <p><strong>Contact Person:</strong> {sup.contact}</p>
                <p><strong>Email:</strong> {sup.email}</p>
                <p><strong>Phone:</strong> {sup.phone}</p>
                <p><strong>Payment Terms:</strong> {sup.paymentTerms}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receive Goods Modal */}
      {receiveModalOpen && targetPo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Goods Receipt & Stock Inward
            </h3>
            <p className="text-stone-500">
              Receiving shipment for <strong>{targetPo.poNumber}</strong> ({targetPo.supplierName}).
            </p>

            <form onSubmit={handleReceiveGoods} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Quantity Received</label>
                <input
                  type="number"
                  required
                  value={receiveQtyInput}
                  onChange={(e) => setReceiveQtyInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                />
                <span className="text-[10px] text-stone-400 mt-0.5 block">
                  Entering this receipt will automatically increase current inventory stock.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReceiveModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider"
                >
                  Confirm Goods Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New PO Modal */}
      {newPoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Raise Purchase Order
            </h3>
            <form onSubmit={handleCreatePo} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Select Supplier *</label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-semibold"
                >
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Item Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kama Ayurveda Shampoo bottles"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={itemQty}
                    onChange={(e) => setItemQty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                  />
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Unit Cost (₹)</label>
                  <input
                    type="number"
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewPoModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Issue PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
