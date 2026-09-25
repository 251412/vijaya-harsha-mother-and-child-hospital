"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { HOSPITAL_CONFIG } from "@/lib/constants";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  const cleanNumber = HOSPITAL_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(HOSPITAL_CONFIG.whatsappMessage)}`;

  // Delay entrance
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show tooltip after a delay
  useEffect(() => {
    if (!visible) return;
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(tooltipTimer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2 animate-slideUp">
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl shadow-md text-xs max-w-[200px] animate-fadeIn"
          style={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <span className="leading-snug">Have a question? Chat with us on WhatsApp</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss"
            className="flex-shrink-0"
            style={{ color: "var(--color-text-muted)" }}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#25D366",
          boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
        }}
      >
        <MessageCircle className="w-6 h-6" />

        {/* Subtle ring pulse */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(37, 211, 102, 0.3)",
            animation: "pulse-ring 3s ease-out infinite",
          }}
        />
      </a>
    </div>
  );
}
