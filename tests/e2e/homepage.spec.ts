import { test, expect } from "@playwright/test";
import { clickStable, expectNoHorizontalOverflow, settle } from "./helpers";

test.describe("Homepage", () => {
  test("renders every section with the expected headings", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await expect(page).toHaveTitle(/PDThemes/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Premium WordPress Products",
    );
    for (const id of [
      "featured",
      "how-it-works",
      "catalog",
      "why",
      "experience",
      "testimonials",
      "blog",
      "faq",
    ]) {
      await expect(page.locator(`#${id}`), `section #${id}`).toHaveCount(1);
    }
    await expect(
      page.locator("[data-testid='product-card']").first(),
    ).toBeVisible();
  });

  test("has exactly one h1 and ordered landmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("does not overflow horizontally", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await expectNoHorizontalOverflow(page);
  });

  test("testimonials are labelled as placeholders until verified", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.locator("#testimonials").getByText(/development placeholders/i),
    ).toBeVisible();
  });

  test("FAQ accordion opens and closes with keyboard and mouse", async ({
    page,
  }) => {
    await page.goto("/");
    await settle(page);
    const faq = page.locator("#faq [data-testid='accordion']");
    const buttons = faq.getByRole("button");
    await expect(buttons.first()).toHaveAttribute("aria-expanded", "true");
    await clickStable(buttons.nth(1));
    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(buttons.first()).toHaveAttribute("aria-expanded", "false");
    await buttons.nth(1).focus();
    await page.keyboard.press("Enter");
    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "false");
  });

  test("structured data is present and contains no fabricated offers", async ({
    page,
  }) => {
    await page.goto("/");
    const scripts = await page
      .locator("script[type='application/ld+json']")
      .allTextContents();
    const types = scripts.flatMap((s) => {
      const d = JSON.parse(s);
      return Array.isArray(d) ? d.map((x) => x["@type"]) : [d["@type"]];
    });
    expect(types).toContain("Organization");
    expect(types).toContain("FAQPage");
    expect(scripts.join("")).not.toMatch(/AggregateRating/);
  });
});
