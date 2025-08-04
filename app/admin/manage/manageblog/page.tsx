"use client";

import { Blog, blogData } from "@/app/assets/farmvisit/BlogAssets";
import AdminTable from "@/components/admin/admintable/AdminTable";
import styles from "./page.module.css";

import { useState } from "react";
type BlogWithFlags = Blog & {
  status: "Pending" | "Approved";
  featured: boolean;
};

export default function ManageBlogsPage() {
  const [data, setData] = useState<BlogWithFlags[]>(
    blogData.map((b) => ({
      ...b,
      status: "Pending",
      featured: false,
    }))
  );

  const handleToggleStatus = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Approved" ? "Pending" : "Approved",
            }
          : item
      )
    );
  };

  const handleToggleFeatured = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Blogs</h1>
      <AdminTable
        data={data}
        basePath="blog"
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
