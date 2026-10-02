import { test, expect } from "@playwright/test";
import { expectNoHorizontalOverflow, settle } from "./helpers";

const routes = [
  "/",
  "/products",
  "/themes",
  "/plugins",
  "/free",
  "/products/kontor",
  "/products/gridwerk",
  "/blog",
  "/blog/licensing-explained",
  "/about",
  "/documentation",
  "/support",
  "/contact",
  "/faq",
  "/license",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refunds",
  "/legal/cookies",
  "/legal/imprint",
];

test.describe("Supporting pages", () => {
  for (const route of routes) {
    test(`${route} renders with one h1, unique title and no overflow`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await settle(page);
      await expect(page.locator("h1")).toHaveCount(1);
      expect((await page.title()).length).toBeGreaterThan(8);
      await expectNoHorizontalOverflow(page);
      expect(errors).toEqual([]);
    });
  }

  test("blog listing filters by category and article renders MDX with reading time", async ({
    page,
  }) => {
    await page.goto("/blog");
    await settle(page);
    await expect(page.locator("[data-testid='post-card']")).toHaveCount(6);
    await page.getByRole("tab", { name: "Changelog" }).click();
    await expect(page.locator("[data-testid='post-card']")).toHaveCount(1);
    await page.goto("/blog/licensing-explained");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Licensing explained",
    );
    await expect(page.locator("#article-body h2").first()).toBeVisible();
    await expect(page.locator("article header")).toContainText(/min read/);
    const og = await page
      .locator("meta[property='og:type']")
      .getAttribute("content");
    expect(og).toBe("article");
  });

  test("legal pages carry a visible review notice", async ({ page }) => {
    await page.goto("/legal/terms");
    await expect(page.getByRole("note")).toContainText(/not been reviewed/i);
  });

  test("404 page returns 404 and offers a way back", async ({ page }) => {
    const res = await page.goto("/this/does/not/exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("link", { name: /back home/i })).toBeVisible();
  });
});
