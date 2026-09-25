"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, Award } from "lucide-react";
import { DoctorData } from "@/data/seedData";

interface DoctorCardProps {
  doctor: DoctorData;
  featured?: boolean;
}

export default function DoctorCard({ doctor, featured = false }: DoctorCardProps) {
  return (
    <div
      className={`group relative flex flex-col md:flex-row bg-white rounded-3xl transition-all duration-500 ease-out hover:-translate-y-1 ${
        featured ? "ring-2 ring-[var(--color-primary)] ring-offset-4" : ""
      }`}
      style={{
        boxShadow: "0 10px 40px -10px rgba(26, 92, 94, 0.08)",
      }}
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ivory)] to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none" />

      {/* Image Column - Creative Arch Design */}
      <div className="md:w-5/12 p-4 shrink-0 z-10 flex flex-col">
        <div className="relative w-full flex-1 min-h-[300px] overflow-hidden rounded-t-[100px] rounded-b-3xl" style={{ border: "4px solid var(--color-ivory)" }}>
          <Image
            src={doctor.photoUrl}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/40 via-transparent to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Mobile overlay title */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center md:hidden">
            <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/90 text-[var(--color-primary-dark)] backdrop-blur-md shadow-lg">
              {doctor.department}
            </span>
          </div>
        </div>
      </div>

      {/* Content Column */}
      <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-5 z-10">
        <div className="space-y-4">
          {/* Department badge (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                backgroundColor: "var(--color-sage-light)",
                color: "var(--color-primary-dark)",
              }}
            >
              {doctor.department}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" style={{ color: "var(--color-primary)" }} />
              {doctor.experienceYears}+ Years Exp.
            </span>
          </div>

          <div className="space-y-1.5">
            <h3
              className="font-serif text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-[var(--color-primary)] transition-colors"
              style={{ color: "var(--color-text)" }}
            >
              {doctor.name}
            </h3>
            <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--color-primary-dark)", opacity: 0.8 }}>
              {doctor.qualification}
            </p>
          </div>

          <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {doctor.specialization}
          </p>

          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {doctor.bio}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-5 mt-auto border-t border-slate-100 flex items-center justify-end gap-2">
            <Link
              href={`/book-appointment?doctor=${doctor.slug}`}
              className="btn btn-primary text-xs flex-1 justify-center py-2.5 px-5 flex items-center gap-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book
            </Link>
            <Link
              href={`/doctors#${doctor.slug}`}
              className="btn btn-secondary text-xs justify-center py-2.5 px-4 flex items-center gap-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200"
            >
              Profile
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
        </div>
      </div>
    </div>
  );
}
