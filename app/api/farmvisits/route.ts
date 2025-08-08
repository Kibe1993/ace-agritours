import { connectDB } from "@/lib/DB/connectDB";
import { FarmVisit } from "@/lib/Models/farmvisit";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;

    const location = formData.get("location") as string;
    const area = formData.get("area") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const category = formData.get("category") as string;
    const guests = formData.get("guests") as string;
    const trainer = formData.get("trainer") as string;
    const highlights = formData.get("highlights") as string;
    const description = formData.get("description") as string;
    const treatmentSummary = formData.get("treatmentSummary") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    const availableDays = formData.getAll("availableDays") as string[];

    const imageFiles = formData.getAll("images") as File[];
    const slug = slugify(title, { lower: true, strict: true });

    if (
      !title ||
      !location ||
      !area ||
      !slug ||
      !date ||
      !time ||
      !category ||
      !guests ||
      !trainer ||
      !description ||
      !treatmentSummary ||
      !email ||
      !phone ||
      imageFiles.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const images = [];

    for (const imageFile of imageFiles) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const { url, public_id } = await uploadImageToCloudinary(
        buffer,
        imageFile.name,
        "Farmvisits"
      );
      images.push({ url, public_id });
    }

    const farmVisit = new FarmVisit({
      title,
      slug,
      location,
      area,
      date,
      time,
      category,
      guests: Number(guests),
      trainer,
      highlights: highlights.split(",").map((h) => h.trim()),
      description,
      treatmentSummary,
      availableDays,
      email,
      phone,
      images,
      status: "Pending",
      featured: false,
    });

    await farmVisit.save();

    return NextResponse.json(
      { message: "Farm visit saved successfully", farmVisit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving farm visit:", error);
    return NextResponse.json(
      { message: "Failed to save farm visit" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const farmvisits = await FarmVisit.find().sort({ createdAt: -1 });

    return NextResponse.json({ farmvisits }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch farmvisits", error);
    return NextResponse.json(
      { message: "Error fetching farmvisits" },
      { status: 500 }
    );
  }
}
