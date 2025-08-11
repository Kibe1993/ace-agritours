import styles from "./BlogCardGrid.module.css";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";

interface BlogCardGridProps {
  blogs: Blog[];
}

export default function BlogCardGrid({ blogs }: BlogCardGridProps) {
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const initial = blogs.slice(0, 8);
    setVisibleBlogs(initial);
    setHasMore(blogs.length > 8);
  }, [blogs]);

  const handleShowMore = () => {
    setVisibleBlogs(blogs);
    setHasMore(false);
  };

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>View Blogs Here</h2>
        <div className={styles.grid}>
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
        {hasMore && (
          <div className={styles.showMoreContainer}>
            <button className={styles.showMoreBtn} onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
