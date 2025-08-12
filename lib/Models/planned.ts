import mongoose from "mongoose";

export const plannedVisitFields = {
  category: { type: String, required: true },
  guests: { type: Number, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
};

const plannedVisitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    date: { type: String, required: true },

    ...plannedVisitFields,
  },
  { timestamps: true }
);

export const PlannedVisit =
  mongoose.models.PlannedVisit ||
  mongoose.model("PlannedVisit", plannedVisitSchema);
