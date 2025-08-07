"use client";

import { useRef, useState } from "react";
import axios from "axios";
import LexicalEditor from "@/components/editor/LexicalEditor";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import type { LexicalEditorHandle } from "@/components/editor/LexicalEditor";

export default function AddFarmVisitPage() {
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<LexicalEditorHandle | null>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...filesArray]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    setIsSubmitting(true);

    const toastId = toast.info("Submitting farm visit...", {
      autoClose: false,
    });

    const formData = new FormData(form);
    formData.append("description", description);
    selectedImages.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const response = await axios.post("/api/farmvisits", formData);
      console.log("Response:", response.data);

      toast.update(toastId, {
        render: "Farm visit saved successfully!",
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });

      form.reset();
      setSelectedImages([]);
      setDescription("");

      editorRef.current?.clearEditor?.();
      //
    } catch (error) {
      console.error("Upload failed:", error);
      toast.update(toastId, {
        render: "Error saving farm visit.",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Add New Farm Visit</h1>
          <p className={styles.subtitle}>
            Enter the details of your upcoming farm visit
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.previewBtn}>Preview</button>
          <button className={styles.publishBtn}>Save & Publish</button>
        </div>
      </header>

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Blue Waters Aquafarm"
            required
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g. Kiambu"
            required
          />
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            placeholder="e.g. Githunguri, Kiambu"
            required
          />
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" required />
          <label htmlFor="category">Category</label>
          <select id="category" name="category" required>
            <option value="">Select Category</option>
            <option value="Aquaculture">Aquaculture</option>
            <option value="Horticulture">Horticulture</option>
            <option value="Livestock">Livestock</option>
            <option value="Poultry">Poultry</option>
          </select>
          <label htmlFor="guests">Expected Guests</label>
          <input type="number" id="guests" name="guests" required />
          <label htmlFor="trainer">Trainer</label>
          <input
            type="text"
            id="trainer"
            name="trainer"
            placeholder="e.g. Mr. Evans Otieno"
            required
          />
          <label htmlFor="highlights">Highlights (comma-separated)</label>
          <input
            type="text"
            id="highlights"
            name="highlights"
            placeholder="e.g. Cage fishing method, Fish harvesting demo"
          />
          <label htmlFor="description">Description</label>
          <LexicalEditor ref={editorRef} onChange={setDescription} />{" "}
          {/* ✅ Pass ref */}
          <label htmlFor="treatmentSummary">Treatment Summary</label>
          <textarea
            id="treatmentSummary"
            name="treatmentSummary"
            rows={3}
            placeholder="e.g. Focus on cage fish farming and water quality optimization."
          />
          <label>Available Days</label>
          <div className={styles.checkboxGroup}>
            {weekdays.map((day) => (
              <label key={day} className={styles.checkboxItem}>
                <input type="checkbox" name="availableDays" value={day} />
                {day}
              </label>
            ))}
          </div>
          <label htmlFor="images">Upload Images</label>
          <div className={styles.uploadPlaceholder} onClick={handleUploadClick}>
            📷 Click to upload images
          </div>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            className={styles.hiddenFileInput}
          />
          {/* Image Previews */}
          <div className={styles.imagePreviewGrid}>
            {selectedImages.map((img, idx) => (
              <div key={idx} className={styles.previewItem}>
                <img src={URL.createObjectURL(img)} alt={`Preview ${idx}`} />
                <button type="button" onClick={() => removeImage(idx)}>
                  ❌
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="email">Contact Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="hello@example.com"
            required
          />
          <label htmlFor="phone">Contact Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+254700000000"
            required
          />
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Farm Visit"}
          </button>
        </form>

        <aside className={styles.sidebar}>
          <h2>Visit Settings</h2>
          <div className={styles.statusActions}>
            <button type="button">Pending</button>
            <button type="button">Featured</button>
          </div>
        </aside>
      </main>
    </section>
  );
}
