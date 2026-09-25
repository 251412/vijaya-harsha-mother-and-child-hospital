import React, { Suspense } from"react";
import Link from"next/link";
import { 
  ShieldCheck, 
  PhoneCall, 
  AlertCircle,
  Loader2
} from"lucide-react";
import { HOSPITAL_CONFIG } from"@/lib/constants";
import AppointmentBookingForm from"@/components/AppointmentBookingForm";

export const metadata = {
  title:"Book Doctor Appointment | Vijaya Harsha Mother & Child Hospital",
  description:
"Book an appointment online with Dr. N. Vijaya Kumar (Pediatrics/NICU) or Dr. Harsha Latha (Obstetrics/Gynecology) at Vijaya Harsha Mother & Child Hospital, Srikakulam.",
};

async function AppointmentBookingContent({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string; department?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialDoctorId = resolvedParams.doctor;
  const initialDepartment = resolvedParams.department;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Booking Form */}
      <div className="lg:col-span-8">
        <AppointmentBookingForm
          initialDoctorId={initialDoctorId}
          initialDepartment={initialDepartment}
        />
      </div>

      {/* Right Column: Hospital Guidance & Assistance */}
      <div className="lg:col-span-4 space-y-6">
        {/* Booking Process Card */}
        <div className="card p-6 space-y-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color:"var(--color-primary-dark)" }}>
            <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
            <span>How Booking Works</span>
          </h3>

          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full text-white font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor:"var(--color-primary)" }}>
                1
              </span>
              <span>
                <strong>Fill the details:</strong> Choose your doctor, preferred date, and convenient consultation slot.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full text-white font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor:"var(--color-primary)" }}>
                2
              </span>
              <span>
                <strong>Receive Instant ID:</strong> A tracking reference (e.g. <code>VHM-2026-XXXX</code>) is generated and emailed to you.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full text-white font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor:"var(--color-primary)" }}>
                3
              </span>
              <span>
                <strong>Doctor Confirmation:</strong> Our medical triage desk verifies doctor availability and sends you a confirmation notification.
              </span>
            </li>
          </ul>
        </div>

        {/* Emergency Assistance Notice */}
        <div className="p-6 rounded-3xl border space-y-3" style={{ backgroundColor:"var(--color-emergency-light)", borderColor:"rgba(184, 80, 66, 0.25)" }}>
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider" style={{ color:"var(--color-emergency)" }}>
            <AlertCircle className="w-4 h-4" />
            <span>Need Same-Day Emergency Care?</span>
          </div>
          <p className="text-xs leading-relaxed opacity-90" style={{ color:"var(--color-emergency)" }}>
            If you are experiencing active labor pains, severe bleeding, or child respiratory distress, please do not wait for an online appointment. Proceed immediately to our 24/7 Casualty Wing or call:
          </p>
          <a
            href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
            className="w-full block py-2.5 px-4 rounded-xl text-white font-bold text-xs text-center shadow transition-all hover:opacity-95"
            style={{ backgroundColor:"var(--color-emergency)" }}
          >
            Emergency: {HOSPITAL_CONFIG.emergencyPhoneFormatted}
          </a>
        </div>

        {/* Telephone Booking Help */}
        <div className="card p-6 space-y-2 text-xs text-slate-600">
          <h4 className="font-serif font-bold text-sm" style={{ color:"var(--color-primary-dark)" }}>Prefer Booking Over the Phone?</h4>
          <p>
            You can call our reception desk directly between 9:00 AM and 9:00 PM to book or reschedule:
          </p>
          <a
            href={`tel:${HOSPITAL_CONFIG.phone}`}
            className="inline-flex items-center gap-1.5 font-bold text-sm hover:underline mt-1"
            style={{ color:"var(--color-primary)" }}
          >
            <PhoneCall className="w-4 h-4" />
            <span>{HOSPITAL_CONFIG.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BookAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string; department?: string }>;
}) {
  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Banner */}
      <section className="py-20 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor:"rgba(255,255,255,0.12)", color:"var(--color-sage-light)" }}>
            <span>Outpatient Appointment Portal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Book Doctor Consultation
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Schedule a priority consultation with Dr. N. Vijaya Kumar or Dr. Harsha Latha. Get automated confirmation and appointment tracking.
          </p>
        </div>
      </section>

      {/* Main Booking Interface */}
      <section className="py-16">
        <div className="container-wide">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
              </div>
            }
          >
            <AppointmentBookingContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
