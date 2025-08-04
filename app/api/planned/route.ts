import { connectDB } from "@/lib/DB/connectDB";
import { PlannedVisit } from "@/lib/Models/planned";

import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { NextResponse } from "next/server";

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

    if (
      !title ||
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
