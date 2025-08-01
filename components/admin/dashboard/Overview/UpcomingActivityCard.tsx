import { UpcomingVisit } from "@/app/assets/recentactivity/assets";
import styles from "./UpcomingActivityCard.module.css";

interface Props {
  activity: UpcomingVisit;
}

export default function UpcomingActivityCard({ activity }: Props) {
  const statusColorMap: Record<UpcomingVisit["status"], string> = {
    pending: "#f59e0b",
    confirmed: "#10b981",
  };

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <h4 className={styles.title}>{activity.title}</h4>
        <span
          className={styles.status}
          style={{ color: statusColorMap[activity.status] }}
        >
          {activity.status}
        </span>
      </div>
      <p className={styles.meta}>{activity.dateTime}</p>
      <p className={styles.meta}>{activity.participants} participants</p>
    </div>
  );
}
