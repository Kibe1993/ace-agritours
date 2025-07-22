import styles from "./Stats.module.css";

const StatsSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Impact in Numbers</h2>
        <div className={styles.grid}>
          <div className={styles.statItem}>
            <p className={styles.statValue}>120+</p>
            <p className={styles.statLabel}>Farmers Inspired</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>350</p>
            <p className={styles.statLabel}>Visits Made</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>87%</p>
            <p className={styles.statLabel}>Knowledge Transfer Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
