import { FarmVisit } from "@/app/assets/farmvisit/farmvisitassets";
import styles from "./OurvisitsCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function OurVisitCard({ item }: { item: FarmVisit }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <MapPin /> {item.location}
          </span>
          <span className={styles.metaItem}> {item.date}</span>
          <span className={styles.metaItem}>{item.category}</span>
        </div>

        <p className={styles.description}>{item.description}</p>

        <p className={styles.guests}>👥 {item.guests} Guests</p>
      </div>

      <div className={styles.linkWrapper}>
        <Link href={`/farmvisit/${item.slug}`} className={styles.link}>
          View More Details
        </Link>
      </div>
    </div>
  );
}
