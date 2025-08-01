import { RecentActivity } from "@/app/assets/recentactivity/assets";
import styles from "./RecentActivityCard.module.css";

interface Props {
  activity: RecentActivity;
}

export default function RecentActivityCard({ activity }: Props) {
  const statusColorMap = {
    pending: "orange",
    approved: "green",
    featured: "blue",
    cancelled: "red",
  };

  return (
    <div className={styles.card}>
      <h4>{activity.title}</h4>
      <p className={styles.meta}>
        By <span className={styles.author}>{activity.author}</span> •{" "}
        {activity.time}
      </p>
      <span
        className={styles.status}
        style={{ color: statusColorMap[activity.status] }}
      >
        {activity.status}
      </span>
    </div>
  );
}
