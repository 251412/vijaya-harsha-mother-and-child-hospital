import mongoose, { Schema, Document, Model } from "mongoose";

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface IAppointment extends Document {
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
  status: AppointmentStatus;
  actionTokenHash: string;
  actionTokenExpiresAt: Date;
  actionTokenUsed: boolean;
  confirmedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    patientPhone: {
      type: String,
      required: true,
      trim: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    preferredDate: {
      type: String,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
      index: true,
    },
    actionTokenHash: {
      type: String,
      required: true,
      index: true,
    },
    actionTokenExpiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    actionTokenUsed: {
      type: Boolean,
      default: false,
      index: true,
    },
    confirmedAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in Next.js hot-reload
export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
