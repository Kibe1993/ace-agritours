"use client";

import { useEffect, useState } from "react";
import styles from "./OurVisitGrid.module.css";
import OurVisitCard from "./OurvisitsCard";
import Link from "next/link";
import { FarmVisits } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

const categories = [
  "All",
  "Livestock",
  "Poultry",
  "Horticulture",
  "Beekeeping",
  "Aquaculture",
];

export default function OurVisitsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ourVisits, setOurVisits] = useState<FarmVisits[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await axios.get("/api/farmvisits");

        const all = res.data.farmvisits as FarmVisits[];
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 4);
        setOurVisits(random);
      } catch (err) {
        console.error("Failed to fetch farm visits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const filteredVisits =
    selectedCategory === "All"
      ? ourVisits
      : ourVisits.filter((v) => v.category === selectedCategory);

  const visibleVisits = filteredVisits.filter((b) => b.status === "Completed");

  return (
    <section className={styles.section} id="ourvisits">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Previous Visits</h2>
          <p>
            We do not inspire; we educate by choosing the best farms for visits
            across different farming sectors.
          </p>
        </div>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                selectedCategory === cat ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visibleVisits.map((visit) => (
            <OurVisitCard key={visit.slug} item={visit} />
          ))}
        </div>

        <Link href="/farmvisit#plannedvisits" className={styles.link}>
          Only for You →
        </Link>
      </div>
    </section>
  );
}
