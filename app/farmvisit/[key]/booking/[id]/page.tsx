"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import styles from "./page.module.css";
import { PlannedVisit } from "@/lib/TSInterfaces/typescriptinterface";
import { toast } from "react-toastify";

export default function BookingPage() {
  const { id } = useParams();
  const [visit, setVisit] = useState<PlannedVisit | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 1,
  });

  useEffect(() => {
    if (!id) return;
    const fetchVisit = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/planned/${id}`);
        setVisit(res.data);
        setFormValues((vals) => ({
          ...vals,
          guests: res.data.guests || 1,
        }));
      } catch (error) {
        console.error("Failed to fetch visit", error);
        setVisit(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVisit();
  }, [id]);

  if (loading) return <p>Loading visit details...</p>;
  if (!visit) return <p>Visit not found.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((vals) => ({
      ...vals,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingLoading(true);

    const data = {
      ...formValues,
      visitId: visit._id,
    };

    try {
      const res = await axios.post("/api/bookings", data);
      toast.success("Booking Successful");

      setFormValues({
        name: "",
        phone: "",
        email: "",
        guests: 1,
      });
    } catch (error: unknown) {
      const err = error as AxiosError;
      toast.error("Booking Failed");
    } finally {
      setBookingLoading(false);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="visitId" value={visit._id} />

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
              value={formValues.name}
              onChange={handleChange}
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
              value={formValues.phone}
              onChange={handleChange}
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
              value={formValues.email}
              onChange={handleChange}
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
              required
              min={1}
              value={formValues.guests}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={bookingLoading}
          >
            {bookingLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}
