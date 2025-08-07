"use client"
import styles from "./BlogSubscription.module.css";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function BlogSubscription() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res: AxiosResponse<{ message: string }> = await axios.post(
        "/api/newsletter",
        { email }
      );

      toast.success(res.data.message);
      setEmail("");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const msg =
        axiosError.response?.data?.error || "Failed to subscribe. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Subscribe to Our Newsletter</h2>
        <p className={styles.subtext}>
          Be the first to know when we publish new blog posts, tutorials, or
          farming guides.
        </p>
        <form className={styles.form} onSubmit={handleSubscribe}>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
