import React from "react";
import styles from "./PlannedVisits.module.css";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Users, Tag, Sprout } from "lucide-react";
import { upcomingVisits } from "@/app/assets/farmvisit/farmvisitassets";

export default function PlannedVisits() {
  return (
    <section id="plannedvisits" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Planned Farm Visits</h2>
        <p className={styles.subtitle}>
          Whatever farm sector you are in, we got you covered.
        </p>

        <div className={styles.cards}>
          {upcomingVisits.map((visit) => (
            <div key={visit.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={visit.image}
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
                    href={`/farmvisit/${visit.slug}/booking/${visit.id}`}
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
