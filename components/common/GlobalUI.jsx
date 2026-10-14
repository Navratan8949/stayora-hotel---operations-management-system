"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStayora } from "../../context/StayoraContext";
import { 
  X, 
  Search, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  BedDouble, 
  Calendar, 
  User, 
  FileText, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  ExternalLink,
  Receipt,
  Utensils,
  Wrench,
  Package
} from "lucide-react";

export default function GlobalUI() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    toasts, 
    removeToast, 
    activePrintDoc, 
    setActivePrintDoc, 
    globalSearchOpen, 
    setGlobalSearchOpen,
    reservations,
    rooms,
    guests,
    folios,
    housekeepingTasks,
    maintenanceRequests,
    restaurantOrders,
    inventoryItems,
    currentProperty
  } = useStayora();

  const [searchQuery, setSearchQuery] = useState("");
  const isPms = pathname?.startsWith("/app");

  // Keyboard shortcut for Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setGlobalSearchOpen(false);
        setActivePrintDoc(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setGlobalSearchOpen, setActivePrintDoc]);

  // Global search filtering
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    // Search reservations
    reservations.forEach((r) => {
      if (
        r.bookingReference.toLowerCase().includes(q) ||
        r.guestName.toLowerCase().includes(q) ||
        (r.guestPhone && r.guestPhone.includes(q))
      ) {
        results.push({
          type: "Reservation",
          icon: Calendar,
          title: `${r.bookingReference} — ${r.guestName}`,
          subtitle: `Room ${r.roomNumber || "TBA"} • ${r.status} • ₹${r.totalAmount.toLocaleString()}`,
          url: `/app/reservations?ref=${r.bookingReference}`
        });
      }
    });

    // Search rooms
    rooms.forEach((rm) => {
      if (rm.number.toLowerCase().includes(q) || (rm.currentGuest && rm.currentGuest.toLowerCase().includes(q))) {
        results.push({
          type: "Room",
          icon: BedDouble,
          title: `Room ${rm.number} (${rm.operationalStatus})`,
          subtitle: `Housekeeping: ${rm.housekeepingStatus} • Guest: ${rm.currentGuest || "Vacant"}`,
          url: `/app/rooms?room=${rm.number}`
        });
      }
    });

    // Search guests
    guests.forEach((g) => {
      if (g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q) || g.phone.includes(q)) {
        results.push({
          type: "Guest CRM",
          icon: User,
          title: g.name,
          subtitle: `${g.phone} • ${g.city} • ${g.totalStays} Stays (VIP: ${g.vip ? "Yes" : "No"})`,
          url: `/app/guests?guest=${encodeURIComponent(g.name)}`
        });
      }
    });

    // Search folios & invoices
    folios.forEach((f) => {
      if (f.roomNumber.toLowerCase().includes(q) || f.guestName.toLowerCase().includes(q)) {
        results.push({
          type: "Billing / Folio",
          icon: Receipt,
          title: `Folio Room ${f.roomNumber} (${f.guestName})`,
          subtitle: `Charges: ₹${f.totalCharges.toLocaleString()} • Balance: ₹${f.balanceDue.toLocaleString()}`,
          url: `/app/folios?folio=${f.id}`
        });
      }
    });

    // Search restaurant orders
    restaurantOrders.forEach((o) => {
      if (o.orderNumber.toLowerCase().includes(q) || (o.roomNumber && o.roomNumber.includes(q))) {
        results.push({
          type: "Restaurant Order",
          icon: Utensils,
          title: `${o.orderNumber} — ${o.tableName}`,
          subtitle: `${o.status} • Total: ₹${o.total.toLocaleString()} • ${o.paymentMethod}`,
          url: `/app/restaurant?order=${o.orderNumber}`
        });
      }
    });

    // Search inventory
    inventoryItems.forEach((inv) => {
      if (inv.name.toLowerCase().includes(q) || inv.category.toLowerCase().includes(q)) {
        results.push({
          type: "Inventory Item",
          icon: Package,
          title: inv.name,
          subtitle: `Stock: ${inv.currentStock} ${inv.unit} • ${inv.location}`,
          url: `/app/inventory?item=${encodeURIComponent(inv.name)}`
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, reservations, rooms, guests, folios, restaurantOrders, inventoryItems]);

  const handleSelectResult = (url) => {
    setGlobalSearchOpen(false);
    setSearchQuery("");
    router.push(url);
  };

  return (
    <>
      {/* Top Experience Switcher Banner */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#0d2b24] text-white px-3 py-2 rounded-full shadow-2xl border border-[#c5a059]/40 backdrop-blur-md no-print text-xs">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]"></span>
        </span>
        <span className="text-stone-300 hidden sm:inline">Demo Switcher:</span>
        {isPms ? (
          <Link
            href="/"
            className="flex items-center gap-1.5 font-medium text-[#dfc285] hover:text-white px-2.5 py-1 bg-white/10 rounded-full transition-all"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>View Public Website</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>
        ) : (
          <Link
            href="/app"
            className="flex items-center gap-1.5 font-medium text-[#dfc285] hover:text-white px-2.5 py-1 bg-white/10 rounded-full transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open Hotel PMS Portal</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none no-print">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border text-sm transition-all transform animate-in fade-in slide-in-from-top-2 ${
              toast.type === "error"
                ? "bg-rose-900/95 text-white border-rose-700"
                : toast.type === "warning"
                ? "bg-amber-900/95 text-white border-amber-700"
                : toast.type === "info"
                ? "bg-stone-900/95 text-stone-100 border-stone-700"
                : "bg-[#0d2b24]/95 text-white border-[#c5a059]/40"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
            ) : toast.type === "warning" ? (
              <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            ) : toast.type === "info" ? (
              <Info className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs leading-relaxed">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Global Search Modal (Cmd+K) */}
      {globalSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4 no-print animate-in fade-in">
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-stone-100 bg-[#faf8f5]">
              <Search className="w-5 h-5 text-stone-400 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reservations, guests, rooms, folios, orders, stock... (Type at least 2 chars)"
                className="w-full py-4 text-stone-800 placeholder-stone-400 bg-transparent text-sm focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setGlobalSearchOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 max-h-96 overflow-y-auto divide-y divide-stone-100">
              {searchQuery.length < 2 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  <p className="font-medium text-stone-600 mb-1">Stayora Global Instant Finder</p>
                  <p>Search by guest name, phone, reservation code (e.g. STY-JP-8012), room number (e.g. 101), or item name.</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-stone-400 text-sm">
                  No matching records found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                searchResults.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectResult(item.url)}
                      className="w-full text-left flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl transition-colors group"
                    >
                      <div className="p-2.5 rounded-lg bg-stone-100 text-[#0d2b24] group-hover:bg-[#0d2b24] group-hover:text-[#dfc285] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-semibold tracking-wider text-stone-400">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-stone-800 truncate">{item.title}</p>
                        <p className="text-xs text-stone-500 truncate">{item.subtitle}</p>
                      </div>
                      <span className="text-xs text-stone-400 group-hover:text-stone-700">Open &rarr;</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Quick tip: Press <kbd className="px-1.5 py-0.5 bg-stone-200 text-stone-700 rounded text-[10px]">ESC</kbd> to close</span>
              <span>Stayora Demo Multi-Property Search</span>
            </div>
          </div>
        </div>
      )}

      {/* Printable Document Modal (Supports 24 document types) */}
      {activePrintDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-3xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 no-print">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0d2b24]" />
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  {activePrintDoc.title || "Print Document Preview"}
                </h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                  DEMO RECORD
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0d2b24] text-white hover:bg-[#164237] rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Now
                </button>
                <button
                  onClick={() => setActivePrintDoc(null)}
                  className="p-2 text-stone-400 hover:text-stone-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Print Body */}
            <div className="p-8 text-stone-800 text-sm font-sans space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-stone-200 pb-6">
                <div>
                  <h1 className="font-serif text-2xl font-bold tracking-tight text-[#0d2b24]">
                    STAYORA
                  </h1>
                  <p className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">
                    {currentProperty?.name || "Stayora Grand Jaipur"}
                  </p>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    {currentProperty?.address || "Palace Road, Civil Lines, Jaipur, Rajasthan 302006"}
                  </p>
                  <p className="text-xs text-stone-500">
                    Phone: {currentProperty?.phone} • Email: {currentProperty?.email}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-xs font-mono font-bold rounded">
                    {activePrintDoc.docType || "DOCUMENT"}
                  </span>
                  <p className="text-xs text-stone-500 mt-2">
                    Ref #: <span className="font-mono font-semibold text-stone-800">{activePrintDoc.data?.bookingReference || activePrintDoc.data?.orderNumber || activePrintDoc.data?.poNumber || "STY-DOC-2026"}</span>
                  </p>
                  <p className="text-xs text-stone-500">
                    Date: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Document Details Render */}
              <div className="space-y-4">
                {activePrintDoc.content ? (
                  activePrintDoc.content
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl text-xs">
                      <div>
                        <span className="text-stone-400 block mb-0.5">Guest / Recipient:</span>
                        <p className="font-semibold text-stone-800 text-sm">
                          {activePrintDoc.data?.guestName || activePrintDoc.data?.supplierName || "Guest of Stayora"}
                        </p>
                        <p className="text-stone-600">{activePrintDoc.data?.guestEmail || activePrintDoc.data?.guestPhone || ""}</p>
                      </div>
                      <div>
                        <span className="text-stone-400 block mb-0.5">Stay / Room Allocation:</span>
                        <p className="font-semibold text-stone-800 text-sm">
                          Room: {activePrintDoc.data?.roomNumber || "TBA"} • {activePrintDoc.data?.roomTypeName || "Deluxe Suite"}
                        </p>
                        <p className="text-stone-600">
                          {activePrintDoc.data?.checkIn && `Stay: ${activePrintDoc.data?.checkIn} to ${activePrintDoc.data?.checkOut} (${activePrintDoc.data?.nights || 1} nights)`}
                        </p>
                      </div>
                    </div>

                    {/* Line Items Table */}
                    {activePrintDoc.data?.charges && (
                      <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                        <thead className="bg-stone-100 text-stone-600">
                          <tr>
                            <th className="p-3">Description</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 text-right">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {activePrintDoc.data.charges.map((chg, i) => (
                            <tr key={i}>
                              <td className="p-3 font-medium text-stone-800">{chg.description}</td>
                              <td className="p-3 text-stone-500">{chg.category}</td>
                              <td className="p-3 text-stone-500">{chg.date}</td>
                              <td className="p-3 text-right font-mono font-medium">₹{Number(chg.amount).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-stone-50 font-semibold text-stone-800 border-t border-stone-200">
                          <tr>
                            <td colSpan={3} className="p-3 text-right">Total Charges:</td>
                            <td className="p-3 text-right font-mono">₹{activePrintDoc.data.totalCharges?.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="p-3 text-right text-emerald-700">Total Payments Recorded:</td>
                            <td className="p-3 text-right font-mono text-emerald-700">₹{activePrintDoc.data.totalPaid?.toLocaleString()}</td>
                          </tr>
                          <tr className="bg-stone-200/60 font-bold">
                            <td colSpan={3} className="p-3 text-right">Balance Due:</td>
                            <td className="p-3 text-right font-mono">₹{activePrintDoc.data.balanceDue?.toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    )}

                    {/* Fallback for items list */}
                    {activePrintDoc.data?.items && (
                      <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                        <thead className="bg-stone-100 text-stone-600">
                          <tr>
                            <th className="p-3">Item Name</th>
                            <th className="p-3 text-center">Qty</th>
                            <th className="p-3 text-right">Rate</th>
                            <th className="p-3 text-right">Total (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {activePrintDoc.data.items.map((it, i) => (
                            <tr key={i}>
                              <td className="p-3 font-medium text-stone-800">{it.name || it.itemName}</td>
                              <td className="p-3 text-center">{it.quantity}</td>
                              <td className="p-3 text-right font-mono">₹{(it.price || it.unitCost || 0).toLocaleString()}</td>
                              <td className="p-3 text-right font-mono font-medium">₹{((it.quantity * (it.price || it.unitCost || 0))).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-stone-50 font-semibold text-stone-800 border-t border-stone-200">
                          <tr>
                            <td colSpan={3} className="p-3 text-right">Subtotal:</td>
                            <td className="p-3 text-right font-mono">₹{(activePrintDoc.data.subtotal || activePrintDoc.data.totalAmount || 0).toLocaleString()}</td>
                          </tr>
                          {activePrintDoc.data.tax && (
                            <tr>
                              <td colSpan={3} className="p-3 text-right">Tax (12%):</td>
                              <td className="p-3 text-right font-mono">₹{activePrintDoc.data.tax.toLocaleString()}</td>
                            </tr>
                          )}
                          <tr className="bg-stone-200/60 font-bold">
                            <td colSpan={3} className="p-3 text-right">Grand Total:</td>
                            <td className="p-3 text-right font-mono">₹{(activePrintDoc.data.total || activePrintDoc.data.totalAmount || 0).toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Policies */}
              <div className="border-t border-stone-200 pt-6 text-[11px] text-stone-400 space-y-1">
                <p>Standard Check-in: 14:00 hrs | Standard Check-out: 11:00 hrs. Government photo identification mandatory at check-in.</p>
                <p>Simulated Demonstration Document created by Stayora PMS for Code Pe Charcha.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
