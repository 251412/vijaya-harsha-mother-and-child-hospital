"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "scaleUp";
  delay?: number;
  duration?: number;
  className?: string;
  viewportAmount?: number | "some" | "all";
}

export default function ScrollReveal({
  children,
  animation = "slideUp",
  delay = 0,
  duration = 0.55,
  className = "",
  viewportAmount = 0.15,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const getVariants = () => {
    // Subtler motion values — less aggressive than before
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        };
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: -24 },
          visible: { opacity: 1, x: 0 },
        };
      case "slideRight":
        return {
          hidden: { opacity: 0, x: 24 },
          visible: { opacity: 1, x: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: { opacity: 1, scale: 1 },
        };
      case "scaleUp":
        return {
          hidden: { opacity: 0, y: 16, scale: 0.97 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      default:
        return {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
