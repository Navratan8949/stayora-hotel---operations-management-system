"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-20 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Our Story & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-2 mb-4 tracking-tight">
            Craftsmanship, Heritage & Heart
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Stayora was born from a desire to honour India&rsquo;s living royal architecture while engineering a seamless modern hospitality experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-20">
        {/* Intro Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#c5a059]">
              The Rajputana Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d2b24]">
              Where Ancient Courtyards Meet Modern Intuition
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Nestled in the prestigious Civil Lines of Jaipur, Stayora Grand Jaipur was envisioned as a living sanctuary. Rather than mimicking past styles with synthetic finishes, our restoration brought together third-generation stone carvers, lime-plaster masters, and woodturners from Shekhawati.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Each room represents an intimate dialogue between centuries-old Rajputana symmetry and modern conveniences—from organic Egyptian linen to high-speed fiber connectivity and touchless room service integration.
            </p>
            <div className="pt-2">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110"
              >
                <span>View The Accommodations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              alt="Stayora Grand Heritage Facade"
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
        </div>

        {/* Developer Brand Feature: Code Pe Charcha */}
        <div className="bg-[#0b241e] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#c5a059]/30">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#dfc285] rounded-full text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Software Demonstration by Code Pe Charcha</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-white">
              “Turn Hotel Visits Into Bookings—with a Website That Works.”
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Stayora is engineered by <strong>Code Pe Charcha</strong> as a benchmark commercial demonstration for boutique hotels, heritage resorts, and small luxury hotel groups. It proves how an editorial, visually intoxicating guest booking engine seamlessly ties into an operational property management system (PMS)—eliminating data silos between reception, housekeeping, billing, and restaurant POS.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-medium">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-stone-200">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Zero Double-Bookings Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-stone-200">
                <Award className="w-4 h-4 text-[#c5a059]" />
                <span>Integrated Live Guest Folios & Housekeeping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
