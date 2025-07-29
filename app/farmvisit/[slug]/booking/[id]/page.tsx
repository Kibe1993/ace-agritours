"use client";

import { useParams } from "next/navigation";
import { upcomingVisits } from "@/app/assets/farmvisit/farmvisitassets";
import styles from "./page.module.css";

export default function BookingPage() {
  const { id } = useParams();
  const visit = upcomingVisits.find((v) => v.id === id);

  if (!visit) {
    return <div>Visit not found.</div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Book Your Visit to {visit.title}</h1>

        <div className={styles.meta}>
          <div className={styles.detail}>
            <span className={styles.label}>Date</span>
            {visit.date}
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Time</span>
            {visit.time}
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Location</span>
            {visit.location}
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Category</span>
            {visit.category}
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Guests</span>
            {visit.guests}
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Status</span>
            {visit.status}
          </div>
        </div>

        <form className={styles.form}>
          <input type="hidden" name="visitId" value={visit.id} />

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. +254712345678"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="guests">
              Number of Guests
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              className={styles.input}
              defaultValue={visit.guests}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}
