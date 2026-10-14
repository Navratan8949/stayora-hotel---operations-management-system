"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { Users, Plus, Printer, Clock, CheckCircle2, Phone, ShieldCheck } from "lucide-react";

export default function StaffRosterPage() {
  const { staff, setStaff, currentProperty, setActivePrintDoc, addToast } = useStayora();

  const [selectedDept, setSelectedDept] = useState("All");
  const [newStaffModalOpen, setNewStaffModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("Front Desk");
  const [newShift, setNewShift] = useState("Morning (07:00 - 15:30)");
  const [newPhone, setNewPhone] = useState("");

  const departments = ["All", ...new Set(staff.map((s) => s.department))];

  const filteredStaff = staff.filter((s) =>
    selectedDept === "All" ? true : s.department === selectedDept
  );

  const toggleDutyStatus = (id) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = s.status === "On Duty" ? "Scheduled" : "On Duty";
          addToast(`${s.name} marked ${next}.`, "info");
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newName || !newRole) return;

    const newMember = {
      id: `stf_${Date.now()}`,
      name: newName,
      role: newRole,
      department: newDept,
      phone: newPhone || "+91 98290 11999",
      shift: newShift,
      status: "On Duty"
    };

    setStaff((prev) => [...prev, newMember]);
    setNewStaffModalOpen(false);
    setNewName("");
    setNewRole("");
    addToast(`${newName} added to staff roster.`, "success");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Human Resources & Operations
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Staff Directory & Duty Roster
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Departmental employee directory, shift rosters, and live duty attendance simulation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewStaffModalOpen(true)}
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Staff Member</span>
            </button>
            <button
              onClick={() =>
                setActivePrintDoc({
                  title: `Hotel Operational Staff Roster — ${currentProperty.name}`,
                  docType: "DUTY ROSTER",
                  data: {
                    staff: filteredStaff
                  },
                  content: (
                    <table className="w-full text-left text-xs border border-stone-200">
                      <thead className="bg-stone-100">
                        <tr>
                          <th className="p-2">Employee Name</th>
                          <th className="p-2">Designation</th>
                          <th className="p-2">Department</th>
                          <th className="p-2">Shift Schedule</th>
                          <th className="p-2">Current Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredStaff.map((s) => (
                          <tr key={s.id}>
                            <td className="p-2 font-bold">{s.name}</td>
                            <td className="p-2">{s.role}</td>
                            <td className="p-2">{s.department}</td>
                            <td className="p-2">{s.shift}</td>
                            <td className="p-2">{s.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                })
              }
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
            >
              <Printer className="w-4 h-4 text-[#0d2b24]" />
              <span>Print Duty Roster</span>
            </button>
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl font-medium shrink-0 transition-all ${
                selectedDept === dept
                  ? "bg-[#0d2b24] text-[#dfc285] shadow"
                  : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#faf8f5] text-stone-500 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Staff Member</th>
                  <th className="p-4">Designation & Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Duty Shift</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4">Duty Attendance</th>
                  <th className="p-4 text-right">Toggle Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-stone-50/50">
                    <td className="p-4 font-bold text-stone-900 text-sm">
                      {member.name}
                    </td>
                    <td className="p-4 text-stone-700 font-medium">
                      {member.role}
                    </td>
                    <td className="p-4 text-[#c5a059] font-bold">
                      {member.department}
                    </td>
                    <td className="p-4 text-stone-600">
                      {member.shift}
                    </td>
                    <td className="p-4 font-mono text-stone-500">
                      {member.phone}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          member.status === "On Duty"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleDutyStatus(member.id)}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-medium"
                      >
                        {member.status === "On Duty" ? "Set Scheduled" : "Clock In"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Staff Modal */}
      {newStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Add Employee to Roster
            </h3>
            <form onSubmit={handleCreateStaff} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Employee Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meenakshi Soni"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Designation / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Concierge Lead"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Front Desk">Front Desk</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="F&B Service">F&B Service</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Shift</label>
                <select
                  value={newShift}
                  onChange={(e) => setNewShift(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Morning (07:00 - 15:30)">Morning (07:00 - 15:30)</option>
                  <option value="Evening (15:00 - 23:30)">Evening (15:00 - 23:30)</option>
                  <option value="Night (23:00 - 07:30)">Night (23:00 - 07:30)</option>
                  <option value="General (09:30 - 18:00)">General (09:30 - 18:00)</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98290 11999"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewStaffModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
