"use client";

import { useEffect, useState } from "react";

interface Suggestion {
  id: string;
  text: string;
  emotion?: string;
  intent?: string;
  topic?: string;
}

interface ReasoningResult {
  emotion: string;
  intent: string;
  topic: string;
  difficulty: string;
  tone: string;
  suggestions: string[];
}

export default function ReplyHelper() {
  const [message, setMessage] = useState("");
  const [reasoningResult, setReasoningResult] = useState<ReasoningResult | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);
    setReasoningResult(null);
    setSuggestions([]);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context: "" }),
      });

      const data = await res.json();
      if (data.suggestions) {
        setReasoningResult(data);
        setSuggestions(
          data.suggestions.map((text: string, index: number) => ({
            id: `${index}-${Date.now()}`,
            text,
            emotion: data.emotion,
            intent: data.intent,
            topic: data.topic,
          }))
        );
      }
    } catch {
      setSuggestions([
        { id: "1", text: "Something went wrong. Please try again.", emotion: "neutral", intent: "statement", topic: "general" },
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

  function startEdit(id: string, text: string) {
    setEditingId(id);
    setEditText(text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  async function submitEdit(id: string) {
    if (!editText.trim()) return;

    const updated = suggestions.map((s) => (s.id === id ? { ...s, text: editText.trim() } : s));
    setSuggestions(updated);
    setEditingId(null);
    setEditText("");

    const original = suggestions.find((s) => s.id === id);
    if (original) {
      await sendFeedback("edited", original.text, editText.trim());
      setFeedbackSent((prev) => ({ ...prev, [id]: true }));
    }
  }

  async function sendFeedback(type: "good" | "bad" | "edited", original: string, edited?: string) {
    const targetId = editingId || Object.keys(feedbackSent).find((k) => feedbackSent[k]);
    const suggestion = suggestions.find((s) => s.id === targetId);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        originalSuggestion: original,
        editedSuggestion: edited,
        emotion: reasoningResult?.emotion || "neutral",
        intent: reasoningResult?.intent || "statement",
        topic: reasoningResult?.topic || "general",
      }),
    });
  }

  async function handleFeedback(id: string, type: "good" | "bad") {
    const suggestion = suggestions.find((s) => s.id === id);
    if (!suggestion) return;

    await sendFeedback(type, suggestion.text);
    setFeedbackSent((prev) => ({ ...prev, [id]: true }));
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Reply Assistant</h1>
        <p className="mt-2 text-neutral-400">
          Paste an incoming message and get smart reply suggestions powered by deep reasoning.
        </p>

        {reasoningResult && (
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              Emotion: {reasoningResult.emotion}
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              Intent: {reasoningResult.intent}
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              Topic: {reasoningResult.topic}
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              Difficulty: {reasoningResult.difficulty}
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              Tone: {reasoningResult.tone}
            </span>
          </div>
        )}

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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Suggested replies</h2>
              <span className="text-xs text-neutral-500">Rate suggestions to improve the engine</span>
            </div>
            <ul className="space-y-4">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="rounded-lg border border-neutral-700 bg-neutral-800 p-4"
                >
                  {editingId === suggestion.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="block w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => submitEdit(suggestion.id)}
                          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-200"
                        >
                          Save Edit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-neutral-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-neutral-300">{suggestion.text}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(suggestion.id, suggestion.text)}
                          className="rounded-md bg-neutral-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-600"
                        >
                          {copiedId === suggestion.id ? "Copied" : "Copy"}
                        </button>
                        <button
                          onClick={() => startEdit(suggestion.id, suggestion.text)}
                          className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-neutral-500"
                        >
                          Edit
                        </button>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleFeedback(suggestion.id, "good")}
                            disabled={!!feedbackSent[suggestion.id]}
                            className="rounded-md bg-green-500/10 px-2 py-1.5 text-xs font-medium text-green-400 transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            👍
                          </button>
                          <button
                            onClick={() => handleFeedback(suggestion.id, "bad")}
                            disabled={!!feedbackSent[suggestion.id]}
                            className="rounded-md bg-red-500/10 px-2 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            👎
                          </button>
                        </div>
                        {feedbackSent[suggestion.id] && (
                          <span className="text-xs text-neutral-500">Thanks for the feedback!</span>
                        )}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-500">
            💡 <strong className="text-neutral-400">Tip:</strong> Rate suggestions with 👍 or 👎, or click Edit to refine them.
            This helps the Continuous Learning Engine deliver better results over time.
            Visit <a href="/learning" className="text-white underline">/learning</a> to see your learning progress.
          </p>
        </div>
      </div>
    </div>
  );
}
