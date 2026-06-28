"use client";

import { useEffect, useState } from "react";

interface FeedbackStats {
  total: number;
  good: number;
  bad: number;
  edited: number;
  accuracy: number;
}

interface RecentFeedback {
  id: string;
  type: string;
  originalSuggestion: string;
  editedSuggestion?: string;
  timestamp: string;
}

export default function LearningPage() {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [recent, setRecent] = useState<RecentFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch("/api/feedback");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setRecent(data.recent || []);
        }
      } catch {
        // silent fail
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Continuous Learning Engine</h1>
      <p className="mt-2 text-sm text-neutral-400 sm:text-base">
        The engine improves reasoning, accuracy, and response quality through feedback, memory, and repeated use over time.
      </p>

      {loading ? (
        <p className="mt-8 text-center text-sm text-neutral-500">Loading learning data...</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
              <div className="text-2xl font-bold text-white sm:text-3xl">{stats?.total || 0}</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">Total</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
              <div className="text-2xl font-bold text-green-400 sm:text-3xl">{stats?.good || 0}</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">Good</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
              <div className="text-2xl font-bold text-red-400 sm:text-3xl">{stats?.bad || 0}</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">Needs Work</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
              <div className="text-2xl font-bold text-blue-400 sm:text-3xl">{stats?.accuracy || 0}%</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">Accuracy</div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
            <h2 className="text-base font-semibold text-white sm:text-lg">How Learning Works</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-xl border border-neutral-800 bg-neutral-800/50 p-3 sm:p-4">
                <div className="text-xl sm:text-2xl">📝</div>
                <h3 className="mt-2 text-sm font-semibold text-white">Feedback</h3>
                <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                  Rate suggestions as good, bad, or edited. Every piece of feedback improves the model.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-800/50 p-3 sm:p-4">
                <div className="text-xl sm:text-2xl">🧠</div>
                <h3 className="mt-2 text-sm font-semibold text-white">Patterns</h3>
                <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                  The engine identifies patterns across emotions, topics, and contexts.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-800/50 p-3 sm:p-4">
                <div className="text-xl sm:text-2xl">📈</div>
                <h3 className="mt-2 text-sm font-semibold text-white">Improvement</h3>
                <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                  Over time, responses become more accurate and aligned with your preferences.
                </p>
              </div>
            </div>
          </div>

          {recent.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base font-semibold text-white sm:text-lg">Recent Feedback</h2>
              <div className="mt-3 space-y-3">
                {recent.map((fb) => (
                  <div key={fb.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
                          fb.type === "good"
                            ? "bg-green-500/10 text-green-400"
                            : fb.type === "bad"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {fb.type}
                      </span>
                      <span className="text-[10px] text-neutral-500 sm:text-xs">
                        {new Date(fb.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-2 sm:text-sm">&quot;{fb.originalSuggestion}&quot;</p>
                    {fb.editedSuggestion && (
                      <p className="mt-1 text-xs text-neutral-300 line-clamp-2 sm:text-sm">
                        <span className="text-neutral-500">Edited:</span> &quot;{fb.editedSuggestion}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(stats?.total || 0) === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-neutral-800 p-6 text-center sm:p-8">
              <p className="text-xs text-neutral-500 sm:text-sm">No feedback collected yet. Use the Reply Assistant and rate suggestions.</p>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
            <h2 className="text-base font-semibold text-white sm:text-lg">Live Search Integration</h2>
            <p className="mt-2 text-sm text-neutral-400">
              ReplyAI now integrates live Google search capabilities powered by Playwright to provide real-time information
              in the Research and Personal Assistant modules.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
