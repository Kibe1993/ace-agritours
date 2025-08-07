import Image from "next/image";
import styles from "./WhyUsItem.module.css";
import { WhyUs } from "@/lib/TSInterfaces/typescriptinterface";


export default function WhyUSItem({ item }: { item: WhyUs }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image.url}
          alt={item.title}
          className={styles.image}
          fill
          sizes="100%"
        />
      </div>
      <div className={styles.textContent}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}
