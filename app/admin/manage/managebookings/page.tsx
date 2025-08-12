"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

import axios from "axios";
import { Booking } from "@/lib/TSInterfaces/typescriptinterface";
import { toast } from "react-toastify";
import AdminBookingsTable from "@/components/admin/admintable/AdminBookingTable";

export default function ManageBookings() {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/bookings");
        const bookings: Booking[] = res.data.bookings;
        setData(bookings);
      } catch (err) {
        console.error("Failed to fetch planned visits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: string) => {
    try {
      const visit = data.find((v) => v._id === id);
      if (!visit) return;

      const newStatus = visit.status === "Unpaid" ? "Paid" : "Unpaid";

      const res = await axios.patch(`/api/bookings/${id}`, {
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
      <AdminBookingsTable
        data={data}
        onToggleStatus={handleStatusUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
