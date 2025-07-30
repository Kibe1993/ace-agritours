"use client";

import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/public/ace.png";
import styles from "./AdminNavbar.module.css";

export default function AdminNavbar() {
  const links = [
    { href: "/", label: "Main Site" },
    { href: "/admin", label: "Home" },
    { href: "/admin/add-blog", label: "Add Blog" },
    { href: "/admin/add-farmvisit", label: "Add Farm Visit" },
    { href: "/", label: "Logout" },
  ];

  return (
    <section className={styles.section}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image src={LogoImg} alt="Site Logo" className={styles.logo} />
          </Link>
        </div>

        <ul className={styles.navLinks}>
          {links.map((link, index) => (
            <li key={index} className={styles.navItem}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
