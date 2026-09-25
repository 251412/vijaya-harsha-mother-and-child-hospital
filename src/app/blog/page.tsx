"use client";

import React, { useState } from"react";
import Link from"next/link";
import Image from"next/image";
import { BookOpen, Search, Filter, Calendar, Clock, ChevronRight } from"lucide-react";
import { BLOG_POSTS } from"@/data/seedData";

const CATEGORIES = [
"All Topics",
"Pregnancy Care",
"Newborn Care",
"Immunization",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory ==="All Topics" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Banner */}
      <section className="py-20 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor:"rgba(255,255,255,0.12)", color:"var(--color-sage-light)" }}>
            <span>Doctor-Reviewed Health Articles</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Mother &amp; Child Health Insights
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Trusted medical guidance authored by our pediatricians and obstetricians on pregnancy safety, newborn wellness, nutrition, and child growth milestones.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b py-5 sticky top-[68px] z-20 shadow-sm" style={{ borderColor:"var(--color-border-warm)" }}>
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider hidden lg:flex items-center gap-1 shrink-0" style={{ color:"var(--color-primary-dark)" }}>
              <Filter className="w-3.5 h-3.5" /> Topic:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ?"text-white shadow-sm"
                    :"bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ?"var(--color-primary-dark)" : undefined,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medical topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none"
              style={{ borderColor:"var(--color-border-warm)" }}
            />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16">
        <div className="container-wide">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border p-8 max-w-lg mx-auto" style={{ borderColor:"var(--color-border-warm)" }}>
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold" style={{ color:"var(--color-primary-dark)" }}>No articles found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting &ldquo;All Topics&rdquo; or changing your search terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <article
                  key={post.id}
                  className="card overflow-hidden flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow" style={{ backgroundColor:"var(--color-primary)" }}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-[var(--color-primary)] transition-colors" style={{ color:"var(--color-primary-dark)" }}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
                          {post.authorName.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{post.authorName}</span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
                        style={{ color:"var(--color-primary)" }}
                      >
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
