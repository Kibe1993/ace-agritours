"use client";

import AdminSidebar from "@/components/admin/aside/AdminSideBar";
import { useState } from "react";
import "../../../app/admin/admin-global.css";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {!collapsed && <AdminSidebar />}
      </aside>

      {/* Toggle Button — floats on the left */}
      <button
        className={`toggle-btn ${collapsed ? "collapsed-btn" : ""}`}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "»" : "«"}
      </button>

      {/* Main Content */}
      <main className={`admin-main ${collapsed ? "expanded" : ""}`}>
        {children}
      </main>
    </div>
  );
}
