"use client";
import FeaturedCard from "./FeaturedCard";
import styles from "./FeaturedGrid.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FarmVisits } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

export default function FeaturedGrid() {
  const [ourVisits, setOurVisits] = useState<FarmVisits[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await axios.get("/api/farmvisits");
        const all = res.data.farmvisits as FarmVisits[];
        const featured = all
          .filter((visit) => visit.featured === true)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setOurVisits(featured);
      } catch (err) {
        console.error("Failed to fetch farm visits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Featured Farm Visits</h2>
          <p className={styles.subtitle}>
            Join our upcoming visits to thriving farms across Kenya and learn
            from experienced farmers who are leading the way in sustainable
            agriculture.
          </p>
        </header>

        <main className={styles.grid}>
          {loading ? (
            <p>Loading...</p>
          ) : ourVisits.length > 0 ? (
            ourVisits.map((item, index) => (
              <FeaturedCard key={item._id || index} item={item} />
            ))
          ) : (
            <p>No featured visits available.</p>
          )}
        </main>

        <Link href={"/farmvisit"} className={styles.buttonLink}>
          View All
        </Link>
      </div>
    </section>
  );
}
