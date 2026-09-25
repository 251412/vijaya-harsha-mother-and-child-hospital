"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, Award, Briefcase } from "lucide-react";
import { DoctorData } from "@/data/seedData";

interface DoctorCardProps {
  doctor: DoctorData;
  featured?: boolean;
}

export default function DoctorCard({ doctor, featured = false }: DoctorCardProps) {
  return (
    <div
      className={`card group overflow-hidden flex flex-col h-full md:flex-row transition-all duration-300 hover:shadow-xl ${
        featured ? "border-2" : ""
      }`}
      style={{
        borderColor: featured ? "var(--color-primary)" : "var(--color-border-warm)",
      }}
    >
      {/* Portrait Image Column */}
      <div className="md:w-5/12 relative min-h-[260px] md:min-h-full bg-slate-100 overflow-hidden shrink-0">
        <Image
          src={doctor.photoUrl}
          alt={doctor.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
        
        {/* Mobile overlay title */}
        <div className="absolute bottom-3 left-3 right-3 text-white md:hidden">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
            {doctor.department}
          </span>
        </div>
      </div>

      {/* Content Column */}
      <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Department badge (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(102, 155, 188, 0.15)",
                color: "var(--color-primary-dark)",
              }}
            >
              {doctor.department}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {doctor.experienceYears}+ Years Exp.
            </span>
          </div>

          <div>
            <h3
              className="font-serif text-xl sm:text-2xl font-bold tracking-tight group-hover:text-[var(--color-primary)] transition-colors"
              style={{ color: "var(--color-primary-dark)" }}
            >
              {doctor.name}
            </h3>
            <p className="text-xs font-semibold mt-1" style={{ color: "var(--color-primary)" }}>
              {doctor.qualification}
            </p>
          </div>

          <p className="text-xs font-medium text-slate-600">
            {doctor.specialization}
          </p>

          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
            {doctor.bio}
          </p>

          <div className="pt-3 border-t border-black/5 text-xs text-slate-500 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.consultationTimings}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href={`/book-appointment?doctor=${doctor.slug}`}
            className="btn btn-primary text-xs w-full sm:w-auto justify-center py-2.5 px-4 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Consultation
          </Link>
          <Link
            href={`/doctors#${doctor.slug}`}
            className="btn btn-secondary text-xs w-full sm:w-auto justify-center py-2.5 px-4 flex items-center gap-1"
          >
            Full Profile
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
