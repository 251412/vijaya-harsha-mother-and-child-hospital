import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, CheckCircle2, ChevronRight, Stethoscope, Heart, Activity, ShieldAlert } from "lucide-react";
import { SERVICES } from "@/data/seedData";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Vijaya Harsha Mother & Child Hospital`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Related services (excluding current)
  const relatedServices = SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  if (relatedServices.length === 0) {
    relatedServices.push(...SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3));
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        
        <div className="container-wide relative z-10 text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
            <span>{service.category}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl drop-shadow-md">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-24">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Overview */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-primary-dark)] mb-6">
                Overview
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                {service.shortDescription}
              </p>
              <div className="w-full h-px bg-slate-200 my-8"></div>
              <p className="text-slate-600 leading-loose text-sm sm:text-base whitespace-pre-wrap">
                {service.fullDescription}
              </p>
            </div>

            {/* Benefits & Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="group bg-gradient-to-br from-teal-50 to-emerald-50/30 p-6 rounded-3xl border border-teal-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-teal-900">Key Benefits</h3>
                  </div>
                  <ul className="space-y-3 relative z-10">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-teal-800 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-600 mt-0.5" />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50/30 p-6 rounded-3xl border border-blue-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-blue-900">Facilities & Features</h3>
                  </div>
                  <ul className="space-y-3 relative z-10">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-blue-800 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Booking Card */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg border-2 border-[var(--color-primary)] text-center relative overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-primary)] opacity-[0.03] rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--color-primary)] opacity-[0.03] rounded-tr-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
              
              <div className="w-16 h-16 mx-auto bg-[var(--color-ivory)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[var(--color-primary-dark)] mb-2 relative z-10">
                Need Consultation?
              </h3>
              <p className="text-sm text-slate-500 mb-8 relative z-10">
                Book an appointment with our {service.category} specialists today for expert care.
              </p>
              
              <Link
                href={`/book-appointment?department=${encodeURIComponent(service.category)}`}
                className="relative z-10 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group/btn"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                <Calendar className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Book an Appointment</span>
              </Link>
            </div>

            {/* Need Help Card */}
            <div className="group bg-rose-50 p-8 rounded-3xl shadow-lg text-center relative overflow-hidden hover:-translate-y-1 transition-transform duration-300 border border-rose-200">
              <div className="absolute inset-0 bg-gradient-to-t from-rose-100/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <ShieldAlert className="w-12 h-12 text-rose-600 mx-auto mb-4 group-hover:scale-110 group-hover:text-rose-500 transition-all duration-300" />
                <h4 className="text-xl font-bold mb-2 text-rose-950">24/7 Emergency Care</h4>
                <p className="text-sm text-rose-800 mb-6 leading-relaxed">
                  For urgent medical assistance, please contact our emergency hotline immediately.
                </p>
                <a 
                  href="tel:0894222333" 
                  className="inline-block px-6 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-rose-600/30 transition-all w-full flex items-center justify-center gap-2"
                >
                  <span className="relative flex h-3 w-3 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  Call Emergency: 0894-222333
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Explore More Services */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-primary-dark)]">
              Explore More Services
            </h2>
            <Link 
              href="/services" 
              className="hidden sm:flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] hover:underline"
            >
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((relatedService) => (
              <Link 
                key={relatedService.id} 
                href={`/services/${relatedService.slug}`}
                className="group block relative rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              >
                <Image
                  src={relatedService.imageUrl}
                  alt={relatedService.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-sage-light)] mb-2 block">
                    {relatedService.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[var(--color-sage-light)] transition-colors">
                    {relatedService.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
             <Link 
              href="/services" 
              className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] hover:underline"
            >
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
