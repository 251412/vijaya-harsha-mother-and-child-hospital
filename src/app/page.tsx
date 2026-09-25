import React from"react";
import Link from"next/link";
import Image from"next/image";
import {
  Baby,
  Heart,
  ShieldCheck,
  Calendar,
  PhoneCall,
  Award,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  MapPin,
  Star,
  Sparkles,
} from"lucide-react";
import { HOSPITAL_CONFIG } from"@/lib/constants";
import { DOCTORS, SERVICES, TESTIMONIALS, BLOG_POSTS, FAQS } from"@/data/seedData";
import DoctorCard from"@/components/DoctorCard";
import ServiceCard from"@/components/ServiceCard";
import ScrollReveal from"@/components/ScrollReveal";
import SectionHeading from"@/components/SectionHeading";
import AnimatedCounter from"@/components/AnimatedCounter";
import MotherBabyJourney from"@/components/MotherBabyJourney";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">

      {/* ═══════════════════════════════════════════════
          1. HERO — Warm, Cinematic, Editorial
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FDF9F4] pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E8F2F2] to-transparent rounded-bl-full pointer-events-none blur-3xl opacity-60 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#F6E9EA] to-transparent rounded-tr-full pointer-events-none blur-3xl opacity-60 -z-10" />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN — Editorial Typography */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              
              {/* Eyebrow */}
              <ScrollReveal animation="slideUp" delay={0.3}>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor:"var(--color-primary)", opacity: 0.4 }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color:"var(--color-primary)" }}>
                    Mother &amp; Child Care
                  </span>
                </div>
              </ScrollReveal>

              {/* Headline */}
              <ScrollReveal animation="slideUp" delay={0.4}>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] font-extrabold tracking-tight text-text">
                  Where Every <br className="hidden lg:block" />
                  New Beginning <br className="hidden lg:block" />
                  <span className="font-serif italic font-normal relative" style={{ color:"var(--color-primary)" }}>
                    Is Treasured.
                    <svg className="absolute -bottom-2 lg:-bottom-3 left-0 w-full h-3 lg:h-4" style={{ color:"var(--color-secondary)", opacity: 0.3 }} viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </h1>
              </ScrollReveal>

              {/* Supporting Text */}
              <ScrollReveal animation="slideUp" delay={0.5}>
                <p className="text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed text-text-secondary">
                  Advanced medical expertise meets compassionate care. Led by Dr. N. Vijaya Kumar and Dr. K. Harsha Latha, we provide a safe, warm, and highly specialized environment for you and your baby.
                </p>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal animation="slideUp" delay={0.6}>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/book-appointment" className="btn-primary group w-full sm:w-auto justify-center px-8 py-4 text-[15px]">
                    <Calendar className="w-4 h-4 opacity-90" />
                    <span>Book an Appointment</span>
                  </Link>
                  <Link href="/services" className="btn-secondary group w-full sm:w-auto justify-center px-8 py-4 text-[15px]">
                    <span>Explore Our Care</span>
                    <ArrowRight className="w-4 h-4 opacity-70 arrow-animate" />
                  </Link>
                </div>
              </ScrollReveal>

            </div>

            {/* RIGHT COLUMN — Premium Image Composition */}
            <div className="lg:col-span-6 relative lg:pl-8 mt-4 lg:mt-0">
              <ScrollReveal animation="scale" delay={0.1} duration={1.2}>
                <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  {/* Subtle zoom animation via CSS class */}
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200"
                    alt="Compassionate Maternity Care at Vijaya Harsha"
                    fill
                    className="object-cover object-center animate-slowZoom"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Elegant Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor:"rgba(26, 92, 94, 0.1)" }} />
                  
                  {/* Inner Text Overlay */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-sm font-semibold tracking-wider uppercase mb-1" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
                      Advanced Care
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-bold">
                      State-of-the-Art LDR Suites
                    </h3>
                  </div>
                </div>
              </ScrollReveal>

              {/* Floating Trust Indicators */}
              <ScrollReveal animation="fade" delay={0.8} duration={0.8}>
                {/* Top Right */}
                <div className="absolute -top-6 -right-2 sm:-right-6 p-4 rounded-2xl bg-white shadow-xl shadow-black/5 border border-border-light flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor:"var(--color-primary-muted)", color:"var(--color-primary)" }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-text leading-tight">Experienced Specialists</p>
                    <p className="text-xs text-text-muted font-semibold mt-0.5">24/7 Expert Care</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade" delay={0.9} duration={0.8}>
                {/* Bottom Left */}
                <div className="absolute -bottom-8 -left-2 sm:-left-8 p-4 rounded-2xl bg-white shadow-xl shadow-black/5 border border-border-light flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor:"rgba(212, 160, 166, 0.2)", color:"var(--color-secondary-dark)" }}>
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-text leading-tight">Compassionate Care</p>
                    <p className="text-xs text-text-muted font-semibold mt-0.5">Mother &amp; Baby Focused</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>

        {/* Organic wave transition to next section */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[40px] sm:h-[60px]" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-card)" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. TRUST STATISTICS — Elegant Grid
          ═══════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16" style={{ backgroundColor:"var(--color-card)" }}>
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
              {HOSPITAL_CONFIG.stats.map((stat, idx) => (
                <div key={idx} className="relative">
                  <AnimatedCounter target={stat.value} label={stat.label} />
                  {idx < HOSPITAL_CONFIG.stats.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10" style={{ backgroundColor:"var(--color-border)" }} />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. CARE INTRODUCTION — Split-screen Editorial
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-bg)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image — asymmetric with organic shape */}
            <ScrollReveal animation="slideLeft">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 img-zoom" style={{ border:"1px solid var(--color-border-light)" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800"
                    alt="Newborn care at Vijaya Harsha Hospital"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    loading="lazy"
                  />
                </div>
                {/* Decorative accent */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl hidden lg:block"
                  style={{ backgroundColor:"var(--color-champagne-light)", zIndex: -1 }}
                />
              </div>
            </ScrollReveal>

            {/* Text — editorial feel */}
            <ScrollReveal animation="slideRight">
              <div className="space-y-5">
                <span className="eyebrow">Our Purpose</span>
                <h2 style={{ fontFamily:"var(--font-serif)", color:"var(--color-text)" }}>
                  Advanced Medical Care With a Human Heart
                </h2>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>
                  For over two decades, Vijaya Harsha Hospital has been Srikakulam&apos;s trusted destination for maternal and child health. We believe that medical precision and compassionate care are not opposing forces — they are complementary strengths that every family deserves.
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>
                  From the very first prenatal consultation to the immunization of a growing child, our team of specialists walks alongside families with expertise, warmth, and unwavering dedication.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-base font-bold group mt-2"
                    style={{ color:"var(--color-primary)" }}
                  >
                    <span className="link-underline">Learn About Our Hospital</span>
                    <ArrowRight className="w-4 h-4 arrow-animate" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. CORE PILLARS — Visual variety, not card grid
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-card)" }}>
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <SectionHeading
              eyebrow="Hospital Foundations"
              title="Why Families Trust Vijaya Harsha"
              description="Combining world-class medical equipment with deeply compassionate care for mothers, infants, and growing children."
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Baby className="w-5 h-5" />,
                title:"Tertiary Level-III NICU",
                desc:"GE Giraffe warmers and Dräger neonatal ventilators for micro-preterms.",
                tint:"var(--color-primary-muted)",
                accent:"var(--color-primary)",
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title:"Painless Natural Delivery",
                desc:"Safe labor analgesia with 24/7 obstetricians and emergency readiness.",
                tint:"var(--color-secondary-light)",
                accent:"var(--color-secondary-dark)",
              },
              {
                icon: <Award className="w-5 h-5" />,
                title:"Senior Pediatric Expertise",
                desc:"Dr. N. Vijaya Kumar: 22+ years of clinical excellence in child health.",
                tint:"var(--color-champagne-light)",
                accent:"var(--color-warning)",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title:"24/7 Emergency & Pharmacy",
                desc:"Round-the-clock ambulance, casualty, ultrasound, and pathology lab.",
                tint:"var(--color-sage-muted)",
                accent:"var(--color-sage)",
              },
            ].map((pillar, idx) => (
              <ScrollReveal key={idx} animation="slideUp" delay={idx * 0.1}>
                <div
                  className="p-6 rounded-xl card-hover h-full space-y-3"
                  style={{
                    backgroundColor:"var(--color-bg)",
                    border:"1px solid var(--color-border-light)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: pillar.tint, color: pillar.accent }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="text-[15px] font-bold" style={{ color:"var(--color-text)" }}>{pillar.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. SERVICES — Featured + Supporting
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-bg)" }}>
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <SectionHeading
                eyebrow="Our Specialities"
                title="Advanced Mother & Child Medical Services"
                description="From preconception counseling to adolescent health, explore our specialized departments."
                align="left"
              />
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-sm font-bold self-start md:self-auto group"
                style={{ color:"var(--color-primary)" }}
              >
                <span className="link-underline">View All Services</span>
                <ChevronRight className="w-4 h-4 arrow-animate" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <ScrollReveal key={service.id} animation="slideUp" delay={idx * 0.1}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. MOTHER & BABY JOURNEY — Signature Section
          ═══════════════════════════════════════════════ */}
      <MotherBabyJourney />

      {/* ═══════════════════════════════════════════════
          7. DOCTORS — Spotlight with editorial feel
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-card)" }}>
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <SectionHeading
              eyebrow="Medical Leadership"
              title="Meet Our Esteemed Doctors"
              description="Our clinicians are distinguished pioneers in pediatrics, high-risk obstetrics, and neonatal intensive care."
              serif
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {DOCTORS.slice(0, 2).map((doc, idx) => (
              <ScrollReveal key={doc.id} animation="scaleUp" delay={idx * 0.15}>
                <DoctorCard doctor={doc} featured />
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/doctors" className="btn-secondary group">
              <span>View All Department Specialists</span>
              <ChevronRight className="w-4 h-4 arrow-animate" style={{ color:"var(--color-text-muted)" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. TESTIMONIALS — Large Quote Design
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-bg-alt)" }}>
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <SectionHeading
              eyebrow="Patient Stories"
              title="Voices of Grateful Parents"
              description="Real testimonials from families whose lives were touched by our medical care."
              serif
            />
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <ScrollReveal key={test.id} animation="slideUp" delay={idx * 0.12}>
                <div
                  className="p-6 rounded-xl flex flex-col justify-between space-y-4 h-full card-hover"
                  style={{
                    backgroundColor:"var(--color-card)",
                    border:"1px solid var(--color-border-light)",
                  }}
                >
                  <div>
                    {/* Quote mark */}
                    <span
                      className="text-4xl font-serif leading-none block mb-2"
                      style={{ color:"var(--color-secondary)", fontFamily:"var(--font-serif)" }}
                    >
                      &ldquo;
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>
                      {test.comment}
                    </p>
                  </div>

                  <div className="pt-3" style={{ borderTop:"1px solid var(--color-border-light)" }}>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color:"var(--color-warning)" }} />
                      ))}
                    </div>
                    <h4 className="text-sm font-bold" style={{ color:"var(--color-text)" }}>{test.patientName}</h4>
                    <p className="text-xs font-medium" style={{ color:"var(--color-primary)" }}>{test.relation}</p>
                    <p className="text-[11px] mt-0.5" style={{ color:"var(--color-text-muted)" }}>
                      {test.treatment} • {test.location}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          9. BLOG — Editorial Layout
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-card)" }}>
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <SectionHeading
                eyebrow="Health & Wellness"
                title="Doctor-Authored Guides for Families"
                align="left"
              />
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-bold self-start md:self-auto group"
                style={{ color:"var(--color-primary)" }}
              >
                <span className="link-underline">Explore All Articles</span>
                <ChevronRight className="w-4 h-4 arrow-animate" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((blog, idx) => (
              <ScrollReveal key={blog.id} animation="fade" delay={idx * 0.12}>
                <article
                  className="rounded-xl overflow-hidden flex flex-col group h-full card-hover"
                  style={{
                    backgroundColor:"var(--color-bg)",
                    border:"1px solid var(--color-border-light)",
                  }}
                >
                  <div className="relative h-48 w-full overflow-hidden img-zoom">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                      style={{
                        backgroundColor:"rgba(253, 250, 246, 0.92)",
                        backdropFilter:"blur(8px)",
                        color:"var(--color-text)",
                      }}
                    >
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[11px] font-semibold mb-1.5" style={{ color:"var(--color-text-muted)" }}>
                        {blog.publishedAt} • {blog.readTime}
                      </div>
                      <h3 className="text-[15px] font-bold leading-snug" style={{ color:"var(--color-text)" }}>
                        <Link href={`/blog/${blog.slug}`} className="hover:opacity-80 transition-opacity">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="text-xs line-clamp-2 mt-1.5 leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between text-xs" style={{ borderTop:"1px solid var(--color-border-light)" }}>
                      <span className="font-semibold" style={{ color:"var(--color-text-secondary)" }}>By {blog.authorName}</span>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="font-bold flex items-center gap-0.5 group"
                        style={{ color:"var(--color-primary)" }}
                      >
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5 arrow-animate" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          10. FAQ — Interactive Accordion Style
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-bg)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal animation="slideUp">
            <SectionHeading
              eyebrow="Patient Help Center"
              title="Common Questions from Expecting & New Parents"
            />
          </ScrollReveal>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, idx) => (
              <ScrollReveal key={idx} animation="slideUp" delay={idx * 0.08}>
                <div
                  className="p-5 rounded-xl"
                  style={{
                    backgroundColor:"var(--color-card)",
                    border:"1px solid var(--color-border-light)",
                  }}
                >
                  <h3 className="text-sm font-bold flex items-start gap-2" style={{ color:"var(--color-text)" }}>
                    <span className="font-extrabold" style={{ color:"var(--color-primary)" }}>Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm mt-2 pl-5 leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          11. APPOINTMENT CTA — Warm, Editorial
          ═══════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor:"var(--color-primary)" }}
      >
        <div className="container-wide text-center">
          <ScrollReveal animation="slideUp">
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color:"var(--color-sage-light)" }}>
              Your Family Deserves the Best
            </span>
            <h2
              className="mt-3 text-white text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ fontFamily:"var(--font-serif)" }}
            >
              Begin Your Journey With Us
            </h2>
            <p className="mt-3 text-sm sm:text-base max-w-xl mx-auto" style={{ color:"rgba(255,255,255,0.85)" }}>
              Schedule a consultation with our senior specialists. We are here for every mother, every child, every family.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white font-bold text-sm shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 group"
                style={{ color:"var(--color-primary)" }}
              >
                <Calendar className="w-4 h-4 opacity-70" />
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4 opacity-60 arrow-animate" />
              </Link>
              <a
                href={`tel:${HOSPITAL_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{
                  backgroundColor:"rgba(255,255,255,0.15)",
                  color:"white",
                  border:"1px solid rgba(255,255,255,0.2)",
                }}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {HOSPITAL_CONFIG.phoneFormatted}</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          12. LOCATION & MAP
          ═══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ backgroundColor:"var(--color-bg)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal animation="slideLeft">
              <div className="space-y-4">
                <span className="eyebrow">Visit Us</span>
                <h2 style={{ color:"var(--color-text)" }}>
                  In the Heart of Srikakulam
                </h2>
                <p className="text-sm leading-relaxed" style={{ color:"var(--color-text-secondary)" }}>
                  Located on 80 Feet Road in Visakha &apos;A&apos; Colony, near Saraswathi Mahal and Rythu Bazar. Ample parking, wheelchair access, and round-the-clock emergency entrance.
                </p>

                <div className="space-y-2 text-sm pt-2" style={{ color:"var(--color-text-secondary)" }}>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color:"var(--color-primary)" }} />
                    <span>{HOSPITAL_CONFIG.address.full}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4" style={{ color:"var(--color-primary)" }} />
                    <span>Desk: {HOSPITAL_CONFIG.phoneFormatted}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color:"var(--color-primary)" }} />
                    <span>{HOSPITAL_CONFIG.workingHours.opdGeneral}</span>
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap gap-3">
                  <a
                    href={HOSPITAL_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Get Directions
                  </a>
                  <Link href="/book-appointment" className="btn-primary">
                    <Calendar className="w-4 h-4 opacity-70" />
                    Book Visit
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideRight">
              <div
                className="rounded-2xl overflow-hidden shadow-lg h-80 w-full"
                style={{ border:"1px solid var(--color-border)" }}
              >
                <iframe
                  title="Vijaya Harsha Hospital Srikakulam Google Map"
                  src={HOSPITAL_CONFIG.embedMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
