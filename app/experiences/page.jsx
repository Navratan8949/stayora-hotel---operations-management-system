"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { useStayora } from "../../context/StayoraContext";
import { Sparkles, Clock, MapPin, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function ExperiencesPage() {
  const { currentProperty, addToast } = useStayora();
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      id: "exp_amber",
      title: "Private Amber Fort & Anokhi Heritage Walk",
      duration: "4.5 Hours",
      timing: "Morning (07:30 - 12:00)",
      price: 4500,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      description: "Accompanied by our resident historian, journey up the Maota lake ramparts, discover secret elephant gates, and watch traditional woodblock carvers."
    },
    {
      id: "exp_hightea",
      title: "Rooftop Sunset High Tea with Classical Sitar",
      duration: "2 Hours",
      timing: "Sunset (17:00 - 19:00)",
      price: 1500,
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      description: "Indulge in artisanal Makaibari first-flush teas, Rajasthani savoury kachoris, and freshly baked scones while watching the sunset over the Aravali hills."
    },
    {
      id: "exp_spa",
      title: "Jharokha Ayurvedic Royal Shirodhara & Abhyanga",
      duration: "90 Minutes",
      timing: "By Appointment",
      price: 5200,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "An authentic healing ritual with warm herbal oils poured continuously onto the third eye chakra, followed by full-body lymphatic rejuvenation."
    },
    {
      id: "exp_cooking",
      title: "Masterclass with Royal Khansama (Chef Harish)",
      duration: "3 Hours",
      timing: "Midday (11:00 - 14:00)",
      price: 3800,
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      description: "Step into our private demo kitchen to master authentic smoke-infused Laal Maas, handcrafted Ghewar, and slow-steeped saffron spices."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-16 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Curated Journeys
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 mb-3">
            Bespoke Jaipur Heritage Experiences
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in Rajasthan&rsquo;s living legacy through private monument access, cultural performances, and wellness rituals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#0d2b24]/90 text-[#dfc285] px-3 py-1 rounded-full text-xs font-semibold">
                  {exp.duration}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold text-stone-900 shadow">
                  ₹{exp.price.toLocaleString()} <span className="text-stone-500 font-normal">/ guest</span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0d2b24] mb-2 group-hover:text-[#c5a059] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <p className="text-xs text-[#c5a059] font-medium flex items-center gap-1.5 mb-6">
                    <Clock className="w-3.5 h-3.5" /> Timing: {exp.timing}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Includes private escort & refreshments
                  </span>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(exp.title)}`}
                    className="px-5 py-2.5 bg-[#0d2b24] text-[#dfc285] rounded-xl text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow"
                  >
                    Enquire / Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
