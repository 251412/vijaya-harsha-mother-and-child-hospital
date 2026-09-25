import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDoctor extends Document {
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

const DoctorSchema = new Schema<IDoctor>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    qualification: { type: String, required: true },
    specialization: { type: String, required: true },
    department: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    bio: { type: String, required: true },
    photoUrl: { type: String, required: true },
    consultationDays: [{ type: String }],
    consultationTimings: { type: String, required: true },
    isAvailableForBooking: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);
