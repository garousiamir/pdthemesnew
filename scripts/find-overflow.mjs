/**
 * Finds unclipped elements wider than the viewport: node scripts/find-overflow.mjs <route> <width>
 */
import { chromium } from "@playwright/test";
const [,, route="/", width="375"] = process.argv;
const b = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const ctx = await b.newContext({ viewport: { width: +width, height: 800 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:3000"+route, { waitUntil: "load" });
await p.waitForTimeout(800);
const out = await p.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const clipped = (el) => { let n = el.parentElement; while (n && n !== document.body) { const o = getComputedStyle(n); if (/(hidden|clip|auto|scroll)/.test(o.overflowX) || /(hidden|clip|auto|scroll)/.test(o.overflow)) return true; n = n.parentElement; } return false; };
  const res = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el); if (cs.position === "fixed") continue;
    const r = el.getBoundingClientRect();
    if (r.right > docW + 1 && r.width > 0 && !clipped(el)) res.push(`${el.tagName.toLowerCase()}#${el.id}.${String(el.className).split(" ").slice(0,4).join(".")} w=${Math.round(r.width)} right=${Math.round(r.right)} text=${(el.textContent||"").trim().slice(0,40)}`);
    if (res.length > 12) break;
  }
  return { docW, sw: document.documentElement.scrollWidth, res };
});
console.log(JSON.stringify(out, null, 1));
await b.close();
