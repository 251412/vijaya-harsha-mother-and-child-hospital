"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { GalleryItemData } from "@/data/seedData";

interface LightboxModalProps {
  item: GalleryItemData | null;
  allItems: GalleryItemData[];
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function LightboxModal({
  item,
  allItems,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, allItems]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((x) => x.id === item.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    onSelectIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allItems.length;
    onSelectIndex(nextIndex);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      {allItems.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus:outline-none"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Content wrapper */}
      <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black max-h-[70vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto object-contain rounded-2xl"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-4 text-center text-white max-w-2xl px-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
            <Tag className="w-3 h-3" />
            <span>{item.category}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{item.caption}</p>
          <p className="text-[11px] text-slate-500 mt-2">
            Image {currentIndex + 1} of {allItems.length} • Press Esc to close, Arrow keys to browse
          </p>
        </div>
      </div>
    </div>
  );
}
