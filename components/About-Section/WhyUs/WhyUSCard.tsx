import { WhyUsCard } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import styles from "./WhyUsCard.module.css";

export default function WhyUsItemCard({ item }: { item: WhyUsCard }) {
  return (
    <section className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <h4 className={styles.title}>{item.title}</h4>
        <p className={styles.description}>{item.description}</p>
        <Link href="/contact" className={styles.link}>
          More Info →
        </Link>
      </div>
    </section>
  );
}
