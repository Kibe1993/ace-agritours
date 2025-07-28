"use client";

import { useParams } from "next/navigation";
import { blogData } from "@/app/assets/farmvisit/BlogAssets";
import { Blog } from "@/app/assets/farmvisit/BlogAssets";
import Image from "next/image";
import styles from "./page.module.css";

export default function BlogDetails() {
  const params = useParams();
  const slug = params?.slug;
  const blog = blogData.find((item: Blog) => item.slug === slug);

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
              src={blog.image}
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
