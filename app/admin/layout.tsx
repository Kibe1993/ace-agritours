import AdminNavbar from "@/components/admin/Navbar/AdminNavbar";
import "./admin-global.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Ace-Agri-Tours",
  description: "Admin dashboard for managing blogs and farm visits.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
