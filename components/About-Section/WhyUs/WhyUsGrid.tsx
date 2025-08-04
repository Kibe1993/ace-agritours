import { whyUsData } from "@/app/assets/assets";
import styles from "./WhyUsGrid.module.css";
import WhyUsItemCard from "./WhyUSCard";
import Link from "next/link";

export default function WhyUsGrid() {
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
          {whyUsData.map((item, index) => (
            <WhyUsItemCard key={index} item={item} />
          ))}
        </main>
        <Link href={"/farmvisit"} className={styles.button}>
          See Our Past Farm Visits
        </Link>
      </div>
    </section>
  );
}
