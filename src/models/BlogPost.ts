import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
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

const BlogPostSchema = new Schema<IBlogPost>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, required: true },
    publishedAt: { type: String, required: true },
    readTime: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
