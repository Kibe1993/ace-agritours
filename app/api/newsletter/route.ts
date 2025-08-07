import { connectDB } from "@/lib/DB/connectDB";
import { BlogSubscriber } from "@/lib/Models/Newsletter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // Check if email already exists
    const existingSubscriber = await BlogSubscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ error: "You have already subscribed." }, { status: 409 });
    }

    // Save new subscriber
    const newSubscriber = new BlogSubscriber({ email });
    await newSubscriber.save();

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
