import { test, expect } from "@playwright/test";

test.describe("Reduced motion and animation hygiene", () => {
  test.use({ reducedMotion: "reduce" });

  test("content is fully visible without animations", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const h1Opacity = await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(h1Opacity)).toBe(1);
    // Marquees render statically (no animated track).
    await expect(page.locator(".animate-marquee, .animate-marquee-reverse")).toHaveCount(0);
    // Below-the-fold content is visible without scrolling into view.
    const whyOpacity = await page.locator("#why h2").evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(whyOpacity)).toBe(1);
    const faqOpacity = await page.locator("#faq h2").evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(faqOpacity)).toBe(1);
  });

  test("pinned section is not pinned under reduced motion", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
  });
});

test.describe("With motion", () => {
  test("headline is revealed after load and pinned section exists on desktop", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1800);
    const h1Opacity = await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(h1Opacity)).toBe(1);
    const vp = page.viewportSize();
    if (vp && vp.width >= 1024) await expect(page.locator(".pin-spacer")).toHaveCount(1);
  });
});
