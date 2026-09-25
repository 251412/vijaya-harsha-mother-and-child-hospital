import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { HOSPITAL_CONFIG } from "@/lib/constants";
import TransitionProvider from "@/components/TransitionProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-display",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Vijaya Harsha Mother & Child Hospital | Srikakulam",
    template: "%s | Vijaya Harsha Mother & Child Hospital",
  },
  description:
    "Leading Mother & Child Hospital in Srikakulam, AP. Specialized in Obstetrics, Painless Normal Delivery, Level-III NICU, Pediatric ICU, and Fetal Medicine under Dr. N. Vijaya Kumar & Dr. Harsha.",
  keywords: [
    "Vijaya Harsha Hospital",
    "Mother and Child Hospital Srikakulam",
    "Pediatrician Srikakulam",
    "Dr N Vijaya Kumar",
    "Dr Harsha Srikakulam",
    "NICU Srikakulam",
    "Best maternity hospital Srikakulam",
    "Painless delivery Srikakulam",
    "Child hospital Srikakulam"
  ],
  authors: [{ name: "Vijaya Harsha Mother & Child Hospital" }],
  openGraph: {
    title: "Vijaya Harsha Mother & Child Hospital | Srikakulam",
    description:
      "Premier Mother & Child Healthcare in Srikakulam. 24/7 NICU, PICU, Maternity & Pediatric Emergency.",
    url: "https://vijayaharshahospital.com",
    siteName: "Vijaya Harsha Mother & Child Hospital",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // LocalBusiness structured data for hospital SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: HOSPITAL_CONFIG.name,
    legalName: "Vijaya Harsha Mother & Child Hospital",
    description: HOSPITAL_CONFIG.subtitle,
    url: "https://vijayaharshahospital.com",
    telephone: HOSPITAL_CONFIG.phone,
    emergencyTelephone: HOSPITAL_CONFIG.emergencyPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: HOSPITAL_CONFIG.address.street,
      addressLocality: HOSPITAL_CONFIG.address.city,
      addressRegion: HOSPITAL_CONFIG.address.state,
      postalCode: HOSPITAL_CONFIG.address.pincode,
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOSPITAL_CONFIG.coordinates.lat,
      longitude: HOSPITAL_CONFIG.coordinates.lng
    },
    medicalSpecialty: [
      "Pediatrics",
      "Neonatology",
      "Obstetrics",
      "Gynecology",
      "PediatricSurgery"
    ]
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <TransitionProvider>
          <main className="flex-1 w-full">{children}</main>
        </TransitionProvider>
        <WhatsAppFloatingButton />
        <Footer />
      </body>
    </html>
  );
}
