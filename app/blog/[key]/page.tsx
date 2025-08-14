"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";
import { useUser } from "@clerk/nextjs";

export default function BlogDetails() {
  const params = useParams();
  const router = useRouter();
  const key = params?.key;

  const { user, isLoaded, isSignedIn } = useUser();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = isSignedIn && user?.publicMetadata?.role === "admin";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${key}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog", err);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      fetchBlog();
    }
  }, [key]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/blogs/${key}`);
      router.push("/blog");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading || !isLoaded) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p>Loading Blog...</p>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Blog not found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.meta}>
            By {blog.author} • <span>Posted on {blog.date}</span>
          </p>
        </header>

        <main className={styles.main}>
          <div className={styles.imageWrapper}>
            <Image
              src={blog.image.url}
              alt={blog.title}
              fill
              className={styles.image}
            />
            <span className={styles.category}>{blog.category}</span>
          </div>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </main>

        {isAdmin && (
          <div className={styles.actions}>
            <button
              className={styles.edit}
              onClick={() =>
                router.push(`/admin/manage/manageblog/edit-blog/${key}`)
              }
            >
              Edit
            </button>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
