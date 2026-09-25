"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Clock, AlertCircle } from "lucide-react";
import { HOSPITAL_CONFIG } from "@/lib/constants";

export default function EmergencyBanner() {
  return (
    <div
      className="py-3"
      style={{ backgroundColor: "var(--color-emergency-light)" }}
    >
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: "var(--color-emergency)" }}
            ></span>
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: "var(--color-emergency)" }}
            ></span>
          </span>
          <span className="text-xs font-bold" style={{ color: "var(--color-emergency-dark)" }}>
            24/7 Mother & Child Emergency Line
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all"
            style={{ backgroundColor: "var(--color-emergency)" }}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{HOSPITAL_CONFIG.emergencyPhoneFormatted}</span>
          </a>
          <Link
            href="/emergency"
            className="text-xs font-bold transition-colors"
            style={{ color: "var(--color-emergency)" }}
          >
            View Emergency Info →
          </Link>
        </div>
      </div>
    </div>
  );
}
