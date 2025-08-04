"use client";
import styles from "./page.module.css";

export default function AddWhyUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add a Why Us Card</h1>
      <form className={styles.form}>
        <div>
          <label className={styles.label}>Title</label>
          <input
            required
            type="text"
            name="title"
            placeholder="e.g. Safe, Guided Adventures"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Description</label>
          <textarea
            required
            name="description"
            rows={4}
            placeholder="Write a short explanation for this Why Us item"
            className={styles.textarea}
          />
        </div>

        <div className={styles.fileUploadWrapper}>
          <label htmlFor="imageUpload" className={styles.uploadLabel}>
            📸 Click here to upload an image
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
          Submit Why Us Card
        </button>
      </form>
    </div>
  );
}
