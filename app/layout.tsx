import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Ace-Agri-Tours",
  description: "Watch and Learn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ToastContainer position="top-right" theme="dark" />
          <LayoutWrapper>{children}</LayoutWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
