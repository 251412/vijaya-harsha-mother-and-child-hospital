"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Sparkles } from "lucide-react";

let isFirstLoad = true;

// Animated floating heart component
const FloatingHeart = ({ delay, left, size }: { delay: number; left: string; size: number }) => (
  <motion.div
    className="absolute text-rose-300/80 pointer-events-none z-10"
    style={{ left }}
    initial={{ y: 20, opacity: 0, scale: 0.6, rotate: 0 }}
    animate={{
      y: [-10, -70],
      opacity: [0, 0.9, 0],
      scale: [0.6, 1.25, 0.9],
      rotate: [-15, 15, -10],
    }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  >
    <Heart style={{ width: size, height: size, fill: "rgba(244, 114, 182, 0.5)" }} />
  </motion.div>
);

export default function CinematicTransition() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  // Check reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      : false;

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isFirstLoad) {
      isFirstLoad = false;
    } else {
      setShouldAnimate(true);
      setIsActive(true);

      const timeout = setTimeout(() => {
        setIsActive(false);
      }, 700); // 700ms — premium cinematic speed

      return () => clearTimeout(timeout);
    }
  }, [pathname, prefersReducedMotion]);

  if (!shouldAnimate || prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at center, rgba(38, 124, 127, 0.85) 0%, rgba(15, 48, 50, 0.92) 75%, rgba(10, 32, 34, 0.96) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: isActive ? 0.3 : 0.45, ease: "easeInOut" }}
    >
      {/* Radiant Background Heartbeat Ripple */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-72 h-72 rounded-full border border-rose-300/20 bg-rose-400/5"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: [0.6, 1.8], opacity: [0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="w-96 h-96 rounded-full border border-teal-300/20 bg-teal-400/5"
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{ scale: [0.5, 1.9], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Floating Hearts Animation Layer */}
      <div className="relative w-72 h-44 pointer-events-none">
        <FloatingHeart delay={0} left="15%" size={18} />
        <FloatingHeart delay={0.3} left="35%" size={22} />
        <FloatingHeart delay={0.6} left="65%" size={20} />
        <FloatingHeart delay={0.9} left="82%" size={16} />
      </div>

      {/* Main Mother & Baby Hugging Visualization Card */}
      <motion.div
        className="relative flex flex-col items-center gap-4 text-center px-6 -mt-36 z-20"
        initial={{ opacity: 0, scale: 0.82, y: 15 }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.88,
          y: isActive ? 0 : -10,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Mom and Baby Hugging Artwork Frame */}
        <div className="relative group">
          {/* Outer Warm Shimmer Aura */}
          <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-rose-400/40 via-amber-200/50 to-teal-300/40 blur-lg animate-pulse" />

          {/* Picture Card Container */}
          <div
            className="relative w-40 h-40 md:w-44 md:h-44 rounded-3xl p-1.5 shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 100%)",
              border: "2px solid rgba(255, 255, 255, 0.4)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
            }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden relative"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/transition_mother_baby.jpg"
                alt="Mother and Baby Hugging - Vijaya Harsha Hospital"
                width={200}
                height={200}
                className="w-full h-full object-cover object-center rounded-2xl shadow-inner"
                priority
              />
              {/* Soft Warm Radial Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent" />
            </motion.div>

            {/* Official Hospital Emblem Logo Badge (Overlapping Bottom Right) */}
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-2xl shadow-xl border border-teal-200/80">
              <Image
                src="/images/logo.png"
                alt="Vijaya Harsha Hospital Official Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Heartfelt Branding & Title */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <div className="flex items-center gap-1.5 text-rose-200 text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Caring for Every Precious Moment</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "3s" }} />
          </div>

          <h2 className="text-white text-lg md:text-xl font-extrabold tracking-wide drop-shadow-md">
            VIJAYA HARSHA
          </h2>
          <span className="text-teal-200 text-xs font-bold uppercase tracking-widest">
            Mother &amp; Child Hospital
          </span>
        </div>

        {/* Heartbeat EKG Pulse Visualization Line */}
        <div className="w-48 h-6 flex items-center justify-center mt-1 relative overflow-hidden">
          <svg className="w-full h-full text-rose-300/70" viewBox="0 0 180 30" fill="none">
            <path
              d="M0 15 H50 L58 5 L64 25 L72 2 L80 22 L86 15 H180"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Traveling Glow Dot on Heartbeat Path */}
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#FCD34D]"
            animate={{
              x: [-90, 90],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}


