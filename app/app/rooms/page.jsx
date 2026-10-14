"use client";

import React, { useState } from "react";
import Link from "next/link";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  BedDouble, 
  Sparkles, 
  Wrench, 
  Users, 
  Check, 
  AlertCircle, 
  Filter, 
  ShieldCheck, 
  Clock 
} from "lucide-react";

export default function RoomsManagementPage() {
  const { 
    currentProperty, 
    rooms, 
    setRooms, 
    roomTypes, 
    housekeepingTasks, 
    setHousekeepingTasks,
    inspectRoom,
    addToast 
  } = useStayora();

  const [filterFloor, setFilterFloor] = useState("All");
  const [filterOpStatus, setFilterOpStatus] = useState("All");
  const [filterHkStatus, setFilterHkStatus] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Property scoped physical rooms
  const propRooms = rooms.filter((r) => r.propertyId === currentProperty.id);

  const filteredRooms = propRooms.filter((r) => {
    if (filterFloor !== "All" && String(r.floor) !== filterFloor) return false;
    if (filterOpStatus !== "All" && r.operationalStatus !== filterOpStatus) return false;
    if (filterHkStatus !== "All" && r.housekeepingStatus !== filterHkStatus) return false;
    return true;
  });

  // Toggle Out of Service
  const toggleOutOfService = (room) => {
    const isOoo = room.operationalStatus === "Out of Service";
    const nextStatus = isOoo ? "Available" : "Out of Service";
    const nextMaint = isOoo ? "Operational" : "Under Repair";

    setRooms((prev) =>
      prev.map((r) =>
        r.id === room.id
          ? {
              ...r,
              operationalStatus: nextStatus,
              maintenanceStatus: nextMaint,
              maintenanceReason: isOoo ? null : "Manual Front Desk Out of Service Block"
            }
          : r
      )
    );

    addToast(`Room ${room.number} marked ${nextStatus}.`, "info");
    setSelectedRoom(null);
  };

  // Quick mark ready
  const handleMarkReady = (room) => {
    inspectRoom(room.number, currentProperty.id, true, "Supervisor Quick Approval");
    setSelectedRoom(null);
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Asset & Facility Inventory
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Room Status Board & Inventory
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Real-time synchronization between front desk occupancy and housekeeping cleanliness.
            </p>
          </div>
        </div>

        {/* Status Count Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 block text-[10px] uppercase font-semibold">Total Physical Rooms</span>
            <strong className="text-stone-900 font-serif text-2xl">{propRooms.length}</strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-emerald-700 block text-[10px] uppercase font-semibold">Occupied</span>
            <strong className="text-emerald-800 font-serif text-2xl">
              {propRooms.filter((r) => r.operationalStatus === "Occupied").length}
            </strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-blue-700 block text-[10px] uppercase font-semibold">Reserved</span>
            <strong className="text-blue-800 font-serif text-2xl">
              {propRooms.filter((r) => r.operationalStatus === "Reserved").length}
            </strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-amber-700 block text-[10px] uppercase font-semibold">Dirty to Clean</span>
            <strong className="text-amber-800 font-serif text-2xl">
              {propRooms.filter((r) => r.housekeepingStatus === "Dirty").length}
            </strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-rose-700 block text-[10px] uppercase font-semibold">Out of Service</span>
            <strong className="text-rose-800 font-serif text-2xl">
              {propRooms.filter((r) => r.operationalStatus === "Out of Service").length}
            </strong>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-stone-500 font-medium block mb-1">Filter Floor</label>
            <select
              value={filterFloor}
              onChange={(e) => setFilterFloor(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
            >
              <option value="All">All Floors</option>
              <option value="1">Floor 1 (Ground)</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3 (Royal Penthouse)</option>
              <option value="5">Floor 5 (Executive)</option>
            </select>
          </div>

          <div>
            <label className="text-stone-500 font-medium block mb-1">Operational State</label>
            <select
              value={filterOpStatus}
              onChange={(e) => setFilterOpStatus(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
            >
              <option value="All">All Operational States</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>

          <div>
            <label className="text-stone-500 font-medium block mb-1">Housekeeping State</label>
            <select
              value={filterHkStatus}
              onChange={(e) => setFilterHkStatus(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
            >
              <option value="All">All Housekeeping States</option>
              <option value="Ready">Ready (Sellable)</option>
              <option value="Clean">Clean</option>
              <option value="Dirty">Dirty (Needs Cleaning)</option>
              <option value="In Progress">Cleaning In Progress</option>
              <option value="Inspected">Inspected</option>
            </select>
          </div>
        </div>

        {/* Rooms Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredRooms.map((room) => {
            const roomType = roomTypes.find((rt) => rt.id === room.roomTypeId);
            const isOccupied = room.operationalStatus === "Occupied";
            const isOoo = room.operationalStatus === "Out of Service";
            const isReserved = room.operationalStatus === "Reserved";

            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-44 shadow-sm hover:shadow-lg ${
                  isOoo
                    ? "bg-rose-50 border-rose-300"
                    : isOccupied
                    ? "bg-emerald-50/70 border-emerald-300"
                    : isReserved
                    ? "bg-blue-50/70 border-blue-300"
                    : "bg-white border-stone-200 hover:border-stone-400"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xl font-bold text-stone-900">
                      {room.number}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      Fl {room.floor}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-stone-600 block truncate">
                    {roomType?.name || "Room"}
                  </span>

                  {room.currentGuest && (
                    <span className="text-[10px] font-semibold text-stone-800 block truncate mt-1">
                      👤 {room.currentGuest}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-black/5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-stone-500">Front Desk:</span>
                    <span
                      className={`font-bold ${
                        isOoo
                          ? "text-rose-700"
                          : isOccupied
                          ? "text-emerald-700"
                          : isReserved
                          ? "text-blue-700"
                          : "text-stone-700"
                      }`}
                    >
                      {room.operationalStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-stone-500">Housekeeping:</span>
                    <span
                      className={`font-semibold ${
                        room.housekeepingStatus === "Ready"
                          ? "text-emerald-700"
                          : room.housekeepingStatus === "Dirty"
                          ? "text-amber-700"
                          : "text-stone-700"
                      }`}
                    >
                      {room.housekeepingStatus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-400">Physical Room</span>
                <h3 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  Room {selectedRoom.number}
                </h3>
              </div>
              <button onClick={() => setSelectedRoom(null)} className="text-stone-400 hover:text-stone-800">
                &times;
              </button>
            </div>

            <div className="space-y-2 p-3 bg-stone-50 rounded-xl">
              <p><strong>Floor:</strong> Level {selectedRoom.floor}</p>
              <p><strong>Keycard Code:</strong> {selectedRoom.keyCardCode || "KC-101"}</p>
              <p><strong>Operational:</strong> {selectedRoom.operationalStatus}</p>
              <p><strong>Housekeeping:</strong> {selectedRoom.housekeepingStatus}</p>
              {selectedRoom.currentGuest && (
                <p><strong>Current Occupant:</strong> {selectedRoom.currentGuest}</p>
              )}
              {selectedRoom.maintenanceReason && (
                <p className="text-rose-700"><strong>Maintenance Note:</strong> {selectedRoom.maintenanceReason}</p>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => handleMarkReady(selectedRoom)}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Mark Inspected & Ready</span>
              </button>

              <button
                onClick={() => toggleOutOfService(selectedRoom)}
                className={`w-full py-2 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  selectedRoom.operationalStatus === "Out of Service"
                    ? "bg-stone-200 text-stone-800 hover:bg-stone-300"
                    : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>
                  {selectedRoom.operationalStatus === "Out of Service" ? "Restore to Service" : "Place Out of Service"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
