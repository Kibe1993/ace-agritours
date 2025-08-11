import { connectDB } from "@/lib/DB/connectDB";
import { PlannedVisit } from "@/lib/Models/planned";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid visit ID" }, { status: 400 });
  }

  const visit = await PlannedVisit.findById(id);

  return visit
    ? NextResponse.json(visit)
    : NextResponse.json({ message: "Visit not found" }, { status: 404 });
}
export async function PATCH(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  const id = params.id;

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.status || typeof body.status !== "string") {
    return NextResponse.json(
      { message: "Missing or invalid status" },
      { status: 400 }
    );
  }

  try {
    const updatedVisit = await PlannedVisit.findByIdAndUpdate(
      id,
      { status: body.status },
      {
        new: true,
      }
    );

    if (!updatedVisit) {
      return NextResponse.json({ message: "Visit not found" }, { status: 404 });
    }

    return NextResponse.json(updatedVisit);
  } catch (error) {
    console.error("Error updating visit status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
