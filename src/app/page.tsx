import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          ReplyAI <span className="text-neutral-500">— Intelligence for Every Conversation</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-400">
          A personal assistant, research engine, and learning system in one platform. Craft better replies,
          organize your workflow, search the web, and make smarter decisions.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/reply-helper"
            className="w-full rounded-lg bg-white px-8 py-3 text-center font-semibold text-neutral-900 transition hover:bg-neutral-200 sm:w-auto"
          >
            Try Reply Helper
          </Link>
          <Link
            href="/assistant"
            className="w-full rounded-lg border border-neutral-700 px-8 py-3 text-center font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900 sm:w-auto"
          >
            Personal Assistant
          </Link>
          <Link
            href="/research"
            className="w-full rounded-lg border border-neutral-700 px-8 py-3 text-center font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900 sm:w-auto"
          >
            Research
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
          <Link href="/reply-helper" className="mt-4 inline-block text-sm text-white underline">
            Try it →
          </Link>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">✅</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Personal Assistant</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Organize tasks, track priorities, search the web, and manage your workflow.
          </p>
          <Link href="/assistant" className="mt-4 inline-block text-sm text-white underline">
            Open assistant →
          </Link>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">🔬</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Research Autonomy</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Live web search, compare, analyze, and synthesize information across sources.
          </p>
          <Link href="/research" className="mt-4 inline-block text-sm text-white underline">
            Start research →
          </Link>
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">📈</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Continuous Learning</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Improves through feedback, memory, and repeated use over time.
          </p>
          <Link href="/learning" className="mt-4 inline-block text-sm text-white underline">
            View progress →
          </Link>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">🔍</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Live Web Search</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Powered by Playwright. Bypasses anti-scraping for real-time results.
          </p>
          <Link href="/research" className="mt-4 inline-block text-sm text-white underline">
            Search now →
          </Link>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <div className="text-3xl">🔓</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Uncensored Results</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Inspired by Google Unlocked. Scans and returns comprehensive search results.
          </p>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Ready to get started?
        </h2>
        <p className="mt-4 text-neutral-400">
          No sign-up required. Start with any tool and explore the full platform.
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
