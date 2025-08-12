"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

import {
  Home,
  Info,
  TreeDeciduous,
  FileText,
  MessageCircle,
  DollarSign,
  Shield,
  Menu,
  X,
} from "lucide-react";

import logo from "../../../public/ace.png";

import { useUser, SignOutButton, SignIn } from "@clerk/nextjs";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close nav menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/", Icon: Home },
    { name: "About", href: "/about", Icon: Info },
    { name: "Farm Visits", href: "/farmvisit", Icon: TreeDeciduous },
    { name: "Blogs", href: "/blog", Icon: FileText },
    { name: "Contact", href: "/contact", Icon: MessageCircle },
  ];

  // Default role is 'user' if none set
  const role = user?.publicMetadata?.role || "user";

  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoLink} aria-label="Home">
            <Image src={logo} alt="Logo Image" width={100} />
          </Link>

          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            ref={menuRef}
            className={`${styles.navMenu} ${isOpen ? styles.open : ""}`}
          >
            <div className={styles.navLinks}>
              {navLinks.map(({ name, href, Icon }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={name}
                    href={href}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    {name}
                  </Link>
                );
              })}
            </div>

            <div className={styles.callToActions}>
              <Link
                href="/donate"
                className={styles.buttonLink}
                onClick={() => setIsOpen(false)}
              >
                <DollarSign size={16} className={styles.icon} />
                <span>Donate</span>
              </Link>

              {!isSignedIn && (
                <button
                  className={styles.buttonLink}
                  onClick={() => setIsSignInModalOpen(true)}
                >
                  Sign In
                </button>
              )}

              {isSignedIn && role === "admin" && (
                <Link
                  href="/admin"
                  className={`${styles.outlineButton} ${styles.adminButton}`}
                  onClick={() => setIsOpen(false)}
                >
                  Admin <Shield size={18} className={styles.icon} />
                </Link>
              )}

              {isSignedIn && role === "user" && (
                <>
                  <Link
                    href="/bookings"
                    className={styles.buttonLink}
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </section>

      {isSignInModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setIsSignInModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SignIn
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  rootBox: {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
