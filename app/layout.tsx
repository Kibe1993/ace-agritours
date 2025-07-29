import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar-footer/Navbar/Navbar";
import Footer from "@/components/navbar-footer/Footer/Footer";

export const metadata: Metadata = {
  title: "Ace-Agri-Tours",
  description: "Watch and Learn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
