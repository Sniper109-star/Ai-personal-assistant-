# ReplyAI

A comprehensive AI-powered platform featuring deep reasoning, live web search, task management, research synthesis, and continuous learning.

## Features

- **Deep Reasoning Engine** - Analyzes emotion, intent, topic, difficulty, and tone for every message
- **Reply Assistant** - Generate thoughtful, context-aware reply suggestions with feedback
- **Personal Assistant** - Manage tasks with priorities and live web search
- **Research Autonomy** - Live Google search + structured synthesis and insights
- **Continuous Learning** - Feedback loop that improves accuracy over time
- **Live Web Search** - Playwright-based search bypassing anti-scraping mechanisms

## Quick Setup

### Prerequisites

- [Bun](https://bun.sh) (v1.3+)
- Node.js 18+
- Playwright browsers (auto-installed)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sniper109-star/Ai-personal-assistant-.git
cd Ai-personal-assistant-

# Run setup script (Linux/macOS)
chmod +x setup.sh
./setup.sh

# OR manual setup
bun install
npx playwright install chromium
bun run build
```

### Windows Setup

```cmd
setup.bat
```

### Development

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build

```bash
bun run build
bun run start
```

### Lint & Type Check

```bash
bun run lint
bun run typecheck
```

## Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 16.x |
| React | 19.x |
| TypeScript | 5.9.x |
| Tailwind CSS | 4.x |
| Playwright | 1.61.x |
| Bun | Latest |

## Project Structure

```
src/
├── app/
│   ├── (routes)
│   │   ├── page.tsx          # Home
│   │   ├── layout.tsx        # Root layout + mobile nav
│   │   ├── about/page.tsx    # About page
│   │   ├── features/page.tsx # Features showcase
│   │   ├── assistant/page.tsx # Task management + search
│   │   ├── research/page.tsx  # Research + synthesis
│   │   ├── learning/page.tsx  # Learning dashboard
│   │   └── reply-helper/page.tsx # Reply generator
│   └── api/
│       ├── generate-reply/route.ts  # Deep reasoning engine
│       ├── search/route.ts          # Live web search
│       ├── research/route.ts        # Research synthesis
│       ├── assistant/tasks/route.ts # Task CRUD
│       └── feedback/route.ts        # Learning feedback
└── components/
    ├── MobileNav.tsx         # Mobile hamburger navigation
    └── ReplyHelper.tsx       # Reply generation UI
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

## Mobile-First Design

The UI is optimized for mobile devices with:
- Hamburger navigation menu
- Touch-friendly tap targets (44px+)
- Responsive grids (1 col mobile → 2 col tablet → 3 col desktop)
- Adaptive typography and spacing
- Active press states for mobile feedback

## License

MIT
