import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    guests: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Unpaid", "Paid", "Failed"], // added Failed for mpesa failures
      default: "Unpaid",
    },
    plannedVisitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlannedVisit",
      required: true,
    },

    // 🟢 M-Pesa related fields
    checkoutId: { type: String }, // Safaricom CheckoutRequestID
    mpesaReceipt: { type: String }, // MpesaReceiptNumber
    transactionDate: { type: String }, // YYYYMMDDHHMMSS
  },
  { timestamps: true }
);

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingsSchema);
