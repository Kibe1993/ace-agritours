"use client";

import { useRef, useState } from "react";
import axios from "axios";
import LexicalEditor, {
  LexicalEditorHandle,
} from "@/components/editor/LexicalEditor";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function AddBlogPage() {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const editorRef = useRef<LexicalEditorHandle | null>(null);

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
      editorRef.current?.clearEditor?.();
    } catch (err: unknown) {
      let message = "Failed to submit blog post";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      console.error("Submission error:", err);
      toast.error(message);
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
            <LexicalEditor ref={editorRef} onChange={setDescription} />

            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="">Select Category</option>
              <option value="Livestock">Livestock</option>
              <option value="Beekeeping">Beekeeping</option>
              <option value="Poultry">Poultry</option>
              <option value="Aquaculture">Acquaculture</option>
              <option value="Horticulture">Holticulture</option>
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
        </main>
      </div>
    </section>
  );
}
