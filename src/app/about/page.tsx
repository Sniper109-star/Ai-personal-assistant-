export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        About ReplyAI
      </h1>
      <p className="mt-3 text-sm text-neutral-400 sm:text-base lg:text-lg">
        Helping you communicate better with intelligent, context-aware reply suggestions.
      </p>

      <div className="mt-8 space-y-8 sm:mt-12 sm:space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Our Mission</h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed sm:text-base">
            We believe everyone deserves help crafting thoughtful, authentic responses.
            Whether you&apos;re navigating a difficult conversation, learning something new,
            or simply want to express yourself more clearly, ReplyAI is here to help.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">How It Works</h2>
          <div className="mt-4 grid gap-3 sm:gap-6">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl">🧠</div>
              <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Deep Reasoning</h3>
              <p className="mt-1.5 text-xs text-neutral-400 sm:text-sm">
                Our engine analyzes emotion, intent, topic, and tone to understand the full context of any message.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl">💡</div>
              <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Smart Suggestions</h3>
              <p className="mt-1.5 text-xs text-neutral-400 sm:text-sm">
                Get multiple reply options tailored to the conversation&apos;s emotional and practical needs.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl">🚀</div>
              <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Instant Results</h3>
              <p className="mt-1.5 text-xs text-neutral-400 sm:text-sm">
                Copy any suggestion with one click and go back to your conversation with confidence.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">What Makes Us Different</h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-300 sm:text-base">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-green-400">✓</span>
              <span><strong className="text-white">Emotion-aware</strong> — detects surprise, confusion, gratitude and more</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-green-400">✓</span>
              <span><strong className="text-white">Intent-focused</strong> — distinguishes questions from statements, help requests from casual chat</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-green-400">✓</span>
              <span><strong className="text-white">Topic-savvy</strong> — provides relevant guidance for tech, learning, science, and more</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-green-400">✓</span>
              <span><strong className="text-white">Tone-matched</strong> — adapts suggestions to be formal, casual, friendly, or empathetic</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Built with Modern Tech</h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed sm:text-base">
            ReplyAI is built on Next.js 16, React 19, and TypeScript. Our deep reason
            engine runs on the server for fast, responsive results without exposing any
            API logic to the client. Live search is powered by Playwright and Chromium.
          </p>
        </section>
      </div>
    </div>
  );
}
