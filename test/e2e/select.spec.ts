import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/select");
});

test.describe("Visit Select control", () => {
  test("Should have text", async ({ page }) => {
    const textElement = page.locator("text=React Select");
    await expect(textElement).toBeVisible();
  });
});
