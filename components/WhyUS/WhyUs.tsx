import { heroFeatures } from "@/app/assets/assets";
import WhyUSItem from "./WhyUSItem";
import styles from "./WhyUs.module.css";
import Link from "next/link";

export default function WhyUSGrid() {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <header className={styles.gridHeader}>
          <h2 className={styles.gridTitle}>Why Choose ACEAgritours?</h2>
          <p className={styles.gridDescription}>
            We&apos;re more than just farm visits we&apos;re building bridges
            between urban and rural communities while promoting sustainable
            agriculture across Kenya.
          </p>
        </header>

        <main className={styles.gridMain}>
          {heroFeatures.slice(0, 4).map((item) => (
            <WhyUSItem key={item.title} item={item} />
          ))}
        </main>

        <Link href="/about" className={styles.buttonLink}>
          See More..
        </Link>
      </div>
    </section>
  );
}
