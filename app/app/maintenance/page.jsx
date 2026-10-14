"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Wrench, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Printer, 
  ShieldAlert,
  Building 
} from "lucide-react";

export default function MaintenancePage() {
  const {
    currentProperty,
    rooms,
    maintenanceRequests,
    createMaintenanceRequest,
    resolveMaintenance,
    setActivePrintDoc,
    addToast
  } = useStayora();

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [roomNum, setRoomNum] = useState("");
  const [category, setCategory] = useState("HVAC / Air Conditioning");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [assignedStaff, setAssignedStaff] = useState("Vikram Electrician");
  const [blockOutOfService, setBlockOutOfService] = useState(true);
  const [estCost, setEstCost] = useState("3500");

  const propRequests = maintenanceRequests.filter(
    (m) => m.propertyId === currentProperty.id
  );

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!description) return;

    createMaintenanceRequest({
      propertyId: currentProperty.id,
      roomNumber: roomNum || "Facility Area",
      category,
      description,
      priority,
      reportedBy: "Front Desk Operations",
      assignedTo: assignedStaff,
      targetCompletion: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      estimatedCost: Number(estCost) || 0,
      outOfServiceBlocked: blockOutOfService
    });

    setNewModalOpen(false);
    setDescription("");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Engineering & Maintenance
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Work Orders & Facility Maintenance
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Track engineering repairs, out-of-service room blocks, and maintenance cost expenditures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewModalOpen(true)}
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Log Maintenance Request</span>
            </button>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#faf8f5] text-stone-500 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Location / Room</th>
                  <th className="p-4">Category & Description</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Assigned Technician</th>
                  <th className="p-4">Out of Service Block</th>
                  <th className="p-4">Status & Cost</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {propRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-400">
                      No maintenance issues reported for this property.
                    </td>
                  </tr>
                ) : (
                  propRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-stone-50/60">
                      <td className="p-4 font-mono font-bold text-stone-900 text-sm">
                        {req.roomNumber}
                      </td>
                      <td className="p-4 max-w-xs">
                        <strong className="block text-stone-900">{req.category}</strong>
                        <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2">
                          {req.description}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            req.priority === "High"
                              ? "bg-rose-100 text-rose-800"
                              : req.priority === "Medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          {req.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-stone-800">{req.assignedTo}</span>
                        <span className="text-[10px] text-stone-400 block mt-0.5">Rep: {req.reportedBy}</span>
                      </td>
                      <td className="p-4">
                        {req.outOfServiceBlocked ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg">
                            <ShieldAlert className="w-3.5 h-3.5" /> Room Blocked
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[11px]">Normal Op</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-semibold text-xs ${
                            req.status === "Resolved" ? "text-emerald-700" : "text-amber-700"
                          }`}
                        >
                          {req.status}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono block">
                          Est: ₹{req.estimatedCost?.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {req.status !== "Resolved" && (
                            <button
                              onClick={() => resolveMaintenance(req.id, req.estimatedCost)}
                              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[11px] font-bold transition-all shadow-sm"
                            >
                              Resolve & Release
                            </button>
                          )}
                          <button
                            onClick={() =>
                              setActivePrintDoc({
                                title: `Engineering Work Order — ${req.roomNumber}`,
                                docType: "WORK ORDER",
                                data: req
                              })
                            }
                            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
                            title="Print Work Order"
                          >
                            <Printer className="w-4 h-4 text-[#0d2b24]" />
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

      {/* New Maintenance Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Log Maintenance Request
            </h3>
            <form onSubmit={handleCreateRequest} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Room or Facility Location *</label>
                <select
                  value={roomNum}
                  onChange={(e) => setRoomNum(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-bold"
                >
                  <option value="">General Facility / Grounds</option>
                  {rooms.filter(r => r.propertyId === currentProperty.id).map(r => (
                    <option key={r.id} value={r.number}>Room {r.number}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="HVAC / Air Conditioning">HVAC / Air Conditioning</option>
                  <option value="Plumbing & Bathroom">Plumbing & Bathroom</option>
                  <option value="Electrical & Lighting">Electrical & Lighting</option>
                  <option value="Carpentry & Heritage Woodwork">Carpentry & Heritage Woodwork</option>
                  <option value="Audio / Visual / Wi-Fi">Audio / Visual / Wi-Fi</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe failure symptoms and needed replacement parts..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <option value="High">High (Immediate)</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-stone-700 block mb-1">Estimated Cost (₹)</label>
                  <input
                    type="number"
                    value={estCost}
                    onChange={(e) => setEstCost(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-rose-800 pt-1">
                <input
                  type="checkbox"
                  checked={blockOutOfService}
                  onChange={(e) => setBlockOutOfService(e.target.checked)}
                  className="w-4 h-4 accent-rose-700 rounded"
                />
                <span>Block Room Out of Service (Prevents Bookings)</span>
              </label>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Log Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
