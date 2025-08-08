"use client";

import WhyUSItem from "./WhyUSItem";
import styles from "./WhyUs.module.css";
import Link from "next/link";
import { WhyUs } from "@/lib/TSInterfaces/typescriptinterface";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WhyUSGrid() {
  const [whyUs, setWhyUs] = useState<WhyUs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhyUs = async () => {
      try {
        const res = await axios.get("/api/whyus");
        const all = res.data.whyUs as WhyUs[];
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 3);
        setWhyUs(random);
      } catch (err) {
        console.error("Failed to fetch why us data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyUs();
  }, []);

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <header className={styles.gridHeader}>
          <h2 className={styles.gridTitle}>Why Choose ACEAgritours?</h2>
          <p className={styles.gridDescription}>
            We&apos;re more than just farm visits—we&apos;re building bridges
            between urban and rural communities while promoting sustainable
            agriculture across Kenya.
          </p>
        </header>

        <main className={styles.gridMain}>
          {loading ? (
            <p className={styles.loadingText}>Loading why us content...</p>
          ) : (
            whyUs
              .slice(0, 3)
              .map((item) => <WhyUSItem key={item.title} item={item} />)
          )}
        </main>

        <Link href="/about" className={styles.buttonLink}>
          See More..
        </Link>
      </div>
    </section>
  );
}
