export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        Features
      </h1>
      <p className="mt-3 text-sm text-neutral-400 sm:text-base lg:text-lg">
        Everything you need to communicate better, organize your life, and learn continuously.
      </p>

      <div className="mt-6 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">🧠</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Deep Reasoning Engine</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Analyzes emotion, intent, topic, difficulty level, and optimal tone for every message.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">😊</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Emotion Detection</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Recognizes surprise, confusion, gratitude, anxiety, excitement and more.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">🎯</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Intent Recognition</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Distinguishes questions, help requests, disagreements, gratitude, and statements.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">📚</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Topic Awareness</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Covers tech, learning, math, science, business, health, relationships, and more.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">🎨</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Tone Matching</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Automatically selects formal, casual, friendly, and empathetic tones.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">📋</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">One-Click Copy</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Copy any suggestion instantly to your clipboard and paste it directly.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">✅</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Personal Assistant</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Organizes tasks, tracks priorities, and supports everyday workflow.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">🔬</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Research Autonomy</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Gathers, compares, analyzes, and synthesizes information across sources.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">📈</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Continuous Learning</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Improves reasoning, accuracy, and response quality through feedback.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">⚡</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Instant Results</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Get contextual suggestions in milliseconds. No waiting, no sign-ups.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">🔒</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Privacy First</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Your messages are processed server-side and never stored.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
          <div className="text-xl sm:text-2xl">🔍</div>
          <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">Live Web Search</h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Powered by Playwright. Bypasses anti-scraping for real-time results.
          </p>
        </div>
      </div>
    </div>
  );
}
