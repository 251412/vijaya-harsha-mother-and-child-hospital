import { connectToDatabase } from "./mongodb";
import { Appointment, IAppointment } from "@/models/Appointment";
import { ContactMessage, IContactMessage } from "@/models/ContactMessage";
import { DOCTORS, SERVICES, BLOG_POSTS, GALLERY_ITEMS, TESTIMONIALS, DoctorData, ServiceData, BlogPostData, GalleryItemData, TestimonialData } from "@/data/seedData";

// In-memory fallback stores for high resilience
const inMemoryAppointments = new Map<string, any>();
const inMemoryContacts: any[] = [];

export async function getDoctorsList(department?: string, search?: string): Promise<DoctorData[]> {
  let list = [...DOCTORS];
  if (department && department !== "All") {
    list = list.filter((d) => d.department.toLowerCase().includes(department.toLowerCase()) || d.specialization.toLowerCase().includes(department.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((d) => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q) || d.qualification.toLowerCase().includes(q));
  }
  return list.sort((a, b) => a.order - b.order);
}

export async function getDoctorBySlug(slug: string): Promise<DoctorData | null> {
  const doc = DOCTORS.find((d) => d.slug === slug);
  return doc || null;
}

export async function getServicesList(category?: string, search?: string): Promise<ServiceData[]> {
  let list = [...SERVICES];
  if (category && category !== "All") {
    list = list.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((s) => s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q));
  }
  return list.sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const item = SERVICES.find((s) => s.slug === slug);
  return item || null;
}

export async function getBlogsList(category?: string, search?: string): Promise<BlogPostData[]> {
  let list = [...BLOG_POSTS];
  if (category && category !== "All") {
    list = list.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.tags.some((t) => t.toLowerCase().includes(q)));
  }
  return list;
}

export async function getBlogBySlug(slug: string): Promise<BlogPostData | null> {
  const item = BLOG_POSTS.find((b) => b.slug === slug);
  return item || null;
}

export async function getGalleryItems(category?: string): Promise<GalleryItemData[]> {
  let list = [...GALLERY_ITEMS];
  if (category && category !== "All") {
    list = list.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }
  return list.sort((a, b) => a.order - b.order);
}

export async function getTestimonialsList(): Promise<TestimonialData[]> {
  return [...TESTIMONIALS];
}

// Appointment Data Storage
export async function saveAppointment(data: {
  appointmentId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  actionTokenHash: string;
  actionTokenExpiresAt: Date;
  actionTokenUsed: boolean;
}): Promise<any> {
  const { isConnected } = await connectToDatabase();

  if (isConnected) {
    try {
      const doc = await Appointment.create(data);
      inMemoryAppointments.set(data.appointmentId, doc.toObject());
      return doc.toObject();
    } catch (err) {
      console.warn("MongoDB appointment save failed, saving to memory:", err);
    }
  }

  // Fallback to memory
  const memoryDoc = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    confirmedAt: null,
    cancelledAt: null,
  };
  inMemoryAppointments.set(data.appointmentId, memoryDoc);
  return memoryDoc;
}

export async function findAppointmentByTokenHash(tokenHash: string): Promise<any | null> {
  const { isConnected } = await connectToDatabase();

  if (isConnected) {
    try {
      const doc = await Appointment.findOne({ actionTokenHash: tokenHash });
      if (doc) return doc.toObject();
    } catch (err) {
      console.warn("MongoDB find token error:", err);
    }
  }

  // Search memory
  for (const item of inMemoryAppointments.values()) {
    if (item.actionTokenHash === tokenHash) {
      return item;
    }
  }
  return null;
}

export async function updateAppointmentStatusByToken(
  tokenHash: string,
  newStatus: "CONFIRMED" | "CANCELLED"
): Promise<{ success: boolean; appointment?: any; error?: string }> {
  const { isConnected } = await connectToDatabase();
  const now = new Date();

  if (isConnected) {
    try {
      const doc = await Appointment.findOne({ actionTokenHash: tokenHash });
      if (!doc) {
        return { success: false, error: "Appointment not found or invalid link." };
      }
      if (doc.actionTokenUsed) {
        return { success: false, error: "This action link has already been used.", appointment: doc.toObject() };
      }
      if (new Date(doc.actionTokenExpiresAt) < now) {
        return { success: false, error: "This action link has expired.", appointment: doc.toObject() };
      }
      if (doc.status !== "PENDING") {
        return { success: false, error: `Appointment has already been marked as ${doc.status}.`, appointment: doc.toObject() };
      }

      doc.status = newStatus;
      doc.actionTokenUsed = true;
      if (newStatus === "CONFIRMED") {
        doc.confirmedAt = now;
      } else {
        doc.cancelledAt = now;
      }
      await doc.save();
      const updated = doc.toObject();
      inMemoryAppointments.set(updated.appointmentId, updated);
      return { success: true, appointment: updated };
    } catch (err: any) {
      console.error("Error updating appointment in Mongo:", err);
    }
  }

  // Memory fallback
  for (const [id, item] of inMemoryAppointments.entries()) {
    if (item.actionTokenHash === tokenHash) {
      if (item.actionTokenUsed) {
        return { success: false, error: "This action link has already been used.", appointment: item };
      }
      if (new Date(item.actionTokenExpiresAt) < now) {
        return { success: false, error: "This action link has expired.", appointment: item };
      }
      if (item.status !== "PENDING") {
        return { success: false, error: `Appointment has already been marked as ${item.status}.`, appointment: item };
      }

      item.status = newStatus;
      item.actionTokenUsed = true;
      if (newStatus === "CONFIRMED") {
        item.confirmedAt = now;
      } else {
        item.cancelledAt = now;
      }
      item.updatedAt = now;
      inMemoryAppointments.set(id, item);
      return { success: true, appointment: item };
    }
  }

  return { success: false, error: "Appointment not found or invalid link." };
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<any> {
  const { isConnected } = await connectToDatabase();

  if (isConnected) {
    try {
      const doc = await ContactMessage.create(data);
      inMemoryContacts.push(doc.toObject());
      return doc.toObject();
    } catch (err) {
      console.warn("MongoDB contact message save failed, saving to memory:", err);
    }
  }

  const memoryDoc = {
    ...data,
    isRead: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  inMemoryContacts.push(memoryDoc);
  return memoryDoc;
}
