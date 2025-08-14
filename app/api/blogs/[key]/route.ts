import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import mongoose from "mongoose";
import { Blog } from "@/lib/Models/blog";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";
import slugify from "slugify";
import { UpdateFields } from "@/lib/TSInterfaces/typescriptinterface";

export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { key: string } };
  await connectDB();

  const key = params.key;
  const blog = mongoose.Types.ObjectId.isValid(key)
    ? await Blog.findById(key)
    : await Blog.findOne({ slug: key });

  return blog
    ? NextResponse.json(blog)
    : NextResponse.json({ message: "Blog not found" }, { status: 404 });
}

export async function PATCH(req: NextRequest, context: unknown) {
  const { params } = context as { params: { key: string } };
  const key = params.key;

  await connectDB();

  try {
    const contentType = req.headers.get("content-type") || "";

    // ✅ Handle JSON updates (status / featured toggle)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const updatedBlog = mongoose.Types.ObjectId.isValid(key)
        ? await Blog.findByIdAndUpdate(key, body, { new: true })
        : await Blog.findOneAndUpdate({ slug: key }, body, { new: true });

      if (!updatedBlog) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(updatedBlog);
    }

    // ✅ Handle formData updates (full blog edit)
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const author = formData.get("author") as string;
    const imageFile = formData.get("image") as File | null;
    const slug = slugify(title, { lower: true, strict: true });

    if (!title || !slug || !description || !category || !author) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageData;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const { url, public_id } = await uploadImageToCloudinary(
        buffer,
        imageFile.name,
        "Blogs"
      );
      imageData = { url, public_id };
    }

    const updateFields: Partial<UpdateFields> = {
      title,
      slug,
      description,
      category,
      date,
      author,
    };

    if (imageData) {
      updateFields.image = imageData;
    }

    const updatedBlog = mongoose.Types.ObjectId.isValid(key)
      ? await Blog.findByIdAndUpdate(key, updateFields, { new: true })
      : await Blog.findOneAndUpdate({ slug: key }, updateFields, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: unknown) {
  const { params } = context as { params: { key: string } };
  const key = params.key;

  await connectDB();

  try {
    const deletedBlog = mongoose.Types.ObjectId.isValid(key)
      ? await Blog.findByIdAndDelete(key)
      : await Blog.findOneAndDelete({ slug: key });

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
