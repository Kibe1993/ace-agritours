import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String },
    author: { type: String, required: true },
    image: {
      url: String,
      public_id: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Pending", "Published"],
      default: "Draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
