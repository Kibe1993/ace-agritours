import { connectDB } from "@/lib/DB/connectDB";
import { Blog } from "@/lib/Models/blog";
import { uploadImageToCloudinary } from "@/lib/cloudinary/uploadImage";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const author = formData.get("author") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !description || !category || !author || !imageFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { url, public_id } = await uploadImageToCloudinary(
      buffer,
      imageFile.name,
      "Blogs"
    );

    const blog = new Blog({
      title,
      description,
      category,
      date,
      author,
      image: {
        url,
        public_id,
      },
      status: "Draft",
      featured: false,
    });

    await blog.save();

    return NextResponse.json({ message: "Blog saved", blog }, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { message: "Failed to save blog" },
      { status: 500 }
    );
  }
}
