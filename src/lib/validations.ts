import { z } from "zod";

// Phone validation: Indian standard 10-digit number or +91 prefix
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const AppointmentSchema = z.object({
  patientName: z
    .string()
    .trim()
    .min(2, "Patient name must be at least 2 characters")
    .max(80, "Patient name must be under 80 characters"),
  
  patientEmail: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase(),
  
  patientPhone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number"),
  
  doctorId: z
    .string()
    .trim()
    .min(1, "Please select a specialist doctor"),
    
  doctorName: z
    .string()
    .trim()
    .min(1, "Doctor name is required"),
  
  department: z
    .string()
    .trim()
    .min(1, "Please select a hospital department"),
  
  preferredDate: z
    .string()
    .refine((dateStr) => {
      const selected = new Date(dateStr);
      if (isNaN(selected.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, {
      message: "Preferred date cannot be in the past"
    }),
  
  preferredTime: z
    .string()
    .trim()
    .min(1, "Please select an appointment time slot"),
  
  reason: z
    .string()
    .trim()
    .min(3, "Please provide a brief reason or symptoms for the visit (min 3 characters)")
    .max(600, "Reason must be under 600 characters")
});

export type AppointmentInput = z.infer<typeof AppointmentSchema>;

export const ContactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters"),
  
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase(),
  
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number"),
  
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject must be under 120 characters"),
  
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters")
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;
