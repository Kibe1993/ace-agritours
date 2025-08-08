import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import { FarmVisit } from "@/lib/Models/farmvisit";
import mongoose from "mongoose";

export async function GET(
  _req: NextRequest,
  context: { params: Record<string, string> }
) {
  await connectDB();
  const key = context.params.key;

  const visit = mongoose.Types.ObjectId.isValid(key)
    ? await FarmVisit.findById(key)
    : await FarmVisit.findOne({ slug: key });

  return visit
    ? NextResponse.json(visit)
    : NextResponse.json({ message: "Visit not found" }, { status: 404 });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  await connectDB();
  const body = await req.json();
  const key = context.params.key;

  if (!mongoose.Types.ObjectId.isValid(key)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const updatedVisit = await FarmVisit.findByIdAndUpdate(key, body, {
    new: true,
  });

  return updatedVisit
    ? NextResponse.json(updatedVisit)
    : NextResponse.json({ message: "Visit not found" }, { status: 404 });
}
