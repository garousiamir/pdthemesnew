/**
 * Viewport peek: node scripts/peek.mjs <route> <width> <y1,y2,...> [on|off] [height]
 * Captures the viewport at each scroll position into tests/screenshots/_peek-N.png.
 */
import { chromium } from "@playwright/test";
const [,, route="/", width="1440", ys="0", motion="off", height="900"] = process.argv;
const b = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const ctx = await b.newContext({ viewport: { width: +width, height: +height }, reducedMotion: motion === "on" ? "no-preference" : "reduce" });
const p = await ctx.newPage();
const errs=[]; p.on("pageerror",e=>errs.push("PAGEERROR "+e.message)); p.on("console",m=>m.type()==="error"&&!/404/.test(m.text())&&errs.push(m.text()));
await p.goto("http://localhost:3000"+route, { waitUntil: "load", timeout: 90000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(motion==="on"?1500:600);
let i=0;
for (const y of ys.split(",")) {
  await p.evaluate((yy)=>window.scrollTo(0,yy), +y);
  await p.waitForTimeout(motion==="on"?1400:400);
  const out = `tests/screenshots/_peek-${i++}.png`;
  await p.screenshot({ path: out });
  console.log(out, "y="+y);
}
console.log(errs.slice(0,6));
await b.close();
