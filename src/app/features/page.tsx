export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        Features
      </h1>
      <p className="mt-4 text-lg text-neutral-400">
        Everything you need to craft better, more thoughtful replies.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">🧠</div>
          <h3 className="mt-4 text-lg font-semibold text-white">
            Deep Reasoning Engine
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            Analyzes emotion, intent, topic, difficulty level, and optimal tone
            for every message. Understanding goes beyond keywords to real context.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">😊</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Emotion Detection</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Recognizes surprise, confusion, gratitude, anxiety, excitement and more
            to provide emotionally intelligent reply options.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">🎯</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Intent Recognition</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Distinguishes questions, help requests, disagreements, gratitude,
            and statements to match the right communication style.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">📚</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Topic Awareness</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Covers tech, learning, math, science, business, health, relationships,
            and more with tailored advice for each domain.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">🎨</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Tone Matching</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Automatically selects between formal, casual, friendly, and
            empathetic tones based on the emotional context of the message.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">📋</div>
          <h3 className="mt-4 text-lg font-semibold text-white">One-Click Copy</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Copy any suggestion instantly to your clipboard and paste it
            directly into your conversation app.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">⚡</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Instant Results</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Get three contextual suggestions in milliseconds. No waiting,
            no sign-ups, no friction.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="text-2xl">🔒</div>
          <h3 className="mt-4 text-lg font-semibold text-white">Privacy First</h3>
          <p className="mt-2 text-sm text-neutral-400">
            Your messages are processed server-side and never stored.
            No tracking, no data collection, no accounts required.
          </p>
        </div>
      </div>
    </div>
  );
}
