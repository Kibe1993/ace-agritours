import mongoose from "mongoose";

const blogSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const BlogSubscriber =
  mongoose.models.BlogSubscriber ||
  mongoose.model("BlogSubscriber", blogSubscriberSchema);
