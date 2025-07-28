import styles from "./BlogSubscription.module.css";

export default function BlogSubscription() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Subscribe to Our Newsletter</h2>
        <p className={styles.subtext}>
          Be the first to know when we publish new blog posts, tutorials, or
          farming guides.
        </p>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email address"
            required
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
