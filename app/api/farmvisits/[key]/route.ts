import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import { FarmVisit } from "@/lib/Models/farmvisit";
import mongoose from "mongoose";
import slugify from "slugify";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import { UpdateFarmVisitFields } from "@/lib/TSInterfaces/typescriptinterface";

export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { key: string } };

  await connectDB();

  const key = params.key;

  const visit = mongoose.Types.ObjectId.isValid(key)
    ? await FarmVisit.findById(key)
    : await FarmVisit.findOne({ slug: key });

  return visit
    ? NextResponse.json(visit)
    : NextResponse.json({ message: "Visit not found" }, { status: 404 });
}

export async function PATCH(req: NextRequest, context: unknown) {
  const { params } = context as { params: { key: string } };
  const key = params.key;

  await connectDB();

  try {
    const contentType = req.headers.get("content-type") || "";

    // ✅ Handle JSON partial updates
    if (contentType.includes("application/json")) {
      const body: UpdateFarmVisitFields = await req.json();
      const updatedFarmVisit = mongoose.Types.ObjectId.isValid(key)
        ? await FarmVisit.findByIdAndUpdate(key, body, { new: true })
        : await FarmVisit.findOneAndUpdate({ slug: key }, body, { new: true });

      if (!updatedFarmVisit) {
        return NextResponse.json(
          { message: "Farm visit not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(updatedFarmVisit);
    }

    // ✅ Handle formData full updates
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const area = formData.get("area") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const category = formData.get("category") as string;
    const guests = Number(formData.get("guests"));
    const trainer = formData.get("trainer") as string;
    const highlights = (formData.get("highlights") as string)
      ?.split(",")
      .map((h) => h.trim())
      .filter(Boolean);
    const description = formData.get("description") as string;
    const treatmentSummary = formData.get("treatmentSummary") as string;
    const availableDays = formData.getAll("availableDays") as string[];
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const slug = slugify(title, { lower: true, strict: true });

    if (!title || !slug || !description || !category || !trainer) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Handle multiple image uploads
    const imageFiles = formData.getAll("images") as File[];
    const uploadedImages: { url: string; public_id: string }[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const { url, public_id } = await uploadImageToCloudinary(
          buffer,
          file.name,
          "FarmVisits"
        );
        uploadedImages.push({ url, public_id });
      }
    }

    const updateFields: Partial<UpdateFarmVisitFields> = {
      title,
      slug,
      location,
      area,
      date,
      time,
      category,
      guests,
      trainer,
      highlights,
      description,
      treatmentSummary,
      availableDays,
      email,
      phone,
    };

    if (uploadedImages.length > 0) {
      updateFields.images = uploadedImages;
    }

    // if new images were uploaded, append to existing array
    if (uploadedImages.length > 0) {
      (updateFields as any).$push = { images: { $each: uploadedImages } };
    }

    const updatedFarmVisit = mongoose.Types.ObjectId.isValid(key)
      ? await FarmVisit.findByIdAndUpdate(key, updateFields, { new: true })
      : await FarmVisit.findOneAndUpdate({ slug: key }, updateFields, {
          new: true,
        });

    if (!updatedFarmVisit) {
      return NextResponse.json(
        { message: "Farm visit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Farm visit updated",
      farmvisit: updatedFarmVisit,
    });
  } catch (error) {
    console.error("Error updating farm visit:", error);
    return NextResponse.json(
      { message: "Failed to update farm visit" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: unknown) {
  const { params } = context as { params: { key: string } };
  const key = params.key;

  await connectDB();

  try {
    const deletedFarmVisit = mongoose.Types.ObjectId.isValid(key)
      ? await FarmVisit.findByIdAndDelete(key)
      : await FarmVisit.findOneAndDelete({ slug: key });

    if (!deletedFarmVisit) {
      return NextResponse.json(
        { message: "Farm visit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Farm visit deleted" });
  } catch (error) {
    console.error("Error deleting farm visit:", error);
    return NextResponse.json(
      { message: "Failed to delete farm visit" },
      { status: 500 }
    );
  }
}
