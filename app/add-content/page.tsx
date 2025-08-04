"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function AddTestimonialPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (selectedFile) {
      formData.set("image", selectedFile);
    }

    try {
      setLoading(true);
      toast.info("Submitting Testimonial");

      const res = await axios.post("/api/testimonials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Testimonial submitted successfully!");
      form.reset();
      setPreview(null);
      setSelectedFile(null);
    } catch (err) {
      console.error("Submission failed", err);
      toast.error("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Your Testimony Here</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Name</label>
          <input required type="text" name="name" className={styles.input} />
        </div>

        <div>
          <label className={styles.label}>Title</label>
          <input required type="text" name="title" className={styles.input} />
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
            id="imageUpload"
            name="image"
            type="file"
            accept="image/*"
            required={!preview}
            className={styles.hiddenFileInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {preview && (
          <div className={styles.previewWrapper}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setSelectedFile(null);
              }}
              className={styles.removeButton}
            >
              ❌ Remove Image
            </button>
          </div>
        )}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
}
