import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/DB/connectDB";
import { FarmVisit } from "@/lib/Models/farmvisit";

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  await connectDB();

  const { key } = params;

  let visit;

  if (mongoose.Types.ObjectId.isValid(key)) {
    visit = await FarmVisit.findById(key);
  } else {
    visit = await FarmVisit.findOne({ slug: key });
  }

  if (!visit) {
    return NextResponse.json({ message: "Visit not found" }, { status: 404 });
  }

  return NextResponse.json(visit);
}

export async function PATCH(
  req: Request,
  { params }: { params: { key: string } }
) {
  await connectDB();
  const { key } = params;
  const body = await req.json();

  if (!mongoose.Types.ObjectId.isValid(key)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const visit = await FarmVisit.findByIdAndUpdate(key, body, {
    new: true,
  });

  if (!visit) {
    return NextResponse.json({ message: "Visit not found" }, { status: 404 });
  }

  return NextResponse.json(visit);
}
