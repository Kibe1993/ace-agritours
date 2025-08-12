import styles from "./page.module.css";

import MyBookingsPage from "@/components/bookings/MyBookingPage";

export default function BookingPage() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <MyBookingsPage />
      </main>
    </div>
  );
}
