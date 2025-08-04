"use client";

import { useRef, useState } from "react";
import axios from "axios";
import LexicalEditor from "@/components/editor/LexicalEditor";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function AddBlogPage() {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    formData.append("description", description);
    if (selectedImage) {
      formData.set("image", selectedImage);
    }

    try {
      const res = await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog post submitted successfully!");
      form.reset();
      setDescription("");
      handleRemoveImage();
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Failed to submit blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Add New Blog Post</h1>
            <p className={styles.subtitle}>
              Create and publish a new blog post for your farm tours
            </p>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.previewBtn}>
              Preview
            </button>
            <button type="button" className={styles.publishBtn}>
              Save & Publish
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
              required
            />

            <label htmlFor="description">Description</label>
            <LexicalEditor onChange={setDescription} />

            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="">Select Category</option>
              <option value="Livestock">Livestock</option>
              <option value="Crops">Crops</option>
              <option value="Poultry">Poultry</option>
            </select>

            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Select publish date"
            />

            <label htmlFor="image">Image</label>
            <div
              className={styles.uploadPlaceholder}
              onClick={handleUploadClick}
            >
              {previewUrl ? (
                <div className={styles.previewWrapper}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={handleRemoveImage}
                  >
                    ❌ Remove
                  </button>
                </div>
              ) : (
                <span>📷 Click to upload cover image</span>
              )}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className={styles.hiddenFileInput}
              required={!previewUrl}
            />

            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author Name"
              required
            />

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Blog"}
            </button>
          </form>

          <aside className={styles.sidebar}>
            <h2>Publish Settings</h2>

            <div className={styles.statusActions}>
              <button type="button">Pending</button>
              <button type="button">Featured</button>
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </div>

            <div className={styles.statusInfo}>
              <h3>Post Status</h3>
              <p>
                Status: <span>Draft</span>
              </p>
              <p>
                Featured: <span>No</span>
              </p>
              <p>
                Created: <span>08/01/2025</span>
              </p>
            </div>
          </aside>
        </main>
      </div>
    </section>
  );
}
