import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    plannedVisitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlannedVisit",
      required: true,
    },
  },
  { timestamps: true }
);
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingsSchema);
