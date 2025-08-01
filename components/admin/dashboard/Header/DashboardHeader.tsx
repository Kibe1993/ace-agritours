import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Dashboard Overview</h1>

        <div className={styles.subContainer}>
          <div className={styles.messageBox}>
            <p className={styles.message}>
              Welcome back! Here&apos;s what&apos;s happening with your farm
              tours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
