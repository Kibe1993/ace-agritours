"use client";

import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/public/ace.png";
import styles from "./AdminNavbar.module.css";
import { SignOutButton } from "@clerk/nextjs";

export default function AdminNavbar() {
  return (
    <section className={styles.section}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image src={LogoImg} alt="Site Logo" className={styles.logo} />
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <SignOutButton redirectUrl="/">
              <button className={styles.navLink}>Logout</button>
            </SignOutButton>
          </li>
        </ul>
      </nav>
    </section>
  );
}
