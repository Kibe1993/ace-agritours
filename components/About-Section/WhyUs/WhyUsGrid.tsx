'use client'
import styles from "./WhyUsGrid.module.css";
import WhyUsItemCard from "./WhyUSCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WhyUs } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

export default function WhyUsGrid() {
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
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3>Why Choose AceAgritours</h3>
          <p>
            Discover the unique value we offer through our programs and services
          </p>
        </header>

        <main className={styles.grid}>
         {loading ? (
            <p className={styles.loadingText}>Loading why us content...</p>
          ) : (
            whyUs.slice(0, 4).map((item) => (
              <WhyUsItemCard key={item.title} item={item} />
            ))
          )}
        </main>
        <Link href={"/farmvisit#ourvisits"} className={styles.button}>
          See Our Past Farm Visits
        </Link>
      </div>
    </section>
  );
}
