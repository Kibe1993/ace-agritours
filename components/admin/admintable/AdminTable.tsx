"use client";

import Link from "next/link";
import styles from "./AdminTable.module.css";

type Item = {
  id: string;
  title: string;
  slug: string;
  status?: "Pending" | "Approved" | "Completed";
  featured?: boolean;
};

type Props = {
  data: Item[];
  basePath: string;
  onToggleStatus?: (id: string) => void;
  onToggleFeatured?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function AdminTable({
  data,
  basePath,
  onToggleStatus,
  onToggleFeatured,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          {onToggleFeatured && <th>Featured</th>}

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <Link href={`/${basePath}/${item.slug}`} className={styles.link}>
                {item.title}
              </Link>
            </td>
            <td>
              <button
                className={styles.toggle}
                onClick={() => onToggleStatus?.(item.id)}
              >
                {item.status === "Approved"
                  ? "Approved ✅"
                  : item.status === "Completed"
                  ? "Completed ✅"
                  : "Pending ⏳"}
              </button>
            </td>
            {onToggleFeatured && (
              <td>
                <button
                  className={styles.toggle}
                  onClick={() => onToggleFeatured(item.id)}
                >
                  {item.featured ? "Yes" : "No"}
                </button>
              </td>
            )}

            <td>
              <button onClick={() => onEdit?.(item.id)} className={styles.edit}>
                Edit
              </button>
              <button
                onClick={() => onDelete?.(item.id)}
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
