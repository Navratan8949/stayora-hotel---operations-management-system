"use client";

import React, { useState } from "react";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from "lucide-react";

export default function ContactPage() {
  const { currentProperty, properties, setSelectedPropertyId, addToast } = useStayora();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Enquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast("Please fill in your name, email, and message.", "error");
      return;
    }
    setSubmitted(true);
    addToast("Thank you! Your message has been sent to our concierge desk.", "success");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-16 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Concierge & Assistance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 mb-3">
            Contact & Guest Enquiries
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Our 24-hour reception and reservations team are at your service for stay bookings, airport limousine coordination, and special requests.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#c5a059]">
                Select Property
              </span>
              <div className="flex flex-col gap-2 mt-3">
                {properties.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPropertyId(p.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      p.id === currentProperty.id
                        ? "border-[#0d2b24] bg-white shadow-md ring-2 ring-[#0d2b24]/20"
                        : "border-stone-200 bg-[#faf8f5] hover:bg-white"
                    }`}
                  >
                    <strong className="block text-sm text-stone-900">{p.name}</strong>
                    <span className="text-xs text-stone-500">{p.address}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Address</strong>
                  <span className="text-stone-600">{currentProperty.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Reservations Phone</strong>
                  <span className="text-stone-600">{currentProperty.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Email</strong>
                  <span className="text-stone-600">{currentProperty.email}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Reception & Concierge</strong>
                  <span className="text-stone-600">Open 24 Hours Daily</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-[#0d2b24] mb-2">
              Send a Note to Our Concierge
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              We respond to all direct inquiries promptly within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-900">
                  Message Dispatched to Concierge
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, {name}. A member of our {currentProperty.city} concierge team will reach out to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-stone-700 block mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Suite Booking & Upgrades">Suite Booking & Upgrades</option>
                      <option value="Airport Chauffeur Transfer">Airport Chauffeur Transfer</option>
                      <option value="Private Dining / Events">Private Dining / Events</option>
                      <option value="Corporate / Group Stay">Corporate / Group Stay</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-stone-700 block mb-1">Message or Special Instructions *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How may our team assist your stay?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0d2b24] text-[#dfc285] rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
                >
                  <Send className="w-4 h-4 text-[#c5a059]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
