import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
  order: number;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export interface ITestimonial extends Document {
  id: string;
  patientName: string;
  relation: string;
  location: string;
  rating: number;
  comment: string;
  treatment: string;
  date: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    id: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    relation: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 5 },
    comment: { type: String, required: true },
    treatment: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
