import mongoose from "mongoose";
import { connectDB } from "@/lib/DB/connectDB";
import { Booking } from "@/lib/Models/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, visitId, guests } = await req.json();

    if (!name || !phone || !email || !visitId || !guests) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase();

    const isValid = mongoose.Types.ObjectId.isValid(visitId);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid visit ID" }, { status: 400 });
    }

    const objectVisitId = new mongoose.Types.ObjectId(visitId);

    const existingBooking = await Booking.findOne({
      email: normalizedEmail,
      plannedVisitId: objectVisitId,
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "You have already booked this visit." },
        { status: 409 }
      );
    }

    const newBooking = new Booking({
      name,
      phone,
      email: normalizedEmail,
      plannedVisitId: objectVisitId,
      guests,
      status: "Unpaid",
    });

    await newBooking.save();

    return NextResponse.json(
      { message: "Booking confirmed!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("plannedVisitId", "title");

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch bookings", error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
