"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStayora } from "../../context/StayoraContext";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  BedDouble,
  Sparkles,
  Users,
  Receipt,
  Utensils,
  Package,
  Wrench,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Building2,
  UserCheck,
  ChevronDown,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Clock,
  Menu,
  X,
  CreditCard,
  Briefcase,
  KeyRound
} from "lucide-react";

export default function PmsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentProperty,
    properties,
    setSelectedPropertyId,
    currentRole,
    setCurrentRole,
    currentUser,
    logout,
    demoStaffList,
    isAuthenticated,
    reservations,
    rooms,
    housekeepingTasks,
    restaurantOrders,
    inventoryItems,
    notifications,
    setNotifications,
    setGlobalSearchOpen,
    setActivePrintDoc
  } = useStayora();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Operational badges
  const todayStr = new Date().toISOString().split("T")[0];
  const arrivalsCount = reservations.filter(
    (r) => r.propertyId === currentProperty.id && r.status === "Confirmed" && r.checkIn <= todayStr
  ).length;

  const inHouseCount = reservations.filter(
    (r) => r.propertyId === currentProperty.id && r.status === "Checked In"
  ).length;

  const dirtyRoomsCount = rooms.filter(
    (r) => r.propertyId === currentProperty.id && r.housekeepingStatus === "Dirty"
  ).length;

  const pendingOrdersCount = restaurantOrders.filter(
    (o) => o.status === "Preparing" || o.status === "Ready"
  ).length;

  const unreadNotifs = notifications.filter((n) => !n.read);

  const roles = [
    "Hotel Manager",
    "Front Desk / Receptionist",
    "Owner / Super Admin",
    "Housekeeping Supervisor",
    "Accountant / Cashier",
    "Restaurant Manager",
    "Maintenance Staff"
  ];

  const navGroups = [
    {
      group: "Overview",
      items: [
        { name: "Dashboard", href: "/app", icon: LayoutDashboard }
      ]
    },
    {
      group: "Front Office",
      items: [
        { name: "Reservations", href: "/app/reservations", icon: CalendarDays, badge: arrivalsCount > 0 ? `${arrivalsCount} Arr` : null },
        { name: "Room Calendar Rack", href: "/app/calendar", icon: CalendarRange },
        { name: "In-House Guests", href: "/app/in-house", icon: UserCheck, badge: inHouseCount > 0 ? `${inHouseCount}` : null },
        { name: "Walk-In Check-In", href: "/app/walk-in", icon: Plus },
        { name: "Guest Directory & CRM", href: "/app/guests", icon: Users }
      ]
    },
    {
      group: "Rooms & Status",
      items: [
        { name: "Room Inventory Grid", href: "/app/rooms", icon: BedDouble, badge: dirtyRoomsCount > 0 ? `${dirtyRoomsCount} Dirty` : null },
        { name: "Rate Plans & Pricing", href: "/app/rates", icon: Sparkles }
      ]
    },
    {
      group: "Housekeeping & Ops",
      items: [
        { name: "Housekeeping Board", href: "/app/housekeeping", icon: Sparkles, badge: dirtyRoomsCount > 0 ? `${dirtyRoomsCount}` : null },
        { name: "Maintenance Requests", href: "/app/maintenance", icon: Wrench },
        { name: "Guest Requests & Concierge", href: "/app/guest-services", icon: Clock }
      ]
    },
    {
      group: "Food & Beverage",
      items: [
        { name: "Restaurant & POS Queue", href: "/app/restaurant", icon: Utensils, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null }
      ]
    },
    {
      group: "Finance & Purchasing",
      items: [
        { name: "Guest Folios & Invoices", href: "/app/folios", icon: Receipt },
        { name: "Payments & Ledger", href: "/app/payments", icon: CreditCard },
        { name: "Inventory & Stock", href: "/app/inventory", icon: Package },
        { name: "Purchase Orders", href: "/app/purchasing", icon: Briefcase }
      ]
    },
    {
      group: "Team & Intelligence",
      items: [
        { name: "Staff & Duty Roster", href: "/app/staff", icon: Users },
        { name: "Reports & Analytics", href: "/app/reports", icon: BarChart3 },
        { name: "Settings & Demo Admin", href: "/app/settings", icon: Settings }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-stone-800 flex flex-col font-sans selection:bg-[#0d2b24]/20">
      {/* PMS TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#0d2b24] text-white border-b border-[#c5a059]/30 h-16 flex items-center justify-between px-4 sm:px-6 shadow-md">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-stone-200 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/app" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c5a059] flex items-center justify-center text-[#0d2b24] shadow-sm font-serif font-bold text-base">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-white leading-tight">
                STAYORA PMS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#dfc285] font-semibold -mt-0.5">
                Property Management System
              </span>
            </div>
          </Link>

          {/* Property Selector */}
          <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-white/10">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl text-xs text-[#dfc285]">
              <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
              <select
                value={currentProperty.id}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="bg-transparent text-[#dfc285] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id} className="text-stone-900 bg-white">
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Header Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search trigger (Cmd+K) */}
          <button
            onClick={() => setGlobalSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs transition-colors border border-white/10"
            title="Search records (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden md:inline">Quick Find</span>
            <kbd className="hidden md:inline px-1 py-0.5 bg-black/30 rounded text-[9px] font-mono text-stone-300">
              ⌘K
            </kbd>
          </button>

          {/* Quick Action Dropdown */}
          <div className="relative">
            <button
              onClick={() => setQuickActionOpen(!quickActionOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] hover:bg-[#dfc285] text-[#0d2b24] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quick Action</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {quickActionOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-200 py-1.5 z-50 text-xs text-stone-800 animate-in fade-in"
                onClick={() => setQuickActionOpen(false)}
              >
                <Link
                  href="/app/walk-in"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-stone-50 transition-colors font-medium"
                >
                  <UserCheck className="w-4 h-4 text-[#c5a059]" />
                  <span>Walk-in Quick Check-In</span>
                </Link>
                <Link
                  href="/app/reservations?action=new"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-stone-50 transition-colors font-medium"
                >
                  <CalendarDays className="w-4 h-4 text-[#c5a059]" />
                  <span>Manual Reservation</span>
                </Link>
                <Link
                  href="/app/restaurant"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-stone-50 transition-colors font-medium"
                >
                  <Utensils className="w-4 h-4 text-[#c5a059]" />
                  <span>New Restaurant / POS Order</span>
                </Link>
                <Link
                  href="/app/housekeeping"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-stone-50 transition-colors font-medium"
                >
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>Create Housekeeping Task</span>
                </Link>
                <Link
                  href="/app/maintenance"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-stone-50 transition-colors font-medium"
                >
                  <Wrench className="w-4 h-4 text-[#c5a059]" />
                  <span>Log Maintenance Request</span>
                </Link>
                <Link
                  href="/app/payments"
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-stone-50 transition-colors font-medium"
                >
                  <CreditCard className="w-4 h-4 text-[#c5a059]" />
                  <span>Record Payment</span>
                </Link>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 transition-colors"
              title="Operational Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#0d2b24]" />
              )}
            </button>

            {notifDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-50 text-xs text-stone-800 animate-in fade-in"
              >
                <div className="flex items-center justify-between px-3 py-2 border-b border-stone-100">
                  <span className="font-bold text-stone-900">Notifications ({unreadNotifs.length})</span>
                  <button
                    onClick={() => {
                      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                      setNotifDropdownOpen(false);
                    }}
                    className="text-[11px] text-[#0d2b24] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-stone-100">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`p-3 ${n.read ? "bg-white" : "bg-amber-50/40"}`}>
                      <p className="font-semibold text-stone-800">{n.title}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-stone-400 block mt-1">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Staff Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-white/10 hover:bg-white/15 text-stone-200 rounded-xl text-xs transition-colors border border-white/10 cursor-pointer"
              title="Staff Profile & Persona"
            >
              <span className="text-base">{currentUser?.avatar || "👑"}</span>
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-bold text-white text-[11px] leading-tight truncate max-w-[130px]">
                  {currentUser?.name || "Staff Member"}
                </span>
                <span className="text-[10px] text-[#dfc285] leading-none">
                  {currentRole}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 opacity-70 ml-0.5" />
            </button>

            {roleDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2.5 z-50 text-xs text-stone-800 animate-in fade-in"
              >
                {/* Current Staff Card */}
                <div className="px-3.5 py-2 border-b border-stone-100 flex items-center gap-3">
                  <span className="text-2xl p-2 bg-stone-100 rounded-xl shrink-0">
                    {currentUser?.avatar || "👑"}
                  </span>
                  <div className="truncate">
                    <p className="font-bold text-stone-900 text-sm truncate">{currentUser?.name}</p>
                    <p className="text-[11px] font-semibold text-[#0d2b24]">{currentRole}</p>
                    <p className="text-[10px] text-stone-400 font-mono truncate">{currentUser?.email}</p>
                  </div>
                </div>

                <div className="px-3.5 pt-2.5 pb-1 text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                  Switch Active Persona:
                </div>

                <div className="max-h-48 overflow-y-auto px-1 space-y-0.5">
                  {(demoStaffList || []).map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => {
                        setCurrentRole(staff.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer ${
                        staff.role === currentRole ? "text-[#0d2b24] font-bold bg-amber-50/60" : "text-stone-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm">{staff.avatar}</span>
                        <div className="truncate">
                          <p className="text-xs truncate">{staff.name}</p>
                          <p className="text-[10px] text-stone-400">{staff.role}</p>
                        </div>
                      </div>
                      {staff.role === currentRole && <CheckCircle className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />}
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-stone-100 px-2 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setRoleDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>View Guest Website</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setRoleDropdownOpen(false);
                      router.push("/login");
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-700 hover:bg-rose-50 font-bold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sign Out to Login Page</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Jump to Public Website */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2 py-1.5 rounded-xl transition-colors"
            title="View Public Customer Website"
          >
            <span>Website</span>
            <ExternalLink className="w-3 h-3 text-[#c5a059]" />
          </Link>
        </div>
      </header>

      {/* BODY WITH PERSISTENT SIDEBAR */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0a231d] text-stone-300 flex flex-col justify-between pt-0 lg:static lg:z-auto transition-transform duration-200 ease-in-out border-r border-[#c5a059]/20 shadow-xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Mobile Header with Close X */}
          <div className="lg:hidden h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">PMS Navigation</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Scroll Container */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] block px-3 mb-1">
                  {grp.group}
                </span>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#c5a059] to-[#9e7a32] text-[#0d2b24] font-bold shadow-md"
                          : "text-stone-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#0d2b24]" : "text-[#dfc285]"}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? "bg-[#0d2b24] text-[#dfc285]"
                              : "bg-white/10 text-stone-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Bottom user / demo status pill */}
          <div className="p-3.5 border-t border-white/10 bg-[#071c17] text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <span className="text-base shrink-0">{currentUser?.avatar || "👑"}</span>
                <div className="truncate">
                  <span className="text-[10px] text-stone-400 block leading-tight">Logged in as</span>
                  <strong className="text-stone-200 font-semibold text-xs leading-tight block truncate max-w-[120px]">
                    {currentUser?.name || currentRole}
                  </strong>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Sign Out to Login Page"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 lg:hidden backdrop-blur-sm"
          />
        )}

        {/* MAIN CONTENT WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {!isAuthenticated && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-amber-200/80 rounded-lg text-amber-900 shrink-0">
                  <KeyRound className="w-4 h-4" />
                </span>
                <div>
                  <strong className="font-bold">PMS Sandbox Preview:</strong> You are currently viewing the operations console as a guest. Authenticate with a verified staff persona to unlock personalized workflows.
                </div>
              </div>
              <Link
                href="/login"
                className="px-4 py-2 bg-[#0d2b24] text-white font-bold rounded-xl hover:bg-[#15473c] transition-colors whitespace-nowrap shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <span>Staff Sign In</span>
              </Link>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
