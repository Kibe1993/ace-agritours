import styles from "./FarmvisitHero.module.css";

export default function FarmVisitHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>Explore Our Farm Visits</h1>
        <p>
          Discover authentic Kenyan farming experiences and connect with local
          agricultural communities.
        </p>
        <a href="#plannedvisits" className={styles.link}>
          See Planned Farm Visits →
        </a>
      </div>
    </section>
  );
}
