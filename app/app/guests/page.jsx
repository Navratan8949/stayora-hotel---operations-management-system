"use client";

import React, { useState } from "react";
import PmsLayout from "../../../components/pms/PmsLayout";
import { useStayora } from "../../../context/StayoraContext";
import { Users, Search, Star, ShieldCheck, Mail, Phone, MapPin, Calendar, Receipt, Plus } from "lucide-react";

export default function GuestDirectoryPage() {
  const { guests, setGuests, reservations, folios, addToast } = useStayora();

  const [searchQuery, setSearchQuery] = useState("");
  const [vipOnly, setVipOnly] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const filteredGuests = guests.filter((g) => {
    if (vipOnly && !g.vip) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = g.name.toLowerCase().includes(q);
      const matchEmail = g.email.toLowerCase().includes(q);
      const matchPhone = g.phone.includes(q);
      const matchCity = g.city && g.city.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchCity;
    }
    return true;
  });

  const toggleVip = (guestId) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === guestId) {
          const newVip = !g.vip;
          addToast(`${g.name} ${newVip ? "promoted to VIP" : "unmarked as VIP"}.`, "info");
          return { ...g, vip: newVip };
        }
        return g;
      })
    );
  };

  return (
    <PmsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-[#c5a059] tracking-wider">
              Hospitality CRM
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-0.5">
              Guest Profiles & Directory ({guests.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Stay histories, lifetime value, personal preferences, and VIP privileges.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
              <input
                type="checkbox"
                checked={vipOnly}
                onChange={(e) => setVipOnly(e.target.checked)}
                className="w-4 h-4 accent-[#0d2b24] rounded"
              />
              <span>Show VIP Guests Only</span>
            </label>
          </div>
        </div>

        {/* Guest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuests.map((guest) => {
            const guestStays = reservations.filter((r) => r.guestId === guest.id);

            return (
              <div
                key={guest.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-stone-100 mb-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                        <span>{guest.name}</span>
                        {guest.vip && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> VIP
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#c5a059]" /> {guest.city}, {guest.country}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleVip(guest.id)}
                      className="p-1.5 text-stone-400 hover:text-amber-500"
                      title={guest.vip ? "Demote from VIP" : "Promote to VIP"}
                    >
                      <Star className={`w-4 h-4 ${guest.vip ? "fill-amber-400 text-amber-400" : ""}`} />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" /> {guest.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" /> {guest.phone}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs p-3 rounded-2xl bg-[#faf8f5] border border-stone-100 mb-4">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Total Stays</span>
                      <strong className="text-stone-900 font-bold">{guest.totalStays}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Lifetime Spend</span>
                      <strong className="text-emerald-800 font-serif font-bold">
                        ₹{guest.totalSpend.toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  {/* Preferences snippet */}
                  {guest.preferences && (
                    <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 mb-4">
                      <strong className="text-stone-800 block mb-0.5">Guest Preferences:</strong>
                      <p className="line-clamp-2">{guest.preferences}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 text-[11px]">
                    ID: {guest.idType || "Verified"}
                  </span>
                  <button
                    onClick={() => setSelectedGuest(guest)}
                    className="font-semibold text-[#0d2b24] hover:underline"
                  >
                    View Stay History &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guest Details Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400">Guest CRM Record</span>
                <h3 className="font-serif text-2xl font-bold text-[#0d2b24]">
                  {selectedGuest.name}
                </h3>
              </div>
              <button onClick={() => setSelectedGuest(null)} className="text-stone-400 hover:text-stone-800">
                &times;
              </button>
            </div>

            <div className="space-y-2 p-4 bg-stone-50 rounded-2xl">
              <p><strong>Email:</strong> {selectedGuest.email}</p>
              <p><strong>Phone:</strong> {selectedGuest.phone}</p>
              <p><strong>City:</strong> {selectedGuest.city}, {selectedGuest.country}</p>
              <p><strong>ID Verified:</strong> {selectedGuest.idType} ({selectedGuest.idNumber})</p>
              <p><strong>Preferences:</strong> {selectedGuest.preferences}</p>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-stone-900 mb-2">
                Stay History & Bookings
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {reservations
                  .filter((r) => r.guestId === selectedGuest.id || r.guestEmail === selectedGuest.email)
                  .map((res) => (
                    <div key={res.id} className="p-3 bg-stone-50 rounded-xl flex justify-between items-center">
                      <div>
                        <strong className="block font-mono">{res.bookingReference}</strong>
                        <span className="text-stone-500">
                          {res.checkIn} &rarr; {res.checkOut} (Room {res.roomNumber})
                        </span>
                      </div>
                      <span className="font-bold text-stone-900 font-serif">
                        ₹{res.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedGuest(null)}
                className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </PmsLayout>
  );
}
