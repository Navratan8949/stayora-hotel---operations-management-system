"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import PmsLayout from "../../components/pms/PmsLayout";
import { useStayora } from "../../context/StayoraContext";
import {
  Users,
  CalendarCheck,
  CalendarX,
  BedDouble,
  Receipt,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Utensils,
  Wrench,
  Printer
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function PmsDashboardPage() {
  const {
    currentProperty,
    reservations,
    rooms,
    folios,
    housekeepingTasks,
    restaurantOrders,
    activityLogs,
    checkInGuest,
    checkOutGuest,
    setActivePrintDoc
  } = useStayora();

  const todayStr = new Date().toISOString().split("T")[0];

  // Property-scoped records
  const propReservations = reservations.filter((r) => r.propertyId === currentProperty.id);
  const propRooms = rooms.filter((r) => r.propertyId === currentProperty.id);

  // Operational metrics
  const totalPhysicalRooms = propRooms.length;
  const outOfServiceRooms = propRooms.filter((r) => r.operationalStatus === "Out of Service").length;
  const sellableRooms = Math.max(1, totalPhysicalRooms - outOfServiceRooms);

  const occupiedRooms = propRooms.filter((r) => r.operationalStatus === "Occupied").length;
  const occupancyPercent = Math.round((occupiedRooms / sellableRooms) * 100);

  // Today's arrivals
  const todaysArrivals = propReservations.filter(
    (r) => r.status === "Confirmed" && r.checkIn <= todayStr
  );

  // Today's departures
  const todaysDepartures = propReservations.filter(
    (r) => r.status === "Checked In" && r.checkOut <= todayStr
  );

  // In-House guests
  const inHouseReservations = propReservations.filter((r) => r.status === "Checked In");

  // Dirty rooms
  const dirtyRooms = propRooms.filter((r) => r.housekeepingStatus === "Dirty");

  // Revenue calculation: Sum of all completed / active reservation room subtotal
  const totalRoomRevenue = propReservations
    .filter((r) => r.status !== "Cancelled")
    .reduce((sum, r) => sum + (r.roomSubtotal || 0), 0);

  const totalRoomsSold = propReservations.filter((r) => r.status !== "Cancelled").length || 1;
  const adr = Math.round(totalRoomRevenue / totalRoomsSold);
  const revPar = Math.round(totalRoomRevenue / sellableRooms);

  // Unpaid balance sum across open folios
  const totalUnpaidBalance = folios.reduce((sum, f) => sum + Math.max(0, f.balanceDue || 0), 0);

  // Weekly Revenue Demo Chart Data
  const weeklyTrendData = [
    { day: "Mon", revenue: 84000, occupancy: 65 },
    { day: "Tue", revenue: 92000, occupancy: 70 },
    { day: "Wed", revenue: 115000, occupancy: 82 },
    { day: "Thu", revenue: 108000, occupancy: 78 },
    { day: "Fri", revenue: 165000, occupancy: 95 },
    { day: "Sat", revenue: 182000, occupancy: 100 },
    { day: "Sun", revenue: 140000, occupancy: 88 }
  ];

  return (
    <PmsLayout>
      <div className="space-y-8">
        {/* Top Banner with Quick Highlights */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Front Desk Operations Command
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              {currentProperty.name} Dashboard
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Live operational sync • Current Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Date: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/walk-in"
              className="px-4 py-2.5 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Walk-In Guest Check-in</span>
            </Link>
            <button
              onClick={() =>
                setActivePrintDoc({
                  title: `Daily Operations & Revenue Summary — ${currentProperty.name}`,
                  docType: "DAILY REVENUE REPORT",
                  data: {
                    totalRevenue: totalRoomRevenue,
                    occupancyPercent,
                    adr,
                    revPar,
                    inHouseCount: inHouseReservations.length,
                    arrivalsCount: todaysArrivals.length
                  }
                })
              }
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-200"
            >
              <Printer className="w-4 h-4 text-[#0d2b24]" />
              <span>Print Daily Briefing</span>
            </button>
          </div>
        </div>

        {/* 8 Primary KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Occupancy */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Room Occupancy</span>
              <BedDouble className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">{occupancyPercent}%</div>
              <p className="text-[11px] text-stone-500 mt-1">
                {occupiedRooms} of {sellableRooms} sellable rooms occupied
              </p>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 rounded-full"
                style={{ width: `${Math.min(100, occupancyPercent)}%` }}
              />
            </div>
          </div>

          {/* Card 2: RevPAR */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">RevPAR</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">₹{revPar.toLocaleString()}</div>
              <p className="text-[11px] text-stone-500 mt-1">Revenue per available room</p>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium mt-3 block">
              ADR: ₹{adr.toLocaleString()}
            </span>
          </div>

          {/* Card 3: Today's Arrivals */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Expected Arrivals</span>
              <CalendarCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">{todaysArrivals.length}</div>
              <p className="text-[11px] text-stone-500 mt-1">Confirmed guests checking in</p>
            </div>
            <Link
              href="/app/reservations?filter=arrivals"
              className="text-[11px] text-[#0d2b24] font-semibold hover:underline mt-3 block"
            >
              View Arrival List &rarr;
            </Link>
          </div>

          {/* Card 4: Today's Departures */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Expected Departures</span>
              <CalendarX className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">{todaysDepartures.length}</div>
              <p className="text-[11px] text-stone-500 mt-1">Stays concluding today</p>
            </div>
            <Link
              href="/app/in-house"
              className="text-[11px] text-[#0d2b24] font-semibold hover:underline mt-3 block"
            >
              Review Departures &rarr;
            </Link>
          </div>

          {/* Card 5: In-House Guests */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Guests In-House</span>
              <Users className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">{inHouseReservations.length}</div>
              <p className="text-[11px] text-stone-500 mt-1">Active registered stays</p>
            </div>
            <Link
              href="/app/in-house"
              className="text-[11px] text-[#0d2b24] font-semibold hover:underline mt-3 block"
            >
              Open Guest Folios &rarr;
            </Link>
          </div>

          {/* Card 6: Dirty Rooms */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Housekeeping Queue</span>
              <Sparkles className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">{dirtyRooms.length}</div>
              <p className="text-[11px] text-stone-500 mt-1">Rooms needing cleaning</p>
            </div>
            <Link
              href="/app/housekeeping"
              className="text-[11px] text-[#0d2b24] font-semibold hover:underline mt-3 block"
            >
              Assign Cleaning Staff &rarr;
            </Link>
          </div>

          {/* Card 7: Out of Service */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Out of Service (OOO)</span>
              <Wrench className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">{outOfServiceRooms}</div>
              <p className="text-[11px] text-stone-500 mt-1">Under maintenance block</p>
            </div>
            <Link
              href="/app/maintenance"
              className="text-[11px] text-[#0d2b24] font-semibold hover:underline mt-3 block"
            >
              Maintenance Log &rarr;
            </Link>
          </div>

          {/* Card 8: Pending Balance */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
              <span className="font-medium">Outstanding Balances</span>
              <Receipt className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-stone-900">
                ₹{totalUnpaidBalance.toLocaleString()}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">Unsettled on active folios</p>
            </div>
            <Link
              href="/app/folios"
              className="text-[11px] text-[#0d2b24] font-semibold hover:underline mt-3 block"
            >
              Settle Invoices &rarr;
            </Link>
          </div>
        </div>

        {/* Operational Section: Arrivals & Departures Command Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Arrivals Today */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-blue-700" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Arrivals Awaiting Check-In ({todaysArrivals.length})
                  </h3>
                </div>
                <Link href="/app/reservations" className="text-xs text-[#0d2b24] font-semibold hover:underline">
                  View All
                </Link>
              </div>

              {todaysArrivals.length === 0 ? (
                <p className="text-xs text-stone-500 py-6 text-center">
                  All expected guests for today have checked in.
                </p>
              ) : (
                <div className="space-y-3">
                  {todaysArrivals.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-stone-900">{res.guestName}</strong>
                          <span className="text-[10px] font-mono bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                            {res.bookingReference}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Assigned: Room <strong>{res.roomNumber}</strong> • {res.nights} Nights • Balance: ₹{res.balanceDue.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => checkInGuest(res.id, res.assignedRoomId)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-sm transition-all"
                      >
                        Check In &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Departures Today */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <CalendarX className="w-5 h-5 text-amber-700" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Departures Pending Checkout ({todaysDepartures.length})
                  </h3>
                </div>
                <Link href="/app/in-house" className="text-xs text-[#0d2b24] font-semibold hover:underline">
                  In-House
                </Link>
              </div>

              {todaysDepartures.length === 0 ? (
                <p className="text-xs text-stone-500 py-6 text-center">
                  No departing guests currently pending check-out.
                </p>
              ) : (
                <div className="space-y-3">
                  {todaysDepartures.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-stone-900">{res.guestName}</strong>
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                            Room {res.roomNumber}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Departing today • Balance: ₹{res.balanceDue.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Link
                          href={`/app/folios?resId=${res.id}`}
                          className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-medium"
                        >
                          Folio
                        </Link>
                        <button
                          onClick={() => checkOutGuest(res.id)}
                          className="px-4 py-2 bg-[#0d2b24] hover:bg-[#164237] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Charts & Activity Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue & Occupancy Trend Chart (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Weekly Revenue Performance Trend
                </h3>
                <p className="text-xs text-stone-500">
                  Room tariffs, F&B orders, and package revenue (₹ INR)
                </p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold">
                +14.2% vs Last Week
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d2b24" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d2b24" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ede6" />
                  <XAxis dataKey="day" stroke="#a8a29e" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#a8a29e"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val) => [`₹${Number(val).toLocaleString()}`, "Revenue"]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e7e5e4", fontSize: "12px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0d2b24"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Operational Activity (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100">
                Front Office Activity Log
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {activityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="text-xs flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c5a059] shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">{log.action}: {log.target}</strong>
                      <p className="text-stone-500 text-[11px] leading-tight">{log.details}</p>
                      <span className="text-[10px] text-stone-400 mt-0.5 block">{log.user} • {log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/app/settings"
              className="text-xs text-center text-[#0d2b24] font-bold hover:underline block pt-4 border-t border-stone-100"
            >
              View Complete System Audit Log &rarr;
            </Link>
          </div>
        </div>
      </div>
    </PmsLayout>
  );
}
