"use client";

import React, { useState } from"react";
import Link from"next/link";
import { Search, UserCheck, Filter } from"lucide-react";
import { DOCTORS } from"@/data/seedData";
import DoctorCard from"@/components/DoctorCard";

const DEPARTMENTS = [
"All Departments",
"Pediatrics & Neonatal Care",
"Obstetrics & Gynecology",
"Fetal Medicine & Antenatal Care",
"Pediatric Surgery",
];

export default function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept =
      selectedDept ==="All Departments" ||
      doc.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Header Banner */}
      <section className="py-20 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor:"rgba(255,255,255,0.12)", color:"var(--color-sage-light)" }}>
            <span>Specialist Clinicians</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Our Specialist Doctors
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Meet the experienced pediatricians, obstetricians, neonatologists, and pediatric surgeons dedicated to your family&apos;s well-being in Srikakulam.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b py-5 sticky top-[68px] z-20 shadow-sm" style={{ borderColor:"var(--color-border-warm)" }}>
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider hidden lg:flex items-center gap-1 shrink-0" style={{ color:"var(--color-primary-dark)" }}>
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ?"text-white shadow-sm"
                    :"bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                style={{
                  backgroundColor: selectedDept === dept ?"var(--color-primary-dark)" : undefined,
                }}
              >
                {dept}
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
              placeholder="Search doctor or specialization..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none"
              style={{ borderColor:"var(--color-border-warm)" }}
            />
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container-wide">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border p-8 max-w-lg mx-auto" style={{ borderColor:"var(--color-border-warm)" }}>
              <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold" style={{ color:"var(--color-primary-dark)" }}>No doctors match your criteria</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting &ldquo;All Departments&rdquo; or adjusting your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept("All Departments");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredDoctors.map((doc, idx) => (
                <div key={doc.id} id={doc.slug} className="h-full">
                  <DoctorCard doctor={doc} featured={idx < 2} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Emergency / Consultation CTA */}
      <section className="py-16 bg-white border-t text-center" style={{ borderColor:"var(--color-border-warm)" }}>
        <div className="container-narrow space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold" style={{ color:"var(--color-primary-dark)" }}>Need Immediate Medical Consultation?</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our outpatient department operates 6 days a week, with 24/7 coverage for obstetric and neonatal emergencies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/book-appointment" className="btn btn-primary text-xs">
              Book Doctor Appointment
            </Link>
            <a href="tel:08942223456" className="btn btn-secondary text-xs">
              Call Emergency Helpline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
