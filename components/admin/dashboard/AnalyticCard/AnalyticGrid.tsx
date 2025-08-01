import styles from "./AnalyticGrid.module.css";
import AnalyticCard from "./AnalyticCard";

export default function AnalyticGrid() {
  return (
    <section className={styles.dashboardGrid}>
      <AnalyticCard
        title="Total Bookings"
        value={284}
        subtitle="This month"
        percentage="+12.5%"
        trend="up"
        icon="calendar"
      />
      <AnalyticCard
        title="Total Blogs"
        value={43}
        subtitle="Published"
        percentage="-5.1%"
        trend="down"
        icon="file"
      />
      <AnalyticCard
        title="Planned Visits"
        value={20}
        subtitle="Upcoming"
        percentage="+3.7%"
        trend="up"
        icon="map"
      />
      <AnalyticCard
        title="Testimonials"
        value={18}
        subtitle="Received"
        percentage="+7.9%"
        trend="up"
        icon="star"
      />
    </section>
  );
}
