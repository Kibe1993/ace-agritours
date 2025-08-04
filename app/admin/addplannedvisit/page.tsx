"use client";

import { useRef } from "react";
import styles from "./page.module.css";

export default function AddPlannedVisitPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Add Planned Visit</h1>
        <form className={styles.form}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Green Valley Livestock Farm"
            required
          />

          <label htmlFor="status">Status</label>
          <select id="status" name="status" required>
            <option value="">Select status</option>
            <option value="Planned">Planned</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g. Nakuru"
            required
          />

          <label htmlFor="category">Category</label>
          <select id="category" name="category" required>
            <option value="">Select category</option>
            <option value="Livestock">Livestock</option>
            <option value="Poultry">Poultry</option>
            <option value="Aquaculture">Aquaculture</option>
            <option value="Horticulture">Horticulture</option>
          </select>

          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />

          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" required />

          <label htmlFor="guests">Expected Guests</label>
          <input type="number" id="guests" name="guests" required />

          <label htmlFor="image">Upload Image</label>
          <div className={styles.uploadBox} onClick={handleUploadClick}>
            📷 Click to upload
          </div>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            className={styles.hiddenInput}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Add Planned Visit
          </button>
        </form>
      </div>
    </section>
  );
}
