import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { connectDB } from "@/lib/DB/connectDB";
import { Partner } from "@/lib/Models/partner"; // Make sure this model exists
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const website = formData.get("website") as string;
    const description = formData.get("description") as string;
    const logoFile = formData.get("logo") as File;

    // Convert file to buffer
    const arrayBuffer = await logoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary

    const { url, public_id } = await uploadImageToCloudinary(
      buffer,
      logoFile.name,
      "Partners"
    );

    // Save to MongoDB
    const partner = new Partner({
      name,
      website,
      description,
      logo: { url, public_id },
    });

    await partner.save();

    return NextResponse.json(
      { message: "Partner saved successfully", partner },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving partner:", error);
    return NextResponse.json(
      { message: "Failed to save partner" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();

    const partners = await Partner.find().sort({ createdAt: -1 });

    return NextResponse.json({ partners }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch partners", error);
    return NextResponse.json({ message: "Error fetching partners" }, { status: 500 });
  }
}