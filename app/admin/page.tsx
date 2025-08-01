import styles from "./page.module.css";
import AdminSidebar from "@/components/admin/aside/AdminSideBar";
import AnalyticGrid from "@/components/admin/dashboard/AnalyticCard/AnalyticGrid";
import DashboardHeader from "@/components/admin/dashboard/Header/DashboardHeader";
import RecentActivityList from "@/components/admin/dashboard/Overview/RecentActivityList";
import UpcomingActivityList from "@/components/admin/dashboard/Overview/UpcomingActivityList";

export default function AdminPage() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <DashboardHeader />
        <AnalyticGrid />
        <section className={styles.activities}>
          <RecentActivityList />
          <UpcomingActivityList />
        </section>
      </main>
    </div>
  );
}
