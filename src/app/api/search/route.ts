import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query, limit = 10 } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    let browser;
    try {
      const { chromium } = await import("playwright");
      browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });
    } catch (err) {
      console.error("Playwright launch failed:", err);
      return NextResponse.json({
        query,
        results: [],
        total: 0,
        fallback: true,
        message:
          "Live search is unavailable in this environment. The engine could not launch the browser. Please try again later or use the Assistant page for manual research.",
      });
    }

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      locale: "en-US",
      timezoneId: "America/New_York",
    });

    const page = await context.newPage();

    await page.goto("https://www.google.com", { waitUntil: "domcontentloaded", timeout: 30000 });

    const searchBox = page.locator("textarea[name=\"q\"], input[name=\"q\"]").first();
    await searchBox.fill(query);
    await searchBox.press("Enter");

    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await page.waitForSelector("#search, #rso", { timeout: 15000 });

    const results = await page.evaluate(() => {
      const items: { title: string; link: string; snippet: string }[] = [];
      const resultElements = document.querySelectorAll("#search .g, #rso .g");

      resultElements.forEach((el) => {
        const titleEl = el.querySelector("h3");
        const linkEl = el.querySelector("a[href]");
        const snippetEl = el.querySelector("[data-sncf], .VwiC3b, .IsZvec");

        if (titleEl && linkEl) {
          items.push({
            title: titleEl.textContent?.trim() || "",
            link: (linkEl as HTMLAnchorElement).href || "",
            snippet: snippetEl?.textContent?.trim() || "",
          });
        }
      });

      return items;
    });

    await browser.close();

    return NextResponse.json({
      query,
      results: results.slice(0, limit),
      total: results.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        error: "Search failed",
        details: String(error),
        fallback: true,
        message:
          "Live search encountered an unexpected error. The platform may not support browser automation in this environment.",
      },
      { status: 500 }
    );
  }
}
