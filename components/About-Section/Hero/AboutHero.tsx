import Link from "next/link";
import styles from "./AboutHero.module.css";
import { ArrowRight } from "lucide-react";

export default function AboutHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Discover Kenya&apos;s Rich Farming Culture Up Close
          </h1>
          <p className={styles.subtitle}>
            Join guided farm visits, connect with communities, and experience
            sustainable agriculture
          </p>

          <Link href="#" className={styles.buttonLink}>
            Plan Your Farm Visit <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
