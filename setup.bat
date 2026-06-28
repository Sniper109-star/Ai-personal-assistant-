@echo off
echo Installing dependencies...
bun install

echo Installing Playwright browsers...
npx playwright install chromium

echo Building project...
bun run build

echo Setup complete! Run "bun run dev" to start the development server.
pause
