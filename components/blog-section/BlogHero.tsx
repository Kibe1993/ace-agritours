"use client";

import styles from "./BlogHero.module.css";
import blogImg from "@/public/blog-hero3.jpg";
import { StaticImageData } from "next/image";

type BlogHeroProps = {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

export default function BlogHero({
  categories,
  activeCategory,
  setActiveCategory,
}: BlogHeroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          className={styles.heroBackground}
          style={{
            backgroundImage: `url(${(blogImg as StaticImageData).src})`,
          }}
        >
          <div className={styles.overlay}></div>
          <main className={styles.textContent}>
            <h1 className={styles.title}>Explore Our Documented Knowledge</h1>
            <p className={styles.subtitle}>
              Select categories of blogs that interest you
            </p>
          </main>
        </div>

        <div className={styles.filterGroup}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
