import { connectDB } from "@/lib/DB/connectDB";
import { PlannedVisit } from "@/lib/Models/planned";

import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const status = formData.get("status") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const guests = formData.get("guests") as string;
    const imageFile = formData.get("image") as File;

    const slug = slugify(title, { lower: true, strict: true });

    console.log("Slug is", slug);

    if (
      !title ||
      !slug ||
      !status ||
      !location ||
      !category ||
      !date ||
      !time ||
      !guests ||
      !imageFile
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const { url, public_id } = await uploadImageToCloudinary(
      buffer,
      imageFile.name,
      "Plannedvisits"
    );

    const plannedVisit = new PlannedVisit({
      title,
      slug,
      status,
      location,
      category,
      date,
      time,
      guests: Number(guests),
      image: { url, public_id },
    });

    await plannedVisit.save();

    return NextResponse.json(
      { message: "Planned visit saved successfully", plannedVisit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving planned visit:", error);
    return NextResponse.json(
      { message: "Failed to save planned visit" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();

    const plannedVisits = await PlannedVisit.find().sort({ createdAt: -1 });

    return NextResponse.json({ plannedVisits }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch planned visits", error);
    return NextResponse.json(
      { message: "Error fetching planned visits" },
      { status: 500 }
    );
  }
}
