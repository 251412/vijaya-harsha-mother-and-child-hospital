"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Please enter your name (min 2 characters)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim())) {
      errs.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!subject.trim() || subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }

    if (!message.trim() || message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim(),
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
        throw new Error(data.error || "Failed to submit message");
      }

      setSubmitted(true);
    } catch (err: any) {
      setServerError(err.message || "Failed to deliver message. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center space-y-4 animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#0A2540]">Message Sent Successfully!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you, <strong>{name}</strong>. Our hospital coordination desk has received your inquiry and will reach out to you via email or phone shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
            setFieldErrors({});
          }}
          className="px-5 py-2.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold shadow hover:bg-[#07192C] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-4">
      {serverError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
            }}
            placeholder="First and Last Name"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
              fieldErrors.name ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
            }`}
          />
          {fieldErrors.name && <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
            }}
            placeholder="9876543210"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
              fieldErrors.phone ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
            }`}
          />
          {fieldErrors.phone && <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
            }}
            placeholder="name@example.com"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
              fieldErrors.email ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
            }`}
          />
          {fieldErrors.email && <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (fieldErrors.subject) setFieldErrors({ ...fieldErrors, subject: "" });
            }}
            placeholder="e.g. NICU Facility Inquiry / Maternity Package"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
              fieldErrors.subject ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
            }`}
          />
          {fieldErrors.subject && <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.subject}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Your Message / Inquiry <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
          }}
          placeholder="How can our hospital team assist you?"
          className={`w-full p-3 rounded-xl border text-xs sm:text-sm focus:outline-none resize-none ${
            fieldErrors.message ? "border-rose-400 bg-rose-50/20" : "border-slate-200 focus:border-[#0284C7]"
          }`}
        />
        {fieldErrors.message && <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-sky-300" />
            <span>Submit Hospital Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
