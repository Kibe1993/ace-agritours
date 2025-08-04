"use client";

import { farmVisits } from "@/app/assets/farmvisit/farmvisitassets";
import AdminTable from "@/components/admin/admintable/AdminTable";
import { useState } from "react";
import styles from "./page.module.css";

type VisitItem = {
  id: string;
  title: string;
  slug: string;
  status: "Completed" | "Pending";
  featured: boolean;
};

export default function ManagePastFarmVisitsPage() {
  const [data, setData] = useState<VisitItem[]>(
    farmVisits.map((visit) => ({
      id: visit.id,
      title: visit.title,
      slug: visit.slug,
      status: "Completed",
      featured: false,
    }))
  );

  const handleToggleStatus = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Completed" ? "Pending" : "Completed",
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

  const handleEdit = (id: string) => {
    console.log("Edit visit", id);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Past Farm Visits</h1>
      <AdminTable
        data={data}
        basePath="farmvisit"
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
