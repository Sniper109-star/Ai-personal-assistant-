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
      const res = await fetch("/api/feedback");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecent(data.recent || []);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">Continuous Learning Engine</h1>
      <p className="mt-2 text-neutral-400">
        The engine improves reasoning, accuracy, and response quality through feedback, memory, and repeated use over time.
      </p>

      {loading ? (
        <p className="mt-8 text-center text-neutral-500">Loading learning data...</p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats?.total || 0}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">Total Feedback</div>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{stats?.good || 0}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">Good</div>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{stats?.bad || 0}</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">Needs Work</div>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{stats?.accuracy || 0}%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">Accuracy</div>
            </div>
          </div>

          <div className="mt-10 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">How Learning Works</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                <div className="text-xl">📝</div>
                <h3 className="mt-2 text-sm font-semibold text-white">Feedback Collection</h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Rate suggestions as good, bad, or edited. Every piece of feedback improves the model.
                </p>
              </div>
              <div className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                <div className="text-xl">🧠</div>
                <h3 className="mt-2 text-sm font-semibold text-white">Pattern Recognition</h3>
                <p className="mt-1 text-xs text-neutral-400">
                  The engine identifies patterns across emotions, topics, and contexts.
                </p>
              </div>
              <div className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-4">
                <div className="text-xl">📈</div>
                <h3 className="mt-2 text-sm font-semibold text-white">Adaptive Improvement</h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Over time, responses become more accurate and aligned with your preferences.
                </p>
              </div>
            </div>
          </div>

          {recent.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-white">Recent Feedback</h2>
              <div className="mt-4 space-y-3">
                {recent.map((fb) => (
                  <div
                    key={fb.id}
                    className="rounded-lg border border-neutral-800 bg-neutral-900 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          fb.type === "good"
                            ? "bg-green-500/10 text-green-400"
                            : fb.type === "bad"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {fb.type}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(fb.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-400 line-clamp-2">&quot;{fb.originalSuggestion}&quot;</p>
                    {fb.editedSuggestion && (
                      <p className="mt-1 text-sm text-neutral-300 line-clamp-2">
                        <span className="text-neutral-500">Edited:</span> &quot;{fb.editedSuggestion}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(stats?.total || 0) === 0 && (
            <div className="mt-10 rounded-lg border border-dashed border-neutral-800 p-8 text-center">
              <p className="text-neutral-500">No feedback collected yet. Use the Reply Assistant and rate suggestions to start improving the engine.</p>
            </div>
          )}

          <div className="mt-10 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-lg font-semibold text-white">Live Search Integration</h2>
            <p className="mt-2 text-sm text-neutral-400">
              ReplyAI now integrates live Google search capabilities (powered by Playwright) to provide real-time information
              in the Research and Personal Assistant modules. This enables uncensored, up-to-date result retrieval similar to 
              the Google Unlocked concept, bypassing standard result filtering to provide comprehensive coverage.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
