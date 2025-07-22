"use client";

import { useState } from "react";
import styles from "./OurVisitGrid.module.css";
import { farmVisits } from "@/app/assets/farmvisit/farmvisitassets";
import OurVisitCard from "./OurvisitsCard";
import Link from "next/link";

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

  const filteredVisits =
    selectedCategory === "All"
      ? farmVisits
      : farmVisits.filter((v) => v.category === selectedCategory);

  return (
    <section className={styles.section}>
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
          {filteredVisits.map((visit) => (
            <OurVisitCard key={visit.id} item={visit} />
          ))}
        </div>

        <Link href="/farmvisit/planned" className={styles.link}>
          Only for You →
        </Link>
      </div>
    </section>
  );
}
