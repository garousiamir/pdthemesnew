/**
 * Captures full-page screenshots of PDThemes routes at the nine review
 * viewports and reports horizontal overflow.
 *
 *   npm run shots                   # all routes, all viewports
 *   npm run shots -- /products 390  # one route, one width
 *
 * Output: tests/screenshots/<route>/<width>.png (git-ignored).
 * Set MOTION=on to capture with animations enabled (default emulates
 * prefers-reduced-motion so below-the-fold content is visible).
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const routes = process.argv[2] ? [process.argv[2]] : ["/", "/products", "/themes", "/plugins", "/free", "/products/aurum", "/products/formwerk", "/products/lumen", "/blog", "/blog/licensing-explained", "/about", "/documentation", "/support", "/contact", "/faq", "/legal/terms", "/license", "/does-not-exist"];
const widths = process.argv[3] ? [Number(process.argv[3])] : [1920, 1440, 1280, 1024, 768, 430, 390, 375, 320];
const motion = process.env.MOTION === "on";

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const problems = [];
for (const route of routes) {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: motion ? "no-preference" : "reduce" });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && !(route === "/does-not-exist" && /404/.test(m.text())) && errors.push(m.text()));
    await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    // Scroll through the page so lazy images load and scroll-triggered reveals fire.
    await page.evaluate(async (slow) => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, slow ? 120 : 40)); }
      window.scrollTo(0, 0);
    }, motion);
    await page.waitForTimeout(motion ? 800 : 300);
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const offenders = [];
      if (sw > docW + 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > docW + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed") {
            offenders.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ").slice(0, 3).join(".") : ""} right=${Math.round(r.right)}`);
            if (offenders.length > 6) break;
          }
        }
      }
      return { docW, sw, offenders };
    });
    const dir = path.join("tests/screenshots", route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__"));
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${width}${motion ? "-motion" : ""}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const flag = overflow.sw > overflow.docW + 1 ? ` OVERFLOW ${overflow.sw}>${overflow.docW} ${overflow.offenders.join(" | ")}` : "";
    if (flag || errors.length) problems.push(`${route} @${width}:${flag}${errors.length ? " ERRORS: " + errors.slice(0, 3).join(" // ") : ""}`);
    console.log(`${route} @${width} → ${file}${flag}${errors.length ? ` (${errors.length} console errors)` : ""}`);
    await ctx.close();
  }
}
await browser.close();
if (problems.length) {
  console.log("\nProblems:\n" + problems.join("\n"));
  process.exitCode = 1;
}
