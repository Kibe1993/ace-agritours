"use client";

import { useState } from "react";
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

import logo from "../../public/ace.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", Icon: Home },
    { name: "About", href: "/about", Icon: Info },
    { name: "Farm Visits", href: "/farmvisit", Icon: TreeDeciduous },
    { name: "Blogs", href: "/blog", Icon: FileText },

    { name: "Contact", href: "/contact", Icon: MessageCircle },
  ];

  const callToAction = [
    { name: "Donate", href: "/donate", Icon: DollarSign, variant: "solid" },
    { name: "Admin", href: "/admin", Icon: Shield, variant: "outline" },
  ];

  return (
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

        <div className={`${styles.navMenu} ${isOpen ? styles.open : ""}`}>
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
                >
                  <Icon size={18} />
                  {name}
                </Link>
              );
            })}
          </div>

          <div className={styles.callToActions}>
            {callToAction.map(({ name, href, Icon, variant }) => (
              <Link
                key={name}
                href={href}
                className={`${
                  variant === "outline"
                    ? styles.outlineButton
                    : styles.buttonLink
                } ${name === "Admin" ? styles.adminButton : ""}`}
              >
                {name === "Donate" && (
                  <>
                    <Icon size={16} className={styles.icon} />
                    <span>{name}</span>
                  </>
                )}
                {name === "Admin" && (
                  <>
                    <span>{name}</span>
                    <Icon size={18} className={styles.icon} />
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </section>
  );
}
