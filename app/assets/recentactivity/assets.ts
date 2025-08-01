export interface RecentActivity {
  title: string;
  author: string;
  time: string;
  status: "pending" | "approved" | "featured" | "cancelled";
}

export interface UpcomingVisit {
  title: string;
  dateTime: string;
  participants: number;
  status: "confirmed" | "pending";
}

export const upcomingVisits: UpcomingVisit[] = [
  {
    title: "Organic Harvest Experience",
    dateTime: "Tomorrow, 9:00 AM",
    participants: 12,
    status: "confirmed",
  },
  {
    title: "Cheese Making Workshop",
    dateTime: "Aug 2, 2:00 PM",
    participants: 8,
    status: "pending",
  },
  {
    title: "Farm-to-Table Dinner",
    dateTime: "Aug 5, 6:00 PM",
    participants: 24,
    status: "confirmed",
  },
];
export const recentActivities: RecentActivity[] = [
  {
    title: "New booking for Organic Farm Tour",
    author: "Sarah Johnson",
    time: "2 hours ago",
    status: "pending",
  },
  {
    title: "Blog post approved: Sustainable Farming",
    author: "Farm Admin",
    time: "4 hours ago",
    status: "approved",
  },
  {
    title: "Farm visit marked as featured",
    author: "Admin",
    time: "6 hours ago",
    status: "featured",
  },
  {
    title: "Booking cancelled: Weekend Retreat",
    author: "Mike Chen",
    time: "1 day ago",
    status: "cancelled",
  },
];
