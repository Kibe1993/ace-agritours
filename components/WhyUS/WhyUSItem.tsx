import Image from "next/image";
import styles from "./WhyUsItem.module.css";
import { HeroFeature } from "@/app/assets/assets";

export default function WhyUSItem({ item }: { item: HeroFeature }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          className={styles.image}
          fill
          sizes="100%"
        />
      </div>
      <div className={styles.textContent}>
        <h3>{item.title}</h3>
        <p>{item.p}</p>
      </div>
    </div>
  );
}
