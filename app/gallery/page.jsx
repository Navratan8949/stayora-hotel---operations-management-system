"use client";

import React, { useState } from "react";
import Image from "next/image";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { Sparkles, Maximize2 } from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const images = [
    { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", title: "Grand Palace Facade by Twilight", category: "Architecture" },
    { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", title: "Deluxe Heritage King Bedroom", category: "Rooms" },
    { src: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80", title: "Royal Rajput Suite Salon", category: "Rooms" },
    { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80", title: "Sheesh Mahal Mirrored Dining Hall", category: "Dining" },
    { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80", title: "Lotus Fountain Courtyard", category: "Architecture" },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", title: "Ayurvedic Spa Sanctuary", category: "Wellness" },
    { src: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80", title: "Artisanal High Tea & Pastries", category: "Dining" },
    { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", title: "Marble En-Suite Bathroom", category: "Rooms" },
    { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80", title: "Heritage Jharokha Balcony View", category: "Architecture" }
  ];

  const categories = ["All", "Rooms", "Dining", "Architecture", "Wellness"];

  const filtered = images.filter((img) =>
    selectedCategory === "All" ? true : img.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <PublicNavbar />

      <div className="bg-[#0d2b24] text-white py-16 border-b border-[#c5a059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfc285]">
            Visual Chronicles
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 mb-3">
            Stayora Photo Gallery
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Glimpse into the tranquil courtyards, hand-carved heritage details, and serene luxury of our palace retreat.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Category Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === c
                  ? "bg-[#0d2b24] text-[#dfc285] shadow-md"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#dfc285] font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
