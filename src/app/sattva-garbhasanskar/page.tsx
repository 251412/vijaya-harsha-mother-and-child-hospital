import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Activity, Brain, HeartHandshake, Flower2, Apple, Moon, Wind, Music, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Sattva Garbhasanskar Clinic | Vijaya Harsha Mother & Child Hospital",
  description: "A holistic approach to pregnancy, blending ancient Indian wisdom with modern science at Vijaya Harsha Mother & Child Hospital.",
};

export default function SattvaGarbhasanskarPage() {
  return (
    <div className="flex flex-col w-full bg-[var(--color-ivory)] text-[var(--color-text)]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ivory)] to-transparent -z-10" />
        
        <div className="container-wide text-center max-w-4xl mx-auto">
          <ScrollReveal animation="slideUp" delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-primary-dark)] leading-tight mb-6 tracking-tight uppercase">
              SATTVA GARBHASANSKAR
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" delay={0.2}>
            <p className="text-xl md:text-2xl font-serif text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-3xl mx-auto">
              A Holistic Approach to Pregnancy,<br className="hidden md:block"/>
              Blending Ancient Indian Wisdom with Modern Science
            </p>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Supporting the physical, mental, emotional and spiritual well-being of mother and baby throughout the pregnancy journey.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" delay={0.3}>
            <Link href="/book-appointment" className="btn-primary group inline-flex items-center justify-center px-8 py-4 text-[15px] rounded-full shadow-lg">
              <Calendar className="w-5 h-5 opacity-90 mr-2" />
              <span className="font-bold tracking-wider">BOOK A CONSULTATION</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION - MEET OUR DOCTOR */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="slideRight">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square max-w-md mx-auto lg:max-w-none">
                {/* Fallback to generic portrait if real photo is not mapped */}
                <Image
                  src="/images/dr-d-harshavalli.jpg"
                  alt="Dr. D. Harshavalli"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[var(--color-primary)]/5 mix-blend-multiply" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideLeft">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-sage-light)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary-dark)] mb-2">
                  MEET OUR DOCTOR
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--color-primary-dark)" }}>
                  Dr. D. Harshavalli
                </h2>
                <p className="text-lg font-bold text-[var(--color-primary)] mb-6">
                  Gynecologist<br />
                  <span className="text-slate-500 text-base font-medium">Vijaya Harsha Mother & Child Hospital, Srikakulam</span>
                </p>
                
                <div className="text-[var(--color-text-secondary)] space-y-4 text-base md:text-lg leading-relaxed font-serif italic border-l-4 border-[var(--color-primary-light)] pl-6">
                  <p>
                    "Namaskaram, I am Dr. D. Harshavalli, Gynecologist at Vijaya Harsha Mother & Child Hospital, Srikakulam.
                  </p>
                  <p>
                    Every parent desires for their child to be healthy, possess good values, be intelligent, maintain wonderful relationships with everyone, and reach great heights in life.
                  </p>
                  <p>
                    With this vision, we have launched Sattva Garbhasanskar Clinic, the first Garbhasanskar clinic in Srikakulam."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. WHY SATTVA GARBHASANSKAR? */}
      <section className="py-20 lg:py-28 bg-[#FDF9F4]">
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4 block">WHY SATTVA?</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--color-primary-dark)] mb-6 leading-tight">
                Ancient Wisdom.<br />Modern Science.<br />Holistic Pregnancy Care.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                At Sattva Garbhasanskar Clinic, we bring together the wisdom of ancient Indian culture and the understanding of modern science to create a meaningful and holistic pregnancy journey.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "PHYSICAL WELL-BEING", desc: "Supporting the health and well-being of mother and baby.", icon: <Activity className="w-6 h-6" /> },
              { title: "MENTAL WELL-BEING", desc: "Encouraging a calm, positive and mindful pregnancy experience.", icon: <Brain className="w-6 h-6" /> },
              { title: "EMOTIONAL WELL-BEING", desc: "Creating a supportive environment for emotional balance and positivity.", icon: <HeartHandshake className="w-6 h-6" /> },
              { title: "SPIRITUAL WELL-BEING", desc: "Introducing meaningful practices inspired by Indian traditions for a peaceful pregnancy journey.", icon: <Flower2 className="w-6 h-6" /> },
            ].map((card, idx) => (
              <ScrollReveal key={idx} animation="scaleUp" delay={idx * 0.1} className="h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-border-warm)] h-full flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-sage-light)] flex items-center justify-center mb-6 text-[var(--color-primary-dark)]">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--color-primary-dark)] mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR HOLISTIC APPROACH */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4 block">OUR HOLISTIC APPROACH</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text)] mb-6">
                Nurturing Mother & Baby,<br />Beyond Physical Health
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Along with the physical health of the mother and child, Sattva Garbhasanskar focuses on mental, emotional and spiritual well-being to support every aspect of the pregnancy journey.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['PHYSICAL', 'MENTAL', 'EMOTIONAL', 'SPIRITUAL'].map((title, idx) => (
              <ScrollReveal key={idx} animation="slideUp" delay={idx * 0.15} className="h-full">
                <div className="bg-[var(--color-sage-light)]/30 rounded-2xl p-8 h-full flex flex-col justify-center items-center text-center group hover:bg-[var(--color-primary-dark)] transition-colors duration-500">
                  <span className="text-3xl font-serif text-[var(--color-primary)] opacity-50 group-hover:text-white mb-2 transition-colors duration-500">0{idx + 1}</span>
                  <h3 className="text-lg font-bold tracking-widest uppercase text-[var(--color-primary-dark)] group-hover:text-white transition-colors duration-500">— {title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WORKSHOPS SECTION */}
      <section className="py-20 lg:py-28 bg-[#FDF9F4]">
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-4 block">SATTVA WORKSHOPS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-primary-dark)] mb-6">
                Learn. Practice. Nurture.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                We regularly conduct workshops designed to guide expectant mothers through simple and meaningful practices that can become part of their pregnancy journey.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "DIET & NUTRITION", desc: "Guidance on healthy dietary practices during pregnancy.", icon: <Apple className="w-5 h-5" /> },
              { title: "SLEEP & REST", desc: "Understanding the importance of adequate rest and healthy sleep habits.", icon: <Moon className="w-5 h-5" /> },
              { title: "YOGA", desc: "Pregnancy-friendly yoga practices under appropriate guidance.", icon: <Activity className="w-5 h-5" /> },
              { title: "MANTRA CHANTING", desc: "Traditional chanting practices presented in a calm and mindful setting.", icon: <Music className="w-5 h-5" /> },
              { title: "MEDITATION", desc: "Practices that encourage relaxation, mindfulness and inner calm.", icon: <Flower2 className="w-5 h-5" /> },
              { title: "PRANAYAMA", desc: "Breathing practices introduced appropriately for expectant mothers.", icon: <Wind className="w-5 h-5" /> },
              { title: "MUSIC & BHAJANS", desc: "Soothing music and devotional practices as part of the workshop experience.", icon: <Music className="w-5 h-5" /> },
            ].map((workshop, idx) => (
              <ScrollReveal key={idx} animation="scaleUp" delay={idx * 0.1} className="h-full">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border-warm)] flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-sage-light)] flex items-center justify-center text-[var(--color-primary-dark)] shrink-0">
                      {workshop.icon}
                    </div>
                    <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--color-primary-dark)]">{workshop.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {workshop.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WORKSHOP EXPERIENCE */}
      <section className="py-20 lg:py-24 bg-white overflow-hidden">
        <div className="container-wide">
          <ScrollReveal animation="slideUp">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center text-[var(--color-primary-dark)] mb-16">
              A JOURNEY OF MINDFUL PREGNANCY
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[23px] left-0 w-full h-[2px] bg-[var(--color-sage-light)] z-0"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 relative z-10">
              {[
                { step: "01", label: "Personal Guidance" },
                { step: "02", label: "Healthy Diet & Sleep" },
                { step: "03", label: "Yoga & Breathing" },
                { step: "04", label: "Meditation & Mantras" },
                { step: "05", label: "Music & Bhajans" },
                { step: "06", label: "Holistic Support" },
              ].map((item, idx) => (
                <ScrollReveal key={idx} animation="slideUp" delay={idx * 0.1} className="w-full md:w-auto flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[var(--color-primary)] text-[var(--color-primary-dark)] font-serif font-bold flex items-center justify-center mb-4 shadow-sm relative z-10">
                    {item.step}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-center text-[var(--color-primary-dark)] max-w-[120px]">
                    {item.label}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. DOCTOR'S MESSAGE */}
      <section className="py-20 lg:py-28 bg-[var(--color-sage-light)]/40">
        <div className="container-wide max-w-4xl mx-auto text-center">
          <ScrollReveal animation="scaleUp">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-dark)] mb-6 block">A HEALTHY BEGINNING STARTS WITH CARE</span>
            <blockquote className="text-2xl md:text-4xl font-serif text-[var(--color-primary-dark)] leading-snug mb-10 italic">
              "Our aim is to create a positive and nurturing environment where expectant mothers feel informed, supported and cared for through every stage of their pregnancy journey."
            </blockquote>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-[2px] bg-[var(--color-primary)] mb-3"></div>
              <p className="font-bold text-[var(--color-text)] uppercase tracking-widest text-sm">— Dr. D. Harshavalli</p>
              <p className="text-sm text-slate-500 font-medium">Gynecologist<br/>Vijaya Harsha Mother & Child Hospital, Srikakulam</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-24 relative overflow-hidden bg-[var(--color-primary-dark)] text-white text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        <div className="container-wide relative z-10">
          <ScrollReveal animation="scaleUp">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight font-serif italic text-white">
              BEGIN YOUR JOURNEY WITH SATTVA
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-ivory)] max-w-2xl mx-auto mb-10 opacity-90">
              Discover a holistic approach to pregnancy care at Sattva Garbhasanskar Clinic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book-appointment" className="btn-primary group inline-flex items-center justify-center px-8 py-4 text-[15px] bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-ivory)] rounded-full shadow-lg">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-bold tracking-wider">BOOK A CONSULTATION</span>
              </Link>
              <Link href="/contact" className="btn-secondary group inline-flex items-center justify-center px-8 py-4 text-[15px] border-2 border-white/30 text-white hover:bg-white/10 rounded-full">
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-bold tracking-wider">CONTACT US</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
