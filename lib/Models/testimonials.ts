import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    location: String,
    rating: Number,
    message: String,
    image: {
      url: String,
      public_id: String,
    }, // ✅ Now accepts object
  },
  { timestamps: true }
);

delete mongoose.models.Testimonial;

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
