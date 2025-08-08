import mongoose, { Schema, model, models } from "mongoose";

const imageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const farmVisitSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    area: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    guests: { type: Number, required: true },
    trainer: { type: String, required: true },
    highlights: [{ type: String }],
    description: { type: String, required: true },
    treatmentSummary: { type: String, required: true },
    availableDays: [{ type: String }],
    email: { type: String, required: true },
    phone: { type: String, required: true },
    images: [imageSchema],
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const FarmVisit =
  models.FarmVisit || model("FarmVisit", farmVisitSchema);
