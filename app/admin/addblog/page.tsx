"use client";

import { useRef, useState } from "react";
import LexicalEditor from "@/components/editor/LexicalEditor";
import styles from "./page.module.css";

export default function AddBlogPage() {
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
            <button className={styles.previewBtn}>Preview</button>
            <button className={styles.publishBtn}>Save & Publish</button>
          </div>
        </header>

        <main className={styles.main}>
          <form className={styles.form}>
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
              📷 Click to upload cover image
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              className={styles.hiddenFileInput}
              required
            />

            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author Name"
              required
            />

            <button type="submit" className={styles.submitBtn}>
              Add Blog
            </button>
          </form>

          <aside className={styles.sidebar}>
            <h2>Publish Settings</h2>

            <div className={styles.statusActions}>
              <button>Pending</button>
              <button>Featured</button>
              <button>Edit</button>
              <button>Delete</button>
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
