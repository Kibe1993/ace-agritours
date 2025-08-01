// components/admin/dashboard/AnalyticCard.tsx
"use client";

import styles from "./AnalyticCard.module.css";
import { CalendarCheck, FileText, MapPin, Star } from "lucide-react";

interface Props {
  title: string;
  value: number;
  subtitle: string;
  percentage: string;
  trend: "up" | "down";
  icon: "calendar" | "file" | "map" | "star";
}

const iconMap = {
  calendar: <CalendarCheck size={20} />,
  file: <FileText size={20} />,
  map: <MapPin size={20} />,
  star: <Star size={20} />,
};

export default function AnalyticCard({
  title,
  value,
  subtitle,
  percentage,
  trend,
  icon,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>{title}</h4>
        <div className={styles.icon}>{iconMap[icon]}</div>
      </div>
      <h2 className={styles.heading}>{value}</h2>
      <p className={styles.subtitle}>
        {subtitle}{" "}
        <span
          className={`${styles.percentage} ${
            trend === "up" ? styles.up : styles.down
          }`}
        >
          {percentage}
        </span>
      </p>
    </div>
  );
}
