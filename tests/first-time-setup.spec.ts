import { test, expect } from "@playwright/test";

const name = "first-time-setup";

test.describe(name, () => {
  test("should successfully create a file when prompted", async ({ page }) => {
    await page.goto("http://localhost:8080");
    const button = page.locator("text=Click me");
    await button.waitFor();
    expect(await page.screenshot()).toMatchSnapshot([name, "click-button.png"]);
    await button.click();
    await page.locator("text=playground for typing").waitFor();
  });
});
