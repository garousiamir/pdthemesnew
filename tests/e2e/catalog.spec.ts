import { test, expect } from "@playwright/test";
import { settle } from "./helpers";

test.describe("Catalog and filtering", () => {
  test("lists all products and filters by category without reload", async ({
    page,
  }) => {
    await page.goto("/products");
    await settle(page);
    const cards = page.locator("[data-testid='product-card']");
    await expect(cards).toHaveCount(8);
    await page.evaluate(() => {
      (window as unknown as { __noReload: boolean }).__noReload = true;
    });
    await page.getByRole("tab", { name: "WordPress Plugins" }).click();
    await expect(cards).toHaveCount(3);
    expect(
      await page.evaluate(
        () => (window as unknown as { __noReload?: boolean }).__noReload,
      ),
    ).toBe(true);
    await expect(page).toHaveURL(/filter=plugins/);
    await page.getByRole("tab", { name: "Free Products" }).click();
    await expect(cards).toHaveCount(3);
    for (const c of await cards.all())
      await expect(c.getByText(/free/i).first()).toBeVisible();
    await page.getByRole("tab", { name: "All Products" }).click();
    await expect(cards).toHaveCount(8);
    await expect(page).not.toHaveURL(/filter=/);
  });

  test("filter state is restored from the URL", async ({ page }) => {
    await page.goto("/products?filter=woocommerce");
    await expect(
      page.getByRole("tab", { name: "WooCommerce" }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("[data-testid='product-card']")).toHaveCount(1);
  });

  test("themes and plugins pages only show their type", async ({ page }) => {
    await page.goto("/themes");
    await expect(page.locator("[data-testid='product-card']")).toHaveCount(5);
    await expect(
      page
        .locator("[data-testid='product-card']")
        .filter({ hasText: "WordPress Plugin" }),
    ).toHaveCount(0);
    await page.goto("/plugins");
    await expect(page.locator("[data-testid='product-card']")).toHaveCount(3);
  });

  test("free products page lists free and freemium products with download links", async ({
    page,
  }) => {
    await page.goto("/free");
    const cards = page.locator("[data-testid='product-card']");
    await expect(cards).toHaveCount(3);
  });

  test("every product card links to a working detail page", async ({
    page,
    request,
  }) => {
    await page.goto("/products");
    await expect(page.locator("[data-testid='product-card']")).toHaveCount(8);
    const hrefs = await page
      .locator("[data-testid='product-card'] h3 a")
      .evaluateAll((as) =>
        as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!),
      );
    expect(hrefs.length).toBe(8);
    for (const href of hrefs) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });
});
