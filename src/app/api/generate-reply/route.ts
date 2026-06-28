import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const suggestions = generateSuggestions(message);

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}

function generateSuggestions(message: string): string[] {
  const lower = message.toLowerCase();

  if (lower.includes("difficult") || lower.includes("hard") || lower.includes("tough")) {
    return [
      "It might feel overwhelming at first, but once you get the basics down, it gets much easier. I'd be happy to walk you through the fundamentals step by step.",
      "Every concept seems difficult before it clicks! Let's start with one small part and build up from there. What's the first thing that's confusing you?",
      "The learning curve is real, but you've got this. I can break things down into simpler chunks — just tell me where you'd like to start.",
    ];
  }

  if (lower.includes("learn") || lower.includes("learning")) {
    return [
      "It's totally normal to feel that way! The best approach is to take it one concept at a time. Would you like me to explain the basics first?",
      "Learning new things can be a lot, but it's also really rewarding. I can help you build a simple roadmap if that would help.",
      "You're not alone — many people feel the same way when starting out. Let's start small: what's the one thing you want to understand first?",
    ];
  }

  if (lower.includes("confused") || lower.includes("confusing")) {
    return [
      "I get it! Sometimes the jargon can be overwhelming. Let's simplify things — what part specifically feels unclear?",
      "That's completely fair. Let's take a breath and start with the simplest explanation. Which part is tripping you up?",
      "Totally understandable. I'll try to explain it as clearly as I can. What would you like me to break down?",
    ];
  }

  if (lower.includes("help") || lower.includes("?")) {
    return [
      "Of course! I'm here to help. What would you like to know more about?",
      "Absolutely — let's tackle this together. Where do you want to begin?",
      "Happy to help! Could you give me a bit more detail on what you're trying to figure out?",
    ];
  }

  return [
    "That's a great point! I'd love to help you explore this further. What aspect interests you most?",
    "Interesting! Let's dig into that. Is there a specific part you'd like to start with?",
    "I hear you. Let's break this down into something more manageable — what would help you the most right now?",
  ];
}
