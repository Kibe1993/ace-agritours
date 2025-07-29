import { testimonials } from "@/app/assets/assets";
import styles from "./TestimonialGrid.module.css";
import Link from "next/link";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Stories from Our Community</h2>
          <p className={styles.subtitle}>
            Hear from farmers and visitors who have transformed their
            agricultural practices through our farm visit programs.
          </p>
        </header>

        <main className={styles.grid}>
          {testimonials.slice(0, 4).map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </main>
        <p className={styles.storyBanner}>Have a story to share?</p>

        <Link href={"#"} className={styles.buttonLink}>
          Submit Your Testmonials
        </Link>
      </div>
    </section>
  );
}
