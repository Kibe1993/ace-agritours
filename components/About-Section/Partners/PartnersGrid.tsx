import { partnersData } from "@/app/assets/assets";

import styles from "./PartnerGrid.module.css";
import Link from "next/link";
import PartnerCard from "./Partners";

export default function PartnerGrid() {
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
          {partnersData.map((partner, index) => (
            <PartnerCard key={index} item={partner} />
          ))}
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
