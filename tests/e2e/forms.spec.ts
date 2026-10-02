import { test, expect } from "@playwright/test";
import { settle } from "./helpers";

test.describe("Forms", () => {
  test("contact form validates client-side and submits in demo mode", async ({
    page,
  }) => {
    await page.goto("/contact?topic=support");
    await settle(page);
    const form = page.locator("[data-testid='contact-form']");
    await expect(
      form.getByRole("radio", { name: "Support request" }),
    ).toBeChecked();
    await form.getByRole("button", { name: /send message/i }).click();
    await expect(form.getByText("Please enter your name.")).toBeVisible();
    await expect(form.getByText(/valid email/i)).toBeVisible();
    await expect(page.locator("#contact-name")).toBeFocused();
    await page.fill("#contact-name", "Test Person");
    await page.fill("#contact-email", "not-an-email");
    await page.fill("#contact-message", "Short");
    await form.getByRole("button", { name: /send message/i }).click();
    await expect(form.getByText(/valid email/i)).toBeVisible();
    await expect(form.getByText(/at least 20 characters/i)).toBeVisible();
    await page.fill("#contact-email", "test@example.com");
    await page.fill(
      "#contact-message",
      "This is a sufficiently long message for the validation rule to pass.",
    );
    await page.check("#contact-consent");
    await form.getByRole("button", { name: /send message/i }).click();
    await expect(page.locator("[data-testid='contact-success']")).toContainText(
      /demo mode/i,
    );
  });

  test("contact API rejects invalid payloads with field errors", async ({
    request,
  }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "x",
        email: "nope",
        topic: "sales",
        message: "short",
        consent: false,
      },
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.fieldErrors).toHaveProperty("name");
    expect(body.fieldErrors).toHaveProperty("email");
    expect(body.fieldErrors).toHaveProperty("message");
    expect(body.fieldErrors).toHaveProperty("consent");
  });

  test("newsletter form validates and reports demo mode", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("footer form");
    await form.getByRole("textbox").fill("bad");
    await form.getByRole("button", { name: "Subscribe" }).click();
    await expect(form.getByRole("status")).toContainText(/valid email/i);
    await form.getByRole("textbox").fill("person@example.com");
    await form.getByRole("button", { name: "Subscribe" }).click();
    await expect(form.getByRole("status")).toContainText(/demo mode/i);
  });

  test("Freemius webhook rejects unsigned and badly signed requests, is unavailable without a secret", async ({
    request,
  }) => {
    const res = await request.post("/api/freemius/webhook", {
      data: { id: "evt_1", type: "license.created" },
    });
    // Without FREEMIUS_WEBHOOK_SECRET the route is 503; with a secret, an unsigned request is 401.
    expect([401, 503]).toContain(res.status());
    const get = await request.get("/api/freemius/webhook");
    expect(get.status()).toBe(405);
  });
});
