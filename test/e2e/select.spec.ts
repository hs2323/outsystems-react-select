import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/select");
});

test.describe("Visit Select control", () => {
  test("Should have select control", async ({ page }) => {
    const select = page.locator("role=combobox");
    await expect(select).toBeVisible();
  });
});
