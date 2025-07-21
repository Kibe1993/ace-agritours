import Link from "next/link";
import styles from "./OurStories.module.css";

export default function OurStoriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.textBox}>
          <h1 className={styles.heading}>Who Are We?</h1>
          <p className={styles.paragraph}>
            Ace Agritours was born from the soil — quite literally. What began
            as small farm visits with friends grew into a mission: to reconnect
            people with the land, the farmers, and the food that sustains us. We
            believe that every visit to a farm is more than a tour — it&#39;s a
            story waiting to unfold, one that educates, inspires, and brings us
            closer to nature. Come walk with us, and let Kenya&#39;s farms tell
            you their story.
          </p>
          <Link href={"/contact"} className={styles.button}>
            Contact US
          </Link>
        </div>

        {/* Right Video */}
        <div className={styles.videoBox}>
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=dxatenmlh&public_id=Stories_jy1e6l&profile=cld-default"
            width="100%"
            height="400"
            allow="autoplay; fullscreen; encrypted-media"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
