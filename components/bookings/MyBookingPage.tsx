"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/nextjs";
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

  const handlePayNow = async (bookingId: string) => {
    try {
      const res = await axios.post("/api/payments/mpesa", {
        bookingId,
      });
      alert(
        "Payment prompt sent to your phone. Please complete the transaction."
      );
    } catch (error) {
      console.error("Failed to initiate payment", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Bookings</h1>

      {/* Current Bookings */}
      <section>
        <h2 className={styles.sectionTitle}>Current Bookings</h2>
        {bookings.length > 0 ? (
          <div className={styles.cardGrid}>
            {bookings.map((b) => (
              <div key={b._id} className={styles.bookingCard}>
                <div className={styles.cardContent}>
                  <img
                    src={b.plannedVisitId.image.url}
                    alt={b.plannedVisitId.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardInfo}>
                    <h3>{b.plannedVisitId.title}</h3>
                    <p>{b.plannedVisitId.location}</p>
                    <p>
                      Date:{" "}
                      {new Date(b.plannedVisitId.date).toLocaleDateString()}
                    </p>
                    <p>Time: {b.plannedVisitId.time}</p>
                    <p>Guests: {b.guests || "N/A"}</p>
                    <span
                      className={`${styles.status} ${
                        styles[b.status.toLowerCase()]
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
                {b.status === "Unpaid" ? (
                  <button
                    className={styles.payButton}
                    onClick={() => handlePayNow(b._id)}
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    className={styles.payButton}
                    onClick={() => handlePayNow(b._id)}
                  >
                    Try Again
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>You have no current bookings.</p>
        )}
      </section>

      {/* Upcoming Bookings Placeholder */}
      <section>
        <h2 className={styles.sectionTitle}>Upcoming Bookings</h2>
        <p className={styles.emptyText}>No upcoming bookings yet.</p>
      </section>

      {/* Past Bookings Placeholder */}
      <section>
        <h2 className={styles.sectionTitle}>Past Bookings</h2>
        <p className={styles.emptyText}>No past bookings yet.</p>
      </section>
    </div>
  );
}
