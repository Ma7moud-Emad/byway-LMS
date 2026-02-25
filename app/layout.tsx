import "./globals.css";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Byway LMS | Online Courses in Programming, IT, Business & More",
    template: "%s | Byway LMS",
  },

  description:
    "Byway LMS is an online learning platform offering courses in Programming, IT & Software, Languages, Art & Design, and Business. Learn new skills, track your progress, and grow your career online.",

  keywords: [
    "online courses",
    "e-learning platform",
    "programming courses",
    "IT and software courses",
    "language learning online",
    "business courses online",
    "art and design courses",
    "learning management system",
    "Byway LMS",
  ],

  authors: [{ name: "Byway LMS" }],
  creator: "Byway LMS",

  metadataBase: new URL("https://byway-lms.vercel.app"),

  icons: {
    icon: "/app/favicon.ico",
    shortcut: "/app/favicon.ico",
    apple: "/app/og-image.webp",
  },

  openGraph: {
    title: "Byway LMS | Learn Skills Online",
    description:
      "Explore online courses across Programming, IT, Languages, Art & Design, and Business on Byway LMS.",
    url: "https://byway-lms.vercel.app",
    siteName: "Byway LMS",
    type: "website",
    images: [
      {
        url: "/app/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Byway LMS Online Learning Platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
