"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: string; // e.g. "18,500+" or "99.4%"
  label: string;
  className?: string;
}

export default function AnimatedCounter({ target, label, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, prefersReducedMotion]);

  const animateValue = () => {
    // Extract numeric part from target like "18,500+" → 18500
    const numericStr = target.replace(/[^0-9.]/g, "");
    const numericTarget = parseFloat(numericStr);
    if (isNaN(numericTarget)) {
      setDisplayValue(target);
      return;
    }

    const suffix = target.replace(/[0-9.,]/g, ""); // e.g. "+" or "%"
    const hasComma = target.includes(",");
    const hasDecimal = numericStr.includes(".");
    const duration = 1200; // ms
    const steps = 40;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = numericTarget * easedProgress;

      let formatted: string;
      if (hasDecimal) {
        formatted = currentVal.toFixed(1);
      } else {
        const rounded = Math.round(currentVal);
        formatted = hasComma ? rounded.toLocaleString("en-IN") : String(rounded);
      }

      setDisplayValue(formatted + suffix);

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(target); // Ensure exact final value
      }
    }, stepDuration);
  };

  return (
    <div ref={ref} className={`flex flex-col items-center text-center ${className}`}>
      <span
        className="text-3xl sm:text-4xl font-extrabold tabular-nums"
        style={{ color: "var(--color-primary)", fontVariantNumeric: "tabular-nums" }}
      >
        {displayValue}
      </span>
      <span className="text-xs font-semibold mt-1" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </span>
    </div>
  );
}
