import { Blog } from "@/app/assets/farmvisit/BlogAssets";
import styles from "./BlogCardGrid.module.css";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

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
    setVisibleBlogs(blogs); // show all
    setHasMore(false);
  };

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>View Blogs Here</h2>
        <div className={styles.grid}>
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
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
