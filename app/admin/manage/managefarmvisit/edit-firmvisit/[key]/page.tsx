"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LexicalEditor from "@/components/editor/LexicalEditor";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import type { LexicalEditorHandle } from "@/components/editor/LexicalEditor";
import { useParams, useRouter } from "next/navigation";

export default function EditFarmVisitPage() {
  const { key } = useParams();
  const router = useRouter();

  const [farmVisit, setFarmVisit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<LexicalEditorHandle | null>(null);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Fetch existing farm visit
  useEffect(() => {
    const fetchFarmVisit = async () => {
      try {
        const response = await axios.get(`/api/farmvisits/${key}`);
        const data = response.data;
        setFarmVisit(data);
        setDescription(data.description || "");
      } catch (error) {
        console.error("Error fetching farm visit:", error);
        toast.error("Failed to load farm visit details.");
      } finally {
        setLoading(false);
      }
    };
    if (key) fetchFarmVisit();
  }, [key]);

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

    const toastId = toast.info("Updating farm visit...", {
      autoClose: false,
    });

    const formData = new FormData(form);
    formData.append("description", description);
    selectedImages.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const response = await axios.patch(`/api/farmvisits/${key}`, formData);
      console.log("Response:", response.data);

      toast.update(toastId, {
        render: "Farm visit updated successfully!",
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });

      router.push(`/farmvisit/${key}`);
    } catch (error) {
      console.error("Update failed:", error);
      toast.update(toastId, {
        render: "Error updating farm visit.",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!farmVisit) return <p className={styles.error}>Farm visit not found.</p>;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Farm Visit</h1>
          <p className={styles.subtitle}>
            Update the details of this farm visit
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={farmVisit.title}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={farmVisit.location}
            required
          />

          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            defaultValue={farmVisit.area}
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={farmVisit.date?.slice(0, 10)}
            required
          />

          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={farmVisit.time}
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={farmVisit.category}
            required
          >
            <option value="">Select Category</option>
            <option value="Aquaculture">Aquaculture</option>
            <option value="Horticulture">Horticulture</option>
            <option value="Livestock">Livestock</option>
            <option value="Poultry">Poultry</option>
            <option value="Bees">Beekeeping</option>
          </select>

          <label htmlFor="guests">Expected Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            defaultValue={farmVisit.guests}
            required
          />

          <label htmlFor="trainer">Trainer</label>
          <input
            type="text"
            id="trainer"
            name="trainer"
            defaultValue={farmVisit.trainer}
            required
          />

          <label htmlFor="highlights">Highlights (comma-separated)</label>
          <input
            type="text"
            id="highlights"
            name="highlights"
            defaultValue={farmVisit.highlights?.join(", ")}
          />

          <label htmlFor="description">Description</label>
          <LexicalEditor
            ref={editorRef}
            onChange={setDescription}
            initialContent={farmVisit.description}
          />

          <label htmlFor="treatmentSummary">Treatment Summary</label>
          <textarea
            id="treatmentSummary"
            name="treatmentSummary"
            rows={3}
            defaultValue={farmVisit.treatmentSummary}
          />

          <label>Available Days</label>
          <div className={styles.checkboxGroup}>
            {weekdays.map((day) => (
              <label key={day} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day}
                  defaultChecked={farmVisit.availableDays?.includes(day)}
                />
                {day}
              </label>
            ))}
          </div>

          <label htmlFor="images">Upload Images</label>
          <div className={styles.uploadPlaceholder} onClick={handleUploadClick}>
            📷 Click to upload new images
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

          {/* Existing Images */}
          <div className={styles.imagePreviewGrid}>
            {farmVisit.images?.map((url: string, idx: number) => (
              <div key={idx} className={styles.previewItem}>
                <img src={url} alt={`Existing ${idx}`} />
              </div>
            ))}
            {selectedImages.map((img, idx) => (
              <div key={`new-${idx}`} className={styles.previewItem}>
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
            defaultValue={farmVisit.email}
            required
          />

          <label htmlFor="phone">Contact Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={farmVisit.phone}
            required
          />

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Farm Visit"}
          </button>
        </form>
      </main>
    </section>
  );
}
