import Link from "next/link";
import { MapPin, Book, Heart } from "lucide-react";
import styles from "./InitiativeSection.module.css";

export default function InitiativeSection() {
  const items = [
    {
      icon: <MapPin size={28} />,
      title: "Plan Your Visit",
      message:
        "Book a guided tour to one of our partner farms and experience agriculture firsthand.",
      link: "Book Now",
    },
    {
      icon: <Book size={28} />,
      title: "Learn & Share",
      message:
        "Access our blog for agricultural insights, tips, and success stories from Kenya.",
      link: "Read Blogs",
    },
    {
      icon: <Heart size={28} />,
      title: "Support Farmers",
      message:
        "Make a donation to support agricultural education and sustainable farming practices.",
      link: "Donate Now",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Ready to Transform Agriculture in Kenya?</h2>
          <p>
            Join thousands of farmers, students, and agricultural enthusiasts
            who are building a sustainable future for Kenya&apos;s agriculture
            sector.
          </p>
        </div>

        <div className={styles.cards}>
          {items.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.icon}>{item.icon}</div>
              <h4 className={styles.title}>{item.title}</h4>
              <p className={styles.message}>{item.message}</p>
              {item.link && (
                <Link
                  href={`${
                    item.link === "Donate Now"
                      ? "/donate"
                      : item.link === "Book Now"
                      ? "/farmvisit#plannedvisits "
                      : item.link === "Read Blogs"
                      ? "/blog"
                      : null
                  }`}
                  className={styles.link}
                >
                  {item.link}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaButtons}>
          <Link href="/farmvisit#plannedvisits" className={styles.cta}>
            Get Started Today
          </Link>
          <Link href="/contact" className={styles.cta}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
