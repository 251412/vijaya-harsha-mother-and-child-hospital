import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, PhoneCall, Search } from "lucide-react";
import { HOSPITAL_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 px-4 bg-[#F8FAFC]">
      <div className="max-w-lg w-full text-center space-y-6 animate-fadeIn">
        {/* Hospital Logo */}
        <div className="flex items-center justify-center mx-auto">
          <Image
            src="/images/logo.png"
            alt="Vijaya Harsha Hospital Logo"
            width={96}
            height={96}
            className="w-24 h-24 object-contain drop-shadow-xl"
          />
        </div>

        {/* 404 Error Heading */}
        <div>
          <p className="text-7xl font-black text-slate-200 leading-none tracking-tight">404</p>
          <h1 className="text-2xl font-extrabold text-[#0A2540] tracking-tight -mt-2">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed">
            The hospital page you&apos;re looking for could not be located. It may have been moved, removed, or you may have entered an incorrect URL.
          </p>
        </div>

        {/* Navigation Shortcuts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] hover:bg-[#07192C] text-white font-bold text-sm shadow-lg transition-all"
          >
            <Home className="w-4 h-4 text-sky-300" />
            <span>Back to Homepage</span>
          </Link>

          <Link
            href="/book-appointment"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-lg transition-all"
          >
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Emergency Quick Access */}
        <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
          <p>In a medical emergency, please call immediately:</p>
          <a
            href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
            className="mt-1 inline-block font-bold text-rose-600 hover:text-rose-800 text-sm"
          >
            {HOSPITAL_CONFIG.emergencyPhoneFormatted}
          </a>
        </div>
      </div>
    </div>
  );
}
