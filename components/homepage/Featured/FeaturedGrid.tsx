import { FeaturedVisits } from "@/app/assets/assets";
import FeaturedCard from "./FeaturedCard";
import styles from "./FeaturedGrid.module.css";
import Link from "next/link";

export default function FeaturedGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Featured Farm Visits</h2>
          <p className={styles.subtitle}>
            Join our upcoming visits to thriving farms across Kenya and learn
            from experienced farmers who are leading the way in sustainable
            agriculture.
          </p>
        </header>

        <main className={styles.grid}>
          {FeaturedVisits.slice(0, 4).map((item, index) => (
            <FeaturedCard key={index} item={item} />
          ))}
        </main>

        <Link href={"/farmvisit"} className={styles.buttonLink}>
          {" "}
          View All
        </Link>
      </div>
    </section>
  );
}
