import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartHealth-AI",
  description: "Healthcare Platform",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
