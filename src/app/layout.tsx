import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReplyAI - Smart Conversation Assistant",
  description: "Get intelligent, context-aware reply suggestions powered by deep reasoning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-neutral-950 text-white">
          <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-4">
                <Link href="/" className="text-xl font-bold tracking-tight">
                  ReplyAI
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium text-neutral-400">
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                  <Link href="/reply-helper" className="transition hover:text-white">
                    Assistant
                  </Link>
                  <Link href="/features" className="transition hover:text-white">
                    Features
                  </Link>
                  <Link href="/about" className="transition hover:text-white">
                    About
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <footer className="border-t border-neutral-800 py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-neutral-500">
                  © {new Date().getFullYear()} ReplyAI. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-neutral-500">
                  <Link href="/about" className="transition hover:text-white">
                    About
                  </Link>
                  <Link href="/features" className="transition hover:text-white">
                    Features
                  </Link>
                  <Link href="/reply-helper" className="transition hover:text-white">
                    Try It
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
