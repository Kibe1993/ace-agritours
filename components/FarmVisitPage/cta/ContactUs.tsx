import Link from "next/link";
import styles from "./ContactUs.module.css";

export default function ContactUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Want Your Farm Listed On ACEAgritours?
          </h2>
        </header>

        <main>
          <p className={styles.description}>
            Join our network of amazing Kenyan farms and share your agricultural
            story with visitors from around the world.
          </p>

          <Link href="/contact" className={styles.button}>
            Contact Us
          </Link>
        </main>
      </div>
    </section>
  );
}
