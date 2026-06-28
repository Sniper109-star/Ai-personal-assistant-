"use client";

import { useEffect, useState } from "react";

type Source = {
  id: string;
  title: string;
  content: string;
};

type ResearchResult = {
  topic: string;
  summary: string;
  insights: string[];
  comparison: string[];
  conclusion: string;
  sources: { title: string; link: string }[];
};

export default function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceContent, setSourceContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function addSource() {
    if (!sourceTitle.trim() || !sourceContent.trim()) return;
    setSources([
      ...sources,
      {
        id: `${Date.now()}`,
        title: sourceTitle.trim(),
        content: sourceContent.trim(),
      },
    ]);
    setSourceTitle("");
    setSourceContent("");
  }

  function removeSource(id: string) {
    setSources(sources.filter((s) => s.id !== id));
  }

  async function runResearch(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, sources }),
      });

      if (!res.ok) {
        throw new Error("Failed to analyze");
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">Research Autonomy</h1>
      <p className="mt-2 text-neutral-400">
        Gather, compare, analyze, and synthesize information across sources to produce structured, decision-ready insight.
      </p>

      <form onSubmit={runResearch} className="mt-8 space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-neutral-300">
            Research topic or question
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Should I use React or Vue for my next project?"
            className="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            required
          />
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <h3 className="text-sm font-semibold text-white">Add sources ({sources.length})</h3>
          <p className="mt-1 text-xs text-neutral-500">Paste article text, notes, or snippets to compare.</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-neutral-400">Source title</label>
              <input
                type="text"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                placeholder="Source name"
                className="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400">Content</label>
              <textarea
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                placeholder="Paste or type the source content..."
                rows={3}
                className="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addSource}
            disabled={!sourceTitle.trim() || !sourceContent.trim()}
            className="mt-3 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition hover:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Source
          </button>

          {sources.length > 0 && (
            <ul className="mt-4 space-y-2">
              {sources.map((source) => (
                <li
                  key={source.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-800/50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{source.title}</p>
                    <p className="text-xs text-neutral-400 line-clamp-2">{source.content}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSource(source.id)}
                    className="shrink-0 text-xs text-neutral-500 transition hover:text-red-400"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching and analyzing..." : "Run Research"}
        </button>
      </form>

      {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}

      {result && (
        <div className="mt-10 space-y-6">
          <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">Web Results</h2>
            <ul className="mt-4 space-y-3">
              {(result.sources || []).map((source, i) => (
                <li key={i} className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-3">
                  <a href={source.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:underline">
                    {source.title}
                  </a>
                  <p className="text-xs text-neutral-400 mt-1 truncate">{source.link}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">Summary</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{result.summary}</p>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">Key Insights</h2>
            <ul className="mt-4 space-y-2">
              {result.insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                  <span className="mt-1 text-blue-400">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">Comparison</h2>
            <ul className="mt-4 space-y-2">
              {result.comparison.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                  <span className="mt-1 text-purple-400">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">Conclusion</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{result.conclusion}</p>
          </section>
        </div>
      )}
    </div>
  );
}
