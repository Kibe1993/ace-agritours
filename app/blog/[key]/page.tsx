"use client";

import { useParams } from "next/navigation";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";

export default function BlogDetails() {
  const params = useParams();
  const key = params?.key;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const res = await axios.get(`/api/blogs/${key}`);

        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch visit", err);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      fetchVisit();
    }
  }, [key]);

  if (loading) {
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
        <div className={styles.actions}>
          <button className={styles.edit}>Edit</button>
          <button className={styles.delete}>Delete</button>
        </div>
      </div>
    </section>
  );
}
