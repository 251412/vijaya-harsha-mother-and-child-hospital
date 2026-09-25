import React from"react";
import Link from"next/link";
import { notFound } from"next/navigation";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  Tag, 
  ChevronRight,
} from"lucide-react";
import { BLOG_POSTS } from"@/data/seedData";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Top Header */}
      <div className="py-16 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 transition-colors"
            style={{ color:"var(--color-sage-light)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Health Guides</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor:"rgba(255,255,255,0.15)" }}>
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor:"rgba(102,155,188,0.2)", color:"var(--color-sage-light)" }}>
              <ShieldCheck className="w-3.5 h-3.5" />
              Medically Reviewed
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-white opacity-">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                {post.authorName.charAt(0)}
              </div>
              <div>
                <span className="block font-bold text-white">{post.authorName}</span>
                <span className="text-white opacity-">{post.authorRole}</span>
              </div>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" style={{ color:"var(--color-sage-light)" }} />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" style={{ color:"var(--color-sage-light)" }} />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Article */}
      <div className="container-narrow py-14">
        <article className="card p-6 sm:p-10 space-y-8">
          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg font-medium leading-relaxed border-l-4 pl-4 italic" style={{ borderColor:"var(--color-primary)", color:"var(--color-primary-dark)" }}>
            {post.excerpt}
          </p>

          {/* Article Text */}
          <div className="prose prose-slate max-w-none leading-relaxed space-y-4 text-sm sm:text-base" style={{ color:"var(--color-primary-dark)" }}>
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("###")) {
                return (
                  <h3
                    key={index}
                    className="font-serif text-lg sm:text-xl font-bold pt-4 pb-1 border-b border-black/5"
                    style={{ color:"var(--color-primary-dark)" }}
                  >
                    {paragraph.replace("###","")}
                  </h3>
                );
              }
              if (paragraph.startsWith("*")) {
                const listItems = paragraph.split("\n").map((item) => item.replace("*",""));
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1.5">
                    {listItems.map((li, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),
                  }}
                />
              );
            })}
          </div>

          {/* Medical Author Profile Box */}
          <div className="mt-8 p-5 rounded-2xl border flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left" style={{ backgroundColor:"var(--color-ivory-dark)", borderColor:"var(--color-border-warm)" }}>
            <div className="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-bold text-lg shrink-0" style={{ backgroundColor:"var(--color-primary)" }}>
              {post.authorName.split("")[1]?.charAt(0) ||"D"}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color:"var(--color-primary)" }}>Medically Reviewed By</span>
              <h4 className="text-base font-bold" style={{ color:"var(--color-primary-dark)" }}>{post.authorName}</h4>
              <p className="text-xs text-slate-500">{post.authorRole} at Vijaya Harsha Mother &amp; Child Hospital</p>
              <p className="text-xs text-slate-600 mt-2">
                Specializing in clinical pediatrics, neonatology, and evidence-based mother and child care in Srikakulam.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-black/5 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400 mr-1" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-semibold"
                style={{ backgroundColor:"var(--color-ivory-dark)", color:"var(--color-primary-dark)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Inline Appointment Booking Card */}
        <div className="my-10 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl" style={{ backgroundColor:"var(--color-primary-dark)" }}>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--color-sage-light)" }}>Consult Our Specialists</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">Have Questions About Your Child or Pregnancy?</h3>
            <p className="text-xs text-white opacity- max-w-md">
              Book a direct consultation with Dr. N. Vijaya Kumar or Dr. Harsha Latha at Vijaya Harsha Hospital.
            </p>
          </div>
          <Link
            href="/book-appointment"
            className="btn btn-secondary text-xs shrink-0"
          >
            Book Appointment
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold" style={{ color:"var(--color-primary-dark)" }}>Related Medical Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="card p-5 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase" style={{ color:"var(--color-primary)" }}>{related.category}</span>
                    <h4 className="font-serif text-base font-bold mt-1 leading-snug group-hover:text-[var(--color-primary)] transition-colors" style={{ color:"var(--color-primary-dark)" }}>
                      {related.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-black/5">
                    <span>{related.readTime}</span>
                    <span className="font-bold flex items-center gap-0.5" style={{ color:"var(--color-primary)" }}>
                      Read Article <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
