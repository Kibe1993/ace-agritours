import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/DB/connectDB";
import { VisitCommentModel } from "@/lib/Models/farmvisit-comments";

// 🔗 Ensure DB connection
async function initDB() {
  await connectDB();
}

// 📌 GET a single comment
export async function GET(_req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  await initDB();
  try {
    const comment = await VisitCommentModel.findById(params.id);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (error) {
    console.error("❌ Error fetching comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 📌 POST → reply to a comment
export async function POST(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  await initDB();
  try {
    const { message, userName } = await req.json();

    if (!message || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await VisitCommentModel.findById(params.id);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    comment.replies.push({
      userName,
      message,
      createdAt: new Date(),
    });

    await comment.save();

    return NextResponse.json(comment);
  } catch (error) {
    console.error("❌ Error posting reply:", error);
    return NextResponse.json(
      { error: "Failed to post reply" },
      { status: 500 }
    );
  }
}

// 📌 PATCH → edit a comment
export async function PATCH(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  await initDB();
  try {
    const { message, rating } = await req.json();

    const updated = await VisitCommentModel.findByIdAndUpdate(
      params.id,
      { ...(message && { message }), ...(rating && { rating }) },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// 📌 DELETE → remove a comment
export async function DELETE(_req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  await initDB();
  try {
    const deleted = await VisitCommentModel.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: unknown) {
  const { params } = context as { params: { id: string } };
  await initDB();
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required to like a comment" },
        { status: 400 }
      );
    }

    const comment = await VisitCommentModel.findById(params.id);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check if already liked
    if (comment.likedBy.includes(email)) {
      return NextResponse.json(
        { error: "You already liked this comment" },
        { status: 400 }
      );
    }

    comment.likes = (comment.likes || 0) + 1;
    comment.likedBy.push(email);

    await comment.save();

    return NextResponse.json(comment);
  } catch (error) {
    console.error("❌ Error liking comment:", error);
    return NextResponse.json(
      { error: "Failed to like comment" },
      { status: 500 }
    );
  }
}
