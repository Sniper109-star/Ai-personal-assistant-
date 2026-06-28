"use client";

import { useState } from "react";

interface Suggestion {
  id: string;
  text: string;
}

export default function ReplyHelper() {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);
    setSuggestions([]);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(
          data.suggestions.map((text: string, index: number) => ({
            id: `${index}-${Date.now()}`,
            text,
          }))
        );
      }
    } catch {
      setSuggestions([
        { id: "1", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Reply Helper
        </h1>
        <p className="mt-2 text-neutral-400">
          Paste an incoming message and get smart reply suggestions.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-300"
            >
              Conversation message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="e.g., There are a lot of new concepts in all of this for me 😲 Is it difficult to learn?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Replies"}
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Suggested replies
            </h2>
            <ul className="space-y-3">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="flex items-start justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4"
                >
                  <p className="text-sm text-neutral-300">{suggestion.text}</p>
                  <button
                    onClick={() => copyToClipboard(suggestion.id, suggestion.text)}
                    className="shrink-0 rounded-md bg-neutral-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-600"
                  >
                    {copiedId === suggestion.id ? "Copied" : "Copy"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
