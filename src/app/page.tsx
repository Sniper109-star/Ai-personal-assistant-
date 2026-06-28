import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Craft Perfect Replies <span className="text-neutral-500">with AI</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-400">
          ReplyAI uses a deep reasoning engine to understand emotion, intent, and
          context — giving you thoughtful, authentic suggestions for any conversation.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/reply-helper"
            className="w-full rounded-lg bg-white px-8 py-3 text-center font-semibold text-neutral-900 transition hover:bg-neutral-200 sm:w-auto"
          >
            Try Reply Assistant
          </Link>
          <Link
            href="/features"
            className="w-full rounded-lg border border-neutral-700 px-8 py-3 text-center font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900 sm:w-auto"
          >
            See Features
          </Link>
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">🧠</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Deep Reasoning</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Understands emotion, intent, topic, and tone for every message.
          </p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">💬</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Smart Suggestions</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Get 3 contextual reply options tailored to your conversation.
          </p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">⚡</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Instant Copy</h3>
          <p className="mt-2 text-sm text-neutral-400">
            One-click copy to clipboard. Paste and go.
          </p>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Ready to communicate better?
        </h2>
        <p className="mt-4 text-neutral-400">
          No sign-up required. Paste a message and get started in seconds.
        </p>
        <Link
          href="/reply-helper"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
