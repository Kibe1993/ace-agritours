"use client";

import styles from "./AnalyticGrid.module.css";
import AnalyticCard from "./AnalyticCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "@/lib/TSInterfaces/typescriptinterface";

function getBlogsThisMonth(blogs: Blog[]) {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  return blogs.filter((blog) => {
    const created = new Date(blog.createdAt);
    return created >= firstDay && created <= lastDay;
  });
}

export default function AnalyticGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsThisMonthCount, setBlogsThisMonthCount] = useState(0);
  const [approvedPercent, setApprovedPercent] = useState("0");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get("/api/blogs");
        const allBlogs: Blog[] = res.data.blogs;

        setBlogs(allBlogs);

        const filtered = getBlogsThisMonth(allBlogs);
        setBlogsThisMonthCount(filtered.length);

        const approvedCount = allBlogs.filter(
          (blog) => blog.status === "Approved"
        ).length;
        const totalCount = allBlogs.length;
        const approvedPercentage =
          totalCount > 0 ? (approvedCount / totalCount) * 100 : 0;

        setApprovedPercent(
          approvedPercentage == 100
            ? approvedPercentage.toFixed(0)
            : approvedPercentage.toFixed(2)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <section className={styles.dashboardGrid}>
      <AnalyticCard
        title="Total Bookings"
        value={20}
        subtitle="This month"
        percentage="+12.5%"
        trend="up"
        icon="calendar"
      />
      <AnalyticCard
        title="Total Blogs"
        value={blogsThisMonthCount}
        subtitle="Published"
        percentage={approvedPercent}
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
