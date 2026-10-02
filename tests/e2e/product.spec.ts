import { test, expect } from "@playwright/test";
import { isMobile, settle } from "./helpers";

test.describe("Product detail", () => {
  test("shows hero, metadata, gallery, pricing and related products", async ({ page }) => {
    await page.goto("/products/aurum");
    await settle(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Aurum");
    await expect(page.locator("[data-testid='product-hero']")).toContainText("Version");
    await expect(page.locator("[data-testid='product-gallery']")).toBeVisible();
    await expect(page.locator("[data-testid='pricing']")).toBeVisible();
    await expect(page.locator("[data-testid='tier-single']")).toContainText("$69");
    await expect(page.locator("#changelog")).toContainText("1.4.2");
    await expect(page.locator("[data-testid='product-card']").first()).toBeVisible();
    await expect(page).toHaveTitle(/Aurum/);
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toMatch(/\/products\/aurum$/);
  });

  test("gallery device tabs filter screenshots and the lightbox opens, navigates and closes", async ({ page }) => {
    await page.goto("/products/aurum");
    await settle(page);
    const gallery = page.locator("[data-testid='product-gallery']");
    await gallery.getByRole("tab", { name: /mobile/i }).click();
    await expect(gallery.locator("figure")).toHaveCount(1);
    await gallery.getByRole("tab", { name: "All" }).click();
    await gallery.locator("figure button").first().click();
    const lb = page.locator("[data-testid='lightbox']");
    await expect(lb).toBeVisible();
    await expect(lb.locator("img")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(lb).toContainText("2 / 5");
    await page.keyboard.press("Escape");
    await expect(lb).toHaveCount(0);
  });

  test("demo viewer opens with viewport controls and offers a direct link", async ({ page }) => {
    await page.goto("/products/aurum");
    await settle(page);
    await page.locator("[data-testid='demo-open']").first().click();
    const viewer = page.locator("[data-testid='demo-viewer']");
    await expect(viewer).toBeVisible();
    await expect(viewer.getByRole("link", { name: /open/i }).first()).toHaveAttribute("href", /demo\.pdthemes\.de\/aurum/);
    if (!isMobile(page)) {
      await viewer.getByRole("button", { name: "mobile" }).click();
      await expect(viewer.getByRole("button", { name: "mobile" })).toHaveAttribute("aria-pressed", "true");
    }
    await page.keyboard.press("Escape");
    await expect(viewer).toHaveCount(0);
  });

  test("a demo that blocks embedding falls back to an external link", async ({ page }) => {
    await page.goto("/products/formwerk");
    await settle(page);
    await page.locator("[data-testid='demo-open']").first().click();
    const viewer = page.locator("[data-testid='demo-viewer']");
    await expect(viewer).toContainText(/opens in a new tab/i);
    await expect(viewer.locator("iframe")).toHaveCount(0);
    await expect(viewer.getByRole("link", { name: /open formwerk demo/i })).toHaveAttribute("target", "_blank");
  });

  test("a product without a demo URL says so instead of showing a broken button", async ({ page }) => {
    await page.goto("/products/tempo");
    await expect(page.locator("[data-testid='product-hero']")).toContainText(/no live demo/i);
    await expect(page.locator("[data-testid='demo-open']")).toHaveCount(0);
  });

  test("free product shows download links instead of a buy button", async ({ page }) => {
    await page.goto("/products/lumen");
    await settle(page);
    const hero = page.locator("[data-testid='product-hero']");
    await expect(hero.getByRole("link", { name: /download free/i })).toHaveAttribute("href", /downloads\.pdthemes\.de/);
    await expect(hero.getByRole("link", { name: /wordpress\.org/i })).toHaveAttribute("href", /wordpress\.org\/themes/);
    await expect(hero.locator("[data-testid='buy-button']")).toHaveCount(0);
  });

  test("freemium plugin shows free vs pro comparison and WordPress.org link", async ({ page }) => {
    await page.goto("/products/formwerk");
    await expect(page.locator("#compare")).toContainText("Conditional logic");
    await expect(page.locator("[data-testid='product-hero']").getByRole("link", { name: /download free/i })).toHaveAttribute("href", /wordpress\.org/);
  });

  test("sticky purchase bar appears after scrolling past the hero", async ({ page }) => {
    await page.goto("/products/aurum");
    await settle(page);
    await expect(page.locator("[data-testid='sticky-bar']")).toHaveCount(0);
    await page.mouse.wheel(0, 2500);
    await page.waitForTimeout(600);
    await expect(page.locator("[data-testid='sticky-bar']")).toBeVisible();
  });

  test("unknown product returns the 404 page", async ({ page }) => {
    const res = await page.goto("/products/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/wandered/i);
  });
});
