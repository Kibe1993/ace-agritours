import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import { FarmVisit } from "@/lib/Models/farmvisit";
import mongoose from "mongoose";

interface Context {
  params: {
    key: string;
  };
}

export async function GET(request: NextRequest, context: Context) {
  await connectDB();
  const { key } = context.params;

  const visit = mongoose.Types.ObjectId.isValid(key)
    ? await FarmVisit.findById(key)
    : await FarmVisit.findOne({ slug: key });

  if (!visit) {
    return NextResponse.json({ message: "Visit not found" }, { status: 404 });
  }

  return NextResponse.json(visit);
}

export async function PATCH(request: NextRequest, context: Context) {
  await connectDB();
  const { key } = context.params;
  const body = await request.json();

  if (!mongoose.Types.ObjectId.isValid(key)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const updatedVisit = await FarmVisit.findByIdAndUpdate(key, body, {
    new: true,
  });

  if (!updatedVisit) {
    return NextResponse.json({ message: "Visit not found" }, { status: 404 });
  }

  return NextResponse.json(updatedVisit);
}
