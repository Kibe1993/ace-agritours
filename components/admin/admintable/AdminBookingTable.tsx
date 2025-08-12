"use client";

import { Booking } from "@/lib/TSInterfaces/typescriptinterface";
import styles from "./AdminBookingTable.module.css";

import Link from "next/link";

type Props = {
  data: Booking[];
  onToggleStatus?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function AdminBookingsTable({
  data,
  onToggleStatus,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Planned Visit</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={String(item._id)}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>
              {typeof item.plannedVisitId === "object" &&
              "_id" in item.plannedVisitId ? (
                <Link href={`/farmvisit#plannedvisits`} className={styles.link}>
                  {item.plannedVisitId.title ?? "View Visit"}
                </Link>
              ) : (
                String(item.plannedVisitId)
              )}
            </td>
            <td>
              <button
                className={styles.toggle}
                onClick={() => onToggleStatus?.(String(item._id))}
              >
                {item.status === "Paid" ? "Paid ✅" : "Unpaid ⏳"}
              </button>
            </td>
            <td>
              <button
                onClick={() => onEdit?.(String(item._id))}
                className={styles.edit}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(String(item._id))}
                className={styles.delete}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
