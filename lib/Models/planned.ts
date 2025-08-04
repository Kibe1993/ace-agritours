import mongoose from "mongoose";

const plannedVisitSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    location: String,
    category: String,
    date: String,
    time: String,
    guests: Number,
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const PlannedVisit =
  mongoose.models.PlannedVisit ||
  mongoose.model("PlannedVisit", plannedVisitSchema);
