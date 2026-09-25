export interface DoctorData {
  id: string;
  name: string;
  slug: string;
  qualification: string;
  specialization: string;
  department: string;
  experienceYears: number;
  bio: string;
  photoUrl: string;
  consultationDays: string[];
  consultationTimings: string;
  isAvailableForBooking: boolean;
  order: number;
}

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  benefits: string[];
  features: string[];
  imageUrl: string;
  order: number;
}

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
}

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  order: number;
}

export interface TestimonialData {
  id: string;
  patientName: string;
  relation: string;
  location: string;
  rating: number;
  comment: string;
  treatment: string;
  date: string;
}

export const DOCTORS: DoctorData[] = [
  {
    id: "doc-1",
    name: "Dr. N. Vijaya Kumar",
    slug: "dr-n-vijaya-kumar",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    specialization: "Senior Pediatrician & Chief Neonatologist",
    department: "Pediatrics & Neonatal Care",
    experienceYears: 22,
    bio: "Dr. N. Vijaya Kumar is the Founder and Chief Pediatrician at Vijaya Harsha Mother & Child Hospital. With over 22 years of clinical excellence in Srikakulam and North Coastal Andhra Pradesh, he has spearheaded neonatal intensive care (NICU Level-III), reviving critically ill preterm newborns and guiding thousands of healthy children.",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    consultationDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationTimings: "09:30 AM - 01:30 PM & 05:30 PM - 09:00 PM",
    isAvailableForBooking: true,
    order: 1
  },
  {
    id: "doc-2",
    name: "Dr. K. Harsha Latha",
    slug: "dr-k-harsha-latha",
    qualification: "MBBS, MS (OBG), FMAS, DNB",
    specialization: "Senior Obstetrician, Gynecologist & Laparoscopic Surgeon",
    department: "Obstetrics & Gynecology",
    experienceYears: 18,
    bio: "Dr. K. Harsha Latha is renowned for compassionate, evidence-based maternity and women's health care. Specializing in high-risk obstetrics, painless natural labor, minimally invasive laparoscopic gynecological surgeries, and pre-conceptional counseling.",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    consultationDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationTimings: "10:00 AM - 02:00 PM & 05:00 PM - 08:30 PM",
    isAvailableForBooking: true,
    order: 2
  },
  {
    id: "doc-3",
    name: "Dr. P. Sridevi",
    slug: "dr-p-sridevi",
    qualification: "MBBS, MD (OBG), Fellowship in Fetal Medicine",
    specialization: "Fetal Medicine Specialist & High-Risk Pregnancy Consultant",
    department: "Fetal Medicine & Antenatal Care",
    experienceYears: 14,
    bio: "Specializing in targeted anomaly scans, genetic screenings, amniocentesis, and intra-uterine fetal wellness monitoring. Dr. Sridevi ensures that unborn babies receive the earliest advanced diagnostics for optimal birth outcomes.",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    consultationDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    consultationTimings: "10:00 AM - 01:30 PM",
    isAvailableForBooking: true,
    order: 3
  },
  {
    id: "doc-4",
    name: "Dr. B. Ramesh Varma",
    slug: "dr-b-ramesh-varma",
    qualification: "MBBS, MS (Gen Surg), M.Ch (Pediatric Surgery)",
    specialization: "Consultant Pediatric & Neonatal Surgeon",
    department: "Pediatric Surgery",
    experienceYears: 16,
    bio: "Dedicated to newborn congenital anomaly corrections, pediatric urology, and keyhole surgeries in infants and young children with microscopic precision and gentle post-operative pediatric recovery.",
    photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
    consultationDays: ["Tuesday", "Thursday", "Saturday"],
    consultationTimings: "11:00 AM - 03:00 PM",
    isAvailableForBooking: true,
    order: 4
  }
];

export const SERVICES: ServiceData[] = [
  {
    id: "srv-1",
    title: "Maternity & Comprehensive Birthing Care",
    slug: "maternity-birthing-care",
    category: "Maternity",
    shortDescription: "Compassionate antenatal care, painless normal deliveries, state-of-the-art labor delivery recovery suites (LDR), and emergency cesarean sections.",
    fullDescription: "At Vijaya Harsha Hospital, childbirth is celebrated with the highest medical safety and familial warmth. Our multidisciplinary team provides complete pregnancy monitoring, non-stress testing (NST), epidural analgesia for painless normal deliveries, and round-the-clock emergency obstetric surgery suites ready within minutes.",
    iconName: "Baby",
    benefits: [
      "Modern Labor Delivery Recovery (LDR) private suites",
      "Painless delivery with experienced in-house anesthetists",
      "24/7 dedicated obstetric emergency theater",
      "Continuous electronic fetal heart rate monitoring"
    ],
    features: [
      "Advanced GE Healthcare ultrasound & Doppler",
      "Lactation consultant & post-delivery mother care",
      "Neonatal team present at every high-risk delivery"
    ],
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000",
    order: 1
  },
  {
    id: "srv-2",
    title: "Level-III Neonatal Intensive Care (NICU)",
    slug: "level-3-nicu",
    category: "Neonatology",
    shortDescription: "Advanced life-support intensive care for premature, low birth weight, and critically ill newborns with 24/7 monitoring.",
    fullDescription: "Our Level-III NICU is one of Srikakulam's foremost tertiary neonatal centers, equipped with servo-controlled incubators, high-frequency ventilators, LED phototherapy units, invasive arterial blood gas monitoring, and laminar airflow sterilization preventing neonatal infections.",
    iconName: "ShieldAlert",
    benefits: [
      "Care for extreme preterms born down to 26 weeks",
      "Surfactant replacement therapy & nitric oxide support",
      "Kangaroo Mother Care (KMC) dedicated wing",
      "1:1 specialized neonatal nurse-to-baby ratio"
    ],
    features: [
      "GE Giraffe OmniBed hybrid warmers",
      "Dräger neonatal multi-mode ventilators",
      "24/7 in-house neonatologist coverage"
    ],
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000",
    order: 2
  },
  {
    id: "srv-3",
    title: "General & Advanced Pediatric Care",
    slug: "pediatric-care",
    category: "Pediatrics",
    shortDescription: "Holistic child healthcare from birth through 18 years, including childhood infections, asthma, nutrition, and developmental milestones.",
    fullDescription: "Led by Senior Pediatrician Dr. N. Vijaya Kumar, our pediatrics wing provides a warm, child-friendly environment designed to eliminate hospital anxiety. We manage acute pediatric emergencies, recurrent respiratory illnesses, allergies, and pediatric developmental assessments.",
    iconName: "HeartHandshake",
    benefits: [
      "Child-friendly examination rooms and play areas",
      "Pediatric asthma and allergy management clinic",
      "Growth tracking and developmental milestone screening",
      "Childhood nutrition & adolescent health counseling"
    ],
    features: [
      "Rapid point-of-care pediatric lab diagnostics",
      "Nebulization stations with calm atmosphere",
      "Dedicated Pediatric Intensive Care Unit (PICU)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=1000",
    order: 3
  },
  {
    id: "srv-4",
    title: "High-Risk Pregnancy & Fetal Medicine",
    slug: "high-risk-pregnancy",
    category: "Maternity",
    shortDescription: "Specialized clinical protocols for maternal hypertension, gestational diabetes, twins/triplets, and recurrent pregnancy loss.",
    fullDescription: "High-risk pregnancies require experienced vigilance. Dr. K. Harsha Latha and Dr. P. Sridevi work closely to detect maternal and fetal complications early, implementing personalized management plans that safely bring both mother and baby through delivery.",
    iconName: "Activity",
    benefits: [
      "Comprehensive screening for preeclampsia and gestational diabetes",
      "First-trimester NT/NB screening and Quadruple marker analysis",
      "High-resolution targeted anomaly scans (TIFFA)",
      "Continuous fetal biophysical profile (BPP) assessments"
    ],
    features: [
      "Voluson E10 High-definition 4D ultrasound",
      "Cardiotocography (CTG) real-time telemetry",
      "Blood bank access & intensive maternal monitoring"
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
    order: 4
  },
  {
    id: "srv-5",
    title: "Pediatric Surgery & Minimally Invasive Laparoscopy",
    slug: "pediatric-surgery",
    category: "Surgery",
    shortDescription: "Microscopic and laparoscopic surgical interventions for pediatric hernias, appendicitis, and congenital anomalies with minimal pain.",
    fullDescription: "Our pediatric surgical team delivers gentle surgical interventions with child-sized instruments, specialized pediatric anesthesia, and rapid recovery times so children can return home swiftly to their families.",
    iconName: "Syringe",
    benefits: [
      "Minimally invasive keyhole surgeries for tiny scars",
      "Congenital malformation repairs for newborns",
      "Dedicated pediatric post-operative recovery unit",
      "Child-friendly anesthesia protocols reducing trauma"
    ],
    features: [
      "Karl Storz HD Pediatric Laparoscopy System",
      "Ultra-sterile modular laminar air flow operating suite",
      "24/7 emergency trauma surgical coverage"
    ],
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000",
    order: 5
  },
  {
    id: "srv-6",
    title: "Childhood Immunization & Preventive Care",
    slug: "immunization-vaccination",
    category: "Preventive",
    shortDescription: "Complete WHO & IAP recommended vaccination schedule maintained under strict cold-chain temperature monitoring.",
    fullDescription: "Immunization is the cornerstone of child wellness. Vijaya Harsha Hospital maintains the highest cold-chain standards for all childhood and adolescent vaccines, offering personalized vaccine schedules, painless needle techniques, and digital reminders.",
    iconName: "ShieldCheck",
    benefits: [
      "100% unbroken cold-chain monitored storage (2°C to 8°C)",
      "Painless vaccination options available",
      "Digital immunization records and reminder alerts",
      "Counseling on optional & travel vaccines"
    ],
    features: [
      "Medical-grade backup power refrigerators",
      "WHO & Indian Academy of Pediatrics (IAP) certified schedule",
      "Catch-up vaccination planning for missed doses"
    ],
    imageUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1000",
    order: 6
  }
];

export const BLOG_POSTS: BlogPostData[] = [
  {
    id: "blog-1",
    title: "Essential Warning Signs During Pregnancy: When to Seek Immediate Emergency Care",
    slug: "warning-signs-during-pregnancy",
    category: "Pregnancy Care",
    authorName: "Dr. K. Harsha Latha",
    authorRole: "Senior Obstetrician & Gynecologist",
    publishedAt: "March 15, 2026",
    readTime: "5 min read",
    excerpt: "Learn the crucial symptoms during pregnancy—such as persistent headaches, sudden swelling, or reduced fetal movement—that require prompt medical evaluation.",
    content: `
Pregnancy is an extraordinary journey filled with physical transformations. While mild aches, occasional fatigue, and light nausea are common, certain clinical symptoms demand immediate attention from your obstetrician.

### 1. Severe or Sudden Headaches with Vision Changes
Persistent frontal headaches that do not resolve with rest or hydration, especially when accompanied by blurred vision, flashes of light, or dizziness, can be early signs of preeclampsia (pregnancy-induced high blood pressure). Measuring your blood pressure immediately is critical.

### 2. Decreased or Altered Fetal Movements
After 24–28 weeks, pregnant mothers become accustomed to their baby's active kick patterns. If you notice a noticeable drop in movement (fewer than 10 kicks within two hours during quiet observation), visit the hospital immediately for a non-stress test (NST) and ultrasound fetal Doppler assessment.

### 3. Vaginal Bleeding or Fluid Leakage
Any bright red spotting, continuous bleeding, or watery gushes before your due date requires emergency evaluation. Leaking amniotic fluid can indicate premature rupture of membranes (PROM), which requires sterile hospital management to prevent infection.

### 4. Sudden Severe Swelling in Hands, Face, or Feet
While mild ankle edema after long hours of standing is typical, rapid swelling of the eyelids, face, or hands over 24 hours should be checked immediately for protein in urine and blood pressure spikes.

### When in Doubt, Call Vijaya Harsha Hospital 24/7
Our obstetric emergency unit is staffed 24 hours a day with obstetricians, emergency fetal monitors, and delivery suites ready at a moment's notice.
    `,
    coverImage: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1000",
    tags: ["Pregnancy", "Maternal Health", "Emergency Care", "Obstetrics"]
  },
  {
    id: "blog-2",
    title: "Understanding Newborn Jaundice: Causes, Treatment, and When Phototherapy is Needed",
    slug: "understanding-newborn-jaundice",
    category: "Newborn Care",
    authorName: "Dr. N. Vijaya Kumar",
    authorRole: "Senior Pediatrician & Chief Neonatologist",
    publishedAt: "March 08, 2026",
    readTime: "6 min read",
    excerpt: "Newborn jaundice affects over 60% of healthy infants. Discover how bilirubin levels are measured, the safety of modern phototherapy, and feeding advice.",
    content: `
Welcoming a newborn brings immense joy, but seeing a yellowish tinge appear on your baby's skin or eyes within the first few days can cause understandable anxiety.

### What Causes Neonatal Jaundice?
Jaundice occurs when a newborn's bloodstream contains elevated levels of bilirubin—a natural byproduct formed when red blood cells break down. Because a newborn's liver is still maturing, it takes several days for the baby to process and eliminate bilirubin effectively through stools and urine.

### Physiological vs. Pathological Jaundice
* **Physiological Jaundice (Most Common):** Typically appears on day 2 or 3 of life, peaks between day 4 and 5, and gradually resolves within 1 to 2 weeks as feeding improves and the liver matures.
* **Early-Onset Jaundice (First 24 Hours):** Jaundice appearing within the first day of life is medical emergency that may stem from blood group incompatibility (ABO or Rh incompatibility) or enzyme deficiencies.

### The Role of Frequent Feeding
Frequent breastfeeding (8 to 12 times in 24 hours) stimulates frequent bowel movements, which helps clear bilirubin from the baby's system. Never substitute formula without consulting your pediatrician, but ensure adequate hydration.

### Modern LED Phototherapy at Vijaya Harsha Hospital
When bilirubin exceeds safe thresholds, our Level-III NICU utilizes specialized blue-spectrum LED phototherapy units. The light alters the molecular structure of bilirubin so the infant can excrete it safely through urine without liver processing. The procedure is painless, highly effective, and gentle on the baby's delicate skin.
    `,
    coverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1000",
    tags: ["Newborn Care", "Pediatrics", "NICU", "Jaundice"]
  },
  {
    id: "blog-3",
    title: "Childhood Vaccination Guide: Why Sticking to the IAP Schedule Protects Your Family",
    slug: "childhood-vaccination-schedule-guide",
    category: "Immunization",
    authorName: "Dr. N. Vijaya Kumar",
    authorRole: "Senior Pediatrician & Chief Neonatologist",
    publishedAt: "February 22, 2026",
    readTime: "4 min read",
    excerpt: "A comprehensive breakdown of key childhood immunizations from birth to age 5, explaining herd immunity, cold-chain safety, and painless vaccines.",
    content: `
Vaccines are universally recognized as one of modern medicine's greatest achievements, preventing debilitating diseases such as polio, diphtheria, measles, and rotaviral diarrhea.

### The Cold-Chain Guarantee
A vaccine's efficacy hinges on maintaining strict temperature control from manufacture to administration (strictly 2°C to 8°C). At Vijaya Harsha Hospital, our automated medical refrigerators have round-the-clock temperature telemetry and generator backups, ensuring that every vaccine delivered retains full immunogenic potency.

### Key Milestones in the First Year
* **Birth:** BCG, Oral Polio Vaccine (OPV-0), and Hepatitis B (Birth Dose).
* **6, 10, and 14 Weeks:** Pentavalent (DTP, Hib, Hep B), Inactivated Polio (IPV), Rotavirus, and Pneumococcal Conjugate (PCV).
* **6 Months:** Influenza (Flu) vaccination.
* **9 Months:** MMR (Measles, Mumps, Rubella) and Typhoid Conjugate.
* **12–15 Months:** Varicella (Chickenpox), Hepatitis A, and PCV Booster.

### Painless Vaccine Options
For parents worried about infant discomfort, modern acellular pertussis combinations (DTaP) significantly reduce post-vaccination fever and soreness. Consult our pediatric immunization desk during your next well-baby visit.
    `,
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1000",
    tags: ["Vaccines", "Child Health", "Preventive Medicine", "IAP"]
  }
];

export const GALLERY_ITEMS: GalleryItemData[] = [
  {
    id: "gal-1",
    title: "Advanced Level-III Neonatal Intensive Care Unit (NICU)",
    category: "NICU & Facilities",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000",
    caption: "Equipped with GE Giraffe incubators and Dräger life-support neonatal ventilators for preterm care.",
    order: 1
  },
  {
    id: "gal-2",
    title: "Private Labor, Delivery & Recovery (LDR) Suite",
    category: "Maternity & Rooms",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000",
    caption: "Warm, family-centric labor suite designed for comfortable and painless natural birthing.",
    order: 2
  },
  {
    id: "gal-3",
    title: "Ultra-Clean Modular Operation Theater",
    category: "Surgery & Technology",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000",
    caption: "Equipped with laminar airflow, HEPA filtration, and high-definition laparoscopy equipment.",
    order: 3
  },
  {
    id: "gal-4",
    title: "Pediatric Outpatient Consultation & Play Wing",
    category: "Pediatrics & OPD",
    imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=1000",
    caption: "A bright, joyful clinical environment where infants and children feel secure and comfortable.",
    order: 4
  },
  {
    id: "gal-5",
    title: "High-Definition 4D Fetal Ultrasound Wing",
    category: "Diagnostics",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
    caption: "Voluson high-resolution ultrasound scanner providing precision fetal anomaly screenings.",
    order: 5
  },
  {
    id: "gal-6",
    title: "Deluxe Mother & Newborn Post-Delivery Room",
    category: "Maternity & Rooms",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1000",
    caption: "Spacious private accommodation ensuring calm rest, family privacy, and dedicated nursing attention.",
    order: 6
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: "test-1",
    patientName: "K. Sowmya & Ravi Kumar",
    relation: "Parents of Baby Ananya",
    location: "Srikakulam Town",
    rating: 5,
    comment: "Our baby was born prematurely at 30 weeks with breathing difficulty. Dr. N. Vijaya Kumar sir and the NICU nursing team cared for her like their own child for 24 days. Today, Ananya is healthy and smiling. We will forever be grateful to Vijaya Harsha Hospital.",
    treatment: "Preterm Neonatal Care & Level-III NICU",
    date: "February 2026"
  },
  {
    id: "test-2",
    patientName: "P. Lakshmi Prasanna",
    relation: "Mother of 2",
    location: "Amadalavalasa",
    rating: 5,
    comment: "I had a high-risk pregnancy with high blood pressure. Dr. Harsha Latha madam was exceptionally reassuring throughout my 9 months. Her guidance made my normal delivery safe and completely painless. The hospital staff is polite and spotless.",
    treatment: "High-Risk Pregnancy & Painless Normal Delivery",
    date: "January 2026"
  },
  {
    id: "test-3",
    patientName: "M. Bhargav",
    relation: "Father of Master Vihaan (Age 4)",
    location: "Palasa, Srikakulam",
    rating: 5,
    comment: "When my 4-year-old had severe respiratory distress in the middle of the night, Vijaya Harsha's 24/7 Emergency and PICU team responded immediately. Within 30 minutes he was stabilized. Best pediatric hospital in our district.",
    treatment: "24/7 Pediatric Emergency & Asthma Care",
    date: "March 2026"
  }
];

export const FAQS = [
  {
    q: "Is emergency care available 24 hours for children and pregnant mothers?",
    a: "Yes. Vijaya Harsha Mother & Child Hospital operates a 24/7 dedicated emergency care wing with resident obstetricians, pediatricians, neonatal specialists, and an on-call surgical team at all times."
  },
  {
    q: "How does the online appointment booking work?",
    a: "You select your preferred doctor, department, date, and convenient time slot on our website. Our medical coordination team instantly receives your booking and confirms your appointment via email or phone."
  },
  {
    q: "Do you have Level-III NICU facilities for premature newborns?",
    a: "Yes. Our Level-III NICU is fully equipped with Dräger neonatal ventilators, GE Giraffe hybrid incubators, high-intensity LED phototherapy, and dedicated 24/7 neonatal intensive care specialists."
  },
  {
    q: "Can I consult for painless normal delivery?",
    a: "Yes. Dr. K. Harsha Latha and our senior obstetric anesthesia team specialize in labor analgesia (epidural painless delivery), guiding mothers through safe, comfortable deliveries."
  },
  {
    q: "Where is the hospital located in Srikakulam?",
    a: "We are centrally located at 80 Feet Road, Visakha 'A' Colony, near Saraswathi Mahal and Rythu Bazar in Srikakulam (PIN 532001), easily accessible by auto, car, or ambulance."
  }
];
