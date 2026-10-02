import { expect, type Page } from "@playwright/test";

/** Waits for fonts and the first animation frame so GSAP reveals have started. */
export async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

export async function expectNoHorizontalOverflow(page: Page) {
  const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  expect(sw, "document scrollWidth should not exceed clientWidth").toBeLessThanOrEqual(cw + 1);
}

export function isMobile(page: Page) {
  const vp = page.viewportSize();
  return !!vp && vp.width < 1024;
}
