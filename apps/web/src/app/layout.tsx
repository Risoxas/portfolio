import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "David Alvarez Gasca | Senior Full-Stack & Cloud Engineer",
  description:
    "Full-Stack Developer with 6+ years of experience building scalable, cloud-native apps with Python (FastAPI), React/Next.js (TypeScript), and serverless AWS & GCP architectures.",
  keywords: [
    "David Alvarez Gasca",
    "Risoxas",
    "Full-Stack Developer",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "AWS Lambda",
    "GCP Cloud Run",
    "BigQuery",
    "PostgreSQL",
  ],
  openGraph: {
    title: "David Alvarez Gasca | Senior Full-Stack & Cloud Engineer",
    description:
      "Multi-cloud portfolio running on Vercel, GCP Cloud Run, and AWS Lambda free tiers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-sky-500/20">
        {children}
      </body>
    </html>
  );
}
