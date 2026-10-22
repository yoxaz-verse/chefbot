import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const sora = localFont({
  src: "./fonts/Sora-Variable.ttf",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "The Chef Code — One Chef. Infinite Worlds.",
  description:
    "Meet Chef Bot, the curious robotic chef exploring infinite worlds to inspire the automated food and beverage creations of The Chef Code.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050608",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
