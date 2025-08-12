"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Booking } from "@/lib/TSInterfaces/typescriptinterface";

import styles from "./MyBookingPage.module.css";

export default function MyBookingsPage() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/bookings/${user.id}`);
        setBookings(res.data.bookings);
      } catch (error) {
        console.error("Failed to fetch user bookings", error);
      } finally {
        setLoading(false);
      }
    };

    console.log(bookings);

    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>Please sign in to see your bookings.</p>
        <SignInButton />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>No bookings found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Bookings</h1>
      <ul className={styles.bookingList}>
        {bookings.map((b) => (
          <li key={b._id} className={styles.bookingItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={b.plannedVisitId.image.url}
                alt={b.plannedVisitId.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div>
                <h3>{b.plannedVisitId.title}</h3>
                <p>{b.plannedVisitId.location}</p>
                <p>{new Date(b.plannedVisitId.date).toLocaleDateString()}</p>
                <p>Guests: {b.plannedVisitId.guests}</p>
                <p>Time: {b.plannedVisitId.time}</p>
              </div>
            </div>
            <span className={styles.bookingStatus}>{b.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
