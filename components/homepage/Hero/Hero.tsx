"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // ✅ Import the icon

const images = [
  "/ace-hero-2.jpg",
  "/ace-hero-3.jpg",
  "/hero-1.jpg",
  "/ace-goat.jpg",
  "/ace-sheep.jpg",
  "/ace-pig.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className="text-slate-950">
            Discover Kenya&apos;s{" "}
            <span className="text-slate-700">Agricultural Heritage</span>
          </h1>
          <p className="text-slate-600">
            Connect with thriving farms across Kenya. Learn sustainable farming
            practices, meet passionate farmers, and experience agriculture that
            transforms communities.
          </p>
          <div className={styles.callToActions}>
            <Link href="/farmvisit#plannedvisits" className={styles.buttonLink}>
              Plan Your Farm Visit <ArrowRight size={18} />
            </Link>
            <Link href="/blog" className={styles.outlineButton}>
              Read Our Stories <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image
              src={images[current]}
              alt="Farm image"
              width={600}
              height={400}
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
