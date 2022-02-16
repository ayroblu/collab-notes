import { test, expect } from "@playwright/test";

const name = "first-time-setup";

test.describe(name, () => {
  test("should successfully create a file when prompted", async ({ page }) => {
    await page.goto("http://localhost:8080", { timeout: 60_000 });
    await page.locator('[placeholder="filename.ts"]').waitFor();
    expect(await page.screenshot()).toMatchSnapshot([
      name,
      "1-initial-load.png",
    ]);
    await page.locator('[placeholder="filename.ts"]').type("tweet.ts");
    await page.keyboard.press("Enter");
    await page.locator('[data-mode-id="typescript"]').waitFor();
    expect(await page.screenshot()).toMatchSnapshot([
      name,
      "2-typescript-loaded.png",
    ]);
    await page.fill(".monaco-editor textarea", content);
    // await page.type("input", content);
    // await page.fill("input", content);
    expect(await page.screenshot()).toMatchSnapshot([
      name,
      "3-content-added.png",
    ]);
  });
});

const content = `
type Tweet = {
  text: string,
  dateCreated: string,
}
function createTweet(tweet: Tweet) {
  console.log(tweet);
}
`.trim();
