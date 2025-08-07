import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: String,
    website: String,
    description: String,
    logo: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export const Partner =
  mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
