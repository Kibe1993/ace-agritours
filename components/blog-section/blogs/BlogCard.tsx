import Image from "next/image";
import Link from "next/link";
import styles from "./BlogCard.module.css";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={blog.image.url}
          alt={blog.title}
          className={styles.image}
          fill
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{blog.category}</span>
        <h3 className={styles.title}>{blog.title}</h3>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
        <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
          Read more
        </Link>
        <p className={styles.date}>{blog.date}</p>
      </div>
    </div>
  );
}
