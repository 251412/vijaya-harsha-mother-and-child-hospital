"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");
    
    if (!hasSeenPopup) {
      // Delay popup by 1.5 seconds for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let closeTimer: NodeJS.Timeout;
    if (isOpen) {
      closeTimer = setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenWelcomePopup", "true");
      }, 5000);
    }
    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenWelcomePopup", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Popup Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-welcome-popup z-10 flex flex-col">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Content */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-[#FDF9F4] flex items-center justify-center">
          <Image
            src="/images/sattva-popup.jpg"
            alt="Welcome to Sattva Garbhasanskar"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Text Content */}
        <div className="p-6 sm:p-8 text-center bg-white border-t border-slate-100">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-primary-dark)] mb-3">
            Welcome to Sattva Garbhasanskar
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
            Experience holistic maternity care combining ancient wisdom with modern medicine for the absolute well-being of mother and baby.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/sattva-garbhasanskar" 
              onClick={handleClose}
              className="btn-primary py-3 px-6 rounded-xl font-bold flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <span>Explore Sattva</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={handleClose}
              className="btn-secondary py-3 px-6 rounded-xl font-bold w-full sm:w-auto justify-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
