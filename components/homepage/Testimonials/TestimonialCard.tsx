
import { TestimonialType } from "@/lib/TSInterfaces/typescriptinterface";
import styles from "./TestimonialCard.module.css";
import Image from "next/image";

export default function TestimonialCard({ item }: { item: TestimonialType }) {
  console.log(item.image.url)
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.avatarAndName}>
          <div className={styles.avatar}>
            
           <Image
  src={item.image.url}
  alt="Image"
  fill
  style={{ objectFit: "cover" }}
/>

          </div>
          <h4 className={styles.name}>{item.name}</h4>
        </div>

        <div className={styles.userInfo}>
          <p className={styles.location}>{item.location}</p>
          <p className={styles.title}>{item.title}</p>
          
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.rating}>
          {"★".repeat(item.rating)}
          {"☆".repeat(5 - item.rating)}
        </div>
        <p className={styles.message}>
          <span className={styles.quoteMark}>“</span>
          {item.message}
          <span className={styles.quoteMark}>”</span>
        </p>
      </main>
    </div>
  );
}
