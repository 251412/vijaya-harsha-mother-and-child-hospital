import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS } from "@/data/seedData";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

export async function generateStaticParams() {
  return GALLERY_ITEMS.map((item) => ({
    id: item.id,
  }));
}

export default async function GalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === id);
  
  if (currentIndex === -1) {
    notFound();
  }

  const item = GALLERY_ITEMS[currentIndex];
  
  const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
  
  const prevItem = GALLERY_ITEMS[prevIndex];
  const nextItem = GALLERY_ITEMS[nextIndex];

  return (
    <div className="w-full min-h-screen -mt-[130px] sm:-mt-[140px] pt-[130px] sm:pt-[140px] flex flex-col bg-slate-950 overflow-hidden">
      <div className="relative flex-1 w-full flex flex-col items-center justify-center py-12">
      <Link
        href="/gallery"
        aria-label="Go back to gallery"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors backdrop-blur-md border border-white/20 text-sm font-bold shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </Link>

      {/* Navigation arrows */}
      {GALLERY_ITEMS.length > 1 && (
        <>
          <Link
            href={`/gallery/${prevItem.id}`}
            aria-label="Previous photograph"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <Link
            href={`/gallery/${nextItem.id}`}
            aria-label="Next photograph"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus:outline-none"
          >
            <ChevronRight className="w-6 h-6" />
          </Link>
        </>
      )}

      {/* Content wrapper */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black shrink-0 flex items-center justify-center">
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            className="block w-auto h-auto max-w-[94vw] sm:max-w-[85vw] max-h-[60vh] sm:max-h-[65vh] object-contain"
            controls
            autoPlay
          />
        ) : (
          item.imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.imageUrl}
              alt={item.title}
              className="block w-auto h-auto max-w-[94vw] sm:max-w-[85vw] max-h-[60vh] sm:max-h-[65vh] object-contain"
            />
          )
        )}
      </div>

      {/* Caption bar */}
      <div className="mt-4 sm:mt-5 shrink-0 text-center text-white max-w-3xl px-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
          <Tag className="w-3 h-3" />
          <span>{item.category}</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">{item.caption}</p>
        <p className="text-[11px] text-slate-500 mt-2">
          Image {currentIndex + 1} of {GALLERY_ITEMS.length}
        </p>
      </div>
      </div>
    </div>
  );
}
