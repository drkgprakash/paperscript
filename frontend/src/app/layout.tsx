import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaperScript - Scientific Publishing Platform",
  description:
    "Enterprise SaaS platform for scientific journal publishing. AI-powered manuscript formatting, real-time collaboration, and multi-format publishing.",
  keywords: [
    "LaTeX",
    "scientific publishing",
    "manuscript",
    "journal",
    "collaboration",
    "DOCX to LaTeX",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
