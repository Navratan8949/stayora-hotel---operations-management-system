"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStayora } from "../../context/StayoraContext";
import { STAYORA_DEMO_STAFF, DEFAULT_DEMO_PASSWORD } from "./stayoraDemoStaff";
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  KeyRound,
  CheckCircle2,
  HelpCircle,
  X,
  Hotel,
  Clock,
  ArrowLeft
} from "lucide-react";

export default function StayoraLoginView() {
  const router = useRouter();
  const { login, currentProperty, properties, setSelectedPropertyId } = useStayora();

  const [selectedStaffId, setSelectedStaffId] = useState(STAYORA_DEMO_STAFF[0].id);
  const [emailInput, setEmailInput] = useState(STAYORA_DEMO_STAFF[0].email);
  const [passwordInput, setPasswordInput] = useState(DEFAULT_DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const handleSelectPersona = (staff) => {
    setSelectedStaffId(staff.id);
    setEmailInput(staff.email);
    setPasswordInput(DEFAULT_DEMO_PASSWORD);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(emailInput, passwordInput);
      setIsLoading(false);
      router.push("/app");
    }, 450);
  };

  const handleDirectPersonaLogin = (staff) => {
    handleSelectPersona(staff);
    setIsLoading(true);
    setTimeout(() => {
      login(staff.email, DEFAULT_DEMO_PASSWORD);
      setIsLoading(false);
      router.push("/app");
    }, 350);
  };

  const selectedStaff = STAYORA_DEMO_STAFF.find((s) => s.id === selectedStaffId) || STAYORA_DEMO_STAFF[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col justify-between selection:bg-[#c5a059]/20 selection:text-[#0d2b24]">
      {/* Top Header / Return Bar */}
      <header className="w-full bg-[#0d2b24] text-white border-b border-[#c5a059]/30 py-3.5 px-4 sm:px-8 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfc285] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Guest Portal</span>
          </Link>
          <span className="text-white/30 hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-300">
            <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{currentProperty.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuideModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#dfc285]" />
            <span className="hidden sm:inline">Role Credentials</span> Guide
          </button>
          <Link
            href="/app"
            className="text-xs font-semibold text-[#0d2b24] bg-[#c5a059] hover:bg-[#dfc285] px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            Skip to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        {/* Left Column: Brand & 1-Click Persona Grid */}
        <div className="w-full lg:w-7/12 space-y-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 border border-[#c5a059]/30 text-[#0d2b24] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Stayora Cloud PMS & Front Desk Suite</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d2b24] leading-tight">
              Hospitality Operations Authentication
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Select any verified hotel staff persona below for instant 1-click single-sign-on or enter your custom PMS credentials. Each persona unlocks role-tailored front office workflows.
            </p>
          </div>

          {/* Quick Persona Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>1-Click Verified Staff Personas (Demo Sandbox)</span>
              </span>
              <span className="text-[11px] text-stone-400">Password: <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800 font-mono font-bold">admin123</code></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STAYORA_DEMO_STAFF.map((staff) => {
                const isSelected = selectedStaffId === staff.id;
                return (
                  <div
                    key={staff.id}
                    onClick={() => handleSelectPersona(staff)}
                    className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer flex flex-col justify-between gap-2.5 group relative ${
                      isSelected
                        ? "bg-white border-[#c5a059] shadow-md ring-2 ring-[#c5a059]/30"
                        : "bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1.5 bg-stone-100 rounded-lg shrink-0">
                          {staff.avatar}
                        </span>
                        <div>
                          <p className="font-bold text-stone-900 text-sm leading-snug group-hover:text-[#0d2b24] transition-colors">
                            {staff.name}
                          </p>
                          <p className="text-xs font-semibold text-[#0d2b24] flex items-center gap-1">
                            <span>{staff.role}</span>
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${staff.badgeColor}`}>
                        {staff.department}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                      {staff.description}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400 flex items-center gap-1 font-mono text-[10px]">
                        <Clock className="w-3 h-3" />
                        <span>{staff.shift}</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDirectPersonaLogin(staff);
                        }}
                        className="text-[#0d2b24] hover:text-[#c5a059] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Log in as this role</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Micro Trust Features */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full In-Memory & Local Storage Persistence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Simulated Multi-Property Switching</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant Guest Folio Audits</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="w-full lg:w-5/12 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
            {/* Form Header */}
            <div className="text-center space-y-1.5 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#0d2b24] to-[#15473c] text-[#dfc285] flex items-center justify-center shadow-md">
                <Hotel className="w-6 h-6 text-[#c5a059]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0d2b24]">
                Staff Sign In
              </h2>
              <p className="text-xs text-stone-500">
                Active Property: <strong className="text-stone-800">{currentProperty.name}</strong>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Persona Indicator */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedStaff.avatar}</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Current Target</span>
                    <strong className="text-stone-900">{selectedStaff.name}</strong> ({selectedStaff.role})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setGuideModalOpen(true)}
                  className="text-[11px] font-bold text-[#c5a059] hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Property Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Hotel Location / Property
                </label>
                <select
                  value={currentProperty.id}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all font-medium"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.city}, {p.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Email / Staff ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Staff Email / ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="staff@stayora.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Security Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setPasswordInput(DEFAULT_DEMO_PASSWORD)}
                    className="text-[11px] text-[#c5a059] font-semibold hover:underline"
                  >
                    Reset to default
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-stone-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-stone-300 text-[#0d2b24] focus:ring-[#c5a059]"
                  />
                  <span>Remember this workstation</span>
                </label>
                <span className="text-[11px] text-stone-400">SSL Encrypted</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0d2b24] to-[#15473c] hover:from-[#11382f] hover:to-[#1a5749] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0d2b24]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Hotel Operations (PMS)</span>
                    <ArrowRight className="w-4 h-4 text-[#dfc285]" />
                  </>
                )}
              </button>
            </form>

            {/* Guest Website Shortcut */}
            <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100 space-y-1">
              <p>Looking to reserve a suite as a guest?</p>
              <Link
                href="/booking"
                className="text-xs font-bold text-[#0d2b24] hover:text-[#c5a059] transition-colors underline"
              >
                Go to Direct Booking Engine
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-stone-200 py-4 px-4 text-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Stayora Luxury Hotels & Integrated Property Management System. Developed by Code Pe Charcha.</p>
      </footer>

      {/* Credentials Guide Modal */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-serif text-lg font-bold text-[#0d2b24]">
                  Stayora PMS Demo Persona Directory
                </h3>
              </div>
              <button
                onClick={() => setGuideModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Every staff member listed has a shared demonstration password:{" "}
              <strong className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-900">
                admin123
              </strong>
              . Click on any role to immediately apply credentials to the login form.
            </p>

            <div className="space-y-2.5">
              {STAYORA_DEMO_STAFF.map((staff) => (
                <div
                  key={staff.id}
                  onClick={() => {
                    handleSelectPersona(staff);
                    setGuideModalOpen(false);
                  }}
                  className="p-3 rounded-xl border border-stone-200 hover:border-[#c5a059] hover:bg-amber-50/30 transition-colors cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{staff.avatar}</span>
                    <div>
                      <p className="font-bold text-stone-900 text-xs">{staff.name}</p>
                      <p className="text-[11px] text-stone-500 font-mono">{staff.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${staff.badgeColor}`}>
                      {staff.role}
                    </span>
                    <p className="text-[10px] text-stone-400 mt-1">{staff.shift}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setGuideModalOpen(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
