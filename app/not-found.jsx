"use client";

import React from "react";
import Link from "next/link";
import { Compass, Home, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 text-stone-800">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#0d2b24]/5 flex items-center justify-center text-[#c5a059]">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase text-[#c5a059]">404 — Suite Not Found</span>
        <h1 className="font-serif text-3xl font-bold text-[#0d2b24] mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          The sanctuary or destination you are seeking cannot be located. Allow us to guide you back to our grand entrance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0d2b24] text-white text-sm font-medium hover:bg-[#164237] transition shadow"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition"
          >
            <Calendar className="w-4 h-4" />
            Explore Suites
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c5a059] text-[#0d2b24] text-sm font-bold hover:brightness-105 transition shadow"
          >
            Staff Login
          </Link>
        </div>
      </div>
    </div>
  );
}
