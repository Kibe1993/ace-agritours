import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedCard.module.css";
import { MapPin, Users, ArrowRight, Info } from "lucide-react";
import { FarmVisit } from "@/app/assets/assets";

export default function FeaturedCard({ item }: { item: FarmVisit }) {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <Image
          src={item.image}
          alt="farm image"
          width={400}
          height={250}
          className={styles.image}
        />
      </header>

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.meta}>
            <p>
              <MapPin size={16} className={styles.icon} />
              {item.location}
            </p>
            <p>
              <Users size={16} className={styles.icon} />
              {item.visitors} visitors
            </p>
          </div>
        </div>

        <div className={styles.details}>
          <h4 className={styles.subtitle}>{item.subtitle}:</h4>
          <ul className={styles.tags}>
            {item.tags?.map((tag: string, index: number) => (
              <li key={index} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.buttons}>
          <Link href="#" className={styles.link}>
            <Info size={16} className={styles.linkIcon} />
            Learn More
          </Link>
          <Link href="#" className={styles.primaryBtn}>
            Register Now
            <ArrowRight size={16} className={styles.arrowIcon} />
          </Link>
        </div>
      </main>
    </div>
  );
}
