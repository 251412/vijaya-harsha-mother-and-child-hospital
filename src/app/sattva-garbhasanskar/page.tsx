import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ArrowRight, Heart, Sparkles, BookOpen, UserCheck, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Sattva Garbhasanskar Program",
  description: "Join the Sattva Garbhasanskar program at Vijaya Harsha Mother & Child Hospital for a holistic, mindful, and guided pregnancy journey.",
};

export default function SattvaGarbhasanskarPage() {
  const programFeatures = [
    {
      title: "[Placeholder] Yoga & Meditation",
      description: "[Placeholder] Expertly guided prenatal yoga and meditation sessions tailored for physical flexibility and mental tranquility.",
      icon: <Heart className="w-6 h-6 text-rose-500" />
    },
    {
      title: "[Placeholder] Nutritional Counseling",
      description: "[Placeholder] Personalized diet plans to ensure optimal growth for the baby and sustained energy for the mother.",
      icon: <Sparkles className="w-6 h-6 text-amber-500" />
    },
    {
      title: "[Placeholder] Mindful Bonding",
      description: "[Placeholder] Techniques to communicate and bond with your unborn child through music, reading, and positive affirmations.",
      icon: <BookOpen className="w-6 h-6 text-teal-600" />
    },
    {
      title: "[Placeholder] Expert Guidance",
      description: "[Placeholder] Regular sessions with experienced obstetricians and psychological counselors to prepare for a joyous delivery.",
      icon: <UserCheck className="w-6 h-6 text-sky-500" />
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#FDF9F4]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F2F2]/50 to-transparent -z-10" />
        
        <div className="container-wide text-center max-w-4xl mx-auto">
          <ScrollReveal animation="slideUp" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-border-light text-xs font-bold uppercase tracking-wider text-primary mb-6">
              <Sparkles className="w-4 h-4 text-warning" />
              <span>Holistic Pregnancy Care</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text leading-tight mb-6 tracking-tight">
              Sattva <span className="text-primary italic font-serif font-normal">Garbhasanskar</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" delay={0.3}>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
              [Placeholder] Embrace a mindful, joyous, and spiritually uplifting pregnancy journey. Our comprehensive Garbhasanskar program nurtures both the mother and the unborn child for a beautiful beginning.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" delay={0.4}>
            <Link href="/book-appointment" className="btn-primary group inline-flex items-center justify-center px-8 py-4 text-[15px]">
              <Calendar className="w-5 h-5 opacity-90" />
              <span>Enroll in Program [Placeholder]</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. PROGRAM IMAGE / INTRODUCTION */}
      <section className="py-12 lg:py-20 relative bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <ScrollReveal animation="slideRight">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
                <Image
                  src="/images/sattva-logo-full.png"
                  alt="Sattva Garbhasanskar Clinic"
                  fill
                  className="object-contain p-8 bg-white"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideLeft">
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="The Philosophy"
                  title="Nurturing the Womb with Positivity"
                  align="left"
                />
                <div className="text-text-secondary space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    Garbhasanskar is an ancient Ayurvedic practice that focuses on the mental, physical, and spiritual well-being of the mother and the fetus. We believe that a mother's state of mind directly influences the baby's development.
                  </p>
                  <p>
                    At Vijaya Harsha Mother & Child Hospital, our Sattva Garbhasanskar program integrates traditional wisdom with modern medical science. Through tailored activities, we help you create a serene environment that fosters healthy brain development and emotional balance in your unborn child.
                  </p>
                </div>
                
                <ul className="space-y-3 pt-4">
                  {[
                    "Reduces pregnancy-related stress and anxiety",
                    "Promotes healthy fetal development",
                    "Prepares the body and mind for a positive birthing experience",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-success-light flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-text font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. PROGRAM FEATURES */}
      <section className="py-16 lg:py-24 bg-[#FDF9F4]">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Program Highlights"
            title="What the Program Offers"
            description="[Placeholder] A beautifully structured journey encompassing various aspects of holistic pregnancy care."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
            {programFeatures.map((feature, idx) => (
              <ScrollReveal key={idx} animation="slideUp" delay={idx * 0.1}>
                <div className="bg-white p-8 rounded-3xl shadow-lg shadow-black/5 border border-border-light h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden text-white" style={{ backgroundColor: "var(--color-primary)" }}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container-wide relative z-10 text-center">
          <ScrollReveal animation="scaleUp">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
              Begin Your Mindful Journey Today
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              Experience the profound benefits of Sattva Garbhasanskar. Reach out to our team to learn more about session schedules and enrollment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-secondary group inline-flex items-center justify-center px-8 py-4 text-[15px] bg-white hover:bg-slate-50" style={{ color: "var(--color-primary)" }}>
                <span>Contact Us for Details</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
