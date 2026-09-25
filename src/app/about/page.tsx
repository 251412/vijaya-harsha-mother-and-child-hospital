import React from"react";
import Link from"next/link";
import Image from"next/image";
import { 
  Baby, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Target, 
  Eye, 
  CheckCircle2, 
  Calendar,
  Building2,
  Stethoscope
} from"lucide-react";
import { HOSPITAL_CONFIG } from"@/lib/constants";

export const metadata = {
  title:"About Us | Vijaya Harsha Mother & Child Hospital",
  description:"Learn about Vijaya Harsha Mother & Child Hospital in Srikakulam. Founded by Dr. N. Vijaya Kumar & Dr. Harsha Latha, offering Level-III NICU and advanced obstetric care.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Header Banner */}
      <section className="py-20 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor:"rgba(255,255,255,0.12)", color:"var(--color-sage-light)" }}>
            <span>Our Heritage & Purpose</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            About VijayaHarsha Hospital
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            A specialized healthcare haven in Srikakulam dedicated exclusively to maternal health, high-risk obstetrics, newborn intensive care, and child health excellence.
          </p>
        </div>
      </section>

      {/* Hospital Story & Founders */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor:"rgba(102,155,188,0.15)", color:"var(--color-primary-dark)" }}>
                <span>Our Clinical Story</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color:"var(--color-primary-dark)" }}>
                Two Decades of Compassionate Care in Srikakulam
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded by <strong>Dr. N. Vijaya Kumar (Chief Pediatrician &amp; Neonatologist)</strong> and <strong>Dr. K. Harsha Latha (Senior Obstetrician &amp; Laparoscopic Surgeon)</strong>, Vijaya Harsha Mother &amp; Child Hospital was conceived with a profound medical mission: to bring world-class tertiary maternal and neonatal intensive care to the families of Srikakulam and surrounding districts.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over the past 22 years, the hospital has served more than 65,000 families, nurtured over 5,200 critically ill and premature infants in its Level-III NICU, and safely delivered over 18,500 healthy babies through evidence-based, compassionate obstetric practices.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border" style={{ backgroundColor:"var(--color-ivory-dark)", borderColor:"var(--color-border-warm)" }}>
                  <span className="text-2xl font-black block" style={{ color:"var(--color-primary)" }}>22+</span>
                  <span className="text-xs text-slate-600 font-semibold">Years Clinical Legacy</span>
                </div>
                <div className="p-4 rounded-2xl border" style={{ backgroundColor:"var(--color-ivory-dark)", borderColor:"var(--color-border-warm)" }}>
                  <span className="text-2xl font-black block" style={{ color:"var(--color-secondary)" }}>18,500+</span>
                  <span className="text-xs text-slate-600 font-semibold">Safe Deliveries</span>
                </div>
              </div>
            </div>

            {/* Hospital Architecture/Facilities Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border relative h-[380px]" style={{ borderColor:"var(--color-border-warm)" }}>
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                  alt="Vijaya Harsha Hospital Modern Healthcare Wing"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs" style={{ backgroundColor:"var(--color-primary-dark)" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--color-sage-light)" }}>State-of-the-Art Center</p>
                <p className="text-sm font-semibold mt-1">Level-III NICU, Modular OTs &amp; Private Birthing Suites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 border-t" style={{ backgroundColor:"var(--color-ivory)", borderColor:"var(--color-border-warm)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold" style={{ color:"var(--color-primary-dark)" }}>Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be the most trusted, benchmark mother and child healthcare institution in North Coastal Andhra Pradesh, recognized for medical innovation, zero preventable maternal/neonatal mortality, and ethical clinical care.
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor:"var(--color-secondary)" }}>
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold" style={{ color:"var(--color-primary-dark)" }}>Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide accessible, 24/7 advanced obstetrics and neonatology with medical rigor, warmth, and transparent patient communication, ensuring every mother and newborn experiences safe, dignified, and world-class healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white border-t" style={{ borderColor:"var(--color-border-warm)" }}>
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--color-primary)" }}>Our Guiding Principles</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold" style={{ color:"var(--color-primary-dark)" }}>Why Families Trust Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title:"Clinical Rigor",
                desc:"Strict adherence to evidence-based medical protocols and safety standards.",
              },
              {
                icon: HeartHandshake,
                title:"Empathy First",
                desc:"Treating mothers and babies with non-hurried, warm, human-centric dignity.",
              },
              {
                icon: Award,
                title:"Excellence in NICU",
                desc:"Srikakulam's premier Level-III newborn intensive care setup.",
              },
              {
                icon: Stethoscope,
                title:"24/7 Availability",
                desc:"Round-the-clock emergency obstetricians and pediatricians on site.",
              },
            ].map((v) => (
              <div key={v.title} className="card p-6 space-y-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white mx-auto sm:mx-0" style={{ backgroundColor:"var(--color-primary-dark)" }}>
                  <v.icon className="w-5 h-5" style={{ color:"var(--color-sage-light)" }} />
                </div>
                <h4 className="font-serif text-lg font-bold" style={{ color:"var(--color-primary-dark)" }}>{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 text-white text-center" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-narrow space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold">Ready to Experience Specialized Care?</h2>
          <p className="text-sm  max-w-xl mx-auto" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Book an appointment with our senior doctors or reach out to our emergency line anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-appointment" className="btn btn-secondary">
              Book Appointment
            </Link>
            <Link href="/contact" className="btn btn-outline text-white hover:bg-white/10 border-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
