import { upcomingVisits } from "@/app/assets/recentactivity/assets";

import styles from "./UpcomingActivitiesList.module.css";
import UpcomingActivityCard from "./UpcomingActivityCard";

export default function UpcomingActivityList() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Upcoming Activities</h3>
      <div className={styles.scrollableList}>
        {upcomingVisits.map((activity, idx) => (
          <UpcomingActivityCard key={idx} activity={activity} />
        ))}
      </div>
    </div>
  );
}
