/**
 * Reference inspection script (Phase 1 of the brief).
 *
 * It could NOT be run from the build environment: jkdevstudio.com is denied
 * by the organisation's egress proxy (403 on CONNECT). Run it from a machine
 * with normal internet access:
 *
 *   PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=... node tests/reference/inspect-reference.mjs
 *
 * It captures full-page screenshots of the homepage, catalog and three product
 * pages at the nine review viewports, extracts computed typography / spacing
 * / colour samples from key elements, and records animation-related CSS
 * (transitions, keyframes, transforms) into tests/reference/output/. Use the
 * output to complete the "Reference" column in docs/motion-specification.md
 * and section 2 of docs/reference-analysis.md.
 */
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.REFERENCE_URL || "https://jkdevstudio.com";
const pages = ["/", "/themes/", "/plugins/", "/shop/", "/faq/", "/themes/fabula/", "/themes/qreatix/", "/themes/elisen/"];
const widths = [1920, 1440, 1280, 1024, 768, 430, 390, 375];
const OUT = path.resolve("tests/reference/output");

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
await mkdir(OUT, { recursive: true });
const report = [];

for (const route of pages) {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60_000 });
      // Scroll slowly so lazy content and scroll-triggered styles are applied.
      await page.evaluate(async () => {
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
        window.scrollTo(0, 0);
      });
      const name = `${route.replace(/\//g, "_") || "_home"}-${width}`;
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
      const data = await page.evaluate(() => {
        const sample = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return { sel, text: el.textContent?.trim().slice(0, 80), font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, color: cs.color, bg: cs.backgroundColor, radius: cs.borderRadius, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left), y: Math.round(r.top) };
        };
        const container = [...document.querySelectorAll("header, main > *, section")].slice(0, 20).map((el) => {
          const cs = getComputedStyle(el);
          return { tag: el.tagName, cls: (el.className || "").toString().slice(0, 60), w: Math.round(el.getBoundingClientRect().width), pt: cs.paddingTop, pb: cs.paddingBottom, bg: cs.backgroundColor };
        });
        const animated = [...document.querySelectorAll("*")].filter((el) => { const cs = getComputedStyle(el); return cs.animationName !== "none" || (cs.transitionDuration !== "0s" && cs.transitionProperty !== "all"); }).slice(0, 60).map((el) => { const cs = getComputedStyle(el); return { tag: el.tagName, cls: (el.className || "").toString().slice(0, 60), anim: cs.animationName, dur: cs.animationDuration, tf: cs.animationTimingFunction, transition: cs.transition }; });
        const keyframes = [];
        for (const sheet of document.styleSheets) { try { for (const rule of sheet.cssRules) if (rule.type === CSSRule.KEYFRAMES_RULE) keyframes.push(rule.cssText.slice(0, 400)); } catch {} }
        return { typography: ["h1", "h2", "h3", "p", "nav a", "a.button, .btn, button"].map(sample).filter(Boolean), container, animated, keyframes: keyframes.slice(0, 40) };
      });
      report.push({ route, width, ...data });
      console.log("✓", route, width);
    } catch (err) {
      report.push({ route, width, error: String(err) });
      console.log("✗", route, width, String(err).slice(0, 120));
    }
    await ctx.close();
  }
}
await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log("Report written to", path.join(OUT, "report.json"));
