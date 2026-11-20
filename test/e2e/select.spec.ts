import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/select");
});

const selectedLabels = (page: import("@playwright/test").Page) =>
  page.locator(".custom-select-prefix__multi-value__label");

test.describe("Visit Select control", () => {
  test("Should have select control", async ({ page }) => {
    const select = page.locator("role=combobox");
    await expect(select).toBeVisible();
  });

  test("Sends the selection to the host when it changes", async ({ page }) => {
    await expect(selectedLabels(page)).toHaveText(["Chocolate", "Strawberry"]);

    await page.locator(".custom-select-prefix__dropdown-indicator").click();
    await page.getByRole("option", { name: "Vanilla" }).click();

    await expect(selectedLabels(page)).toHaveText([
      "Chocolate",
      "Strawberry",
      "Vanilla",
    ]);
    await expect(page.locator("#host-received")).toHaveText(
      JSON.stringify([
        { label: "Chocolate", value: "chocolate" },
        { label: "Strawberry", value: "strawberry" },
        { label: "Vanilla", value: "vanilla" },
      ]),
    );
  });

  test("Shows a value set by the host", async ({ page }) => {
    await expect(selectedLabels(page)).toHaveCount(2);

    await page.locator("#host-set-vanilla").click();
    await expect(selectedLabels(page)).toHaveText(["Vanilla"]);

    await page.locator("#host-clear").click();
    await expect(selectedLabels(page)).toHaveCount(0);

    await page.locator(".custom-select-prefix__dropdown-indicator").click();
    await page.getByRole("option", { name: "Chocolate" }).click();
    await expect(selectedLabels(page)).toHaveText(["Chocolate"]);
    await expect(page.locator("#host-received")).toHaveText(
      JSON.stringify([{ label: "Chocolate", value: "chocolate" }]),
    );
  });
});
