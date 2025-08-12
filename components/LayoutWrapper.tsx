"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar-footer/Navbar/Navbar";
import Footer from "./navbar-footer/Footer/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  const isAdminPage = ["/admin", "/bookings"].some((path) =>
    pathname.toLowerCase().startsWith(path)
  );

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
}
