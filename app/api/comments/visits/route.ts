import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/DB/connectDB";
import { VisitCommentModel } from "@/lib/Models/farmvisit-comments";
import { VisitComment } from "@/lib/TSInterfaces/typescriptinterface";

// GET: fetch comments
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const farmVisitId = searchParams.get("farmVisitId");

    if (!farmVisitId) {
      return NextResponse.json(
        { error: "farmVisitId is required" },
        { status: 400 }
      );
    }

    const comments = await VisitCommentModel.find({
      farmVisitId: new mongoose.Types.ObjectId(farmVisitId),
    }).lean<VisitComment>();

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: create a new comment

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { farmVisitId, message, rating, email, userName } = body;

    if (!farmVisitId || !message || !email || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for duplicate comment by this email
    const existingComment = await VisitCommentModel.findOne({
      farmVisitId: new mongoose.Types.ObjectId(farmVisitId),
      email,
    });

    if (existingComment) {
      return NextResponse.json(
        { error: "You have already commented for this visit" },
        { status: 400 }
      );
    }

    const newComment = await VisitCommentModel.create({
      farmVisitId: new mongoose.Types.ObjectId(farmVisitId),
      email,
      userName,
      message,
      rating,
    });

    console.log(email);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
