"use client";

import { upcomingVisits } from "@/app/assets/farmvisit/farmvisitassets";
import AdminTable from "@/components/admin/admintable/AdminTable";
import { useState } from "react";
import styles from "./page.module.css";

type VisitItem = {
  id: string;
  title: string;
  slug: string;
  status: "Pending" | "Approved";
};

export default function ManagePlannedVisitsPage() {
  const [data, setData] = useState<VisitItem[]>(
    upcomingVisits.map((visit) => ({
      id: visit.id,
      title: visit.title,
      slug: visit.slug,
      status: "Pending",
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

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("Edit visit", id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Planned Visits</h1>
      <AdminTable
        data={data}
        basePath="farmvisit"
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
