"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Settings, 
  RotateCcw, 
  Download, 
  Upload, 
  ShieldCheck, 
  Building2, 
  Check, 
  AlertTriangle 
} from "lucide-react";

export default function SettingsAdminPage() {
  const {
    currentProperty,
    properties,
    setProperties,
    currentRole,
    setCurrentRole,
    activityLogs,
    resetDemoData,
    exportDemoDataJSON,
    importDemoDataJSON,
    addToast
  } = useStayora();

  const [propName, setPropName] = useState(currentProperty.name);
  const [propAddress, setPropAddress] = useState(currentProperty.address);
  const [propPhone, setPropPhone] = useState(currentProperty.phone);
  const [propTax, setPropTax] = useState(currentProperty.taxRate || 12);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importModalOpen, setImportModalOpen] = useState(false);

  const roles = [
    { title: "Hotel Manager", desc: "Full operational overview: reservations, front desk, housekeeping & staff." },
    { title: "Front Desk / Receptionist", desc: "Arrivals, departures, key card allocation & walk-in check-in." },
    { title: "Owner / Super Admin", desc: "Executive dashboards, financial audit, and multi-property settings." },
    { title: "Housekeeping Supervisor", desc: "Room status board, cleaning task assignments & quality inspections." },
    { title: "Accountant / Cashier", desc: "Folios, invoices, payments, daily closing and financial reporting." },
    { title: "Restaurant Manager", desc: "POS tables, kitchen tickets (KOT), and room service settlements." },
    { title: "Maintenance Staff", desc: "Engineering issues, work orders & room out-of-service blocking." }
  ];

  const handleSavePropertySettings = (e) => {
    e.preventDefault();
    setProperties((prev) =>
      prev.map((p) =>
        p.id === currentProperty.id
          ? {
              ...p,
              name: propName,
              address: propAddress,
              phone: propPhone,
              taxRate: Number(propTax)
            }
          : p
      )
    );
    addToast(`Property settings updated for ${propName}!`, "success");
  };

  const handleExecuteImport = () => {
    if (!importText.trim()) return;
    const ok = importDemoDataJSON(importText);
    if (ok) {
      setImportModalOpen(false);
      setImportText("");
    }
  };

  return (
    <PmsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              System Administration
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Property Settings & Demo Management
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Simulate operational user roles, update property policies, or export/reset demonstration records.
            </p>
          </div>
        </div>

        {/* Section 1: Role Simulation */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
                Simulated User Role Switcher
              </h2>
              <p className="text-xs text-stone-500">
                Current active session: <strong className="text-stone-900">{currentRole}</strong>
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
              Demo Simulation Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {roles.map((r) => {
              const isActive = r.title === currentRole;
              return (
                <div
                  key={r.title}
                  onClick={() => {
                    setCurrentRole(r.title);
                    addToast(`Active role switched to: ${r.title}`, "info");
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isActive
                      ? "border-[#0d2b24] bg-stone-50 shadow-md ring-2 ring-[#0d2b24]/20"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-sm font-bold text-stone-900">{r.title}</strong>
                    {isActive && <Check className="w-4 h-4 text-[#c5a059]" />}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Property Settings Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
            Property Configuration ({currentProperty.name})
          </h2>

          <form onSubmit={handleSavePropertySettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-medium text-stone-700 block mb-1">Property Name</label>
              <input
                type="text"
                value={propName}
                onChange={(e) => setPropName(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
              />
            </div>

            <div>
              <label className="font-medium text-stone-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={propPhone}
                onChange={(e) => setPropPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-medium text-stone-700 block mb-1">Address</label>
              <input
                type="text"
                value={propAddress}
                onChange={(e) => setPropAddress(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
              />
            </div>

            <div>
              <label className="font-medium text-stone-700 block mb-1">Tax Rate (Illustrative GST %)</label>
              <input
                type="number"
                value={propTax}
                onChange={(e) => setPropTax(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-stone-900"
              />
            </div>

            <div>
              <label className="font-medium text-stone-700 block mb-1">Timezone</label>
              <input
                type="text"
                disabled
                value={currentProperty.timezone}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-100 text-stone-500 cursor-not-allowed"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider shadow-md hover:brightness-110"
              >
                Save Property Settings
              </button>
            </div>
          </form>
        </div>

        {/* Section 3: Demo State Management & Persistence */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
            Demonstration State & localStorage Backup
          </h2>
          <p className="text-xs text-stone-500">
            Export the current demo state to a JSON file, import a previously saved scenario, or reset all entities to initial pristine seed values.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={exportDemoDataJSON}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
            >
              <Download className="w-4 h-4 text-[#0d2b24]" />
              <span>Export State (JSON)</span>
            </button>

            <button
              onClick={() => setImportModalOpen(true)}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
            >
              <Upload className="w-4 h-4 text-[#0d2b24]" />
              <span>Import State (JSON)</span>
            </button>

            <button
              onClick={() => setResetConfirmOpen(true)}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2 border border-rose-200"
            >
              <RotateCcw className="w-4 h-4 text-rose-700" />
              <span>Reset to Pristine Seed Data</span>
            </button>
          </div>
        </div>

        {/* Section 4: Audit Activity Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
            System Activity Audit Trail ({activityLogs.length} Events)
          </h2>
          <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-stone-100 text-xs">
            {activityLogs.map((log) => (
              <div key={log.id} className="pt-2 flex justify-between items-start">
                <div>
                  <strong className="text-stone-900 block font-semibold">
                    {log.action} &mdash; {log.target}
                  </strong>
                  <p className="text-stone-500 text-[11px]">{log.details}</p>
                </div>
                <div className="text-right text-[10px] text-stone-400 shrink-0">
                  <span className="font-medium text-stone-600 block">{log.user}</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-900 text-center">
              Confirm Demo State Reset
            </h3>
            <p className="text-stone-600 text-center leading-relaxed">
              This will clear all changes in localStorage and restore the pristine initial reservations, rooms, orders, and folios.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setResetConfirmOpen(false);
                }}
                className="px-5 py-2 bg-rose-700 text-white rounded-xl font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import JSON Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Paste Demo State JSON
            </h3>
            <textarea
              rows={6}
              placeholder="Paste backup JSON payload..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-[11px]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteImport}
                className="px-5 py-2 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
              >
                Restore JSON State
              </button>
            </div>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
