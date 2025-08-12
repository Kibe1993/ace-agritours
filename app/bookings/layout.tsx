// app/admin/layout.tsx
import AdminShell from "@/components/admin/aside/Adminshell";
import AdminNavbar from "@/components/admin/Navbar/AdminNavbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Ace-Agri-Tours",
  description: "Admin dashboard for managing blogs and farm visits.",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminNavbar />
        {children}
      </body>
    </html>
  );
}
