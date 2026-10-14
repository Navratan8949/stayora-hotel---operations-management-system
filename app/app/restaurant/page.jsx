"use client";

import React, { useState } from "react";
import Image from "next/image";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { 
  Utensils, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  Clock, 
  CheckCircle2, 
  Receipt, 
  Users, 
  Send,
  BedDouble 
} from "lucide-react";

export default function RestaurantPosPage() {
  const {
    menuItems,
    tables,
    restaurantOrders,
    createPOSOrder,
    updatePOSOrderStatus,
    reservations,
    currentProperty,
    setActivePrintDoc,
    addToast
  } = useStayora();

  const [activeTab, setActiveTab] = useState("pos"); // "pos" or "kitchen"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState("tbl_1");
  const [orderSource, setOrderSource] = useState("Dine-In");
  const [chargeToRoom, setChargeToRoom] = useState(false);
  const [targetReservationId, setTargetReservationId] = useState("");

  const inHouseGuests = reservations.filter(
    (r) => r.propertyId === currentProperty.id && r.status === "Checked In"
  );

  const categories = ["All", ...new Set(menuItems.map((m) => m.category))];

  const filteredMenuItems = menuItems.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  // Cart operations
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.12);
  const cartService = Math.round(cartSubtotal * 0.05);
  const cartTotal = cartSubtotal + cartTax + cartService;

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      addToast("Your cart is empty. Add items from the menu.", "error");
      return;
    }

    const tableObj = tables.find((t) => t.id === selectedTable);
    const linkedRes = chargeToRoom ? reservations.find((r) => r.id === targetReservationId) : null;

    const newOrder = createPOSOrder({
      tableId: selectedTable,
      tableName: tableObj ? tableObj.number : "T1",
      source: orderSource,
      guestName: linkedRes ? linkedRes.guestName : "Dining Guest",
      roomNumber: linkedRes ? linkedRes.roomNumber : null,
      reservationId: linkedRes ? linkedRes.id : null,
      items: cart,
      chargeToFolio: chargeToRoom
    });

    if (newOrder) {
      setCart([]);
      setActiveTab("kitchen");
      // Auto print ticket preview
      setActivePrintDoc({
        title: `Kitchen Order Ticket (KOT) — ${newOrder.orderNumber}`,
        docType: "KITCHEN ORDER TICKET (KOT)",
        data: newOrder
      });
    }
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Food & Beverage Operations
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Sheesh Mahal Restaurant & POS
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Table ordering, instant kitchen tickets (KOT), and live room folio settlements.
            </p>
          </div>

          <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("pos")}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                activeTab === "pos" ? "bg-[#0d2b24] text-[#dfc285] shadow" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Point of Sale (POS)
            </button>
            <button
              onClick={() => setActiveTab("kitchen")}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                activeTab === "kitchen" ? "bg-[#0d2b24] text-[#dfc285] shadow" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Kitchen Order Queue ({restaurantOrders.filter(o => o.status !== "Served").length})
            </button>
          </div>
        </div>

        {/* TAB 1: POINT OF SALE */}
        {activeTab === "pos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Menu Section (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === c
                        ? "bg-[#0d2b24] text-[#dfc285] shadow"
                        : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#c5a059] shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <span
                        className={`absolute top-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          item.veg ? "bg-emerald-600" : "bg-rose-600"
                        }`}
                        title={item.veg ? "Vegetarian" : "Non-Veg"}
                      />
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                          {item.name}
                        </h4>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-serif font-bold text-[#0d2b24] text-sm">
                          ₹{item.price}
                        </span>
                        <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded font-bold text-stone-700 group-hover:bg-[#0d2b24] group-hover:text-white transition-colors">
                          + Add
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Cart Section (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xl space-y-4 sticky top-28 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-serif text-lg font-bold text-[#0d2b24]">
                    Current POS Order
                  </h3>
                  <span className="font-bold text-stone-400 font-mono">
                    {cart.reduce((a, b) => a + b.quantity, 0)} Items
                  </span>
                </div>

                {/* Table & Source Pickers */}
                <div className="space-y-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-stone-500 uppercase block mb-1">
                        Table Selection
                      </label>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium"
                      >
                        {tables.map((t) => (
                          <option key={t.id} value={t.id}>{t.number}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-stone-500 uppercase block mb-1">
                        Order Channel
                      </label>
                      <select
                        value={orderSource}
                        onChange={(e) => setOrderSource(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium"
                      >
                        <option value="Dine-In">Dine-In</option>
                        <option value="Room Service">Room Service</option>
                        <option value="Takeaway">Takeaway</option>
                      </select>
                    </div>
                  </div>

                  {/* Charge to Room Folio Toggle */}
                  <div className="pt-2 border-t border-stone-200 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-800">
                      <input
                        type="checkbox"
                        checked={chargeToRoom}
                        onChange={(e) => setChargeToRoom(e.target.checked)}
                        className="w-4 h-4 accent-[#0d2b24] rounded"
                      />
                      <span>Charge to In-House Guest Folio</span>
                    </label>

                    {chargeToRoom && (
                      <div>
                        <select
                          value={targetReservationId}
                          onChange={(e) => setTargetReservationId(e.target.value)}
                          className="w-full p-2 rounded-xl border border-stone-200 bg-white font-semibold text-stone-900"
                        >
                          <option value="">Select In-House Guest Room...</option>
                          {inHouseGuests.map((g) => (
                            <option key={g.id} value={g.id}>
                              Room {g.roomNumber} — {g.guestName}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="space-y-2 max-h-56 overflow-y-auto divide-y divide-stone-100">
                  {cart.length === 0 ? (
                    <p className="text-stone-400 text-center py-6">
                      Click menu items on the left to add to cart.
                    </p>
                  ) : (
                    cart.map((it) => (
                      <div key={it.id} className="pt-2 flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-2">
                          <strong className="block text-stone-900 truncate">{it.name}</strong>
                          <span className="text-stone-500">₹{it.price} each</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateQuantity(it.id, -1)}
                            className="p-1 text-stone-500 hover:bg-stone-100 rounded"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold font-mono">{it.quantity}</span>
                          <button
                            onClick={() => updateQuantity(it.id, 1)}
                            className="p-1 text-stone-500 hover:bg-stone-100 rounded"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotals */}
                {cart.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-stone-200 text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (12%):</span>
                      <span>₹{cartTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Charge (5%):</span>
                      <span>₹{cartService.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-100">
                      <span>Total:</span>
                      <span className="font-serif text-lg text-[#0d2b24]">₹{cartTotal.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={handleCreateOrder}
                      className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#0d2b24] to-[#164237] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all"
                    >
                      <Send className="w-4 h-4 text-[#c5a059]" />
                      <span>Send to Kitchen (KOT) & Settle</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KITCHEN ORDER QUEUE */}
        {activeTab === "kitchen" && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#0d2b24]">
              Active Kitchen & Bar Order Queue
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {restaurantOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <div>
                        <span className="font-mono text-base font-bold text-[#0d2b24]">
                          {order.orderNumber}
                        </span>
                        <span className="text-[10px] text-stone-400 block">{order.tableName} • {order.timestamp}</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "Served"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "Ready"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-900 animate-pulse"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="py-3 space-y-1.5 text-xs">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-stone-800">
                          <span>{it.quantity}x {it.name}</span>
                          <span className="font-mono text-stone-500">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-stone-500">{order.paymentMethod}</span>
                      <strong className="font-serif text-base text-[#0d2b24]">
                        ₹{order.total.toLocaleString()}
                      </strong>
                    </div>

                    {/* Stage Buttons */}
                    <div className="flex gap-2">
                      {order.status === "Preparing" && (
                        <button
                          onClick={() => updatePOSOrderStatus(order.id, "Ready")}
                          className="flex-1 py-2 bg-blue-700 text-white rounded-xl text-xs font-semibold"
                        >
                          Mark Ready for Service &rarr;
                        </button>
                      )}
                      {order.status === "Ready" && (
                        <button
                          onClick={() => updatePOSOrderStatus(order.id, "Served")}
                          className="flex-1 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                        >
                          Mark Served & Settled &rarr;
                        </button>
                      )}
                      <button
                        onClick={() =>
                          setActivePrintDoc({
                            title: `Restaurant Bill — ${order.orderNumber}`,
                            docType: "RESTAURANT RECEIPT",
                            data: order
                          })
                        }
                        className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center"
                        title="Print Restaurant Bill"
                      >
                        <Printer className="w-4 h-4 text-[#0d2b24]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PmsLayout>
  );
}
