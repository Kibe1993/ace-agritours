"use client";

import { useState, useRef } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function AddPartner() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setLogoFile(null);
    fileInputRef.current?.value && (fileInputRef.current.value = "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (logoFile) {
      formData.set("logo", logoFile); 
    }

    try {
      const res = await axios.post("/api/partner", formData);
      toast.success("✅ Partner submitted successfully!");
      form.reset();
      setLogoPreview(null);
      setLogoFile(null);
    } catch (error: unknown) {
      let message = "Error saving Partner.";
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
      <h1 className={styles.heading}>Add a Partner</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            required={!logoPreview}
            ref={fileInputRef}
            onChange={handleLogoChange}
            className={styles.hiddenFileInput}
          />
        </div>

        {logoPreview && (
          <div className={styles.previewWrapper}>
            <img
              src={logoPreview}
              alt="Logo Preview"
              className={styles.logoPreview}
            />
            <button
              type="button"
              onClick={removeLogo}
              className={styles.removeButton}
            >
              ❌ Remove
            </button>
          </div>
        )}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit Partner"}
        </button>
      </form>
    </div>
  );
}
