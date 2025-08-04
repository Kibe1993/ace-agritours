"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./AdminSidebar.module.css";

const links = [
  { href: "/admin/addblog", label: "Add Blog" },
  { href: "/admin/addfarmvisit", label: "Add Farm Visit" },
  { href: "/admin/addplannedvisit", label: "Add Planned Visit" },
];

const manage = [
  { href: "/admin/manage/manageblog", label: " Blogs" },
  { href: "/admin/manage/managefarmvisit", label: " Farm Visits" },
  { href: "/admin/manage/manageplannedvisits", label: " Planned Visits" },
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
