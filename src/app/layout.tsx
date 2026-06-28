import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import MobileNav from "@/components/MobileNav";
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
  title: "ReplyAI - Intelligence for Every Conversation",
  description: "Personal assistant, research engine, and learning system powered by deep reasoning and live web search.",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/reply-helper", label: "Reply" },
  { href: "/assistant", label: "Tasks" },
  { href: "/research", label: "Research" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/learning", label: "Learning" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-neutral-950 text-white">
          <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-4">
                <Link href="/" className="text-xl font-bold tracking-tight">
                  ReplyAI
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <MobileNav />
              </div>
            </div>
          </header>
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <footer className="border-t border-neutral-800 py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-neutral-500">© {new Date().getFullYear()} ReplyAI</p>
                <nav className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500 md:gap-6">
                  <Link href="/about" className="transition hover:text-white">About</Link>
                  <Link href="/features" className="transition hover:text-white">Features</Link>
                  <Link href="/reply-helper" className="transition hover:text-white">Try It</Link>
                </nav>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
