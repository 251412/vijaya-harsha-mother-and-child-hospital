"use client";

import React, { useState, useEffect, useCallback } from"react";
import Link from"next/link";
import Image from"next/image";
import { usePathname } from"next/navigation";
import {
  PhoneCall,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Menu,
  X,
  Search,
  Baby,
  ChevronRight,
  ArrowRight,
} from"lucide-react";
import { HOSPITAL_CONFIG } from"@/lib/constants";
import SearchModal from"./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name:"Home", href:"/" },
    { name:"About", href:"/about" },
    { name:"Doctors", href:"/doctors" },
    { name:"Services", href:"/services" },
    { name:"Garbhasanskar", href:"/sattva-garbhasanskar" },
    { name:"Gallery", href:"/gallery" },
    { name:"Blog", href:"/blog" },
    { name:"Contact", href:"/contact" },
  ];

  // Scroll listener for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow ="hidden";
    } else {
      document.body.style.overflow ="";
    }
    return () => { document.body.style.overflow =""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Top Info Bar — collapses on scroll */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            scrolled ?"max-h-0 opacity-0" :"max-h-12 opacity-100"
          }`}
          style={{ background:"var(--color-primary-dark)" }}
        >
          <div className="container-wide flex justify-between items-center py-1.5" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor:"var(--color-emergency)" }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor:"var(--color-emergency)" }}></span>
                </span>
                <span style={{ color:"var(--color-secondary-light)" }}>Emergency:</span>
                <a
                  href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
                  className="font-bold text-white hover: underline" style={{ color:"rgba(255, 255, 255, 0.85)" }}
                >
                  {HOSPITAL_CONFIG.emergencyPhoneFormatted}
                </a>
              </span>
              <span className="hidden md:flex items-center gap-1 text-[11px]" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
                <Clock className="w-3 h-3" />
                OPD: Mon–Sat 9:30 AM – 9:00 PM
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden lg:flex items-center gap-1 text-[11px]" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
                <MapPin className="w-3 h-3" />
                Visakha Colony, Srikakulam
              </span>
              <a
                href={`tel:${HOSPITAL_CONFIG.phone}`}
                className="flex items-center gap-1 font-semibold  hover:text-white text-[11px]" style={{ color:"rgba(255, 255, 255, 0.85)" }}
              >
                <PhoneCall className="w-3 h-3" />
                {HOSPITAL_CONFIG.phoneFormatted}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`w-full transition-all duration-300 ${
            scrolled
              ?"py-2 shadow-md"
              :"py-3 shadow-sm"
          }`}
          style={{
            backgroundColor: scrolled ?"rgba(253, 250, 246, 0.97)" :"rgba(253, 250, 246, 0.95)",
            backdropFilter:"blur(16px)",
            WebkitBackdropFilter:"blur(16px)",
            borderBottom: `1px solid ${scrolled ?"var(--color-border)" :"var(--color-border-light)"}`,
          }}
        >
          <div className="container-wide flex items-center justify-between gap-2 sm:gap-4">

            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group min-w-0 focus:outline-none"
            >
              <Image
                src="/images/logo.png"
                alt="Vijaya Harsha Mother & Child Hospital Logo"
                width={52}
                height={52}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                priority
              />
              <div className="flex flex-col leading-none min-w-0">
                <span className="text-[13px] sm:text-[15px] md:text-[16px] font-extrabold tracking-tight truncate" style={{ color:"var(--color-text)" }}>
                  VIJAYA HARSHA
                </span>
                <span className="text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest mt-0.5 truncate" style={{ color:"var(--color-primary)" }}>
                  Mother &amp; Child Hospital
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-2 text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap link-underline ${
                      isActive
                        ?"font-bold"
                        :"hover:opacity-80"
                    }`}
                    style={{
                      color: isActive ?"var(--color-primary)" :"var(--color-text-secondary)",
                    }}
                  >
                    {link.name}
                    {isActive && (
                      <span
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                        style={{ backgroundColor:"var(--color-primary)" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color:"var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color ="var(--color-text)"; e.currentTarget.style.backgroundColor ="var(--color-bg-alt)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color ="var(--color-text-muted)"; e.currentTarget.style.backgroundColor ="transparent"; }}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Emergency */}
              <Link
                href="/emergency"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap"
                style={{
                  backgroundColor:"var(--color-emergency-light)",
                  color:"var(--color-emergency)",
                  border:"1px solid var(--color-emergency)",
                  borderColor:"rgba(196, 68, 74, 0.2)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor:"var(--color-emergency)" }}></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor:"var(--color-emergency)" }}></span>
                </span>
                Emergency
              </Link>

              {/* Book Appointment CTA */}
              <Link
                href="/book-appointment"
                className="btn-primary !py-2 !px-4 !text-xs group whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                Book Appointment
                <ArrowRight className="w-3 h-3 opacity-60 arrow-animate" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5 xl:hidden flex-shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="p-1.5 sm:p-2 rounded-lg transition-colors"
                style={{ color:"var(--color-text-secondary)" }}
              >
                <Search className="w-4 h-4 sm:w-4 sm:h-4" />
              </button>

              <Link
                href="/emergency"
                aria-label="Emergency"
                className="p-1.5 sm:p-2 rounded-lg"
                style={{
                  backgroundColor:"var(--color-emergency-light)",
                  color:"var(--color-emergency)",
                }}
              >
                <AlertCircle className="w-4 h-4 sm:w-4 sm:h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-1.5 sm:p-2 rounded-lg transition-colors"
                style={{ color:"var(--color-text)" }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Drawer — slide from right */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 animate-fadeIn"
              style={{ backgroundColor:"rgba(45, 41, 38, 0.3)" }}
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm flex flex-col animate-slideIn"
              style={{
                backgroundColor:"var(--color-bg)",
                boxShadow:"-8px 0 32px rgba(45, 41, 38, 0.15)",
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4" style={{ borderBottom:"1px solid var(--color-border-light)" }}>
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/logo.png"
                    alt="Vijaya Harsha Hospital Logo"
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="text-sm font-extrabold" style={{ color:"var(--color-text)" }}>
                      VIJAYA HARSHA
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color:"var(--color-primary)" }}>
                      Mother &amp; Child Hospital
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg"
                  style={{ color:"var(--color-text-muted)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-1 mb-6">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-all"
                        style={{
                          backgroundColor: isActive ?"var(--color-primary)" :"transparent",
                          color: isActive ?"white" :"var(--color-text-secondary)",
                        }}
                      >
                        <ChevronRight
                          className="w-3.5 h-3.5"
                          style={{ color: isActive ?"rgba(255,255,255,0.6)" :"var(--color-text-muted)" }}
                        />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile CTAs */}
                <div className="flex flex-col gap-2 pt-4" style={{ borderTop:"1px solid var(--color-border-light)" }}>
                  <Link
                    href="/book-appointment"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold text-sm"
                    style={{ backgroundColor:"var(--color-primary)" }}
                  >
                    <Calendar className="w-4 h-4 opacity-70" />
                    Book Appointment
                  </Link>
                  <Link
                    href="/emergency"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold text-sm"
                    style={{ backgroundColor:"var(--color-emergency)" }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    24/7 Emergency
                  </Link>
                </div>

                {/* Contact info */}
                <div className="mt-6 pt-4 text-xs space-y-2" style={{ borderTop:"1px solid var(--color-border-light)", color:"var(--color-text-muted)" }}>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color:"var(--color-primary)" }} />
                    {HOSPITAL_CONFIG.address.full}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" style={{ color:"var(--color-primary)" }} />
                    Reception: {HOSPITAL_CONFIG.phoneFormatted}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {searchOpen && <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
    </>
  );
}
