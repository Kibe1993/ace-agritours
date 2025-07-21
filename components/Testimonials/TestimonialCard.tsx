import { Testimonial } from "@/app/assets/assets";
import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.avatarAndName}>
          <div className={styles.avatar}>👩‍🌾</div>
          <h4 className={styles.name}>{item.name}</h4>
        </div>

        <div className={styles.userInfo}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.location}>{item.location}</p>
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
