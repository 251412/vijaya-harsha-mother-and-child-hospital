import React from "react";
import Link from "next/link";
import { 
  PhoneCall, 
  AlertCircle, 
  Navigation, 
  Clock, 
  ShieldAlert, 
  Baby, 
  HeartHandshake, 
  Activity,
  MapPin,
  Ambulance,
  CheckCircle2
} from "lucide-react";
import { HOSPITAL_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "24/7 Mother & Child Emergency | Vijaya Harsha Hospital Srikakulam",
  description:
    "24/7 Emergency Casualty and Ambulance for mothers, newborns, and pediatric emergencies in Srikakulam. Direct emergency hotlines, protocols, and Google Maps turn-by-turn navigation.",
};

export default function EmergencyPage() {
  return (
    <div className="flex flex-col w-full bg-[#F8FAFC]">
      {/* High Urgency Emergency Header */}
      <section className="bg-gradient-to-br from-[#881337] via-[#9f1239] to-[#0A2540] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-rose-200 text-xs font-black uppercase tracking-wider mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-300"></span>
            </span>
            <span>24 Hours • 7 Days • Always Open</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Mother & Child Emergency Care
          </h1>
          <p className="text-rose-100 text-base sm:text-lg max-w-2xl mt-3 font-medium">
            Immediate life-support and clinical intervention for obstetric emergencies, preterm labor, newborn complications, and acute pediatric trauma in Srikakulam.
          </p>

          {/* Rapid Action Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
            <a
              href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-rose-900 hover:bg-rose-50 font-black text-base shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <PhoneCall className="w-5 h-5 text-rose-600 animate-bounce" />
              <span>Direct Emergency: {HOSPITAL_CONFIG.emergencyPhoneFormatted}</span>
            </a>

            <a
              href={`tel:${HOSPITAL_CONFIG.ambulancePhone}`}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-rose-900/60 hover:bg-rose-900 text-white font-bold text-sm border border-rose-300/30 flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Ambulance Dispatch: {HOSPITAL_CONFIG.ambulancePhone}</span>
            </a>

            <a
              href={HOSPITAL_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/30 hover:bg-black/40 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <Navigation className="w-4 h-4 text-sky-300" />
              <span>GPS Turn-by-Turn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Readiness Features */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Immediate Clinical Capability</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight mt-1">
              Round-the-Clock Emergency Protocols
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our emergency casualty unit is always staffed with qualified doctors and nurses prepared for immediate action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Maternity Emergencies */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">Obstetric & Delivery Emergencies</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Active labor & sudden rupture of membranes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Antepartum hemorrhage / severe pregnancy bleeding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>High blood pressure crisis / pre-eclampsia</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Emergency Cesarean Section readiness in under 20 minutes</span>
                </li>
              </ul>
            </div>

            {/* Neonatal Emergencies */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">Level-III NICU Newborn Emergencies</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Extreme preterm delivery (down to 26 weeks gestation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Severe neonatal breathing distress & meconium aspiration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>High bilirubin neonatal jaundice requiring exchange transfusion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Neonatal sepsis, hypothermia, or seizures</span>
                </li>
              </ul>
            </div>

            {/* Pediatric Emergencies */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">Pediatric Trauma & Acute Illness</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Severe pediatric asthma attacks & breathlessness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>High-grade febrile convulsions and child seizures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Acute dehydration from severe vomiting / diarrhea</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Accidental ingestions, foreign body choking & pediatric burns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Location & Turn-by-Turn GPS Map */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200/80">
        <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Emergency Access Point</span>
              <h3 className="text-2xl font-black text-[#0A2540]">
                Hospital Address & Arrival Instructions
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900">{HOSPITAL_CONFIG.address.full}</span>
                </p>
                <p className="text-slate-500">
                  Landmark: Near Saraswathi Mahal / Rythu Bazar on 80 Feet Road. Wide road allowing rapid ambulance entry directly to casualty.
                </p>
                <p className="flex items-center gap-2 pt-2">
                  <PhoneCall className="w-4 h-4 text-[#0284C7]" />
                  <span>Casualty Desk: {HOSPITAL_CONFIG.emergencyPhoneFormatted}</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={HOSPITAL_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Turn-by-Turn GPS Navigation</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <iframe
                title="Vijaya Harsha Hospital Emergency Location"
                src={HOSPITAL_CONFIG.embedMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
