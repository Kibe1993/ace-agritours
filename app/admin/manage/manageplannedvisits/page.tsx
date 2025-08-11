"use client";

import AdminTable from "@/components/admin/admintable/AdminTable";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import axios from "axios";
import { PlannedVisit } from "@/lib/TSInterfaces/typescriptinterface";
import { toast } from "react-toastify";

export default function ManagePlannedVisitsPage() {
  const [data, setData] = useState<PlannedVisit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlannedVisits = async () => {
      try {
        const res = await axios.get("/api/planned");
        const plannedVisits: PlannedVisit[] = res.data.plannedVisits;
        setData(plannedVisits);
      } catch (err) {
        console.error("Failed to fetch planned visits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlannedVisits();
  }, []);

  const handleStatusUpdate = async (id: string) => {
    try {
      const visit = data.find((v) => v._id === id);
      if (!visit) return;

      const newStatus = visit.status === "Planned" ? "Confirmed" : "Planned";

      const res = await axios.patch(`/api/planned/${id}`, {
        status: newStatus,
      });

      setData((prev) => prev.map((v) => (v._id === id ? res.data : v)));

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Planned Visits</h1>
      <AdminTable
        data={data}
        basePath="farmvisit"
        onToggleStatus={handleStatusUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
