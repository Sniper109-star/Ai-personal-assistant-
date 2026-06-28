export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        About ReplyAI
      </h1>
      <p className="mt-4 text-lg text-neutral-400">
        Helping you communicate better with intelligent, context-aware reply suggestions.
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            We believe everyone deserves help crafting thoughtful, authentic responses.
            Whether you&apos;re navigating a difficult conversation, learning something new,
            or simply want to express yourself more clearly, ReplyAI is here to help.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">How It Works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="text-3xl">🧠</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Deep Reasoning</h3>
              <p className="mt-2 text-sm text-neutral-400">
                Our engine analyzes emotion, intent, topic, and tone to understand the full context of any message.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="text-3xl">💡</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Smart Suggestions</h3>
              <p className="mt-2 text-sm text-neutral-400">
                Get multiple reply options tailored to the conversation&apos;s emotional and practical needs.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="text-3xl">🚀</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Instant Results</h3>
              <p className="mt-2 text-sm text-neutral-400">
                Copy any suggestion with one click and go back to your conversation with confidence.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">What Makes Us Different</h2>
          <ul className="mt-6 space-y-4 text-neutral-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-green-400">✓</span>
              <span>
                <strong className="text-white">Emotion-aware</strong> — detects surprise, confusion, gratitude and more
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-green-400">✓</span>
              <span>
                <strong className="text-white">Intent-focused</strong> — distinguishes questions from statements, help requests from casual chat
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-green-400">✓</span>
              <span>
                <strong className="text-white">Topic-savvy</strong> — provides relevant guidance for tech, learning, science, and more
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-green-400">✓</span>
              <span>
                <strong className="text-white">Tone-matched</strong> — adapts suggestions to be formal, casual, friendly, or empathetic
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">Built with Modern Tech</h2>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            ReplyAI is built on Next.js 16, React 19, and TypeScript. Our deep reason
            engine runs on the server for fast, responsive results without exposing any
            API logic to the client.
          </p>
        </section>
      </div>
    </div>
  );
}
