"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Stethoscope, Filter, Search } from "lucide-react";
import { SERVICES } from "@/data/seedData";
import ServiceCard from "@/components/ServiceCard";

const CATEGORIES = [
  "All Services",
  "Maternity",
  "Neonatology",
  "Pediatrics",
  "Surgery",
  "Preventive",
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategory === "All Services" ||
      service.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "var(--color-ivory)" }}>
      {/* Banner */}
      <section className="py-20 text-white" style={{ backgroundColor: "var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "var(--color-sage-light)" }}>
            <span>Comprehensive Mother &amp; Child Specialities</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Our Clinical Services
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            Tertiary healthcare for women and children: from painless delivery and high-risk obstetrics to Level-III neonatal intensive care and pediatric surgery in Srikakulam.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b py-5 sticky top-[68px] z-20 shadow-sm" style={{ borderColor: "var(--color-border-warm)" }}>
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider hidden lg:flex items-center gap-1 shrink-0" style={{ color: "var(--color-primary-dark)" }}>
              <Filter className="w-3.5 h-3.5" /> Speciality:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? "var(--color-primary-dark)" : undefined,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service or treatment..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none"
              style={{ borderColor: "var(--color-border-warm)" }}
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-wide">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border p-8 max-w-lg mx-auto" style={{ borderColor: "var(--color-border-warm)" }}>
              <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold" style={{ color: "var(--color-primary-dark)" }}>No services match your search</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting &ldquo;All Services&rdquo; or clearing your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Services");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => (
                <div key={service.id} id={service.slug}>
                  <ServiceCard service={service} featured={idx < 2} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-white border-t text-center" style={{ borderColor: "var(--color-border-warm)" }}>
        <div className="container-narrow space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--color-primary-dark)" }}>Need Emergency Obstetric or NICU Admission?</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our 24/7 Emergency Casualty Unit is equipped with immediate ventilator support, emergency delivery setups, and neonatal retrieval transport.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/book-appointment" className="btn btn-primary text-xs">
              Schedule Consultation
            </Link>
            <a href="tel:08942223456" className="btn btn-secondary text-xs">
              Call Emergency Unit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
