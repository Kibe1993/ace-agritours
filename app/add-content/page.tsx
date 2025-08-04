import styles from "./page.module.css";

export default function AddTestimonialPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Your Testimony Here</h1>
      <form className={styles.form}>
        <div>
          <label className={styles.label}>Name</label>
          <input required type="text" name="name" className={styles.input} />
        </div>

        <div>
          <label className={styles.label}>Title</label>
          <input
            required
            type="text"
            name="title"
            placeholder="e.g. Aspiring Farmer"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Location</label>
          <input
            required
            type="text"
            name="location"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Rating</label>
          <select name="rating" className={styles.select}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>Message</label>
          <textarea
            required
            name="message"
            rows={4}
            className={styles.textarea}
          />
        </div>

        <div className={styles.fileUploadWrapper}>
          <label htmlFor="imageUpload" className={styles.uploadLabel}>
            📸 Click here to upload your image
          </label>
          <input
            type="file"
            id="imageUpload"
            name="image"
            accept="image/*"
            required
            className={styles.hiddenFileInput}
          />
        </div>

        <button type="submit" className={styles.button}>
          Submit Testimonial
        </button>
      </form>
    </div>
  );
}
