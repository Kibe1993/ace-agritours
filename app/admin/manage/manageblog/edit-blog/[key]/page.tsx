"use client";

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import LexicalEditor, {
  LexicalEditorHandle,
} from "@/components/editor/LexicalEditor";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";

export default function EditBlogPage() {
  const { key } = useParams();
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const editorRef = useRef<LexicalEditorHandle | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch blog data for editing
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${key}`);
        const data = res.data;
        setBlog(data);
        setDescription(data.description);
        setPreviewUrl(data.image?.url || null);
      } catch (err) {
        console.error("Failed to fetch blog", err);
        toast.error("Failed to load blog for editing.");
      } finally {
        setLoading(false);
      }
    };

    if (key) fetchBlog();
  }, [key]);

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
    if (!blog) return;

    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    formData.set("description", description);
    if (selectedImage) {
      formData.set("image", selectedImage);
    }

    try {
      await axios.patch(`/api/blogs/${key}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog updated successfully!");
      router.push(`/blog/${key}`); // redirect back to blog page
    } catch (err: unknown) {
      let message = "Failed to update blog post";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }
      console.error("Update error:", err);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className={styles.container}>
        <p>Loading blog for editing...</p>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className={styles.container}>
        <h2>Blog not found</h2>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Edit Blog Post</h1>
      </header>

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={blog.title}
            required
          />

          <label htmlFor="description">Description</label>
          <LexicalEditor
            ref={editorRef}
            onChange={setDescription}
            initialContent={blog.description}
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={blog.category}
            required
          >
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
            defaultValue={blog.date ? blog.date.split("T")[0] : ""}
          />

          <label htmlFor="image">Image</label>
          <div className={styles.uploadPlaceholder} onClick={handleUploadClick}>
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
            defaultValue={blog.author}
            required
          />

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </main>
    </section>
  );
}
