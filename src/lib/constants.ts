export const HOSPITAL_CONFIG = {
  name: "Vijaya Harsha Mother & Child Hospital",
  shortName: "Vijaya Harsha Hospital",
  tagline: "Premier Mother & Child Healthcare in Srikakulam",
  subtitle: "Specialized Obstetrics, Gynecology, Level-III NICU, & Comprehensive Pediatric Excellence",
  
  phone: process.env.HOSPITAL_PHONE || "+919440191244",
  phoneFormatted: "+91 94401 91244",
  emergencyPhone: process.env.EMERGENCY_PHONE || "+918942222333",
  emergencyPhoneFormatted: "+91 8942 222333",
  ambulancePhone: "+91 8942 222334",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "+919440191244",
  whatsappMessage: "Hello Vijaya Harsha Hospital, I would like to inquire about consultation and hospital services.",
  
  email: process.env.HOSPITAL_EMAIL || "info@vijayaharshahospital.com",
  
  address: {
    street: "80 Feet Road, Visakha 'A' Colony",
    landmark: "Near Saraswathi Mahal / Rythu Bazar",
    city: "Srikakulam",
    state: "Andhra Pradesh",
    pincode: "532001",
    country: "India",
    full: "80 Feet Road, Visakha 'A' Colony, Near Saraswathi Mahal, Srikakulam, Andhra Pradesh 532001"
  },
  
  coordinates: {
    lat: 18.2949,
    lng: 83.8938
  },
  
  mapsUrl: "https://maps.google.com/?q=Vijaya+Harsha+Mother+and+Child+Hospital+Srikakulam",
  embedMapsUrl: "https://maps.google.com/maps?q=18.2949,83.8938+(Vijaya%20Harsha%20Mother%20&%20Child%20Hospital)&t=&z=17&ie=UTF8&iwloc=B&output=embed",
  
  workingHours: {
    emergency: "24 Hours / 7 Days (Always Open)",
    opdGeneral: "Monday - Saturday: 09:00 AM - 01:30 PM & 05:00 PM - 09:00 PM",
    opdSunday: "Sunday: 10:00 AM - 01:00 PM (Emergency 24/7)",
    nicuPicu: "24/7 Neonatal & Pediatric Intensive Care",
    labDiagnostics: "24/7 Pathology, Ultrasound & Pharmacy"
  },
  
  stats: [
    { label: "Safe Deliveries Conducted", value: "18,500+" },
    { label: "NICU Babies Successfully Nurtured", value: "5,200+" },
    { label: "Pediatric Consultations", value: "65,000+" },
    { label: "Expert Doctors & Specialists", value: "12+" },
    { label: "Dedicated ICU & Hospital Beds", value: "50+" },
    { label: "Patient Satisfaction Rate", value: "99.4%" }
  ],
  
  accreditations: [
    "State Government Recognized Mother & Child Center",
    "Level-III Neonatal Intensive Care Unit (NICU)",
    "24x7 Advanced Emergency & Pediatric Trauma",
    "ISO Quality Healthcare Certified Facility"
  ]
};
