"use client";

import React, { useState } from"react";
import Image from"next/image";
import { GALLERY_ITEMS, GalleryItemData } from"@/data/seedData";
import LightboxModal from"@/components/LightboxModal";
import { Filter, Maximize2, Tag } from"lucide-react";

const CATEGORIES = [
"All Photos",
"NICU & Facilities",
"Maternity & Rooms",
"Surgery & Technology",
"Pediatrics & OPD",
"Diagnostics",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Photos");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItemData | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return selectedCategory ==="All Photos" || item.category === selectedCategory;
  });

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Banner */}
      <section className="py-20 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor:"rgba(255,255,255,0.12)", color:"var(--color-sage-light)" }}>
            <span>Visual Hospital Tour</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Hospital Gallery &amp; Facilities
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Explore our Level-III NICU, luxury labor suites, modular operation theaters, diagnostic units, and child-friendly outpatient spaces in Srikakulam.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="bg-white border-b py-5 sticky top-[68px] z-20 shadow-sm" style={{ borderColor:"var(--color-border-warm)" }}>
        <div className="container-wide flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider hidden lg:flex items-center gap-1 shrink-0 mr-2" style={{ color:"var(--color-primary-dark)" }}>
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ?"text-white shadow-sm"
                  :"bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              style={{
                backgroundColor: selectedCategory === cat ?"var(--color-primary-dark)" : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
                style={{ borderColor:"var(--color-border-warm)" }}
              >
                {/* Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold leading-snug">{item.title}</h3>
                    <p className="text-xs  line-clamp-2 mt-1" style={{ color:"rgba(255, 255, 255, 0.85)" }}>{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <LightboxModal
          item={activeLightboxItem}
          allItems={filteredItems}
          onClose={() => setActiveLightboxItem(null)}
          onSelectIndex={(index) => setActiveLightboxItem(filteredItems[index])}
        />
      )}
    </div>
  );
}
