import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InsforgeProvider } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
  openGraph: {
    title: "PaperScript - Scientific Publishing Platform",
    description: "AI-powered manuscript formatting, real-time collaboration, and multi-format publishing.",
    type: "website",
    url: "https://paperscript.wyze.pro",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <InsforgeProvider>{children}</InsforgeProvider>
      </body>
    </html>
  );
}
