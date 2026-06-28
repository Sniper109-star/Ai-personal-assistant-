import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          ReplyAI <span className="text-neutral-500">— Intelligence for Every Conversation</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg lg:text-xl">
          A personal assistant, research engine, and learning system in one platform. Craft better replies,
          organize your workflow, search the web, and make smarter decisions.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/reply-helper"
            className="w-full rounded-xl bg-white px-6 py-3.5 text-center text-base font-semibold text-neutral-900 transition hover:bg-neutral-200 active:scale-[0.98] sm:w-auto sm:px-8"
          >
            Try Reply Helper
          </Link>
          <Link
            href="/assistant"
            className="w-full rounded-xl border border-neutral-700 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900 active:scale-[0.98] sm:w-auto sm:px-8"
          >
            Personal Assistant
          </Link>
          <Link
            href="/research"
            className="w-full rounded-xl border border-neutral-700 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900 active:scale-[0.98] sm:w-auto sm:px-8"
          >
            Research
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        <Link href="/reply-helper" className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-700 active:scale-[0.99] sm:p-8">
          <div className="text-3xl sm:text-4xl">🧠</div>
          <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">Deep Reasoning</h3>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Understands emotion, intent, topic, and tone for every message.
          </p>
          <span className="mt-4 inline-block text-sm text-white underline">Try it →</span>
        </Link>

        <Link href="/assistant" className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-700 active:scale-[0.99] sm:p-8">
          <div className="text-3xl sm:text-4xl">✅</div>
          <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">Personal Assistant</h3>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Organize tasks, track priorities, and manage your workflow with live search.
          </p>
          <span className="mt-4 inline-block text-sm text-white underline">Open assistant →</span>
        </Link>

        <Link href="/research" className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-700 active:scale-[0.99] sm:p-8">
          <div className="text-3xl sm:text-4xl">🔬</div>
          <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">Research Autonomy</h3>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Live web search, compare, analyze, and synthesize information across sources.
          </p>
          <span className="mt-4 inline-block text-sm text-white underline">Start research →</span>
        </Link>

        <Link href="/learning" className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-700 active:scale-[0.99] sm:p-8">
          <div className="text-3xl sm:text-4xl">📈</div>
          <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">Continuous Learning</h3>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Improves through feedback, memory, and repeated use over time.
          </p>
          <span className="mt-4 inline-block text-sm text-white underline">View progress →</span>
        </Link>

        <Link href="/features" className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-700 active:scale-[0.99] sm:p-8">
          <div className="text-3xl sm:text-4xl">🔍</div>
          <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">Live Web Search</h3>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Powered by Playwright. Bypasses anti-scraping for real-time results.
          </p>
          <span className="mt-4 inline-block text-sm text-white underline">Search now →</span>
        </Link>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">
          <div className="text-3xl sm:text-4xl">🔓</div>
          <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">Uncensored Results</h3>
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Inspired by Google Unlocked. Scans and returns comprehensive search results.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center sm:mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Ready to get started?</h2>
        <p className="mx-auto mt-4 max-w-md text-neutral-400">
          No sign-up required. Start with any tool and explore the full platform.
        </p>
        <Link
          href="/reply-helper"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-neutral-900 transition hover:bg-neutral-200 active:scale-[0.98]"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
