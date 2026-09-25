import React, { Suspense } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  Calendar, 
  User, 
  Stethoscope,
  Building2,
  PhoneCall,
  Loader2
} from "lucide-react";
import { HOSPITAL_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "Appointment Action Verification | Vijaya Harsha Hospital",
  description: "Doctor single-use email action triage verification page for Vijaya Harsha Mother & Child Hospital.",
};

async function AppointmentActionResultContent({
  searchParams,
}: {
  searchParams: Promise<{
    state?: string;
    action?: string;
    appointmentId?: string;
    patientName?: string;
    doctorName?: string;
    preferredDate?: string;
    preferredTime?: string;
    currentStatus?: string;
    message?: string;
  }>;
}) {
  const params = await searchParams;
  const state = params.state || "error";
  const action = params.action;
  const appointmentId = params.appointmentId || "Unknown ID";
  const patientName = params.patientName || "Patient";
  const doctorName = params.doctorName || "Doctor";
  const preferredDate = params.preferredDate || "";
  const preferredTime = params.preferredTime || "";
  const currentStatus = params.currentStatus || "";
  const message = params.message;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xl text-center space-y-6 animate-fadeIn">
        {/* State 1: Success Confirmation */}
        {state === "success" && action === "confirm" && (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Status Updated: CONFIRMED
            </div>

            <h1 className="text-2xl font-black text-[#0A2540] tracking-tight">
              Appointment Successfully Confirmed!
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              The appointment has been confirmed in the hospital database, and an official confirmation email with directions has been dispatched to the patient.
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Appointment ID:</span>
                <span className="font-mono font-bold text-[#0284C7]">{appointmentId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Patient:</span>
                <span className="font-bold text-slate-800">{patientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Doctor:</span>
                <span className="font-bold text-slate-800">{doctorName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Schedule:</span>
                <span className="font-bold text-slate-800">{preferredDate} • {preferredTime}</span>
              </div>
            </div>
          </>
        )}

        {/* State 2: Success Cancellation */}
        {state === "success" && action === "cancel" && (
          <>
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
              <XCircle className="w-9 h-9" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
              Status Updated: CANCELLED
            </div>

            <h1 className="text-2xl font-black text-[#0A2540] tracking-tight">
              Appointment Request Declined
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              The appointment has been marked as <strong>CANCELLED</strong> in the hospital database. A notification email explaining the unavailability and providing rescheduling assistance has been dispatched to the patient.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-1.5">
              <p><span className="text-slate-500 font-medium">Appointment ID:</span> <strong className="font-mono">{appointmentId}</strong></p>
              <p><span className="text-slate-500 font-medium">Patient:</span> <strong>{patientName}</strong></p>
              <p><span className="text-slate-500 font-medium">Doctor:</span> <strong>{doctorName}</strong></p>
            </div>
          </>
        )}

        {/* State 3: Already Used Link */}
        {state === "already_used" && (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-9 h-9" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              Single-Use Token Expired
            </div>

            <h1 className="text-2xl font-black text-[#0A2540] tracking-tight">
              Link Has Already Been Processed
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              This action link was previously utilized. The appointment (<strong>{appointmentId}</strong>) is currently in status:
            </p>

            <div className="py-2">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-extrabold ${
                currentStatus === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}>
                {currentStatus || "PROCESSED"}
              </span>
            </div>

            <p className="text-xs text-slate-500">
              For patient safety and audit security, tokens cannot be reused to change states once executed.
            </p>
          </>
        )}

        {/* State 4: Expired Link */}
        {state === "expired" && (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Clock className="w-9 h-9" />
            </div>

            <h1 className="text-2xl font-black text-[#0A2540] tracking-tight">
              Action Link Expired
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              Doctor action links remain valid for 72 hours following initial booking submission.
            </p>
          </>
        )}

        {/* State 5: Generic Error */}
        {state === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-9 h-9" />
            </div>

            <h1 className="text-2xl font-black text-[#0A2540] tracking-tight">
              Unable to Verify Action Token
            </h1>

            <p className="text-xs sm:text-sm text-rose-600">
              {message || "The action token is invalid or missing. Please refer to the latest email notification."}
            </p>
          </>
        )}

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold shadow hover:bg-[#07192C] transition-colors"
          >
            Go to Hospital Homepage
          </Link>
          <a
            href={`tel:${HOSPITAL_CONFIG.phone}`}
            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Reception</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentActionPage({
  searchParams,
}: {
  searchParams: Promise<{
    state?: string;
    action?: string;
    appointmentId?: string;
    patientName?: string;
    doctorName?: string;
    preferredDate?: string;
    preferredTime?: string;
    currentStatus?: string;
    message?: string;
  }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0284C7]" />
        </div>
      }
    >
      <AppointmentActionResultContent searchParams={searchParams} />
    </Suspense>
  );
}
