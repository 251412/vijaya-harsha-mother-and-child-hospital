import React from"react";
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Navigation, 
  AlertCircle,
  MessageCircle
} from"lucide-react";
import { HOSPITAL_CONFIG } from"@/lib/constants";
import ContactForm from"@/components/ContactForm";

export const metadata = {
  title:"Contact Us & Location | Vijaya Harsha Mother & Child Hospital",
  description:
"Get in touch with Vijaya Harsha Mother & Child Hospital in Srikakulam. View our Google Maps location, address at 80 Feet Road, phone numbers, and submit an online inquiry.",
};

export default function ContactPage() {
  const cleanWhatsAppNumber = HOSPITAL_CONFIG.whatsappNumber.replace(/[^0-9]/g,"");

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor:"var(--color-ivory)" }}>
      {/* Banner */}
      <section className="py-20 text-white" style={{ backgroundColor:"var(--color-primary-dark)" }}>
        <div className="container-wide text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor:"rgba(255,255,255,0.12)", color:"var(--color-sage-light)" }}>
            <span>Hospital Reception &amp; Inquiries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Contact &amp; Find Us
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color:"rgba(255, 255, 255, 0.85)" }}>
            Have a question regarding consultations, delivery packages, or neonatal care? Reach out to our hospital coordination team or visit us in Srikakulam.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Info Cards + Contact Form */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Hospital Coordinates & Quick Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--color-primary)" }}>Hospital Desk</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight mt-1" style={{ color:"var(--color-primary-dark)" }}>
                  We are here for you and your baby
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Our coordination desk operates round-the-clock to guide patients, arrange specialist appointments, and facilitate immediate emergency admissions.
                </p>
              </div>

              {/* Emergency Alert Box */}
              <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor:"var(--color-emergency-light)", borderColor:"rgba(184, 80, 66, 0.25)" }}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider" style={{ color:"var(--color-emergency)" }}>
                  <AlertCircle className="w-4 h-4" />
                  <span>24/7 Obstetric &amp; Child Emergency</span>
                </div>
                <a
                  href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`}
                  className="text-2xl font-black block transition-colors hover:opacity-80"
                  style={{ color:"var(--color-emergency)" }}
                >
                  {HOSPITAL_CONFIG.emergencyPhoneFormatted}
                </a>
                <p className="text-xs opacity-90" style={{ color:"var(--color-emergency)" }}>
                  Ambulance dispatch &amp; resident medical team on standby 24 hours every day.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                {/* Address */}
                <div className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold" style={{ color:"var(--color-primary-dark)" }}>Hospital Address</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {HOSPITAL_CONFIG.address.full}
                    </p>
                    <a
                      href={HOSPITAL_CONFIG.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold hover:underline mt-2"
                      style={{ color:"var(--color-primary)" }}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get GPS Directions on Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold" style={{ color:"var(--color-primary-dark)" }}>Phone &amp; Appointments</h3>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1 space-y-0.5">
                      <p>Front Desk: <a href={`tel:${HOSPITAL_CONFIG.phone}`} className="font-semibold text-slate-800 hover:underline">{HOSPITAL_CONFIG.phoneFormatted}</a></p>
                      <p>Emergency: <a href={`tel:${HOSPITAL_CONFIG.emergencyPhone}`} className="font-semibold hover:underline" style={{ color:"var(--color-emergency)" }}>{HOSPITAL_CONFIG.emergencyPhoneFormatted}</a></p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Email */}
                <div className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold" style={{ color:"var(--color-primary-dark)" }}>Digital Chat &amp; Email</h3>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1 space-y-1">
                      <p>
                        <a
                          href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent("Hello Vijaya Harsha Hospital, I would like to inquire about consultations.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                        >
                          Chat on WhatsApp ({HOSPITAL_CONFIG.whatsappNumber})
                        </a>
                      </p>
                      <p className="flex items-center gap-1 text-slate-500 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{HOSPITAL_CONFIG.email}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor:"var(--color-primary)" }}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold" style={{ color:"var(--color-primary-dark)" }}>OPD &amp; Visiting Hours</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong>OPD Hours:</strong> {HOSPITAL_CONFIG.workingHours.opdGeneral}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <strong>Emergency Care:</strong> 24 Hours / 7 Days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="card p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--color-primary)" }}>Online Inquiry</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold" style={{ color:"var(--color-primary-dark)" }}>
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details below and our patient care representative will contact you shortly.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Maps Section */}
      <section className="py-16 bg-white border-t" style={{ borderColor:"var(--color-border-warm)" }}>
        <div className="container-wide space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--color-primary)" }}>Hospital Location Map</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color:"var(--color-primary-dark)" }}>Find Us in Srikakulam</h2>
            <p className="text-xs text-slate-500">
              Conveniently located on 80 Feet Road, PN Colony, Srikakulam — easily accessible from all major highways.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border relative h-96 w-full" style={{ borderColor:"var(--color-border-warm)" }}>
            <iframe
              title="Vijaya Harsha Hospital Google Maps Location"
              src={HOSPITAL_CONFIG.embedMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
