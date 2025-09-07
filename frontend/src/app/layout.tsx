import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sign Classifier",
  description: "This project focuses on the classification of American Sign Language (ASL) hand gestures using machine learning models. The dataset consists of 9,680 grayscale images of hands, each sized at pixels. Each image represents a gesture corresponding to the digits 0-9 or the lowercase letters a-z, totaling 36 distinct classes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full relative">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <Navigation />
        {children}
        <Footer copyright="© 2025 | All rights reserved." bottomLinks={[]}/>
      </body>
    </html>
  );
}
