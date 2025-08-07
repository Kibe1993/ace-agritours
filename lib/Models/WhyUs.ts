
import mongoose from "mongoose";

const whyUsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const WhyUs =
  mongoose.models.WhyUs || mongoose.model("WhyUs", whyUsSchema, 'WhyUs');
