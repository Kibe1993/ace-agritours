import styles from "./contact.module.css";
import contactLogo from "../../public/services-hero.jpg";
import Link from "next/link";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Send,
  CalendarCheck,
} from "lucide-react";
import BlogSubscription from "@/components/blog-section/subscribe/BlogSubscription";

export default function ContactPage() {
  return (
    <section className={styles.page}>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${contactLogo.src})` }}
      >
        <div className={styles.heroContainer}>
          <h1>Reach Out and Plan Your Next Visit</h1>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
         <BlogSubscription/>
      </section>

      {/* Contact Section */}
      <section className={styles.contact}>
        <div className={styles.contactContainer}>
          {/* Left: Contact Info */}
          <div className={styles.contactInfo}>
            <h3>Contact Us</h3>

            {/* Info Row */}
            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <Phone className={styles.icon} />
                <a href="tel:+254712345678">+254 712 345 678</a>
              </div>

              <div className={styles.infoItem}>
                <Mail className={styles.icon} />
                <a href="mailto:info@aceagritours.com">info@aceagritours.com</a>
              </div>

              <div className={styles.infoItem}>
                <Facebook className={styles.icon} />
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className={styles.socialLink}
                >
                  AffluentFarmers
                </Link>
              </div>

              <div className={styles.infoItem}>
                <Instagram className={styles.icon} />
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className={styles.socialLink}
                >
                  AceAgritours
                </Link>
              </div>

              <div className={styles.infoItem}>
                <Twitter className={styles.icon} />
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className={styles.socialLink}
                >
                  AceAgritours
                </Link>
              </div>
            </div>

            {/* Map Below */}
            <div className={styles.mapContainer}>
              <h4>Find Us in Saika, Nairobi</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.049317217798!2d36.943421034922515!3d-1.2484166183910962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11e0ef7ea7cf%3A0x85c7ad6db23dce30!2sSaika%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1692451093539!5m2!1sen!2ske"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className={styles.contactForm}>
            <h3>Send Us a Message</h3>
            <form
  action="https://formspree.io/f/xgvzpoqo"
  method="POST"
>
  <div className={styles.formGroup}>
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      required
    />
  </div>
  <div className={styles.formGroup}>
    <input
      type="email"
      name="email"
      placeholder="Your Email"
      required
    />
  </div>
  <div className={styles.formGroup}>
    <input
      type="text"
      name="contact"
      placeholder="Phone or WhatsApp"
      required
    />
  </div>
  <div className={styles.formGroup}>
    <textarea
      name="message"
      rows={5}
      placeholder="Your Message"
      required
    />
  </div>


  <input type="text" name="_gotcha" style={{ display: "none" }} />


  <input type="hidden" name="_next" value="/thank-you" />

  <button className={styles.button} type="submit">
    <Send className={styles.icon} /> Send Message
  </button>
</form>

          </div>
        </div>
      </section>
    </section>
  );
}
