"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, User, Stethoscope, BookOpen, ChevronRight, Loader2 } from "lucide-react";
import { DOCTORS, SERVICES, BLOG_POSTS, DoctorData, ServiceData, BlogPostData } from "@/data/seedData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "doctors" | "services" | "blogs">("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredDoctors = q
    ? DOCTORS.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.department.toLowerCase().includes(q) ||
          d.qualification.toLowerCase().includes(q)
      )
    : DOCTORS;

  const filteredServices = q
    ? SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    : SERVICES;

  const filteredBlogs = q
    ? BLOG_POSTS.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      )
    : BLOG_POSTS;

  const totalResults = filteredDoctors.length + filteredServices.length + filteredBlogs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center p-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, clinical services, or health topics..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base font-medium focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-2 text-xs"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-slate-100 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "all" ? "bg-[#0A2540] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "doctors" ? "bg-[#0284C7] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Doctors ({filteredDoctors.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "services" ? "bg-[#0284C7] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Services ({filteredServices.length})
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "blogs" ? "bg-[#0284C7] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Health Blogs ({filteredBlogs.length})
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4">
          {totalResults === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No matching hospital records found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for pediatrician, delivery, NICU, vaccination, or Dr. Vijaya Kumar.
              </p>
            </div>
          ) : (
            <>
              {/* Doctors Section */}
              {(activeTab === "all" || activeTab === "doctors") && filteredDoctors.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Specialist Doctors</span>
                  </h5>
                  <div className="space-y-1.5">
                    {filteredDoctors.map((doc) => (
                      <Link
                        key={doc.id}
                        href={`/doctors#${doc.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-[#0A2540]">
                            {doc.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {doc.specialization} • {doc.qualification}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Section */}
              {(activeTab === "all" || activeTab === "services") && filteredServices.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Clinical Services</span>
                  </h5>
                  <div className="space-y-1.5">
                    {filteredServices.map((srv) => (
                      <Link
                        key={srv.id}
                        href={`/services#${srv.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-[#0A2540]">
                            {srv.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">{srv.shortDescription}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs Section */}
              {(activeTab === "all" || activeTab === "blogs") && filteredBlogs.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Health Articles & Advice</span>
                  </h5>
                  <div className="space-y-1.5">
                    {filteredBlogs.map((blog) => (
                      <Link
                        key={blog.id}
                        href={`/blog/${blog.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-[#0A2540]">
                            {blog.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {blog.category} • {blog.readTime}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Quick CTA */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Need an appointment right now?{" "}
          <Link
            href="/book-appointment"
            onClick={onClose}
            className="font-bold text-[#0284C7] hover:underline"
          >
            Click here to book
          </Link>
        </div>
      </div>
    </div>
  );
}
