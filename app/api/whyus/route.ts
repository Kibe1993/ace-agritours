import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { connectDB } from "@/lib/DB/connectDB";
import { WhyUs } from "@/lib/Models/WhyUs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    // Convert file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const { url, public_id } = await uploadImageToCloudinary(
      buffer,
      imageFile.name,
      "Whyus"
    );

    // Save to MongoDB
    const whyUs = new WhyUs({
      title,
      description,
      image: { url, public_id },
    });

    await whyUs.save();

    return NextResponse.json(
      { message: "Why Us card saved successfully", whyUs },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving Why Us card:", error);
    return NextResponse.json(
      { message: "Failed to save Why Us card" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();

    const whyUs = await WhyUs.find().sort({ createdAt: -1 });

    return NextResponse.json({ whyUs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch testimonials", error);
    return NextResponse.json({ message: "Error fetching testimonials" }, { status: 500 });
  }
}