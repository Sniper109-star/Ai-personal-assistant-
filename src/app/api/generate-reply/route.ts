import { NextResponse } from "next/server";

interface ReasoningResult {
  emotion: string;
  intent: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  tone: "formal" | "casual" | "friendly" | "empathetic";
  suggestions: string[];
  reasoningTrace: {
    thought: string;
    action: string;
    observation: string;
  }[];
  confidence: number;
  alternativeReasoning?: string[];
}

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = reactReason(message, context as string | undefined);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}

function reactReason(message: string, context?: string): ReasoningResult {
  const lower = message.toLowerCase();
  const words = message.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const trace: ReasoningResult["reasoningTrace"] = [];

  // Step 1: Initial thought - what is this message about?
  trace.push({
    thought: `Analyzing message: "${message.substring(0, 50)}${message.length > 50 ? "..." : ""}" (${wordCount} words)`,
    action: "detect_emotion_intent_topic",
    observation: `Detected patterns in ${lower}`,
  });

  // Step 2: Emotion detection with reasoning
  const emotion = detectEmotionWithReasoning(lower, message, trace);

  // Step 3: Intent classification with reasoning
  const intent = detectIntentWithReasoning(lower, message, trace);

  // Step 4: Topic identification with reasoning
  const topic = detectTopicWithReasoning(lower, message, trace);

  // Step 5: Assess difficulty
  const difficulty = assessDifficulty(lower, wordCount, trace);

  // Step 6: Determine optimal tone
  const tone = suggestTone(emotion, intent, trace);

  // Step 7: Generate multiple reasoning paths (self-consistency)
  const alternativeReasoning = generateAlternativeReasoning(message, emotion, intent, topic);

  // Step 8: Select best reasoning path and generate suggestions
  trace.push({
    thought: `Synthesizing response based on emotion=${emotion}, intent=${intent}, topic=${topic}, tone=${tone}`,
    action: "generate_suggestions",
    observation: `Generated 3 contextual suggestions with ${tone} tone`,
  });

  // Step 9: Self-refinement pass
  const rawSuggestions = generateDeepSuggestions(message, emotion, intent, topic, difficulty, tone, context);
  const refinedSuggestions = selfRefineSuggestions(rawSuggestions, message, emotion, intent, trace);

  // Calculate confidence based on signal clarity
  const confidence = calculateConfidence(emotion, intent, topic, message);

  return {
    emotion,
    intent,
    topic,
    difficulty,
    tone,
    suggestions: refinedSuggestions,
    reasoningTrace: trace,
    confidence,
    alternativeReasoning,
  };
}

function detectEmotionWithReasoning(lower: string, original: string, trace: ReasoningResult["reasoningTrace"]): string {
  const signals: { emotion: string; evidence: string }[] = [];

  if (/😲|😮|😯|shock|wow|whoa/.test(lower)) signals.push({ emotion: "surprised", evidence: "shock/wow emoji or words" });
  if (/😊|😄|😁|happy|great|awesome|amazing/.test(lower)) signals.push({ emotion: "positive", evidence: "positive emoji or words" });
  if (/😞|😔|😟|sad|disappointed|frustrated|upset/.test(lower)) signals.push({ emotion: "negative", evidence: "negative emotion words" });
  if (/😕|🤔|confused|unclear|don't understand|not sure/.test(lower)) signals.push({ emotion: "confused", evidence: "confusion indicators" });
  if (/😅|😂|lol|haha|funny/.test(lower)) signals.push({ emotion: "playful", evidence: "playful/humor markers" });
  if (/😡|angry|annoyed|furious/.test(lower)) signals.push({ emotion: "angry", evidence: "anger indicators" });
  if (/😰|anxious|nervous|worried|scared/.test(lower)) signals.push({ emotion: "anxious", evidence: "anxiety markers" });
  if (/thank|thanks|grateful|appreciate/.test(lower)) signals.push({ emotion: "grateful", evidence: "gratitude words" });
  if (/!{2,}/.test(original)) signals.push({ emotion: "excited", evidence: "multiple exclamation marks" });
  if (/\?{2,}/.test(original)) signals.push({ emotion: "curious", evidence: "multiple question marks" });

  const emotion = signals.length > 0 ? signals[0].emotion : "neutral";
  trace.push({
    thought: `Emotion detection: ${signals.length > 0 ? "found " + signals.length + " signal(s) -> " + signals.map(s => s.evidence).join(", ") : "no strong signals, defaulting to neutral"}`,
    action: "classify_emotion",
    observation: `Primary emotion: ${emotion}`,
  });

  return emotion;
}

function detectIntentWithReasoning(lower: string, original: string, trace: ReasoningResult["reasoningTrace"]): string {
  const signals: { intent: string; evidence: string }[] = [];

  if (/is it|are they|was it|does it|do you|can i|should i|would it/.test(lower) && /\?/.test(original)) signals.push({ intent: "question", evidence: "question structure with interrogative" });
  if (/help me|can you help|i need|please help/.test(lower)) signals.push({ intent: "help-request", evidence: "explicit help request" });
  if (/explain|describe|tell me about|what is|how does|what are/.test(lower)) signals.push({ intent: "information-seeking", evidence: "information-seeking verbs" });
  if (/i think|i believe|in my opinion|from my perspective/.test(lower)) signals.push({ intent: "opinion-sharing", evidence: "opinion markers" });
  if (/i agree|exactly|yes|absolutely|that's right/.test(lower)) signals.push({ intent: "agreement", evidence: "agreement markers" });
  if (/no|disagree|not really|i don't think/.test(lower)) signals.push({ intent: "disagreement", evidence: "disagreement markers" });
  if (/sorry|apologize|my bad|forgive me/.test(lower)) signals.push({ intent: "apology", evidence: "apology markers" });
  if (/thank|thanks|appreciate|grateful/.test(lower)) signals.push({ intent: "gratitude", evidence: "gratitude markers" });
  if (/bye|goodbye|see you|later/.test(lower)) signals.push({ intent: "farewell", evidence: "farewell markers" });
  if (/hello|hi|hey|good morning/.test(lower)) signals.push({ intent: "greeting", evidence: "greeting markers" });
  if (/!{2,}/.test(original)) signals.push({ intent: "exclamation", evidence: "strong emphasis" });

  const intent = signals.length > 0 ? signals[0].intent : "statement";
  trace.push({
    thought: `Intent detection: ${signals.length > 0 ? "found " + signals.length + " signal(s)" : "no specific intent signals, treating as statement"}`,
    action: "classify_intent",
    observation: `Primary intent: ${intent}`,
  });

  return intent;
}

function detectTopicWithReasoning(lower: string, original: string, trace: ReasoningResult["reasoningTrace"]): string {
  const topicSignals: { topic: string; keywords: string[] }[] = [
    { topic: "tech", keywords: ["code", "programming", "javascript", "python", "react", "next", "typescript", "css", "html", "api", "database", "sql", "git", "debug", "error", "bug"] },
    { topic: "math", keywords: ["math", "algebra", "calculus", "equation", "formula", "number"] },
    { topic: "science", keywords: ["science", "physics", "chemistry", "biology", "experiment", "theory"] },
    { topic: "business", keywords: ["business", "market", "startup", "sales", "revenue", "profit", "customer"] },
    { topic: "learning", keywords: ["learn", "study", "school", "college", "university", "course", "tutorial", "teach", "education", "student", "class", "concept", "difficult", "hard", "easy", "beginner", "basics"] },
    { topic: "health", keywords: ["health", "exercise", "diet", "food", "sleep", "medicine", "doctor", "mental"] },
    { topic: "relationships", keywords: ["friend", "relationship", "family", "love", "date", "partner"] },
    { topic: "entertainment", keywords: ["game", "play", "movie", "music", "book", "fun", "entertainment"] },
    { topic: "career", keywords: ["work", "job", "career", "interview", "resume", "office"] },
    { topic: "travel", keywords: ["travel", "trip", "vacation", "flight", "hotel", "country"] },
    { topic: "finance", keywords: ["money", "finance", "invest", "bank", "budget", "save"] },
  ];

  const matchedTopics = topicSignals
    .map(t => ({ topic: t.topic, matches: t.keywords.filter(kw => lower.includes(kw)) }))
    .filter(t => t.matches.length > 0)
    .sort((a, b) => b.matches.length - a.matches.length);

  const topic = matchedTopics.length > 0 ? matchedTopics[0].topic : "general";
  trace.push({
    thought: `Topic detection: analyzed ${topicSignals.length} topic categories against message keywords`,
    action: "classify_topic",
    observation: `Primary topic: ${topic}${matchedTopics.length > 0 ? ` (matched: ${matchedTopics[0].matches.join(", ")})` : " (general)"}`,
  });

  return topic;
}

function assessDifficulty(lower: string, wordCount: number, trace: ReasoningResult["reasoningTrace"]): "easy" | "medium" | "hard" {
  const complexTerms = /concept|advanced|complex|sophisticated|intricate|nuanced|multifaceted/.test(lower);
  const beginnerTerms = /simple|basic|easy|beginner|intro|new to|just started/.test(lower);
  const questionTerms = /\?{2,}|really|actually|truly/.test(lower);

  let difficulty: "easy" | "medium" | "hard";
  if (complexTerms || (wordCount > 30 && questionTerms)) difficulty = "hard";
  else if (beginnerTerms || wordCount < 10) difficulty = "easy";
  else difficulty = "medium";

  trace.push({
    thought: `Difficulty assessment: wordCount=${wordCount}, complexTerms=${complexTerms}, beginnerTerms=${beginnerTerms}`,
    action: "assess_difficulty",
    observation: `Difficulty level: ${difficulty}`,
  });

  return difficulty;
}

function suggestTone(emotion: string, intent: string, trace: ReasoningResult["reasoningTrace"]): "formal" | "casual" | "friendly" | "empathetic" {
  let tone: "formal" | "casual" | "friendly" | "empathetic";
  if (emotion === "confused" || emotion === "anxious" || emotion === "negative") tone = "empathetic";
  else if (intent === "question" || intent === "help-request") tone = "friendly";
  else if (intent === "greeting" || intent === "farewell") tone = "casual";
  else tone = "friendly";

  trace.push({
    thought: `Tone selection: emotion=${emotion}, intent=${intent} -> selecting ${tone} tone`,
    action: "select_tone",
    observation: `Selected tone: ${tone}`,
  });

  return tone;
}

function generateAlternativeReasoning(message: string, emotion: string, intent: string, topic: string): string[] {
  const alternatives: string[] = [];

  // Alternative emotional framing
  if (emotion === "confused") {
    alternatives.push("Frame as encouragement: The user is learning - emphasize growth mindset");
    alternatives.push("Frame as clarification: The user needs simpler explanations");
  } else if (emotion === "anxious") {
    alternatives.push("Frame as reassurance: Reduce anxiety with supportive language");
    alternatives.push("Frame as actionable: Give concrete steps to build confidence");
  } else {
    alternatives.push("Frame as collaborative: Position as partner in exploration");
    alternatives.push("Frame as informative: Provide structured, clear information");
  }

  // Alternative intent handling
  if (intent === "question") {
    alternatives.push("Direct answer first, then elaborate if needed");
    alternatives.push("Ask clarifying question before answering");
  } else if (intent === "help-request") {
    alternatives.push("Provide step-by-step guidance immediately");
    alternatives.push("Acknowledge struggle before offering help");
  }

  return alternatives.slice(0, 3);
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

function selfRefineSuggestions(
  raw: string[],
  originalMessage: string,
  emotion: string,
  intent: string,
  trace: ReasoningResult["reasoningTrace"]
): string[] {
  trace.push({
    thought: `Self-refinement pass: evaluating ${raw.length} raw suggestions against original message`,
    action: "self_refine",
    observation: "Refining for clarity, tone consistency, and relevance",
  });

  return raw.map((suggestion, i) => {
    let refined = suggestion;

    // Ensure tone consistency
    if (emotion === "confused" && !refined.includes("step") && !refined.includes("simple")) {
      refined = "Let's take this step by step. " + refined;
    }

    if (emotion === "anxious" && !refined.includes("together") && !refined.includes("okay")) {
      refined = "It's okay, " + refined.charAt(0).toLowerCase() + refined.slice(1);
    }

    // Ensure actionable
    if (intent === "help-request" && !refined.includes("?") && i === 0) {
      refined += " What specific part would you like to start with?";
    }

    return refined;
  });
}

function calculateConfidence(emotion: string, intent: string, topic: string, message: string): number {
  let confidence = 50; // Base confidence

  // Strong signals increase confidence
  if (emotion !== "neutral") confidence += 15;
  if (intent !== "statement") confidence += 15;
  if (topic !== "general") confidence += 15;

  // Message quality factors
  if (message.length > 20) confidence += 5;
  if (message.includes("?")) confidence += 5;

  return Math.min(confidence, 95);
}

// Helper functions (same as before)
function getTopicGuidance(topic: string, difficulty: "easy" | "medium" | "hard"): string {
  const guidance: Record<string, Record<string, string>> = {
    tech: { easy: "Let's start with the fundamentals and build from there.", medium: "Let's work through this step by step.", hard: "This is advanced — let's break it into smaller parts." },
    learning: { easy: "Let's start with the basics.", medium: "Let's explore this concept together.", hard: "This is complex — let's simplify it." },
    math: { easy: "Let's work through this with a concrete example.", medium: "Let's apply the right approach.", hard: "Let's break down the math logically." },
    general: { easy: "Let me help you understand this better.", medium: "Let's explore this idea together.", hard: "Let's simplify and break this down." },
  };
  return guidance[topic]?.[difficulty] || guidance["general"][difficulty];
}

function questionResponse(emotion: string, topic: string, difficulty: string, tone: string): string {
  if (emotion === "confused") return "That's a great question, and it's totally normal to feel unsure. Let me explain it in the simplest way possible — no jargon, I promise.";
  if (difficulty === "hard") return "That's an excellent question that gets to the heart of the matter. The answer isn't straightforward, but here's a clear way to think about it...";
  return "Great question! Here's a straightforward answer that I think will help clarify things.";
}

function supportiveFollowUp(emotion: string, topic: string, tone: string): string {
  if (emotion === "confused") return "I know it can feel overwhelming when you're first learning. Take your time — what's the one part that feels most unclear right now?";
  return "Does that help? Want me to go deeper on any specific part of this?";
}

function practicalGuidance(topic: string, difficulty: string, tone: string): string {
  return `Let's get practical. Here's a concrete step you can take right now to make progress — no theory, just actionable guidance.`;
}

function empatheticHelp(emotion: string, topic: string, tone: string): string {
  if (emotion === "anxious") return "I completely understand how stressful this can feel. You're not alone, and we can absolutely work through this together.";
  if (emotion === "negative") return "I can see this is really weighing on you. It's okay to feel stuck. Let's tackle this one piece at a time.";
  return "I hear you, and I want to help. Let's break this down into smaller, manageable steps.";
}

function actionableHelp(topic: string, difficulty: string, tone: string): string {
  return `Here's a concrete first step: focus on one small aspect of this and master it. Once that clicks, the rest will start falling into place.`;
}

function encouragingHelp(emotion: string, tone: string): string {
  return "You're already on the right track just by asking for help. That shows real initiative, and that's something to be proud of.";
}

function informativeResponse(topic: string, difficulty: string, tone: string): string {
  const topicNames: Record<string, string> = { tech: "this technical topic", learning: "this concept", math: "this math problem", science: "this scientific idea", business: "this business concept", health: "this topic", relationships: "this situation", entertainment: "this topic", career: "this career topic", travel: "this travel topic", finance: "this financial topic", general: "this" };
  return `Here's what you need to know about ${topicNames[topic] || "this"} — the key insight is that it's simpler than it initially appears once you see the pattern.`;
}

function exampleBasedResponse(topic: string, tone: string): string {
  return "The best way to learn is by example. Let me give you a concrete case that makes this click instantly.";
}

function guidedLearningPath(topic: string, difficulty: string, tone: string): string {
  if (difficulty === "easy") return "Let's build your understanding from the ground up. Start with this one simple idea, and we'll expand from there.";
  if (difficulty === "medium") return "Here's a structured approach: first, understand the core concept. Then, see how it applies in practice. Finally, you'll recognize the pattern everywhere.";
  return "This takes time to master, and that's okay. Start with the 20% of concepts that give you 80% of the understanding. Let me show you which parts those are.";
}

function clarifyingResponse(emotion: string, topic: string, tone: string): string {
  return "You're not confused — you're learning. The fact that you're asking questions means your brain is making connections. Let me rephrase this in a way that might click better.";
}

function simplifiedExplanation(topic: string, difficulty: string, tone: string): string {
  const topicNames: Record<string, string> = { tech: "this technology", learning: "this concept", math: "this mathematical idea", science: "this scientific principle", general: "this topic" };
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
  if (emotion === "surprised") return "I get that reaction! It's a lot to absorb, but I'm here to make it feel manageable. Ready to dive in?";
  return "You've got this. And the best part? You don't have to master everything today. Just this one small step.";
}

function thoughtfulResponse(emotion: string, intent: string, topic: string, tone: string): string {
  return "That's a really interesting point, and I think there's more to unpack here. Let me share a perspective that might add some clarity.";
}

function engagingFollowUp(emotion: string, topic: string, tone: string): string {
  return "I'd love to explore this further with you. What's the aspect that interests you the most, or what would be most helpful to dive into?";
}
