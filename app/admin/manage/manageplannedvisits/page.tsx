"use client";

import { upcomingVisits } from "@/app/assets/farmvisit/farmvisitassets";
import AdminTable from "@/components/admin/admintable/AdminTable";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FarmVisits } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

export default function ManagePlannedVisitsPage() {
  const [data, setData] = useState<FarmVisits[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmVisits = async () => {
      try {
        const res = await axios.get("/api/farmvisits");
        const visitsWithId = res.data.farmvisits.map((item: FarmVisits) => ({
          ...item,
          id: item._id,
        }));
        setData(visitsWithId);
      } catch (err) {
        console.error("Failed to fetch visits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmVisits();
  }, []);

  const handleToggleStatus = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              status: item.status === "Approved" ? "Pending" : "Approved",
            }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item._id !== id));
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
