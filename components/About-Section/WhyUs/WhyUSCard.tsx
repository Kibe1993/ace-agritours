import { WhyUsCard } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import styles from "./WhyUsCard.module.css";
import { WhyUs } from "@/lib/TSInterfaces/typescriptinterface";

export default function WhyUsItemCard({ item }: { item: WhyUs }) {
  return (
    <section className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image.url}
          alt={item.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <h4 className={styles.title}>{item.title}</h4>
        <p className={styles.description}>{item.description}</p>
      </div>
    </section>
  );
}
