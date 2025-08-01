import { recentActivities } from "@/app/assets/recentactivity/assets";
import RecentActivityCard from "./RecentActivityCard";
import styles from "./RecentActivitiesList.module.css";

export default function RecentActivityList() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Upcoming Activities</h3>
      <div className={styles.scrollableList}>
        {recentActivities.map((activity, idx) => (
          <RecentActivityCard key={idx} activity={activity} />
        ))}
      </div>
    </div>
  );
}
