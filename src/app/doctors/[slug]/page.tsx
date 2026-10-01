import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCTORS } from "@/data/seedData";
import { Calendar, Clock, Award, ChevronRight, GraduationCap, ShieldCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const doctor = DOCTORS.find((d) => d.slug === resolvedParams.slug);
  
  if (!doctor) {
    return {
      title: "Doctor Not Found | Vijaya Harsha Hospital",
    };
  }
  
  return {
    title: `${doctor.name} - ${doctor.department} | Vijaya Harsha Hospital`,
    description: doctor.bio.substring(0, 160) + "...",
  };
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const doctor = DOCTORS.find((d) => d.slug === resolvedParams.slug);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-alt)] pt-24 pb-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Image & Quick Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-28">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6" style={{ border: "4px solid var(--color-ivory)" }}>
                <Image
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="drop-shadow-lg">
                    <p className="font-bold text-2xl !text-white m-0">{doctor.experienceYears}+ Years</p>
                    <p className="text-sm font-medium !text-white/90 m-0">Clinical Experience</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl !leading-tight font-serif font-bold text-[var(--color-primary-dark)] whitespace-nowrap tracking-tight">
                  {doctor.name}
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-sage-light)] text-[var(--color-primary-dark)]">
                    {doctor.department}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed border-b border-slate-100 pb-4">
                  {doctor.specialization}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-sm">
                    <GraduationCap className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Qualifications</p>
                      <p className="text-slate-600">{doctor.qualification}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-primary-dark)] mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-ivory)] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                About {doctor.name}
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm sm:text-base">
                {doctor.bio.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Consultation Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group bg-gradient-to-br from-teal-50 to-emerald-50/50 rounded-3xl p-8 border border-teal-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                
                <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2 relative z-10">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Availability
                </h3>
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-xs text-teal-700 uppercase tracking-wider font-bold mb-1">Days</p>
                    <p className="text-teal-900 font-medium text-sm">
                      {doctor.consultationDays.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-teal-700 uppercase tracking-wider font-bold mb-1">Timings</p>
                    <p className="text-teal-900 font-medium text-sm">
                      {doctor.consultationTimings}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-teal-700 uppercase tracking-wider font-bold mb-1">Location</p>
                    <p className="text-teal-900 font-medium text-sm">
                      Vijaya Harsha Mother & Child Hospital
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="group bg-white rounded-3xl p-8 border-2 border-[var(--color-primary)] shadow-md flex flex-col justify-center text-center relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-[0.03] rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[var(--color-primary)] opacity-[0.03] rounded-tr-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                
                <ShieldCheck className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3 relative z-10">
                  Need a Consultation?
                </h3>
                <p className="text-sm text-slate-500 mb-6 relative z-10">
                  Book an appointment with {doctor.name} for expert medical care.
                </p>
                
                {doctor.isAvailableForBooking ? (
                  <Link
                    href={`/book-appointment?doctor=${doctor.slug}`}
                    className="relative z-10 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group/btn bg-[var(--color-primary)]"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <Calendar className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Book Appointment</span>
                  </Link>
                ) : (
                  <div className="py-4 bg-slate-100 text-slate-500 rounded-xl font-medium text-sm">
                    Currently Unavailable for Online Booking
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
