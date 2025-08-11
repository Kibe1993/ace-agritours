import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";

import mongoose from "mongoose";
import { Blog } from "@/lib/Models/blog";

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

  await connectDB();

  const body = await req.json();
  const key = params.key;

  if (!mongoose.Types.ObjectId.isValid(key)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(key, body, {
    new: true,
  });

  return updatedBlog
    ? NextResponse.json(updatedBlog)
    : NextResponse.json({ message: "Visit not found" }, { status: 404 });
}
