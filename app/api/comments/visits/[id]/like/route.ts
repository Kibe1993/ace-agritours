import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import { VisitCommentModel } from "@/lib/Models/farmvisit-comments";

export async function PUT(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  await connectDB();

  try {
    const { email } = await req.json();
    const id = params.id;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const comment = await VisitCommentModel.findById(id);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // check if already liked
    if (comment.likedBy.includes(email)) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }

    comment.likes = (comment.likes || 0) + 1;
    comment.likedBy.push(email);
    await comment.save();

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error liking comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
