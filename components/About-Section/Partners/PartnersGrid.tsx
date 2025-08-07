"use client"

import styles from "./PartnerGrid.module.css";
import Link from "next/link";
import PartnerCard from "./Partners";
import { useEffect, useState } from "react";
import { Partner } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

export default function PartnerGrid() {
      const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhyUs = async () => {
      try {
        const res = await axios.get("/api/partner");
        const all = res.data.partners as Partner[];
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPartners(random);
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
          <h3>Our Trusted Partners</h3>
          <p>
            We collaborate with reputable organizations to bring you the best
            experiences.
          </p>
        </header>

        <main className={styles.grid}>
        {loading ? (
            <p className={styles.loadingText}>Loading why us content...</p>
          ) : (
            partners.slice(0, 4).map((item) => (
              <PartnerCard key={item.name} item={item} />
            ))
          )}
        </main>

        <div className={styles.buttonWrapper}>
          <Link href="/contact" className={styles.button}>
            Become A Partner →
          </Link>
        </div>
      </div>
    </section>
  );
}
