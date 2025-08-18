import mongoose, { Document, Model, Types } from "mongoose";
import { IVisitCommentDoc } from "../TSInterfaces/typescriptinterface";

const commentSchema = new mongoose.Schema<IVisitCommentDoc>(
  {
    farmVisitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FarmVisit",
      required: true,
    },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    likes: { type: Number, default: 0 },
    likedBy: [
      {
        type: String,
      },
    ],
    replies: [
      {
        userName: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const VisitCommentModel: Model<IVisitCommentDoc> =
  mongoose.models.VisitComment ||
  mongoose.model<IVisitCommentDoc>("VisitComment", commentSchema);
