import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import { Booking } from "@/lib/Models/bookings";
import { PlannedVisit } from "@/lib/Models/planned";

export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { clerkId: string } };

  await connectDB();

  const { clerkId } = params;

  if (!clerkId) {
    return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
  }

  try {
    const bookings = await Booking.find({ clerkId }).populate("plannedVisitId");

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
