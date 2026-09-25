"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import CinematicTransition from "./CinematicTransition";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const originalScrollTo = window.scrollTo;

    // Delay scroll-to-top behind the transition curtain
    window.scrollTo = function (...args: any[]) {
      const isScrollToTop =
        (args.length === 2 && args[0] === 0 && args[1] === 0) ||
        (args.length === 1 && typeof args[0] === "object" && args[0].top === 0);

      if (isScrollToTop) {
        setTimeout(() => {
          originalScrollTo.apply(window, args as any);
        }, 300);
        return;
      }
      return originalScrollTo.apply(window, args as any);
    };

    return () => {
      window.scrollTo = originalScrollTo;
    };
  }, []);

  // Check if reduced motion is preferred at render time
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      : false;

  if (prefersReducedMotion) {
    return (
      <div className="w-full flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      <CinematicTransition />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          className="w-full flex flex-col min-h-screen"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.5, delay: 0.25, ease: "easeOut" }
          }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.4, ease: "easeIn" }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
