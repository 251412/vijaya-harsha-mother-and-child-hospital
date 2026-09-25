import React from"react";
import Link from"next/link";
import Image from"next/image";
import {
  Baby,
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Navigation,
  Heart,
  ArrowUp,
  Calendar,
  ChevronRight,
  AlertCircle,
} from"lucide-react";
import { HOSPITAL_CONFIG } from"@/lib/constants";

export default function Footer() {
  const navColumns = [
    {
      title:"Hospital",
      links: [
        { name:"About Us", href:"/about" },
        { name:"Our Doctors", href:"/doctors" },
        { name:"Gallery & Facilities", href:"/gallery" },
        { name:"Contact", href:"/contact" },
      ],
    },
    {
      title:"Patient Care",
      links: [
        { name:"Clinical Services", href:"/services" },
        { name:"Book Appointment", href:"/book-appointment" },
        { name:"Health Blog", href:"/blog" },
        { name:"24/7 Emergency", href:"/emergency" },
      ],
    },
    {
      title:"Key Specialities",
      links: [
        { name:"Level-III NICU", href:"/services#level-iii-nicu" },
        { name:"Painless Delivery", href:"/services#painless-delivery" },
        { name:"High-Risk Obstetrics", href:"/services#high-risk-pregnancy" },
        { name:"Pediatric ICU", href:"/services#pediatric-icu" },
      ],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor:"var(--color-primary-dark)",
        color:"rgba(255,255,255,0.85)",
      }}
    >
      {/* Pre-footer Emergency Strip */}
      <div
        className="py-4"
        style={{
          backgroundColor:"var(--color-primary)",
          borderBottom:"1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor:"var(--color-emergency)" }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor:"var(--color-emergency)" }}></span>
            </span>
            <span className="text-xs text-white font-bold">
              24/7 Emergency: Mother, Newborn & Child
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs"
              style={{ backgroundColor:"var(--color-emergency)", color:"white" }}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {HOSPITAL_CONFIG.emergencyPhoneFormatted}
            </a>
            <a
              href={`tel:${HOSPITAL_CONFIG.ambulancePhone}`}
              className="text-xs font-bold  hover:text-white" style={{ color:"rgba(255, 255, 255, 0.85)" }}
            >
              Ambulance: {HOSPITAL_CONFIG.ambulancePhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo.png"
                alt="Vijaya Harsha Mother & Child Hospital Logo"
                width={48}
                height={48}
                className="w-11 h-11 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col leading-none">
                <span className="text-[15px] md:text-[16px] font-extrabold text-white tracking-tight">
                  VIJAYA HARSHA
                </span>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color:"var(--color-sage-light)" }}>
                  Mother &amp; Child Hospital
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed max-w-sm" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
              Premier mother and child healthcare in Srikakulam, Andhra Pradesh. Specialized obstetrics, Level-III NICU, pediatric intensive care, and comprehensive family-centered medicine since 2003.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color:"var(--color-sage-light)" }} />
                <span>{HOSPITAL_CONFIG.address.full}</span>
              </p>
              <p className="flex items-center gap-2" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" style={{ color:"var(--color-sage-light)" }} />
                <a
                  href={`tel:${HOSPITAL_CONFIG.phone}`}
                  className="font-semibold text-white hover:text-white"
                >
                  {HOSPITAL_CONFIG.phoneFormatted}
                </a>
              </p>
              <p className="flex items-center gap-2" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color:"var(--color-sage-light)" }} />
                <span>{HOSPITAL_CONFIG.workingHours.opdGeneral}</span>
              </p>
            </div>

            {/* Map CTA */}
            <a
              href={HOSPITAL_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold hover:text-white transition-colors"
              style={{ color:"var(--color-sage-light)" }}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open Google Maps Directions</span>
            </a>
          </div>

          {/* Navigation Columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs font-medium  hover:text-white transition-colors flex items-center gap-1.5" style={{ color:"rgba(255, 255, 255, 0.85)" }}
                    >
                      <ChevronRight className="w-3 h-3 opacity-40" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div
        className="py-5"
        style={{ borderTop:"1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px]  text-center sm:text-left" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            © {new Date().getFullYear()} Vijaya Harsha Mother & Child Hospital, Srikakulam. All rights reserved.
          </p>
          <p className="text-[11px]  flex items-center gap-1" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Made with <Heart className="w-3 h-3" style={{ color:"var(--color-secondary)" }} /> in Srikakulam
          </p>
        </div>
      </div>
    </footer>
  );
}
