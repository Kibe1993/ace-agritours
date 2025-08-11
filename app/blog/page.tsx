"use client";
import { useEffect, useState, useMemo } from "react";
import styles from "./BlogPage.module.css";

import BlogHero from "@/components/blog-section/BlogHero";
import BlogCardGrid from "@/components/blog-section/blogs/BlogCardGrid";
import BlogSubscription from "@/components/blog-section/subscribe/BlogSubscription";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

const categories = [
  "All",
  "Livestock",
  "Poultry",
  "Beekeeping",
  "Aquaculture",
  "Horticulture",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        const allBlogs = res.data.blogs as Blog[];
        setBlogs(allBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        blog.status === "Approved" &&
        (activeCategory === "All" || blog.category === activeCategory)
    );
  }, [activeCategory, blogs]);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <section className={styles.pageWrapper}>
      <BlogHero
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <BlogCardGrid blogs={filteredBlogs} />
      <BlogSubscription />
    </section>
  );
}
