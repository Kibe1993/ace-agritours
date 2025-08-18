"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import styles from "./CommentsSection.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { VisitComment } from "@/lib/TSInterfaces/typescriptinterface";

export default function CommentsSection({
  farmVisitId,
}: {
  farmVisitId: string;
}) {
  const { user } = useUser();
  const [comments, setComments] = useState<VisitComment[]>([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyingLoading, setReplyingLoading] = useState(false);

  // 🔄 Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `/api/comments/visits?farmVisitId=${farmVisitId}`
      );
      setComments(res.data);
    } catch {
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [farmVisitId]);

  // ➕ Add new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return toast.error("Message cannot be empty");

    try {
      setLoading(true);
      const email =
        user?.emailAddresses?.[0]?.emailAddress || "guest@example.com";

      await axios.post("/api/comments/visits", {
        farmVisitId,
        email,
        userName: user?.firstName || "Guest User",
        message,
        rating,
      });

      setMessage("");
      toast.success("Comment posted!");
      fetchComments();
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data?.error || "Failed to post comment");
  } else {
    toast.error("Failed to post comment");
  }
} finally {
  setLoading(false);
}


  // ✏️ Edit comment
  const handleEdit = async (id: string, updatedMessage: string) => {
    try {
      await axios.patch(`/api/comments/visits/${id}`, {
        message: updatedMessage,
      });
      setEditingId(null);
      toast.success("Comment updated!");
      fetchComments();
    } catch {
      toast.error("Failed to update comment");
    }
  };

  // 👍 Like comment
  const handleLike = async (id: string, userEmail: string) => {
    try {
      await axios.put(`/api/comments/visits/${id}/like`, { email: userEmail });
      fetchComments();
    } catch {
      toast.error("Failed to like comment");
    }
  };

  // 💬 Reply to comment
  const handleReply = async (id: string) => {
    if (!replyMessage.trim()) return toast.error("Reply cannot be empty");

    try {
      setReplyingLoading(true);
      await axios.post(`/api/comments/visits/${id}`, {
        userName: user?.firstName || "Guest User",
        message: replyMessage,
      });

      setReplyMessage("");
      setReplyingTo(null);
      toast.success("Reply posted!");
      fetchComments();
    } catch {
      toast.error("Failed to post reply");
    } finally {
      setReplyingLoading(false);
    }
  };

  // 🗑 Delete comment
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`/api/comments/visits/${id}`);
      toast.success("Comment deleted!");
      fetchComments();
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className={styles.commentsSection}>
      <h2>Comments & Reviews</h2>

      {/* Add new comment */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your comment..."
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* List of comments */}
      <ul className={styles.commentsList}>
        {comments.map((c) => (
          <li key={c._id.toString()}>
            <div className={styles.commentHeader}>
              <span className={styles.user}>{c.userName}</span>
              <span className={styles.rating}>{c.rating} ⭐</span>
            </div>

            <p>
              {editingId === c._id.toString() ? (
                <textarea
                  defaultValue={c.message}
                  onBlur={(e) => handleEdit(c._id.toString(), e.target.value)}
                  className={styles.editTextarea}
                />
              ) : (
                c.message
              )}
            </p>

            <span className={styles.date}>
              {new Date(c.createdAt).toLocaleString()}
            </span>

            <div className={styles.commentActions}>
              <button
                onClick={() =>
                  handleLike(
                    c._id.toString(),
                    user?.emailAddresses?.[0]?.emailAddress ||
                      "guest@example.com"
                  )
                }
              >
                👍 {c.likes || 0}
              </button>

              {editingId === c._id.toString() ? (
                <button
                  onClick={() => {
                    const textarea =
                      document.querySelector<HTMLTextAreaElement>(
                        `#edit-${c._id.toString()}`
                      );
                    if (textarea) handleEdit(c._id.toString(), textarea.value);
                  }}
                >
                  Save
                </button>
              ) : (
                <button onClick={() => setEditingId(c._id.toString())}>
                  Edit
                </button>
              )}

              <button onClick={() => setReplyingTo(c._id.toString())}>
                Reply
              </button>

              <button onClick={() => handleDelete(c._id.toString())}>
                Delete
              </button>
            </div>

            {/* Reply box */}
            {replyingTo === c._id.toString() && (
              <div className={styles.replyForm}>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write a reply..."
                />
                <button
                  onClick={() => handleReply(c._id.toString())}
                  disabled={replyingLoading}
                >
                  {replyingLoading ? "Replying..." : "Reply"}
                </button>
                <button onClick={() => setReplyingTo(null)}>Cancel</button>
              </div>
            )}

            {/* Replies */}
            {c.replies?.length > 0 && (
              <ul className={styles.replyList}>
                {c.replies.map((r, i) => (
                  <li key={i} className={styles.reply}>
                    <span className={styles.replyUser}>{r.userName}:</span>{" "}
                    <span className={styles.replyMessage}>{r.message}</span>{" "}
                    <small>{new Date(r.createdAt).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

