"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./page.module.css";

export default function AddWhyUs() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (imageFile) {
      formData.set("image", imageFile);
    }

    try {
      await axios.post("/api/whyus", formData);
      toast.success("✅ Why Us card submitted successfully!");
      form.reset();
      removeImage();
    } catch (error: unknown) {
      let message = "Error saving WhyUs.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add a Why Us Card</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            required={!imageFile}
            ref={fileInputRef}
            onChange={handleImageChange}
            className={styles.hiddenFileInput}
          />
        </div>

        {imagePreview && (
          <div className={styles.previewWrapper}>
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.logoPreview}
            />
            <button
              type="button"
              onClick={removeImage}
              className={styles.removeButton}
            >
              ❌ Remove
            </button>
          </div>
        )}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit Why Us Card"}
        </button>
      </form>
    </div>
  );
}
