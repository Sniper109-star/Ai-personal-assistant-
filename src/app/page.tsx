import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">Next.js Template</h1>
        <p className="mt-4 text-lg text-neutral-400">
          A minimal starter for AI-assisted development.
        </p>
        <Link
          href="/reply-helper"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
        >
          Try Reply Helper
        </Link>
      </div>
    </main>
  );
}
