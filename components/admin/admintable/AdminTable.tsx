"use client";

import Link from "next/link";
import styles from "./AdminTable.module.css";

interface BaseItem {
  _id: string;
  slug: string;
  title: string;
  status: string;
  featured: boolean;
}

type Props<T extends BaseItem> = {
  data: T[];
  basePath: string;
  onToggleStatus?: (id: string) => void;
  onToggleFeatured?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function AdminTable<T extends BaseItem>({
  data,
  basePath,
  onToggleStatus,
  onToggleFeatured,
  onEdit,
  onDelete,
}: Props<T>) {
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
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>
              <Link href={`/${basePath}/${item.slug}`} className={styles.link}>
                {item.title}
              </Link>
            </td>
            <td>
              <button
                className={styles.toggle}
                onClick={() => onToggleStatus?.(item._id)}
              >
                {item.status === "Approved"
                  ? "Approved ✅"
                  : item.status === "Completed"
                  ? "Completed ✅"
                  : item.status === "Confirmed"
                  ? "Confirmed"
                  : "Pending ⏳"}
              </button>
            </td>
            {onToggleFeatured && (
              <td>
                <button
                  className={styles.toggle}
                  onClick={() => onToggleFeatured(item._id)}
                >
                  {item.featured ? "Yes" : "No"}
                </button>
              </td>
            )}
            <td>
              <button
                onClick={() => onEdit?.(item._id)}
                className={styles.edit}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(item._id)}
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
