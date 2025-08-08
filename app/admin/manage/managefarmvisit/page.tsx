"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminTable from "@/components/admin/admintable/AdminTable";
import styles from "./page.module.css";
import { FarmVisits } from "@/lib/TSInterfaces/typescriptinterface";

export default function ManagePastFarmVisitsPage() {
  const [data, setData] = useState<FarmVisits[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmVisits = async () => {
      try {
        const res = await axios.get("/api/farmvisits");
        const visitsWithId = res.data.farmvisits.map((item: any) => ({
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

  const handleToggleStatus = async (id: string) => {
    const current = data.find((v) => v.id === id);
    if (!current) return;

    const updatedStatus =
      current.status === "Completed" ? "Pending" : "Completed";

    try {
      await axios.patch(`/api/farmvisits/${id}`, { status: updatedStatus });
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: updatedStatus } : item
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const current = data.find((v) => v.id === id);
    if (!current) return;

    try {
      await axios.patch(`/api/farmvisits/${id}`, {
        featured: !current.featured,
      });
      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? ({ ...item, featured: !item.featured } as FarmVisits)
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update featured", err);
    }
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminTable
          data={data}
          basePath="farmvisit"
          onToggleStatus={handleToggleStatus}
          onToggleFeatured={handleToggleFeatured}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
