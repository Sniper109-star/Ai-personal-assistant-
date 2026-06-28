import { NextResponse } from "next/server";

interface Feedback {
  id: string;
  type: "good" | "bad" | "edited";
  originalSuggestion: string;
  editedSuggestion?: string;
  emotion: string;
  intent: string;
  topic: string;
  timestamp: string;
}

const feedbackStore: Feedback[] = [];
let feedbackNextId = 1;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, originalSuggestion, editedSuggestion, emotion, intent, topic } = body;

    if (!type || !originalSuggestion) {
      return NextResponse.json({ error: "Type and original suggestion are required" }, { status: 400 });
    }

    const feedback: Feedback = {
      id: `${feedbackNextId++}`,
      type,
      originalSuggestion,
      editedSuggestion,
      emotion: (emotion || "neutral") as Feedback["emotion"],
      intent: (intent || "statement") as Feedback["intent"],
      topic: topic || "general",
      timestamp: new Date().toISOString(),
    };

    feedbackStore.push(feedback);

    const goodCount = feedbackStore.filter((f) => f.type === "good").length;
    const badCount = feedbackStore.filter((f) => f.type === "bad").length;
    const editedCount = feedbackStore.filter((f) => f.type === "edited").length;

    const totalSuggestions = goodCount + badCount + editedCount;

    const learningInsights = feedbackStore.reduce((acc, f) => {
      const key = `${f.topic}-${f.emotion}`;
      if (!acc[key]) acc[key] = { topic: f.topic, emotion: f.emotion, count: 0, positive: 0 };
      acc[key].count++;
      if (f.type === "good" || f.type === "edited") acc[key].positive++;
      return acc;
    }, {} as Record<string, { topic: string; emotion: string; count: number; positive: number }>);

    const topPatterns = Object.values(learningInsights)
      .filter((p) => p.count >= 2)
      .sort((a, b) => b.positive / a.count - a.positive / a.count)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      feedbackId: feedback.id,
      stats: {
        total: totalSuggestions,
        good: goodCount,
        bad: badCount,
        edited: editedCount,
        accuracy: totalSuggestions > 0 ? Math.round((goodCount / totalSuggestions) * 100) : 0,
      },
      topPatterns,
    });
  } catch {
    return NextResponse.json({ error: "Failed to process feedback" }, { status: 500 });
  }
}

export async function GET() {
  const goodCount = feedbackStore.filter((f) => f.type === "good").length;
  const badCount = feedbackStore.filter((f) => f.type === "bad").length;
  const editedCount = feedbackStore.filter((f) => f.type === "edited").length;
  const total = feedbackStore.length;

  const recent = feedbackStore.slice(-10);

  return NextResponse.json({
    stats: {
      total,
      good: goodCount,
      bad: badCount,
      edited: editedCount,
      accuracy: total > 0 ? Math.round((goodCount / total) * 100) : 0,
    },
    recent,
  });
}
