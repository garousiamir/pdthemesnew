import { test, expect } from "@playwright/test";
import { isMobile, settle } from "./helpers";

test.describe("Navigation", () => {
  test("header links reach their pages", async ({ page }) => {
    test.skip(isMobile(page), "desktop nav");
    await page.goto("/");
    for (const [label, path] of [
      ["All Products", "/products"],
      ["Documentation", "/documentation"],
      ["Support", "/support"],
      ["Blog", "/blog"],
    ] as const) {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });

  test("mega menu opens on hover and keyboard, lists products, closes on Escape", async ({
    page,
  }) => {
    test.skip(isMobile(page), "desktop nav");
    await page.goto("/");
    await settle(page);
    const themes = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Themes", exact: true });
    await themes.hover();
    const menu = page.locator("#menu-themes");
    await expect(menu).toBeVisible();
    await expect(
      menu.getByRole("link", { name: /Aurum/ }).first(),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await themes.focus();
    await page.keyboard.press("ArrowDown");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link").first()).toBeFocused();
  });

  test("mobile menu opens, lists sections and products, and closes", async ({
    page,
  }) => {
    test.skip(!isMobile(page), "mobile nav");
    await page.goto("/");
    await settle(page);
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "Documentation" }),
    ).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Aurum" })).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test("search overlay finds products and pages with keyboard navigation", async ({
    page,
  }) => {
    await page.goto("/");
    await settle(page);
    await page
      .getByRole("button", { name: /search/i })
      .first()
      .click();
    const search = page.getByRole("dialog", { name: "Search" });
    await expect(search).toBeVisible();
    await search.getByRole("searchbox").fill("refund");
    await expect(
      search.getByRole("option", { name: /refund policy/i }),
    ).toBeVisible();
    await search.getByRole("searchbox").fill("nord");
    await expect(search.getByRole("option").first()).toContainText("Nordlicht");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/products\/nordlicht$/);
  });

  test("search shows an empty state for nonsense", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await page
      .getByRole("button", { name: /search/i })
      .first()
      .click();
    const search = page.getByRole("dialog", { name: "Search" });
    await search.getByRole("searchbox").fill("zzzzqqq");
    await expect(search).toContainText(/no results/i);
  });

  test("skip link, focus visibility and keyboard reachability of primary CTAs", async ({
    page,
  }) => {
    await page.goto("/");
    await settle(page);
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveAttribute("aria-label", /PDThemes/);
    const outline = await focused.evaluate(
      (el) => getComputedStyle(el).outlineStyle,
    );
    expect(outline).not.toBe("none");
  });

  test("footer and sitemap links resolve", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("footer a[href^='/']")
      .evaluateAll((as) =>
        Array.from(
          new Set(
            as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!),
          ),
        ),
      );
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of hrefs) {
      const res = await request.get(href.split("#")[0]);
      expect(res.status(), href).toBe(200);
    }
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
      (m) => new URL(m[1]).pathname,
    );
    expect(locs).toContain("/products/aurum");
    for (const loc of locs) {
      const res = await request.get(loc);
      expect(res.status(), loc).toBe(200);
    }
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Sitemap:");
  });
});
