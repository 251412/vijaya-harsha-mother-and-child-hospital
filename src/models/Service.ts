import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
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

const ServiceSchema = new Schema<IService>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    iconName: { type: String, required: true },
    benefits: [{ type: String }],
    features: [{ type: String }],
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
