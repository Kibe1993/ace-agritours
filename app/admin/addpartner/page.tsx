import styles from "./page.module.css";

export default function AddPartner() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add a Partner</h1>
      <form className={styles.form}>
        <div>
          <label className={styles.label}>Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="e.g. GreenHarvest Ltd"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Website</label>
          <input
            required
            type="url"
            name="website"
            placeholder="https://example.com"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Description</label>
          <textarea
            required
            name="description"
            rows={4}
            placeholder="Brief description of the partner organization"
            className={styles.textarea}
          />
        </div>

        <div className={styles.fileUploadWrapper}>
          <label htmlFor="logoUpload" className={styles.uploadLabel}>
            🖼️ Click here to upload the logo
          </label>
          <input
            type="file"
            id="logoUpload"
            name="logo"
            accept="image/*"
            required
            className={styles.hiddenFileInput}
          />
        </div>

        <button type="submit" className={styles.button}>
          Submit Partner
        </button>
      </form>
    </div>
  );
}
