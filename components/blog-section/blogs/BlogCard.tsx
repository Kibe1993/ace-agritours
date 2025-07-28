import Image from "next/image";
import Link from "next/link";
import styles from "./BlogCard.module.css";
import { Blog } from "@/app/assets/farmvisit/BlogAssets";

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  const truncateTitle = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={blog.image}
          alt={blog.title}
          className={styles.image}
          placeholder="blur"
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
