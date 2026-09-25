"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Stethoscope,
  Baby,
  ShieldCheck,
  Sparkles,
  GraduationCap,
} from "lucide-react";

const JOURNEY_STAGES = [
  {
    id: "pregnancy",
    icon: Heart,
    title: "Pregnancy Care",
    subtitle: "The beginning of life",
    description:
      "From the first heartbeat to regular check-ups, our obstetricians provide compassionate monitoring, nutrition counseling, and personalized birth planning for every mother.",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800",
    color: "var(--color-secondary)",
    bgTint: "var(--color-secondary-light)",
  },
  {
    id: "antenatal",
    icon: Stethoscope,
    title: "Antenatal Monitoring",
    subtitle: "Watching over two lives",
    description:
      "Advanced fetal medicine screenings, 4D ultrasound scans, gestational diabetes management, and high-risk pregnancy protocols to keep mother and baby safe.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    color: "var(--color-primary)",
    bgTint: "var(--color-primary-muted)",
  },
  {
    id: "delivery",
    icon: Sparkles,
    title: "Safe Delivery",
    subtitle: "The moment that changes everything",
    description:
      "Painless labor analgesia, private LDR suites, and immediate emergency cesarean readiness. Every delivery is attended by a neonatal team standing by.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    color: "var(--color-warning)",
    bgTint: "var(--color-champagne-light)",
  },
  {
    id: "newborn",
    icon: Baby,
    title: "Newborn Care",
    subtitle: "Tiny lives, extraordinary care",
    description:
      "Level-III NICU with GE Giraffe incubators, Dräger ventilators, and round-the-clock neonatologist coverage for premature and critically ill newborns.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    color: "var(--color-sage)",
    bgTint: "var(--color-sage-muted)",
  },
  {
    id: "pediatric",
    icon: ShieldCheck,
    title: "Pediatric Excellence",
    subtitle: "Growing up healthy",
    description:
      "Comprehensive childhood care from vaccinations to asthma management, developmental milestones, and child-friendly examination environments.",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800",
    color: "var(--color-primary-light)",
    bgTint: "var(--color-primary-muted)",
  },
  {
    id: "growing",
    icon: GraduationCap,
    title: "Growing Child",
    subtitle: "From steps to strides",
    description:
      "Adolescent health counseling, nutrition planning, catch-up immunizations, and ongoing developmental support as your child grows into their future.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800",
    color: "var(--color-champagne)",
    bgTint: "var(--color-champagne-light)",
  },
];

export default function MotherBabyJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeStage = JOURNEY_STAGES[activeIndex];
  const progress = ((activeIndex + 1) / JOURNEY_STAGES.length) * 100;

  // Auto-advance with scroll-based activation
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // No auto-advance — user interacts manually
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-alt)" }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="eyebrow">The Care Journey</span>
          <h2
            className="mt-2"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
          >
            Every Step, From Heartbeat to First Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
            A continuous circle of care that begins before birth and grows with your child.
          </p>
        </div>

        {/* Journey Content — Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Stage Navigation */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Progress Bar */}
            <div className="mb-8 hidden lg:block">
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-semibold" style={{ color: "var(--color-text-muted)" }}>
                <span>Beginning</span>
                <span>Growing</span>
              </div>
            </div>

            {/* Stage Buttons */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                const Icon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink lg:w-full ${
                      isActive ? "shadow-md" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? "var(--color-card)" : "transparent",
                      borderLeft: isActive ? `3px solid var(--color-primary)` : "3px solid transparent",
                      color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: isActive ? stage.bgTint : "var(--color-bg)",
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: isActive ? stage.color : "var(--color-text-muted)" }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className={`text-sm font-bold block leading-tight ${isActive ? "" : "opacity-70"}`}>
                        {stage.title}
                      </span>
                      <span className="text-[11px] hidden lg:block mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {stage.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Stage Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] img-zoom">
                  <Image
                    src={activeStage.image}
                    alt={activeStage.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={activeIndex === 0}
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(45, 41, 38, 0.5) 0%, transparent 50%)",
                    }}
                  />

                  {/* Stage indicator on image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      Stage {activeIndex + 1} of {JOURNEY_STAGES.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                      {activeStage.title}
                    </h3>
                  </div>
                </div>

                {/* Description below image */}
                <div className="mt-5 sm:mt-6">
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {activeStage.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
