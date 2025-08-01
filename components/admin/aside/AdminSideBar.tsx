"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./AdminSidebar.module.css";

const links = [
  { href: "/admin/addblog", label: "Add Blog" },
  { href: "/admin/add-farmvisit", label: "Add Farm Visit" },
];

const manage = [
  { href: "/admin/manage/blogs", label: "Manage Blogs" },
  { href: "/admin/manage/farmvisits", label: "Manage Farm Visits" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button className={styles.toggleOpen} onClick={() => setOpen(true)}>
        &raquo;
      </button>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Admin</h2>
        <Link href={"/admin"} className={styles.dashboardLink}>
          Dashboard
        </Link>
      </div>

      <div className={styles.section}>
        <h3>Add Content</h3>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${
              pathname === href ? styles.active : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.section}>
        <h3>Manage Content</h3>
        {manage.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${
              pathname === href ? styles.active : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
