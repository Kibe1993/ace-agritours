"use client";

import { useRef, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function AddPlannedVisitPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please upload an image.");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("image", selectedFile);

    try {
      setIsSubmitting(true);
      const res = await axios.post("/api/planned", formData);
      toast.success("Planned visit saved successfully!");
      form.reset();
      handleRemoveImage();
    } catch (error: any) {
      console.error("Failed to save planned visit:", error);
      toast.error("Error saving planned visit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Add Planned Visit</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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

          <label>Upload Image</label>
          <div className={styles.uploadBox} onClick={handleUploadClick}>
            📷 Click to upload
          </div>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />

          {preview && (
            <div className={styles.previewBox}>
              <img src={preview} alt="Preview" className={styles.previewImg} />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={styles.removeBtn}
              >
                ❌ Remove
              </button>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Add Planned Visit"}
          </button>
        </form>
      </div>
    </section>
  );
}
