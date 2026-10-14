"use client";

import React, { useState } from "react";
import Link from "next/link";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  CalendarRange, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Plus, 
  Users, 
  BedDouble, 
  AlertCircle 
} from "lucide-react";

export default function ReservationCalendarPage() {
  const { currentProperty, rooms, roomTypes, reservations } = useStayora();

  const [startDateOffset, setStartDateOffset] = useState(0); // in days from today
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState("All");
  const [selectedResBlock, setSelectedResBlock] = useState(null);

  // Generate 12 sequential dates starting from (today + offset)
  const daysToShow = 12;
  const dates = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + startDateOffset);

  for (let i = 0; i < daysToShow; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  // Filter physical rooms for current property
  const propRooms = rooms
    .filter((r) => r.propertyId === currentProperty.id)
    .filter((r) => selectedRoomTypeId === "All" || r.roomTypeId === selectedRoomTypeId);

  const formatDateYMD = (d) => d.toISOString().split("T")[0];

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Room Planning Rack
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Reservation Calendar Timeline
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Visual room occupancy, turnover dates, and maintenance blocks across {propRooms.length} physical rooms.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStartDateOffset(0)}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
            >
              Today
            </button>
            <div className="flex items-center bg-stone-100 rounded-xl p-1">
              <button
                onClick={() => setStartDateOffset((prev) => prev - 7)}
                className="p-1.5 hover:bg-white rounded-lg text-stone-600 transition-colors"
                title="Previous 7 Days"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStartDateOffset((prev) => prev + 7)}
                className="p-1.5 hover:bg-white rounded-lg text-stone-600 transition-colors"
                title="Next 7 Days"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <select
              value={selectedRoomTypeId}
              onChange={(e) => setSelectedRoomTypeId(e.target.value)}
              className="p-2.5 bg-stone-100 rounded-xl text-xs font-medium border-0"
            >
              <option value="All">All Room Types</option>
              {roomTypes.filter(rt => rt.propertyId === currentProperty.id).map((rt) => (
                <option key={rt.id} value={rt.id}>{rt.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs bg-white px-6 py-3 rounded-2xl border border-stone-200 text-stone-600">
          <span className="font-semibold text-stone-900">Status Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-700" /> In-House (Occupied)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-700" /> Confirmed Reservation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-700" /> Out of Service (Maintenance)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-stone-100 border border-stone-300" /> Available
          </span>
        </div>

        {/* Calendar Timeline Grid */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] text-stone-600 border-b border-stone-200">
                  <th className="p-3 w-40 min-w-[160px] sticky left-0 bg-[#faf8f5] z-10 border-r border-stone-200 font-bold">
                    Room / Floor
                  </th>
                  {dates.map((d, i) => {
                    const isToday = formatDateYMD(d) === formatDateYMD(new Date());
                    return (
                      <th
                        key={i}
                        className={`p-2.5 text-center min-w-[90px] border-r border-stone-100 ${
                          isToday ? "bg-amber-50/80 font-bold text-amber-900" : ""
                        }`}
                      >
                        <div className="text-[10px] uppercase text-stone-400">
                          {d.toLocaleDateString("en-IN", { weekday: "short" })}
                        </div>
                        <div className="text-xs font-semibold text-stone-800">
                          {d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {propRooms.map((room) => {
                  const roomType = roomTypes.find((rt) => rt.id === room.roomTypeId);

                  return (
                    <tr key={room.id} className="hover:bg-stone-50/50 transition-colors">
                      {/* Room Label Column (Sticky) */}
                      <td className="p-3 sticky left-0 bg-white z-10 border-r border-stone-200 shadow-sm">
                        <div className="font-bold text-stone-900 flex items-center justify-between">
                          <span>Room {room.number}</span>
                          <span className="text-[10px] text-stone-400 font-normal">Fl {room.floor}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 block truncate">
                          {roomType?.name || "Room"}
                        </span>
                      </td>

                      {/* Date Cells */}
                      {dates.map((dateObj, dIdx) => {
                        const dateStr = formatDateYMD(dateObj);

                        // Check if room is out of service
                        if (room.operationalStatus === "Out of Service") {
                          return (
                            <td
                              key={dIdx}
                              className="p-1 border-r border-stone-100 bg-rose-50/40 text-center"
                            >
                              <div
                                onClick={() => setSelectedResBlock({ title: `Room ${room.number} Out of Service`, details: room.maintenanceReason || "Maintenance Block" })}
                                className="h-10 bg-rose-700/80 hover:bg-rose-800 text-white rounded-lg p-1 text-[10px] flex items-center justify-center font-medium cursor-pointer shadow-sm truncate"
                                title="Out of service for maintenance"
                              >
                                Out of Service
                              </div>
                            </td>
                          );
                        }

                        // Check for overlapping reservation
                        const res = reservations.find((r) => {
                          if (r.propertyId !== currentProperty.id) return false;
                          if (r.assignedRoomId !== room.id) return false;
                          if (r.status === "Cancelled" || r.status === "Checked Out") return false;
                          return r.checkIn <= dateStr && r.checkOut > dateStr;
                        });

                        if (res) {
                          const isInHouse = res.status === "Checked In";
                          return (
                            <td key={dIdx} className="p-1 border-r border-stone-100">
                              <div
                                onClick={() => setSelectedResBlock({ ...res, title: `${res.guestName} (${res.bookingReference})`, details: `Room ${room.number} • ${res.checkIn} to ${res.checkOut}` })}
                                className={`h-10 rounded-lg p-1 text-[10px] font-semibold text-white flex flex-col justify-center cursor-pointer shadow-sm transition-all hover:scale-[1.02] ${
                                  isInHouse ? "bg-emerald-700 hover:bg-emerald-800" : "bg-blue-700 hover:bg-blue-800"
                                }`}
                                title={`${res.guestName} (${res.bookingReference})`}
                              >
                                <span className="truncate leading-tight">{res.guestName.split(" ")[0]}</span>
                                <span className="text-[8px] opacity-80 leading-none">{res.status}</span>
                              </div>
                            </td>
                          );
                        }

                        // Vacant Slot
                        return (
                          <td
                            key={dIdx}
                            className="p-1 border-r border-stone-100 text-center hover:bg-emerald-50/30 transition-colors"
                          >
                            <Link
                              href={`/app/walk-in?roomId=${room.id}&date=${dateStr}`}
                              className="w-full h-10 rounded-lg border border-dashed border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex items-center justify-center text-stone-300 hover:text-emerald-700 transition-all text-[10px]"
                              title={`Book Room ${room.number} on ${dateStr}`}
                            >
                              +
                            </Link>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Block Detail Modal */}
      {selectedResBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {selectedResBlock.title}
            </h3>
            <p className="text-stone-600 leading-relaxed">{selectedResBlock.details}</p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedResBlock(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold"
              >
                Close
              </button>
              {selectedResBlock.bookingReference && (
                <Link
                  href={`/app/reservations?ref=${selectedResBlock.bookingReference}`}
                  className="px-4 py-2 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold"
                >
                  Manage Reservation &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
