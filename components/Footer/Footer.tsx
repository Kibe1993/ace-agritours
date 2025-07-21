import styles from "./Footer.module.css";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand & Description */}
        <div className={styles.column}>
          <div className={styles.logo}>
            <span className={styles.logoIcon} aria-label="Leaf emoji">
              🌿
            </span>
            <div>
              <h3 className={styles.brandTitle}>ACE-Agri-Tours</h3>
              <p className={styles.tagline}>Agricultural Empowerment</p>
            </div>
          </div>
          <p className={styles.description}>
            Transforming agriculture in Kenya through educational farm visits,
            community building, and sustainable farming practices.
          </p>
          <div className={styles.socials}>
            <Link href="#" aria-label="Facebook" className={styles.socialLink}>
              <Facebook />
            </Link>
            <Link href="#" aria-label="Twitter" className={styles.socialLink}>
              <Twitter />
            </Link>
            <Link href="#" aria-label="Instagram" className={styles.socialLink}>
              <Instagram />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <nav className={styles.column} aria-label="Quick Links">
          <h4>Quick Links</h4>
          <ul>
            {[
              "Home",
              "About Us",
              "Farm Visits",
              "Blog",
              "Testimonials",
              "Donate",
            ].map((text) => (
              <li key={text}>
                <Link href="#" className={styles.link}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav className={styles.column} aria-label="Our Services">
          <h4>Our Services</h4>
          <ul>
            {[
              "Guided Farm Tours",
              "Agricultural Training",
              "Community Workshops",
              "Farmer Networking",
              "Sustainability Consulting",
            ].map((text) => (
              <li key={text}>
                <Link href="#" className={styles.link}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className={styles.column}>
          <h4>Contact Us</h4>
          <ul className={styles.contact}>
            <li>
              <Mail />
              <a
                href="mailto:info@aceagritours.co.ke"
                className={styles.contactLink}
              >
                info@aceagritours.co.ke
              </a>
            </li>
            <li>
              <Phone />
              <a href="tel:+254700123456" className={styles.contactLink}>
                +254 700 123 456
              </a>
            </li>
            <li>
              <MapPin />
              <span>Nairobi, Kenya</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p>
          © 2025 ACEAgritours. All rights reserved. Empowering agriculture in
          Kenya.
        </p>
      </div>
    </footer>
  );
}
