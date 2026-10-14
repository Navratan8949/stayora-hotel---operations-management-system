"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Users, 
  BedDouble, 
  DollarSign, 
  Utensils 
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function ReportsAnalyticsPage() {
  const { currentProperty, reservations, rooms, restaurantOrders, folios, addToast } = useStayora();

  const [dateRangeFilter, setDateRangeFilter] = useState("MonthToDate");

  // Property calculations
  const propRes = reservations.filter((r) => r.propertyId === currentProperty.id && r.status !== "Cancelled");
  const propRooms = rooms.filter((r) => r.propertyId === currentProperty.id);

  const physicalRooms = propRooms.length;
  const oooRooms = propRooms.filter((r) => r.operationalStatus === "Out of Service").length;
  const sellableRooms = Math.max(1, physicalRooms - oooRooms);

  const totalRoomRevenue = propRes.reduce((sum, r) => sum + (r.roomSubtotal || 0), 0);
  const roomsSold = propRes.length || 1;
  const totalNightsSold = propRes.reduce((sum, r) => sum + (r.nights || 1), 0);

  const adr = Math.round(totalRoomRevenue / roomsSold);
  const revPar = Math.round(totalRoomRevenue / sellableRooms);
  const avgStayLength = (totalNightsSold / roomsSold).toFixed(1);

  // Restaurant revenue
  const propOrders = restaurantOrders.filter((o) => o.status !== "Cancelled");
  const totalRestaurantRevenue = propOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Booking sources breakdown
  const sourceCounts = {};
  propRes.forEach((r) => {
    const src = r.bookingSource || "Direct Website";
    sourceCounts[src] = (sourceCounts[src] || 0) + (r.totalAmount || 0);
  });

  const sourceChartData = Object.keys(sourceCounts).map((k) => ({
    name: k,
    value: sourceCounts[k]
  }));

  const COLORS = ["#0d2b24", "#c5a059", "#3b82f6", "#10b981", "#8b5cf6"];

  // Monthly Revenue Demo Data
  const monthlyData = [
    { month: "May", roomRevenue: 280000, diningRevenue: 65000 },
    { month: "Jun", roomRevenue: 340000, diningRevenue: 78000 },
    { month: "Jul", roomRevenue: 310000, diningRevenue: 72000 },
    { month: "Aug", roomRevenue: 420000, diningRevenue: 98000 },
    { month: "Sep", roomRevenue: 490000, diningRevenue: 110000 },
    { month: "Oct", roomRevenue: totalRoomRevenue || 580000, diningRevenue: totalRestaurantRevenue || 125000 }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + [
      "Metric,Value",
      `Physical Room Inventory,${physicalRooms}`,
      `Sellable Room Inventory,${sellableRooms}`,
      `Total Room Revenue (INR),${totalRoomRevenue}`,
      `ADR (Average Daily Rate INR),${adr}`,
      `RevPAR (Revenue Per Available Room INR),${revPar}`,
      `Average Length of Stay,${avgStayLength} nights`,
      `Total F&B / Restaurant Revenue,${totalRestaurantRevenue}`
    ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `stayora_hospitality_kpis_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    addToast("Exported KPI & Revenue Analytics report to CSV.", "success");
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Executive Analytics & Revenue Intelligence
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Performance Reports & KPIs
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              ADR, RevPAR, channel performance, and departmental revenue calculations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export KPI Summary (CSV)</span>
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-stone-400 uppercase font-semibold block text-[10px]">Average Daily Rate (ADR)</span>
            <strong className="font-serif text-3xl text-stone-900 block mt-1">₹{adr.toLocaleString()}</strong>
            <span className="text-stone-500 text-[10px]">Room revenue / rooms sold</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-emerald-700 uppercase font-semibold block text-[10px]">RevPAR</span>
            <strong className="font-serif text-3xl text-emerald-900 block mt-1">₹{revPar.toLocaleString()}</strong>
            <span className="text-stone-500 text-[10px]">Room revenue / sellable inventory</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-blue-700 uppercase font-semibold block text-[10px]">Total Room Revenue</span>
            <strong className="font-serif text-3xl text-blue-900 block mt-1">₹{totalRoomRevenue.toLocaleString()}</strong>
            <span className="text-stone-500 text-[10px]">{roomsSold} reservations booked</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[#c5a059] uppercase font-semibold block text-[10px]">Avg Length of Stay (ALOS)</span>
            <strong className="font-serif text-3xl text-stone-900 block mt-1">{avgStayLength} Nights</strong>
            <span className="text-stone-500 text-[10px]">Nights sold / reservation count</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bar Chart: Monthly Departmental Revenue (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Monthly Room vs. Dining Revenue (₹ INR)
                </h3>
                <p className="text-xs text-stone-500">Departmental earnings comparison</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#0d2b24]">
                  <span className="w-3 h-3 rounded bg-[#0d2b24]" /> Room Revenue
                </span>
                <span className="flex items-center gap-1.5 text-[#c5a059]">
                  <span className="w-3 h-3 rounded bg-[#c5a059]" /> Restaurant / F&B
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0ede6" />
                  <XAxis dataKey="month" stroke="#a8a29e" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#a8a29e"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val) => `₹${Number(val).toLocaleString()}`}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e7e5e4", fontSize: "12px" }}
                  />
                  <Bar dataKey="roomRevenue" fill="#0d2b24" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="diningRevenue" fill="#c5a059" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Booking Source Share (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                Channel Revenue Share
              </h3>
              <p className="text-xs text-stone-500 mb-4">Direct website vs alternate booking channels</p>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      innerRadius={45}
                      paddingAngle={4}
                    >
                      {sourceChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `₹${Number(val).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 pt-2 text-xs">
                {sourceChartData.map((entry, idx) => (
                  <div key={idx} className="flex justify-between items-center text-stone-700">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      />
                      <span>{entry.name}</span>
                    </span>
                    <strong className="font-mono">₹{entry.value.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PmsLayout>
  );
}
