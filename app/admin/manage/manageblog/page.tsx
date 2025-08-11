"use client";

import AdminTable from "@/components/admin/admintable/AdminTable";
import styles from "./page.module.css";

import { useEffect, useState } from "react";

import axios from "axios";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";

export default function ManageBlogsPage() {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setData(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleToggleStatus = async (id: string) => {
    const blog = data.find((item) => item._id === id);
    if (!blog) return;

    const newStatus = blog.status === "Approved" ? "Pending" : "Approved";

    try {
      const res = await axios.patch(`/api/blogs/${id}`, { status: newStatus });
      const updatedBlog = res.data;
      setData((prev) =>
        prev.map((item) => (item._id === id ? updatedBlog : item))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const blog = data.find((item) => item._id === id);
    if (!blog) return;

    const newFeatured = !blog.featured;

    try {
      const res = await axios.patch(`/api/blogs/${id}`, {
        featured: newFeatured,
      });
      const updatedBlog = res.data;
      setData((prev) =>
        prev.map((item) => (item._id === id ? updatedBlog : item))
      );
    } catch (error) {
      console.error("Failed to update featured", error);
    }
  };

  const handleDelete = (id: string) => {
    // Add API to delete on backend before updating state
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
    // Add your edit logic here (e.g., open modal or navigate)
  };

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Blogs</h1>

      <AdminTable<Blog>
        data={data}
        basePath="blogs"
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
