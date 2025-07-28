"use client";
import { useEffect, useState } from "react";
import styles from "./BlogPage.module.css";
import { Blog, blogData } from "../assets/farmvisit/BlogAssets";
import BlogHero from "@/components/blog-section/BlogHero";
import BlogCardGrid from "@/components/blog-section/blogs/BlogCardGrid";
import BlogSubscription from "@/components/blog-section/subscribe/BlogSubscription";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

  useEffect(() => {
    const shuffled = [...blogData].sort(() => 0.5 - Math.random());
    const filtered =
      activeCategory === "All"
        ? shuffled
        : shuffled.filter((blog) => blog.category === activeCategory);

    setFilteredBlogs(filtered);
  }, [activeCategory]);

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
