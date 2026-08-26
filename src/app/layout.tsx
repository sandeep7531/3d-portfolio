import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sandeeprai.dev"),
  title: "Sandeep Rai — Senior Frontend & AI App Engineer",
  description:
    "Senior Frontend & AI-Driven App Engineer with 6.5+ years building production-grade React.js and Next.js applications, micro-frontends, design systems, and AI-driven workflows.",
  openGraph: {
    title: "Sandeep Rai — Senior Frontend & AI App Engineer",
    description:
      "React.js · Next.js · TypeScript · AI Workflows. 6.5+ years shipping measurable frontend systems.",
    url: "https://sandeeprai.dev",
    siteName: "Sandeep Rai",
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
      <body
        className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-neutral-950 text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
