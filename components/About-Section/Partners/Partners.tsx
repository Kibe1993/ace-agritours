import Link from "next/link";
import { Partner } from "@/app/assets/assets";
import styles from "./Partners.module.css";

export default function PartnerCard({ item }: { item: Partner }) {
  return (
    <div className={styles.card}>
      <div className={styles.logoWrapper}>
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          width={80}
          height={80}
          className={styles.logo}
        />
      </div>
      <h4 className={styles.name}>{item.name}</h4>
      <p className={styles.description}>{item.description}</p>
      <Link href={item.website} target="_blank" className={styles.link}>
        Visit Website →
      </Link>
    </div>
  );
}
