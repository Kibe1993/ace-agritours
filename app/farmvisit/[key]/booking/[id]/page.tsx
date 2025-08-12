"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import { PlannedVisit } from "@/lib/TSInterfaces/typescriptinterface";

export default function BookingPage() {
  const { isLoaded: clerkLoaded, isSignedIn, user } = useUser();
  const { redirectToSignIn } = useClerk();
  const pathname = usePathname();
  const { id } = useParams();
  const [visit, setVisit] = useState<PlannedVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 1,
  });

  useEffect(() => {
    if (!clerkLoaded) return;

    const loadData = async () => {
      if (!isSignedIn) {
        redirectToSignIn({
          redirectUrl: pathname,
        });
        return;
      }

      try {
        const res = await axios.get(`/api/planned/${id}`);
        setVisit(res.data);
        setFormValues((prev) => ({
          ...prev,
          email: user?.primaryEmailAddress?.emailAddress || "",
          guests: res.data.guests || 1,
        }));
      } catch (error) {
        toast.error("Failed to load visit details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [clerkLoaded, isSignedIn, id, user, redirectToSignIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !user || !visit) return;

    setSubmitting(true);
    try {
      await axios.post("/api/bookings", {
        ...formValues,
        plannedVisitId: visit._id,
        clerkId: user.id,
        status: "Unpaid",
      });
      toast.success("Booking confirmed!");
      setFormValues({
        name: "",
        phone: "",
        email: user.primaryEmailAddress?.emailAddress || "",
        guests: visit.guests || 1,
      });
    } catch (error) {
      toast.error("Failed to submit booking");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!clerkLoaded || loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.authMessage}>Redirecting to login...</div>
      </div>
    );
  }

  if (!visit) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Visit not found</div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Book Your Visit to {visit.title}</h1>

        {isSignedIn && (
          <p className={styles.userEmail}>
            Booking as:{" "}
            <strong>{user.primaryEmailAddress?.emailAddress}</strong>
          </p>
        )}

        <div className={styles.meta}>
          <div className={styles.detail}>
            <span>Date:</span> {visit.date}
          </div>
          <div className={styles.detail}>
            <span>Time:</span> {visit.time}
          </div>
          <div className={styles.detail}>
            <span>Location:</span> {visit.location}
          </div>
          <div className={styles.detail}>
            <span>Max Guests:</span> {visit.guests}
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              disabled={!!user?.primaryEmailAddress}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="guests">Number of Guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={visit.guests}
              value={formValues.guests}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting || !isSignedIn}
          >
            {submitting ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}
