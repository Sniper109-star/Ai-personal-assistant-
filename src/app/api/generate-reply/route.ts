import { NextResponse } from "next/server";

interface ReasoningResult {
  emotion: string;
  intent: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  tone: "formal" | "casual" | "friendly" | "empathetic";
  suggestions: string[];
}

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const reasoning = deepReason(message, context as string | undefined);
    return NextResponse.json(reasoning);
  } catch {
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}

function deepReason(message: string, context?: string): ReasoningResult {
  const lower = message.toLowerCase();
  const words = message.split(/\s+/);
  const wordCount = words.filter(Boolean).length;

  const emotion = detectEmotion(lower, message);
  const intent = detectIntent(lower, message);
  const topic = detectTopic(lower, message);
  const difficulty = assessDifficulty(lower, wordCount);
  const tone = suggestTone(emotion, intent);
  const suggestions = generateDeepSuggestions(message, emotion, intent, topic, difficulty, tone, context);

  return { emotion, intent, topic, difficulty, tone, suggestions };
}

function detectEmotion(lower: string, original: string): string {
  if (/😲|😮|😯|shock|wow|whoa/.test(lower)) return "surprised";
  if (/😊|😄|😁|happy|great|awesome|amazing/.test(lower)) return "positive";
  if (/😞|😔|😟|sad|disappointed|frustrated|upset/.test(lower)) return "negative";
  if (/😕|🤔|confused|unclear|don't understand|not sure/.test(lower)) return "confused";
  if (/😅|😂|lol|haha|funny/.test(lower)) return "playful";
  if (/😡|angry|annoyed|furious/.test(lower)) return "angry";
  if (/😰|anxious|nervous|worried|scared/.test(lower)) return "anxious";
  if (/thank|thanks|grateful|appreciate/.test(lower)) return "grateful";
  if (/!{2,}/.test(original)) return "excited";
  if (/\?{2,}/.test(original)) return "curious";
  return "neutral";
}

function detectIntent(lower: string, original: string): string {
  if (/is it|are they|was it|does it|do you|can i|should i|would it/.test(lower) && /\?/.test(original)) return "question";
  if (/help me|can you help|i need|please help/.test(lower)) return "help-request";
  if (/explain|describe|tell me about|what is|how does|what are/.test(lower)) return "information-seeking";
  if (/i think|i believe|in my opinion|from my perspective/.test(lower)) return "opinion-sharing";
  if (/i agree|exactly|yes|absolutely|that's right/.test(lower)) return "agreement";
  if (/no|disagree|not really|i don't think/.test(lower)) return "disagreement";
  if (/sorry|apologize|my bad|forgive me/.test(lower)) return "apology";
  if (/thank|thanks|appreciate|grateful/.test(lower)) return "gratitude";
  if (/bye|goodbye|see you|later/.test(lower)) return "farewell";
  if (/hello|hi|hey|good morning/.test(lower)) return "greeting";
  if (/!{2,}/.test(original)) return "exclamation";
  return "statement";
}

function detectTopic(lower: string, original: string): string {
  if (/code|programming|javascript|python|react|next|typescript|css|html|api|database|sql|git|debug|error|bug/.test(lower)) return "tech";
  if (/math|algebra|calculus|equation|formula|number/.test(lower)) return "math";
  if (/science|physics|chemistry|biology|experiment|theory/.test(lower)) return "science";
  if (/business|market|startup|sales|revenue|profit|customer/.test(lower)) return "business";
  if (/learn|study|school|college|university|course|tutorial|teach|education|student|class/.test(lower)) return "learning";
  if (/health|exercise|diet|food|sleep|medicine|doctor|mental/.test(lower)) return "health";
  if (/friend|relationship|family|love|date|partner/.test(lower)) return "relationships";
  if (/game|play|movie|music|book|fun|entertainment/.test(lower)) return "entertainment";
  if (/work|job|career|interview|resume|office/.test(lower)) return "career";
  if (/travel|trip|vacation|flight|hotel|country/.test(lower)) return "travel";
  if (/money|finance|invest|bank|budget|save/.test(lower)) return "finance";
  if (/concept|new|complex|advanced|beginner|basics|difficult|hard|easy/.test(lower)) return "learning";
  return "general";
}

function assessDifficulty(lower: string, wordCount: number): "easy" | "medium" | "hard" {
  const complexTerms = /concept|advanced|complex|sophisticated|intricate|nuanced|multifaceted/.test(lower);
  const beginnerTerms = /simple|basic|easy|beginner|intro|new to|just started/.test(lower);
  const questionTerms = /\?{2,}|really|actually|truly/.test(lower);

  if (complexTerms || (wordCount > 30 && questionTerms)) return "hard";
  if (beginnerTerms || wordCount < 10) return "easy";
  return "medium";
}

function suggestTone(emotion: string, intent: string): "formal" | "casual" | "friendly" | "empathetic" {
  if (emotion === "confused" || emotion === "anxious" || emotion === "negative") return "empathetic";
  if (intent === "question" || intent === "help-request") return "friendly";
  if (intent === "greeting" || intent === "farewell") return "casual";
  return "friendly";
}

function generateDeepSuggestions(
  message: string,
  emotion: string,
  intent: string,
  topic: string,
  difficulty: "easy" | "medium" | "hard",
  tone: "formal" | "casual" | "friendly" | "empathetic",
  context?: string
): string[] {
  const contextualPrefix = context ? `Based on what we were discussing: ` : "";
  const topicGuidance = getTopicGuidance(topic, difficulty);

  if (intent === "question") {
    return [
      contextualPrefix + questionResponse(emotion, topic, difficulty, tone),
      contextualPrefix + supportiveFollowUp(emotion, topic, tone),
      contextualPrefix + practicalGuidance(topic, difficulty, tone),
    ];
  }

  if (intent === "help-request") {
    return [
      contextualPrefix + empatheticHelp(emotion, topic, tone),
      contextualPrefix + actionableHelp(topic, difficulty, tone),
      contextualPrefix + encouragingHelp(emotion, tone),
    ];
  }

  if (intent === "information-seeking") {
    return [
      contextualPrefix + informativeResponse(topic, difficulty, tone),
      contextualPrefix + exampleBasedResponse(topic, tone),
      contextualPrefix + guidedLearningPath(topic, difficulty, tone),
    ];
  }

  if (emotion === "confused") {
    return [
      contextualPrefix + clarifyingResponse(emotion, topic, tone),
      contextualPrefix + simplifiedExplanation(topic, difficulty, tone),
      contextualPrefix + encouragingClarification(emotion, tone),
    ];
  }

  if (emotion === "surprised" && topic === "learning") {
    return [
      contextualPrefix + reassuringResponse(topic, difficulty, tone),
      contextualPrefix + breakDownResponse(topic, difficulty, tone),
      contextualPrefix + supportiveResponse(emotion, tone),
    ];
  }

  return [
    contextualPrefix + thoughtfulResponse(emotion, intent, topic, tone),
    contextualPrefix + engagingFollowUp(emotion, topic, tone),
    contextualPrefix + supportiveResponse(emotion, tone),
  ];
}

function getTopicGuidance(topic: string, difficulty: "easy" | "medium" | "hard"): string {
  const guidance: Record<string, Record<string, string>> = {
    tech: {
      easy: "Let's start with the fundamentals and build from there.",
      medium: "Let's work through this step by step.",
      hard: "This is an advanced topic — let's break it into smaller parts.",
    },
    learning: {
      easy: "Let's start with the basics and take it one step at a time.",
      medium: "Let's explore this concept together.",
      hard: "This is complex material — let's simplify it.",
    },
    math: {
      easy: "Let's work through this with a concrete example.",
      medium: "Let's apply the right formula to this problem.",
      hard: "Let's break down the math logically.",
    },
    general: {
      easy: "Let me help you understand this better.",
      medium: "Let's explore this idea together.",
      hard: "Let's simplify and break this down.",
    },
  };

  return guidance[topic]?.[difficulty] || guidance["general"][difficulty];
}

function questionResponse(emotion: string, topic: string, difficulty: string, tone: string): string {
  if (emotion === "confused") {
    return "That's a great question, and it's totally normal to feel unsure about this. Let me explain it in the simplest way possible — no jargon, I promise.";
  }
  if (difficulty === "hard") {
    return "That's an excellent question that gets to the heart of the matter. The answer isn't straightforward, but here's a clear way to think about it...";
  }
  return "Great question! Here's a straightforward answer that I think will help clarify things.";
}

function supportiveFollowUp(emotion: string, topic: string, tone: string): string {
  if (emotion === "confused") {
    return "I know it can feel overwhelming when you're first learning. Take your time — what's the one part that feels most unclear right now?";
  }
  return "Does that help? Want me to go deeper on any specific part of this?";
}

function practicalGuidance(topic: string, difficulty: string, tone: string): string {
  return `Let's get practical. Here's a concrete step you can take right now to make progress on this — no theory, just actionable guidance.`;
}

function empatheticHelp(emotion: string, topic: string, tone: string): string {
  if (emotion === "anxious") {
    return "I completely understand how stressful this can feel. You're not alone, and we can absolutely work through this together.";
  }
  if (emotion === "negative") {
    return "I can see this is really weighing on you, and I want you to know that it's okay to feel stuck. Let's tackle this one piece at a time.";
  }
  return "I hear you, and I want to help. Let's break this down into smaller, manageable steps.";
}

function actionableHelp(topic: string, difficulty: string, tone: string): string {
  return `Here's a concrete first step: focus on one small aspect of this and master it. Once that clicks, the rest will start falling into place.`;
}

function encouragingHelp(emotion: string, tone: string): string {
  return "You're already on the right track just by asking for help. That shows real initiative, and that's something to be proud of.";
}

function informativeResponse(topic: string, difficulty: string, tone: string): string {
  const topicNames: Record<string, string> = {
    tech: "this technical topic",
    learning: "this concept",
    math: "this math problem",
    science: "this scientific idea",
    business: "this business concept",
    health: "this topic",
    relationships: "this situation",
    entertainment: "this topic",
    career: "this career topic",
    travel: "this travel topic",
    finance: "this financial topic",
    general: "this",
  };

  return `Here's what you need to know about ${topicNames[topic] || "this"} — the key insight is that it's simpler than it initially appears once you see the pattern.`;
}

function exampleBasedResponse(topic: string, tone: string): string {
  return "The best way to learn is by example. Let me give you a concrete case that makes this click instantly.";
}

function guidedLearningPath(topic: string, difficulty: string, tone: string): string {
  if (difficulty === "easy") {
    return "Let's build your understanding from the ground up. Start with this one simple idea, and we'll expand from there.";
  }
  if (difficulty === "medium") {
    return "Here's a structured approach: first, understand the core concept. Then, see how it applies in practice. Finally, you'll recognize the pattern everywhere.";
  }
  return "This takes time to master, and that's okay. Start with the 20% of concepts that give you 80% of the understanding. Let me show you which parts those are.";
}

function clarifyingResponse(emotion: string, topic: string, tone: string): string {
  return "You're not confused — you're learning. The fact that you're asking questions means your brain is making connections. Let me rephrase this in a way that might click better.";
}

function simplifiedExplanation(topic: string, difficulty: string, tone: string): string {
  const topicNames: Record<string, string> = {
    tech: "this technology",
    learning: "this concept",
    math: "this mathematical idea",
    science: "this scientific principle",
    general: "this topic",
  };

  return `Imagine ${topicNames[topic] || "this"} like a recipe. You have ingredients (inputs), steps (process), and a result (output). That's really all there is to it at its core.`;
}

function encouragingClarification(emotion: string, tone: string): string {
  return "Take a breath — confusion is just a sign that you're pushing past what you already know. That's how growth happens.";
}

function reassuringResponse(topic: string, difficulty: string, tone: string): string {
  return "It's perfectly normal to feel like there's a lot to take in. Every expert was once a beginner. The trick is to focus on one piece at a time.";
}

function breakDownResponse(topic: string, difficulty: string, tone: string): string {
  return "Let's break this into bite-sized pieces. Here's the first concept you need to understand, and trust me — it's simpler than you think.";
}

function supportiveResponse(emotion: string, tone: string): string {
  if (emotion === "surprised") {
    return "I get that reaction! It's a lot to absorb, but I'm here to make it feel manageable. Ready to dive in?";
  }
  return "You've got this. And the best part? You don't have to master everything today. Just this one small step.";
}

function thoughtfulResponse(emotion: string, intent: string, topic: string, tone: string): string {
  return "That's a really interesting point, and I think there's more to unpack here. Let me share a perspective that might add some clarity.";
}

function engagingFollowUp(emotion: string, topic: string, tone: string): string {
  return "I'd love to explore this further with you. What's the aspect that interests you the most, or what would be most helpful to dive into?";
}
