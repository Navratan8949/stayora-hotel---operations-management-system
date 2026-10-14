"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { Clock, Plus, CheckCircle2, AlertTriangle, ShieldCheck, Search, Tag } from "lucide-react";

export default function GuestServicesPage() {
  const { guestRequests, setGuestRequests, currentProperty, addToast } = useStayora();

  const [activeTab, setActiveTab] = useState("requests");
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [reqRoom, setReqRoom] = useState("");
  const [reqGuest, setReqGuest] = useState("");
  const [reqCategory, setReqCategory] = useState("Extra Towels / Linen");
  const [reqDesc, setReqDesc] = useState("");
  const [reqPriority, setReqPriority] = useState("Medium");

  // Sample Complaints & Lost & Found seed
  const [complaints, setComplaints] = useState([
    { id: "comp_1", room: "102", guest: "Ananya Sharma", category: "Noise", description: "Courtyard fountain pump noise late evening", severity: "Low", status: "Resolved", resolution: "Pump timer reset to turn off at 22:00" },
    { id: "comp_2", room: "201", guest: "Elena Vance", category: "Dining", description: "Special almond milk delay at breakfast", severity: "Medium", status: "In Progress", resolution: "Chef assigned special stock" }
  ]);

  const [lostAndFound, setLostAndFound] = useState([
    { id: "lf_1", item: "Gold Montblanc Rollerball Pen", location: "Sheesh Mahal Table T3", foundBy: "Arjun Solanki (Captain)", date: "Yesterday", status: "Claimed", claimedBy: "Lord Sterling" },
    { id: "lf_2", item: "Silk Pashmina Shawl (Emerald Green)", location: "Courtyard Verandah Daybed", foundBy: "Sunita Bai", date: "Today", status: "In Safe Storage", claimedBy: null }
  ]);

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!reqRoom || !reqDesc) return;

    const newReq = {
      id: `req_${Date.now()}`,
      roomNumber: reqRoom,
      guestName: reqGuest || "In-House Guest",
      category: reqCategory,
      description: reqDesc,
      priority: reqPriority,
      assignedTo: "Concierge / Housekeeping",
      status: "In Progress",
      requestedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      completedAt: null
    };

    setGuestRequests((prev) => [newReq, ...prev]);
    setNewModalOpen(false);
    setReqDesc("");
    addToast(`Guest service request logged for Room ${reqRoom}.`, "success");
  };

  const markRequestDone = (id) => {
    setGuestRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Completed", completedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) } : r
      )
    );
    addToast("Guest request marked resolved.", "success");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Concierge & Guest Experience
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Guest Requests, Complaints & Lost & Found
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Live guest amenity requests, complaint escalations, and registered lost property.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewModalOpen(true)}
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Log Request</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-stone-200 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "requests" ? "bg-[#0d2b24] text-[#dfc285]" : "text-stone-600 hover:text-stone-900 bg-white"
            }`}
          >
            Guest Requests ({guestRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "complaints" ? "bg-[#0d2b24] text-[#dfc285]" : "text-stone-600 hover:text-stone-900 bg-white"
            }`}
          >
            Complaints & Escalations ({complaints.length})
          </button>
          <button
            onClick={() => setActiveTab("lostfound")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "lostfound" ? "bg-[#0d2b24] text-[#dfc285]" : "text-stone-600 hover:text-stone-900 bg-white"
            }`}
          >
            Lost & Found Property ({lostAndFound.length})
          </button>
        </div>

        {/* TAB 1: GUEST REQUESTS */}
        {activeTab === "requests" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guestRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="font-mono text-base font-bold text-[#0d2b24]">
                      Room {req.roomNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        req.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-[#c5a059] block mt-2">
                    {req.category}
                  </span>
                  <p className="text-xs text-stone-800 font-medium leading-relaxed mt-1">
                    {req.description}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-2">
                    Guest: <strong>{req.guestName}</strong> • {req.requestedAt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">Assigned: {req.assignedTo}</span>
                  {req.status !== "Completed" && (
                    <button
                      onClick={() => markRequestDone(req.id)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: COMPLAINTS */}
        {activeTab === "complaints" && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#faf8f5] text-stone-500 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Room</th>
                  <th className="p-4">Guest</th>
                  <th className="p-4">Issue Description</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Resolution Note</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td className="p-4 font-mono font-bold">Room {c.room}</td>
                    <td className="p-4 font-semibold">{c.guest}</td>
                    <td className="p-4 text-stone-700">{c.description}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-amber-100 text-amber-800">
                        {c.severity}
                      </span>
                    </td>
                    <td className="p-4 text-stone-500">{c.resolution}</td>
                    <td className="p-4 text-right">
                      <span className="text-emerald-700 font-bold">{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: LOST & FOUND */}
        {activeTab === "lostfound" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lostAndFound.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                  <h4 className="font-serif text-base font-bold text-stone-900">{item.item}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                    {item.status}
                  </span>
                </div>
                <p><strong>Found At:</strong> {item.location}</p>
                <p><strong>Logged By:</strong> {item.foundBy} ({item.date})</p>
                {item.claimedBy && <p className="text-emerald-700"><strong>Handed over to:</strong> {item.claimedBy}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#0d2b24]">
              Log Guest Request
            </h3>
            <form onSubmit={handleCreateRequest} className="space-y-3">
              <div>
                <label className="font-medium text-stone-700 block mb-1">Room Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 101"
                  value={reqRoom}
                  onChange={(e) => setReqRoom(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Singhania"
                  value={reqGuest}
                  onChange={(e) => setReqGuest(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Category</label>
                <select
                  value={reqCategory}
                  onChange={(e) => setReqCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Extra Towels / Linen">Extra Towels / Linen</option>
                  <option value="Toiletries & Amenities">Toiletries & Amenities</option>
                  <option value="Wake-up Call">Wake-up Call</option>
                  <option value="Luggage Assistance">Luggage Assistance</option>
                  <option value="Concierge / Chauffeur">Concierge / Chauffeur</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">Request Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify items or times needed..."
                  value={reqDesc}
                  onChange={(e) => setReqDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
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
                  Save Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
