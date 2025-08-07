import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { connectDB } from "@/lib/DB/connectDB";
import { Testimonial } from "@/lib/Models/testimonials";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Get form data
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const rating = Number(formData.get("rating"));
    const message = formData.get("message") as string;
    const imageFile = formData.get("image") as File;

    // Convert the File to a buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    console.log("Uploading image to Cloudinary...");
    const { url, public_id } = await uploadImageToCloudinary(
      buffer,
      imageFile.name,
      "Testimonials"
    );

    // Save to MongoDB
    const testimonial = new Testimonial({
      name,
      title,
      location,
      rating,
      message,
      image: { url, public_id },
    });

    await testimonial.save();

    return NextResponse.json(
      { message: "Testimonial saved", testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return NextResponse.json(
      { message: "Failed to save testimonial" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return NextResponse.json({ testimonials }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch testimonials", error);
    return NextResponse.json({ message: "Error fetching testimonials" }, { status: 500 });
  }
}