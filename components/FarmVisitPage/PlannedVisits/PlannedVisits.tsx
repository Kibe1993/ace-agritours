"use client";

import React, { useEffect, useState } from "react";
import styles from "./PlannedVisits.module.css";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Users, Tag, Sprout } from "lucide-react";
import { PlannedVisit } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

export default function PlannedVisits() {
  const [data, setData] = useState<PlannedVisit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlannedVisits = async () => {
      try {
        const res = await axios.get("/api/planned");
        const all = res.data.plannedVisits as PlannedVisit[];
        const sortedByNewest = all.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const newestThree = sortedByNewest.slice(0, 3);
        setData(newestThree);
      } catch (err) {
        console.error("Failed to fetch planned farm visits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlannedVisits();
  }, []);

  if (loading) {
    <p>Loading Planned Visits</p>;
  }
  if (!data) {
    <p>Error fetching planned farm visits</p>;
  }

  return (
    <section id="plannedvisits" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Planned Farm Visits</h2>
        <p className={styles.subtitle}>
          Whatever farm sector you are in, we got you covered.
        </p>

        <div className={styles.cards}>
          {data.map((visit) => (
            <div key={visit._id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={visit.image.url}
                  alt={visit.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <span
                  className={`${styles.badge} ${
                    styles[visit.status.toLowerCase()]
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{visit.title}</h3>
                <div className={styles.details}>
                  <div className={styles.tags}>
                    <span className={`${styles.tag} ${styles.location}`}>
                      <MapPin size={14} className={styles.icon} />
                      {visit.location}
                    </span>
                    <span className={`${styles.tag} ${styles.category}`}>
                      <Sprout size={14} className={styles.icon} />
                      {visit.category}
                    </span>
                  </div>

                  <div className={styles.dateGuests}>
                    <span>
                      📅 {visit.date} @ {visit.time}
                    </span>
                    <span>👥 {visit.guests} guests</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link
                    href={`/farmvisit/${visit.slug}/booking/${visit._id}`}
                    className={styles.bookNow}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/contact" className={styles.link}>
            Reach Out
          </Link>
        </div>
      </div>
    </section>
  );
}
