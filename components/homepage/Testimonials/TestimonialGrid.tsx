"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TestimonialGrid.module.css";
import TestimonialCard from "./TestimonialCard";
import Link from "next/link";
import { TestimonialType } from "@/lib/TSInterfaces/typescriptinterface";

export default function TestimonialGrid() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/api/testimonials");
        const all = res.data.testimonials as TestimonialType[];
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 3);
        setTestimonials(random);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Stories from Our Community</h2>
          <p className={styles.subtitle}>
            Hear from farmers and visitors who have transformed their
            agricultural practices through our farm visit programs.
          </p>
        </header>

        <main className={styles.grid}>
          {loading ? (
            <p>Loading testimonials...</p>
          ) : (
            testimonials.map((item) => (
              <TestimonialCard key={item._id} item={item} />
            ))
          )}
        </main>

        <p className={styles.storyBanner}>Have a story to share?</p>
        <Link href="/add-content" className={styles.buttonLink}>
          Submit Your Testimonials
        </Link>
      </div>
    </section>
  );
}
