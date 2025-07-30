"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar-footer/Navbar/Navbar";
import Footer from "./navbar-footer/Footer/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
}
