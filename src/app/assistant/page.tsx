"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  createdAt: string;
};

export default function AssistantPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ title: string; link: string; snippet: string }[]>([]);
  const [searching, setSearching] = useState(false);

  async function loadTasks() {
    setLoading(true);
    const res = await fetch("/api/assistant/tasks");
    const data = await res.json();
    setTasks(data.tasks || []);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch("/api/assistant/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    });

    if (res.ok) {
      setTitle("");
      setPriority("medium");
      loadTasks();
    }
  }

  async function toggleComplete(id: string, completed: boolean) {
    await fetch("/api/assistant/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });
    loadTasks();
  }

  async function handleDelete(id: string) {
    await fetch("/api/assistant/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadTasks();
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, limit: 5 }),
      });
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }

  const priorityCounts = {
    high: tasks.filter((t) => t.priority === "high" && !t.completed).length,
    medium: tasks.filter((t) => t.priority === "medium" && !t.completed).length,
    low: tasks.filter((t) => t.priority === "low" && !t.completed).length,
  };
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Personal Assistant</h1>
      <p className="mt-2 text-sm text-neutral-400 sm:text-base">Organize tasks, track priorities, search the web, and manage your workflow.</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
          <div className="text-xl font-bold text-red-400 sm:text-2xl">{priorityCounts.high}</div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">High</div>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
          <div className="text-xl font-bold text-yellow-400 sm:text-2xl">{priorityCounts.medium}</div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">Medium</div>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-center sm:p-4">
          <div className="text-xl font-bold text-green-400 sm:text-2xl">{priorityCounts.low}</div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider sm:text-xs">Low</div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
        <h2 className="text-base font-semibold text-white sm:text-lg">Web Search</h2>
        <form onSubmit={handleSearch} className="mt-3 flex gap-2 sm:gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Google..."
            className="flex-1 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <button
            type="submit"
            disabled={searching || !searchQuery.trim()}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
          >
            {searching ? "..." : "Search"}
          </button>
        </form>

        {searchResults.length > 0 && (
          <ul className="mt-4 space-y-3">
            {searchResults.map((result, i) => (
              <li key={i} className="rounded-xl border border-neutral-800 bg-neutral-800/50 p-3">
                <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:underline">
                  {result.title}
                </a>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{result.snippet}</p>
                <p className="text-xs text-neutral-500 mt-1 truncate">{result.link}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleAdd} className="mt-6 flex gap-2 sm:gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="rounded-xl border border-neutral-700 bg-neutral-800 px-2 py-2.5 text-xs text-white focus:border-white focus:outline-none sm:text-sm"
        >
          <option value="high">High</option>
          <option value="medium">Med</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
        >
          Add
        </button>
      </form>

      {loading ? (
        <p className="mt-8 text-center text-sm text-neutral-500">Loading tasks...</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3 sm:p-4 ${task.completed ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id, task.completed)}
                  className="h-4 w-4 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-white"
                />
                <span className={`text-sm ${task.completed ? "line-through text-neutral-500" : "text-neutral-300"}`}>
                  {task.title}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
                    task.priority === "high"
                      ? "bg-red-500/10 text-red-400"
                      : task.priority === "medium"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-xs text-neutral-500 transition hover:text-red-400 active:scale-[0.95]"
              >
                Delete
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="rounded-xl border border-dashed border-neutral-800 p-8 text-center text-sm text-neutral-500">
              No tasks yet. Add one above.
            </li>
          )}
        </ul>
      )}

      {tasks.length > 0 && (
        <div className="mt-4 text-xs text-neutral-500 sm:text-sm">
          {completedCount} of {tasks.length} completed
        </div>
      )}
    </div>
  );
}
