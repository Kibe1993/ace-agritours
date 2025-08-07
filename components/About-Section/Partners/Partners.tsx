import Link from "next/link";

import styles from "./Partners.module.css";
import { Partner } from "@/lib/TSInterfaces/typescriptinterface";
import Image from "next/image";

export default function PartnerCard({ item }: { item: Partner }) {
  return (
    <div className={styles.card}>
      <div className={styles.logoWrapper}>
        <Image
          src={item.logo.url}
          alt={`${item.name} logo`}
          fill
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
