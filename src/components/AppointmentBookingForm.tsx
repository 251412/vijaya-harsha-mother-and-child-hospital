"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Stethoscope, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronRight,
  ShieldCheck,
  Building2
} from "lucide-react";
import { DOCTORS, SERVICES, DoctorData } from "@/data/seedData";
import { HOSPITAL_CONFIG } from "@/lib/constants";

interface AppointmentBookingFormProps {
  initialDoctorId?: string;
  initialDepartment?: string;
}

const TIME_SLOTS = [
  "09:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "12:00 PM - 12:30 PM",
  "05:30 PM - 06:00 PM",
  "06:00 PM - 06:30 PM",
  "06:30 PM - 07:00 PM",
  "07:00 PM - 07:30 PM",
  "07:30 PM - 08:00 PM",
  "08:00 PM - 08:30 PM",
];

const DEPARTMENTS = [
  "Pediatrics & Neonatal Care",
  "Obstetrics & Gynecology",
  "Fetal Medicine & Antenatal Care",
  "Pediatric Surgery & Laparoscopy",
  "Level-III Neonatal ICU (NICU)",
  "Childhood Immunization & Nutrition",
];

export default function AppointmentBookingForm({
  initialDoctorId,
  initialDepartment,
}: AppointmentBookingFormProps) {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId || DOCTORS[0]?.id || "");
  const [department, setDepartment] = useState(initialDepartment || DOCTORS[0]?.department || DEPARTMENTS[0]);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0]);
  const [reason, setReason] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    appointmentId: string;
    patientName: string;
    doctorName: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
  } | null>(null);

  // Today's date in YYYY-MM-DD for min attribute
  const todayString = new Date().toISOString().split("T")[0];

  // When selected doctor changes, update department
  const handleDoctorChange = (docId: string) => {
    setSelectedDoctorId(docId);
    const doc = DOCTORS.find((d) => d.id === docId);
    if (doc) {
      setDepartment(doc.department);
    }
  };

  // Client side validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!patientName.trim() || patientName.trim().length < 2) {
      errors.patientName = "Patient name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patientEmail.trim() || !emailRegex.test(patientEmail.trim())) {
      errors.patientEmail = "Please enter a valid email address";
    }

    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (!patientPhone.trim() || !phoneRegex.test(patientPhone.trim())) {
      errors.patientPhone = "Please enter a valid 10-digit Indian mobile number";
    }

    if (!selectedDoctorId) {
      errors.doctorId = "Please select a consulting doctor";
    }

    if (!department) {
      errors.department = "Please select a department";
    }

    if (!preferredDate) {
      errors.preferredDate = "Please choose an appointment date";
    } else {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errors.preferredDate = "Appointment date cannot be in the past";
      }
    }

    if (!preferredTime) {
      errors.preferredTime = "Please select a time slot";
    }

    if (!reason.trim() || reason.trim().length < 3) {
      errors.reason = "Please enter symptoms or reason for visit (minimum 3 characters)";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    const doctorObj = DOCTORS.find((d) => d.id === selectedDoctorId);
    const doctorName = doctorObj ? doctorObj.name : "Consultant Specialist";

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: patientName.trim(),
          patientEmail: patientEmail.trim().toLowerCase(),
          patientPhone: patientPhone.trim(),
          doctorId: selectedDoctorId,
          doctorName,
          department,
          preferredDate,
          preferredTime,
          reason: reason.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.details) {
          const formatted: Record<string, string> = {};
          for (const key in data.details) {
            formatted[key] = data.details[key][0];
          }
          setFieldErrors(formatted);
        }
        throw new Error(data.error || "Failed to submit appointment");
      }

      setSuccessData({
        appointmentId: data.appointmentId,
        patientName: data.data?.patientName || patientName,
        doctorName: data.data?.doctorName || doctorName,
        preferredDate: data.data?.preferredDate || preferredDate,
        preferredTime: data.data?.preferredTime || preferredTime,
        status: data.data?.status || "PENDING",
      });
    } catch (err: any) {
      setServerError(err.message || "Unable to book appointment. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setPatientName("");
    setPatientEmail("");
    setPatientPhone("");
    setPreferredDate("");
    setReason("");
    setFieldErrors({});
  };

  if (successData) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-xl text-center max-w-xl mx-auto animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
          Status: {successData.status} (Under Medical Review)
        </span>

        <h3 className="text-2xl font-black text-[#0A2540] tracking-tight">
          Appointment Request Received!
        </h3>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 my-6 text-left space-y-2 text-sm">
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Tracking ID:</span>
            <span className="font-extrabold text-[#0284C7] font-mono text-base">{successData.appointmentId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Patient:</span>
            <span className="font-bold text-slate-800">{successData.patientName}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Doctor:</span>
            <span className="font-bold text-slate-800">{successData.doctorName}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Date & Slot:</span>
            <span className="font-bold text-slate-800">{successData.preferredDate} ({successData.preferredTime})</span>
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-sky-800 text-left mb-6 space-y-1">
          <p className="font-bold text-sky-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            What happens next?
          </p>
          <p>
            1. We have sent an acknowledgement receipt to your registered email.
          </p>
          <p>
            2. The hospital medical team is reviewing doctor availability and will confirm your slot shortly via email.
          </p>
          <p>
            3. For urgent medical queries or same-day scheduling, contact our desk at <strong>{HOSPITAL_CONFIG.phoneFormatted}</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-[#0A2540] hover:bg-[#07192C] text-white font-bold text-xs shadow-md transition-colors"
          >
            Book Another Appointment
          </button>
          <a
            href={HOSPITAL_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            View Hospital Location
          </a>
        </div>
      </div>
    );
  }

  const activeDoctor = DOCTORS.find((d) => d.id === selectedDoctorId);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
      {serverError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Submission Error</strong>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      {/* Patient Information Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Patient Contact Details</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Patient Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Patient / Parent Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={patientName}
                onChange={(e) => {
                  setPatientName(e.target.value);
                  if (fieldErrors.patientName) setFieldErrors({ ...fieldErrors, patientName: "" });
                }}
                placeholder="Full Name"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
                  fieldErrors.patientName ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
                }`}
              />
            </div>
            {fieldErrors.patientName && (
              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.patientName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => {
                  setPatientEmail(e.target.value);
                  if (fieldErrors.patientEmail) setFieldErrors({ ...fieldErrors, patientEmail: "" });
                }}
                placeholder="patient@example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
                  fieldErrors.patientEmail ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
                }`}
              />
            </div>
            {fieldErrors.patientEmail && (
              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.patientEmail}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mobile Number (10 Digits) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => {
                  setPatientPhone(e.target.value);
                  if (fieldErrors.patientPhone) setFieldErrors({ ...fieldErrors, patientPhone: "" });
                }}
                placeholder="9876543210"
                maxLength={13}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
                  fieldErrors.patientPhone ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
                }`}
              />
            </div>
            {fieldErrors.patientPhone && (
              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.patientPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Doctor & Department Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Stethoscope className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Doctor & Clinical Department</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Doctor Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Specialist Doctor <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => handleDoctorChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0284C7] focus:outline-none bg-white"
            >
              {DOCTORS.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialization}
                </option>
              ))}
            </select>
            {activeDoctor && (
              <p className="text-[11px] text-[#0284C7] mt-1 font-medium">
                Timings: {activeDoctor.consultationTimings} ({activeDoctor.consultationDays.slice(0, 3).join(", ")}...)
              </p>
            )}
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Department / Service Care <span className="text-rose-500">*</span>
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0284C7] focus:outline-none bg-white"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Date & Time Slot Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Preferred Date & Convenient Slot</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Appointment Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              min={todayString}
              value={preferredDate}
              onChange={(e) => {
                setPreferredDate(e.target.value);
                if (fieldErrors.preferredDate) setFieldErrors({ ...fieldErrors, preferredDate: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                fieldErrors.preferredDate ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
              }`}
            />
            {fieldErrors.preferredDate && (
              <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.preferredDate}</p>
            )}
          </div>

          {/* Time Slot Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Time Slot <span className="text-rose-500">*</span>
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#0284C7] focus:outline-none bg-white"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reason for Visit */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Reason for Visit / Symptoms <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (fieldErrors.reason) setFieldErrors({ ...fieldErrors, reason: "" });
          }}
          placeholder="Briefly describe symptoms, pregnancy trimester, or child's health concern..."
          className={`w-full p-3 rounded-xl border text-xs sm:text-sm focus:outline-none resize-none ${
            fieldErrors.reason ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
          }`}
        />
        {fieldErrors.reason && (
          <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.reason}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] text-white font-bold text-sm shadow-xl shadow-slate-900/10 hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-sky-400" />
              <span>Registering Appointment & Notifying Medical Team...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-sky-300" />
              <span>Confirm & Book Appointment</span>
              <ChevronRight className="w-4 h-4 ml-1 text-slate-300" />
            </>
          )}
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-2.5">
          🔒 Secure submission • Status updates and doctor confirmation will be sent to your email.
        </p>
      </div>
    </form>
  );
}
