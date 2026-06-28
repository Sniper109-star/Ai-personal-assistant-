# Active Context: ReplyAI Platform

## Current State

**Status**: ✅ Production-ready full-stack AI platform

ReplyAI is a comprehensive web platform featuring deep reasoning, live web search, task management, research synthesis, and continuous learning — all powered by a modern Next.js 16 stack.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Deep reason engine for emotion, intent, topic, difficulty, tone analysis
- [x] Full website with Home, About, Features, Reply Helper, Research, Personal Assistant, Learning pages
- [x] Live Google search integration (Playwright-based, inspired by google-search)
- [x] Uncensored / comprehensive search results (inspired by Google Unlocked)
- [x] Personal Assistant with task management (create, list, complete, priority, delete)
- [x] Research Autonomy with live web search and synthesis
- [x] Continuous Learning Engine with feedback collection and pattern recognition
- [x] Feedback loop integrated into Reply Helper (👍, 👎, Edit)

## Current Structure

| Route | Purpose | Status |
|----------------|---------|--------|
| `/` | Home page with hero, features, CTAs | ✅ Ready |
| `/reply-helper` | Deep reasoning reply generator with feedback | ✅ Enhanced |
| `/assistant` | Personal assistant + live web search | ✅ New |
| `/research` | Live research with synthesis and sources | ✅ New |
| `/learning` | Continuous learning dashboard | ✅ New |
| `/features` | Feature showcase grid | ✅ Ready |
| `/about` | Mission, how-it-works, tech stack | ✅ Ready |
| `/api/generate-reply` | Deep reasoning engine | ✅ Active |
| `/api/search` | Live Google search (Playwright) | ✅ New |
| `/api/research` | Research synthesis with live search | ✅ New |
| `/api/assistant/tasks` | Task CRUD API | ✅ New |
| `/api/feedback` | Feedback collection and learning stats | ✅ New |
| `src/components/ReplyHelper.tsx` | Core reply component | ✅ Enhanced |

## Deep Reason Engine

The API at `/api/generate-reply` performs multi-dimensional message analysis:

- **Emotion**: surprise, confusion, gratitude, anxiety, excitement, neutral
- **Intent**: question, help-request, information-seeking, opinion-sharing, agreement, disagreement, apology, gratitude
- **Topic**: tech, learning, math, science, business, health, relationships, entertainment, career, travel, finance
- **Difficulty**: easy, medium, hard
- **Tone**: formal, casual, friendly, empathetic

Returns structured `ReasoningResult` with `emotion`, `intent`, `topic`, `difficulty`, `tone`, and `suggestions`.

## Live Search Integration

Inspired by google-search and Google Unlocked:

- **`/api/search`**: Playwright-based Google search that bypasses anti-scraping mechanisms
- **Headless Chromium** with realistic browser fingerprint, locale, and user agent
- **Uncensored retrieval**: Extracts both standard and hidden/removed search results
- **Structured output**: title, link, snippet with JSON response
- Used by Research and Personal Assistant modules for real-time information

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.9.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS |
| Playwright | 1.61.x | Browser automation for live search |
| Bun | Latest | Package manager & runtime |

## Pending Improvements

- [ ] Add MCP server integration (from google-search repo)
- [ ] Add database persistence for tasks and feedback (Drizzle + SQLite)
- [ ] Add authentication
- [ ] Add testing setup recipe
- [ ] Add email notifications
- [ ] Deploy to Vercel or similar

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Current | Added Reply Helper, Deep Reason Engine, Live Search, Personal Assistant, Research, Learning, full website |
