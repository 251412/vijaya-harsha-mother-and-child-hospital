"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CheckCircle2, Calendar } from "lucide-react";
import { ServiceData } from "@/data/seedData";

interface ServiceCardProps {
  service: ServiceData;
  featured?: boolean;
}

export default function ServiceCard({ service, featured = false }: ServiceCardProps) {
  return (
    <div
      id={service.slug}
      className={`flex flex-col rounded-2xl overflow-hidden h-full group card-hover ${
        featured ? "border-2" : ""
      }`}
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: featured ? "var(--color-primary)" : "var(--color-border-warm)",
      }}
    >
      {/* Image with zoom */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden img-zoom">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(45,41,38,0.35) 0%, transparent 60%)" }}
        />

        {/* Category Tag */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {service.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3
            className="font-serif text-lg font-bold tracking-tight leading-snug group-hover:text-[var(--color-primary)] transition-colors"
            style={{ color: "var(--color-primary-dark)" }}
          >
            {service.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Key Benefits List */}
          {service.benefits && service.benefits.length > 0 && (
            <ul className="pt-2 space-y-1">
              {service.benefits.slice(0, 3).map((benefit, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-black/5 flex items-center justify-between gap-2">
          <Link
            href={`/book-appointment?department=${encodeURIComponent(service.category)}`}
            className="inline-flex items-center gap-1 text-xs font-bold transition-colors"
            style={{ color: "var(--color-primary)" }}
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Specialist
          </Link>

          <Link
            href={`/services#${service.slug}`}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
